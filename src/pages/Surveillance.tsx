import { useState } from "react";
import { 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  MapPin,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Bug,
  Droplets,
  Wind,
  Thermometer
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import { diseaseOutbreakData, wardHealthData, healthAlerts } from "@/data/mockData";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const diseases = [
  { name: "Dengue", icon: Bug, cases: 234, trend: 12, status: "high", color: "#f59e0b" },
  { name: "Malaria", icon: Droplets, cases: 112, trend: -8, status: "moderate", color: "#0ea5e9" },
  { name: "COVID-19", icon: Wind, cases: 28, trend: -45, status: "low", color: "#ef4444" },
  { name: "Typhoid", icon: Thermometer, cases: 31, trend: 5, status: "moderate", color: "#8b5cf6" },
];

const riskZones = [
  { ward: "Ward 3", risk: "high", cases: 156, disease: "Dengue", action: "Fumigation scheduled" },
  { ward: "Ward 7", risk: "high", cases: 178, disease: "Dengue", action: "Community awareness drive" },
  { ward: "Ward 5", risk: "moderate", cases: 89, disease: "Malaria", action: "Water source inspection" },
  { ward: "Ward 1", risk: "moderate", cases: 67, disease: "Mixed", action: "Surveillance increased" },
  { ward: "Ward 8", risk: "low", cases: 45, disease: "COVID-19", action: "Monitoring" },
];

export default function Surveillance() {
  const [selectedPeriod, setSelectedPeriod] = useState("30days");
  const [selectedDisease, setSelectedDisease] = useState("all");

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "high": return <Badge variant="destructive">High Risk</Badge>;
      case "moderate": return <Badge className="bg-warning text-warning-foreground">Moderate</Badge>;
      case "low": return <Badge className="bg-success text-success-foreground">Low</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
              Disease Surveillance
            </h1>
            <p className="text-muted-foreground">
              Real-time disease monitoring and outbreak detection system
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Disease Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {diseases.map((disease) => (
            <StatCard
              key={disease.name}
              title={disease.name}
              value={disease.cases}
              icon={<disease.icon className="h-6 w-6" />}
              trend={{ 
                value: disease.trend, 
                label: "vs last month" 
              }}
              variant={
                disease.status === "high" ? "critical" : 
                disease.status === "moderate" ? "warning" : 
                "success"
              }
            />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Outbreak Trend */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Disease Trend Analysis
                </CardTitle>
                <Select value={selectedDisease} onValueChange={setSelectedDisease}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Diseases</SelectItem>
                    <SelectItem value="dengue">Dengue</SelectItem>
                    <SelectItem value="malaria">Malaria</SelectItem>
                    <SelectItem value="covid">COVID-19</SelectItem>
                    <SelectItem value="typhoid">Typhoid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={diseaseOutbreakData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="dengue" 
                    stackId="1" 
                    stroke="#f59e0b" 
                    fill="#f59e0b" 
                    fillOpacity={0.6} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="malaria" 
                    stackId="1" 
                    stroke="#0ea5e9" 
                    fill="#0ea5e9" 
                    fillOpacity={0.6} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="covid" 
                    stackId="1" 
                    stroke="#ef4444" 
                    fill="#ef4444" 
                    fillOpacity={0.6} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="typhoid" 
                    stackId="1" 
                    stroke="#8b5cf6" 
                    fill="#8b5cf6" 
                    fillOpacity={0.6} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Predictive Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Predictive Outbreak Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-warning/10 border border-warning/20 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground">Dengue Outbreak Prediction</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Based on current trends and seasonal patterns, a 35% increase in dengue 
                        cases is predicted for the next 2 weeks in Ward 3 and Ward 7.
                      </p>
                      <div className="flex gap-2 mt-3">
                        <Badge variant="outline">Monsoon Season</Badge>
                        <Badge variant="outline">High Breeding Index</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-info/10 border border-info/20 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <TrendingDown className="h-5 w-5 text-info mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground">COVID-19 Trend</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        COVID-19 cases showing steady decline. Current positivity rate at 1.2%. 
                        No surge expected based on current data.
                      </p>
                      <div className="flex gap-2 mt-3">
                        <Badge variant="outline">Low Positivity</Badge>
                        <Badge variant="outline">Stable</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-success/10 border border-success/20 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-success mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground">Malaria Control Success</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Malaria cases reduced by 25% following successful fumigation drives 
                        in affected wards. Continue monitoring recommended.
                      </p>
                      <div className="flex gap-2 mt-3">
                        <Badge variant="outline">Intervention Success</Badge>
                        <Badge variant="outline">Monitor</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Risk Zones & Alerts */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Risk Zones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                High-Risk Zone Identification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {riskZones.map((zone, index) => (
                  <div
                    key={zone.ward}
                    className={`p-4 rounded-xl border transition-colors ${
                      zone.risk === 'high' 
                        ? 'bg-critical/5 border-critical/20 hover:bg-critical/10' 
                        : zone.risk === 'moderate'
                        ? 'bg-warning/5 border-warning/20 hover:bg-warning/10'
                        : 'bg-success/5 border-success/20 hover:bg-success/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-foreground">{zone.ward}</span>
                        {getRiskBadge(zone.risk)}
                      </div>
                      <span className="text-lg font-bold">{zone.cases} cases</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Primary: {zone.disease}</span>
                      <span className="text-primary">{zone.action}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Active Disease Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {healthAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-xl border ${
                      alert.type === 'critical' 
                        ? 'bg-critical/5 border-critical/20' 
                        : alert.type === 'warning'
                        ? 'bg-warning/5 border-warning/20'
                        : alert.type === 'success'
                        ? 'bg-success/5 border-success/20'
                        : 'bg-info/5 border-info/20'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Badge 
                        variant={
                          alert.type === 'critical' ? 'destructive' : 
                          alert.type === 'warning' ? 'secondary' : 
                          alert.type === 'success' ? 'default' : 
                          'outline'
                        }
                      >
                        {alert.type.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">{alert.title}</h4>
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {alert.ward}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
