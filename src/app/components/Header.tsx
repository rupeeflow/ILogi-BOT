'use client'

import { useState } from 'react'
import DropDownArrow from '../icons/DropDownArrow'
import ILogiBlotImage from '../icons/ILogiBlot'
import UpArrow from '../icons/UpArrow'

const Header = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false)

  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen)
  }

  return (
    <header
      className="w-full border-b bg-white"
      style={{ borderBottomColor: '#C4C4C4' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <ILogiBlotImage width={124} height={32} />
          </div>

          {/* Navigation */}
          <nav className="hidden space-x-8 md:flex">
            <a
              href="#"
              className="px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              HOME
            </a>
            <a
              href="#"
              className="px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              PRICING
            </a>
            <a
              href="#"
              className="px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              BILLERS
            </a>
            <a
              href="#"
              className="px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              HOW IT WORKS
            </a>
            <a
              href="#"
              className="px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              SUPPORT
            </a>

            <div className="relative">
              <button
                onClick={toggleServices}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
              >
                SERVICES
                {isServicesOpen ? (
                  <UpArrow width={16} height={16} fill="#374151" />
                ) : (
                  <DropDownArrow width={16} height={16} fill="#374151" />
                )}
              </button>

              {isServicesOpen && (
                <div className="absolute right-0 z-50 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Service 1
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Service 2
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Service 3
                    </a>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Action Buttons */}
          <div className="hidden items-center space-x-4 md:flex">
            <button className="relative rounded-full bg-gradient-teal-purple-r p-[1px] transition-opacity hover:opacity-80">
              <span className="block rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700">
                Pay as a Guest
              </span>
            </button>
            <button className="rounded-full bg-gradient-teal-purple-r px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
              Login
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-blue-600 focus:text-blue-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
