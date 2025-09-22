'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const AutoPayButton = () => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const button = buttonRef.current
    const container = containerRef.current

    if (!button || !container) return

    // Initial state
    gsap.set(button, {
      opacity: 0,
      y: 50,
      scale: 0.8,
    })

    // Scroll triggered animation
    gsap.to(button, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    })

    // Continuous floating animation
    gsap.to(button, {
      y: -5,
      duration: 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    // Hover animations
    const hoverTl = gsap.timeline({ paused: true })
    hoverTl.to(button, {
      scale: 1.1,
      y: -10,
      duration: 0.3,
      ease: 'power2.out',
    })

    const handleMouseEnter = () => hoverTl.play()
    const handleMouseLeave = () => hoverTl.reverse()

    button.addEventListener('mouseenter', handleMouseEnter)
    button.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter)
      button.removeEventListener('mouseleave', handleMouseLeave)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={containerRef} className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <button
            ref={buttonRef}
            className="group relative transform overflow-hidden rounded-full px-12 py-6 text-xl font-bold text-white shadow-2xl transition-all duration-300 hover:shadow-cyan-bright/40"
            style={{
              background: 'linear-gradient(135deg, #078FAD 0%, #5E1B99 100%)',
            }}
          >
            {/* Button content */}
            <span className="relative z-10 flex items-center gap-4">
              SETUP AUTOPAY NOW
              <svg
                className="h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>

            {/* Animated gradient overlay on hover */}
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: 'linear-gradient(135deg, #23B6D7 0%, #7B2CBF 100%)',
              }}
            ></div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute inset-0 translate-x-[-100%] -skew-x-12 transform bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]"></div>
            </div>
          </button>

          {/* Decorative elements around button */}
          <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 transform">
            <div className="-mt-10 h-20 w-20 rounded-full bg-gradient-teal-purple opacity-20 blur-2xl"></div>
            <div className="ml-8 mt-4 h-16 w-16 rounded-full bg-gradient-cyan-blue opacity-15 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AutoPayButton
