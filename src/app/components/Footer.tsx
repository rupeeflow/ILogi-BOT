'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
// import ILogiBlotImage from '../icons/ILogiBlot';
import FbSVG from '../icons/FbSvg'
import InstagramSVG from '../icons/InstagramSVG'
import TwitterSVG from '../icons/Twitter'
import YtSVG from '../icons/YtSVG'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface FooterLinkProps {
  href: string
  children: React.ReactNode
  index: number
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children, index }) => {
  const linkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const link = linkRef.current
    if (!link) return

    // Initial state
    gsap.set(link, {
      opacity: 0,
      y: 20,
    })

    // Entrance animation
    gsap.to(link, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
      delay: index * 0.1,
      scrollTrigger: {
        trigger: link,
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
    })

    // Hover animation
    const hoverTl = gsap.timeline({ paused: true })
    hoverTl.to(link, {
      x: 5,
      duration: 0.3,
      ease: 'power2.out',
    })

    const handleMouseEnter = () => hoverTl.play()
    const handleMouseLeave = () => hoverTl.reverse()

    link.addEventListener('mouseenter', handleMouseEnter)
    link.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      link.removeEventListener('mouseenter', handleMouseEnter)
      link.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [index])

  return (
    <a
      ref={linkRef}
      href={href}
      className="block py-1 text-gray-400 transition-colors duration-300 hover:text-white"
    >
      {children}
    </a>
  )
}

interface SocialIconProps {
  href: string
  icon: React.ReactNode
  label: string
  index: number
}

