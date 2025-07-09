"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Ship,
  Package,
  FileText,
  Shield,
  Thermometer,
  AlertTriangle,
  CheckCircle,
  Download,
  Calculator,
  Scale,
  Ruler,
  Clock,
  Globe,
  Truck,
  Menu,
  X,
  Info,
  BookOpen,
  Container,
  Zap,
  Droplets,
  Wind,
} from "lucide-react"
import Link from "next/link"

// Container specifications data
const containerSpecs = [
  {
    type: "20GP",
    name: "20' General Purpose",
    internal: { length: "5.90m", width: "2.35m", height: "2.39m" },
    external: { length: "6.06m", width: "2.44m", height: "2.59m" },
    volume: "33.2 CBM",
    maxWeight: "28,230 kg",
    tareWeight: "2,230 kg",
    payload: "26,000 kg",
    uses: ["General cargo", "Dry goods", "Machinery", "Consumer goods"],
    features: ["Most common container", "Cost-effective", "Wide availability"],
  },
  {
    type: "40GP",
    name: "40' General Purpose",
    internal: { length: "12.03m", width: "2.35m", height: "2.39m" },
    external: { length: "12.19m", width: "2.44m", height: "2.59m" },
    volume: "67.7 CBM",
    maxWeight: "30,480 kg",
    tareWeight: "3,740 kg",
    payload: "26,740 kg",
    uses: ["Large cargo", "Bulk goods", "Furniture", "Electronics"],
    features: ["Double the space of 20GP", "Better rate per CBM", "Ideal for voluminous cargo"],
  },
  {
    type: "40HC",
    name: "40' High Cube",
    internal: { length: "12.03m", width: "2.35m", height: "2.70m" },
    external: { length: "12.19m", width: "2.44m", height: "2.90m" },
    volume: "76.4 CBM",
    maxWeight: "30,480 kg",
    tareWeight: "3,900 kg",
    payload: "26,580 kg",
    uses: ["Light but voluminous cargo", "Textiles", "Furniture", "Sports equipment"],
    features: ["Extra height", "Maximum volume", "Popular choice"],
  },
  {
    type: "45HC",
    name: "45' High Cube",
    internal: { length: "13.55m", width: "2.35m", height: "2.70m" },
    external: { length: "13.72m", width: "2.44m", height: "2.90m" },
    volume: "86.0 CBM",
    maxWeight: "30,480 kg",
    tareWeight: "4,800 kg",
    payload: "25,680 kg",
    uses: ["Maximum volume cargo", "Lightweight goods", "Oversize items"],
    features: ["Largest standard container", "Maximum space efficiency", "Limited availability"],
  },
  {
    type: "20RF",
    name: "20' Reefer",
    internal: { length: "5.44m", width: "2.29m", height: "2.25m" },
    external: { length: "6.06m", width: "2.44m", height: "2.59m" },
    volume: "28.1 CBM",
    maxWeight: "27,700 kg",
    tareWeight: "3,080 kg",
    payload: "24,620 kg",
    temperature: "-25°C to +25°C",
    uses: ["Frozen foods", "Fresh produce", "Pharmaceuticals", "Chemicals"],
    features: ["Temperature controlled", "Humidity control", "Ventilation options"],
  },
  {
    type: "40RF",
    name: "40' Reefer",
    internal: { length: "11.58m", width: "2.29m", height: "2.25m" },
    external: { length: "12.19m", width: "2.44m", height: "2.59m" },
    volume: "59.8 CBM",
    maxWeight: "32,500 kg",
    tareWeight: "4,800 kg",
    payload: "27,700 kg",
    temperature: "-25°C to +25°C",
    uses: ["Large temperature-sensitive cargo", "Bulk frozen goods", "Fresh produce"],
    features: ["Large refrigerated space", "Advanced controls", "Monitoring systems"],
  },
]

