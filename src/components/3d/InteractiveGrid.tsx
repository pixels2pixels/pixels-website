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
  size = 30,
  divisions = 20,
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
      // Lines along X axis
      vertices.push(-halfSize, 0, pos, halfSize, 0, pos)
      // Lines along Z axis
      vertices.push(pos, 0, -halfSize, pos, 0, halfSize)
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    return geometry
  }, [size, divisions])

  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()

    // Mouse parallax
    targetRotation.current.x = mouse.y * 0.15
    targetRotation.current.y = mouse.x * 0.1

    // Smooth lerp
    currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.05
    currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.05

    groupRef.current.rotation.x = -0.4 + currentRotation.current.x
    groupRef.current.rotation.y = currentRotation.current.y

    // Subtle floating
    groupRef.current.position.y = -3 + Math.sin(time * 0.3) * 0.2
  })

  return (
    <group ref={groupRef}>
      {/* Main grid */}
      <lineSegments geometry={gridGeometry}>
        <lineBasicMaterial
          color="#00AAFF"
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </lineSegments>

      {/* Secondary grid (slightly offset, more transparent) */}
      <lineSegments geometry={gridGeometry} rotation={[0, Math.PI / 4, 0]} scale={0.7}>
        <lineBasicMaterial
          color="#0044AA"
          transparent
          opacity={0.06}
          depthWrite={false}
        />
      </lineSegments>

      {/* Glowing center cross */}
      <GlowingCross />
    </group>
  )
}

function GlowingCross() {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!ref.current) return
    const time = state.clock.getElapsedTime()
    const opacity = 0.4 + Math.sin(time * 2) * 0.2
    ref.current.children.forEach((child) => {
      if (child instanceof THREE.LineSegments) {
        const mat = child.material as THREE.LineBasicMaterial
        mat.opacity = opacity
      }
    })
  })

  const crossGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const vertices = [
      -5, 0, 0, 5, 0, 0,
      0, 0, -5, 0, 0, 5,
    ]
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    return geometry
  }, [])

  return (
    <group ref={ref}>
      <lineSegments geometry={crossGeometry}>
        <lineBasicMaterial color="#00CCFF" transparent opacity={0.5} depthWrite={false} />
      </lineSegments>
    </group>
  )
}
