import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import { useMemo, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const normalizedScroll = Math.min(window.scrollY / maxScroll, 1);
      setScrollY(normalizedScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
}

function NetworkNodes() {
  const nodesRef = useRef<THREE.Group>(null);
  const scrollY = useScrollPosition();
  const [hoveredEdge, setHoveredEdge] = useState<number | null>(null);
  const [hoveredNodes, setHoveredNodes] = useState<number[]>([]);

  const [nodes, edges] = useMemo(() => {
    const nodePositions = [];
    const edgeConnections = [];
    const nodeCount = 50;
    const radius = 6;
    const minDistance = 2;

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
        if (distance < radius * 0.4) {
          const points = [];
          const start = nodePositions[i];
          const end = nodePositions[j];
          const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
          
          // Add curve control point
          const normal = new THREE.Vector3().subVectors(end, start);
          normal.normalize();
          const perpendicular = new THREE.Vector3(-normal.y, normal.x, normal.z);
          const curveOffset = 0.5 + Math.random() * 0.5;
          mid.add(perpendicular.multiplyScalar(curveOffset));

          // Create curve points
          const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
          const points = curve.getPoints(10);

          edgeConnections.push({
            points,
            startIndex: i,
            endIndex: j
          });
        }
      }
    }

    return [nodePositions, edgeConnections];
  }, []);

  useFrame((state) => {
    if (nodesRef.current) {
      nodesRef.current.rotation.y = scrollY * Math.PI * 2 + state.clock.getElapsedTime() * 0.1;
      const scale = 1 + scrollY * 0.3;
      nodesRef.current.scale.setScalar(scale);

      nodes.forEach((pos, i) => {
        const node = nodesRef.current!.children[i];
        if (node) {
          const time = state.clock.getElapsedTime();
          const amplitude = 0.2;
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
        <Sphere 
          key={`node-${i}`} 
          position={[pos.x, pos.y, pos.z]} 
          args={[0.08]}
        >
          <meshStandardMaterial
            color={hoveredNodes.includes(i) ? "#44C8F5" : "#3a9cb1"}
            emissive={hoveredNodes.includes(i) ? "#44C8F5" : "#3a9cb1"}
            emissiveIntensity={hoveredNodes.includes(i) ? 1 : 0.5}
            transparent
            opacity={0.8}
          />
        </Sphere>
      ))}

      {edges.map((edge, i) => (
        <Line
          key={`edge-${i}`}
          points={edge.points}
          color={hoveredEdge === i ? "#ffffff" : "#44C8F5"}
          lineWidth={hoveredEdge === i ? 2 : 1}
          transparent
          opacity={hoveredEdge === i ? 0.3 : 0.1}
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

export default function NetworkVisualization() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 50 }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
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