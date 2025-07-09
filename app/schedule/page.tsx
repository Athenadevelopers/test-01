"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Ship,
  Calendar,
  MapPin,
  Clock,
  Search,
  Download,
  Bell,
  Menu,
  X,
  Anchor,
  Globe,
  ArrowRight,
  RefreshCw,
  BookOpen,
  Truck,
  Eye,
  Star,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

// Enhanced vessel schedule data
const vesselSchedules = [
  {
    id: 1,
    vesselName: "MSC MAYA",
    voyage: "432W",
    service: "Asia-US West Coast",
    carrier: "MSC",
    carrierLogo: "/placeholder.svg?height=40&width=80",
    route: "Shanghai → Los Angeles",
    departure: {
      port: "Shanghai, China",
      portCode: "CNSHA",
      date: "2024-01-15",
      time: "14:00",
      terminal: "Yangshan Terminal",
    },
    arrival: {
      port: "Los Angeles, USA",
      portCode: "USLAX",
      date: "2024-01-29",
      time: "08:00",
      terminal: "Terminal Island",
    },
    transitTime: "14 days",
    cutoff: {
      cargo: "2024-01-12 18:00",
      documentation: "2024-01-13 12:00",
      vgm: "2024-01-13 15:00",
    },
    status: "On Schedule",
    capacity: "Available",
    containerTypes: ["20GP", "40GP", "40HC", "45HC"],
    lastUpdated: "2024-01-10 09:30",
    frequency: "Weekly",
    nextSailing: "2024-01-22",
    rate: "Competitive",
    features: ["Direct Service", "Fast Transit", "Reliable"],
    popularity: 95,
  },
  {
    id: 2,
    vesselName: "COSCO SHIPPING UNIVERSE",
    voyage: "156E",
    service: "Asia-Europe",
    carrier: "COSCO",
    carrierLogo: "/placeholder.svg?height=40&width=80",
    route: "Ningbo → Hamburg",
    departure: {
      port: "Ningbo, China",
      portCode: "CNNGB",
      date: "2024-01-16",
      time: "16:30",
      terminal: "Beilun Terminal",
    },
    arrival: {
      port: "Hamburg, Germany",
      portCode: "DEHAM",
      date: "2024-02-08",
      time: "10:00",
      terminal: "Container Terminal Tollerort",
    },
    transitTime: "23 days",
    cutoff: {
      cargo: "2024-01-13 15:00",
      documentation: "2024-01-14 10:00",
      vgm: "2024-01-14 12:00",
    },
    status: "On Schedule",
    capacity: "Limited",
    containerTypes: ["20GP", "40GP", "40HC"],
    lastUpdated: "2024-01-10 09:30",
    frequency: "Weekly",
    nextSailing: "2024-01-23",
    rate: "Premium",
    features: ["Express Service", "Port Coverage", "Eco-Friendly"],
    popularity: 88,
  },
  {
    id: 3,
    vesselName: "EVERGREEN TRIUMPH",
    voyage: "089W",
    service: "Transpacific",
    carrier: "Evergreen",
    carrierLogo: "/placeholder.svg?height=40&width=80",
    route: "Kaohsiung → Long Beach",
    departure: {
      port: "Kaohsiung, Taiwan",
      portCode: "TWKHH",
      date: "2024-01-17",
      time: "12:00",
      terminal: "Terminal 5",
    },
    arrival: {
      port: "Long Beach, USA",
      portCode: "USLGB",
      date: "2024-01-31",
      time: "15:00",
      terminal: "Long Beach Container Terminal",
    },
    transitTime: "14 days",
    cutoff: {
      cargo: "2024-01-14 17:00",
      documentation: "2024-01-15 09:00",
      vgm: "2024-01-15 12:00",
    },
    status: "Delayed 6hrs",
    capacity: "Available",
    containerTypes: ["20GP", "40GP", "40HC", "20RF", "40RF"],
    lastUpdated: "2024-01-10 14:15",
    frequency: "Weekly",
    nextSailing: "2024-01-24",
    rate: "Competitive",
    features: ["Reefer Service", "Direct Service", "Reliable"],
    popularity: 92,
  },
  {
    id: 4,
    vesselName: "MAERSK ESSEX",
    voyage: "244E",
    service: "Asia-Europe",
    carrier: "Maersk",
    carrierLogo: "/placeholder.svg?height=40&width=80",
    route: "Singapore → Rotterdam",
    departure: {
      port: "Singapore",
      portCode: "SGSIN",
      date: "2024-01-18",
      time: "09:00",
      terminal: "Pasir Panjang Terminal",
    },
    arrival: {
      port: "Rotterdam, Netherlands",
      portCode: "NLRTM",
      date: "2024-02-10",
      time: "14:00",
      terminal: "Maasvlakte Terminal",
    },
    transitTime: "23 days",
    cutoff: {
      cargo: "2024-01-15 16:00",
      documentation: "2024-01-16 11:00",
      vgm: "2024-01-16 14:00",
    },
    status: "On Schedule",
    capacity: "Available",
    containerTypes: ["20GP", "40GP", "40HC", "45HC"],
    lastUpdated: "2024-01-10 09:30",
    frequency: "Weekly",
    nextSailing: "2024-01-25",
    rate: "Premium",
    features: ["Premium Service", "Global Network", "Digital Solutions"],
    popularity: 90,
  },
  {
    id: 5,
    vesselName: "CMA CGM MARCO POLO",
    voyage: "FAL7",
    service: "Asia-Mediterranean",
    carrier: "CMA CGM",
    carrierLogo: "/placeholder.svg?height=40&width=80",
    route: "Hong Kong → Genoa",
    departure: {
      port: "Hong Kong",
      portCode: "HKHKG",
      date: "2024-01-19",
      time: "20:00",
      terminal: "Kwai Tsing Terminal",
    },
    arrival: {
      port: "Genoa, Italy",
      portCode: "ITGOA",
      date: "2024-02-12",
      time: "11:00",
      terminal: "Voltri Terminal Europa",
    },
    transitTime: "24 days",
    cutoff: {
      cargo: "2024-01-16 18:00",
      documentation: "2024-01-17 12:00",
      vgm: "2024-01-17 15:00",
    },
    status: "On Schedule",
    capacity: "Limited",
    containerTypes: ["20GP", "40GP", "40HC"],
    lastUpdated: "2024-01-10 09:30",
    frequency: "Weekly",
    nextSailing: "2024-01-26",
    rate: "Competitive",
    features: ["Mediterranean Focus", "Port Coverage", "Flexible"],
    popularity: 85,
  },
  {
    id: 6,
    vesselName: "HAPAG LLOYD BERLIN",
    voyage: "112W",
    service: "Transatlantic",
    carrier: "Hapag-Lloyd",
    carrierLogo: "/placeholder.svg?height=40&width=80",
    route: "Hamburg → New York",
    departure: {
      port: "Hamburg, Germany",
      portCode: "DEHAM",
      date: "2024-01-20",
      time: "11:00",
      terminal: "Container Terminal Burchardkai",
    },
    arrival: {
      port: "New York, USA",
      portCode: "USNYC",
      date: "2024-02-02",
      time: "16:00",
      terminal: "Red Hook Container Terminal",
    },
    transitTime: "13 days",
    cutoff: {
      cargo: "2024-01-17 15:00",
      documentation: "2024-01-18 10:00",
      vgm: "2024-01-18 13:00",
    },
    status: "On Schedule",
    capacity: "Available",
    containerTypes: ["20GP", "40GP", "40HC", "45HC"],
    lastUpdated: "2024-01-10 09:30",
    frequency: "Weekly",
    nextSailing: "2024-01-27",
    rate: "Premium",
    features: ["Fast Transit", "Reliable", "Quality Service"],
    popularity: 87,
  },
]

