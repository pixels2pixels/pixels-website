'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createParticlePositions } from '@/lib/three-utils'

interface ParticleFieldProps {
  count?: number
  spread?: number
}

export default function ParticleField({ count = 800, spread = 20 }: ParticleFieldProps) {
  const meshRef = useRef<THREE.Points>(null)

  const { positions, sizes, colors } = useMemo(() => {
    const positions = createParticlePositions(count, spread)
    const sizes = new Float32Array(count)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      sizes[i] = Math.random() * 2 + 0.5

      // Mix of blue and white particles
      const isBright = Math.random() > 0.7
      if (isBright) {
        colors[i * 3] = 0.0      // R
        colors[i * 3 + 1] = 0.67 // G
        colors[i * 3 + 2] = 1.0  // B (brand blue)
      } else {
        const brightness = 0.3 + Math.random() * 0.3
        colors[i * 3] = brightness * 0.5
        colors[i * 3 + 1] = brightness * 0.6
        colors[i * 3 + 2] = brightness
      }
    }

    return { positions, sizes, colors }
  }, [count, spread])

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()

    // Slow rotation
    meshRef.current.rotation.y = time * 0.02
    meshRef.current.rotation.x = Math.sin(time * 0.01) * 0.1

    // Subtle breathing effect
    const scale = 1 + Math.sin(time * 0.5) * 0.02
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
        size={0.05}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
