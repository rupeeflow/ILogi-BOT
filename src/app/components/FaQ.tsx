'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import FAQ from '../icons/FAQ'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface FAQItemProps {
  question: string
  answer: string
  index: number
  isOpen: boolean
  onToggle: () => void
}

const FAQItem: React.FC<FAQItemProps> = ({
  question,
  answer,
  index,
  isOpen,
  onToggle,
}) => {
  const itemRef = useRef<HTMLDivElement>(null)
  const answerRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const item = itemRef.current
    const answerElement = answerRef.current
    const iconElement = iconRef.current

    if (!item || !answerElement || !iconElement) return

    // Initial entrance animation
    gsap.set(item, {
      opacity: 0,
      y: 30,
    })

    gsap.to(item, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
      delay: index * 0.1,
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    })

    // Answer expand/collapse animation
    if (isOpen) {
      gsap.to(answerElement, {
        height: 'auto',
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      })
      gsap.to(iconElement, {
        rotation: 45,
        duration: 0.3,
        ease: 'power2.out',
      })
    } else {
      gsap.to(answerElement, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      })
      gsap.to(iconElement, {
        rotation: 0,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }, [index, isOpen])

  return (
    <div ref={itemRef} className="border-b border-gray-300 last:border-b-0">
      <button
        onClick={onToggle}
        className="group flex w-full items-center justify-between px-2 py-6 text-left transition-colors duration-200 hover:bg-gray-50"
      >
        <span className="pr-4 text-lg font-medium text-gray-800 transition-colors duration-200 group-hover:text-purple-deep">
          {question}
        </span>
        <div ref={iconRef} className="flex-shrink-0">
          <svg
            className="h-6 w-6 text-gray-600 transition-colors duration-200 group-hover:text-purple-deep"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
      </button>
      <div
        ref={answerRef}
        className="overflow-hidden"
        style={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
      >
        <div className="px-2 pb-6 leading-relaxed text-gray-600">{answer}</div>
      </div>
    </div>
  )
}

const FAQSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const faqIconRef = useRef<HTMLDivElement>(null)
  const viewAllRef = useRef<HTMLButtonElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'What is iLogiBOT and why choose it?',
      answer:
        "iLogiBOT is India's most trusted utility bill payment platform integrated with BBPS (Bharat Bill Payment System). We offer secure, instant payments for electricity, water, gas, mobile recharges, and more. Choose us for our 24/7 availability, cashback offers, automated bill reminders, and seamless UPI integration with no hidden fees.",
    },
    {
      question: 'How do I pay via UPI?',
      answer:
        'Paying via UPI is simple! Select your bill, choose UPI as payment method, and pay using any UPI app like Google Pay, PhonePe, BHIM, or Paytm. You can scan QR code or enter UPI ID. The transaction is instant and secure with real-time confirmation via SMS/email.',
    },
    {
      question: 'What billers are supported?',
      answer:
        'We support 500+ billers across India including major electricity providers (BESCOM, MSEB, TNEB), gas companies (Indane, HP Gas, IGL), water utilities (DJB, BMC), telecom operators (Airtel, Jio, Vi, BSNL), DTH services, broadband providers, and municipal taxes.',
    },
    {
      question: 'How to set up auto-pay?',
      answer:
        "Setting up auto-pay is easy! Go to your bill details, select 'Enable Auto-Pay', choose NACH (National Automated Clearing House) option, provide your bank details for authorization. Once set up, bills will be automatically paid before due dates, ensuring you never miss payments and avoid late fees.",
    },
    {
      question: 'Are there any fees?',
      answer:
        "No, we don't charge any convenience fees for bill payments. The amount you pay is exactly what appears on your bill. Instead, we offer cashback and rewards on most transactions. Some payment methods may have minimal processing charges as per bank policies, which will be clearly displayed before payment.",
    },
    {
      question: "What if my bill isn't fetched?",
      answer:
        "If your bill isn't auto-fetched via BBPS, you can manually enter your bill details or upload a photo of your bill. Our system will verify and process the payment. You can also contact our 24/7 customer support for assistance. We continuously work with billers to improve auto-fetch success rates.",
    },
    {
      question: 'Is it secure for NRIs?',
      answer:
        'Absolutely! Our platform is RBI-compliant and uses bank-grade security with 256-bit SSL encryption. NRIs can securely pay bills for their family in India using international cards or Indian bank accounts. We support multiple currencies and provide transaction tracking with instant email confirmations.',
    },
  ]

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Title animation
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

    // FAQ Icon animation
    if (faqIconRef.current) {
      gsap.set(faqIconRef.current, {
        opacity: 0,
        scale: 0.8,
        rotation: -15,
      })

      gsap.to(faqIconRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
          trigger: faqIconRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      // Continuous floating animation
      gsap.to(faqIconRef.current, {
        y: -10,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      // Rotation animation
      gsap.to(faqIconRef.current, {
        rotation: 5,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    }

    // View All button animation
    gsap.fromTo(
      viewAllRef.current,
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Left Content - FAQ List */}
          <div>
            <div ref={titleRef} className="mb-8">
              <h2 className="mb-6 text-4xl font-bold text-purple-deep md:text-5xl">
                Frequently Asked Questions
              </h2>
            </div>

            {/* FAQ Items */}
            <div className="space-y-0">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  index={index}
                  isOpen={openIndex === index}
                  onToggle={() => handleToggle(index)}
                />
              ))}
            </div>

            {/* View All FAQs Button */}
            <div className="mt-8">
              <button
                ref={viewAllRef}
                className="group inline-flex items-center gap-3 text-lg font-semibold text-purple-deep transition-colors duration-300 hover:text-purple-800"
              >
                View all FAQs
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
              </button>
            </div>
          </div>

          {/* Right Content - FAQ Icon */}
          <div className="flex justify-center lg:justify-end">
            <div ref={faqIconRef} className="relative">
              <div className="flex h-96 w-96 items-center justify-center">
                <FAQ width={350} height={350} />
              </div>

              {/* Decorative floating elements */}
              <div className="absolute -right-4 -top-4 h-8 w-8 animate-pulse rounded-full bg-purple-200"></div>
              <div className="absolute -bottom-4 -left-4 h-6 w-6 animate-pulse rounded-full bg-blue-200 delay-1000"></div>
              <div className="absolute -left-8 top-1/4 h-4 w-4 animate-pulse rounded-full bg-cyan-200 delay-500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
