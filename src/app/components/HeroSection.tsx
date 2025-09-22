'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import UPIIcon from '../icons/UPIIcon'
import InvoicesSVG from '../icons/InvoicesSvg'
import SecondInvoices from '../icons/SecondInvoices'

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const upiIconRef = useRef<HTMLDivElement>(null)
  const leftImageRef = useRef<HTMLDivElement>(null)
  const rightImageRef = useRef<HTMLDivElement>(null)
  const floatingElementsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 })

    // Initial setup - hide elements
    gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
      opacity: 0,
      y: 50,
    })

    gsap.set([leftImageRef.current, rightImageRef.current], {
      opacity: 0,
      scale: 0.8,
    })

    gsap.set(upiIconRef.current, {
      opacity: 0,
      rotation: -180,
    })

    // Animate elements in sequence
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
    })
      .to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.6'
      )
      .to(
        upiIconRef.current,
        {
          opacity: 1,
          rotation: 0,
          duration: 1,
          ease: 'back.out(1.7)',
        },
        '-=0.4'
      )
      .to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.6'
      )
      .to(
        [leftImageRef.current, rightImageRef.current],
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.2,
        },
        '-=0.8'
      )

    // Floating animations for continuous motion
    gsap.to(leftImageRef.current, {
      y: -20,
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    gsap.to(rightImageRef.current, {
      y: 20,
      duration: 2.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    gsap.to(upiIconRef.current, {
      rotation: 360,
      duration: 20,
      ease: 'none',
      repeat: -1,
    })

    // Floating elements animation
    floatingElementsRef.current.forEach((el, index) => {
      if (el) {
        gsap.to(el, {
          y: Math.random() * 30 - 15,
          x: Math.random() * 20 - 10,
          rotation: Math.random() * 360,
          duration: 4 + Math.random() * 2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: index * 0.5,
        })
      }
    })
  }, [])

  const addToFloatingRefs = (el: HTMLDivElement | null) => {
    if (el && !floatingElementsRef.current.includes(el)) {
      floatingElementsRef.current.push(el)
    }
  }

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-gradient-teal-purple-r"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div
          ref={addToFloatingRefs}
          className="absolute left-10 top-20 h-20 w-20 rounded-full bg-white/10 blur-xl"
        />
        <div
          ref={addToFloatingRefs}
          className="absolute right-20 top-40 h-32 w-32 rounded-full bg-white/5 blur-2xl"
        />
        <div
          ref={addToFloatingRefs}
          className="bg-white/8 absolute bottom-40 left-20 h-24 w-24 rounded-full blur-xl"
        />
        <div
          ref={addToFloatingRefs}
          className="bg-white/12 absolute bottom-20 right-10 h-16 w-16 rounded-full blur-lg"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="grid min-h-[80vh] items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div ref={titleRef} className="space-y-4">
              <h1 className="text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
                <span className="italic text-cyan-bright">Simplifying</span>
                <br />
                <span className="text-white">Utility Payments</span>
                <br />
                <span className="text-3xl italic md:text-4xl lg:text-5xl">
                  & Merchant Transactions
                </span>
              </h1>
            </div>

            <div ref={subtitleRef} className="space-y-6">
              <div
                ref={upiIconRef}
                className="flex justify-center lg:justify-start"
              >
                <div className="inline-block rounded-2xl bg-white/20 p-4 backdrop-blur-sm">
                  <UPIIcon width={120} height={60} />
                </div>
              </div>

              <p className="mx-auto max-w-lg text-xl leading-relaxed text-white/90 lg:mx-0">
                Pay Your Utility Bills Instantly with UPI – Anytime, Anywhere in
                India
                <br />
                <span className="font-semibold text-cyan-bright">
                  Secure Payments for Electricity, Water, Gas, Mobile Recharge,
                  and More.
                </span>
                <br />
                <span className="text-lg italic">No Queues, No Hassle !</span>
              </p>
            </div>

            <div ref={ctaRef}>
              <button className="group transform rounded-full bg-white px-8 py-4 text-lg font-semibold text-purple-deep shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-cyan-bright hover:text-white hover:shadow-cyan-bright/30">
                <span className="flex items-center gap-3">
                  START PAYING NOW
                  <svg
                    className="h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-1"
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
              </button>
            </div>
          </div>

          {/* Right Content - Dashboard Mockups */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-2xl">
              {/* Main Dashboard Image */}
              <div
                ref={leftImageRef}
                className="relative z-20 -rotate-3 transform"
              >
                <div className="rounded-3xl bg-white/10 p-4 shadow-2xl backdrop-blur-sm">
                  <SecondInvoices />
                </div>
              </div>

              {/* Secondary Dashboard Image */}
              <div
                ref={rightImageRef}
                className="absolute -right-10 top-20 z-10 rotate-6 scale-90 transform lg:-right-20"
              >
                <div className="rounded-3xl bg-white/15 p-4 shadow-xl backdrop-blur-sm">
                  <InvoicesSVG />
                </div>
              </div>

              {/* Floating payment cards */}
              <div
                ref={addToFloatingRefs}
                className="absolute -left-10 -top-10 z-30 rounded-2xl bg-white p-4 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-cyan-blue">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">
                      ₹ 1,250
                    </div>
                    <div className="text-xs text-gray-600">
                      Electricity Bill
                    </div>
                  </div>
                </div>
              </div>

              <div
                ref={addToFloatingRefs}
                className="absolute -bottom-5 -left-5 z-30 rounded-2xl bg-white p-4 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-teal-purple">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">
                      ₹ 599
                    </div>
                    <div className="text-xs text-gray-600">Mobile Recharge</div>
                  </div>
                </div>
              </div>

              <div
                ref={addToFloatingRefs}
                className="absolute -right-8 top-1/2 z-30 rounded-2xl bg-white p-4 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-navy-blue">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm6 2a1 1 0 100 2h2a1 1 0 100-2H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">
                      ₹ 3,200
                    </div>
                    <div className="text-xs text-gray-600">Water Bill</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="h-24 w-full fill-white"
          viewBox="0 0 1440 74"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,58.7C1248,64,1344,64,1392,64L1440,64L1440,74L1392,74C1344,74,1248,74,1152,74C1056,74,960,74,864,74C768,74,672,74,576,74C480,74,384,74,288,74C192,74,96,74,48,74L0,74Z" />
        </svg>
      </div>
    </section>
  )
}

export default HeroSection
