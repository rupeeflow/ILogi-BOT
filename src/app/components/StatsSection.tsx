'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import AlwaysAvaialble from '../icons/AlwaysAvailable'
import GroupIcon from '../icons/GroupIcon'
import HandsomeMan from '../icons/HandsomeMan'
import WaterBills from '../icons/WaterBills'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface StatCardProps {
  icon: React.ReactNode
  title: string
  subtitle: string
  index: number
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  title,
  subtitle,
  index,
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
      scale: 0.8,
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

    // Continuous floating animation
    gsap.to(iconElement, {
      y: -8,
      duration: 2 + index * 0.3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [index])

  return (
    <div ref={cardRef} className="flex items-start gap-4">
      <div ref={iconRef} className="flex-shrink-0">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-4xl font-bold text-gray-900">{title}</h3>
        <p className="text-lg leading-relaxed text-gray-600">{subtitle}</p>
      </div>
    </div>
  )
}

const StatsSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const manRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const centerTextRef = useRef<HTMLDivElement>(null)

  const stats = [
    {
      icon: <AlwaysAvaialble width={40} height={40} fill="#4B5563" />,
      title: '24/7',
      subtitle: 'Integrated with BBPS for Real-Time Bill Fetching',
    },
    {
      icon: <GroupIcon width={40} height={40} fill="#4B5563" />,
      title: '500+',
      subtitle:
        'Billers opted it Nationwide, Including Major Discoms and Telecom Providers',
    },
    {
      icon: <WaterBills width={40} height={40} fill="#4B5563" />,
      title: '100+',
      subtitle: 'Billers, merchants, and businesses using it',
    },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Title animation
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Man animation
    gsap.fromTo(
      manRef.current,
      { opacity: 0, x: 50, scale: 0.9 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: manRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Center text animation
    gsap.fromTo(
      centerTextRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3,
        scrollTrigger: {
          trigger: centerTextRef.current,
          start: 'top 85%',
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
        delay: 0.6,
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Man floating animation
    if (manRef.current) {
      gsap.to(manRef.current, {
        y: -12,
        duration: 3.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      // Add subtle scale breathing effect
      gsap.to(manRef.current, {
        scale: 1.02,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        {/* Main Title */}
        <div ref={titleRef} className="mb-16 text-center">
          <h2 className="mb-4 text-5xl font-bold text-gray-900 md:text-6xl">
            Over <span className="text-blue-600">10 Crore</span> Bills Paid
            Securely
            <br />
            Across <span className="text-blue-600">India</span>
          </h2>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left Stats */}
          <div className="space-y-12 lg:col-span-4">
            {stats.slice(0, 2).map((stat, index) => (
              <StatCard
                key={index}
                icon={stat.icon}
                title={stat.title}
                subtitle={stat.subtitle}
                index={index}
              />
            ))}
          </div>

          {/* Center - Floating Man */}
          <div className="relative flex flex-col items-center lg:col-span-4">
            <div ref={manRef} className="relative">
              <HandsomeMan width={400} height={500} />
            </div>

            {/* Center Text */}
            <div ref={centerTextRef} className="mt-8 max-w-sm text-center">
              <p className="text-xl leading-relaxed text-gray-700">
                Fetch bills, review, pay and track.
                <br />
                Discover a new way of utility bill payments
              </p>
            </div>
          </div>

          {/* Right Stats */}
          <div className="space-y-12 lg:col-span-4">
            <div className="lg:mt-20">
              <StatCard
                icon={stats[2].icon}
                title={stats[2].title}
                subtitle={stats[2].subtitle}
                index={2}
              />
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div ref={ctaRef} className="mt-16 text-center">
          <button className="group transform rounded-full bg-gradient-teal-purple-r px-12 py-6 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-bright/30">
            <span className="flex items-center gap-4">
              GET STARTED NOW
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
          </button>
        </div>
      </div>
    </section>
  )
}

export default StatsSection
