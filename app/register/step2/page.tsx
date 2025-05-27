"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, Building2, Receipt, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ProgressBar from "@/components/progress-bar"

// Common currencies with their codes and symbols
// const commonCurrencies = [
//   { code: "USD", name: "US Dollar ($)", symbol: "$" },
//   { code: "EUR", name: "Euro (€)", symbol: "€" },
//   { code: "GBP", name: "British Pound (£)", symbol: "£" },
//   { code: "JPY", name: "Japanese Yen (¥)", symbol: "¥" },
//   { code: "CAD", name: "Canadian Dollar (C$)", symbol: "C$" },
//   { code: "AUD", name: "Australian Dollar (A$)", symbol: "A$" },
//   { code: "CHF", name: "Swiss Franc (CHF)", symbol: "CHF" },
//   { code: "CNY", name: "Chinese Yuan (¥)", symbol: "¥" },
// ]

// // Additional currencies
// const otherCurrencies = [
//   { code: "INR", name: "Indian Rupee (₹)", symbol: "₹" },
//   { code: "BRL", name: "Brazilian Real (R$)", symbol: "R$" },
//   { code: "RUB", name: "Russian Ruble (₽)", symbol: "₽" },
//   { code: "KRW", name: "South Korean Won (₩)", symbol: "₩" },
//   { code: "SGD", name: "Singapore Dollar (S$)", symbol: "S$" },
//   { code: "NZD", name: "New Zealand Dollar (NZ$)", symbol: "NZ$" },
//   { code: "MXN", name: "Mexican Peso (MX$)", symbol: "MX$" },
//   { code: "HKD", name: "Hong Kong Dollar (HK$)", symbol: "HK$" },
//   { code: "SEK", name: "Swedish Krona (kr)", symbol: "kr" },
//   { code: "NOK", name: "Norwegian Krone (kr)", symbol: "kr" },
//   { code: "DKK", name: "Danish Krone (kr)", symbol: "kr" },
//   { code: "PLN", name: "Polish Złoty (zł)", symbol: "zł" },
//   { code: "ZAR", name: "South African Rand (R)", symbol: "R" },
//   { code: "AED", name: "United Arab Emirates Dirham (د.إ)", symbol: "د.إ" },
//   { code: "SAR", name: "Saudi Riyal (﷼)", symbol: "﷼" },
// ]

