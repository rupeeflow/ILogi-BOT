'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import AlwaysAvaialble from '../icons/AlwaysAvailable'
import ElectricityBill from '../icons/ElectricityBill'
import GasBills from '../icons/GasBills'
import PhoneBills from '../icons/PhoneBills'
import SafeSecure from '../icons/Safe&Secure'
import WaterBills from '../icons/WaterBills'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface BenefitCardProps {
  icon: React.ReactNode
  title: string
  description: string
  index: number
}

const BenefitCard: React.FC<BenefitCardProps> = ({
  icon,
  title,
  description,
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
      delay: index * 0.1,
    }).to(
      iconElement,
      {
        scale: 1,
        rotation: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      },
      '-=0.4'
    )

    // Hover animations
    const hoverTl = gsap.timeline({ paused: true })
    hoverTl
      .to(card, {
        y: -10,
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
      className="group cursor-pointer rounded-2xl bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-2xl"
    >
      <div ref={iconRef} className="mb-6 flex justify-center">
        <div className="rounded-2xl bg-gradient-teal-purple p-4 shadow-lg transition-shadow duration-300 group-hover:shadow-cyan-bright/30">
          {icon}
        </div>
      </div>

      <h3 className="mb-4 text-center text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-purple-deep">
        {title}
      </h3>

      <p className="text-center leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
        {description}
      </p>
    </div>
  )
}

const ProductOverview = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const benefitsTitleRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const floatingElementsRef = useRef<HTMLDivElement[]>([])

  const benefits = [
    {
      icon: <ElectricityBill width={60} height={60} fill="#ffffff" />,
      title: 'Electricity Bills',
      description:
        'Handle your electricity bills from Discoms like BESCOM or MSEB',
    },
    {
      icon: <GasBills width={60} height={60} fill="#ffffff" />,
      title: 'Gas Bills',
      description: 'Handle your gas bills from Indane or HP Gas',
    },
    {
      icon: <WaterBills width={60} height={60} fill="#ffffff" />,
      title: 'Water Bills',
      description: 'Water from municipal bodies like DJB or BMC',
    },
    {
      icon: <PhoneBills width={60} height={60} fill="#ffffff" />,
      title: 'Phone Bills',
      description: 'Telecom recharges for Airtel, Jio, or Vodafone, and more',
    },
    {
      icon: <SafeSecure width={60} height={60} fill="#ffffff" />,
      title: 'Safe & Secure',
      description: 'RBI-secured transactions.',
    },
    {
      icon: <AlwaysAvaialble width={60} height={60} />,
      title: 'Always available',
      description: '24/7 access and support',
    },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Parallax background elements
    floatingElementsRef.current.forEach((el, index) => {
      if (el) {
        gsap.to(el, {
          y: `${-50 + index * 20}px`,
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })

        // Floating animation
        gsap.to(el, {
          x: Math.random() * 30 - 15,
          y: Math.random() * 30 - 15,
          rotation: Math.random() * 360,
          duration: 6 + Math.random() * 4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: index * 1.2,
        })
      }
    })

    // Main title animations
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

    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Benefits title animation
    gsap.fromTo(
      benefitsTitleRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: benefitsTitleRef.current,
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

  const addToFloatingRefs = (el: HTMLDivElement | null) => {
    if (el && !floatingElementsRef.current.includes(el)) {
      floatingElementsRef.current.push(el)
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-20"
    >
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div
          ref={addToFloatingRefs}
          className="absolute left-10 top-20 h-32 w-32 rounded-full bg-gradient-cyan-blue opacity-10 blur-3xl"
        />
        <div
          ref={addToFloatingRefs}
          className="opacity-8 absolute right-20 top-1/2 h-40 w-40 rounded-full bg-gradient-teal-purple blur-3xl"
        />
        <div
          ref={addToFloatingRefs}
          className="opacity-12 absolute bottom-20 left-1/4 h-24 w-24 rounded-full bg-gradient-navy-blue blur-2xl"
        />
        <div
          ref={addToFloatingRefs}
          className="opacity-6 absolute right-1/3 top-40 h-28 w-28 rounded-full bg-gradient-cyan-blue blur-2xl"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Product Overview Header */}
        <div className="mb-16 text-center">
          <div ref={titleRef}>
            <h2 className="mb-6 text-5xl font-bold text-gray-900 md:text-6xl">
              Product Overview
            </h2>
          </div>

          <div ref={subtitleRef}>
            <p className="mx-auto max-w-4xl text-xl leading-relaxed text-gray-600 md:text-2xl">
              Welcome to{' '}
              <span className="font-semibold text-purple-deep">
                iLogiBOT India&apos;s
              </span>{' '}
              trusted platform for
              <br />
              <span className="font-semibold text-cyan-bright">
                effortless utility bill payments via BBPS.
              </span>
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <div ref={benefitsTitleRef} className="mb-12 text-center">
            <div className="mb-4 inline-block rounded-full bg-gray-100 px-8 py-4">
              <h3 className="text-4xl font-bold text-gray-800">Benefits</h3>
            </div>
          </div>

          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={index}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Animated background pattern */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-teal-purple-r opacity-20"></div> */}
    </section>
  )
}

export default ProductOverview
