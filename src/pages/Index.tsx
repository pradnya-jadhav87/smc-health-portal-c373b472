import { Link } from "react-router-dom";
import { 
  Activity, 
  Shield, 
  Building2, 
  Users, 
  Ambulance, 
  BarChart3,
  ArrowRight,
  Phone,
  CheckCircle2,
  Stethoscope,
  Syringe,
  Video,
  FileText,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { dashboardStats, healthAlerts } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: BarChart3,
    title: "Real-time Dashboard",
    description: "Comprehensive health metrics and ward-wise analytics at your fingertips"
  },
  {
    icon: Shield,
    title: "Disease Surveillance",
    description: "Early outbreak detection with predictive analytics and real-time monitoring"
  },
  {
    icon: Building2,
    title: "Hospital Management",
    description: "Track bed availability, equipment status, and medicine stocks across facilities"
  },
  {
    icon: Users,
    title: "Citizen Services",
    description: "Digital appointments, vaccination booking, and telemedicine consultations"
  },
  {
    icon: Ambulance,
    title: "Emergency Response",
    description: "Real-time ambulance tracking and emergency coordination system"
  },
  {
    icon: Activity,
    title: "Health Analytics",
    description: "Data-driven insights for better healthcare planning and resource allocation"
  },
];

const services = [
  { icon: Stethoscope, title: "Book Appointment", link: "/services" },
  { icon: Syringe, title: "Vaccination", link: "/services" },
  { icon: Video, title: "Telemedicine", link: "/services" },
  { icon: FileText, title: "Health Records", link: "/services" },
];

export default function Index() {
  const getAlertBadgeVariant = (type: string) => {
    switch (type) {
      case "critical": return "destructive";
      case "warning": return "secondary";
      case "success": return "default";
      default: return "outline";
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
              Solapur Municipal Corporation
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
              Smart Public Health
              <br />
              <span className="text-white/90">Management System</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Integrated digital health ecosystem for improved healthcare accessibility, 
              disease surveillance, and citizen engagement through real-time solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg">
                <Link to="/dashboard">
                  View Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white/30 bg-white/10 text-white hover:bg-white/20 font-semibold">
                <Link to="/services">
                  Citizen Services
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { label: "Population Covered", value: "12.4L+" },
              { label: "Health Centers", value: "47" },
              { label: "Vaccinated", value: "89%" },
              { label: "Active Cases", value: dashboardStats.activeCases.toLocaleString() },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="bg-critical/10 border-b border-critical/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2 text-critical">
              <Phone className="h-5 w-5 animate-pulse" />
              <span className="font-semibold">Emergency Helpline</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="tel:108" className="text-lg font-bold text-critical hover:underline">108 (Ambulance)</a>
              <span className="text-muted-foreground">|</span>
              <a href="tel:104" className="text-lg font-bold text-critical hover:underline">104 (Health Helpline)</a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Services */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {services.map((service) => (
              <Link
                key={service.title}
                to={service.link}
                className="flex items-center gap-3 px-6 py-3 bg-card rounded-xl border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="font-medium text-foreground">{service.title}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Comprehensive Health Management
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              An integrated platform addressing all aspects of public health management 
              for Solapur Municipal Corporation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Health Alerts Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                Latest Health Alerts
              </h2>
              <p className="text-muted-foreground mt-1">Stay informed about health updates in your area</p>
            </div>
            <Button asChild variant="outline">
              <Link to="/surveillance">View All</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {healthAlerts.slice(0, 4).map((alert) => (
              <div
                key={alert.id}
                className="bg-card rounded-xl p-5 border border-border hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <Badge variant={getAlertBadgeVariant(alert.type)}>
                    {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{alert.timestamp}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">{alert.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{alert.message}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Building2 className="h-4 w-4" />
                  <span>{alert.ward}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Data-Driven Healthcare for a Healthier Solapur
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our Smart Public Health Management System leverages technology to provide 
                real-time insights, improve accessibility, and enable proactive healthcare 
                management for all citizens of Solapur.
              </p>
              <div className="space-y-4">
                {[
                  "Real-time disease surveillance and outbreak detection",
                  "Ward-wise health data visualization",
                  "24/7 emergency response coordination",
                  "Digital health records and telemedicine",
                  "Vaccination management and tracking",
                  "Hospital resource monitoring",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card rounded-2xl p-6 shadow-lg">
                    <Activity className="h-8 w-8 text-primary mb-3" />
                    <p className="text-3xl font-bold text-foreground">98%</p>
                    <p className="text-sm text-muted-foreground">System Uptime</p>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-lg">
                    <Users className="h-8 w-8 text-success mb-3" />
                    <p className="text-3xl font-bold text-foreground">50K+</p>
                    <p className="text-sm text-muted-foreground">Monthly Users</p>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-lg">
                    <Ambulance className="h-8 w-8 text-critical mb-3" />
                    <p className="text-3xl font-bold text-foreground">&lt;8 min</p>
                    <p className="text-sm text-muted-foreground">Avg Response Time</p>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-lg">
                    <Shield className="h-8 w-8 text-info mb-3" />
                    <p className="text-3xl font-bold text-foreground">100%</p>
                    <p className="text-sm text-muted-foreground">Data Security</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Access Healthcare Services Online
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Book appointments, check vaccination slots, consult doctors online, 
            and access your health records from anywhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
              <Link to="/services">
                Explore Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-white/30 bg-white/10 text-white hover:bg-white/20">
              <Link to="/emergency">Emergency Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
