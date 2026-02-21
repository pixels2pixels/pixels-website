'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createParticlePositions } from '@/lib/three-utils'

interface ParticleFieldProps {
  count?: number
  spread?: number
}

export default function ParticleField({ count = 1200, spread = 28 }: ParticleFieldProps) {
  const meshRef = useRef<THREE.Points>(null)

  const { positions, sizes, colors } = useMemo(() => {
    const positions = createParticlePositions(count, spread)
    const sizes = new Float32Array(count)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      sizes[i] = Math.random() * 2.5 + 0.3

      // 20% bright blue, 80% dim blue-white
      const isBright = Math.random() > 0.8
      if (isBright) {
        colors[i * 3]     = 0.0
        colors[i * 3 + 1] = 0.67
        colors[i * 3 + 2] = 1.0
      } else {
        const b = 0.15 + Math.random() * 0.25
        colors[i * 3]     = b * 0.4
        colors[i * 3 + 1] = b * 0.55
        colors[i * 3 + 2] = b
      }
    }

    return { positions, sizes, colors }
  }, [count, spread])

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()

    // Very slow rotation — feels like drifting through space
    meshRef.current.rotation.y = time * 0.015
    meshRef.current.rotation.x = Math.sin(time * 0.008) * 0.08

    // Subtle breathing
    const scale = 1 + Math.sin(time * 0.4) * 0.015
    meshRef.current.scale.setScalar(scale)
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
