import { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  ROUTE_BUBBLES,
  QUICK_CHIPS,
  KNOWLEDGE_INTENTS,
  SAMPLE_JDS,
  classifyAndRespond,
} from '@/data/memojiKnowledge'

const INITIAL_MESSAGE = {
  id: 'welcome',
  role: 'assistant',
  text: "Hey! I'm **Manjunath H K** 👋 I'm a Senior SDET & AI Systems Builder (~7 YOE).\n\nAsk me about my **1,500+ test Mosaic architecture**, my **AI/LLM self-healing pipelines**, my **notice period**, or **paste your Job Description** below to score our fit!",
  badge: '👋 First-Person Interactive Twin',
  badgeColor: 'text-amber-300 bg-amber-400/10 border-amber-400/30',
  metrics: ['$0 API Cost', '100% Injection-Proof'],
}

function renderFormattedText(raw) {
  const lines = (raw || '').split('\n')
  return lines.map((line, lineIdx) => {
    const parts = []
    let remaining = line
    let keyIdx = 0

    const pattern = /(\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)|\*([^*]+)\*)/
    while (remaining.length > 0) {
      const match = remaining.match(pattern)
      if (!match) {
        parts.push(remaining)
        break
      }
      if (match.index > 0) {
        parts.push(remaining.slice(0, match.index))
      }
      const full = match[0]
      if (full.startsWith('**')) {
        parts.push(
          <strong key={`b-${lineIdx}-${keyIdx++}`} className="text-amber-300 font-semibold">
            {match[2]}
          </strong>
        )
      } else if (full.startsWith('[')) {
        parts.push(
          <a
            key={`a-${lineIdx}-${keyIdx++}`}
            href={match[4]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 underline hover:text-amber-300"
          >
            {match[3]}
          </a>
        )
      } else if (full.startsWith('*')) {
        parts.push(
          <em key={`i-${lineIdx}-${keyIdx++}`} className="text-emerald-200">
            {match[5]}
          </em>
        )
      }
      remaining = remaining.slice(match.index + full.length)
    }

    return (
      <span key={`line-${lineIdx}`}>
        {parts}
        {lineIdx < lines.length - 1 && <br />}
      </span>
    )
  })
}

