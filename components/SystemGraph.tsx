import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera, Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import * as d3 from 'd3';
import { GraphData, GraphNode, NodeType } from '../types';
import { COLORS } from '../constants';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      sphereGeometry: any;
      meshStandardMaterial: any;
      meshBasicMaterial: any;
      ringGeometry: any;
      lineSegments: any;
      lineBasicMaterial: any;
      color: any;
      fog: any;
      ambientLight: any;
      pointLight: any;
    }
  }
}

const PlanetRing = ({ color, size }: { color: string, size: number }) => {
    return (
        <mesh rotation={[-Math.PI / 2.2, 0, 0]}>
            <ringGeometry args={[size * 1.4, size * 2, 64]} />
            <meshStandardMaterial 
                color={color} 
                opacity={0.3} 
                transparent 
                side={THREE.DoubleSide}
                emissive={color}
                emissiveIntensity={0.2}
            />
        </mesh>
    );
};

const NodeMesh: React.FC<{ 
  node: GraphNode; 
  onSelect: (node: GraphNode) => void;
  onHoverChange: (isHovering: boolean) => void; 
}> = ({ 
  node, 
  onSelect,
  onHoverChange
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  const baseColor = COLORS[node.type];
  const isSignal = node.type === NodeType.SIGNAL;
  const isFailure = node.type === NodeType.FAILURE;
  const isSystem = node.type === NodeType.SYSTEM;
  const isCore = node.id === 'sys-core';

  // Random rotation axis for each planet
  const rotationAxis = useMemo(() => new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize(), []);
  const rotationSpeed = useMemo(() => (Math.random() * 0.5 + 0.2) * (isCore ? 0.5 : 1), [isCore]);

  const handlePointerOver = () => {
    document.body.style.cursor = 'pointer';
    setHovered(true);
    onHoverChange(true);
  };

  const handlePointerOut = () => {
    document.body.style.cursor = 'default';
    setHovered(false);
    onHoverChange(false);
  };

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Physics Position interpolation
    const targetX = (node.x || 0) * 0.12; // Spread multiplier
    const targetY = -(node.y || 0) * 0.12;
    
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.1);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.1);
    
    // Planet Rotation
    meshRef.current.rotateOnAxis(rotationAxis, delta * rotationSpeed);

    // Glow pulsing
    if ((isSignal || isCore || hovered) && glowRef.current) {
      const time = state.clock.getElapsedTime();
      const scale = (isCore ? 1.1 : 1.2) + Math.sin(time * 2) * (isCore ? 0.05 : 0.1);
      glowRef.current.scale.set(scale, scale, scale);
      glowRef.current.lookAt(state.camera.position); // Billboard the glow
    }

    if (isFailure) {
        // Slight glitch shake for failure nodes
        if (Math.random() > 0.95) {
            meshRef.current.position.x += (Math.random() - 0.5) * 0.1;
        }
    }
  });

  const size = isCore ? 3.5 : (node.val || 1) * 0.8;

  return (
    <group>
      <group
        onClick={(e) => { e.stopPropagation(); onSelect(node); }}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {/* Main Planet Mesh */}
        <mesh ref={meshRef}>
            <sphereGeometry args={[size, 64, 64]} />
            
            {isSignal ? (
                 <meshBasicMaterial color={baseColor} />
            ) : (
                <meshStandardMaterial 
                    color={hovered ? '#ffffff' : baseColor}
                    emissive={baseColor}
                    emissiveIntensity={isCore ? 0.5 : 0.1}
                    roughness={isSystem ? 0.2 : 0.8} // Systems are shiny/watery, others rough/rocky
                    metalness={isSystem ? 0.5 : 0.1}
                    flatShading={isFailure} // Failure nodes look low-poly/broken
                />
            )}

            {/* Planet Rings for Systems */}
            {isSystem && !isCore && <PlanetRing color={baseColor} size={size} />}
        </mesh>
        
        {/* Atmosphere/Glow */}
        {(isSignal || isCore || hovered) && (
          <mesh ref={glowRef} position={[meshRef.current?.position.x || 0, meshRef.current?.position.y || 0, 0]}>
            <sphereGeometry args={[size * 1.2, 32, 32]} />
            <meshBasicMaterial 
              color={isCore ? '#ffffff' : baseColor} 
              transparent 
              opacity={isCore ? 0.15 : 0.2} 
              depthWrite={false}
            />
          </mesh>
        )}

        {/* HTML Label - Moves with the group, but we anchor it to the mesh position logic in parent if needed, 
            but here useFrame updates mesh position. 
            Better to put Html INSIDE the mesh to follow it, but Html implies 0,0,0 of parent.
            Since mesh moves, we wrap Html in a Group that follows mesh position? 
            Actually, simpler to let Html follow the group if we moved the group.
            Current logic moves the mesh inside the group. Let's move the Html manually or bind it.
        */}
        <mesh position={[meshRef.current?.position.x || 0, meshRef.current?.position.y || 0, 0]}>
           {/* Invisible hit box for easier clicking */}
           <sphereGeometry args={[size * 1.5, 16, 16]} />
           <meshBasicMaterial visible={false} />
           
            <Html 
                position={[0, size + 1.5, 0]} 
                center 
                zIndexRange={[100, 0]} 
                style={{ 
                    pointerEvents: 'none',
                    transition: 'all 0.3s ease',
                    opacity: hovered ? 1 : 0.6,
                    transform: hovered ? 'scale(1.1)' : 'scale(1)'
                }}
            >
                <div className={`
                    px-3 py-1.5 rounded-full border backdrop-blur-md shadow-xl flex items-center gap-2
                    ${hovered ? 'bg-slate-900/90 border-white/50' : 'bg-slate-900/40 border-slate-700/30'}
                `}>
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: baseColor }}></div>
                    <span className="text-xs font-bold font-mono tracking-wider text-white whitespace-nowrap">
                        {node.label}
                    </span>
                </div>
            </Html>
        </mesh>
      </group>
    </group>
  );
};

