import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { QuadraticBezierLine, OrbitControls } from '@react-three/drei';

function NetworkNodes() {
  const nodesRef = useRef<THREE.Group>(null);
  const [hoveredEdge, setHoveredEdge] = useState<number | null>(null);
  const [hoveredNodes, setHoveredNodes] = useState<number[]>([]);

  const [nodes, edges] = useMemo(() => {
    const nodePositions = [];
    const edgeConnections = [];
    const nodeCount = 35; // Increased number of nodes
    const radius = 5;
    const minDistance = 2; // Reduced minimum distance to accommodate more nodes

    while (nodePositions.length < nodeCount) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      const newPosition = new THREE.Vector3(x, y, z);
      
      let tooClose = false;
      for (const pos of nodePositions) {
        if (newPosition.distanceTo(pos) < minDistance) {
          tooClose = true;
          break;
        }
      }
      
      if (!tooClose) {
        nodePositions.push(newPosition);
      }
    }

    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = 0; j < i; j++) {
        const distance = nodePositions[i].distanceTo(nodePositions[j]);
        if (distance < radius * 0.35) {
          edgeConnections.push({
            start: nodePositions[i],
            end: nodePositions[j],
            startIndex: i,
            endIndex: j,
            control: new THREE.Vector3().addVectors(nodePositions[i], nodePositions[j])
              .multiplyScalar(0.5)
              .add(new THREE.Vector3(
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2
              ))
          });
        }
      }
    }

    return [nodePositions, edgeConnections];
  }, []);

  useFrame((state) => {
    if (nodesRef.current) {
      nodesRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      
      nodes.forEach((pos, i) => {
        const node = nodesRef.current!.children[i];
        if (node) {
          const time = state.clock.getElapsedTime();
          const amplitude = 0.15;
          node.position.x = pos.x + Math.sin(time * 0.5 + i) * amplitude;
          node.position.y = pos.y + Math.cos(time * 0.5 + i) * amplitude;
          node.position.z = pos.z + Math.sin(time * 0.3 + i) * amplitude;
        }
      });
    }
  });

  return (
    <group ref={nodesRef}>
      {nodes.map((pos, i) => (
        <mesh key={`node-${i}`} position={[pos.x, pos.y, pos.z]}>
          <sphereGeometry args={[0.045]} /> {/* Reduced node size */}
          <meshBasicMaterial
            color={hoveredNodes.includes(i) ? "#44C8F5" : "#3a9cb1"}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}

      {edges.map((edge, i) => (
        <QuadraticBezierLine
          key={`edge-${i}`}
          start={[edge.start.x, edge.start.y, edge.start.z]}
          end={[edge.end.x, edge.end.y, edge.end.z]}
          mid={[edge.control.x, edge.control.y, edge.control.z]}
          color={hoveredEdge === i ? "#ffffff" : "#ffffff"}
          lineWidth={1}
          transparent
          opacity={hoveredEdge === i ? 0.5 : 0.3}
          onPointerEnter={() => {
            setHoveredEdge(i);
            setHoveredNodes([edge.startIndex, edge.endIndex]);
          }}
          onPointerLeave={() => {
            setHoveredEdge(null);
            setHoveredNodes([]);
          }}
        />
      ))}
    </group>
  );
}

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 opacity-50">
      <Canvas
        camera={{ position: [0, 0, 18], fov: 50 }}
        dpr={[1, 2]}
      >
        <NetworkNodes />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}