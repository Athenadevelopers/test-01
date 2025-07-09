"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Ship,
  Globe,
  Truck,
  Package,
  ArrowRight,
  CheckCircle,
  Shield,
  Clock,
  Users,
  FileText,
  BarChart3,
  Anchor,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
            <Link href="/services" className="text-sm font-medium text-blue-600">
              Services
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
                className="block text-base font-medium text-blue-600 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
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

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="bg-blue-500/20 text-blue-100 border-blue-400/30 mb-6">
                Comprehensive Logistics Solutions
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">Professional Container Shipping & NVOCC Services</h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                From container consolidation to door-to-door delivery, we provide end-to-end logistics solutions
                tailored to your business needs with full regulatory compliance and industry expertise.
              </p>
            </div>
          </div>
        </section>

        {/* Main Services Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* NVOCC Services */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-600">
                <CardHeader className="pb-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Ship className="h-8 w-8 text-blue-600 group-hover:text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">NVOCC Services</CardTitle>
                      <Badge variant="secondary">Licensed & Bonded</Badge>
                    </div>
                  </div>
                  <CardDescription className="text-base">
                    As a licensed Non-Vessel Operating Common Carrier, we provide comprehensive container shipping
                    services with competitive rates and reliable scheduling across major trade lanes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Container consolidation</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Bill of lading issuance</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Rate negotiations</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Vessel space booking</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Documentation handling</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Cargo tracking</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">Learn More About NVOCC</Button>
                </CardContent>
              </Card>

              {/* Import Operations */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-600">
                <CardHeader className="pb-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors">
                      <Globe className="h-8 w-8 text-green-600 group-hover:text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Import Operations</CardTitle>
                      <Badge variant="secondary">Full Service</Badge>
                    </div>
                  </div>
                  <CardDescription className="text-base">
                    Seamless import services with customs clearance, documentation, and delivery coordination to ensure
                    your cargo arrives on time and compliant.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Customs clearance</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">ISF filing</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Port handling</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Duty optimization</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Delivery coordination</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Compliance management</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">Get Import Quote</Button>
                </CardContent>
              </Card>

              {/* Export Operations */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-orange-600">
                <CardHeader className="pb-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-colors">
                      <Package className="h-8 w-8 text-orange-600 group-hover:text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Export Operations</CardTitle>
                      <Badge variant="secondary">Door to Port</Badge>
                    </div>
                  </div>
                  <CardDescription className="text-base">
                    Complete export solutions from pickup to vessel loading with full documentation support and
                    regulatory compliance for international shipping.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Export documentation</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Container booking</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Cargo insurance</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">EEI filing</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Pickup coordination</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Loading supervision</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">Get Export Quote</Button>
                </CardContent>
              </Card>

              {/* Freight Forwarding */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-purple-600">
                <CardHeader className="pb-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                      <Truck className="h-8 w-8 text-purple-600 group-hover:text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Freight Forwarding</CardTitle>
                      <Badge variant="secondary">Multi-Modal</Badge>
                    </div>
                  </div>
                  <CardDescription className="text-base">
                    Multi-modal transportation solutions including ocean, air, and ground freight services with
                    optimized routing and real-time tracking capabilities.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Multi-modal transport</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Route optimization</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Real-time tracking</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Carrier management</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Cost optimization</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Performance reporting</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">Explore Forwarding</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Additional Specialized Services</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive support services to ensure smooth operations and regulatory compliance
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <Shield className="h-8 w-8 text-red-600 group-hover:text-white" />
                  </div>
                  <CardTitle>Customs Brokerage</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Licensed customs brokerage services ensuring compliance and smooth clearance processes.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Duty optimization</li>
                    <li>• Trade compliance</li>
                    <li>• Classification support</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="text-center group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                    <Clock className="h-8 w-8 text-teal-600 group-hover:text-white" />
                  </div>
                  <CardTitle>Supply Chain Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    End-to-end supply chain visibility and management for optimized logistics operations.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Inventory management</li>
                    <li>• Demand forecasting</li>
                    <li>• Performance analytics</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="text-center group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <FileText className="h-8 w-8 text-indigo-600 group-hover:text-white" />
                  </div>
                  <CardTitle>Documentation Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Complete documentation support for international trade compliance and efficiency.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Commercial invoices</li>
                    <li>• Certificates of origin</li>
                    <li>• Insurance certificates</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="text-center group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                    <BarChart3 className="h-8 w-8 text-amber-600 group-hover:text-white" />
                  </div>
                  <CardTitle>Logistics Consulting</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Strategic consulting to optimize your supply chain and reduce logistics costs.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Process optimization</li>
                    <li>• Cost analysis</li>
                    <li>• Strategic planning</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Industry Expertise */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Industry Expertise</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Specialized knowledge across key industries with tailored logistics solutions
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Manufacturing</h3>
                <p className="text-gray-600">
                  Raw materials, components, and finished goods logistics with just-in-time delivery solutions.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Retail & E-commerce</h3>
                <p className="text-gray-600">
                  Fast, reliable shipping solutions for consumer goods with flexible consolidation options.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Anchor className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Automotive</h3>
                <p className="text-gray-600">
                  Specialized handling for automotive parts and vehicles with secure, temperature-controlled options.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 lg:px-6 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Streamline Your Logistics?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Get a customized quote for your shipping needs and discover how our NVOCC services can optimize your
              supply chain.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Request Detailed Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                Schedule Consultation
              </Button>
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
                  <Link href="#" className="hover:text-white">
                    NVOCC Services
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Import Operations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Export Operations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Freight Forwarding
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
                  <Link href="#" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Track Shipment
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Customer Portal
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
