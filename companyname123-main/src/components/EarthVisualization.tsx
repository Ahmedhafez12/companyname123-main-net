import React, { useRef, Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, QuadraticBezierLine } from '@react-three/drei';
import * as THREE from 'three';
import { useMemo } from 'react';

interface SectionConfig {
  earthPosition: THREE.Vector3;
  earthRotation: THREE.Euler;
  earthScale: number;
  networkScale: number;
  networkOffset: THREE.Vector3;
  earthOpacity: number;
  earthRotationSpeed: number;
  cloudRotationSpeed: number;
  networkRotationSpeed: number;
  nodeScale: number;
  edgeOpacity: number;
}

interface EarthProps {
  groupRef: React.RefObject<THREE.Group>;
  sectionConfigs: SectionConfig[];
  smoothedActiveSection: number;
  firstEarthSectionIndex: number;
  entranceAlpha: number;
}

interface NetworkNodesProps {
  groupRef: React.RefObject<THREE.Group>;
  earthGroupRef: React.RefObject<THREE.Group>;
  sectionConfigs: SectionConfig[];
  smoothedActiveSection: number;
  firstEarthSectionIndex: number;
  entranceAlpha: number;
}

function useScrollSection() {
  const [scrollData, setScrollData] = useState({
    scrollY: 0,
    activeSection: 0,
    progress: 0,
    smoothedActiveSection: 0,
    smoothedProgress: 0
  });

  const prevValues = useRef({
    activeSection: 0,
    progress: 0,
    smoothedActiveSection: 0,
    smoothedProgress: 0,
    lastUpdateTime: 0
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.snap-section');
      if (!sections || sections.length === 0) return;

      const scrollContainer = document.querySelector('.scroll-snap-page') ?? window;
      const scrollY = scrollContainer === window
        ? window.scrollY
        : (scrollContainer as Element).scrollTop;
      const windowHeight = window.innerHeight;

      let activeSection = 0;
      let maxVisibility = 0;

      sections.forEach((section, index) => {
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const visibleHeight = Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top);
        const visibility = visibleHeight / windowHeight;

        if (visibility > maxVisibility) {
          maxVisibility = visibility;
          activeSection = index;
        }
      });

      const currentSection = sections[activeSection];
      if (!currentSection) return;

      const rect = currentSection.getBoundingClientRect();
      const sectionHeight = currentSection.clientHeight;
      const viewportCenter = windowHeight / 2;

      const sectionCenter = rect.top + sectionHeight / 2;
      const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);
      const progress = Math.max(0, Math.min(1, 1 - (distanceFromCenter / (sectionHeight / 2))));

      setScrollData(prev => ({
        scrollY,
        activeSection,
        progress,
        smoothedActiveSection: prev.smoothedActiveSection,
        smoothedProgress: prev.smoothedProgress
      }));
    };

    const scrollContainer = document.querySelector('.scroll-snap-page');
    const target = scrollContainer ?? window;
    target.addEventListener('scroll', handleScroll as EventListener, { passive: true });
    handleScroll();

    return () => target.removeEventListener('scroll', handleScroll as EventListener);
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    
    const smoothValues = (timestamp: number) => {
      setScrollData(prev => {
        const deltaTime = timestamp - prevValues.current.lastUpdateTime;
        const smoothingFactor = 1 - Math.exp(-3 * (deltaTime / 1000));
        
        const smoothedActiveSection = prevValues.current.smoothedActiveSection + 
          (prev.activeSection - prevValues.current.smoothedActiveSection) * smoothingFactor;
        
        const smoothedProgress = prevValues.current.smoothedProgress + 
          (prev.progress - prevValues.current.smoothedProgress) * smoothingFactor;
        
        prevValues.current = {
          activeSection: prev.activeSection,
          progress: prev.progress,
          smoothedActiveSection,
          smoothedProgress,
          lastUpdateTime: timestamp
        };
        
        return {
          ...prev,
          smoothedActiveSection,
          smoothedProgress
        };
      });
      
      animationFrameId = requestAnimationFrame(smoothValues);
    };
    
    animationFrameId = requestAnimationFrame(smoothValues);
    
    return () => cancelAnimationFrame(animationFrameId);
  }, []);
  
  return scrollData;
}

