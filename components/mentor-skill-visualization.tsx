"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface SkillNode {
  id: string
  name: string
  level: number
  category: string
  x?: number
  y?: number
  color?: string
}

interface SkillConnection {
  source: string
  target: string
  strength: number
}

interface MentorSkillVisualizationProps {
  mentorName: string
  skills: SkillNode[]
  connections: SkillConnection[]
  width?: number
  height?: number
  onSkillClick?: (skillId: string) => void
}

export function MentorSkillVisualization({
  mentorName,
  skills,
  connections,
  width = 600,
  height = 400,
  onSkillClick,
}: MentorSkillVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Category colors
  const categoryColors: Record<string, string> = {
    technical: "#3b82f6", // blue
    career: "#10b981", // green
    soft: "#8b5cf6", // purple
    leadership: "#f59e0b", // amber
    industry: "#ef4444", // red
    default: "#6b7280", // gray
  }

  // Position nodes in a force-directed layout
  useEffect(() => {
    // Simple force-directed layout algorithm
    const positionNodes = () => {
      // Initialize random positions if not set
      skills.forEach((node) => {
        if (node.x === undefined || node.y === undefined) {
          node.x = Math.random() * width
          node.y = Math.random() * height
        }

        // Set color based on category
        node.color = categoryColors[node.category] || categoryColors.default
      })

      // Run simulation steps
      const iterations = 50
      const k = 20 // optimal distance

      for (let i = 0; i < iterations; i++) {
        // Calculate repulsive forces between all nodes
        skills.forEach((node1) => {
          let fx = 0,
            fy = 0

          // Repulsive forces from other nodes
          skills.forEach((node2) => {
            if (
              node1.id !== node2.id &&
              node1.x !== undefined &&
              node1.y !== undefined &&
              node2.x !== undefined &&
              node2.y !== undefined
            ) {
              const dx = node1.x - node2.x
              const dy = node1.y - node2.y
              const distance = Math.sqrt(dx * dx + dy * dy) || 1

              // Repulsive force inversely proportional to distance
              const force = (k * k) / distance
              fx += (dx / distance) * force
              fy += (dy / distance) * force
            }
          })

          // Attractive forces from connections
          connections.forEach((conn) => {
            if (conn.source === node1.id || conn.target === node1.id) {
              const otherNodeId = conn.source === node1.id ? conn.target : conn.source
              const otherNode = skills.find((n) => n.id === otherNodeId)

              if (
                otherNode &&
                otherNode.x !== undefined &&
                otherNode.y !== undefined &&
                node1.x !== undefined &&
                node1.y !== undefined
              ) {
                const dx = node1.x - otherNode.x
                const dy = node1.y - otherNode.y
                const distance = Math.sqrt(dx * dx + dy * dy) || 1

                // Attractive force proportional to distance and connection strength
                const force = (distance * conn.strength) / 10
                fx -= (dx / distance) * force
                fy -= (dy / distance) * force
              }
            }
          })

          // Update position with damping
          if (node1.x !== undefined && node1.y !== undefined) {
            node1.x += fx * 0.1
            node1.y += fy * 0.1

            // Keep within bounds
            node1.x = Math.max(50, Math.min(width - 50, node1.x))
            node1.y = Math.max(50, Math.min(height - 50, node1.y))
          }
        })
      }
    }

    positionNodes()
    drawGraph()
  }, [skills, connections, width, height])

  // Draw the graph on canvas
  const drawGraph = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Set high DPI canvas
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(dpr, dpr)

    // Draw connections
    ctx.lineWidth = 1
    connections.forEach((conn) => {
      const sourceNode = skills.find((n) => n.id === conn.source)
      const targetNode = skills.find((n) => n.id === conn.target)

      if (
        sourceNode &&
        targetNode &&
        sourceNode.x !== undefined &&
        sourceNode.y !== undefined &&
        targetNode.x !== undefined &&
        targetNode.y !== undefined
      ) {
        ctx.beginPath()
        ctx.moveTo(sourceNode.x, sourceNode.y)
        ctx.lineTo(targetNode.x, targetNode.y)
        ctx.strokeStyle = `rgba(156, 163, 175, ${conn.strength / 10})`
        ctx.stroke()
      }
    })

    // Draw nodes
    skills.forEach((node) => {
      if (node.x !== undefined && node.y !== undefined) {
        // Node circle
        ctx.beginPath()
        const radius = 10 + node.level * 3
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = node.color || "#6b7280"
        ctx.fill()

        // Node border
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 2
        ctx.stroke()

        // Node label
        ctx.font = "12px sans-serif"
        ctx.fillStyle = "#ffffff"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(node.name, node.x, node.y)
      }
    })
  }

  // Handle canvas click to detect node clicks
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!onSkillClick) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Check if click is on a node
    for (const node of skills) {
      if (node.x !== undefined && node.y !== undefined) {
        const radius = 10 + node.level * 3
        const distance = Math.sqrt(Math.pow(x - node.x, 2) + Math.pow(y - node.y, 2))

        if (distance <= radius) {
          onSkillClick(node.id)
          break
        }
      }
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <h3 className="text-xl font-semibold">{mentorName}'s Skill Network</h3>
      <div className="relative border rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-900">
        <canvas ref={canvasRef} width={width} height={height} onClick={handleCanvasClick} className="cursor-pointer" />
        <div className="absolute bottom-2 right-2 bg-white dark:bg-slate-800 p-2 rounded-md shadow-sm text-xs">
          <div className="flex flex-col gap-1">
            {Object.entries(categoryColors).map(([category, color]) => (
              <div key={category} className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
                <span className="capitalize">{category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400">Click on a skill to see more details</p>
    </div>
  )
}
