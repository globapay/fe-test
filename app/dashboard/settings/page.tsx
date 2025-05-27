import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { User, Building, Shield, Palette, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Currency data
const popularCurrencies = [
  { value: "USD", label: "US Dollar (USD)" },
  { value: "EUR", label: "Euro (EUR)" },
  { value: "GBP", label: "British Pound (GBP)" },
  { value: "JPY", label: "Japanese Yen (JPY)" },
  { value: "CAD", label: "Canadian Dollar (CAD)" },
  { value: "AUD", label: "Australian Dollar (AUD)" },
  { value: "CHF", label: "Swiss Franc (CHF)" },
  { value: "CNY", label: "Chinese Yuan (CNY)" },
  { value: "HKD", label: "Hong Kong Dollar (HKD)" },
  { value: "SGD", label: "Singapore Dollar (SGD)" },
];

const caribbeanCurrencies = [
  { value: "BBD", label: "Barbados Dollar (BBD)" },
  { value: "BSD", label: "Bahamian Dollar (BSD)" },
  { value: "DOP", label: "Dominican Peso (DOP)" },
  { value: "JMD", label: "Jamaican Dollar (JMD)" },
  { value: "TTD", label: "Trinidad and Tobago Dollar (TTD)" },
  { value: "XCD", label: "East Caribbean Dollar (XCD)" },
  { value: "HTG", label: "Haitian Gourde (HTG)" },
  { value: "CUP", label: "Cuban Peso (CUP)" },
];

const otherCurrencies = [
  { value: "AED", label: "UAE Dirham (AED)" },
  { value: "AFN", label: "Afghan Afghani (AFN)" },
  { value: "ALL", label: "Albanian Lek (ALL)" },
  { value: "AMD", label: "Armenian Dram (AMD)" },
  { value: "ANG", label: "Netherlands Antillean Guilder (ANG)" },
  { value: "AOA", label: "Angolan Kwanza (AOA)" },
  { value: "ARS", label: "Argentine Peso (ARS)" },
  { value: "AWG", label: "Aruban Florin (AWG)" },
  { value: "AZN", label: "Azerbaijani Manat (AZN)" },
  { value: "BAM", label: "Bosnia-Herzegovina Convertible Mark (BAM)" },
  { value: "BDT", label: "Bangladeshi Taka (BDT)" },
  { value: "BGN", label: "Bulgarian Lev (BGN)" },
  { value: "BHD", label: "Bahraini Dinar (BHD)" },
  { value: "BIF", label: "Burundian Franc (BIF)" },
  { value: "BMD", label: "Bermudan Dollar (BMD)" },
  { value: "BND", label: "Brunei Dollar (BND)" },
  { value: "BOB", label: "Bolivian Boliviano (BOB)" },
  { value: "BRL", label: "Brazilian Real (BRL)" },
  { value: "BTN", label: "Bhutanese Ngultrum (BTN)" },
  { value: "BWP", label: "Botswanan Pula (BWP)" },
  { value: "BYN", label: "Belarusian Ruble (BYN)" },
  { value: "BZD", label: "Belize Dollar (BZD)" },
  { value: "CDF", label: "Congolese Franc (CDF)" },
  { value: "CLP", label: "Chilean Peso (CLP)" },
  { value: "COP", label: "Colombian Peso (COP)" },
  { value: "CRC", label: "Costa Rican Colón (CRC)" },
  { value: "CVE", label: "Cape Verdean Escudo (CVE)" },
  { value: "CZK", label: "Czech Republic Koruna (CZK)" },
  { value: "DJF", label: "Djiboutian Franc (DJF)" },
  { value: "DKK", label: "Danish Krone (DKK)" },
  { value: "DZD", label: "Algerian Dinar (DZD)" },
  { value: "EGP", label: "Egyptian Pound (EGP)" },
  { value: "ERN", label: "Eritrean Nakfa (ERN)" },
  { value: "ETB", label: "Ethiopian Birr (ETB)" },
  { value: "FJD", label: "Fijian Dollar (FJD)" },
  { value: "GEL", label: "Georgian Lari (GEL)" },
  { value: "GHS", label: "Ghanaian Cedi (GHS)" },
  { value: "GMD", label: "Gambian Dalasi (GMD)" },
  { value: "GNF", label: "Guinean Franc (GNF)" },
  { value: "GTQ", label: "Guatemalan Quetzal (GTQ)" },
  { value: "GYD", label: "Guyanaese Dollar (GYD)" },
  { value: "HNL", label: "Honduran Lempira (HNL)" },
  { value: "HRK", label: "Croatian Kuna (HRK)" },
  { value: "HUF", label: "Hungarian Forint (HUF)" },
  { value: "IDR", label: "Indonesian Rupiah (IDR)" },
  { value: "ILS", label: "Israeli New Shekel (ILS)" },
  { value: "INR", label: "Indian Rupee (INR)" },
  { value: "IQD", label: "Iraqi Dinar (IQD)" },
  { value: "IRR", label: "Iranian Rial (IRR)" },
  { value: "ISK", label: "Icelandic Króna (ISK)" },
  { value: "JOD", label: "Jordanian Dinar (JOD)" },
  { value: "KES", label: "Kenyan Shilling (KES)" },
  { value: "KGS", label: "Kyrgystani Som (KGS)" },
  { value: "KHR", label: "Cambodian Riel (KHR)" },
  { value: "KMF", label: "Comorian Franc (KMF)" },
  { value: "KRW", label: "South Korean Won (KRW)" },
  { value: "KWD", label: "Kuwaiti Dinar (KWD)" },
  { value: "KZT", label: "Kazakhstani Tenge (KZT)" },
  { value: "LAK", label: "Laotian Kip (LAK)" },
  { value: "LBP", label: "Lebanese Pound (LBP)" },
  { value: "LKR", label: "Sri Lankan Rupee (LKR)" },
  { value: "LRD", label: "Liberian Dollar (LRD)" },
  { value: "LSL", label: "Lesotho Loti (LSL)" },
  { value: "LYD", label: "Libyan Dinar (LYD)" },
  { value: "MAD", label: "Moroccan Dirham (MAD)" },
  { value: "MDL", label: "Moldovan Leu (MDL)" },
  { value: "MGA", label: "Malagasy Ariary (MGA)" },
  { value: "MKD", label: "Macedonian Denar (MKD)" },
  { value: "MMK", label: "Myanmar Kyat (MMK)" },
  { value: "MNT", label: "Mongolian Tugrik (MNT)" },
  { value: "MOP", label: "Macanese Pataca (MOP)" },
  { value: "MRU", label: "Mauritanian Ouguiya (MRU)" },
  { value: "MUR", label: "Mauritian Rupee (MUR)" },
  { value: "MVR", label: "Maldivian Rufiyaa (MVR)" },
  { value: "MWK", label: "Malawian Kwacha (MWK)" },
  { value: "MXN", label: "Mexican Peso (MXN)" },
  { value: "MYR", label: "Malaysian Ringgit (MYR)" },
  { value: "MZN", label: "Mozambican Metical (MZN)" },
  { value: "NAD", label: "Namibian Dollar (NAD)" },
  { value: "NGN", label: "Nigerian Naira (NGN)" },
  { value: "NIO", label: "Nicaraguan Córdoba (NIO)" },
  { value: "NOK", label: "Norwegian Krone (NOK)" },
  { value: "NPR", label: "Nepalese Rupee (NPR)" },
  { value: "NZD", label: "New Zealand Dollar (NZD)" },
  { value: "OMR", label: "Omani Rial (OMR)" },
  { value: "PAB", label: "Panamanian Balboa (PAB)" },
  { value: "PEN", label: "Peruvian Nuevo Sol (PEN)" },
  { value: "PGK", label: "Papua New Guinean Kina (PGK)" },
  { value: "PHP", label: "Philippine Peso (PHP)" },
  { value: "PKR", label: "Pakistani Rupee (PKR)" },
  { value: "PLN", label: "Polish Zloty (PLN)" },
  { value: "PYG", label: "Paraguayan Guarani (PYG)" },
  { value: "QAR", label: "Qatari Rial (QAR)" },
  { value: "RON", label: "Romanian Leu (RON)" },
  { value: "RSD", label: "Serbian Dinar (RSD)" },
  { value: "RUB", label: "Russian Ruble (RUB)" },
  { value: "RWF", label: "Rwandan Franc (RWF)" },
  { value: "SAR", label: "Saudi Riyal (SAR)" },
  { value: "SBD", label: "Solomon Islands Dollar (SBD)" },
  { value: "SCR", label: "Seychellois Rupee (SCR)" },
  { value: "SDG", label: "Sudanese Pound (SDG)" },
  { value: "SEK", label: "Swedish Krona (SEK)" },
  { value: "SLL", label: "Sierra Leonean Leone (SLL)" },
  { value: "SOS", label: "Somali Shilling (SOS)" },
  { value: "SRD", label: "Surinamese Dollar (SRD)" },
  { value: "SSP", label: "South Sudanese Pound (SSP)" },
  { value: "STN", label: "São Tomé and Príncipe Dobra (STN)" },
  { value: "SYP", label: "Syrian Pound (SYP)" },
  { value: "SZL", label: "Swazi Lilangeni (SZL)" },
  { value: "THB", label: "Thai Baht (THB)" },
  { value: "TJS", label: "Tajikistani Somoni (TJS)" },
  { value: "TMT", label: "Turkmenistani Manat (TMT)" },
  { value: "TND", label: "Tunisian Dinar (TND)" },
  { value: "TOP", label: "Tongan Pa'anga (TOP)" },
  { value: "TRY", label: "Turkish Lira (TRY)" },
  { value: "TWD", label: "New Taiwan Dollar (TWD)" },
  { value: "TZS", label: "Tanzanian Shilling (TZS)" },
  { value: "UAH", label: "Ukrainian Hryvnia (UAH)" },
  { value: "UGX", label: "Ugandan Shilling (UGX)" },
  { value: "UYU", label: "Uruguayan Peso (UYU)" },
  { value: "UZS", label: "Uzbekistan Som (UZS)" },
  { value: "VES", label: "Venezuelan Bolívar (VES)" },
  { value: "VND", label: "Vietnamese Dong (VND)" },
  { value: "VUV", label: "Vanuatu Vatu (VUV)" },
  { value: "WST", label: "Samoan Tala (WST)" },
  { value: "XAF", label: "CFA Franc BEAC (XAF)" },
  { value: "XOF", label: "CFA Franc BCEAO (XOF)" },
  { value: "XPF", label: "CFP Franc (XPF)" },
  { value: "YER", label: "Yemeni Rial (YER)" },
  { value: "ZAR", label: "South African Rand (ZAR)" },
  { value: "ZMW", label: "Zambian Kwacha (ZMW)" },
  { value: "ZWL", label: "Zimbabwean Dollar (ZWL)" },
];

// Country data
const commonCountries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "China",
  "India",
  "Brazil",
];