export default function RegisterStep2Page() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    companyName: "",
    tradingName: "",
    vatNumber: "",
    currency: "GBP",
    locations: "",
    logo: null,
  })

  useEffect(() => {
    // Check if we have data from step 1
    const savedData = localStorage.getItem("registrationData")
    if (!savedData) {
      // For testing purposes, we'll initialize with empty data instead of redirecting
      localStorage.setItem(
        "registrationData",
        JSON.stringify({
          firstName: "Test",
          lastName: "User",
          email: "test@example.com",
        }),
      )
    }

    // Auto-detect user's country and set currency (simplified example)
    // In a real app, you would use a geolocation API or IP-based detection
    const detectUserCurrency = async () => {
      try {
        // This is a placeholder - in a real app you would use a service like ipinfo.io
        // const response = await fetch('https://ipinfo.io/json?token=YOUR_TOKEN');
        // const data = await response.json();
        // const country = data.country;

        // For demo purposes, we'll just default to USD
        setFormData((prev) => ({ ...prev, currency: "USD" }))
      } catch (error) {
        console.error("Error detecting user location:", error)
      }
    }

    detectUserCurrency()
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store form data in localStorage for the next step
    const step1Data = JSON.parse(localStorage.getItem("registrationData") || "{}")

    // Create a copy of formData without the logo file (can't stringify File objects)
    const formDataForStorage = { ...formData }
    delete formDataForStorage.logo

    localStorage.setItem(
      "registrationData",
      JSON.stringify({
        ...step1Data,
        ...formDataForStorage,
      }),
    )

    // Note: In a real implementation, you would upload the logo file to a server
    // and store the URL or file reference instead

    router.push("/register/step3")
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f0f5fa]">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-orange-500">GiftFlow</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Already have an account?</span>
          <Link
            href="/login"
            className="rounded-md border border-orange-500 px-4 py-2 text-sm font-medium text-orange-500 hover:bg-orange-50"
          >
            Log in
          </Link>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="relative mx-auto mt-8 w-full max-w-3xl px-4">
        <ProgressBar currentStep={2} totalSteps={4} />
      </div>

      {/* Main Form */}
      <div className="mx-auto mt-8 w-full max-w-3xl px-4 pb-16">
        <div className="overflow-hidden rounded-lg bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Company details</h1>
            <div className="rounded-full bg-orange-100 px-4 py-1 text-sm font-medium text-orange-500">Step 2 of 4</div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800">Company Information</h2>

            <div className="mt-6">
              <label htmlFor="companyName" className="mb-1 block text-sm font-medium text-gray-700">
                Company Name (Legal Entity) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="companyName"
                  name="companyName"
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 py-2 pl-10 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  placeholder="Acme Inc."
                />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="tradingName" className="mb-1 block text-sm font-medium text-gray-700">
                Trading Name (if different)
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="tradingName"
                  name="tradingName"
                  type="text"
                  value={formData.tradingName}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 py-2 pl-10 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  placeholder="Acme Trading Ltd."
                />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="vatNumber" className="mb-1 block text-sm font-medium text-gray-700">
                Tax/VAT Number
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Receipt className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="vatNumber"
                  name="vatNumber"
                  type="text"
                  value={formData.vatNumber}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 py-2 pl-10 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  placeholder="GB123456789"
                />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="currency" className="mb-1 block text-sm font-medium text-gray-700">
                Currency <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Globe className="h-5 w-5 text-gray-400" />
                </div>
                <Select value={formData.currency} onValueChange={(value) => handleSelectChange("currency", value)}>
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    <div className="p-1 text-xs font-medium text-gray-500">Popular Currencies</div>
                    <SelectItem value="USD">US Dollar (USD)</SelectItem>
                    <SelectItem value="EUR">Euro (EUR)</SelectItem>
                    <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                    <SelectItem value="JPY">Japanese Yen (JPY)</SelectItem>
                    <SelectItem value="CAD">Canadian Dollar (CAD)</SelectItem>
                    <SelectItem value="AUD">Australian Dollar (AUD)</SelectItem>
                    <SelectItem value="CHF">Swiss Franc (CHF)</SelectItem>
                    <SelectItem value="CNY">Chinese Yuan (CNY)</SelectItem>
                    <SelectItem value="HKD">Hong Kong Dollar (HKD)</SelectItem>
                    <SelectItem value="SGD">Singapore Dollar (SGD)</SelectItem>

                    <div className="p-1 text-xs font-medium text-gray-500">Caribbean Currencies</div>
                    <SelectItem value="BBD">Barbados Dollar (BBD)</SelectItem>
                    <SelectItem value="BSD">Bahamian Dollar (BSD)</SelectItem>
                    <SelectItem value="DOP">Dominican Peso (DOP)</SelectItem>
                    <SelectItem value="JMD">Jamaican Dollar (JMD)</SelectItem>
                    <SelectItem value="TTD">Trinidad and Tobago Dollar (TTD)</SelectItem>
                    <SelectItem value="XCD">East Caribbean Dollar (XCD)</SelectItem>
                    <SelectItem value="HTG">Haitian Gourde (HTG)</SelectItem>
                    <SelectItem value="CUP">Cuban Peso (CUP)</SelectItem>

                    <div className="p-1 text-xs font-medium text-gray-500">Other Currencies</div>
                    <SelectItem value="AED">UAE Dirham (AED)</SelectItem>
                    <SelectItem value="AFN">Afghan Afghani (AFN)</SelectItem>
                    <SelectItem value="ALL">Albanian Lek (ALL)</SelectItem>
                    <SelectItem value="AMD">Armenian Dram (AMD)</SelectItem>
                    <SelectItem value="ANG">Netherlands Antillean Guilder (ANG)</SelectItem>
                    <SelectItem value="AOA">Angolan Kwanza (AOA)</SelectItem>
                    <SelectItem value="ARS">Argentine Peso (ARS)</SelectItem>
                    <SelectItem value="AWG">Aruban Florin (AWG)</SelectItem>
                    <SelectItem value="AZN">Azerbaijani Manat (AZN)</SelectItem>
                    <SelectItem value="BAM">Bosnia-Herzegovina Convertible Mark (BAM)</SelectItem>
                    <SelectItem value="BDT">Bangladeshi Taka (BDT)</SelectItem>
                    <SelectItem value="BGN">Bulgarian Lev (BGN)</SelectItem>
                    <SelectItem value="BHD">Bahraini Dinar (BHD)</SelectItem>
                    <SelectItem value="BIF">Burundian Franc (BIF)</SelectItem>
                    <SelectItem value="BMD">Bermudan Dollar (BMD)</SelectItem>
                    <SelectItem value="BND">Brunei Dollar (BND)</SelectItem>
                    <SelectItem value="BOB">Bolivian Boliviano (BOB)</SelectItem>
                    <SelectItem value="BRL">Brazilian Real (BRL)</SelectItem>
                    <SelectItem value="BTN">Bhutanese Ngultrum (BTN)</SelectItem>
                    <SelectItem value="BWP">Botswanan Pula (BWP)</SelectItem>
                    <SelectItem value="BYN">Belarusian Ruble (BYN)</SelectItem>
                    <SelectItem value="BZD">Belize Dollar (BZD)</SelectItem>
                    <SelectItem value="CDF">Congolese Franc (CDF)</SelectItem>
                    <SelectItem value="CLP">Chilean Peso (CLP)</SelectItem>
                    <SelectItem value="COP">Colombian Peso (COP)</SelectItem>
                    <SelectItem value="CRC">Costa Rican Colón (CRC)</SelectItem>
                    <SelectItem value="CVE">Cape Verdean Escudo (CVE)</SelectItem>
                    <SelectItem value="CZK">Czech Republic Koruna (CZK)</SelectItem>
                    <SelectItem value="DJF">Djiboutian Franc (DJF)</SelectItem>
                    <SelectItem value="DKK">Danish Krone (DKK)</SelectItem>
                    <SelectItem value="DZD">Algerian Dinar (DZD)</SelectItem>
                    <SelectItem value="EGP">Egyptian Pound (EGP)</SelectItem>
                    <SelectItem value="ERN">Eritrean Nakfa (ERN)</SelectItem>
                    <SelectItem value="ETB">Ethiopian Birr (ETB)</SelectItem>
                    <SelectItem value="FJD">Fijian Dollar (FJD)</SelectItem>
                    <SelectItem value="GEL">Georgian Lari (GEL)</SelectItem>
                    <SelectItem value="GHS">Ghanaian Cedi (GHS)</SelectItem>
                    <SelectItem value="GMD">Gambian Dalasi (GMD)</SelectItem>
                    <SelectItem value="GNF">Guinean Franc (GNF)</SelectItem>
                    <SelectItem value="GTQ">Guatemalan Quetzal (GTQ)</SelectItem>
                    <SelectItem value="GYD">Guyanaese Dollar (GYD)</SelectItem>
                    <SelectItem value="HNL">Honduran Lempira (HNL)</SelectItem>
                    <SelectItem value="HRK">Croatian Kuna (HRK)</SelectItem>
                    <SelectItem value="HUF">Hungarian Forint (HUF)</SelectItem>
                    <SelectItem value="IDR">Indonesian Rupiah (IDR)</SelectItem>
                    <SelectItem value="ILS">Israeli New Shekel (ILS)</SelectItem>
                    <SelectItem value="INR">Indian Rupee (INR)</SelectItem>
                    <SelectItem value="IQD">Iraqi Dinar (IQD)</SelectItem>
                    <SelectItem value="IRR">Iranian Rial (IRR)</SelectItem>
                    <SelectItem value="ISK">Icelandic Króna (ISK)</SelectItem>
                    <SelectItem value="JOD">Jordanian Dinar (JOD)</SelectItem>
                    <SelectItem value="KES">Kenyan Shilling (KES)</SelectItem>
                    <SelectItem value="KGS">Kyrgystani Som (KGS)</SelectItem>
                    <SelectItem value="KHR">Cambodian Riel (KHR)</SelectItem>
                    <SelectItem value="KMF">Comorian Franc (KMF)</SelectItem>
                    <SelectItem value="KRW">South Korean Won (KRW)</SelectItem>
                    <SelectItem value="KWD">Kuwaiti Dinar (KWD)</SelectItem>
                    <SelectItem value="KZT">Kazakhstani Tenge (KZT)</SelectItem>
                    <SelectItem value="LAK">Laotian Kip (LAK)</SelectItem>
                    <SelectItem value="LBP">Lebanese Pound (LBP)</SelectItem>
                    <SelectItem value="LKR">Sri Lankan Rupee (LKR)</SelectItem>
                    <SelectItem value="LRD">Liberian Dollar (LRD)</SelectItem>
                    <SelectItem value="LSL">Lesotho Loti (LSL)</SelectItem>
                    <SelectItem value="LYD">Libyan Dinar (LYD)</SelectItem>
                    <SelectItem value="MAD">Moroccan Dirham (MAD)</SelectItem>
                    <SelectItem value="MDL">Moldovan Leu (MDL)</SelectItem>
                    <SelectItem value="MGA">Malagasy Ariary (MGA)</SelectItem>
                    <SelectItem value="MKD">Macedonian Denar (MKD)</SelectItem>
                    <SelectItem value="MMK">Myanmar Kyat (MMK)</SelectItem>
                    <SelectItem value="MNT">Mongolian Tugrik (MNT)</SelectItem>
                    <SelectItem value="MOP">Macanese Pataca (MOP)</SelectItem>
                    <SelectItem value="MRU">Mauritanian Ouguiya (MRU)</SelectItem>
                    <SelectItem value="MUR">Mauritian Rupee (MUR)</SelectItem>
                    <SelectItem value="MVR">Maldivian Rufiyaa (MVR)</SelectItem>
                    <SelectItem value="MWK">Malawian Kwacha (MWK)</SelectItem>
                    <SelectItem value="MXN">Mexican Peso (MXN)</SelectItem>
                    <SelectItem value="MYR">Malaysian Ringgit (MYR)</SelectItem>
                    <SelectItem value="MZN">Mozambican Metical (MZN)</SelectItem>
                    <SelectItem value="NAD">Namibian Dollar (NAD)</SelectItem>
                    <SelectItem value="NGN">Nigerian Naira (NGN)</SelectItem>
                    <SelectItem value="NIO">Nicaraguan Córdoba (NIO)</SelectItem>
                    <SelectItem value="NOK">Norwegian Krone (NOK)</SelectItem>
                    <SelectItem value="NPR">Nepalese Rupee (NPR)</SelectItem>
                    <SelectItem value="NZD">New Zealand Dollar (NZD)</SelectItem>
                    <SelectItem value="OMR">Omani Rial (OMR)</SelectItem>
                    <SelectItem value="PAB">Panamanian Balboa (PAB)</SelectItem>
                    <SelectItem value="PEN">Peruvian Nuevo Sol (PEN)</SelectItem>
                    <SelectItem value="PGK">Papua New Guinean Kina (PGK)</SelectItem>
                    <SelectItem value="PHP">Philippine Peso (PHP)</SelectItem>
                    <SelectItem value="PKR">Pakistani Rupee (PKR)</SelectItem>
                    <SelectItem value="PLN">Polish Zloty (PLN)</SelectItem>
                    <SelectItem value="PYG">Paraguayan Guarani (PYG)</SelectItem>
                    <SelectItem value="QAR">Qatari Rial (QAR)</SelectItem>
                    <SelectItem value="RON">Romanian Leu (RON)</SelectItem>
                    <SelectItem value="RSD">Serbian Dinar (RSD)</SelectItem>
                    <SelectItem value="RUB">Russian Ruble (RUB)</SelectItem>
                    <SelectItem value="RWF">Rwandan Franc (RWF)</SelectItem>
                    <SelectItem value="SAR">Saudi Riyal (SAR)</SelectItem>
                    <SelectItem value="SBD">Solomon Islands Dollar (SBD)</SelectItem>
                    <SelectItem value="SCR">Seychellois Rupee (SCR)</SelectItem>
                    <SelectItem value="SDG">Sudanese Pound (SDG)</SelectItem>
                    <SelectItem value="SEK">Swedish Krona (SEK)</SelectItem>
                    <SelectItem value="SLL">Sierra Leonean Leone (SLL)</SelectItem>
                    <SelectItem value="SOS">Somali Shilling (SOS)</SelectItem>
                    <SelectItem value="SRD">Surinamese Dollar (SRD)</SelectItem>
                    <SelectItem value="SSP">South Sudanese Pound (SSP)</SelectItem>
                    <SelectItem value="STN">São Tomé and Príncipe Dobra (STN)</SelectItem>
                    <SelectItem value="SYP">Syrian Pound (SYP)</SelectItem>
                    <SelectItem value="SZL">Swazi Lilangeni (SZL)</SelectItem>
                    <SelectItem value="THB">Thai Baht (THB)</SelectItem>
                    <SelectItem value="TJS">Tajikistani Somoni (TJS)</SelectItem>
                    <SelectItem value="TMT">Turkmenistani Manat (TMT)</SelectItem>
                    <SelectItem value="TND">Tunisian Dinar (TND)</SelectItem>
                    <SelectItem value="TOP">Tongan Pa'anga (TOP)</SelectItem>
                    <SelectItem value="TRY">Turkish Lira (TRY)</SelectItem>
                    <SelectItem value="TWD">New Taiwan Dollar (TWD)</SelectItem>
                    <SelectItem value="TZS">Tanzanian Shilling (TZS)</SelectItem>
                    <SelectItem value="UAH">Ukrainian Hryvnia (UAH)</SelectItem>
                    <SelectItem value="UGX">Ugandan Shilling (UGX)</SelectItem>
                    <SelectItem value="UYU">Uruguayan Peso (UYU)</SelectItem>
                    <SelectItem value="UZS">Uzbekistan Som (UZS)</SelectItem>
                    <SelectItem value="VES">Venezuelan Bolívar (VES)</SelectItem>
                    <SelectItem value="VND">Vietnamese Dong (VND)</SelectItem>
                    <SelectItem value="VUV">Vanuatu Vatu (VUV)</SelectItem>
                    <SelectItem value="WST">Samoan Tala (WST)</SelectItem>
                    <SelectItem value="XAF">CFA Franc BEAC (XAF)</SelectItem>
                    <SelectItem value="XOF">CFA Franc BCEAO (XOF)</SelectItem>
                    <SelectItem value="XPF">CFP Franc (XPF)</SelectItem>
                    <SelectItem value="YER">Yemeni Rial (YER)</SelectItem>
                    <SelectItem value="ZAR">South African Rand (ZAR)</SelectItem>
                    <SelectItem value="ZMW">Zambian Kwacha (ZMW)</SelectItem>
                    <SelectItem value="ZWL">Zimbabwean Dollar (ZWL)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="locations" className="mb-1 block text-sm font-medium text-gray-700">
                Number of Locations
              </label>
              <div className="w-1/3">
                <Input
                  id="locations"
                  name="locations"
                  type="number"
                  min="0"
                  max="999999"
                  value={formData.locations}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 py-2 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  placeholder="Enter number of locations"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Enter the number of physical locations your business operates
              </p>
            </div>

            <div className="mt-6">
              <label htmlFor="logo" className="mb-1 block text-sm font-medium text-gray-700">
                Company Logo
              </label>
              <div className="flex h-40 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                <div className="text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mx-auto h-10 w-10 text-gray-400"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" />
                    <line x1="15" y1="9" x2="15.01" y2="9" />
                  </svg>
                  <div className="mt-2">
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer rounded-md bg-orange-500 px-3 py-2 text-sm font-medium text-white hover:bg-orange-600"
                    >
                      <span>Upload logo</span>
                      <input
                        id="file-upload"
                        name="logo"
                        type="file"
                        className="sr-only"
                        accept=".jpg,.jpeg,.png,.pdf,.gg"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setFormData((prev) => ({ ...prev, logo: e.target.files ? e.target.files[0] : null }))
                          }
                        }}
                      />
                    </label>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">JPG, PNG, PDF, GG up to 1,012 MB</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Button
                type="button"
                onClick={() => router.push("/register")}
                className="px-6 py-2 text-sm font-medium text-orange-500 hover:text-orange-600"
                variant="ghost"
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex items-center gap-2 rounded-md bg-orange-500 px-6 py-2 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