const SocialIcon: React.FC<SocialIconProps> = ({
  href,
  icon,
  label,
  index,
}) => {
  const iconRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const iconElement = iconRef.current
    if (!iconElement) return

    // Initial state
    gsap.set(iconElement, {
      opacity: 0,
      scale: 0.5,
      rotation: -45,
    })

    // Entrance animation
    gsap.to(iconElement, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.8,
      ease: 'back.out(1.7)',
      delay: index * 0.15,
      scrollTrigger: {
        trigger: iconElement,
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
    })

    // Hover animation
    const hoverTl = gsap.timeline({ paused: true })
    hoverTl.to(iconElement, {
      scale: 1.2,
      y: -5,
      duration: 0.3,
      ease: 'power2.out',
    })

    const handleMouseEnter = () => hoverTl.play()
    const handleMouseLeave = () => hoverTl.reverse()

    iconElement.addEventListener('mouseenter', handleMouseEnter)
    iconElement.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      iconElement.removeEventListener('mouseenter', handleMouseEnter)
      iconElement.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [index])

  return (
    <a
      ref={iconRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition-colors duration-300 hover:bg-gray-100"
      aria-label={label}
    >
      {icon}
    </a>
  )
}

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const gradientRef = useRef<HTMLDivElement>(null)
  const copyrightRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const productLinks = [
    { href: '#', text: 'Product Overview' },
    { href: '#', text: 'Transactions' },
    { href: '#', text: 'Dashboard' },
    { href: '#', text: 'Partners' },
  ]

  const navigateLinks = [
    { href: '#', text: 'Pay as a Guest' },
    { href: '#', text: 'Dashboard' },
    { href: '#', text: 'Pricing' },
    { href: '#', text: 'How it works' },
    { href: '#', text: 'Contact us' },
  ]

  const supportLinks = [
    { href: '#', text: 'Contact Us' },
    { href: '#', text: 'Inquire to become a partner' },
    { href: '#', text: 'Feedback & Suggestions' },
    { href: '#', text: 'Terms and Conditions' },
    { href: '#', text: 'Privacy and Policy' },
  ]

  const socialLinks = [
    {
      href: 'https://facebook.com',
      icon: <FbSVG width={24} height={24} />,
      label: 'Facebook',
    },
    {
      href: 'https://youtube.com',
      icon: <YtSVG width={24} height={24} />,
      label: 'YouTube',
    },
    {
      href: 'https://instagram.com',
      icon: <InstagramSVG width={24} height={24} />,
      label: 'Instagram',
    },
    {
      href: 'https://linkedin.com',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#0077B5">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      label: 'LinkedIn',
    },
    {
      href: 'https://twitter.com',
      icon: <TwitterSVG width={24} height={24} />,
      label: 'Twitter/X',
    },
  ]

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    // Gradient background animation
    if (gradientRef.current) {
      gsap.set(gradientRef.current, {
        opacity: 0,
      })

      gsap.to(gradientRef.current, {
        opacity: 1,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: gradientRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
    }

    // Logo animation
    if (logoRef.current) {
      gsap.set(logoRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 30,
      })

      gsap.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: logoRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      // Floating animation for logo
      gsap.to(logoRef.current, {
        y: -5,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    }

    // CTA animation
    if (ctaRef.current) {
      gsap.set(ctaRef.current, {
        opacity: 0,
        y: 50,
      })

      gsap.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    }

    // Copyright animation
    if (copyrightRef.current) {
      gsap.set(copyrightRef.current, {
        opacity: 0,
      })

      gsap.to(copyrightRef.current, {
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        delay: 0.5,
        scrollTrigger: {
          trigger: copyrightRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <footer ref={footerRef} className="relative overflow-hidden">
      {/* Gradient Background */}
      <div
        ref={gradientRef}
        className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900"
      ></div>

      {/* Main Footer Content */}
      <div className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Company Logo and Info */}
            <div className="lg:col-span-1">
              <div ref={logoRef} className="mb-6">
                <div className="mb-4 flex items-center">
                  <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-lg bg-white">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="#6366F1"
                    >
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1V3H9V1L3 7V9H21M3 19C3 20.1 3.9 21 5 21S7 20.1 7 19 6.1 17 5 17 3 17.9 3 19M12 13.5C7.5 13.5 4 15 4 17V19H20V17C20 15 16.5 13.5 12 13.5M19 17C19 17.9 19.9 19 21 19S21 20.1 19 21 17 20.1 17 19 17.9 17 19 17Z" />
                    </svg>
                  </div>
                  <span className="text-2xl font-bold text-white">
                    iLogiBOT
                  </span>
                </div>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="mb-6 text-xl font-semibold text-white">Product</h4>
              <nav className="space-y-2">
                {productLinks.map((link, index) => (
                  <FooterLink key={index} href={link.href} index={index}>
                    {link.text}
                  </FooterLink>
                ))}
              </nav>
            </div>

            {/* Navigate Links */}
            <div>
              <h4 className="mb-6 text-xl font-semibold text-white">
                Navigate
              </h4>
              <nav className="space-y-2">
                {navigateLinks.map((link, index) => (
                  <FooterLink key={index} href={link.href} index={index}>
                    {link.text}
                  </FooterLink>
                ))}
              </nav>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="mb-6 text-xl font-semibold text-white">Support</h4>
              <nav className="space-y-2">
                {supportLinks.map((link, index) => (
                  <FooterLink key={index} href={link.href} index={index}>
                    {link.text}
                  </FooterLink>
                ))}
              </nav>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="mb-8 flex justify-center space-x-6">
            {socialLinks.map((social, index) => (
              <SocialIcon
                key={index}
                href={social.href}
                icon={social.icon}
                label={social.label}
                index={index}
              />
            ))}
          </div>

          {/* Copyright */}
          <div
            ref={copyrightRef}
            className="border-t border-gray-600 pt-8 text-center"
          >
            <p className="text-gray-400">
              �2025 iLogiBot technology private Limited. All rights reserved
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute left-10 top-20 h-32 w-32 rounded-full bg-white/5 blur-3xl"></div>
      <div className="absolute bottom-20 right-20 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl"></div>
      <div className="absolute left-1/4 top-1/2 h-24 w-24 rounded-full bg-purple-500/10 blur-2xl"></div>
    </footer>
  )
}

export default Footer