// Dangerous goods classes
const dangerousGoods = [
  {
    class: "1",
    name: "Explosives",
    description: "Substances and articles which have a mass explosion hazard",
    examples: ["Fireworks", "Ammunition", "Flares"],
    icon: <Zap className="h-5 w-5" />,
    color: "text-red-600",
  },
  {
    class: "2",
    name: "Gases",
    description: "Compressed, liquefied or dissolved under pressure gases",
    examples: ["Oxygen", "Propane", "Acetylene"],
    icon: <Wind className="h-5 w-5" />,
    color: "text-blue-600",
  },
  {
    class: "3",
    name: "Flammable Liquids",
    description: "Liquids having a flash point of not more than 60°C",
    examples: ["Gasoline", "Paint", "Alcohol"],
    icon: <Droplets className="h-5 w-5" />,
    color: "text-orange-600",
  },
  {
    class: "4",
    name: "Flammable Solids",
    description: "Solids which are readily combustible",
    examples: ["Matches", "Sulfur", "Carbon"],
    icon: <AlertTriangle className="h-5 w-5" />,
    color: "text-yellow-600",
  },
  {
    class: "5",
    name: "Oxidizing Substances",
    description: "Substances which may cause or contribute to combustion",
    examples: ["Hydrogen peroxide", "Nitrates", "Chlorates"],
    icon: <Shield className="h-5 w-5" />,
    color: "text-purple-600",
  },
  {
    class: "6",
    name: "Toxic Substances",
    description: "Substances liable to cause death or serious injury",
    examples: ["Pesticides", "Medical waste", "Infectious substances"],
    icon: <Package className="h-5 w-5" />,
    color: "text-green-600",
  },
  {
    class: "7",
    name: "Radioactive Material",
    description: "Any material containing radionuclides",
    examples: ["Medical isotopes", "Industrial sources", "Nuclear materials"],
    icon: <AlertTriangle className="h-5 w-5" />,
    color: "text-indigo-600",
  },
  {
    class: "8",
    name: "Corrosives",
    description: "Substances which may cause severe damage when in contact",
    examples: ["Battery acid", "Cleaning agents", "Mercury"],
    icon: <Droplets className="h-5 w-5" />,
    color: "text-gray-600",
  },
  {
    class: "9",
    name: "Miscellaneous",
    description: "Substances presenting a danger not covered by other classes",
    examples: ["Dry ice", "Lithium batteries", "Magnetized materials"],
    icon: <Package className="h-5 w-5" />,
    color: "text-pink-600",
  },
]

