'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RupeePatternSVG from '../icons/RupeePatternSVG'
import CreatingAccount from '../icons/CreatingAccount'
import BillerSelections from '../icons/BillerSelections'
import FetchAndReview from '../icons/FetchAndReview'
import ConfirmAndPay from '../icons/ConfirmAndPay'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface StepCardProps {
  icon: React.ReactNode
  title: string
  subtitle?: string
  description: string
  stepNumber: number
  index: number
}

const StepCard: React.FC<StepCardProps> = ({
  icon,
  title,
  subtitle,
  description,
  stepNumber,
  index,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const stepNumberRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const iconElement = iconRef.current
    const stepElement = stepNumberRef.current

    if (!card || !iconElement || !stepElement) return

    // Initial state
    gsap.set(card, {
      opacity: 0,
      y: 80,
      scale: 0.8,
    })

    gsap.set(iconElement, {
      scale: 0.6,
      rotation: -20,
    })

    gsap.set(stepElement, {
      scale: 0.5,
      opacity: 0,
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
      delay: index * 0.2,
    })
      .to(
        iconElement,
        {
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: 'elastic.out(1, 0.5)',
        },
        '-=0.6'
      )
      .to(
        stepElement,
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(2)',
        },
        '-=0.4'
      )

    // Continuous floating animation
    gsap.to(iconElement, {
      y: -8,
      duration: 2.5 + index * 0.3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    // Hover animations
    const hoverTl = gsap.timeline({ paused: true })
    hoverTl
      .to(card, {
        y: -15,
        scale: 1.05,
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
      .to(
        stepElement,
        {
          scale: 1.1,
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
    <div className="relative">
      {/* Step Number */}
      <div
        ref={stepNumberRef}
        className="absolute -left-6 -top-6 z-20 flex h-12 w-12 items-center justify-center rounded-full border-4 border-cyan-bright bg-white shadow-lg"
      >
        <span className="text-lg font-bold text-purple-deep">{stepNumber}</span>
      </div>

      {/* Card */}
      <div
        ref={cardRef}
        className="group relative cursor-pointer overflow-hidden rounded-3xl bg-white p-8 shadow-xl transition-shadow duration-300 hover:shadow-2xl"
      >
        {/* Icon Container */}
        <div ref={iconRef} className="mb-6 flex justify-center">
          <div className="flex h-32 w-32 items-center justify-center">
            {icon}
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h3 className="mb-2 text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-purple-deep">
            {title}
          </h3>
          {subtitle && (
            <p className="mb-3 text-sm italic text-gray-500">{subtitle}</p>
          )}
          <p className="leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
            {description}
          </p>
        </div>

        {/* Decorative gradient border */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute inset-0 rounded-3xl bg-gradient-teal-purple p-[2px]">
            <div className="h-full w-full rounded-3xl bg-white"></div>
          </div>
        </div>
      </div>

      {/* Connection Line (except for last item) */}
      {stepNumber < 4 && (
        <div className="absolute -right-8 top-1/2 z-10 hidden h-[2px] w-16 -translate-y-1/2 transform bg-gradient-to-r from-cyan-bright to-purple-deep lg:block">
          <div className="absolute right-0 top-1/2 h-0 w-0 -translate-y-1/2 transform border-b-[4px] border-l-[8px] border-t-[4px] border-b-transparent border-l-purple-deep border-t-transparent"></div>
        </div>
      )}
    </div>
  )
}

const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const learnMoreRef = useRef<HTMLDivElement>(null)
  const patternRef = useRef<HTMLDivElement>(null)
  const bottomTitleRef = useRef<HTMLDivElement>(null)

  const steps = [
    {
      icon: <CreatingAccount width={120} height={120} />,
      title: 'Create an Account',
      subtitle: 'Or',
      description: 'Pay as a Guest',
    },
    {
      icon: <BillerSelections width={120} height={120} />,
      title: 'Select your Biller.',
      description: 'Electricity, Water, Gas, Telecom, etc.',
    },
    {
      icon: <FetchAndReview width={120} height={120} />,
      title: 'Fetch and Review Bill',
      description:
        'Auto-fetch your bill via BBPS, add any promo codes, and select payment method',
    },
    {
      icon: <ConfirmAndPay width={120} height={120} />,
      title: 'Confirm and Pay',
      description:
        'Get instant receipt via SMS/email and track status in real-time',
    },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Background pattern animation
    if (patternRef.current) {
      gsap.to(patternRef.current, {
        rotation: 360,
        duration: 120,
        ease: 'none',
        repeat: -1,
      })

      // Parallax effect for pattern
      gsap.to(patternRef.current, {
        y: '-20%',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }

    // Main title animations
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3,
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Learn More button animation
    gsap.fromTo(
      learnMoreRef.current,
      { opacity: 0, x: 50, scale: 0.8 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 0.5,
        scrollTrigger: {
          trigger: learnMoreRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Bottom title animation
    gsap.fromTo(
      bottomTitleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: bottomTitleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // CTA button animation
    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          ref={patternRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-150 transform"
        >
          <RupeePatternSVG width={800} height={800} fill="#000000" />
        </div>
      </div>

      {/* Gradient Background Overlay */}
      <div className="absolute inset-0 bg-gradient-teal-purple opacity-95"></div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <div className="mb-8 flex items-center justify-between">
            <div ref={titleRef} className="flex-1">
              <h2 className="mb-4 text-5xl font-bold text-white md:text-6xl">
                How it works
              </h2>
              <div ref={subtitleRef}>
                <p className="max-w-md text-xl text-white/90">
                  Few easy steps to simplify Bill payments with BBPS
                </p>
              </div>
            </div>

            <div ref={learnMoreRef}>
              <button className="group transform rounded-full bg-white px-8 py-4 text-lg font-semibold text-purple-deep shadow-lg transition-all duration-300 hover:scale-105 hover:bg-cyan-bright hover:text-white hover:shadow-xl">
                <span className="flex items-center gap-3">
                  LEARN MORE
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
        </div>

        {/* Steps Grid */}
        <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              icon={step.icon}
              title={step.title}
              subtitle={step.subtitle}
              description={step.description}
              stepNumber={index + 1}
              index={index}
            />
          ))}
        </div>

        {/* Bottom Section */}
        <div className="text-center">
          <div ref={bottomTitleRef} className="mb-8">
            <h3 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              Our Platform Makes Bill Payments
              <br />
              Smarter for <span className="text-cyan-bright">Indians</span>
            </h3>
          </div>

          <div ref={ctaRef}>
            <button className="group transform rounded-full bg-cyan-bright px-12 py-6 text-xl font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-white hover:text-cyan-bright hover:shadow-cyan-bright/30">
              <span className="flex items-center gap-4">
                FETCH YOUR BILLS
                <svg
                  className="h-7 w-7 transform transition-transform duration-300 group-hover:translate-x-2"
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
      </div>

      {/* Bottom decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="h-16 w-full fill-white"
          viewBox="0 0 1440 74"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,58.7C1248,64,1344,64,1392,64L1440,64L1440,74L1392,74C1344,74,1248,74,1152,74C1056,74,960,74,864,74C768,74,672,74,576,74C480,74,384,74,288,74C192,74,96,74,48,74L0,74Z" />
        </svg>
      </div>
    </section>
  )
}

export default HowItWorks
