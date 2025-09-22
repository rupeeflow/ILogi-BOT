'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import CrossedLineSVG from '../icons/CrossedLineSVG'
import UPIIntegration from '../icons/UPIIntegration'
import BBPSIntegration from '../icons/BBPSIntegration'
import AutoPay from '../icons/AutoPay'
import BillerSelections from '../icons/BillerSelections'
import CashBack from '../icons/CashBack'
import MultiBillerSupport from '../icons/MultiBillerSupport'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  index: number
  className?: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  index,
  className = '',
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const iconElement = iconRef.current

    if (!card || !iconElement) return

    // Initial state
    gsap.set(card, {
      opacity: 0,
      y: 50,
      scale: 0.9,
    })

    gsap.set(iconElement, {
      scale: 0.8,
      rotation: -10,
    })

    // Scroll triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    })

    tl.to(card, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: 'back.out(1.7)',
      delay: index * 0.15,
    }).to(
      iconElement,
      {
        scale: 1,
        rotation: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      },
      '-=0.5'
    )

    // Continuous floating animation
    gsap.to(iconElement, {
      y: -8,
      duration: 2.5 + index * 0.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    // Hover animations
    const hoverTl = gsap.timeline({ paused: true })
    hoverTl
      .to(card, {
        y: -10,
        scale: 1.03,
        duration: 0.3,
        ease: 'power2.out',
      })
      .to(
        iconElement,
        {
          scale: 1.1,
          rotation: 5,
          duration: 0.3,
          ease: 'power2.out',
        },
        0
      )

    const handleMouseEnter = () => hoverTl.play()
    const handleMouseLeave = () => hoverTl.reverse()

    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [index])

  return (
    <div
      ref={cardRef}
      className={`group relative cursor-pointer rounded-3xl bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl ${className}`}
    >
      {/* Icon Container */}
      <div ref={iconRef} className="mb-4 flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center">{icon}</div>
      </div>

      {/* Content */}
      <div className="text-center">
        <h3 className="mb-3 text-lg font-bold text-gray-800 transition-colors duration-300 group-hover:text-purple-deep">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
          {description}
        </p>
      </div>

      {/* Subtle hover gradient overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-teal-purple opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
    </div>
  )
}

const KeyFeatures = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const crossedLineRef = useRef<HTMLDivElement>(null)
  const dottedLineRef = useRef<HTMLDivElement>(null)
  const viewAllRef = useRef<HTMLButtonElement>(null)
  const boostBusinessRef = useRef<HTMLButtonElement>(null)
  const bottomSectionRef = useRef<HTMLDivElement>(null)
  const bottomTitleRef = useRef<HTMLDivElement>(null)
  const applyLoanRef = useRef<HTMLDivElement>(null)
  const creditCardRef = useRef<HTMLDivElement>(null)

  const features = [
    {
      icon: <UPIIntegration width={80} height={80} />,
      title: 'UPI Integration',
      description:
        'Pay instantly with UPI apps (BHIM, Google Pay, PhonePe) no wallet needed, with cashback offers up to ₹50',
    },
    {
      icon: <BBPSIntegration width={80} height={80} />,
      title: 'BBPS Enabled',
      description:
        'Unified system for fetching and paying bills from 500+ providers, including electricity, water, gas, telecom, DTH, broadband, and municipal taxes',
    },
    {
      icon: <AutoPay width={80} height={80} />,
      title: 'Auto-Pay via NACH',
      description:
        'Set up automatic deductions to avoid late fees; supports recurring payments for monthly bills',
    },
    {
      icon: <BillerSelections width={80} height={80} />,
      title: 'Bill Reminders & Alerts',
      description:
        'Get SMS/email notifications before due dates, plus usage analytics for electricity/gas to help save costs',
    },
    {
      icon: <CashBack width={80} height={80} />,
      title: 'Cashback & Rewards',
      description:
        'Earn points or cashback on payments, redeemable for recharges or shopping, as seen in popular apps',
    },
    {
      icon: <MultiBillerSupport width={80} height={80} />,
      title: 'Multi-Biller Support',
      description:
        'Manage all utilities in one dashboard - from state Discoms (e.g. UPCL, TNEB) to gas (IGL, Gujarat Gas) and telecom (BSNL, Vi)',
    },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Crossed line flowing animation - cover entire section
    if (crossedLineRef.current) {
      gsap.set(crossedLineRef.current, {
        position: 'absolute',
        top: '0%',
        left: '-20%',
        right: '-20%',
        opacity: 0.4,
        scale: 2,
        transformOrigin: 'center center',
      })

      // Flowing animation
      gsap.to(crossedLineRef.current, {
        y: -30,
        x: 15,
        rotation: 5,
        duration: 20,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      // Parallax effect
      gsap.to(crossedLineRef.current, {
        y: '20%',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Entrance animation
      gsap.fromTo(
        crossedLineRef.current,
        { opacity: 0, scale: 1.5 },
        {
          opacity: 0.4,
          scale: 2,
          duration: 3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: crossedLineRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }

    // Vertical dotted line animation
    if (dottedLineRef.current) {
      gsap.set(dottedLineRef.current, {
        opacity: 0,
      })

      gsap.to(dottedLineRef.current, {
        opacity: 0.8,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: dottedLineRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      // Gentle floating animation for dotted line
      gsap.to(dottedLineRef.current, {
        y: -5,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    }

    // Main title animation
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Button animations
    gsap.fromTo(
      viewAllRef.current,
      { opacity: 0, x: -30, scale: 0.9 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: viewAllRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    gsap.fromTo(
      boostBusinessRef.current,
      { opacity: 0, x: 30, scale: 0.9 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 0.2,
        scrollTrigger: {
          trigger: boostBusinessRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Bottom section - Cards Image animations
    gsap.fromTo(
      bottomSectionRef.current,
      { opacity: 0, y: 80, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: bottomSectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Cards image floating animation
    if (creditCardRef.current) {
      // Continuous floating animation
      gsap.to(creditCardRef.current, {
        y: -12,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      // Subtle scale breathing effect
      gsap.to(creditCardRef.current, {
        scale: 1.02,
        duration: 5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      // Hover effect for cards image
      const cardHoverTl = gsap.timeline({ paused: true })
      cardHoverTl.to(creditCardRef.current, {
        scale: 1.05,
        y: -5,
        duration: 0.3,
        ease: 'power2.out',
      })

      const handleMouseEnter = () => cardHoverTl.play()
      const handleMouseLeave = () => cardHoverTl.reverse()

      creditCardRef.current.addEventListener('mouseenter', handleMouseEnter)
      creditCardRef.current.addEventListener('mouseleave', handleMouseLeave)

      // Cleanup
      return () => {
        creditCardRef.current?.removeEventListener(
          'mouseenter',
          handleMouseEnter
        )
        creditCardRef.current?.removeEventListener(
          'mouseleave',
          handleMouseLeave
        )
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gray-50 py-20"
    >
      {/* Floating Crossed Line Background - Covers Entire Section */}
      <div
        ref={crossedLineRef}
        className="pointer-events-none absolute z-0 h-full w-full"
      >
        <CrossedLineSVG width={800} height={1000} />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div className="mb-16 text-center">
          <div ref={titleRef}>
            <h2 className="mb-12 text-5xl font-bold text-gray-900 md:text-6xl">
              Key Features
            </h2>
          </div>
        </div>

        {/* Feature Cards Grid - Exact layout as image */}
        <div className="relative mb-16">
          {/* Vertical Dotted Line */}
          <div
            ref={dottedLineRef}
            className="absolute left-1/2 z-10 h-full w-0.5 -translate-x-1/2 transform"
            style={{
              background:
                'repeating-linear-gradient(to bottom, #60A5FA 0, #60A5FA 8px, transparent 8px, transparent 16px)',
              top: '50px',
              bottom: '50px',
            }}
          ></div>

          {/* Features Grid */}
          <div className="relative z-20 mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
                className={index === 1 ? 'md:relative md:z-30' : ''}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mb-20 flex flex-col justify-center gap-6 sm:flex-row">
          <button
            ref={viewAllRef}
            className="group transform rounded-full border-2 border-purple-deep bg-white px-8 py-4 text-lg font-semibold text-purple-deep shadow-lg transition-all duration-300 hover:scale-105 hover:bg-purple-deep hover:text-white hover:shadow-xl"
          >
            <span className="flex items-center gap-3">
              VIEW ALL FEATURES
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

          <button
            ref={boostBusinessRef}
            className="group transform rounded-full bg-gradient-teal-purple px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-bright/30"
          >
            <span className="flex items-center gap-3">
              BOOST YOUR BUSINESS
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

        {/* Bottom Section - Cards Image */}
        <div ref={bottomSectionRef} className="flex justify-center">
          <div ref={creditCardRef} className="relative mx-auto max-w-4xl">
            <Image
              src="/cards.png"
              alt="Finance Cards Section"
              width={1200}
              height={400}
              className="h-auto w-full rounded-3xl shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default KeyFeatures