export default function VesselSchedulePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRoute, setSelectedRoute] = useState("all")
  const [selectedCarrier, setSelectedCarrier] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedCapacity, setSelectedCapacity] = useState("all")
  const [sortBy, setSortBy] = useState("departure")
  const [viewMode, setViewMode] = useState("card")
  const [schedules, setSchedules] = useState(vesselSchedules)
  const [lastRefresh, setLastRefresh] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [favoriteSchedules, setFavoriteSchedules] = useState<number[]>([])

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(
      () => {
        handleRefresh()
      },
      5 * 60 * 1000,
    )

    return () => clearInterval(interval)
  }, [])

  // Handle manual refresh
  const handleRefresh = async () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setLastRefresh(new Date())
      setIsRefreshing(false)
    }, 1000)
  }

  // Toggle favorite
  const toggleFavorite = (scheduleId: number) => {
    setFavoriteSchedules((prev) =>
      prev.includes(scheduleId) ? prev.filter((id) => id !== scheduleId) : [...prev, scheduleId],
    )
  }

  // Filter and sort schedules
  const filteredSchedules = schedules
    .filter((schedule) => {
      const matchesSearch =
        schedule.vesselName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        schedule.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
        schedule.voyage.toLowerCase().includes(searchTerm.toLowerCase()) ||
        schedule.carrier.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesRoute =
        selectedRoute === "all" || schedule.service.toLowerCase().includes(selectedRoute.toLowerCase())
      const matchesCarrier =
        selectedCarrier === "all" || schedule.carrier.toLowerCase() === selectedCarrier.toLowerCase()
      const matchesStatus =
        selectedStatus === "all" ||
        (selectedStatus === "on-schedule" && schedule.status === "On Schedule") ||
        (selectedStatus === "delayed" && schedule.status.includes("Delayed"))
      const matchesCapacity =
        selectedCapacity === "all" || schedule.capacity.toLowerCase() === selectedCapacity.toLowerCase()

      return matchesSearch && matchesRoute && matchesCarrier && matchesStatus && matchesCapacity
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "departure":
          return new Date(a.departure.date).getTime() - new Date(b.departure.date).getTime()
        case "transit":
          return Number.parseInt(a.transitTime) - Number.parseInt(b.transitTime)
        case "popularity":
          return b.popularity - a.popularity
        case "carrier":
          return a.carrier.localeCompare(b.carrier)
        default:
          return 0
      }
    })

  const getStatusBadge = (status: string) => {
    if (status === "On Schedule") {
      return <Badge className="bg-green-100 text-green-800 border-green-200">On Schedule</Badge>
    } else if (status.includes("Delayed")) {
      return <Badge className="bg-red-100 text-red-800 border-red-200">{status}</Badge>
    }
    return <Badge variant="secondary">{status}</Badge>
  }

  const getCapacityBadge = (capacity: string) => {
    if (capacity === "Available") {
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Available</Badge>
    } else if (capacity === "Limited") {
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Limited</Badge>
    } else if (capacity === "Full") {
      return <Badge className="bg-red-100 text-red-800 border-red-200">Full</Badge>
    }
    return <Badge variant="secondary">{capacity}</Badge>
  }

  const getRateBadge = (rate: string) => {
    if (rate === "Competitive") {
      return <Badge className="bg-green-100 text-green-800 border-green-200">Competitive</Badge>
    } else if (rate === "Premium") {
      return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Premium</Badge>
    }
    return <Badge variant="secondary">{rate}</Badge>
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
            <Link href="/schedule" className="text-sm font-medium text-blue-600">
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
                className="block text-base font-medium text-blue-600 py-2"
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

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-16">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center space-x-2 mb-6">
                <Calendar className="h-8 w-8 text-blue-200" />
                <Badge className="bg-blue-500/20 text-blue-100 border-blue-400/30">
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Live Updates
                </Badge>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">Vessel Schedule</h1>
              <p className="text-xl text-blue-100 leading-relaxed mb-8">
                Discover the best shipping routes with real-time vessel schedules. Compare carriers, transit times, and
                book your containers with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-900 hover:bg-gray-100"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                >
                  {isRefreshing ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Refreshing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Refresh Schedules
                    </>
                  )}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-900 bg-transparent"
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Schedule Alerts
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 bg-gray-50 border-b">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search by vessel name, route, voyage, or carrier..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 text-lg"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4 items-center justify-center">
                <Select value={selectedRoute} onValueChange={setSelectedRoute}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All Routes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Routes</SelectItem>
                    <SelectItem value="asia-us">Asia - US</SelectItem>
                    <SelectItem value="asia-europe">Asia - Europe</SelectItem>
                    <SelectItem value="transpacific">Transpacific</SelectItem>
                    <SelectItem value="transatlantic">Transatlantic</SelectItem>
                    <SelectItem value="mediterranean">Mediterranean</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedCarrier} onValueChange={setSelectedCarrier}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All Carriers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Carriers</SelectItem>
                    <SelectItem value="msc">MSC</SelectItem>
                    <SelectItem value="cosco">COSCO</SelectItem>
                    <SelectItem value="evergreen">Evergreen</SelectItem>
                    <SelectItem value="maersk">Maersk</SelectItem>
                    <SelectItem value="cma cgm">CMA CGM</SelectItem>
                    <SelectItem value="hapag-lloyd">Hapag-Lloyd</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="on-schedule">On Schedule</SelectItem>
                    <SelectItem value="delayed">Delayed</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedCapacity} onValueChange={setSelectedCapacity}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All Capacity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Capacity</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="limited">Limited</SelectItem>
                    <SelectItem value="full">Full</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="departure">Departure Date</SelectItem>
                    <SelectItem value="transit">Transit Time</SelectItem>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="carrier">Carrier</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* View Options */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    Showing {filteredSchedules.length} of {schedules.length} schedules
                  </span>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>Last updated: {lastRefresh.toLocaleTimeString()}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "card" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("card")}
                  >
                    Card View
                  </Button>
                  <Button
                    variant={viewMode === "table" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("table")}
                  >
                    Table View
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Schedule Results */}
        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-6">
            {viewMode === "card" ? (
              <div className="space-y-6">
                {filteredSchedules.map((schedule) => (
                  <Card
                    key={schedule.id}
                    className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-600"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                            <Anchor className="h-8 w-8 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <CardTitle className="text-xl">{schedule.vesselName}</CardTitle>
                              <button
                                onClick={() => toggleFavorite(schedule.id)}
                                className="text-gray-400 hover:text-yellow-500 transition-colors"
                              >
                                <Star
                                  className={`h-5 w-5 ${favoriteSchedules.includes(schedule.id) ? "fill-yellow-500 text-yellow-500" : ""}`}
                                />
                              </button>
                            </div>
                            <CardDescription className="flex flex-wrap items-center gap-4 text-sm">
                              <span className="flex items-center space-x-1">
                                <Ship className="h-4 w-4" />
                                <span>Voyage: {schedule.voyage}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Truck className="h-4 w-4" />
                                <span>{schedule.carrier}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Globe className="h-4 w-4" />
                                <span>{schedule.service}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <TrendingUp className="h-4 w-4" />
                                <span>{schedule.popularity}% Popular</span>
                              </span>
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          {getStatusBadge(schedule.status)}
                          {getCapacityBadge(schedule.capacity)}
                          {getRateBadge(schedule.rate)}
                          <Badge variant="outline" className="text-xs">
                            {schedule.frequency}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="grid lg:grid-cols-4 gap-6 mb-6">
                        {/* Route Information */}
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-900 flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-green-600" />
                            Route Details
                          </h4>
                          <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                              <div className="w-3 h-3 bg-green-500 rounded-full mt-1"></div>
                              <div className="flex-1">
                                <div className="font-medium text-sm">{schedule.departure.port}</div>
                                <div className="text-xs text-gray-600">{schedule.departure.portCode}</div>
                                <div className="text-xs text-gray-600">{schedule.departure.terminal}</div>
                                <div className="text-sm text-gray-600 mt-1">
                                  {new Date(schedule.departure.date).toLocaleDateString()} at {schedule.departure.time}
                                </div>
                              </div>
                            </div>
                            <div className="ml-1.5 border-l-2 border-gray-200 h-4"></div>
                            <div className="flex items-start space-x-3">
                              <div className="w-3 h-3 bg-red-500 rounded-full mt-1"></div>
                              <div className="flex-1">
                                <div className="font-medium text-sm">{schedule.arrival.port}</div>
                                <div className="text-xs text-gray-600">{schedule.arrival.portCode}</div>
                                <div className="text-xs text-gray-600">{schedule.arrival.terminal}</div>
                                <div className="text-sm text-gray-600 mt-1">
                                  {new Date(schedule.arrival.date).toLocaleDateString()} at {schedule.arrival.time}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                            <span className="font-medium">Transit Time:</span> {schedule.transitTime}
                          </div>
                        </div>

                        {/* Cutoff Information */}
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-900 flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-orange-600" />
                            Cutoff Times
                          </h4>
                          <div className="space-y-3">
                            <div className="bg-orange-50 p-3 rounded-lg">
                              <div className="text-sm font-medium text-orange-800">Cargo Cutoff</div>
                              <div className="text-sm text-orange-700">{schedule.cutoff.cargo}</div>
                            </div>
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <div className="text-sm font-medium text-blue-800">Doc Cutoff</div>
                              <div className="text-sm text-blue-700">{schedule.cutoff.documentation}</div>
                            </div>
                            <div className="bg-purple-50 p-3 rounded-lg">
                              <div className="text-sm font-medium text-purple-800">VGM Cutoff</div>
                              <div className="text-sm text-purple-700">{schedule.cutoff.vgm}</div>
                            </div>
                          </div>
                        </div>

                        {/* Container Types & Features */}
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-900">Container Types</h4>
                          <div className="flex flex-wrap gap-2">
                            {schedule.containerTypes.map((type) => (
                              <Badge key={type} variant="outline" className="text-xs">
                                {type}
                              </Badge>
                            ))}
                          </div>
                          <div className="space-y-2">
                            <h5 className="text-sm font-medium text-gray-700">Service Features</h5>
                            <div className="flex flex-wrap gap-1">
                              {schedule.features.map((feature) => (
                                <Badge key={feature} className="bg-green-100 text-green-800 border-green-200 text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-900">Actions</h4>
                          <div className="space-y-2">
                            <Link href="/quote" className="block">
                              <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                                <BookOpen className="h-4 w-4 mr-2" />
                                Book Now
                              </Button>
                            </Link>
                            <Button size="sm" variant="outline" className="w-full bg-transparent">
                              <Bell className="h-4 w-4 mr-2" />
                              Set Alert
                            </Button>
                            <Button size="sm" variant="outline" className="w-full bg-transparent">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          </div>
                          <div className="text-xs text-gray-500 pt-2 border-t">
                            <div>Next sailing: {schedule.nextSailing}</div>
                            <div>Updated: {schedule.lastUpdated}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              // Table View
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="text-left p-4 font-semibold">Vessel</th>
                          <th className="text-left p-4 font-semibold">Route</th>
                          <th className="text-left p-4 font-semibold">Departure</th>
                          <th className="text-left p-4 font-semibold">Arrival</th>
                          <th className="text-left p-4 font-semibold">Transit</th>
                          <th className="text-left p-4 font-semibold">Status</th>
                          <th className="text-left p-4 font-semibold">Capacity</th>
                          <th className="text-left p-4 font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredSchedules.map((schedule) => (
                          <tr key={schedule.id} className="border-b hover:bg-gray-50">
                            <td className="p-4">
                              <div>
                                <div className="font-medium">{schedule.vesselName}</div>
                                <div className="text-sm text-gray-600">
                                  {schedule.voyage} • {schedule.carrier}
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="text-sm">{schedule.route}</div>
                            </td>
                            <td className="p-4">
                              <div className="text-sm">
                                <div>{new Date(schedule.departure.date).toLocaleDateString()}</div>
                                <div className="text-gray-600">{schedule.departure.time}</div>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="text-sm">
                                <div>{new Date(schedule.arrival.date).toLocaleDateString()}</div>
                                <div className="text-gray-600">{schedule.arrival.time}</div>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="text-sm">{schedule.transitTime}</div>
                            </td>
                            <td className="p-4">{getStatusBadge(schedule.status)}</td>
                            <td className="p-4">{getCapacityBadge(schedule.capacity)}</td>
                            <td className="p-4">
                              <div className="flex space-x-2">
                                <Link href="/quote">
                                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                    Book
                                  </Button>
                                </Link>
                                <Button size="sm" variant="outline">
                                  <Bell className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            {filteredSchedules.length === 0 && (
              <div className="text-center py-12">
                <Ship className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No schedules found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or filters to find available vessel schedules.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedRoute("all")
                    setSelectedCarrier("all")
                    setSelectedStatus("all")
                    setSelectedCapacity("all")
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Schedule Tools & Services</h2>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Bell className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <CardTitle>Schedule Alerts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Get notified about schedule changes, delays, and new sailing opportunities.
                    </p>
                    <Button className="w-full">Subscribe to Alerts</Button>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Download className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <CardTitle>Export Schedules</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Download schedule information in PDF or Excel format for offline planning.
                    </p>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        Download PDF
                      </Button>
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        Export Excel
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Calendar className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                    <CardTitle>Schedule Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Compare multiple routes and carriers to find the best option for your cargo.
                    </p>
                    <Button className="w-full">Compare Routes</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 lg:px-6 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Ship Your Cargo?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Use our comprehensive vessel schedules to plan your shipments and get competitive rates from our NVOCC
              services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Get Shipping Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                <Bell className="mr-2 h-4 w-4" />
                Subscribe to Updates
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
