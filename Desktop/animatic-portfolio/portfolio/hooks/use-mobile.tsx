"use client"

import { useState, useEffect } from "react"

const MOBILE_BREAKPOINT = 768

export default function useMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    mql.addEventListener("change", onChange)

    // Clean up
    return () => {
      mql.removeEventListener("change", onChange)
    }
  }, [])

  return !!isMobile
}