export default function MemojiAssistant() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [dismissedRoute, setDismissedRoute] = useState(null)
  const [messages, setMessages] = useState([INITIAL_MESSAGE])
  const [inputValue, setInputValue] = useState('')
  const [isDraggingVisual, setIsDraggingVisual] = useState(false)
  const [tiltStyle, setTiltStyle] = useState(
    'perspective(500px) rotateY(0deg) rotateX(0deg) scale(1)'
  )

  // Position state: null means anchored to default bottom-right; otherwise explicit { x, y }
  const [pos, setPos] = useState(null)
  const [quadrant, setQuadrant] = useState({ isLeft: false, isTop: false })

  const rootRef = useRef(null)
  const triggerRef = useRef(null)
  const messagesEndRef = useRef(null)
  const dragStateRef = useRef({
    active: false,
    armed: false,
    startX: 0,
    startY: 0,
    initialLeft: 0,
    initialTop: 0,
    travel: 0,
    startTime: 0,
    longPressTimer: null,
  })

  const routeBubbleText = ROUTE_BUBBLES[location.pathname] || ROUTE_BUBBLES['/']
  const bubbleDismissed = dismissedRoute === location.pathname

  // Auto-scroll chat stream on new messages
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  // Keep within viewport on window resize
  useEffect(() => {
    function handleResize() {
      if (!pos || !rootRef.current) return
      const rect = rootRef.current.getBoundingClientRect()
      const maxLeft = Math.max(8, window.innerWidth - rect.width - 8)
      const maxTop = Math.max(56, window.innerHeight - rect.height - 8)
      const clampedX = Math.min(Math.max(8, pos.x), maxLeft)
      const clampedY = Math.min(Math.max(56, pos.y), maxTop)
      setPos({ x: clampedX, y: clampedY })
      setQuadrant({
        isLeft: clampedX + rect.width / 2 < window.innerWidth * 0.48,
        isTop: clampedY + rect.height / 2 < window.innerHeight * 0.52,
      })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [pos])

  // Non-passive mobile Touch Event engine (fixes Chrome/Safari on iPhone page scroll & enables long-press drag)
  useEffect(() => {
    const el = triggerRef.current
    if (!el) return

    function clearLongPressTimer() {
      if (dragStateRef.current.longPressTimer) {
        clearTimeout(dragStateRef.current.longPressTimer)
        dragStateRef.current.longPressTimer = null
      }
    }

    function onTouchStart(e) {
      if (!rootRef.current || e.touches.length !== 1) return
      const touch = e.touches[0]
      const rect = rootRef.current.getBoundingClientRect()

      clearLongPressTimer()
      dragStateRef.current = {
        active: true,
        armed: false,
        startX: touch.clientX,
        startY: touch.clientY,
        initialLeft: rect.left,
        initialTop: rect.top,
        travel: 0,
        startTime: Date.now(),
        longPressTimer: setTimeout(() => {
          if (dragStateRef.current.active) {
            dragStateRef.current.armed = true
            setIsDraggingVisual(true)
            setTiltStyle('perspective(500px) rotateY(0deg) rotateX(0deg) scale(1.10)')
            if (typeof navigator !== 'undefined' && navigator.vibrate) {
              try {
                navigator.vibrate(15)
              } catch {
                // Ignore vibration errors on unsupported browsers
              }
            }
          }
        }, 180),
      }
    }

    function onTouchMove(e) {
      if (!dragStateRef.current.active || !rootRef.current || e.touches.length !== 1) return
      // Strictly block Chrome/Safari page scrolling while touching the avatar
      if (e.cancelable) {
        e.preventDefault()
      }

      const touch = e.touches[0]
      const dx = touch.clientX - dragStateRef.current.startX
      const dy = touch.clientY - dragStateRef.current.startY
      const travel = Math.hypot(dx, dy)
      dragStateRef.current.travel = travel

      // Arm drag either after 180ms long-press OR as soon as finger slides >= 6px on the avatar
      if (!dragStateRef.current.armed && travel >= 6) {
        clearLongPressTimer()
        dragStateRef.current.armed = true
        setIsDraggingVisual(true)
        setTiltStyle('perspective(500px) rotateY(0deg) rotateX(0deg) scale(1.10)')
      }

      if (dragStateRef.current.armed) {
        const rect = rootRef.current.getBoundingClientRect()
        const maxLeft = Math.max(8, window.innerWidth - rect.width - 8)
        const maxTop = Math.max(56, window.innerHeight - rect.height - 8)
        const nextX = Math.min(Math.max(8, dragStateRef.current.initialLeft + dx), maxLeft)
        const nextY = Math.min(Math.max(56, dragStateRef.current.initialTop + dy), maxTop)

        setPos({ x: nextX, y: nextY })
        setQuadrant({
          isLeft: nextX + rect.width / 2 < window.innerWidth * 0.48,
          isTop: nextY + rect.height / 2 < window.innerHeight * 0.52,
        })
      }
    }

    function onTouchEnd(e) {
      if (!dragStateRef.current.active) return
      clearLongPressTimer()
      const { travel, armed } = dragStateRef.current
      dragStateRef.current.active = false
      dragStateRef.current.armed = false
      setIsDraggingVisual(false)
      setTiltStyle('perspective(500px) rotateY(0deg) rotateX(0deg) scale(1)')

      // If it was a quick tap (not dragged), toggle chat popover and prevent synthetic click ghost
      if (travel < 8 && !armed) {
        if (e.cancelable) e.preventDefault()
        setIsOpen((prev) => !prev)
      }
    }

    function onTouchCancel() {
      clearLongPressTimer()
      dragStateRef.current.active = false
      dragStateRef.current.armed = false
      setIsDraggingVisual(false)
      setTiltStyle('perspective(500px) rotateY(0deg) rotateX(0deg) scale(1)')
    }

    el.addEventListener('touchstart', onTouchStart, { passive: false })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd, { passive: false })
    el.addEventListener('touchcancel', onTouchCancel, { passive: false })

    return () => {
      clearLongPressTimer()
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
      el.removeEventListener('touchcancel', onTouchCancel)
    }
  }, [])

  // Desktop Mouse Pointer Event handlers (touch is handled by the non-passive Touch listeners above)
  function handlePointerDown(e) {
    if (e.pointerType === 'touch' || !rootRef.current) return
    const rect = rootRef.current.getBoundingClientRect()
    dragStateRef.current = {
      active: true,
      armed: false,
      startX: e.clientX,
      startY: e.clientY,
      initialLeft: rect.left,
      initialTop: rect.top,
      travel: 0,
      startTime: Date.now(),
      longPressTimer: null,
    }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function handlePointerMove(e) {
    if (e.pointerType === 'touch') return
    const boxRect = e.currentTarget.getBoundingClientRect()
    const nx = ((e.clientX - boxRect.left) / Math.max(1, boxRect.width) - 0.5) * 2
    const ny = ((e.clientY - boxRect.top) / Math.max(1, boxRect.height) - 0.5) * 2
    setTiltStyle(
      `perspective(500px) rotateY(${(nx * 14).toFixed(1)}deg) rotateX(${(-ny * 12).toFixed(1)}deg) scale(1.04)`
    )

    if (!dragStateRef.current.active || !rootRef.current) return
    const dx = e.clientX - dragStateRef.current.startX
    const dy = e.clientY - dragStateRef.current.startY
    const travel = Math.hypot(dx, dy)
    dragStateRef.current.travel = travel

    if (travel >= 4) {
      dragStateRef.current.armed = true
      setIsDraggingVisual(true)
      const rect = rootRef.current.getBoundingClientRect()
      const maxLeft = Math.max(8, window.innerWidth - rect.width - 8)
      const maxTop = Math.max(56, window.innerHeight - rect.height - 8)
      const nextX = Math.min(Math.max(8, dragStateRef.current.initialLeft + dx), maxLeft)
      const nextY = Math.min(Math.max(56, dragStateRef.current.initialTop + dy), maxTop)

      setPos({ x: nextX, y: nextY })
      setQuadrant({
        isLeft: nextX + rect.width / 2 < window.innerWidth * 0.48,
        isTop: nextY + rect.height / 2 < window.innerHeight * 0.52,
      })
    }
  }

  function handlePointerUp(e) {
    if (e.pointerType === 'touch' || !dragStateRef.current.active) return
    const travel = dragStateRef.current.travel
    dragStateRef.current.active = false
    dragStateRef.current.armed = false
    setIsDraggingVisual(false)
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      // Ignore if pointer capture already released
    }
    if (travel < 6) {
      setIsOpen((prev) => !prev)
    }
  }

  function handlePointerLeave(e) {
    if (e.pointerType === 'touch') return
    if (!dragStateRef.current.active) {
      setTiltStyle('perspective(500px) rotateY(0deg) rotateX(0deg) scale(1)')
    }
  }

  function submitQuery(queryText) {
    const trimmed = (queryText || '').trim()
    if (!trimmed) return
    const result = classifyAndRespond(trimmed)
    setMessages((prev) => {
      const nextIdx = prev.length + 1
      return [
        ...prev,
        { id: `u-${nextIdx}`, role: 'user', text: trimmed },
        {
          id: `a-${nextIdx}`,
          role: 'assistant',
          text: result.answer,
          badge: result.badge,
          badgeColor: result.badgeColor,
          metrics: result.metrics,
        },
      ]
    })
  }

  function handleFormSubmit(e) {
    e.preventDefault()
    if (!inputValue.trim()) return
    const q = inputValue
    setInputValue('')
    setIsOpen(true)
    submitQuery(q)
  }

  function handleChipClick(chipId) {
    setIsOpen(true)
    if (chipId === 'jd_sdet') {
      submitQuery(SAMPLE_JDS.jd_sdet)
      return
    }
    if (chipId === 'jd_ai') {
      submitQuery(SAMPLE_JDS.jd_ai)
      return
    }
    const found = KNOWLEDGE_INTENTS.find((item) => item.id === chipId)
    submitQuery(found ? found.prompt : 'Why should we hire you?')
  }

  function handleResetChat() {
    setMessages([INITIAL_MESSAGE])
  }

  const rootPositionStyle = pos
    ? { left: `${pos.x}px`, top: `${pos.y}px` }
    : { right: '20px', bottom: '16px' }

  // Compute horizontal alignment so speech bubble never overflows on narrow mobile screens
  function getBubbleAlignStyle() {
    const bubbleWidth = 256
    if (!pos || typeof window === 'undefined') {
      return { position: 'absolute', bottom: '146px', right: '0px' }
    }
    const avatarWidth = 128
    const desiredLeft = quadrant.isLeft ? pos.x : pos.x + avatarWidth - bubbleWidth
    const clampedScreenLeft = Math.min(
      Math.max(10, desiredLeft),
      Math.max(10, window.innerWidth - bubbleWidth - 10)
    )
    return {
      position: 'absolute',
      ...(quadrant.isTop ? { top: '146px' } : { bottom: '146px' }),
      left: `${clampedScreenLeft - pos.x}px`,
    }
  }

  // Compute viewport-clamped fixed position for chat popover so it never clips on iPhone or desktop
  function getPopoverFixedStyle() {
    if (typeof window === 'undefined') {
      return { position: 'fixed', right: '20px', bottom: '168px', width: '350px' }
    }
    const vw = document.documentElement.clientWidth || window.innerWidth
    const vh = document.documentElement.clientHeight || window.innerHeight

    // On mobile screens (< 640px), center horizontally with 12px margin on both sides
    if (vw < 640) {
      return {
        position: 'fixed',
        left: '12px',
        right: '12px',
        width: 'auto',
        ...(quadrant.isTop ? { bottom: '16px' } : { top: '72px' }),
      }
    }

    const boxWidth = 395
    const boxHeight = 460
    const avatarW = 128
    const avatarH = 144

    const rootX = pos ? pos.x : vw - 20 - avatarW
    const rootY = pos ? pos.y : vh - 16 - avatarH

    const desiredLeft = quadrant.isLeft ? rootX : rootX + avatarW - boxWidth
    const clampedLeft = Math.min(Math.max(12, desiredLeft), Math.max(12, vw - boxWidth - 12))

    const aboveTop = rootY - boxHeight - 8
    const belowTop = rootY + avatarH + 8
    const rawTop = aboveTop >= 68 ? aboveTop : belowTop
    const clampedTop = Math.min(Math.max(68, rawTop), Math.max(68, vh - boxHeight - 12))

    return {
      position: 'fixed',
      left: `${Math.round(clampedLeft)}px`,
      top: `${Math.round(clampedTop)}px`,
      width: `${boxWidth}px`,
    }
  }

  const bubbleAlignStyle = getBubbleAlignStyle()
  const popoverAlignStyle = getPopoverFixedStyle()

  return (
    <div
      ref={rootRef}
      style={rootPositionStyle}
      data-testid="memoji-assistant-root"
      className="memoji-container fixed z-50 select-none"
    >
      {/* 1. ROUTE-AWARE FLOATING SPEECH BUBBLE ABOVE RAISED PRESENTING HAND (🤚) */}
      {!isOpen && !bubbleDismissed && !isDraggingVisual && (
        <div
          style={bubbleAlignStyle}
          onClick={() => setIsOpen(true)}
          data-testid="memoji-speech-bubble"
          className="absolute w-64 bg-card px-3 py-2.5 cursor-pointer transition-colors duration-200 hover:border-primary z-30"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setDismissedRoute(location.pathname)
            }}
            aria-label="Dismiss speech bubble"
            className="absolute top-1 right-1.5 text-xs font-mono text-muted-foreground hover:text-primary cursor-pointer"
          >
            ×
          </button>
          <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-primary mb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            <span>Manjunath H K (Me)</span>
          </div>
          <p
            data-testid="memoji-speech-text"
            className="text-xs text-foreground leading-snug pr-3"
          >
            {routeBubbleText}
          </p>
        </div>
      )}

      {/* 2. BORDERLESS 3D APPLE MEMOJI CUTOUT (0 BORDERS, 0 BOX FRAME) */}
      <div
        ref={triggerRef}
        role="button"
        tabIndex={0}
        aria-label="Hold or drag to move, tap to chat with Manjunath H K"
        data-testid="memoji-avatar-trigger"
        data-dragging={isDraggingVisual ? 'true' : 'false'}
        onContextMenu={(e) => e.preventDefault()}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setIsOpen((prev) => !prev)
          }
        }}
        className="memoji-float-wrapper memoji-touch-target relative w-32 h-36 flex items-end justify-center cursor-grab active:cursor-grabbing bg-transparent border-0 focus:outline-none"
      >
        <img
          src="/memoji-manjunath.png"
          alt="Manjunath H K 3D Memoji"
          draggable={false}
          style={{ transform: tiltStyle }}
          className="memoji-3d-img w-32 h-auto object-contain"
        />
        <span
          className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-background/90 border text-xs font-mono flex items-center gap-1 shadow-lg whitespace-nowrap pointer-events-none transition-colors ${
            isDraggingVisual
              ? 'border-primary text-primary'
              : 'border-secondary/40 text-secondary'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full animate-ping ${
              isDraggingVisual ? 'bg-primary' : 'bg-secondary'
            }`}
          />
          <span>{isDraggingVisual ? 'Move me ✨' : 'Ask me'}</span>
        </span>
      </div>

      {/* 3. BRUTALIST SHARP FIRST-PERSON CHAT POPOVER */}
      {isOpen && (
        <div
          style={popoverAlignStyle}
          data-testid="memoji-chat-popover"
          className="fixed bg-card flex flex-col overflow-hidden z-50"
        >
          {/* Chat Header */}
          <div className="flex items-center justify-between px-3.5 py-2.5 bg-background/80 border-b border-border">
            <div className="flex items-center gap-2.5">
              <img
                src="/memoji-manjunath.png"
                alt="Manjunath H K"
                className="w-8 h-8 object-contain"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-foreground">Manjunath H K</span>
                  <span className="px-1.5 py-0.5 text-xs font-mono bg-primary/15 text-primary border border-primary/30 rounded">
                    It&apos;s Me · 7 YOE
                  </span>
                </div>
                <div className="text-xs font-mono text-muted-foreground">
                  Ask about my work or paste a JD to score our fit
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleResetChat}
                className="px-1.5 py-1 text-xs font-mono text-muted-foreground hover:text-primary cursor-pointer"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="px-2 py-0.5 text-sm font-mono text-muted-foreground hover:text-primary cursor-pointer"
              >
                ×
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div
            data-testid="memoji-chat-messages"
            className="p-3 space-y-2.5 max-h-[260px] overflow-y-auto bg-background/90 text-xs"
          >
            {messages.map((msg) =>
              msg.role === 'user' ? (
                <div key={msg.id} className="flex justify-end">
                  <div className="max-w-[85%] px-3 py-2 rounded bg-primary text-primary-foreground font-medium leading-snug shadow">
                    {msg.text}
                  </div>
                </div>
              ) : (
                <div key={msg.id} className="flex items-start gap-2">
                  <img
                    src="/memoji-manjunath.png"
                    alt="Manjunath"
                    className="w-7 h-7 object-contain shrink-0 mt-0.5"
                  />
                  <div className="flex-1 p-2.5 rounded bg-[#071814] border border-border text-foreground leading-relaxed">
                    {msg.badge && (
                      <div
                        className={`inline-block px-1.5 py-0.5 mb-1.5 text-xs font-mono rounded border ${msg.badgeColor}`}
                      >
                        {msg.badge}
                      </div>
                    )}
                    <div>{renderFormattedText(msg.text)}</div>
                    {msg.metrics && msg.metrics.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2 pt-1.5 border-t border-border">
                        {msg.metrics.map((metric) => (
                          <span
                            key={metric}
                            className="px-1.5 py-0.5 text-xs font-mono bg-background text-secondary border border-border rounded"
                          >
                            {metric}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick-Prompt Chips */}
          <div className="px-3 py-2 bg-background/80 border-t border-border flex flex-wrap items-center gap-1.5">
            {QUICK_CHIPS.map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => handleChipClick(chip.id)}
                className="px-2 py-1 text-xs font-mono bg-[#071814] hover:border-primary text-foreground border border-border rounded cursor-pointer transition-colors"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={handleFormSubmit}
            className="flex items-center gap-1.5 p-2.5 bg-[#071814] border-t border-border"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              data-testid="memoji-chat-input"
              placeholder="Ask me anything or paste a Job Description..."
              className="flex-1 px-2.5 py-1.5 text-xs bg-background text-foreground border border-border rounded focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              data-testid="memoji-chat-send"
              className="px-3 py-1.5 text-xs font-mono font-bold bg-primary text-primary-foreground rounded hover:opacity-90 cursor-pointer"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
