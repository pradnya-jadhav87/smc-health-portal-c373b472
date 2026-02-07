// Mock data for the Smart Public Health Management System

export const dashboardStats = {
  totalPopulation: 1245000,
  activeCases: 1847,
  vaccinated: 892000,
  healthCenters: 47,
  hospitalBeds: 3200,
  ambulances: 28,
  doctorsAvailable: 156,
  emergencyCalls: 234,
};

export const wardHealthData = [
  { ward: "Ward 1", population: 45000, activeCases: 123, recovered: 890, vaccinated: 78 },
  { ward: "Ward 2", population: 52000, activeCases: 89, recovered: 1023, vaccinated: 82 },
  { ward: "Ward 3", population: 38000, activeCases: 156, recovered: 567, vaccinated: 71 },
  { ward: "Ward 4", population: 61000, activeCases: 67, recovered: 1234, vaccinated: 85 },
  { ward: "Ward 5", population: 43000, activeCases: 201, recovered: 789, vaccinated: 68 },
  { ward: "Ward 6", population: 55000, activeCases: 45, recovered: 1456, vaccinated: 89 },
  { ward: "Ward 7", population: 48000, activeCases: 178, recovered: 678, vaccinated: 74 },
  { ward: "Ward 8", population: 39000, activeCases: 92, recovered: 890, vaccinated: 79 },
];

export const diseaseOutbreakData = [
  { month: "Jan", dengue: 45, malaria: 23, covid: 156, typhoid: 12 },
  { month: "Feb", dengue: 38, malaria: 19, covid: 134, typhoid: 8 },
  { month: "Mar", dengue: 52, malaria: 28, covid: 98, typhoid: 15 },
  { month: "Apr", dengue: 78, malaria: 45, covid: 67, typhoid: 22 },
  { month: "May", dengue: 123, malaria: 67, covid: 45, typhoid: 18 },
  { month: "Jun", dengue: 189, malaria: 89, covid: 34, typhoid: 25 },
  { month: "Jul", dengue: 234, malaria: 112, covid: 28, typhoid: 31 },
  { month: "Aug", dengue: 201, malaria: 98, covid: 23, typhoid: 28 },
];

export const hospitals = [
  {
    id: 1,
    name: "SMC General Hospital",
    type: "Government",
    totalBeds: 450,
    availableBeds: 67,
    icuBeds: 12,
    ventilators: 8,
    oxygenStatus: "Adequate",
    address: "Civil Lines, Solapur",
    phone: "+91 217 2652XXX",
    status: "operational",
  },
  {
    id: 2,
    name: "District Hospital Solapur",
    type: "Government",
    totalBeds: 320,
    availableBeds: 45,
    icuBeds: 8,
    ventilators: 5,
    oxygenStatus: "Adequate",
    address: "Station Road, Solapur",
    phone: "+91 217 2651XXX",
    status: "operational",
  },
  {
    id: 3,
    name: "Ashwini Hospital",
    type: "Private",
    totalBeds: 180,
    availableBeds: 23,
    icuBeds: 6,
    ventilators: 4,
    oxygenStatus: "Low",
    address: "Vijay Nagar, Solapur",
    phone: "+91 217 2653XXX",
    status: "operational",
  },
  {
    id: 4,
    name: "Shri Siddheshwar Hospital",
    type: "Private",
    totalBeds: 250,
    availableBeds: 89,
    icuBeds: 10,
    ventilators: 6,
    oxygenStatus: "Adequate",
    address: "Saat Rasta, Solapur",
    phone: "+91 217 2654XXX",
    status: "operational",
  },
  {
    id: 5,
    name: "Primary Health Center - Ward 3",
    type: "PHC",
    totalBeds: 20,
    availableBeds: 8,
    icuBeds: 0,
    ventilators: 0,
    oxygenStatus: "Adequate",
    address: "Akkalkot Road, Solapur",
    phone: "+91 217 2655XXX",
    status: "operational",
  },
  {
    id: 6,
    name: "Yashoda Multi-Specialty Hospital",
    type: "Private",
    totalBeds: 200,
    availableBeds: 12,
    icuBeds: 8,
    ventilators: 5,
    oxygenStatus: "Critical",
    address: "Railway Lines, Solapur",
    phone: "+91 217 2656XXX",
    status: "high-demand",
  },
];

export const medicineStock = [
  { name: "Paracetamol 500mg", category: "Analgesic", stock: 45000, minRequired: 50000, status: "low" },
  { name: "Azithromycin 250mg", category: "Antibiotic", stock: 12000, minRequired: 10000, status: "adequate" },
  { name: "Ivermectin 12mg", category: "Antiparasitic", stock: 8000, minRequired: 5000, status: "adequate" },
  { name: "Dolo 650mg", category: "Analgesic", stock: 38000, minRequired: 40000, status: "low" },
  { name: "Remdesivir", category: "Antiviral", stock: 500, minRequired: 1000, status: "critical" },
  { name: "Fabiflu 400mg", category: "Antiviral", stock: 2500, minRequired: 2000, status: "adequate" },
  { name: "Oxygen Cylinders", category: "Medical Gas", stock: 850, minRequired: 1000, status: "low" },
  { name: "N95 Masks", category: "PPE", stock: 25000, minRequired: 20000, status: "adequate" },
];

