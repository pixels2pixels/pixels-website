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
  type: 'box' | 'octahedron' | 'icosahedron' | 'torus' | 'tetrahedron'
  color: string
  opacity: number
}

// Spread geometries across the FULL viewport — far left, far right, top, bottom corners
const geometries: GeometryConfig[] = [
  // Far left side
  { position: [-7, 2.5, -3], rotation: [0, 0, 0], scale: 1.1, speed: 0.4, type: 'icosahedron', color: '#00AAFF', opacity: 0.45 },
  { position: [-8, -2, -4], rotation: [0.5, 0, 0], scale: 0.7, speed: 0.6, type: 'octahedron', color: '#00CCFF', opacity: 0.3 },
  { position: [-5.5, 0, -2], rotation: [0, 0, 0.5], scale: 0.5, speed: 0.8, type: 'torus', color: '#0077CC', opacity: 0.25 },

  // Far right side
  { position: [7, 1.5, -3], rotation: [0, 0, 0], scale: 0.9, speed: 0.5, type: 'octahedron', color: '#00AAFF', opacity: 0.4 },
  { position: [8.5, -1.5, -4], rotation: [0.3, 0, 0], scale: 0.6, speed: 0.7, type: 'icosahedron', color: '#0055BB', opacity: 0.3 },
  { position: [6, 3, -2.5], rotation: [0, 0.5, 0], scale: 0.5, speed: 0.9, type: 'box', color: '#00CCFF', opacity: 0.2 },

  // Top area
  { position: [2, 4.5, -4], rotation: [0, 0, 0], scale: 0.7, speed: 0.35, type: 'tetrahedron', color: '#00AAFF', opacity: 0.35 },
  { position: [-2.5, 4, -3.5], rotation: [0, 0, 0.3], scale: 0.55, speed: 0.55, type: 'torus', color: '#0088DD', opacity: 0.25 },

  // Bottom area
  { position: [3, -4, -3], rotation: [0.2, 0, 0], scale: 0.65, speed: 0.45, type: 'octahedron', color: '#0077CC', opacity: 0.3 },
  { position: [-3, -3.5, -2.5], rotation: [0, 0, 0.4], scale: 0.5, speed: 0.65, type: 'icosahedron', color: '#00AAFF', opacity: 0.25 },

  // Mid-distance background elements (very subtle)
  { position: [4, -0.5, -6], rotation: [0, 0, 0], scale: 1.4, speed: 0.2, type: 'icosahedron', color: '#003366', opacity: 0.15 },
  { position: [-5, 1, -7], rotation: [0, 0, 0], scale: 1.6, speed: 0.15, type: 'octahedron', color: '#002244', opacity: 0.12 },
]

function WireframeShape({ config, mouse }: { config: GeometryConfig; mouse: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const initialPos = useRef(config.position)

  const geometry = useMemo(() => {
    switch (config.type) {
      case 'box': return new THREE.BoxGeometry(1, 1, 1)
      case 'octahedron': return new THREE.OctahedronGeometry(1)
      case 'icosahedron': return new THREE.IcosahedronGeometry(1)
      case 'torus': return new THREE.TorusGeometry(1, 0.25, 8, 20)
      case 'tetrahedron': return new THREE.TetrahedronGeometry(1)
      default: return new THREE.BoxGeometry(1, 1, 1)
    }
  }, [config.type])

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()

    // Gentle floating
    meshRef.current.position.y =
      initialPos.current[1] + Math.sin(time * config.speed + config.position[0]) * 0.25

    // Slow rotation
    meshRef.current.rotation.x += 0.002 * config.speed
    meshRef.current.rotation.y += 0.004 * config.speed

    // Very subtle mouse parallax (less than before so they don't crowd center)
    meshRef.current.position.x = initialPos.current[0] + mouse.x * 0.08
    meshRef.current.position.z = initialPos.current[2] + mouse.y * 0.04
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

// Central geometry — smaller and more subtle, doesn't dominate the text
function CentralGeometry({ mouse }: { mouse: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null)
  const outerRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!groupRef.current || !outerRef.current || !innerRef.current) return
    const time = state.clock.getElapsedTime()

    // Gentle drift with mouse
    groupRef.current.position.x = mouse.x * 0.15
    groupRef.current.position.y = mouse.y * 0.1 + Math.sin(time * 0.4) * 0.08

    outerRef.current.rotation.y = time * 0.25
    outerRef.current.rotation.x = time * 0.15
    innerRef.current.rotation.y = -time * 0.4
    innerRef.current.rotation.z = time * 0.25
  })

  return (
    // Positioned slightly behind and above center — not blocking the text
    <group ref={groupRef} position={[0, 0.5, -1.5]}>
      {/* Outer icosahedron — subtle */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.0, 1]} />
        <meshBasicMaterial color="#00AAFF" wireframe transparent opacity={0.12} />
      </mesh>

      {/* Inner octahedron */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.55]} />
        <meshBasicMaterial color="#00CCFF" wireframe transparent opacity={0.2} />
      </mesh>

      {/* Core glow point */}
      <mesh>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial color="#00CCFF" transparent opacity={0.9} />
      </mesh>

      {/* Orbiting ring */}
      <mesh rotation={[Math.PI / 2.5, 0.3, 0]}>
        <torusGeometry args={[1.2, 0.015, 8, 64]} />
        <meshBasicMaterial color="#0077CC" transparent opacity={0.2} />
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