export default function CargoDetailsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedContainer, setSelectedContainer] = useState(containerSpecs[0])
  const [cargoLength, setCargoLength] = useState("")
  const [cargoWidth, setCargoWidth] = useState("")
  const [cargoHeight, setCargoHeight] = useState("")
  const [cargoWeight, setCargoWeight] = useState("")

  const calculateFit = () => {
    if (!cargoLength || !cargoWidth || !cargoHeight || !cargoWeight) return null

    const length = Number.parseFloat(cargoLength)
    const width = Number.parseFloat(cargoWidth)
    const height = Number.parseFloat(cargoHeight)
    const weight = Number.parseFloat(cargoWeight)

    const containerLength = Number.parseFloat(selectedContainer.internal.length)
    const containerWidth = Number.parseFloat(selectedContainer.internal.width)
    const containerHeight = Number.parseFloat(selectedContainer.internal.height)
    const maxWeight = Number.parseFloat(selectedContainer.payload.replace(/[^\d.]/g, ""))

    const lengthFits = length <= containerLength
    const widthFits = width <= containerWidth
    const heightFits = height <= containerHeight
    const weightFits = weight <= maxWeight

    const dimensionsFit = lengthFits && widthFits && heightFits
    const fits = dimensionsFit && weightFits

    return {
      fits,
      lengthFits,
      widthFits,
      heightFits,
      weightFits,
      dimensionsFit,
    }
  }

  const fitResult = calculateFit()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Ship className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">GlobalShip Logistics</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/services" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Services
            </Link>
            <Link href="/schedule" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Schedule
            </Link>
            <Link href="/tracking" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Tracking
            </Link>
            <Link href="/cargo-details" className="text-sm font-medium text-blue-600">
              Cargo Guide
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Contact
            </Link>
            <Link href="/quote">
              <Button className="bg-blue-600 hover:bg-blue-700">Get Quote</Button>
            </Link>
          </nav>

          {/* Mobile Navigation Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6 text-gray-600" /> : <Menu className="h-6 w-6 text-gray-600" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <nav className="container mx-auto px-4 py-4 space-y-4">
              <Link
                href="/"
                className="block text-base font-medium text-gray-700 hover:text-blue-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/services"
                className="block text-base font-medium text-gray-700 hover:text-blue-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/schedule"
                className="block text-base font-medium text-gray-700 hover:text-blue-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Schedule
              </Link>
              <Link
                href="/tracking"
                className="block text-base font-medium text-gray-700 hover:text-blue-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tracking
              </Link>
              <Link
                href="/cargo-details"
                className="block text-base font-medium text-blue-600 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cargo Guide
              </Link>
              <Link
                href="/contact"
                className="block text-base font-medium text-gray-700 hover:text-blue-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4 border-t">
                <Link href="/quote">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Get Quote</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center space-x-2 mb-6">
                <Container className="h-8 w-8 text-blue-200" />
                <Badge className="bg-blue-500/20 text-blue-100 border-blue-400/30">Complete Cargo Guide</Badge>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">Cargo Details & Specifications</h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Comprehensive guide to container specifications, cargo requirements, documentation, and shipping
                regulations for international trade.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-6">
            <Tabs defaultValue="containers" className="space-y-8">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
                <TabsTrigger value="containers">Containers</TabsTrigger>
                <TabsTrigger value="calculator">Size Calculator</TabsTrigger>
                <TabsTrigger value="dangerous">Dangerous Goods</TabsTrigger>
                <TabsTrigger value="documentation">Documentation</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>

              {/* Container Specifications */}
              <TabsContent value="containers">
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Container Specifications</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                      Detailed specifications for all standard container types used in international shipping
                    </p>
                  </div>

                  <div className="grid gap-8">
                    {containerSpecs.map((container) => (
                      <Card key={container.type} className="border-l-4 border-l-blue-600">
                        <CardHeader>
                          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <div>
                              <CardTitle className="text-2xl flex items-center space-x-3">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <Container className="h-6 w-6 text-blue-600" />
                                </div>
                                <span>{container.name}</span>
                              </CardTitle>
                              <CardDescription className="text-lg mt-2">
                                Type: {container.type} • Volume: {container.volume} • Max Weight: {container.maxWeight}
                              </CardDescription>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {container.features.map((feature) => (
                                <Badge key={feature} className="bg-green-100 text-green-800 border-green-200">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid lg:grid-cols-4 gap-6">
                            {/* Internal Dimensions */}
                            <div className="space-y-3">
                              <h4 className="font-semibold text-gray-900 flex items-center">
                                <Ruler className="h-4 w-4 mr-2 text-blue-600" />
                                Internal Dimensions
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Length:</span>
                                  <span className="font-medium">{container.internal.length}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Width:</span>
                                  <span className="font-medium">{container.internal.width}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Height:</span>
                                  <span className="font-medium">{container.internal.height}</span>
                                </div>
                              </div>
                            </div>

                            {/* External Dimensions */}
                            <div className="space-y-3">
                              <h4 className="font-semibold text-gray-900 flex items-center">
                                <Package className="h-4 w-4 mr-2 text-green-600" />
                                External Dimensions
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Length:</span>
                                  <span className="font-medium">{container.external.length}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Width:</span>
                                  <span className="font-medium">{container.external.width}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Height:</span>
                                  <span className="font-medium">{container.external.height}</span>
                                </div>
                              </div>
                            </div>

                            {/* Weight Information */}
                            <div className="space-y-3">
                              <h4 className="font-semibold text-gray-900 flex items-center">
                                <Scale className="h-4 w-4 mr-2 text-purple-600" />
                                Weight Specifications
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Max Weight:</span>
                                  <span className="font-medium">{container.maxWeight}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Tare Weight:</span>
                                  <span className="font-medium">{container.tareWeight}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Payload:</span>
                                  <span className="font-medium text-green-600">{container.payload}</span>
                                </div>
                              </div>
                              {container.temperature && (
                                <div className="mt-3 p-2 bg-blue-50 rounded">
                                  <div className="flex items-center text-sm">
                                    <Thermometer className="h-4 w-4 mr-2 text-blue-600" />
                                    <span className="font-medium">Temperature: {container.temperature}</span>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Typical Uses */}
                            <div className="space-y-3">
                              <h4 className="font-semibold text-gray-900 flex items-center">
                                <Globe className="h-4 w-4 mr-2 text-orange-600" />
                                Typical Uses
                              </h4>
                              <div className="space-y-1">
                                {container.uses.map((use) => (
                                  <div key={use} className="flex items-center text-sm">
                                    <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                                    <span>{use}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Container Size Calculator */}
              <TabsContent value="calculator">
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Container Size Calculator</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                      Check if your cargo fits in different container types
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Calculator Input */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Calculator className="h-5 w-5 mr-2 text-blue-600" />
                          Cargo Dimensions
                        </CardTitle>
                        <CardDescription>Enter your cargo specifications to check container fit</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <Label>Select Container Type</Label>
                          <select
                            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                            value={selectedContainer.type}
                            onChange={(e) =>
                              setSelectedContainer(
                                containerSpecs.find((c) => c.type === e.target.value) || containerSpecs[0],
                              )
                            }
                          >
                            {containerSpecs.map((container) => (
                              <option key={container.type} value={container.type}>
                                {container.name} ({container.type})
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label>Length (m)</Label>
                            <Input
                              type="number"
                              step="0.01"
                              value={cargoLength}
                              onChange={(e) => setCargoLength(e.target.value)}
                              placeholder="0.00"
                            />
                          </div>
                          <div>
                            <Label>Width (m)</Label>
                            <Input
                              type="number"
                              step="0.01"
                              value={cargoWidth}
                              onChange={(e) => setCargoWidth(e.target.value)}
                              placeholder="0.00"
                            />
                          </div>
                          <div>
                            <Label>Height (m)</Label>
                            <Input
                              type="number"
                              step="0.01"
                              value={cargoHeight}
                              onChange={(e) => setCargoHeight(e.target.value)}
                              placeholder="0.00"
                            />
                          </div>
                        </div>

                        <div>
                          <Label>Weight (kg)</Label>
                          <Input
                            type="number"
                            value={cargoWeight}
                            onChange={(e) => setCargoWeight(e.target.value)}
                            placeholder="0"
                          />
                        </div>

                        {/* Container Limits Display */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-3">Container Limits ({selectedContainer.type})</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Max Length:</span>
                              <span className="ml-2 font-medium">{selectedContainer.internal.length}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Max Width:</span>
                              <span className="ml-2 font-medium">{selectedContainer.internal.width}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Max Height:</span>
                              <span className="ml-2 font-medium">{selectedContainer.internal.height}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Max Weight:</span>
                              <span className="ml-2 font-medium">{selectedContainer.payload}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Results */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                          Fit Analysis
                        </CardTitle>
                        <CardDescription>Results of your cargo fit analysis</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {fitResult ? (
                          <div className="space-y-4">
                            <div
                              className={`p-4 rounded-lg border-2 ${
                                fitResult.fits ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                              }`}
                            >
                              <div className="flex items-center space-x-2">
                                {fitResult.fits ? (
                                  <CheckCircle className="h-6 w-6 text-green-600" />
                                ) : (
                                  <AlertTriangle className="h-6 w-6 text-red-600" />
                                )}
                                <span
                                  className={`text-lg font-semibold ${
                                    fitResult.fits ? "text-green-800" : "text-red-800"
                                  }`}
                                >
                                  {fitResult.fits ? "✓ Cargo Fits!" : "✗ Cargo Does Not Fit"}
                                </span>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span>Length Check:</span>
                                {fitResult.lengthFits ? (
                                  <Badge className="bg-green-100 text-green-800 border-green-200">✓ OK</Badge>
                                ) : (
                                  <Badge className="bg-red-100 text-red-800 border-red-200">✗ Too Long</Badge>
                                )}
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Width Check:</span>
                                {fitResult.widthFits ? (
                                  <Badge className="bg-green-100 text-green-800 border-green-200">✓ OK</Badge>
                                ) : (
                                  <Badge className="bg-red-100 text-red-800 border-red-200">✗ Too Wide</Badge>
                                )}
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Height Check:</span>
                                {fitResult.heightFits ? (
                                  <Badge className="bg-green-100 text-green-800 border-green-200">✓ OK</Badge>
                                ) : (
                                  <Badge className="bg-red-100 text-red-800 border-red-200">✗ Too Tall</Badge>
                                )}
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Weight Check:</span>
                                {fitResult.weightFits ? (
                                  <Badge className="bg-green-100 text-green-800 border-green-200">✓ OK</Badge>
                                ) : (
                                  <Badge className="bg-red-100 text-red-800 border-red-200">✗ Too Heavy</Badge>
                                )}
                              </div>
                            </div>

                            {!fitResult.fits && (
                              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                <h4 className="font-medium text-blue-800 mb-2">Recommendations:</h4>
                                <ul className="text-sm text-blue-700 space-y-1">
                                  {!fitResult.dimensionsFit && (
                                    <li>• Consider a larger container type or split the cargo</li>
                                  )}
                                  {!fitResult.weightFits && <li>• Reduce cargo weight or use multiple containers</li>}
                                  <li>• Contact us for custom packaging solutions</li>
                                </ul>
                              </div>
                            )}

                            <div className="pt-4 border-t">
                              <Link href="/quote">
                                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                  Get Quote for This Cargo
                                </Button>
                              </Link>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <Calculator className="h-12 w-12 mx-auto mb-4" />
                            <p>Enter cargo dimensions and weight to see fit analysis</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Dangerous Goods */}
              <TabsContent value="dangerous">
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Dangerous Goods Classifications</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                      International Maritime Dangerous Goods (IMDG) Code classifications and requirements
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dangerousGoods.map((dg) => (
                      <Card key={dg.class} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 ${dg.color}`}
                            >
                              {dg.icon}
                            </div>
                            <div>
                              <CardTitle className="text-lg">Class {dg.class}</CardTitle>
                              <CardDescription className="font-medium">{dg.name}</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 mb-4">{dg.description}</p>
                          <div>
                            <h4 className="font-semibold text-sm mb-2">Common Examples:</h4>
                            <div className="flex flex-wrap gap-1">
                              {dg.examples.map((example) => (
                                <Badge key={example} variant="outline" className="text-xs">
                                  {example}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Card className="bg-yellow-50 border-yellow-200">
                    <CardHeader>
                      <CardTitle className="flex items-center text-yellow-800">
                        <AlertTriangle className="h-5 w-5 mr-2" />
                        Important Notice
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-yellow-700">
                      <ul className="space-y-2 text-sm">
                        <li>• All dangerous goods must be properly declared and documented</li>
                        <li>• Special packaging, labeling, and segregation requirements apply</li>
                        <li>• Additional permits and certifications may be required</li>
                        <li>• Some dangerous goods are prohibited on certain routes</li>
                        <li>• Contact our dangerous goods specialists for expert assistance</li>
                      </ul>
                      <div className="mt-4">
                        <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                          Contact DG Specialist
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Documentation */}
              <TabsContent value="documentation">
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Required Documentation</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                      Essential documents for international container shipping
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Export Documentation */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl flex items-center">
                          <FileText className="h-5 w-5 mr-2 text-green-600" />
                          Export Documentation
                        </CardTitle>
                        <CardDescription>Required documents for shipping goods out of the country</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                              <h4 className="font-medium">Commercial Invoice</h4>
                              <p className="text-sm text-gray-600">
                                Detailed invoice showing cargo value, description, and terms
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                              <h4 className="font-medium">Packing List</h4>
                              <p className="text-sm text-gray-600">
                                Detailed list of package contents, weights, and dimensions
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                              <h4 className="font-medium">Bill of Lading (B/L)</h4>
                              <p className="text-sm text-gray-600">Contract of carriage and receipt for goods</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                              <h4 className="font-medium">Export License (if required)</h4>
                              <p className="text-sm text-gray-600">Government authorization for controlled goods</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                              <h4 className="font-medium">Certificate of Origin</h4>
                              <p className="text-sm text-gray-600">Document certifying country of manufacture</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Import Documentation */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl flex items-center">
                          <FileText className="h-5 w-5 mr-2 text-blue-600" />
                          Import Documentation
                        </CardTitle>
                        <CardDescription>Required documents for receiving goods into the country</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                              <h4 className="font-medium">Import Declaration</h4>
                              <p className="text-sm text-gray-600">Customs declaration for imported goods</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                              <h4 className="font-medium">ISF Filing (US)</h4>
                              <p className="text-sm text-gray-600">Importer Security Filing for US-bound cargo</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                              <h4 className="font-medium">Import License (if required)</h4>
                              <p className="text-sm text-gray-600">Government authorization for restricted goods</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                              <h4 className="font-medium">Insurance Certificate</h4>
                              <p className="text-sm text-gray-600">Proof of cargo insurance coverage</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                              <h4 className="font-medium">Delivery Order</h4>
                              <p className="text-sm text-gray-600">Authorization to release cargo from port</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Document Templates */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Download className="h-5 w-5 mr-2 text-purple-600" />
                        Document Templates & Guides
                      </CardTitle>
                      <CardDescription>Download templates and guides for shipping documentation</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4">
                        <Button variant="outline" size="sm" className="flex items-center bg-transparent">
                          <Download className="h-4 w-4 mr-2" />
                          Commercial Invoice Template
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center bg-transparent">
                          <Download className="h-4 w-4 mr-2" />
                          Packing List Template
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center bg-transparent">
                          <Download className="h-4 w-4 mr-2" />
                          Documentation Checklist
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center bg-transparent">
                          <Download className="h-4 w-4 mr-2" />
                          HS Code Guide
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center bg-transparent">
                          <Download className="h-4 w-4 mr-2" />
                          Incoterms Guide 2020
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center bg-transparent">
                          <Download className="h-4 w-4 mr-2" />
                          Import/Export Procedures
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Requirements */}
              <TabsContent value="requirements">
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Shipping Requirements</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                      General requirements and guidelines for container shipping
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Packaging Requirements */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Package className="h-5 w-5 mr-2 text-orange-600" />
                          Packaging Requirements
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                            <div>
                              <h4 className="font-medium">Proper Packaging</h4>
                              <p className="text-sm text-gray-600">
                                Use appropriate packaging materials to protect cargo during transport
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                            <div>
                              <h4 className="font-medium">Weight Distribution</h4>
                              <p className="text-sm text-gray-600">
                                Distribute weight evenly to prevent damage and ensure stability
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                            <div>
                              <h4 className="font-medium">Securing Cargo</h4>
                              <p className="text-sm text-gray-600">
                                Properly secure cargo to prevent movement during transport
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                            <div>
                              <h4 className="font-medium">Weather Protection</h4>
                              <p className="text-sm text-gray-600">
                                Protect cargo from moisture, temperature changes, and other weather conditions
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* VGM Requirements */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Scale className="h-5 w-5 mr-2 text-purple-600" />
                          VGM (Verified Gross Mass)
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                            <div>
                              <h4 className="font-medium">Mandatory Requirement</h4>
                              <p className="text-sm text-gray-600">
                                VGM is required for all containers as per SOLAS regulations
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <Clock className="h-5 w-5 text-orange-500 mt-0.5" />
                            <div>
                              <h4 className="font-medium">Submission Deadline</h4>
                              <p className="text-sm text-gray-600">VGM must be submitted before the VGM cutoff time</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                              <h4 className="font-medium">Weighing Methods</h4>
                              <p className="text-sm text-gray-600">
                                Method 1: Weigh packed container; Method 2: Calculate from individual weights
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
                            <div>
                              <h4 className="font-medium">Authorized Personnel</h4>
                              <p className="text-sm text-gray-600">
                                Only authorized personnel can provide VGM declarations
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Customs Requirements */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Shield className="h-5 w-5 mr-2 text-green-600" />
                          Customs Requirements
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <FileText className="h-5 w-5 text-blue-500 mt-0.5" />
                            <div>
                              <h4 className="font-medium">Accurate Declaration</h4>
                              <p className="text-sm text-gray-600">
                                Provide accurate cargo description, value, and classification
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <Globe className="h-5 w-5 text-purple-500 mt-0.5" />
                            <div>
                              <h4 className="font-medium">HS Code Classification</h4>
                              <p className="text-sm text-gray-600">
                                Correctly classify goods using Harmonized System codes
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                              <h4 className="font-medium">Duty Payment</h4>
                              <p className="text-sm text-gray-600">Pay applicable duties, taxes, and fees promptly</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <Clock className="h-5 w-5 text-orange-500 mt-0.5" />
                            <div>
                              <h4 className="font-medium">Compliance Deadlines</h4>
                              <p className="text-sm text-gray-600">
                                Meet all customs filing deadlines and requirements
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Security Requirements */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Shield className="h-5 w-5 mr-2 text-red-600" />
                          Security Requirements
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                            <div>
                              <h4 className="font-medium">Container Sealing</h4>
                              <p className="text-sm text-gray-600">
                                Containers must be properly sealed with high-security seals
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <FileText className="h-5 w-5 text-blue-500 mt-0.5" />
                            <div>
                              <h4 className="font-medium">Security Declarations</h4>
                              <p className="text-sm text-gray-600">
                                Complete all required security filings and declarations
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <Truck className="h-5 w-5 text-purple-500 mt-0.5" />
                            <div>
                              <h4 className="font-medium">Supply Chain Security</h4>
                              <p className="text-sm text-gray-600">Maintain security throughout the supply chain</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                              <h4 className="font-medium">Known Shipper Status</h4>
                              <p className="text-sm text-gray-600">
                                Work with authorized and verified business partners
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Resources */}
              <TabsContent value="resources">
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Shipping Resources</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                      Helpful resources, tools, and guides for international shipping
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Resource Cards */}
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <BookOpen className="h-8 w-8 text-blue-600 mb-2" />
                        <CardTitle>Shipping Glossary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">Comprehensive glossary of shipping and logistics terms</p>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          View Glossary
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <Calculator className="h-8 w-8 text-green-600 mb-2" />
                        <CardTitle>CBM Calculator</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">Calculate cubic meters for your cargo shipments</p>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          Calculate CBM
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <Globe className="h-8 w-8 text-purple-600 mb-2" />
                        <CardTitle>Port Directory</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">Directory of major ports and terminals worldwide</p>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          Browse Ports
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <FileText className="h-8 w-8 text-orange-600 mb-2" />
                        <CardTitle>Incoterms Guide</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">Complete guide to Incoterms 2020 rules and applications</p>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          Download Guide
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <Scale className="h-8 w-8 text-red-600 mb-2" />
                        <CardTitle>Weight Converter</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">Convert between different weight and measurement units</p>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          Convert Units
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <Shield className="h-8 w-8 text-indigo-600 mb-2" />
                        <CardTitle>Customs Guide</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">Country-specific customs procedures and requirements</p>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          View Guide
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Contact Support */}
                  <Card className="bg-blue-50 border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-900">Need Expert Assistance?</CardTitle>
                      <CardDescription className="text-blue-700">
                        Our logistics experts are here to help with your cargo questions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/contact">
                          <Button className="bg-blue-600 hover:bg-blue-700">Contact Cargo Specialist</Button>
                        </Link>
                        <Link href="/quote">
                          <Button
                            variant="outline"
                            className="bg-transparent border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                          >
                            Get Shipping Quote
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <Ship className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">GlobalShip Logistics</span>
              </Link>
              <p className="text-gray-400 mb-4">
                Your trusted partner for global container shipping and logistics solutions.
              </p>
              <div className="text-sm text-gray-400">
                <p>FMC License: 123456</p>
                <p>SCAC Code: GSLO</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/services" className="hover:text-white">
                    NVOCC Services
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-white">
                    Import Operations
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-white">
                    Export Operations
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-white">
                    Freight Forwarding
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Tools</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/schedule" className="hover:text-white">
                    Vessel Schedule
                  </Link>
                </li>
                <li>
                  <Link href="/tracking" className="hover:text-white">
                    Track Shipment
                  </Link>
                </li>
                <li>
                  <Link href="/cargo-details" className="hover:text-white">
                    Cargo Guide
                  </Link>
                </li>
                <li>
                  <Link href="/quote" className="hover:text-white">
                    Get Quote
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    News
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 GlobalShip Logistics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
