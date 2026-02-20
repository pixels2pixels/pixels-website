import * as THREE from 'three'

// ─── Color Palette ────────────────────────────────────────────────────────────

export const BRAND_COLORS = {
  blue: new THREE.Color('#00AAFF'),
  blueGlow: new THREE.Color('#00CCFF'),
  blueDark: new THREE.Color('#0044AA'),
  dark: new THREE.Color('#0A0A0F'),
  white: new THREE.Color('#F0F0FF'),
}

// ─── Geometry Helpers ─────────────────────────────────────────────────────────

export function createWireframeGeometry(type: 'box' | 'octahedron' | 'icosahedron' | 'torus', scale = 1) {
  switch (type) {
    case 'box':
      return new THREE.BoxGeometry(scale, scale, scale)
    case 'octahedron':
      return new THREE.OctahedronGeometry(scale)
    case 'icosahedron':
      return new THREE.IcosahedronGeometry(scale)
    case 'torus':
      return new THREE.TorusGeometry(scale, scale * 0.3, 8, 16)
    default:
      return new THREE.BoxGeometry(scale, scale, scale)
  }
}

// ─── Particle System ──────────────────────────────────────────────────────────

export function createParticlePositions(count: number, spread: number): Float32Array {
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * spread
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread
    positions[i * 3 + 2] = (Math.random() - 0.5) * spread
  }
  return positions
}

// ─── Grid Lines ───────────────────────────────────────────────────────────────

export function createGridLines(
  size: number,
  divisions: number,
  color: THREE.Color
): THREE.LineSegments {
  const geometry = new THREE.BufferGeometry()
  const vertices: number[] = []
  const step = size / divisions
  const halfSize = size / 2

  for (let i = 0; i <= divisions; i++) {
    const pos = -halfSize + i * step
    // Horizontal lines
    vertices.push(-halfSize, 0, pos, halfSize, 0, pos)
    // Vertical lines
    vertices.push(pos, 0, -halfSize, pos, 0, halfSize)
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.3 })
  return new THREE.LineSegments(geometry, material)
}

// ─── Performance Detection ────────────────────────────────────────────────────

export function detectLowPerformance(): boolean {
  if (typeof window === 'undefined') return false
  
  // Check for mobile devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  // Check hardware concurrency (CPU cores)
  const lowCPU = navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 2
  
  return isMobile || prefersReducedMotion || lowCPU
}

// ─── Mouse Parallax ───────────────────────────────────────────────────────────

export function normalizeMousePosition(
  clientX: number,
  clientY: number,
  width: number,
  height: number
): { x: number; y: number } {
  return {
    x: (clientX / width - 0.5) * 2,
    y: -(clientY / height - 0.5) * 2,
  }
}

// ─── Easing ───────────────────────────────────────────────────────────────────

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}
