import { useEffect, useRef } from 'react'

const N_PTS = 700

const PIPELINE_STAGES = [
  { id: 'PR_COMMIT', prob: 'P=1.00' },
  { id: 'DOCKER_BUILD', prob: 'P=0.99' },
  { id: 'REST_ASSURED', prob: 'P=0.98' },
  { id: 'PLAYWRIGHT_CDP', prob: 'P=0.97' },
  { id: 'KAFKA_KIBANA', prob: 'P=0.96' },
  { id: 'AI_GATE_95%', prob: 'P>0.95' },
  { id: 'PROD_DEPLOY', prob: '200 OK' },
]

// Precompute the 3D Lissajous Cage manifold: r(t) = (A·sin(3t+δ), B·sin(4t), C·cos(5t))
const LISSAJOUS_PTS = Array.from({ length: N_PTS }, (_, i) => {
  const t = (i / N_PTS) * Math.PI * 2
  return {
    x: 1.25 * Math.sin(3 * t + 0.4),
    y: 1.05 * Math.sin(4 * t),
    z: 0.9 * Math.cos(5 * t),
  }
})

function project3D(pt, rotY, rotX, cx, cy, scale) {
  const x1 = pt.x * Math.cos(rotY) - pt.z * Math.sin(rotY)
  const z1 = pt.x * Math.sin(rotY) + pt.z * Math.cos(rotY)
  const y2 = pt.y * Math.cos(rotX) - z1 * Math.sin(rotX)
  const z2 = pt.y * Math.sin(rotX) + z1 * Math.cos(rotX)
  const perspective = 3.2 / (3.2 - z2 * 0.35)
  return {
    x: cx + x1 * scale * perspective,
    y: cy + y2 * scale * perspective,
    z: z2,
    scale: perspective,
  }
}

