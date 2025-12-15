import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera, Html } from '@react-three/drei';
import * as THREE from 'three';
import * as d3 from 'd3';
import { GraphData, GraphNode, NodeType } from '../types';
import { COLORS } from '../constants';

// Type augmentation for R3F elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      sphereGeometry: any;
      meshStandardMaterial: any;
      meshBasicMaterial: any;
      lineSegments: any;
      lineBasicMaterial: any;
      color: any;
      fog: any;
      ambientLight: any;
      pointLight: any;
    }
  }

  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        group: any;
        mesh: any;
        sphereGeometry: any;
        meshStandardMaterial: any;
        meshBasicMaterial: any;
        lineSegments: any;
        lineBasicMaterial: any;
        color: any;
        fog: any;
        ambientLight: any;
        pointLight: any;
      }
    }
  }
}

// --- Safe Material Component ---
// Replaces useTexture with manual loader to avoid App crashes on 404s
const SafeNodeMaterial: React.FC<{ 
  url?: string; 
  baseColor: string; 
  hovered: boolean;
}> = ({ url, baseColor, hovered }) => {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!url) {
      setTexture(null);
      setError(false);
      return;
    }

    const loader = new THREE.TextureLoader();
    // Use encodeURI to handle spaces/special chars in filenames
    const safeUrl = encodeURI(url); 
    
    loader.load(
      safeUrl,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        setTexture(tex);
        setError(false);
      },
      undefined,
      (err) => {
        console.warn(`Failed to load texture: ${url}`, err);
        setError(true);
      }
    );
    
    return () => {
        // Cleanup if needed
    };
  }, [url]);

  // Fallback or Default Material
  if (error || !texture || !url) {
    return (
      <meshStandardMaterial 
        color={baseColor} 
        emissive={baseColor}
        emissiveIntensity={hovered ? 0.8 : 0.2}
        roughness={0.4}
        metalness={0.6}
      />
    );
  }

  // Image Texture Material
  return (
    <meshStandardMaterial 
      map={texture} 
      emissiveMap={texture}
      emissive="white"
      emissiveIntensity={0.4}
      color={"white"}
      roughness={0.2}
      metalness={0.1}
    />
  );
};

// --- Sub-Components ---

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
  
  // Color logic
  const baseColor = COLORS[node.type];
  const isSignal = node.type === NodeType.SIGNAL;
  const isFailure = node.type === NodeType.FAILURE;
  const isCore = node.id === 'sys-core';

  // Hover Handler
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

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Sync position with D3
    const time = state.clock.getElapsedTime();
    const zDrift = Math.sin(time * 0.5 + (node.index || 0)) * (isCore ? 0 : 5);
    
    const targetX = (node.x || 0) * 0.1;
    const targetY = -(node.y || 0) * 0.1;
    
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.1);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.1);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, zDrift, 0.05);

    // Pulse effect
    if ((isSignal || isCore || hovered) && glowRef.current) {
      const scale = (isCore ? 1.1 : 1.2) + Math.sin(time * 2) * (isCore ? 0.05 : 0.2);
      glowRef.current.scale.set(scale, scale, scale);
      if (isCore) {
        glowRef.current.rotation.y += 0.005;
        glowRef.current.rotation.z += 0.002;
      }
    }

    if (isFailure) {
        meshRef.current.position.x += (Math.random() - 0.5) * 0.05;
        meshRef.current.position.y += (Math.random() - 0.5) * 0.05;
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onSelect(node); }}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[isCore ? 2.5 : (node.val || 1) * 0.6, 64, 64]} />
        
        {/* Unified Safe Material */}
        <SafeNodeMaterial 
            url={node.img} 
            baseColor={baseColor} 
            hovered={hovered} 
        />
        
        {/* Glow Shell for Special Nodes */}
        {(isSignal || isCore || hovered) && (
          <mesh ref={glowRef}>
            <sphereGeometry args={[isCore ? 2.5 : 1.5, 32, 32]} />
            <meshBasicMaterial 
              color={isCore ? '#ffffff' : baseColor} 
              transparent 
              opacity={isCore ? 0.1 : 0.15} 
              wireframe={!isCore}
            />
          </mesh>
        )}

        {/* --- ALWAYS VISIBLE CARD (Updated Size and Content) --- */}
        <Html 
            position={[0, isCore ? 3.5 : 2.5, 0]} 
            center 
            zIndexRange={[100, 0]} 
            style={{ 
                pointerEvents: 'none',
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Spring-like feel
                opacity: hovered ? 1 : 0.9,
                transform: hovered ? 'scale(1.05)' : 'scale(0.9)'
            }}
        >
          <div className={`
              flex flex-col items-center 
              ${hovered ? 'bg-slate-900/95 border-amber-500/80 z-50 shadow-amber-500/20' : 'bg-slate-900/50 border-slate-700/40'}
              backdrop-blur-md border rounded-lg shadow-2xl transition-all duration-300
              w-64 md:w-80 overflow-hidden
          `}>
            {/* Header / Label */}
            <div className={`
                flex items-center justify-between px-4 py-2 w-full
                ${hovered ? 'bg-white/5 border-b border-white/10' : ''}
            `}>
                <div className="flex flex-col items-start">
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest opacity-80 mb-0.5">
                        {node.type} NODE
                    </span>
                    <span className="text-sm md:text-base text-white font-bold tracking-wide whitespace-nowrap" style={{ color: hovered ? '#fff' : baseColor }}>
                        {node.label}
                    </span>
                </div>
                {/* Status dot */}
                <div className={`w-2 h-2 rounded-full ${hovered ? 'animate-pulse' : ''}`} style={{ backgroundColor: baseColor }}></div>
            </div>

            {/* Description Body - Always visible now, but expanded styling on hover */}
            <div className={`
                w-full px-4 py-3 bg-black/20
                transition-all duration-300
            `}>
               <p className="text-xs text-slate-300 leading-relaxed font-sans">
                   {node.description}
               </p>
               
               {/* Metadata Footer (Only on Hover) */}
               <div className={`
                   mt-3 pt-2 border-t border-white/10 flex justify-between items-center
                   transition-all duration-300
                   ${hovered ? 'opacity-100 max-h-10' : 'opacity-0 max-h-0 overflow-hidden'}
               `}>
                    <span className="text-[9px] font-mono text-slate-500 uppercase">Interactive</span>
                    <span className="text-[9px] text-amber-500 font-mono animate-pulse">CLICK_TO_ACCESS</span>
               </div>
            </div>
          </div>
        </Html>
      </mesh>
    </group>
  );
};

