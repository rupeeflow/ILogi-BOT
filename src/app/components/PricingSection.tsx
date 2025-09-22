'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const PricingSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subheadingRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const bottomHeadingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set([headingRef.current, subheadingRef.current], {
        opacity: 0,
        y: 50,
      })

      gsap.set(cardsRef.current, {
        opacity: 0,
        y: 100,
        scale: 0.9,
      })

      gsap.set(bottomHeadingRef.current, {
        opacity: 0,
        y: 30,
      })

      // Create timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      })

      // Animate heading and subheading
      tl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }).to(
        subheadingRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.4'
      )

      // Animate cards with stagger
      cardsRef.current.forEach((card, index) => {
        if (card) {
          tl.to(
            card,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: 'back.out(1.7)',
            },
            `-=${0.8 - index * 0.2}`
          )
        }
      })

      // Animate bottom heading
      tl.to(
        bottomHeadingRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.3'
      )

      // Hover animations for cards
      cardsRef.current.forEach(card => {
        if (card) {
          const handleMouseEnter = () => {
            gsap.to(card, {
              y: -10,
              scale: 1.02,
              duration: 0.3,
              ease: 'power2.out',
            })
          }

          const handleMouseLeave = () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: 'power2.out',
            })
          }

          card.addEventListener('mouseenter', handleMouseEnter)
          card.addEventListener('mouseleave', handleMouseLeave)
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el)
    }
  }

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-gradient-to-b from-gray-50 to-white py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2
            ref={headingRef}
            className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl"
          >
            Simple, transparent{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p
            ref={subheadingRef}
            className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 md:text-xl"
          >
            We believe in clear, upfront pricing — no hidden costs. Whether
            you&apos;re a startup or a growing fintech, our design solutions
            scale with your needs.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mb-20 grid gap-8 lg:grid-cols-3">
          {/* Starter Plan */}
          <div
            ref={addToRefs}
            className="rounded-3xl border-2 border-purple-100 bg-white p-8 shadow-lg transition-colors duration-300 hover:border-purple-200"
          >
            <div className="mb-8 text-center">
              <h3 className="mb-2 text-2xl font-bold text-gray-900">Starter</h3>
              <div className="mb-2 flex items-baseline justify-center">
                <span className="text-4xl font-bold text-gray-900">₹0</span>
                <span className="ml-1 text-gray-500">/month</span>
              </div>
              <p className="text-gray-600">
                Perfect for freelancers and individuals
              </p>
            </div>

            <ul className="mb-8 space-y-4">
              <li className="flex items-center">
                <svg
                  className="mr-3 h-5 w-5 flex-shrink-0 text-purple-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">
                  Up to 5 invoices per month
                </span>
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-3 h-5 w-5 flex-shrink-0 text-purple-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">Basic expense tracking</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-3 h-5 w-5 flex-shrink-0 text-purple-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">Single bank connection</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-3 h-5 w-5 flex-shrink-0 text-purple-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">Email support</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-3 h-5 w-5 flex-shrink-0 text-purple-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">Mobile app access</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-3 h-5 w-5 flex-shrink-0 text-purple-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">Checkout basic</span>
              </li>
            </ul>

            <button className="group flex w-full transform items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-purple-700 hover:to-blue-700">
              GET STARTED
              <svg
                className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
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
            </button>
          </div>

          {/* Professional Plan (Featured) */}
          <div
            ref={addToRefs}
            className="relative scale-105 transform rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-purple-700 p-8 text-white shadow-2xl"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
              <span className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-purple-600">
                RECOMMENDED
              </span>
            </div>

            <div className="mb-8 text-center">
              <h3 className="mb-2 text-2xl font-bold">Professional</h3>
              <div className="mb-2 flex items-baseline justify-center">
                <span className="text-4xl font-bold">₹2999</span>
                <span className="ml-1 text-blue-100">/month</span>
              </div>
              <p className="text-blue-100">Ideal for small businesses</p>
            </div>

            <ul className="mb-8 space-y-4">
              <li className="flex items-center">
                <svg
                  className="mr-3 h-5 w-5 flex-shrink-0 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Unlimited invoices</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-3 h-5 w-5 flex-shrink-0 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Advanced expense tracking</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-3 h-5 w-5 flex-shrink-0 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Multiple bank connections</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-3 h-5 w-5 flex-shrink-0 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Priority support</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-3 h-5 w-5 flex-shrink-0 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Team collaboration</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-3 h-5 w-5 flex-shrink-0 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Custom branding</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-3 h-5 w-5 flex-shrink-0 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>API access</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-3 h-5 w-5 flex-shrink-0 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Checkout professional</span>
              </li>
            </ul>

            <button className="group flex w-full transform items-center justify-center rounded-xl bg-white px-6 py-4 font-semibold text-purple-600 transition-all duration-300 hover:scale-105 hover:bg-gray-50">
              START FREE TRIAL
              <svg
                className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
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
            </button>
          </div>

          {/* Enterprise Plan */}
          <div
            ref={addToRefs}
            className="rounded-3xl border-2 border-gray-200 bg-white p-8 shadow-lg transition-colors duration-300 hover:border-gray-300"
          >
            <div className="mb-8 text-center">
              <h3 className="mb-2 text-2xl font-bold text-gray-900">
                Enterprise
              </h3>
              <div className="mb-2 flex items-baseline justify-center">
                <span className="text-4xl font-bold text-gray-900">₹9900</span>
                <span className="ml-1 text-gray-500">/month</span>
              </div>
              <p className="text-gray-600">For growing companies</p>
            </div>

            <ul className="mb-8 space-y-4">
              <li className="flex items-center">
                <svg
                  className="mr-3 h-5 w-5 flex-shrink-0 text-purple-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">
                  Everything in Professional
                </span>
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-3 h-5 w-5 flex-shrink-0 text-purple-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">Dedicated account manager</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-3 h-5 w-5 flex-shrink-0 text-purple-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">Custom integrations</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-3 h-5 w-5 flex-shrink-0 text-purple-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">Advanced security</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-3 h-5 w-5 flex-shrink-0 text-purple-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">Unlimited users</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-3 h-5 w-5 flex-shrink-0 text-purple-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">Custom reporting</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-3 h-5 w-5 flex-shrink-0 text-purple-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">SLA guarantee</span>
              </li>
            </ul>

            <button className="group flex w-full transform items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-purple-700 hover:to-blue-700">
              CONTACT SALES
              <svg
                className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
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
            </button>
          </div>
        </div>

        {/* Bottom Heading */}
        <div className="text-center">
          <h3
            ref={bottomHeadingRef}
            className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl"
          >
            Your payments, your control.{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Always.
            </span>
          </h3>
        </div>
      </div>
    </section>
  )
}

export default PricingSection