export default function MathAutomationCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let width = 0
    let height = 0
    let frame = 0

    // Interactive mouse/touch state with smooth spring interpolation
    const pointer = {
      x: 0,
      y: 0,
      normX: 0,
      normY: 0,
      smoothX: 0,
      smoothY: 0,
      active: false,
    }

    const packets = Array.from({ length: 14 }, (_, i) => ({
      pos: (i * (N_PTS / 14)) % N_PTS,
      speed: 1.15 + (i % 3) * 0.35,
      gold: i % 2 === 0,
    }))

    const resize = () => {
      const parent = canvas.parentElement
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = parent ? parent.clientWidth : window.innerWidth
      height = parent ? parent.clientHeight : window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const updatePointer = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect()
      if (clientY < rect.top - 100 || clientY > rect.bottom + 100) {
        pointer.active = false
        return
      }
      pointer.x = clientX - rect.left
      pointer.y = clientY - rect.top
      pointer.normX = (pointer.x / Math.max(1, rect.width)) - 0.5
      pointer.normY = (pointer.y / Math.max(1, rect.height)) - 0.5
      pointer.active = true
    }

    const onMouseMove = (e) => updatePointer(e.clientX, e.clientY)
    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY)
      }
    }
    const onMouseLeave = () => {
      pointer.active = false
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('mouseleave', onMouseLeave)

    const animate = () => {
      frame += 1
      ctx.clearRect(0, 0, width, height)

      // Smooth spring damping toward pointer position
      const targetX = pointer.active ? pointer.normX * 1.45 : 0
      const targetY = pointer.active ? pointer.normY * 0.85 : 0
      pointer.smoothX += (targetX - pointer.smoothX) * 0.07
      pointer.smoothY += (targetY - pointer.smoothY) * 0.07

      const rotY = frame * 0.0065 + pointer.smoothX
      const rotX = 0.35 + Math.sin(frame * 0.004) * 0.18 + pointer.smoothY
      const cx = width * 0.5
      const cy = height * 0.48
      const scale = Math.min(width, height) * 0.34

      const projected = LISSAJOUS_PTS.map((p) => project3D(p, rotY, rotX, cx, cy, scale))

      // 1. Draw the continuous 3D Lissajous harmonic trajectory
      ctx.lineWidth = 1.8
      for (let i = 1; i < projected.length; i++) {
        const p0 = projected[i - 1]
        const p1 = projected[i]
        const isGoldBand = (i + frame * 2) % 140 < 45
        ctx.strokeStyle = isGoldBand ? 'rgba(251, 191, 36, 0.65)' : 'rgba(52, 211, 153, 0.38)'
        ctx.beginPath()
        ctx.moveTo(p0.x, p0.y)
        ctx.lineTo(p1.x, p1.y)
        ctx.stroke()
      }
      // Close the loop smoothly
      if (projected.length > 1) {
        const pLast = projected[projected.length - 1]
        const pFirst = projected[0]
        ctx.strokeStyle = 'rgba(52, 211, 153, 0.38)'
        ctx.beginPath()
        ctx.moveTo(pLast.x, pLast.y)
        ctx.lineTo(pFirst.x, pFirst.y)
        ctx.stroke()
      }

      // 2. Compute the 7 Pipeline DAG Anchor Stations on the 3D Lissajous manifold
      const stageNodes = PIPELINE_STAGES.map((st, idx) => {
        const ptIdx = Math.floor((idx * 97 + 40) % N_PTS)
        return {
          ...st,
          ptIdx,
          proj: projected[ptIdx],
        }
      })

      // 3. Draw Execution Packets streaming directly along the 3D Lissajous Manifold
      packets.forEach((pkt) => {
        pkt.pos = (pkt.pos + pkt.speed) % N_PTS
        const idx = Math.floor(pkt.pos)
        const p = projected[idx]
        if (!p) return

        // Outer halo
        ctx.fillStyle = pkt.gold ? 'rgba(251, 191, 36, 0.25)' : 'rgba(52, 211, 153, 0.25)'
        ctx.beginPath()
        ctx.arc(p.x, p.y, 9 * p.scale, 0, Math.PI * 2)
        ctx.fill()

        // Core packet point
        ctx.fillStyle = pkt.gold ? '#fbbf24' : '#34d399'
        ctx.beginPath()
        ctx.arc(p.x, p.y, 4.2 * p.scale, 0, Math.PI * 2)
        ctx.fill()
      })

      // 4. Render the 7 Pipeline Stage Nodes (+ Coord Pins) on the Manifold
      stageNodes.forEach((node, idx) => {
        const { x, y } = node.proj
        const isGate = idx === 5 || idx === 6

        const nearPacket = packets.some((pk) => Math.abs(pk.pos - node.ptIdx) < 16)
        const nearCursor = pointer.active && Math.hypot(pointer.x - x, pointer.y - y) < 64

        if (nearPacket || nearCursor) {
          ctx.strokeStyle = nearCursor ? '#fbbf24' : 'rgba(251, 191, 36, 0.78)'
          ctx.lineWidth = nearCursor ? 2 : 1.5
          ctx.beginPath()
          ctx.arc(x, y, nearCursor ? 22 : 18, 0, Math.PI * 2)
          ctx.stroke()
        }

        // Station anchor point on the curve
        ctx.fillStyle = isGate || nearCursor ? '#fbbf24' : '#34d399'
        ctx.beginPath()
        ctx.arc(x, y, 5, 0, Math.PI * 2)
        ctx.fill()

        // + Coord Pin label
        ctx.font = '12px ui-monospace, SFMono-Regular, Menlo, monospace'
        ctx.fillStyle = isGate || nearCursor ? '#fbbf24' : '#a7f3d0'
        ctx.fillText(`+ ${node.id} [${node.prob}]`, x + 9, y + 4)
      })

      animId = window.requestAnimationFrame(animate)
    }

    animId = window.requestAnimationFrame(animate)

    return () => {
      window.cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10 pointer-events-none"
      aria-label="Interactive 3D Lissajous Cage and Pipeline DAG Canvas"
    />
  )
}