// Physics Engine
const ForceLayout = ({ 
  data, 
  onSelect,
  onHoverChange
}: { 
  data: GraphData; 
  onSelect: (node: GraphNode) => void;
  onHoverChange: (isHovering: boolean) => void;
}) => {
  // Use any to bypass d3 type errors for Simulation
  const simulation = useRef<any>(null);

  useEffect(() => {
    // Cast d3 to any because the environment types seem to be missing exports
    const d3Any = d3 as any;

    simulation.current = d3Any.forceSimulation(data.nodes)
      .force('charge', d3Any.forceManyBody().strength(-300))
      .force('center', d3Any.forceCenter(0, 0))
      .force('collide', d3Any.forceCollide().radius((node: any) => (node.val || 1) * 15).strength(0.7))
      .force('link', d3Any.forceLink(data.links).id((d: any) => d.id).distance(100));

      simulation.current.force('cluster', (alpha: number) => {
        data.nodes.forEach(node => {
            if (node.id === 'sys-core') {
                 // Keep core at center tightly
                 if (node.vx) node.vx *= 0.1;
                 if (node.vy) node.vy *= 0.1;
                 node.x = node.x ? node.x * 0.9 : 0;
                 node.y = node.y ? node.y * 0.9 : 0;
                 return;
            }
            if (node.type === NodeType.SIGNAL) return; 
            
            let targetX = 0; 
            let targetY = 0;
            
            switch (node.type) {
                case NodeType.FAILURE: targetX = -300; targetY = 200; break;
                case NodeType.SYSTEM: targetX = 300; targetY = -200; break;
                case NodeType.DATA: targetX = 300; targetY = 200; break;
                case NodeType.THOUGHT: targetX = -300; targetY = -200; break;
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
      {/* Removed FlowingLines component to remove "lanes" */}
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

// Main Scene Component
const SystemGraph = ({ 
  data, 
  onNodeSelect 
}: { 
  data: GraphData; 
  onNodeSelect: (node: GraphNode) => void 
}) => {
  const controlsRef = useRef<any>(null);

  // Stop rotation when hovering a node
  const handleHoverChange = (isHovering: boolean) => {
    if (controlsRef.current) {
        controlsRef.current.autoRotate = !isHovering;
    }
  };

  return (
    <div className="w-full h-full bg-slate-900 relative">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 90]} fov={60} />
        
        {/* Environment */}
        <color attach="background" args={['#0f172a']} />
        <fog attach="fog" args={['#0f172a', 50, 150]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#38bdf8" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#f87171" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        {/* Content */}
        <ForceLayout 
            data={data} 
            onSelect={onNodeSelect} 
            onHoverChange={handleHoverChange} 
        />
        
        <OrbitControls 
          ref={controlsRef}
          enablePan={false} 
          enableZoom={true} 
          minDistance={20} 
          maxDistance={120} 
          autoRotate 
          autoRotateSpeed={0.5} 
          dampingFactor={0.05}
        />
      </Canvas>
      
      {/* HUD / Overlay Hints */}
      <div className="absolute bottom-8 right-8 pointer-events-none text-slate-500 font-mono text-[10px] z-10 text-right">
        <p>SYSTEM STATUS: ONLINE</p>
        <p>ENTROPY: STABLE</p>
        <p>NODES: {data.nodes.length}</p>
        <div className="mt-4 flex flex-col gap-1 items-end">
          {Object.entries(COLORS).map(([type, color]) => (
            <div key={type} className="flex items-center gap-2">
               <span>{type}</span>
               <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }}></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemGraph;