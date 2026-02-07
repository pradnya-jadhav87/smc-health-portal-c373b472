import { 
  Users, 
  Activity, 
  Syringe, 
  Building2, 
  BedDouble, 
  Ambulance,
  Stethoscope,
  Phone,
  TrendingUp,
  AlertTriangle,
  MapPin
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { StatCard } from "@/components/ui/stat-card";
import { 
  dashboardStats, 
  wardHealthData, 
  diseaseOutbreakData,
  weeklyTrends,
  healthAlerts 
} from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";

const COLORS = ['#0d9488', '#0ea5e9', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function Dashboard() {
  const pieData = [
    { name: 'First Dose', value: 892000 },
    { name: 'Second Dose', value: 756000 },
    { name: 'Booster', value: 234000 },
    { name: 'Unvaccinated', value: 363000 },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Public Health Dashboard
          </h1>
          <p className="text-muted-foreground">
            Real-time health metrics and analytics for Solapur Municipal Corporation
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Population"
            value={dashboardStats.totalPopulation.toLocaleString()}
            icon={<Users className="h-6 w-6" />}
            variant="info"
          />
          <StatCard
            title="Active Cases"
            value={dashboardStats.activeCases.toLocaleString()}
            icon={<Activity className="h-6 w-6" />}
            trend={{ value: -12, label: "vs last week" }}
            variant="warning"
          />
          <StatCard
            title="Vaccinated"
            value={`${Math.round((dashboardStats.vaccinated / dashboardStats.totalPopulation) * 100)}%`}
            icon={<Syringe className="h-6 w-6" />}
            trend={{ value: 2.5, label: "this month" }}
            variant="success"
          />
          <StatCard
            title="Health Centers"
            value={dashboardStats.healthCenters}
            icon={<Building2 className="h-6 w-6" />}
            variant="default"
          />
        </div>

        {/* Second Row Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Hospital Beds"
            value={dashboardStats.hospitalBeds.toLocaleString()}
            icon={<BedDouble className="h-6 w-6" />}
            variant="default"
          />
          <StatCard
            title="Ambulances Active"
            value={dashboardStats.ambulances}
            icon={<Ambulance className="h-6 w-6" />}
            variant="critical"
          />
          <StatCard
            title="Doctors Available"
            value={dashboardStats.doctorsAvailable}
            icon={<Stethoscope className="h-6 w-6" />}
            variant="success"
          />
          <StatCard
            title="Emergency Calls Today"
            value={dashboardStats.emergencyCalls}
            icon={<Phone className="h-6 w-6" />}
            trend={{ value: 8, label: "vs yesterday" }}
            variant="warning"
          />
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Disease Outbreak Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Disease Outbreak Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={diseaseOutbreakData}>
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
                  <Line type="monotone" dataKey="dengue" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="malaria" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="covid" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="typhoid" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Weekly Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Weekly Health Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="cases" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="recovered" fill="#0d9488" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="tests" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Ward Data & Vaccination */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Ward Health Data */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Ward-wise Health Indicators
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Ward</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Population</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Active Cases</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Recovered</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Vaccinated %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wardHealthData.map((ward) => (
                      <tr key={ward.ward} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4 font-medium">{ward.ward}</td>
                        <td className="text-right py-3 px-4">{ward.population.toLocaleString()}</td>
                        <td className="text-right py-3 px-4">
                          <Badge variant={ward.activeCases > 150 ? "destructive" : "secondary"}>
                            {ward.activeCases}
                          </Badge>
                        </td>
                        <td className="text-right py-3 px-4 text-success">{ward.recovered}</td>
                        <td className="text-right py-3 px-4">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full" 
                                style={{ width: `${ward.vaccinated}%` }}
                              />
                            </div>
                            <span className="text-sm">{ward.vaccinated}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Vaccination Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Syringe className="h-5 w-5 text-primary" />
                Vaccination Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => value.toLocaleString()}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {pieData.map((item, index) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Health Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Active Health Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
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
                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {alert.ward}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
