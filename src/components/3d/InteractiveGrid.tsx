'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface InteractiveGridProps {
  mouse: { x: number; y: number }
  size?: number
  divisions?: number
}

export default function InteractiveGrid({
  mouse,
  size = 40,
  divisions = 24,
}: InteractiveGridProps) {
  const groupRef = useRef<THREE.Group>(null)
  const targetRotation = useRef({ x: 0, y: 0 })
  const currentRotation = useRef({ x: 0, y: 0 })

  const gridGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const vertices: number[] = []
    const step = size / divisions
    const halfSize = size / 2

    for (let i = 0; i <= divisions; i++) {
      const pos = -halfSize + i * step
      vertices.push(-halfSize, 0, pos, halfSize, 0, pos)
      vertices.push(pos, 0, -halfSize, pos, 0, halfSize)
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    return geometry
  }, [size, divisions])

  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()

    // Subtle mouse tilt
    targetRotation.current.x = mouse.y * 0.08
    targetRotation.current.y = mouse.x * 0.06

    currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.04
    currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.04

    // Perspective tilt — grid recedes into the distance at the bottom
    groupRef.current.rotation.x = -0.55 + currentRotation.current.x
    groupRef.current.rotation.y = currentRotation.current.y

    // Slow vertical drift
    groupRef.current.position.y = -4.5 + Math.sin(time * 0.25) * 0.15
  })

  return (
    <group ref={groupRef}>
      {/* Primary grid — fills the lower screen */}
      <lineSegments geometry={gridGeometry}>
        <lineBasicMaterial
          color="#00AAFF"
          transparent
          opacity={0.09}
          depthWrite={false}
        />
      </lineSegments>

      {/* Secondary rotated grid — adds depth */}
      <lineSegments geometry={gridGeometry} rotation={[0, Math.PI / 6, 0]} scale={0.85}>
        <lineBasicMaterial
          color="#0055AA"
          transparent
          opacity={0.05}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  )
}
