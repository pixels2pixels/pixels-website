'use client'

import { useEffect, useRef, useState } from 'react'

// Pure canvas 2D implementation — no Three.js dependency issues,
// maximum performance, cosmix.ai-style interactive particle network
export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, px: 0, py: 0 })
  const animRef = useRef<number>(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // ── CONFIG ──────────────────────────────────────────────────────────────
    const PARTICLE_COUNT = 120
    const CONNECTION_DIST = 160
    const MOUSE_REPEL_DIST = 120
    const MOUSE_ATTRACT_DIST = 200
    const BASE_SPEED = 0.35
    const COLORS = {
      bg: '#020408',
      particle: '#00AAFF',
      particleDim: '#003366',
      line: '#00AAFF',
      mouseGlow: 'rgba(0,170,255,0.15)',
      mouseDot: '#00CCFF',
    }

    // ── RESIZE ───────────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // ── PARTICLES ────────────────────────────────────────────────────────────
    interface Particle {
      x: number; y: number
      vx: number; vy: number
      r: number
      baseR: number
      brightness: number
      pulse: number
      pulseSpeed: number
    }

    const particles: Particle[] = []

    const spawn = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * BASE_SPEED,
      vy: (Math.random() - 0.5) * BASE_SPEED,
      r: Math.random() * 2 + 1,
      baseR: Math.random() * 2 + 1,
      brightness: Math.random() * 0.6 + 0.4,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.03,
    })

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(spawn())

    // ── MOUSE ────────────────────────────────────────────────────────────────
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.px = mouseRef.current.x
      mouseRef.current.py = mouseRef.current.y
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }
    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      const t = e.touches[0]
      mouseRef.current.x = t.clientX - rect.left
      mouseRef.current.y = t.clientY - rect.top
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true })

    // ── DRAW HELPERS ─────────────────────────────────────────────────────────
    const drawGlowLine = (
      x1: number, y1: number,
      x2: number, y2: number,
      alpha: number,
      width: number = 0.6
    ) => {
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.strokeStyle = `rgba(0,170,255,${alpha})`
      ctx.lineWidth = width
      ctx.stroke()
    }

    const drawParticle = (p: Particle) => {
      // Outer glow
      const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4)
      grd.addColorStop(0, `rgba(0,170,255,${p.brightness * 0.5})`)
      grd.addColorStop(1, 'rgba(0,170,255,0)')
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2)
      ctx.fillStyle = grd
      ctx.fill()

      // Core dot
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(0,${Math.floor(150 + p.brightness * 80)},255,${p.brightness})`
      ctx.fill()
    }

    // ── ANIMATION LOOP ───────────────────────────────────────────────────────
    let t = 0
    const draw = () => {
      animRef.current = requestAnimationFrame(draw)
      t += 0.016
      const { x: mx, y: my } = mouseRef.current
      const w = canvas.width
      const h = canvas.height

      // Background
      ctx.fillStyle = COLORS.bg
      ctx.fillRect(0, 0, w, h)

      // Subtle grid
      ctx.strokeStyle = 'rgba(0,170,255,0.04)'
      ctx.lineWidth = 1
      const gridSize = 80
      for (let gx = 0; gx < w; gx += gridSize) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, h); ctx.stroke()
      }
      for (let gy = 0; gy < h; gy += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke()
      }

      // Mouse glow aura
      if (mx > 0 && my > 0) {
        const aura = ctx.createRadialGradient(mx, my, 0, mx, my, MOUSE_ATTRACT_DIST)
        aura.addColorStop(0, 'rgba(0,170,255,0.08)')
        aura.addColorStop(0.5, 'rgba(0,100,200,0.04)')
        aura.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.beginPath()
        ctx.arc(mx, my, MOUSE_ATTRACT_DIST, 0, Math.PI * 2)
        ctx.fillStyle = aura
        ctx.fill()
      }

      // Update + draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Pulse
        p.pulse += p.pulseSpeed
        p.r = p.baseR + Math.sin(p.pulse) * 0.4

        // Mouse interaction
        const dx = mx - p.x
        const dy = my - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < MOUSE_REPEL_DIST && dist > 0) {
          // Repel from cursor
          const force = (MOUSE_REPEL_DIST - dist) / MOUSE_REPEL_DIST
          p.vx -= (dx / dist) * force * 0.8
          p.vy -= (dy / dist) * force * 0.8
        } else if (dist < MOUSE_ATTRACT_DIST && dist > MOUSE_REPEL_DIST) {
          // Gentle attract toward cursor orbit
          const force = (dist - MOUSE_REPEL_DIST) / (MOUSE_ATTRACT_DIST - MOUSE_REPEL_DIST) * 0.05
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        }

        // Speed limit
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > BASE_SPEED * 3) {
          p.vx = (p.vx / speed) * BASE_SPEED * 3
          p.vy = (p.vy / speed) * BASE_SPEED * 3
        }

        // Damping
        p.vx *= 0.99
        p.vy *= 0.99

        // Move
        p.x += p.vx
        p.y += p.vy

        // Wrap around edges
        if (p.x < -20) p.x = w + 20
        if (p.x > w + 20) p.x = -20
        if (p.y < -20) p.y = h + 20
        if (p.y > h + 20) p.y = -20

        drawParticle(p)
      }

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.35
            const width = (1 - dist / CONNECTION_DIST) * 1.2
            drawGlowLine(a.x, a.y, b.x, b.y, alpha, width)
          }
        }
      }

      // Draw connections from mouse to nearby particles
      if (mx > 0 && my > 0) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i]
          const dx = mx - p.x
          const dy = my - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < MOUSE_ATTRACT_DIST) {
            const alpha = (1 - dist / MOUSE_ATTRACT_DIST) * 0.5
            drawGlowLine(mx, my, p.x, p.y, alpha, 0.8)
          }
        }

        // Mouse cursor dot
        ctx.beginPath()
        ctx.arc(mx, my, 3, 0, Math.PI * 2)
        ctx.fillStyle = COLORS.mouseDot
        ctx.fill()

        // Pulsing ring around cursor
        const ringR = 12 + Math.sin(t * 3) * 3
        ctx.beginPath()
        ctx.arc(mx, my, ringR, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(0,200,255,${0.3 + Math.sin(t * 3) * 0.15})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Floating scan line effect
      const scanY = ((t * 60) % (h + 40)) - 20
      const scanGrd = ctx.createLinearGradient(0, scanY - 2, 0, scanY + 2)
      scanGrd.addColorStop(0, 'rgba(0,170,255,0)')
      scanGrd.addColorStop(0.5, 'rgba(0,170,255,0.04)')
      scanGrd.addColorStop(1, 'rgba(0,170,255,0)')
      ctx.fillStyle = scanGrd
      ctx.fillRect(0, scanY - 2, w, 4)
    }

    draw()

    return () => {
      cancelAnimationFrame(animRef.current)
      ro.disconnect()
      window.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('touchmove', handleTouchMove)
    }
  }, [mounted])

  return (
    <div className="absolute inset-0" style={{ background: '#020408' }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </div>
  )
}
