'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const NODE_COUNT = 30
const CONNECTION_DISTANCE = 4

function generateNodes(count: number): THREE.Vector3[] {
  return Array.from({ length: count }, () =>
    new THREE.Vector3(
      (Math.random() - 0.5) * 16,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 8 - 2
    )
  )
}

export default function NetworkLines() {
  const linesRef = useRef<THREE.LineSegments>(null)
  const nodesRef = useRef<THREE.Points>(null)
  const nodeVelocities = useRef<THREE.Vector3[]>([])
  const nodes = useRef<THREE.Vector3[]>(generateNodes(NODE_COUNT))

  // Initialize velocities
  useMemo(() => {
    nodeVelocities.current = Array.from({ length: NODE_COUNT }, () =>
      new THREE.Vector3(
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.003
      )
    )
  }, [])

  const nodePositions = useMemo(() => {
    const arr = new Float32Array(NODE_COUNT * 3)
    nodes.current.forEach((node, i) => {
      arr[i * 3] = node.x
      arr[i * 3 + 1] = node.y
      arr[i * 3 + 2] = node.z
    })
    return arr
  }, [])

  useFrame(() => {
    if (!linesRef.current || !nodesRef.current) return

    // Update node positions
    nodes.current.forEach((node, i) => {
      node.add(nodeVelocities.current[i])

      // Bounce off boundaries
      if (Math.abs(node.x) > 8) nodeVelocities.current[i].x *= -1
      if (Math.abs(node.y) > 5) nodeVelocities.current[i].y *= -1
      if (node.z > 0 || node.z < -10) nodeVelocities.current[i].z *= -1
    })

    // Update node geometry
    const nodePos = nodesRef.current.geometry.attributes.position as THREE.BufferAttribute
    nodes.current.forEach((node, i) => {
      nodePos.setXYZ(i, node.x, node.y, node.z)
    })
    nodePos.needsUpdate = true

    // Rebuild line connections
    const lineVertices: number[] = []
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dist = nodes.current[i].distanceTo(nodes.current[j])
        if (dist < CONNECTION_DISTANCE) {
          lineVertices.push(
            nodes.current[i].x, nodes.current[i].y, nodes.current[i].z,
            nodes.current[j].x, nodes.current[j].y, nodes.current[j].z
          )
        }
      }
    }

    const linePos = linesRef.current.geometry.attributes.position as THREE.BufferAttribute
    const newPositions = new Float32Array(lineVertices)

    // Only update if size matches (avoid reallocation every frame)
    if (linePos.array.length === newPositions.length) {
      linePos.array.set(newPositions)
      linePos.needsUpdate = true
    } else {
      linesRef.current.geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(newPositions, 3)
      )
    }
  })

  // Initial line geometry (will be updated in useFrame)
  const initialLineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const vertices: number[] = []
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dist = nodes.current[i].distanceTo(nodes.current[j])
        if (dist < CONNECTION_DISTANCE) {
          vertices.push(
            nodes.current[i].x, nodes.current[i].y, nodes.current[i].z,
            nodes.current[j].x, nodes.current[j].y, nodes.current[j].z
          )
        }
      }
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices.length ? vertices : [0, 0, 0, 0, 0, 0], 3))
    return geometry
  }, [])

  return (
    <group>
      {/* Network lines */}
      <lineSegments ref={linesRef} geometry={initialLineGeometry}>
        <lineBasicMaterial
          color="#00AAFF"
          transparent
          opacity={0.15}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Network nodes */}
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={NODE_COUNT}
            array={nodePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00CCFF"
          size={0.08}
          transparent
          opacity={0.6}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}