export const vaccinationStats = {
  totalDoses: 2450000,
  firstDose: 892000,
  secondDose: 756000,
  booster: 234000,
  todayVaccinations: 3456,
  centersActive: 42,
};

export const vaccinationCenters = [
  { id: 1, name: "SMC Vaccination Center - Main", slots: 500, booked: 456, available: 44 },
  { id: 2, name: "District Hospital Center", slots: 300, booked: 289, available: 11 },
  { id: 3, name: "PHC Ward 5 Center", slots: 150, booked: 67, available: 83 },
  { id: 4, name: "Community Hall - Vijay Nagar", slots: 200, booked: 178, available: 22 },
  { id: 5, name: "School Vaccination Drive", slots: 400, booked: 312, available: 88 },
];

export const emergencyServices = {
  ambulances: [
    { id: "AMB-001", status: "available", location: "SMC Hospital", type: "Advanced Life Support" },
    { id: "AMB-002", status: "on-call", location: "En route - Ward 3", type: "Basic Life Support" },
    { id: "AMB-003", status: "available", location: "District Hospital", type: "Advanced Life Support" },
    { id: "AMB-004", status: "maintenance", location: "Depot", type: "Basic Life Support" },
    { id: "AMB-005", status: "on-call", location: "En route - Ward 7", type: "Advanced Life Support" },
  ],
  recentCalls: [
    { id: 1, time: "10:45 AM", type: "Cardiac Emergency", location: "Ward 2", status: "Responded", ambulance: "AMB-002" },
    { id: 2, time: "09:30 AM", type: "Accident", location: "Highway 9", status: "Completed", ambulance: "AMB-001" },
    { id: 3, time: "08:15 AM", type: "Pregnancy", location: "Ward 5", status: "Completed", ambulance: "AMB-003" },
    { id: 4, time: "07:00 AM", type: "Breathing Difficulty", location: "Ward 1", status: "Completed", ambulance: "AMB-005" },
  ],
};

export const citizenServices = [
  { 
    id: 1, 
    title: "Book Doctor Appointment", 
    description: "Schedule appointments with government doctors",
    icon: "calendar",
    link: "/services/appointments"
  },
  { 
    id: 2, 
    title: "Vaccination Booking", 
    description: "Register and book vaccination slots",
    icon: "syringe",
    link: "/services/vaccination"
  },
  { 
    id: 3, 
    title: "Telemedicine Consultation", 
    description: "Connect with doctors online",
    icon: "video",
    link: "/services/telemedicine"
  },
  { 
    id: 4, 
    title: "Health Records", 
    description: "Access your digital health records",
    icon: "file",
    link: "/services/records"
  },
  { 
    id: 5, 
    title: "Lab Test Booking", 
    description: "Book diagnostic tests online",
    icon: "flask",
    link: "/services/lab-tests"
  },
  { 
    id: 6, 
    title: "Health Alerts", 
    description: "Subscribe to health notifications",
    icon: "bell",
    link: "/services/alerts"
  },
];

export const healthAlerts = [
  {
    id: 1,
    type: "warning",
    title: "Dengue Outbreak Alert",
    message: "Increased dengue cases reported in Ward 3 and Ward 7. Take preventive measures.",
    timestamp: "2 hours ago",
    ward: "Ward 3, Ward 7",
  },
  {
    id: 2,
    type: "info",
    title: "Vaccination Drive",
    message: "Special COVID-19 booster vaccination camp this weekend at all PHCs.",
    timestamp: "5 hours ago",
    ward: "All Wards",
  },
  {
    id: 3,
    type: "critical",
    title: "Oxygen Supply Alert",
    message: "Low oxygen stock at Yashoda Hospital. Coordinating with suppliers.",
    timestamp: "1 hour ago",
    ward: "Ward 4",
  },
  {
    id: 4,
    type: "success",
    title: "Malaria Control Success",
    message: "Malaria cases reduced by 45% in Ward 6 after fumigation drive.",
    timestamp: "1 day ago",
    ward: "Ward 6",
  },
];

export const weeklyTrends = [
  { day: "Mon", cases: 234, recovered: 189, tests: 1200 },
  { day: "Tue", cases: 198, recovered: 210, tests: 1350 },
  { day: "Wed", cases: 267, recovered: 178, tests: 1100 },
  { day: "Thu", cases: 189, recovered: 234, tests: 1450 },
  { day: "Fri", cases: 156, recovered: 267, tests: 1300 },
  { day: "Sat", cases: 145, recovered: 289, tests: 980 },
  { day: "Sun", cases: 123, recovered: 245, tests: 750 },
];
