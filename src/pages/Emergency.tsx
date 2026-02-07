import { 
  Ambulance, 
  Phone, 
  MapPin, 
  Clock, 
  AlertTriangle,
  CheckCircle2,
  Wrench,
  Navigation,
  Siren,
  HeartPulse,
  Baby,
  Car,
  Activity
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { emergencyServices } from "@/data/mockData";

const emergencyNumbers = [
  { name: "Ambulance", number: "108", icon: Ambulance, color: "bg-critical" },
  { name: "Health Helpline", number: "104", icon: Phone, color: "bg-info" },
  { name: "COVID Helpline", number: "1075", icon: HeartPulse, color: "bg-warning" },
  { name: "Child Helpline", number: "1098", icon: Baby, color: "bg-success" },
];

export default function Emergency() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available": return <Badge className="bg-success text-success-foreground">Available</Badge>;
      case "on-call": return <Badge className="bg-warning text-warning-foreground">On Call</Badge>;
      case "maintenance": return <Badge variant="secondary">Maintenance</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getCallStatusBadge = (status: string) => {
    switch (status) {
      case "Responded": return <Badge className="bg-info text-info-foreground">Responded</Badge>;
      case "Completed": return <Badge className="bg-success text-success-foreground">Completed</Badge>;
      case "Pending": return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const availableAmbulances = emergencyServices.ambulances.filter(a => a.status === "available").length;
  const onCallAmbulances = emergencyServices.ambulances.filter(a => a.status === "on-call").length;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Emergency Header */}
        <div className="bg-gradient-to-r from-critical to-critical/80 text-white rounded-2xl p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
                Emergency Services
              </h1>
              <p className="text-white/80">
                24/7 Emergency response and ambulance services for Solapur
              </p>
            </div>
            <a href="tel:108">
              <Button size="lg" className="bg-white text-critical hover:bg-white/90 font-bold text-lg">
                <Phone className="mr-2 h-5 w-5 animate-pulse" />
                Call 108 Now
              </Button>
            </a>
          </div>
        </div>

        {/* Emergency Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {emergencyNumbers.map((item) => (
            <a key={item.name} href={`tel:${item.number}`}>
              <Card className="hover:shadow-lg transition-all cursor-pointer group">
                <CardContent className="pt-6 text-center">
                  <div className={`h-14 w-14 ${item.color} rounded-2xl mx-auto flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <item.icon className="h-7 w-7 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{item.number}</p>
                  <p className="text-sm text-muted-foreground">{item.name}</p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        {/* Ambulance Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-success/5 border-success/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-success/20 flex items-center justify-center">
                  <CheckCircle2 className="h-7 w-7 text-success" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">{availableAmbulances}</p>
                  <p className="text-sm text-muted-foreground">Available Ambulances</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-warning/5 border-warning/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-warning/20 flex items-center justify-center">
                  <Navigation className="h-7 w-7 text-warning" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">{onCallAmbulances}</p>
                  <p className="text-sm text-muted-foreground">Currently On Call</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-info/5 border-info/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-info/20 flex items-center justify-center">
                  <Clock className="h-7 w-7 text-info" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">&lt;8 min</p>
                  <p className="text-sm text-muted-foreground">Avg Response Time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Ambulance Fleet */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ambulance className="h-5 w-5 text-primary" />
                Ambulance Fleet Status
              </CardTitle>
              <CardDescription>
                Real-time tracking of all ambulances in the fleet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {emergencyServices.ambulances.map((ambulance) => (
                  <div
                    key={ambulance.id}
                    className={`p-4 rounded-xl border transition-all ${
                      ambulance.status === 'available' 
                        ? 'bg-success/5 border-success/20' 
                        : ambulance.status === 'on-call'
                        ? 'bg-warning/5 border-warning/20'
                        : 'bg-muted border-border'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                          ambulance.status === 'available' ? 'bg-success/20' :
                          ambulance.status === 'on-call' ? 'bg-warning/20' : 'bg-muted'
                        }`}>
                          {ambulance.status === 'maintenance' ? (
                            <Wrench className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <Ambulance className={`h-5 w-5 ${
                              ambulance.status === 'available' ? 'text-success' : 'text-warning'
                            }`} />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{ambulance.id}</p>
                          <p className="text-sm text-muted-foreground">{ambulance.type}</p>
                        </div>
                      </div>
                      {getStatusBadge(ambulance.status)}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{ambulance.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Emergency Calls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Siren className="h-5 w-5 text-critical" />
                Recent Emergency Calls
              </CardTitle>
              <CardDescription>
                Latest emergency calls and response status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emergencyServices.recentCalls.map((call) => (
                  <div
                    key={call.id}
                    className="p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                          call.type.includes('Cardiac') ? 'bg-critical/20' :
                          call.type.includes('Accident') ? 'bg-warning/20' :
                          call.type.includes('Pregnancy') ? 'bg-success/20' :
                          'bg-info/20'
                        }`}>
                          {call.type.includes('Cardiac') ? <HeartPulse className="h-4 w-4 text-critical" /> :
                           call.type.includes('Accident') ? <Car className="h-4 w-4 text-warning" /> :
                           call.type.includes('Pregnancy') ? <Baby className="h-4 w-4 text-success" /> :
                           <Activity className="h-4 w-4 text-info" />}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{call.type}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {call.time}
                          </p>
                        </div>
                      </div>
                      {getCallStatusBadge(call.status)}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {call.location}
                      </span>
                      <span className="text-primary font-medium">{call.ambulance}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Guidelines */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Emergency Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Stay Calm", desc: "Take a deep breath and assess the situation clearly" },
                { title: "Call 108", desc: "Dial emergency number and provide clear location details" },
                { title: "First Aid", desc: "Apply basic first aid if trained, don't move injured" },
                { title: "Wait for Help", desc: "Stay with the patient until ambulance arrives" },
              ].map((item, index) => (
                <div key={item.title} className="bg-muted/50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <h4 className="font-semibold text-foreground">{item.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
