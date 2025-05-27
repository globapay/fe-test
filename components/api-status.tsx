"use client"

import { useState, useEffect } from "react"
import { AlertCircle, CheckCircle, Clock } from "lucide-react"

export function ApiStatus() {
  const [status, setStatus] = useState<"checking" | "online" | "offline">("checking")
  const [lastChecked, setLastChecked] = useState<Date | null>(null)

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (response.ok) {
          setStatus("online")
        } else {
          setStatus("offline")
        }
      } catch (error) {
        setStatus("offline")
      } finally {
        setLastChecked(new Date())
      }
    }

    checkApiStatus()
    const interval = setInterval(checkApiStatus, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = () => {
    switch (status) {
      case "checking":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "online":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "offline":
        return <AlertCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusText = () => {
    switch (status) {
      case "checking":
        return "Checking API..."
      case "online":
        return "API Online"
      case "offline":
        return "API Offline"
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case "checking":
        return "text-yellow-600"
      case "online":
        return "text-green-600"
      case "offline":
        return "text-red-600"
    }
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      {getStatusIcon()}
      <span className={getStatusColor()}>{getStatusText()}</span>
      {lastChecked && <span className="text-gray-500 text-xs">Last checked: {lastChecked.toLocaleTimeString()}</span>}
    </div>
  )
}
