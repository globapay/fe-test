"use client"

import { useState, useEffect } from "react"

interface PasswordValidation {
  minLength: boolean
  hasUppercase: boolean
  hasDigit: boolean
}

interface FormData {
  password: string
  confirmPassword: string
  agreeTerms: boolean
}

export function usePasswordValidation() {
  const [formData, setFormData] = useState<FormData>({
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })

  const [passwordValidation, setPasswordValidation] = useState<PasswordValidation>({
    minLength: false,
    hasUppercase: false,
    hasDigit: false,
  })

  useEffect(() => {
    const password = formData.password
    setPasswordValidation({
      minLength: password.length >= 10,
      hasUppercase: /[A-Z]/.test(password),
      hasDigit: /[0-9]/.test(password),
    })
  }, [formData.password])

  const isPasswordValid = () => {
    return passwordValidation.minLength && passwordValidation.hasUppercase && passwordValidation.hasDigit
  }

  return {
    formData,
    setFormData,
    passwordValidation,
    isPasswordValid,
  }
}
