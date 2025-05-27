"use client"

import { useState, useEffect } from "react"

interface RegistrationData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  companyName: string
  tradingName?: string
  vatNumber?: string
  currency: string
  address: string
  city: string
  state: string
  postalCode: string
  country: string
}

export function useRegistrationData() {
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null)

  useEffect(() => {
    const savedData = localStorage.getItem("registrationData")
    if (savedData) {
      try {
        setRegistrationData(JSON.parse(savedData))
      } catch (error) {
        console.error("Failed to parse registration data:", error)
        localStorage.removeItem("registrationData")
      }
    }
  }, [])

  const updateRegistrationData = (data: Partial<RegistrationData>) => {
    const newData = { ...registrationData, ...data } as RegistrationData
    setRegistrationData(newData)
    localStorage.setItem("registrationData", JSON.stringify(newData))
  }

  const clearRegistrationData = () => {
    setRegistrationData(null)
    localStorage.removeItem("registrationData")
  }

  return {
    registrationData,
    updateRegistrationData,
    clearRegistrationData,
  }
}
