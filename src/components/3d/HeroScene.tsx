'use client'

import { useRef, useEffect, useState } from 'react'
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

  // Fallback for low-performance devices
  if (isLowPerf) {
    return (
      <div className="absolute inset-0 bg-hero-gradient">
        <div className="absolute inset-0 bg-blue-glow opacity-20" />
        <div
          className="absolute inset-0 opacity-8"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,170,255,0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,170,255,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>
    )
  }

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        {/* Ambient light */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00AAFF" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#0044AA" />

        {/* 3D Components */}
        <InteractiveGrid mouse={mouse} />
        <ParticleField count={isLowPerf ? 300 : 800} />
        <FloatingGeometry mouse={mouse} />
        <NetworkLines />
      </Canvas>

      {/* CSS gradient overlay to blend with page */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-transparent to-brand-dark/80 pointer-events-none" />
    </div>
  )
}