function easeInOutCubic(t: number): number {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function SceneContent() {
  const { smoothedActiveSection, smoothedProgress } = useScrollSection();
  const { camera } = useThree();
  
  const earthGroupRef = useRef<THREE.Group>(null);
  const networkGroupRef = useRef<THREE.Group>(null);
  
  // Configs for last 3 sections: distinct poses so the globe movement is noticeable in each section
  const sectionConfigs = useMemo<SectionConfig[]>(() => [
    {
      earthPosition: new THREE.Vector3(-2.2, 0.8, 0),
      earthRotation: new THREE.Euler(0.25, Math.PI * 0.2, 0.05),
      earthScale: 1.75,
      networkScale: 2.15,
      networkOffset: new THREE.Vector3(0.4, 0.1, 0.85),
      earthOpacity: 0.65,
      earthRotationSpeed: 0.06,
      cloudRotationSpeed: 0.07,
      networkRotationSpeed: 0.14,
      nodeScale: 1.2,
      edgeOpacity: 0.4
    },
    {
      earthPosition: new THREE.Vector3(2.5, -0.3, 0.3),
      earthRotation: new THREE.Euler(0.35, Math.PI * 0.65, -0.08),
      earthScale: 1.4,
      networkScale: 1.85,
      networkOffset: new THREE.Vector3(-0.5, 0.35, 0.9),
      earthOpacity: 0.65,
      earthRotationSpeed: 0.08,
      cloudRotationSpeed: 0.09,
      networkRotationSpeed: 0.18,
      nodeScale: 1.1,
      edgeOpacity: 0.38
    },
    {
      earthPosition: new THREE.Vector3(0, -3.2, 0.6),
      earthRotation: new THREE.Euler(0.6, Math.PI * 0.45, 0),
      earthScale: 0.95,
      networkScale: 1.3,
      networkOffset: new THREE.Vector3(0, -0.25, 0.55),
      earthOpacity: 0.6,
      earthRotationSpeed: 0.035,
      cloudRotationSpeed: 0.045,
      networkRotationSpeed: 0.07,
      nodeScale: 0.88,
      edgeOpacity: 0.3
    }
  ], []);

  const localSection = Math.min(2, Math.max(0, smoothedActiveSection - 2));

  useFrame((_, delta) => {
    const sectionIndex = Math.floor(localSection);
    const sectionBlend = localSection - sectionIndex;
    const easedBlend = easeInOutCubic(sectionBlend);
    const targetCameraZ = 10 - easedBlend * 2;
    const t = 1 - Math.exp(-2.8 * delta);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCameraZ, t);
  });

  const isVisible = smoothedActiveSection >= 1.5;
  const entranceProgress = Math.min(1, Math.max(0, (smoothedActiveSection - 1.5) / 0.55));
  const entranceEased = easeOutCubic(entranceProgress);
  const slideDownOffset = (1 - entranceEased) * 3.5;
  const entranceAlpha = entranceEased;

  return (
    <group visible={isVisible} position={[0, slideDownOffset, 0]}>
      <Earth
        groupRef={earthGroupRef}
        sectionConfigs={sectionConfigs}
        smoothedActiveSection={smoothedActiveSection}
        firstEarthSectionIndex={2}
        entranceAlpha={entranceAlpha}
      />
      <NetworkNodes
        groupRef={networkGroupRef}
        earthGroupRef={earthGroupRef}
        sectionConfigs={sectionConfigs}
        smoothedActiveSection={smoothedActiveSection}
        firstEarthSectionIndex={2}
        entranceAlpha={entranceAlpha}
      />
    </group>
  );
}

