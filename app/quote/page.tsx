"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Ship,
  Package,
  MapPin,
  Plus,
  Minus,
  ArrowRight,
  CheckCircle,
  Menu,
  X,
  User,
  Clock,
  FileText,
} from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface CargoItem {
  id: number
  description: string
  hsCode: string
  quantity: number
  unit: string
  weight: number
  length: number
  width: number
  height: number
  value: number
  currency: string
}

export default function QuotePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Company Information
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    serviceType: "",
    shipmentType: "",

    // Cargo Information
    cargoItems: [
      {
        id: 1,
        description: "",
        hsCode: "",
        quantity: 1,
        unit: "pieces",
        weight: 0,
        length: 0,
        width: 0,
        height: 0,
        value: 0,
        currency: "USD",
      },
    ] as CargoItem[],

    // Shipping Route
    originCountry: "",
    originCity: "",
    originPort: "",
    destinationCountry: "",
    destinationCity: "",
    destinationPort: "",
    incoterms: "",

    // Services & Timing
    preferredDeparture: "",
    deliveryUrgency: "",
    additionalServices: [] as string[],
    specialRequirements: "",

    // Additional Information
    comments: "",
  })

  const totalSteps = 6

  const addCargoItem = () => {
    const newItem: CargoItem = {
      id: Date.now(),
      description: "",
      hsCode: "",
      quantity: 1,
      unit: "pieces",
      weight: 0,
      length: 0,
      width: 0,
      height: 0,
      value: 0,
      currency: "USD",
    }
    setFormData({
      ...formData,
      cargoItems: [...formData.cargoItems, newItem],
    })
  }

  const removeCargoItem = (id: number) => {
    if (formData.cargoItems.length > 1) {
      setFormData({
        ...formData,
        cargoItems: formData.cargoItems.filter((item) => item.id !== id),
      })
    }
  }

  const updateCargoItem = (id: number, field: string, value: any) => {
    setFormData({
      ...formData,
      cargoItems: formData.cargoItems.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    })
  }

  const handleServiceChange = (service: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        additionalServices: [...formData.additionalServices, service],
      })
    } else {
      setFormData({
        ...formData,
        additionalServices: formData.additionalServices.filter((s) => s !== service),
      })
    }
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      // Send the quote data to our API endpoint
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit quote request');
      }

      // Log the submission
      console.log("Form submitted:", formData);
      
      // Show success message
      alert("Quote request submitted successfully! We'll contact you within 24 hours. A confirmation email has been sent to your inbox.");
      
    } catch (error) {
      console.error("Error submitting quote:", error);
      alert("There was an error submitting your quote request. Please try again or contact us directly.");
    }
  }

  const countryPorts: { [key: string]: string[] } = {
    China: ["Shanghai Port", "Shenzhen Port", "Ningbo-Zhoushan Port", "Qingdao Port"],
    "United States": ["Port of Los Angeles", "Port of Long Beach", "Port of New York/New Jersey"],
    Singapore: ["Port of Singapore"],
    Germany: ["Port of Hamburg", "Port of Bremerhaven"],
    SriLanka: ["Colombo Port", "Hambantota Port"],
    // Add more countries and ports as needed
  };

  const originPortOptions = countryPorts[formData.originCountry] || [];
  const destinationPortOptions = countryPorts[formData.destinationCountry] || [];

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

      <main className="flex-1 bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-16">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">Request a Shipping Quote</h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Get competitive rates for your container shipping needs. Our NVOCC services provide reliable,
                cost-effective solutions for your import and export operations.
              </p>
            </div>
          </div>
        </section>

        {/* Progress Indicator */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between">
                {[1, 2, 3, 4, 5, 6].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                        step <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {step < currentStep ? <CheckCircle className="h-5 w-5" /> : step}
                    </div>
                    {step < 6 && (
                      <div className={`w-full h-1 mx-4 ${step < currentStep ? "bg-blue-600" : "bg-gray-200"}`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-sm text-gray-600">
                <span>Company Info</span>
                <span>Cargo Details</span>
                <span>Shipping Route</span>
                <span>Services</span>
                <span>Rates</span>
                <span>Review</span>
              </div>
            </div>
          </div>
        </section>

        {/* Form Content */}
        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {currentStep === 1 && <User className="h-5 w-5 mr-2 text-blue-600" />}
                    {currentStep === 2 && <Package className="h-5 w-5 mr-2 text-blue-600" />}
                    {currentStep === 3 && <MapPin className="h-5 w-5 mr-2 text-blue-600" />}
                    {currentStep === 4 && <Clock className="h-5 w-5 mr-2 text-blue-600" />}
                    {currentStep === 5 && <FileText className="h-5 w-5 mr-2 text-blue-600" />}
                    {currentStep === 6 && <FileText className="h-5 w-5 mr-2 text-blue-600" />}
                    Step {currentStep} of {totalSteps}: {currentStep === 1 && "Company Information"}
                    {currentStep === 2 && "Cargo Specifications"}
                    {currentStep === 3 && "Shipping Route"}
                    {currentStep === 4 && "Services & Timing"}
                    {currentStep === 5 && "Rates"}
                    {currentStep === 6 && "Review & Submit"}
                  </CardTitle>
                  <CardDescription>
                    {currentStep === 1 && "Please provide your company and contact information"}
                    {currentStep === 2 && "Describe your cargo items and specifications"}
                    {currentStep === 3 && "Specify origin and destination details"}
                    {currentStep === 4 && "Select additional services and timing preferences"}
                    {currentStep === 5 && "Review and confirm shipping rates"}
                    {currentStep === 6 && "Review your information and submit your quote request"}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Step 1: Company Information */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="companyName">Company Name *</Label>
                          <Input
                            id="companyName"
                            value={formData.companyName}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            placeholder="Your Company Name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contactName">Contact Name *</Label>
                          <Input
                            id="contactName"
                            value={formData.contactName}
                            onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                            placeholder="Your Full Name"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="your.email@company.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="serviceType">Service Type *</Label>
                          <Select
                            value={formData.serviceType}
                            onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select service type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fcl">FCL</SelectItem>
                              <SelectItem value="lcl">LCL</SelectItem>
                              <SelectItem value="air">Air</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="shipmentType">Shipment Direction *</Label>
                          <Select
                            value={formData.shipmentType}
                            onValueChange={(value) => setFormData({ ...formData, shipmentType: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select shipment type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="import">Import</SelectItem>
                              <SelectItem value="export">Export</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Cargo Specifications */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <Alert className="mb-4">
                        <AlertTitle>Note</AlertTitle>
                        <AlertDescription>
                          Please provide detailed and accurate cargo information. This helps us offer the most precise shipping quote and ensures smooth handling and customs clearance. If you have multiple cargo items, add each one separately.
                        </AlertDescription>
                      </Alert>
                      {formData.cargoItems.map((item, index) => (
                        <Card key={item.id} className="border-l-4 border-l-blue-600">
                          <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">Cargo Item {index + 1}</CardTitle>
                              {formData.cargoItems.length > 1 && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeCargoItem(item.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Cargo Description *</Label>
                                <Input
                                  value={item.description}
                                  onChange={(e) => updateCargoItem(item.id, "description", e.target.value)}
                                  placeholder="e.g., Electronics, Textiles, Machinery"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>HS Code</Label>
                                <Input
                                  value={item.hsCode}
                                  onChange={(e) => updateCargoItem(item.id, "hsCode", e.target.value)}
                                  placeholder="e.g., 8471.30.01"
                                />
                              </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label>Quantity *</Label>
                                <Input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) =>
                                    updateCargoItem(item.id, "quantity", Number.parseInt(e.target.value) || 0)
                                  }
                                  min="1"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Unit *</Label>
                                <Select
                                  value={item.unit}
                                  onValueChange={(value) => updateCargoItem(item.id, "unit", value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pieces">Pieces</SelectItem>
                                    <SelectItem value="pallets">Pallets</SelectItem>
                                    <SelectItem value="cartons">Cartons</SelectItem>
                                    <SelectItem value="packages">Packages</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label>Total Weight (kg) *</Label>
                                <Input
                                  type="number"
                                  value={item.weight}
                                  onChange={(e) =>
                                    updateCargoItem(item.id, "weight", Number.parseFloat(e.target.value) || 0)
                                  }
                                  min="0"
                                  step="0.1"
                                />
                              </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label>Length (cm)</Label>
                                <Input
                                  type="number"
                                  value={item.length}
                                  onChange={(e) =>
                                    updateCargoItem(item.id, "length", Number.parseFloat(e.target.value) || 0)
                                  }
                                  min="0"
                                  step="0.1"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Width (cm)</Label>
                                <Input
                                  type="number"
                                  value={item.width}
                                  onChange={(e) =>
                                    updateCargoItem(item.id, "width", Number.parseFloat(e.target.value) || 0)
                                  }
                                  min="0"
                                  step="0.1"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Height (cm)</Label>
                                <Input
                                  type="number"
                                  value={item.height}
                                  onChange={(e) =>
                                    updateCargoItem(item.id, "height", Number.parseFloat(e.target.value) || 0)
                                  }
                                  min="0"
                                  step="0.1"
                                />
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Cargo Value *</Label>
                                <Input
                                  type="number"
                                  value={item.value}
                                  onChange={(e) =>
                                    updateCargoItem(item.id, "value", Number.parseFloat(e.target.value) || 0)
                                  }
                                  min="0"
                                  step="0.01"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Currency *</Label>
                                <Select
                                  value={item.currency}
                                  onValueChange={(value) => updateCargoItem(item.id, "currency", value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="USD">USD</SelectItem>
                                    <SelectItem value="EUR">EUR</SelectItem>
                                    <SelectItem value="GBP">GBP</SelectItem>
                                    <SelectItem value="LKR">LKR</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      <Button
                        variant="outline"
                        onClick={addCargoItem}
                        className="w-full border-dashed border-2 border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Another Cargo Item
                      </Button>
                    </div>
                  )}

                  {/* Step 3: Shipping Route */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                          Origin Details
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Country *</Label>
                            <Input
                              value={formData.originCountry}
                              onChange={(e) => setFormData({ ...formData, originCountry: e.target.value })}
                              placeholder="e.g., China"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Port *</Label>
                            {originPortOptions.length > 0 ? (
                              <Select
                                value={formData.originPort}
                                onValueChange={(value) => setFormData({ ...formData, originPort: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select port" />
                                </SelectTrigger>
                                <SelectContent>
                                  {originPortOptions.map((port) => (
                                    <SelectItem key={port} value={port}>{port}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <Input
                                value={formData.originPort}
                                onChange={(e) => setFormData({ ...formData, originPort: e.target.value })}
                                placeholder="Enter port"
                              />
                            )}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>T/S Port (Optional)</Label>
                          <Input
                            value={formData.originTranshipmentPort || ""}
                            onChange={(e) => setFormData({ ...formData, originTranshipmentPort: e.target.value })}
                            placeholder="e.g., Singapore Port"
                          />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                          Destination Details
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Country *</Label>
                            <Input
                              value={formData.destinationCountry}
                              onChange={(e) => setFormData({ ...formData, destinationCountry: e.target.value })}
                              placeholder="e.g., United States"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Port *</Label>
                            {destinationPortOptions.length > 0 ? (
                              <Select
                                value={formData.destinationPort}
                                onValueChange={(value) => setFormData({ ...formData, destinationPort: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select port" />
                                </SelectTrigger>
                                <SelectContent>
                                  {destinationPortOptions.map((port) => (
                                    <SelectItem key={port} value={port}>{port}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <Input
                                value={formData.destinationPort}
                                onChange={(e) => setFormData({ ...formData, destinationPort: e.target.value })}
                                placeholder="Enter port"
                              />
                            )}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>T/S Port (Optional)</Label>
                          <Input
                            value={formData.destinationTranshipmentPort || ""}
                            onChange={(e) => setFormData({ ...formData, destinationTranshipmentPort: e.target.value })}
                            placeholder="e.g., Rotterdam Port"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Shipment Terms *</Label>
                        <Select
                          value={formData.incoterms}
                          onValueChange={(value) => setFormData({ ...formData, incoterms: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Shipment Terms" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CY/CY">CY/CY (Container Yard to Container Yard)</SelectItem>
                            <SelectItem value="CY/CFS">CY/CFS (Container Yard to Container Freight Station)</SelectItem>
                            <SelectItem value="CFS/CY">CFS/CY (Container Freight Station to Container Yard)</SelectItem>
                            <SelectItem value="CFS/CFS">CFS/CFS (Container Freight Station to Container Freight Station)</SelectItem>
                            <SelectItem value="Door/Door">Door/Door (Door to Door)</SelectItem>
                            <SelectItem value="Door/CY">Door/CY (Door to Container Yard)</SelectItem>
                            <SelectItem value="CY/Door">CY/Door (Container Yard to Door)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Services & Timing */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label>Preferred Departure Date</Label>
                          <Input
                            type="date"
                            value={formData.preferredDeparture}
                            onChange={(e) => setFormData({ ...formData, preferredDeparture: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Delivery Urgency</Label>
                          <Select
                            value={formData.deliveryUrgency}
                            onValueChange={(value) => setFormData({ ...formData, deliveryUrgency: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select urgency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="standard">Standard (Cost Optimized)</SelectItem>
                              <SelectItem value="urgent">Urgent (Time Optimized)</SelectItem>
                              <SelectItem value="flexible">Flexible (Best Rate)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label className="text-base font-semibold">Additional Services</Label>
                        <div className="grid md:grid-cols-2 gap-4 mt-3">
                          {[
                            "Cargo Insurance",
                            "Customs Clearance",
                            "Door-to-Door Delivery",
                            "Warehousing",
                            "Packaging Services",
                            "Documentation Support",
                          ].map((service) => (
                            <div key={service} className="flex items-center space-x-2">
                              <Checkbox
                                id={service}
                                checked={formData.additionalServices.includes(service)}
                                onCheckedChange={(checked) => handleServiceChange(service, checked as boolean)}
                              />
                              <Label htmlFor={service} className="text-sm">
                                {service}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Special Requirements</Label>
                        <Textarea
                          value={formData.specialRequirements}
                          onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                          placeholder="e.g., Hazardous materials, temperature control, fragile handling..."
                          rows={4}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Additional Comments</Label>
                        <Textarea
                          value={formData.comments}
                          onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                          placeholder="Any additional information or special requests..."
                          rows={3}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 5: Rates */}
                  {currentStep === 5 && (
                    <div className="space-y-6">
                      <Alert className="mb-4">
                        <AlertTitle>Rate Information</AlertTitle>
                        <AlertDescription>
                          Based on your cargo details and shipping requirements, we've calculated the following rates. Please review and confirm before proceeding.
                        </AlertDescription>
                      </Alert>

                      <div className="flex items-center space-x-2 mb-6">
                        <Checkbox
                          id="skipRates"
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setCurrentStep(6);
                            }
                          }}
                        />
                        <Label htmlFor="skipRates" className="text-sm">
                          Skip rates review and proceed to final submission
                        </Label>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <Card className="border-l-4 border-l-green-600">
                          <CardHeader>
                            <CardTitle className="text-lg text-green-700">Ocean Freight</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span>Base Rate:</span>
                                <span className="font-medium">$2,450.00</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Bunker Surcharge:</span>
                                <span className="font-medium">$180.00</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Terminal Handling:</span>
                                <span className="font-medium">$320.00</span>
                              </div>
                              <div className="border-t pt-2">
                                <div className="flex justify-between font-semibold">
                                  <span>Total Ocean Freight:</span>
                                  <span>$2,950.00</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border-l-4 border-l-blue-600">
                          <CardHeader>
                            <CardTitle className="text-lg text-blue-700">Additional Services</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {formData.additionalServices.length > 0 ? (
                                formData.additionalServices.map((service) => (
                                  <div key={service} className="flex justify-between">
                                    <span>{service}:</span>
                                    <span className="font-medium">$150.00</span>
                                  </div>
                                ))
                              ) : (
                                <span className="text-gray-500">No additional services selected</span>
                              )}
                              <div className="border-t pt-2">
                                <div className="flex justify-between font-semibold">
                                  <span>Services Total:</span>
                                  <span>${formData.additionalServices.length * 150}.00</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card className="border-l-4 border-l-purple-600">
                        <CardHeader>
                          <CardTitle className="text-lg text-purple-700">Total Quote Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span>Ocean Freight:</span>
                              <span>$2,950.00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Additional Services:</span>
                              <span>${formData.additionalServices.length * 150}.00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Documentation Fee:</span>
                              <span>$75.00</span>
                            </div>
                            <div className="border-t pt-2">
                              <div className="flex justify-between text-xl font-bold text-purple-700">
                                <span>Total Estimated Cost:</span>
                                <span>${2950 + (formData.additionalServices.length * 150) + 75}.00</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">Important Notes:</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Rates are valid for 30 days from quote date</li>
                          <li>• Final rates may vary based on actual cargo weight and volume</li>
                          <li>• Additional charges may apply for special handling requirements</li>
                          <li>• Insurance is recommended for high-value shipments</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Step 6: Review & Submit */}
                  {currentStep === 6 && (
                    <div className="space-y-6">
                      <div className="bg-blue-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4 text-blue-900">Quote Request Summary</h3>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Company Information</h4>
                            <div className="space-y-1 text-sm text-gray-600">
                              <p>
                                <span className="font-medium">Company:</span> {formData.companyName || "Not specified"}
                              </p>
                              <p>
                                <span className="font-medium">Contact:</span> {formData.contactName || "Not specified"}
                              </p>
                              <p>
                                <span className="font-medium">Email:</span> {formData.email || "Not specified"}
                              </p>
                              <p>
                                <span className="font-medium">Phone:</span> {formData.phone || "Not specified"}
                              </p>
                              <p>
                                <span className="font-medium">Service:</span> {formData.serviceType || "Not specified"}
                              </p>
                              <p>
                                <span className="font-medium">Type:</span> {formData.shipmentType || "Not specified"}
                              </p>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Shipping Route</h4>
                            <div className="space-y-1 text-sm text-gray-600">
                              <p>
                                <span className="font-medium">From:</span> {formData.originCity},{" "}
                                {formData.originCountry}
                              </p>
                              <p>
                                <span className="font-medium">To:</span> {formData.destinationCity},{" "}
                                {formData.destinationCountry}
                              </p>
                              <p>
                                <span className="font-medium">Incoterms:</span> {formData.incoterms || "Not specified"}
                              </p>
                              <p>
                                <span className="font-medium">Departure:</span>{" "}
                                {formData.preferredDeparture || "Flexible"}
                              </p>
                              <p>
                                <span className="font-medium">Urgency:</span>{" "}
                                {formData.deliveryUrgency || "Not specified"}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6">
                          <h4 className="font-medium text-gray-900 mb-2">Cargo Items ({formData.cargoItems.length})</h4>
                          <div className="space-y-2">
                            {formData.cargoItems.map((item, index) => (
                              <div key={item.id} className="bg-white p-3 rounded border text-sm">
                                <div className="grid md:grid-cols-4 gap-2">
                                  <div>
                                    <span className="font-medium">Item {index + 1}:</span>{" "}
                                    {item.description || "Not specified"}
                                  </div>
                                  <div>
                                    <span className="font-medium">Qty:</span> {item.quantity} {item.unit}
                                  </div>
                                  <div>
                                    <span className="font-medium">Weight:</span> {item.weight} kg
                                  </div>
                                  <div>
                                    <span className="font-medium">Value:</span> {item.value} {item.currency}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {formData.additionalServices.length > 0 && (
                          <div className="mt-6">
                            <h4 className="font-medium text-gray-900 mb-2">Additional Services</h4>
                            <div className="flex flex-wrap gap-2">
                              {formData.additionalServices.map((service) => (
                                <Badge key={service} variant="secondary">
                                  {service}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-yellow-800">What happens next?</h4>
                            <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                              <li>• Our logistics experts will review your requirements</li>
                              <li>• You'll receive a detailed quote within 24 hours</li>
                              <li>• We'll include multiple shipping options and pricing</li>
                              <li>• Our team will contact you to discuss any questions</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-6 border-t">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="flex items-center bg-transparent"
                    >
                      Previous
                    </Button>

                    {currentStep < totalSteps ? (
                      <Button onClick={nextStep} className="flex items-center bg-blue-600 hover:bg-blue-700">
                        Next Step
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button onClick={handleSubmit} className="flex items-center bg-green-600 hover:bg-green-700">
                        Submit Quote Request
                        <CheckCircle className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
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
                  <Link href="/quote" className="hover:text-white">
                    Get Quote
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Support
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