const caribbeanCountries = [
  "Antigua and Barbuda",
  "Bahamas",
  "Barbados",
  "Cuba",
  "Dominica",
  "Dominican Republic",
  "Grenada",
  "Haiti",
  "Jamaica",
  "Puerto Rico",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Trinidad and Tobago",
];

export default function SettingsPage() {
  // Mock data
  const profile = {
    id: "1",
    email: "user@example.com",
    full_name: "John Doe",
    avatar_url: null,
    preferred_currency: "USD",
    country: "United States",
    notifications_enabled: true,
  };

  const company = {
    id: "1",
    name: "Example Company",
    logo_url: null,
    primary_color: "#FF6B00",
    secondary_color: "#4A90E2",
    currency: "USD",
    country: "United States",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500">
          Manage your account and company settings
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-16 rounded-xl">
          <TabsTrigger
            value="profile"
            className="flex items-center gap-2 text-lg rounded-lg">
            <User className="h-5 w-5" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger
            value="company"
            className="flex items-center gap-2 text-lg rounded-lg">
            <Building className="h-5 w-5" />
            <span className="hidden sm:inline">Company</span>
          </TabsTrigger>
          <TabsTrigger
            value="branding"
            className="flex items-center gap-2 text-lg rounded-lg">
            <Palette className="h-5 w-5" />
            <span className="hidden sm:inline">Branding</span>
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="flex items-center gap-2 text-lg rounded-lg">
            <Shield className="h-5 w-5" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Update your personal information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={profile.email} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={profile.full_name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Preferred Currency</Label>
                <Select defaultValue={profile.preferred_currency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {popularCurrencies.map((currency) => (
                      <SelectItem key={currency.value} value={currency.value}>
                        {currency.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select defaultValue={profile.country}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {commonCountries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="notifications"
                  checked={profile.notifications_enabled}
                />
                <Label htmlFor="notifications">Enable notifications</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Company Settings</CardTitle>
              <CardDescription>Manage your company information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" value={company.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-currency">Company Currency</Label>
                <Select defaultValue={company.currency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {popularCurrencies.map((currency) => (
                      <SelectItem key={currency.value} value={currency.value}>
                        {currency.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-country">Company Country</Label>
                <Select defaultValue={company.country}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {commonCountries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="branding">
          <Card>
            <CardHeader>
              <CardTitle>Branding Settings</CardTitle>
              <CardDescription>
                Customize your company's appearance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="primary-color">Primary Color</Label>
                <Input
                  id="primary-color"
                  type="color"
                  value={company.primary_color}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondary-color">Secondary Color</Label>
                <Input
                  id="secondary-color"
                  type="color"
                  value={company.secondary_color}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Security settings will be implemented in a future update.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