const Earth: React.FC<EarthProps> = ({ groupRef, sectionConfigs, smoothedActiveSection, firstEarthSectionIndex, entranceAlpha }) => {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudRef = useRef<THREE.Mesh>(null);

  const earthTexture = useLoader(THREE.TextureLoader, 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg');
  const earthBumpMap = useLoader(THREE.TextureLoader, 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg');
  const earthSpecularMap = useLoader(THREE.TextureLoader, 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg');
  const cloudTexture = useLoader(THREE.TextureLoader, 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png');

  const prevState = useRef({
    position: new THREE.Vector3(),
    quaternion: new THREE.Quaternion(),
    scale: new THREE.Vector3(1, 1, 1)
  });

  useFrame((state, delta) => {
    if (!earthRef.current || !cloudRef.current || !groupRef.current) return;

    const localSection = Math.min(sectionConfigs.length - 1, Math.max(0, smoothedActiveSection - firstEarthSectionIndex));
    const sectionIndex = Math.floor(localSection);
    const nextSectionIndex = Math.min(sectionIndex + 1, sectionConfigs.length - 1);
    const sectionBlend = localSection - sectionIndex;
    const easedBlend = easeInOutCubic(sectionBlend);
    
    const currentConfig = sectionConfigs[sectionIndex];
    const nextConfig = sectionConfigs[nextSectionIndex];
    
    const basePosition = new THREE.Vector3().lerpVectors(
      currentConfig.earthPosition,
      nextConfig.earthPosition,
      easedBlend
    );
    const time = state.clock.getElapsedTime();
    const idleX = Math.sin(time * 0.22) * 0.28 + Math.sin(time * 0.13) * 0.12;
    const idleY = Math.cos(time * 0.18) * 0.2 + Math.cos(time * 0.11) * 0.08;
    const idleZ = Math.sin(time * 0.15) * 0.06;
    const targetPosition = basePosition.clone().add(new THREE.Vector3(idleX, idleY, idleZ));
    
    const currentQuat = new THREE.Quaternion().setFromEuler(currentConfig.earthRotation);
    const nextQuat = new THREE.Quaternion().setFromEuler(nextConfig.earthRotation);
    const baseQuat = new THREE.Quaternion().slerpQuaternions(currentQuat, nextQuat, easedBlend);
    const idleTilt = 0.03 * Math.sin(time * 0.2) + 0.02 * Math.sin(time * 0.33);
    const idleQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(idleTilt, idleTilt * 0.5, 0));
    const targetQuaternion = new THREE.Quaternion().multiplyQuaternions(baseQuat, idleQuat);
    
    const targetScale = THREE.MathUtils.lerp(
      currentConfig.earthScale,
      nextConfig.earthScale,
      easedBlend
    );
    
    const t = 1 - Math.exp(-3.2 * delta);
    const newPosition = new THREE.Vector3().copy(prevState.current.position);
    newPosition.lerp(targetPosition, t);
    groupRef.current.position.copy(newPosition);
    prevState.current.position.copy(newPosition);
    
    const newQuaternion = new THREE.Quaternion().copy(prevState.current.quaternion);
    newQuaternion.slerp(targetQuaternion, t);
    groupRef.current.quaternion.copy(newQuaternion);
    prevState.current.quaternion.copy(newQuaternion);
    
    const newScale = new THREE.Vector3().copy(prevState.current.scale);
    newScale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), t);
    groupRef.current.scale.copy(newScale);
    prevState.current.scale.copy(newScale);
    
    const earthSpeed = THREE.MathUtils.lerp(
      currentConfig.earthRotationSpeed,
      nextConfig.earthRotationSpeed,
      easedBlend
    );
    
    const cloudSpeed = THREE.MathUtils.lerp(
      currentConfig.cloudRotationSpeed,
      nextConfig.cloudRotationSpeed,
      easedBlend
    );
    
    earthRef.current.rotation.y += earthSpeed * 0.01;
    cloudRef.current.rotation.y += cloudSpeed * 0.01;
    
    const baseOpacity = THREE.MathUtils.lerp(
      currentConfig.earthOpacity,
      nextConfig.earthOpacity,
      easedBlend
    );
    const targetOpacity = baseOpacity * entranceAlpha;

    const opacityT = 1 - Math.exp(-3.2 * delta);
    if (earthRef.current.material instanceof THREE.Material) {
      earthRef.current.material.opacity = THREE.MathUtils.lerp(
        earthRef.current.material.opacity,
        targetOpacity,
        opacityT
      );
    }

    if (cloudRef.current.material instanceof THREE.Material) {
      cloudRef.current.material.opacity = THREE.MathUtils.lerp(
        cloudRef.current.material.opacity,
        targetOpacity * 0.8,
        opacityT
      );
    }
  });
  
  return (
    <group ref={groupRef} renderOrder={1}>
      <mesh ref={earthRef} renderOrder={1}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial 
          map={earthTexture}
          bumpMap={earthBumpMap}
          bumpScale={0.05}
          specularMap={earthSpecularMap}
          specular={new THREE.Color(0x999999)}
          emissive={new THREE.Color(0x0a1828)}
          emissiveIntensity={0.12}
          shininess={25}
          transparent={true}
          opacity={0.65}
          depthWrite={true}
        />
      </mesh>
      
      <mesh ref={cloudRef} scale={[1.02, 1.02, 1.02]} renderOrder={2}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial 
          map={cloudTexture}
          transparent={true}
          opacity={0.45}
          depthWrite={false}
        />
      </mesh>
      
      <mesh scale={[1.025, 1.025, 1.025]} renderOrder={3}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial 
          color="#6dd4f7"
          transparent={true}
          opacity={0.08}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

const NetworkNodes: React.FC<NetworkNodesProps> = ({ groupRef, earthGroupRef, sectionConfigs, smoothedActiveSection, firstEarthSectionIndex, entranceAlpha }) => {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [hoveredEdges, setHoveredEdges] = useState<number[]>([]);
  const [hoveredNodes, setHoveredNodes] = useState<number[]>([]);

  const prevRotation = useRef(0);
  const prevState = useRef({
    position: new THREE.Vector3(),
    quaternion: new THREE.Quaternion(),
    scale: new THREE.Vector3(1, 1, 1)
  });

  const [nodes, edges] = useMemo(() => {
    const nodePositions: THREE.Vector3[] = [];
    const edgeConnections: {
      start: THREE.Vector3;
      end: THREE.Vector3;
      startIndex: number;
      endIndex: number;
      control: THREE.Vector3;
    }[] = [];
    const connections: number[][] = [];
    
    const nodeCount = 32;
    const radius = 2.4;
    const phi = Math.PI * (3 - Math.sqrt(5));
    
    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;
      
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      
      const jitter = 0.15;
      const randomOffset = new THREE.Vector3(
        (Math.random() - 0.5) * jitter,
        (Math.random() - 0.5) * jitter,
        (Math.random() - 0.5) * jitter
      );
      
      const position = new THREE.Vector3(x * radius, y * radius, z * radius).add(randomOffset);
      nodePositions.push(position);
      connections.push([]);
    }
    
    for (let i = 0; i < nodePositions.length; i++) {
      const distances: {index: number, distance: number}[] = [];
      
      for (let j = 0; j < nodePositions.length; j++) {
        if (i !== j) {
          distances.push({
            index: j,
            distance: nodePositions[i].distanceTo(nodePositions[j])
          });
        }
      }
      
      distances.sort((a, b) => a.distance - b.distance);
      
      const connectCount = 2 + Math.floor(Math.random() * 2);
      for (let k = 0; k < Math.min(connectCount, distances.length); k++) {
        const j = distances[k].index;
        
        if (i < j && !connections[i].includes(j)) {
          connections[i].push(j);
          connections[j].push(i);
          
          const midPoint = new THREE.Vector3().addVectors(nodePositions[i], nodePositions[j]).multiplyScalar(0.5);
          const direction = new THREE.Vector3().subVectors(midPoint, new THREE.Vector3(0, 0, 0)).normalize();
          
          const curveHeight = 0.4 + Math.random() * 0.3;
          const controlPoint = midPoint.clone().add(direction.multiplyScalar(curveHeight));
          
          edgeConnections.push({
            start: nodePositions[i],
            end: nodePositions[j],
            startIndex: i,
            endIndex: j,
            control: controlPoint
          });
        }
      }
    }
    
    return [nodePositions, edgeConnections];
  }, []);

  const nodeScales = useRef<number[]>(Array(nodes.length).fill(1));
  const nodeColors = useRef<string[]>(Array(nodes.length).fill('#44C8F5'));

  useFrame(({ clock }, delta) => {
    if (!groupRef.current || !earthGroupRef.current) return;

    const localSection = Math.min(sectionConfigs.length - 1, Math.max(0, smoothedActiveSection - firstEarthSectionIndex));
    const sectionIndex = Math.floor(localSection);
    const nextSectionIndex = Math.min(sectionIndex + 1, sectionConfigs.length - 1);
    const sectionBlend = localSection - sectionIndex;
    const easedBlend = easeInOutCubic(sectionBlend);
    
    const currentConfig = sectionConfigs[sectionIndex];
    const nextConfig = sectionConfigs[nextSectionIndex];
    
    const earthPosition = earthGroupRef.current.position.clone();
    const earthQuaternion = earthGroupRef.current.quaternion.clone();
    
    const currentOffset = currentConfig.networkOffset;
    const nextOffset = nextConfig.networkOffset;
    const targetOffset = new THREE.Vector3().lerpVectors(
      currentOffset,
      nextOffset,
      easedBlend
    );
    
    const targetPosition = earthPosition.clone().add(targetOffset);
    
    const targetScale = THREE.MathUtils.lerp(
      currentConfig.networkScale,
      nextConfig.networkScale,
      easedBlend
    );
    
    const t = 1 - Math.exp(-3.5 * delta);
    const newPosition = new THREE.Vector3().copy(prevState.current.position);
    newPosition.lerp(targetPosition, t);
    groupRef.current.position.copy(newPosition);
    prevState.current.position.copy(newPosition);

    groupRef.current.quaternion.copy(earthQuaternion);

    const newScale = new THREE.Vector3().copy(prevState.current.scale);
    newScale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), t);
    groupRef.current.scale.copy(newScale);
    prevState.current.scale.copy(newScale);
    
    const targetRotationSpeed = THREE.MathUtils.lerp(
      currentConfig.networkRotationSpeed,
      nextConfig.networkRotationSpeed,
      easedBlend
    );
    
    const rotationDelta = targetRotationSpeed * 0.01;
    prevRotation.current += rotationDelta;
    
    groupRef.current.rotation.y += rotationDelta;
    
    const time = clock.getElapsedTime();
    
    nodes.forEach((_, i) => {
      if (!groupRef.current) return;
      
      const nodeGroup = groupRef.current.children[i];
      if (nodeGroup && nodeGroup.type === 'Group') {
        const baseScale = THREE.MathUtils.lerp(
          currentConfig.nodeScale,
          nextConfig.nodeScale,
          easedBlend
        );
        
        const pulseFrequency = 0.5 + i * 0.05;
        const pulsePhase = time * pulseFrequency + i;
        const pulse = Math.sin(pulsePhase) * 0.2 + 1;
        
        let targetScale = baseScale;
        if (hoveredNodes.includes(i)) {
          targetScale = baseScale * 2.0;
          nodeColors.current[i] = '#A6CE39';
        } else if (hoveredNode === i) {
          targetScale = baseScale * 2.0;
          nodeColors.current[i] = '#A6CE39';
        } else {
          targetScale = baseScale * pulse;
          nodeColors.current[i] = '#44C8F5';
        }
        
        const scaleT = 1 - Math.exp(-6 * delta);
        nodeScales.current[i] = THREE.MathUtils.lerp(nodeScales.current[i], targetScale, scaleT);
        nodeGroup.scale.setScalar(nodeScales.current[i]);
        
        const positionOffset = new THREE.Vector3(
          Math.sin(time + i) * 0.02,
          Math.cos(time * 0.8 + i) * 0.02,
          Math.sin(time * 1.2 + i) * 0.02
        );
        nodeGroup.position.copy(nodes[i].clone().add(positionOffset));
      }
    });
  });
  
  const handleNodeHover = (index: number | null) => {
    setHoveredNode(index);
    
    if (index === null) {
      setHoveredEdges([]);
      setHoveredNodes([]);
    } else {
      const connectedEdges = edges
        .map((edge, i) => ({ edge, index: i }))
        .filter(item => item.edge.startIndex === index || item.edge.endIndex === index)
        .map(item => item.index);
      
      setHoveredEdges(connectedEdges);
      
      const connectedNodes = edges
        .filter((edge) => edge.startIndex === index || edge.endIndex === index)
        .map(edge => edge.startIndex === index ? edge.endIndex : edge.startIndex);
      
      setHoveredNodes([index, ...connectedNodes]);
    }
  };
  
  const edgeOpacities = useRef<number[]>(Array(edges.length).fill(0.2));
  
  return (
    <group ref={groupRef} renderOrder={10}>
      {nodes.map((pos, i) => (
        <group key={`node-${i}`} position={[pos.x, pos.y, pos.z]} renderOrder={11}>
          <Sphere args={[0.15, 32, 32]} renderOrder={12}>
            <meshBasicMaterial 
              color={nodeColors.current[i]}
              transparent 
              opacity={0.15}
              depthWrite={false}
            />
          </Sphere>
          
          <Sphere args={[0.1, 32, 32]} renderOrder={13}>
            <meshBasicMaterial 
              color={nodeColors.current[i]}
              transparent 
              opacity={0.3}
              depthWrite={false}
            />
          </Sphere>
          
          <Sphere 
            args={[0.06, 32, 32]}
            onPointerOver={() => handleNodeHover(i)}
            onPointerOut={() => handleNodeHover(null)}
            renderOrder={14}
          >
            <meshBasicMaterial 
              color={nodeColors.current[i]}
              transparent
              opacity={1}
              depthWrite={true}
            />
          </Sphere>
        </group>
      ))}
      
      {edges.map((edge, i) => {
        const localSection = Math.min(sectionConfigs.length - 1, Math.max(0, smoothedActiveSection - firstEarthSectionIndex));
        const sectionIndex = Math.floor(localSection);
        const nextSectionIndex = Math.min(sectionIndex + 1, sectionConfigs.length - 1);
        const sectionBlend = localSection - sectionIndex;
        const easedBlend = easeInOutCubic(sectionBlend);
        
        const currentConfig = sectionConfigs[sectionIndex];
        const nextConfig = sectionConfigs[nextSectionIndex];
        
        const baseOpacity = THREE.MathUtils.lerp(
          currentConfig.edgeOpacity,
          nextConfig.edgeOpacity,
          easedBlend
        );
        const targetOpacity = (hoveredEdges.includes(i) ? 0.9 : baseOpacity) * entranceAlpha;
        edgeOpacities.current[i] = THREE.MathUtils.lerp(edgeOpacities.current[i], targetOpacity, 0.1);
        
        return (
          <group key={`edge-group-${i}`}>
            <QuadraticBezierLine
              key={`edge-glow-${i}`}
              start={[edge.start.x, edge.start.y, edge.start.z]}
              end={[edge.end.x, edge.end.y, edge.end.z]}
              mid={[edge.control.x, edge.control.y, edge.control.z]}
              color={hoveredEdges.includes(i) ? "#A6CE39" : "#44C8F5"}
              lineWidth={hoveredEdges.includes(i) ? 8 : 4}
              transparent
              opacity={edgeOpacities.current[i] * 0.3}
              renderOrder={4}
              depthWrite={false}
            />
            
            <QuadraticBezierLine
              key={`edge-${i}`}
              start={[edge.start.x, edge.start.y, edge.start.z]}
              end={[edge.end.x, edge.end.y, edge.end.z]}
              mid={[edge.control.x, edge.control.y, edge.control.z]}
              color={hoveredEdges.includes(i) ? "#A6CE39" : "#44C8F5"}
              lineWidth={hoveredEdges.includes(i) ? 3 : 1.5}
              transparent
              opacity={edgeOpacities.current[i]}
              renderOrder={5}
              depthWrite={false}
            />
          </group>
        );
      })}
    </group>
  );
};

const EarthFallback = () => (
  <mesh>
    <sphereGeometry args={[2, 32, 32]} />
    <meshBasicMaterial color="#005E96" wireframe opacity={0.3} transparent />
  </mesh>
);

const EarthVisualization: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
        className="pointer-events-none"
      >
        <ambientLight intensity={0.62} />
        <pointLight position={[10, 10, 10]} intensity={0.9} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        
        <Suspense fallback={<EarthFallback />}>
          <SceneContent />
        </Suspense>
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          rotateSpeed={0.3}
          minPolarAngle={Math.PI * 0.3}
          maxPolarAngle={Math.PI * 0.7}
        />
      </Canvas>
    </div>
  );
};

export default EarthVisualization;