"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Upload,
  Download,
  Save,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  Plus,
  FileSpreadsheet,
  Calendar,
  Ship,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
} from "lucide-react"

// Mock data for demonstration
const mockSchedules = [
  {
    id: 1,
    vesselName: "MSC MAYA",
    voyage: "432W",
    service: "Asia-US West Coast",
    carrier: "MSC",
    route: "Shanghai → Los Angeles",
    departure: {
      port: "Shanghai, China",
      date: "2024-01-15",
      time: "14:00",
    },
    arrival: {
      port: "Los Angeles, USA",
      date: "2024-01-29",
      time: "08:00",
    },
    transitTime: "14 days",
    cutoff: {
      cargo: "2024-01-12 18:00",
      documentation: "2024-01-13 12:00",
    },
    status: "Active",
    capacity: "Available",
    containerTypes: ["20GP", "40GP", "40HC", "45HC"],
    lastUpdated: "2024-01-10 09:30",
    updatedBy: "admin@globalship.com",
  },
  // Add more mock data as needed
]

export default function AdminSchedulePage() {
  const [schedules, setSchedules] = useState(mockSchedules)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [importStatus, setImportStatus] = useState<string>("")
  const [isImporting, setIsImporting] = useState(false)
  const [editingSchedule, setEditingSchedule] = useState<any>(null)
  const [showAddForm, setShowAddForm] = useState(false)

  // New schedule form data
  const [newSchedule, setNewSchedule] = useState({
    vesselName: "",
    voyage: "",
    service: "",
    carrier: "",
    originPort: "",
    originCountry: "",
    destinationPort: "",
    destinationCountry: "",
    departureDate: "",
    departureTime: "",
    arrivalDate: "",
    arrivalTime: "",
    cargoeCutoff: "",
    docCutoff: "",
    containerTypes: [] as string[],
    status: "Active",
    capacity: "Available",
  })

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setImportStatus(`Selected: ${file.name}`)
    }
  }

  // Import schedules from file
  const handleImportSchedules = async () => {
    if (!selectedFile) {
      setImportStatus("Please select a file first")
      return
    }

    setIsImporting(true)
    setImportStatus("Importing schedules...")

    // Simulate file processing
    setTimeout(() => {
      // In a real implementation, you would parse the CSV/Excel file here
      const newSchedules = [
        {
          id: Date.now(),
          vesselName: "EVERGREEN TRIUMPH",
          voyage: "089W",
          service: "Transpacific",
          carrier: "Evergreen",
          route: "Kaohsiung → Long Beach",
          departure: {
            port: "Kaohsiung, Taiwan",
            date: "2024-01-17",
            time: "12:00",
          },
          arrival: {
            port: "Long Beach, USA",
            date: "2024-01-31",
            time: "15:00",
          },
          transitTime: "14 days",
          cutoff: {
            cargo: "2024-01-14 17:00",
            documentation: "2024-01-15 09:00",
          },
          status: "Active",
          capacity: "Available",
          containerTypes: ["20GP", "40GP", "40HC", "20RF", "40RF"],
          lastUpdated: new Date().toISOString().slice(0, 16).replace("T", " "),
          updatedBy: "admin@globalship.com",
        },
      ]

      setSchedules([...schedules, ...newSchedules])
      setImportStatus(`Successfully imported ${newSchedules.length} schedules`)
      setIsImporting(false)
      setSelectedFile(null)
    }, 2000)
  }

  // Add new schedule manually
  const handleAddSchedule = () => {
    const schedule = {
      id: Date.now(),
      vesselName: newSchedule.vesselName,
      voyage: newSchedule.voyage,
      service: newSchedule.service,
      carrier: newSchedule.carrier,
      route: `${newSchedule.originPort} → ${newSchedule.destinationPort}`,
      departure: {
        port: `${newSchedule.originPort}, ${newSchedule.originCountry}`,
        date: newSchedule.departureDate,
        time: newSchedule.departureTime,
      },
      arrival: {
        port: `${newSchedule.destinationPort}, ${newSchedule.destinationCountry}`,
        date: newSchedule.arrivalDate,
        time: newSchedule.arrivalTime,
      },
      transitTime: calculateTransitTime(newSchedule.departureDate, newSchedule.arrivalDate),
      cutoff: {
        cargo: newSchedule.cargoeCutoff,
        documentation: newSchedule.docCutoff,
      },
      status: newSchedule.status,
      capacity: newSchedule.capacity,
      containerTypes: newSchedule.containerTypes,
      lastUpdated: new Date().toISOString().slice(0, 16).replace("T", " "),
      updatedBy: "admin@globalship.com",
    }

    setSchedules([...schedules, schedule])
    setShowAddForm(false)
    resetNewScheduleForm()
  }

  // Calculate transit time
  const calculateTransitTime = (departure: string, arrival: string) => {
    const depDate = new Date(departure)
    const arrDate = new Date(arrival)
    const diffTime = Math.abs(arrDate.getTime() - depDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return `${diffDays} days`
  }

  // Reset form
  const resetNewScheduleForm = () => {
    setNewSchedule({
      vesselName: "",
      voyage: "",
      service: "",
      carrier: "",
      originPort: "",
      originCountry: "",
      destinationPort: "",
      destinationCountry: "",
      departureDate: "",
      departureTime: "",
      arrivalDate: "",
      arrivalTime: "",
      cargoeCutoff: "",
      docCutoff: "",
      containerTypes: [],
      status: "Active",
      capacity: "Available",
    })
  }

  // Delete schedule
  const handleDeleteSchedule = (id: number) => {
    if (confirm("Are you sure you want to delete this schedule?")) {
      setSchedules(schedules.filter((s) => s.id !== id))
    }
  }

  // Update schedule status
  const handleStatusUpdate = (id: number, newStatus: string) => {
    setSchedules(
      schedules.map((s) =>
        s.id === id
          ? { ...s, status: newStatus, lastUpdated: new Date().toISOString().slice(0, 16).replace("T", " ") }
          : s,
      ),
    )
  }

  // Export schedules
  const handleExportSchedules = () => {
    const csvContent = [
      "Vessel Name,Voyage,Service,Carrier,Origin Port,Destination Port,Departure Date,Arrival Date,Status,Capacity",
      ...schedules.map(
        (s) =>
          `${s.vesselName},${s.voyage},${s.service},${s.carrier},${s.departure.port},${s.arrival.port},${s.departure.date},${s.arrival.date},${s.status},${s.capacity}`,
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `vessel-schedules-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  // Handle container type selection
  const handleContainerTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setNewSchedule({
        ...newSchedule,
        containerTypes: [...newSchedule.containerTypes, type],
      })
    } else {
      setNewSchedule({
        ...newSchedule,
        containerTypes: newSchedule.containerTypes.filter((t) => t !== type),
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 lg:px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Ship className="h-8 w-8 mr-3 text-blue-600" />
                Schedule Management System
              </h1>
              <p className="text-gray-600 mt-2">Import, manage, and update vessel schedules for customer viewing</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <Users className="h-4 w-4 mr-1" />
                Live for Customers
              </Badge>
              <Button onClick={handleExportSchedules} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-8">
        <Tabs defaultValue="import" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="import">Import Schedules</TabsTrigger>
            <TabsTrigger value="manage">Manage Schedules</TabsTrigger>
            <TabsTrigger value="add">Add Schedule</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Import Tab */}
          <TabsContent value="import">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="h-5 w-5 mr-2 text-blue-600" />
                    Import from File
                  </CardTitle>
                  <CardDescription>Upload CSV or Excel files with vessel schedule data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="file-upload">Select Schedule File</Label>
                    <Input
                      id="file-upload"
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileUpload}
                      className="mt-2"
                    />
                    <p className="text-sm text-gray-500 mt-2">Supported formats: CSV, Excel (.xlsx, .xls)</p>
                  </div>

                  {selectedFile && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <FileSpreadsheet className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">{selectedFile.name}</span>
                        <Badge variant="secondary">{(selectedFile.size / 1024).toFixed(1)} KB</Badge>
                      </div>
                    </div>
                  )}

                  <Button onClick={handleImportSchedules} disabled={!selectedFile || isImporting} className="w-full">
                    {isImporting ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Importing...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Import Schedules
                      </>
                    )}
                  </Button>

                  {importStatus && (
                    <div
                      className={`p-4 rounded-lg ${
                        importStatus.includes("Successfully")
                          ? "bg-green-50 text-green-800 border border-green-200"
                          : importStatus.includes("Error")
                            ? "bg-red-50 text-red-800 border border-red-200"
                            : "bg-blue-50 text-blue-800 border border-blue-200"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        {importStatus.includes("Successfully") ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : importStatus.includes("Error") ? (
                          <AlertCircle className="h-5 w-5" />
                        ) : (
                          <Clock className="h-5 w-5" />
                        )}
                        <span>{importStatus}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Import Template</CardTitle>
                  <CardDescription>Download the template file to ensure proper data format</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-3">Required Columns:</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>• Vessel Name</div>
                      <div>• Voyage Number</div>
                      <div>• Service</div>
                      <div>• Carrier</div>
                      <div>• Origin Port</div>
                      <div>• Destination Port</div>
                      <div>• Departure Date</div>
                      <div>• Arrival Date</div>
                      <div>• Cargo Cutoff</div>
                      <div>• Doc Cutoff</div>
                      <div>• Container Types</div>
                      <div>• Status</div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Download Template
                  </Button>

                  <div className="text-sm text-gray-600">
                    <h4 className="font-medium mb-2">Import Guidelines:</h4>
                    <ul className="space-y-1">
                      <li>• Use YYYY-MM-DD format for dates</li>
                      <li>• Use HH:MM format for times</li>
                      <li>• Separate container types with commas</li>
                      <li>• Status should be: Active, Delayed, Cancelled</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Manage Tab */}
          <TabsContent value="manage">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                    Current Schedules ({schedules.length})
                  </span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">Last Updated: {new Date().toLocaleString()}</Badge>
                    <Button size="sm" variant="outline">
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Refresh
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schedules.map((schedule) => (
                    <Card key={schedule.id} className="border-l-4 border-l-blue-600">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">{schedule.vesselName}</h3>
                            <p className="text-gray-600">
                              {schedule.voyage} • {schedule.carrier} • {schedule.service}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge
                              className={
                                schedule.status === "Active"
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : schedule.status === "Delayed"
                                    ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                    : "bg-red-100 text-red-800 border-red-200"
                              }
                            >
                              {schedule.status}
                            </Badge>
                            <Select
                              value={schedule.status}
                              onValueChange={(value) => handleStatusUpdate(schedule.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Delayed">Delayed</SelectItem>
                                <SelectItem value="Cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Route</h4>
                            <p className="text-sm text-gray-600">{schedule.route}</p>
                            <p className="text-sm text-gray-600">Transit: {schedule.transitTime}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Departure</h4>
                            <p className="text-sm text-gray-600">
                              {schedule.departure.date} at {schedule.departure.time}
                            </p>
                            <p className="text-sm text-gray-600">{schedule.departure.port}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Arrival</h4>
                            <p className="text-sm text-gray-600">
                              {schedule.arrival.date} at {schedule.arrival.time}
                            </p>
                            <p className="text-sm text-gray-600">{schedule.arrival.port}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex flex-wrap gap-1">
                              {schedule.containerTypes.map((type) => (
                                <Badge key={type} variant="outline" className="text-xs">
                                  {type}
                                </Badge>
                              ))}
                            </div>
                            <Badge className="bg-blue-100 text-blue-800 border-blue-200">{schedule.capacity}</Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              Preview
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteSchedule(schedule.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t text-xs text-gray-500">
                          Last updated: {schedule.lastUpdated} by {schedule.updatedBy}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Add Schedule Tab */}
          <TabsContent value="add">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="h-5 w-5 mr-2 text-blue-600" />
                  Add New Schedule
                </CardTitle>
                <CardDescription>Manually add a new vessel schedule to the system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Vessel Name *</Label>
                    <Input
                      value={newSchedule.vesselName}
                      onChange={(e) => setNewSchedule({ ...newSchedule, vesselName: e.target.value })}
                      placeholder="e.g., MSC MAYA"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Voyage Number *</Label>
                    <Input
                      value={newSchedule.voyage}
                      onChange={(e) => setNewSchedule({ ...newSchedule, voyage: e.target.value })}
                      placeholder="e.g., 432W"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Service *</Label>
                    <Select
                      value={newSchedule.service}
                      onValueChange={(value) => setNewSchedule({ ...newSchedule, service: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia-US West Coast">Asia-US West Coast</SelectItem>
                        <SelectItem value="Asia-US East Coast">Asia-US East Coast</SelectItem>
                        <SelectItem value="Asia-Europe">Asia-Europe</SelectItem>
                        <SelectItem value="Transpacific">Transpacific</SelectItem>
                        <SelectItem value="Transatlantic">Transatlantic</SelectItem>
                        <SelectItem value="Asia-Mediterranean">Asia-Mediterranean</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Carrier *</Label>
                    <Select
                      value={newSchedule.carrier}
                      onValueChange={(value) => setNewSchedule({ ...newSchedule, carrier: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select carrier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MSC">MSC</SelectItem>
                        <SelectItem value="COSCO">COSCO</SelectItem>
                        <SelectItem value="Evergreen">Evergreen</SelectItem>
                        <SelectItem value="Maersk">Maersk</SelectItem>
                        <SelectItem value="CMA CGM">CMA CGM</SelectItem>
                        <SelectItem value="Hapag-Lloyd">Hapag-Lloyd</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-green-600">Origin Details</h3>
                    <div className="space-y-2">
                      <Label>Origin Port *</Label>
                      <Input
                        value={newSchedule.originPort}
                        onChange={(e) => setNewSchedule({ ...newSchedule, originPort: e.target.value })}
                        placeholder="e.g., Shanghai Port"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Origin Country *</Label>
                      <Input
                        value={newSchedule.originCountry}
                        onChange={(e) => setNewSchedule({ ...newSchedule, originCountry: e.target.value })}
                        placeholder="e.g., China"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Departure Date *</Label>
                        <Input
                          type="date"
                          value={newSchedule.departureDate}
                          onChange={(e) => setNewSchedule({ ...newSchedule, departureDate: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Departure Time *</Label>
                        <Input
                          type="time"
                          value={newSchedule.departureTime}
                          onChange={(e) => setNewSchedule({ ...newSchedule, departureTime: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-red-600">Destination Details</h3>
                    <div className="space-y-2">
                      <Label>Destination Port *</Label>
                      <Input
                        value={newSchedule.destinationPort}
                        onChange={(e) => setNewSchedule({ ...newSchedule, destinationPort: e.target.value })}
                        placeholder="e.g., Los Angeles Port"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Destination Country *</Label>
                      <Input
                        value={newSchedule.destinationCountry}
                        onChange={(e) => setNewSchedule({ ...newSchedule, destinationCountry: e.target.value })}
                        placeholder="e.g., United States"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Arrival Date *</Label>
                        <Input
                          type="date"
                          value={newSchedule.arrivalDate}
                          onChange={(e) => setNewSchedule({ ...newSchedule, arrivalDate: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Arrival Time *</Label>
                        <Input
                          type="time"
                          value={newSchedule.arrivalTime}
                          onChange={(e) => setNewSchedule({ ...newSchedule, arrivalTime: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Cargo Cutoff *</Label>
                    <Input
                      type="datetime-local"
                      value={newSchedule.cargoeCutoff}
                      onChange={(e) => setNewSchedule({ ...newSchedule, cargoeCutoff: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Documentation Cutoff *</Label>
                    <Input
                      type="datetime-local"
                      value={newSchedule.docCutoff}
                      onChange={(e) => setNewSchedule({ ...newSchedule, docCutoff: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-base font-semibold">Container Types Available</Label>
                  <div className="grid grid-cols-3 gap-4 mt-3">
                    {["20GP", "40GP", "40HC", "45HC", "20RF", "40RF"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={type}
                          checked={newSchedule.containerTypes.includes(type)}
                          onChange={(e) => handleContainerTypeChange(type, e.target.checked)}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor={type} className="text-sm">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select
                      value={newSchedule.status}
                      onValueChange={(value) => setNewSchedule({ ...newSchedule, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Delayed">Delayed</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Capacity Status</Label>
                    <Select
                      value={newSchedule.capacity}
                      onValueChange={(value) => setNewSchedule({ ...newSchedule, capacity: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Available">Available</SelectItem>
                        <SelectItem value="Limited">Limited</SelectItem>
                        <SelectItem value="Full">Full</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <Button variant="outline" onClick={resetNewScheduleForm}>
                    Reset Form
                  </Button>
                  <Button onClick={handleAddSchedule} className="bg-blue-600 hover:bg-blue-700">
                    <Save className="h-4 w-4 mr-2" />
                    Add Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Schedule Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total Active Schedules</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        {schedules.filter((s) => s.status === "Active").length}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Delayed Schedules</span>
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                        {schedules.filter((s) => s.status === "Delayed").length}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Cancelled Schedules</span>
                      <Badge className="bg-red-100 text-red-800 border-red-200">
                        {schedules.filter((s) => s.status === "Cancelled").length}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Available Capacity</span>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                        {schedules.filter((s) => s.capacity === "Available").length}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {schedules.slice(0, 5).map((schedule) => (
                      <div
                        key={schedule.id}
                        className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                      >
                        <div>
                          <p className="font-medium text-sm">{schedule.vesselName}</p>
                          <p className="text-xs text-gray-500">{schedule.lastUpdated}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {schedule.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
