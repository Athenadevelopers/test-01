"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Ship, Search, MapPin, Clock, Package, CheckCircle, Truck, Anchor, Menu, X } from "lucide-react"
import Link from "next/link"

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [trackingResult, setTrackingResult] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleTrack = () => {
    // Simulate tracking result
    setTrackingResult({
      containerNumber: trackingNumber || "GSLO123456789",
      status: "In Transit",
      vessel: "MSC MEDITERRANEAN",
      voyage: "424W",
      eta: "2024-01-15",
      currentLocation: "Pacific Ocean",
      milestones: [
        { status: "Booking Confirmed", date: "2024-01-01", location: "Shanghai, China", completed: true },
        { status: "Container Loaded", date: "2024-01-03", location: "Shanghai Port", completed: true },
        { status: "Vessel Departed", date: "2024-01-05", location: "Shanghai, China", completed: true },
        { status: "In Transit", date: "2024-01-10", location: "Pacific Ocean", completed: true },
        { status: "Arrival at Destination", date: "2024-01-15", location: "Los Angeles, USA", completed: false },
        { status: "Container Available", date: "2024-01-16", location: "Los Angeles Port", completed: false },
      ],
    })
  }

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
            <Link href="/tracking" className="text-sm font-medium text-blue-600">
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
                href="/tracking"
                className="block text-base font-medium text-blue-600 py-2"
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
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">Track Your Shipment</h1>
              <p className="text-xl text-blue-100 leading-relaxed mb-8">
                Get real-time updates on your cargo with our advanced tracking system. Monitor your container's journey
                from origin to destination.
              </p>

              {/* Tracking Form */}
              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <Input
                        type="text"
                        placeholder="Enter container number, B/L number, or booking reference"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        className="bg-white/90 border-white/30 text-gray-900 placeholder:text-gray-600 h-12"
                      />
                    </div>
                    <Button size="lg" onClick={handleTrack} className="bg-blue-600 hover:bg-blue-700 h-12 px-8">
                      <Search className="h-4 w-4 mr-2" />
                      Track Shipment
                    </Button>
                  </div>
                  <p className="text-blue-200 text-sm mt-4">Example: GSLO123456789, BL-2024-001, or BKG-456789</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Tracking Results */}
        {trackingResult && (
          <section className="py-20">
            <div className="container mx-auto px-4 lg:px-6">
              <div className="max-w-6xl mx-auto">
                {/* Shipment Overview */}
                <Card className="mb-8">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl mb-2">Container: {trackingResult.containerNumber}</CardTitle>
                        <div className="flex items-center space-x-4">
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            {trackingResult.status}
                          </Badge>
                          <span className="text-gray-600">Vessel: {trackingResult.vessel}</span>
                          <span className="text-gray-600">Voyage: {trackingResult.voyage}</span>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 text-right">
                        <div className="text-sm text-gray-600">Estimated Arrival</div>
                        <div className="text-lg font-semibold">{trackingResult.eta}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="text-sm text-gray-600">Current Location</div>
                          <div className="font-semibold">{trackingResult.currentLocation}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Ship className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="text-sm text-gray-600">Vessel</div>
                          <div className="font-semibold">{trackingResult.vessel}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="text-sm text-gray-600">ETA</div>
                          <div className="font-semibold">{trackingResult.eta}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Shipment Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Shipment Timeline</CardTitle>
                    <CardDescription>Track your container's journey from origin to destination</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {trackingResult.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                milestone.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                              }`}
                            >
                              {milestone.completed ? (
                                <CheckCircle className="h-5 w-5" />
                              ) : (
                                <Clock className="h-5 w-5" />
                              )}
                            </div>
                            {index < trackingResult.milestones.length - 1 && (
                              <div
                                className={`w-0.5 h-12 mt-2 ${milestone.completed ? "bg-green-200" : "bg-gray-200"}`}
                              />
                            )}
                          </div>
                          <div className="flex-1 pb-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                              <div>
                                <h3
                                  className={`font-semibold ${milestone.completed ? "text-gray-900" : "text-gray-500"}`}
                                >
                                  {milestone.status}
                                </h3>
                                <p className="text-gray-600 text-sm">{milestone.location}</p>
                              </div>
                              <div className="text-sm text-gray-500 mt-1 md:mt-0">{milestone.date}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Tracking Features */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Advanced Tracking Features</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our comprehensive tracking system provides complete visibility throughout your shipment's journey
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <MapPin className="h-8 w-8 text-blue-600 group-hover:text-white" />
                  </div>
                  <CardTitle>Real-Time Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    GPS tracking with precise location updates and estimated arrival times.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
                    <Package className="h-8 w-8 text-green-600 group-hover:text-white" />
                  </div>
                  <CardTitle>Milestone Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Automatic notifications for key shipment milestones and status changes.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <Truck className="h-8 w-8 text-purple-600 group-hover:text-white" />
                  </div>
                  <CardTitle>Multi-Modal Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Track across ocean, rail, and truck transportation modes seamlessly.</p>
                </CardContent>
              </Card>

              <Card className="text-center group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    <Anchor className="h-8 w-8 text-orange-600 group-hover:text-white" />
                  </div>
                  <CardTitle>Port Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Detailed port arrival, departure, and handling information.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Help with Tracking?</h2>
                <p className="text-xl text-gray-600">
                  Our customer service team is here to assist you with any tracking questions
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Tracking Support</CardTitle>
                    <CardDescription>Get help with your shipment tracking</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>24/7 customer support</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>Multiple tracking methods</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>Email and SMS notifications</span>
                    </div>
                    <Button className="w-full mt-4">Contact Support</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tracking Tips</CardTitle>
                    <CardDescription>Make the most of our tracking system</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Use multiple references</p>
                        <p className="text-sm text-gray-600">Track by container, B/L, or booking number</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Set up notifications</p>
                        <p className="text-sm text-gray-600">Get automatic updates via email or SMS</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Check regularly</p>
                        <p className="text-sm text-gray-600">Updates occur multiple times daily</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
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
