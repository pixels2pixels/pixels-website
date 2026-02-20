'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface FloatingGeometryProps {
  mouse: { x: number; y: number }
}

interface GeometryConfig {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  speed: number
  type: 'box' | 'octahedron' | 'icosahedron' | 'torus'
  color: string
  opacity: number
}

const geometries: GeometryConfig[] = [
  { position: [3, 1, -2], rotation: [0, 0, 0], scale: 0.8, speed: 0.5, type: 'icosahedron', color: '#00AAFF', opacity: 0.5 },
  { position: [-3.5, 0.5, -1], rotation: [0.5, 0, 0], scale: 0.6, speed: 0.7, type: 'octahedron', color: '#00CCFF', opacity: 0.4 },
  { position: [0, 2, -3], rotation: [0, 0, 0.5], scale: 1.0, speed: 0.3, type: 'box', color: '#0077CC', opacity: 0.3 },
  { position: [4.5, -1, -2], rotation: [0, 0, 0], scale: 0.5, speed: 0.9, type: 'torus', color: '#00AAFF', opacity: 0.35 },
  { position: [-4, -1.5, -1.5], rotation: [0.3, 0, 0], scale: 0.7, speed: 0.6, type: 'icosahedron', color: '#0055BB', opacity: 0.3 },
]

function WireframeShape({ config, mouse }: { config: GeometryConfig; mouse: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const initialPos = useRef(config.position)

  const geometry = useMemo(() => {
    switch (config.type) {
      case 'box': return new THREE.BoxGeometry(1, 1, 1)
      case 'octahedron': return new THREE.OctahedronGeometry(1)
      case 'icosahedron': return new THREE.IcosahedronGeometry(1)
      case 'torus': return new THREE.TorusGeometry(1, 0.3, 8, 16)
      default: return new THREE.BoxGeometry(1, 1, 1)
    }
  }, [config.type])

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()

    // Floating animation
    meshRef.current.position.y = initialPos.current[1] + Math.sin(time * config.speed + config.position[0]) * 0.3

    // Rotation
    meshRef.current.rotation.x += 0.003 * config.speed
    meshRef.current.rotation.y += 0.005 * config.speed

    // Mouse parallax (subtle)
    meshRef.current.position.x = initialPos.current[0] + mouse.x * 0.1
    meshRef.current.position.z = initialPos.current[2] + mouse.y * 0.05
  })

  return (
    <mesh
      ref={meshRef}
      position={config.position}
      rotation={config.rotation}
      scale={config.scale}
      geometry={geometry}
    >
      <meshBasicMaterial
        color={config.color}
        wireframe
        transparent
        opacity={config.opacity}
      />
    </mesh>
  )
}

// Central featured geometry (larger, more prominent)
function CentralGeometry({ mouse }: { mouse: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null)
  const outerRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!groupRef.current || !outerRef.current || !innerRef.current) return
    const time = state.clock.getElapsedTime()

    // Mouse parallax
    groupRef.current.position.x = mouse.x * 0.3
    groupRef.current.position.y = mouse.y * 0.2 + Math.sin(time * 0.5) * 0.1

    // Counter-rotating rings
    outerRef.current.rotation.y = time * 0.3
    outerRef.current.rotation.x = time * 0.2
    innerRef.current.rotation.y = -time * 0.5
    innerRef.current.rotation.z = time * 0.3
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Outer icosahedron */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial color="#00AAFF" wireframe transparent opacity={0.25} />
      </mesh>

      {/* Inner octahedron */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.7]} />
        <meshBasicMaterial color="#00CCFF" wireframe transparent opacity={0.4} />
      </mesh>

      {/* Core sphere glow */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#00CCFF" transparent opacity={0.8} />
      </mesh>

      {/* Orbiting ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.02, 8, 64]} />
        <meshBasicMaterial color="#0077CC" transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

export default function FloatingGeometry({ mouse }: FloatingGeometryProps) {
  return (
    <group>
      <CentralGeometry mouse={mouse} />
      {geometries.map((config, i) => (
        <WireframeShape key={i} config={config} mouse={mouse} />
      ))}
    </group>
  )
}
