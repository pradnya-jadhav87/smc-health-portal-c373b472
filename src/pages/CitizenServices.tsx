import { useState } from "react";
import { 
  Calendar, 
  Syringe, 
  Video, 
  FileText, 
  TestTube, 
  Bell,
  Clock,
  CheckCircle2,
  ArrowRight,
  User,
  Phone,
  MapPin,
  Search
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { vaccinationCenters, citizenServices } from "@/data/mockData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const services = [
  { 
    id: 1, 
    icon: Calendar, 
    title: "Book Appointment", 
    description: "Schedule OPD appointments with government doctors",
    color: "bg-primary/10 text-primary"
  },
  { 
    id: 2, 
    icon: Syringe, 
    title: "Vaccination Booking", 
    description: "Register and book vaccination slots for all ages",
    color: "bg-success/10 text-success"
  },
  { 
    id: 3, 
    icon: Video, 
    title: "Telemedicine", 
    description: "Consult doctors online from home",
    color: "bg-info/10 text-info"
  },
  { 
    id: 4, 
    icon: FileText, 
    title: "Health Records", 
    description: "Access your digital health records",
    color: "bg-warning/10 text-warning"
  },
  { 
    id: 5, 
    icon: TestTube, 
    title: "Lab Tests", 
    description: "Book diagnostic tests at government labs",
    color: "bg-critical/10 text-critical"
  },
  { 
    id: 6, 
    icon: Bell, 
    title: "Health Alerts", 
    description: "Subscribe to health notifications",
    color: "bg-secondary text-secondary-foreground"
  },
];

const doctors = [
  { id: 1, name: "Dr. Priya Sharma", specialty: "General Physician", hospital: "SMC General Hospital", available: true, nextSlot: "Today 2:00 PM" },
  { id: 2, name: "Dr. Rajesh Patil", specialty: "Pediatrician", hospital: "District Hospital", available: true, nextSlot: "Today 4:30 PM" },
  { id: 3, name: "Dr. Anjali Deshmukh", specialty: "Gynecologist", hospital: "SMC General Hospital", available: false, nextSlot: "Tomorrow 10:00 AM" },
  { id: 4, name: "Dr. Sunil Kulkarni", specialty: "Cardiologist", hospital: "Ashwini Hospital", available: true, nextSlot: "Today 5:00 PM" },
  { id: 5, name: "Dr. Meena Joshi", specialty: "Dermatologist", hospital: "District Hospital", available: true, nextSlot: "Tomorrow 11:00 AM" },
];

export default function CitizenServices() {
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [searchDoctor, setSearchDoctor] = useState("");

  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchDoctor.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchDoctor.toLowerCase())
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Citizen Services
          </h1>
          <p className="text-muted-foreground">
            Access healthcare services online - appointments, vaccinations, telemedicine & more
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {services.map((service) => (
            <Card key={service.id} className="group hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className={`h-12 w-12 rounded-xl ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <service.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full max-w-lg grid-cols-3">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="vaccination">Vaccination</TabsTrigger>
            <TabsTrigger value="telemedicine">Telemedicine</TabsTrigger>
          </TabsList>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Book Doctor Appointment
                </CardTitle>
                <CardDescription>
                  Find available doctors and book your appointment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by doctor name or specialty..."
                    value={searchDoctor}
                    onChange={(e) => setSearchDoctor(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Doctors List */}
                <div className="space-y-3">
                  {filteredDoctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        selectedDoctor === doctor.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/30 hover:bg-muted/50'
                      }`}
                      onClick={() => setSelectedDoctor(doctor.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{doctor.name}</h4>
                            <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                              <MapPin className="h-3 w-3" />
                              {doctor.hospital}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={doctor.available ? "default" : "secondary"}>
                            {doctor.available ? "Available" : "Busy"}
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1 justify-end">
                            <Clock className="h-3 w-3" />
                            {doctor.nextSlot}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Book Button */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full" size="lg" disabled={!selectedDoctor}>
                      Book Appointment
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Appointment</DialogTitle>
                      <DialogDescription>
                        Fill in your details to confirm the appointment
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="Enter your full name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="Enter your phone number" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="aadhar">Aadhar Number</Label>
                        <Input id="aadhar" placeholder="Enter your Aadhar number" />
                      </div>
                      <Button className="w-full">Confirm Booking</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vaccination Tab */}
          <TabsContent value="vaccination" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Syringe className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">3,456</p>
                      <p className="text-sm text-muted-foreground">Today's Vaccinations</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-success/5 border-success/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-success/20 flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">42</p>
                      <p className="text-sm text-muted-foreground">Active Centers</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-info/5 border-info/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-info/20 flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-info" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">248</p>
                      <p className="text-sm text-muted-foreground">Available Slots</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Syringe className="h-5 w-5 text-primary" />
                  Vaccination Centers
                </CardTitle>
                <CardDescription>
                  Book your vaccination slot at the nearest center
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {vaccinationCenters.map((center) => (
                    <div
                      key={center.id}
                      className="p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-muted/50 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-foreground">{center.name}</h4>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <CheckCircle2 className="h-4 w-4 text-success" />
                              {center.available} slots available
                            </span>
                            <span>Total: {center.slots}</span>
                          </div>
                        </div>
                        <Button size="sm">Book Slot</Button>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full transition-all"
                              style={{ width: `${(center.booked / center.slots) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {Math.round((center.booked / center.slots) * 100)}% booked
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Telemedicine Tab */}
          <TabsContent value="telemedicine" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-primary" />
                  Telemedicine Consultation
                </CardTitle>
                <CardDescription>
                  Connect with healthcare professionals online from the comfort of your home
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Select Department</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Medicine</SelectItem>
                          <SelectItem value="pediatrics">Pediatrics</SelectItem>
                          <SelectItem value="gynecology">Gynecology</SelectItem>
                          <SelectItem value="dermatology">Dermatology</SelectItem>
                          <SelectItem value="orthopedics">Orthopedics</SelectItem>
                          <SelectItem value="mental">Mental Health</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Preferred Date</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>Preferred Time</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="9-10">9:00 AM - 10:00 AM</SelectItem>
                          <SelectItem value="10-11">10:00 AM - 11:00 AM</SelectItem>
                          <SelectItem value="11-12">11:00 AM - 12:00 PM</SelectItem>
                          <SelectItem value="2-3">2:00 PM - 3:00 PM</SelectItem>
                          <SelectItem value="3-4">3:00 PM - 4:00 PM</SelectItem>
                          <SelectItem value="4-5">4:00 PM - 5:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Describe your symptoms</Label>
                      <textarea
                        className="w-full min-h-[100px] px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Brief description of your health concern..."
                      />
                    </div>
                    <Button className="w-full">Request Consultation</Button>
                  </div>

                  <div className="bg-muted/30 rounded-xl p-6 space-y-4">
                    <h4 className="font-semibold text-foreground">How it works</h4>
                    <div className="space-y-4">
                      {[
                        { step: 1, title: "Book Appointment", desc: "Select department and preferred time" },
                        { step: 2, title: "Get Confirmation", desc: "Receive SMS with video call link" },
                        { step: 3, title: "Join Video Call", desc: "Connect with doctor at scheduled time" },
                        { step: 4, title: "Get Prescription", desc: "Digital prescription sent to your phone" },
                      ].map((item) => (
                        <div key={item.step} className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {item.step}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{item.title}</p>
                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
