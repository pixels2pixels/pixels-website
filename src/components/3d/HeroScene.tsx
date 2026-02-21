'use client'

import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { detectLowPerformance } from '@/lib/three-utils'
import ParticleField from './ParticleField'
import InteractiveGrid from './InteractiveGrid'
import FloatingGeometry from './FloatingGeometry'
import NetworkLines from './NetworkLines'

export default function HeroScene() {
  const [isLowPerf, setIsLowPerf] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsLowPerf(detectLowPerformance())
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  if (isLowPerf) {
    return (
      <div className="absolute inset-0" style={{ background: '#020408' }}>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,170,255,0.25) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,170,255,0.25) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>
    )
  }

  return (
    <div className="absolute inset-0" style={{ background: '#020408' }}>
      <Canvas
        // Wider FOV (75°) + camera pulled back so elements spread across full screen
        camera={{ position: [0, 0, 10], fov: 75 }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        style={{ background: '#020408' }}
      >
        <ambientLight intensity={0.15} />
        <pointLight position={[12, 8, 8]} intensity={0.4} color="#00AAFF" />
        <pointLight position={[-12, -8, -8]} intensity={0.25} color="#003388" />

        {/* Grid — tilted perspective plane filling the bottom half */}
        <InteractiveGrid mouse={mouse} size={40} divisions={24} />

        {/* Particles spread across full volume */}
        <ParticleField count={isLowPerf ? 400 : 1200} spread={28} />

        {/* Wireframe shapes distributed across the viewport */}
        <FloatingGeometry mouse={mouse} />

        {/* Network connection lines */}
        <NetworkLines />
      </Canvas>
    </div>
  )
}