const ForceLayout = ({ 
  data, 
  onSelect,
  onHoverChange
}: { 
  data: GraphData; 
  onSelect: (node: GraphNode) => void;
  onHoverChange: (isHovering: boolean) => void;
}) => {
  const simulation = useRef<any>(null);

  useEffect(() => {
    const d3Any = d3 as any;

    // INCREASED DISTANCES FOR BETTER SPACING
    simulation.current = d3Any.forceSimulation(data.nodes)
      .force('charge', d3Any.forceManyBody().strength(-600)) // Stronger repulsion
      .force('center', d3Any.forceCenter(0, 0))
      .force('collide', d3Any.forceCollide().radius((node: any) => (node.val || 1) * 25).strength(0.8)) // Larger collision radius
      .force('link', d3Any.forceLink(data.links).id((d: any) => d.id).distance(150)); // Longer links

      simulation.current.force('cluster', (alpha: number) => {
        data.nodes.forEach(node => {
            if (node.id === 'sys-core') {
                 if (node.vx) node.vx *= 0.1;
                 if (node.vy) node.vy *= 0.1;
                 node.x = node.x ? node.x * 0.9 : 0;
                 node.y = node.y ? node.y * 0.9 : 0;
                 return;
            }
            if (node.type === NodeType.SIGNAL) return; 
            
            // Adjusted cluster centers for wider spread
            let targetX = 0; 
            let targetY = 0;
            
            switch (node.type) {
                case NodeType.FAILURE: targetX = -400; targetY = 300; break;
                case NodeType.SYSTEM: targetX = 400; targetY = -300; break;
                case NodeType.DATA: targetX = 400; targetY = 300; break;
                case NodeType.THOUGHT: targetX = -400; targetY = -300; break;
            }
            
            if (node.vx !== undefined && node.x !== undefined) {
               node.vx += (targetX - node.x) * alpha * 0.02;
            }
            if (node.vy !== undefined && node.y !== undefined) {
               node.vy += (targetY - node.y) * alpha * 0.02;
            }
        });
      });

    return () => {
      simulation.current?.stop();
    };
  }, [data]);

  useFrame(() => {
    simulation.current?.tick();
  });

  return (
    <>
      {data.nodes.map((node) => (
        <NodeMesh 
            key={node.id} 
            node={node} 
            onSelect={onSelect} 
            onHoverChange={onHoverChange}
        />
      ))}
    </>
  );
};

const SystemGraph = ({ 
  data, 
  onNodeSelect 
}: { 
  data: GraphData; 
  onNodeSelect: (node: GraphNode) => void 
}) => {
  const controlsRef = useRef<any>(null);

  const handleHoverChange = (isHovering: boolean) => {
    if (controlsRef.current) {
        controlsRef.current.autoRotate = !isHovering;
    }
  };

  return (
    <div className="w-full h-full bg-slate-900 relative">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 110]} fov={55} />
        
        <color attach="background" args={['#050810']} /> {/* Darker space black */}
        <fog attach="fog" args={['#050810', 80, 200]} />
        
        <ambientLight intensity={0.2} />
        <pointLight position={[50, 50, 50]} intensity={1.5} color="#ffd4a3" /> {/* Sun light */}
        <pointLight position={[-50, -50, -50]} intensity={1} color="#4c6ef5" /> {/* Rim light */}
        
        <Stars radius={150} depth={50} count={7000} factor={4} saturation={0} fade speed={0.5} />

        <ForceLayout 
            data={data} 
            onSelect={onNodeSelect} 
            onHoverChange={handleHoverChange} 
        />
        
        <OrbitControls 
          ref={controlsRef}
          enablePan={false} 
          enableZoom={true} 
          minDistance={30} 
          maxDistance={180} 
          autoRotate 
          autoRotateSpeed={0.3} 
          dampingFactor={0.05}
        />
      </Canvas>
      
      <div className="absolute bottom-8 right-8 pointer-events-none text-slate-600 font-mono text-[10px] z-10 text-right opacity-50">
        <p>ORBITAL SIMULATION: ACTIVE</p>
        <div className="mt-2 flex flex-col gap-1 items-end">
          {Object.entries(COLORS).map(([type, color]) => (
            <div key={type} className="flex items-center gap-2">
               <span>{type}</span>
               <div className="w-2 h-2 rounded-full ring-1 ring-slate-700" style={{ background: color, boxShadow: `0 0 8px ${color}` }}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemGraph;
