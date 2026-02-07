import { useState } from "react";
import { 
  BarChart3, 
  Download, 
  Calendar, 
  FileText,
  Filter,
  TrendingUp,
  Users,
  Activity,
  Syringe,
  Building2
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { wardHealthData, diseaseOutbreakData, weeklyTrends } from "@/data/mockData";
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

const COLORS = ['#0d9488', '#0ea5e9', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const reportTypes = [
  { id: 1, name: "Monthly Health Summary", type: "Summary", date: "Dec 2024", size: "2.4 MB" },
  { id: 2, name: "Disease Surveillance Report", type: "Surveillance", date: "Dec 2024", size: "1.8 MB" },
  { id: 3, name: "Vaccination Progress Report", type: "Vaccination", date: "Dec 2024", size: "1.2 MB" },
  { id: 4, name: "Hospital Infrastructure Status", type: "Infrastructure", date: "Dec 2024", size: "3.1 MB" },
  { id: 5, name: "Ward-wise Analysis", type: "Analysis", date: "Dec 2024", size: "2.7 MB" },
  { id: 6, name: "Emergency Response Analytics", type: "Emergency", date: "Dec 2024", size: "1.5 MB" },
];

const monthlyData = [
  { month: "Jul", cases: 1234, recovered: 1089, vaccinations: 45000 },
  { month: "Aug", cases: 1456, recovered: 1234, vaccinations: 52000 },
  { month: "Sep", cases: 1123, recovered: 1345, vaccinations: 48000 },
  { month: "Oct", cases: 987, recovered: 1123, vaccinations: 55000 },
  { month: "Nov", cases: 876, recovered: 1045, vaccinations: 42000 },
  { month: "Dec", cases: 1847, recovered: 1567, vaccinations: 38000 },
];

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [selectedWard, setSelectedWard] = useState("all");

  const wardDistribution = wardHealthData.map(ward => ({
    name: ward.ward,
    value: ward.population,
    cases: ward.activeCases
  }));

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
              Reports & Analytics
            </h1>
            <p className="text-muted-foreground">
              Comprehensive health data reports and visualizations
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedWard} onValueChange={setSelectedWard}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Wards</SelectItem>
                {wardHealthData.map(ward => (
                  <SelectItem key={ward.ward} value={ward.ward}>{ward.ward}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">-12%</p>
                  <p className="text-sm text-muted-foreground">Case Trend</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-success/5 border-success/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-success" />
                <div>
                  <p className="text-2xl font-bold">89%</p>
                  <p className="text-sm text-muted-foreground">Recovery Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-info/5 border-info/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Syringe className="h-8 w-8 text-info" />
                <div>
                  <p className="text-2xl font-bold">72%</p>
                  <p className="text-sm text-muted-foreground">Vaccinated</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-warning/5 border-warning/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Building2 className="h-8 w-8 text-warning" />
                <div>
                  <p className="text-2xl font-bold">47</p>
                  <p className="text-sm text-muted-foreground">Active Centers</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="charts" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="charts">Visual Analytics</TabsTrigger>
            <TabsTrigger value="downloads">Download Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="charts" className="space-y-6">
            {/* Charts Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Monthly Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Monthly Health Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData}>
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
                      <Line type="monotone" dataKey="cases" stroke="#ef4444" strokeWidth={2} name="New Cases" />
                      <Line type="monotone" dataKey="recovered" stroke="#0d9488" strokeWidth={2} name="Recovered" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Vaccination Trend */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Syringe className="h-5 w-5 text-primary" />
                    Vaccination Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip 
                        formatter={(value: number) => value.toLocaleString()}
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }} 
                      />
                      <Bar dataKey="vaccinations" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="Vaccinations" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Disease Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Disease Distribution by Month
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={diseaseOutbreakData}>
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
                      <Bar dataKey="dengue" stackId="a" fill="#f59e0b" name="Dengue" />
                      <Bar dataKey="malaria" stackId="a" fill="#0ea5e9" name="Malaria" />
                      <Bar dataKey="covid" stackId="a" fill="#ef4444" name="COVID-19" />
                      <Bar dataKey="typhoid" stackId="a" fill="#8b5cf6" name="Typhoid" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Ward Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Population by Ward
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={wardDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name }) => name}
                        labelLine={false}
                      >
                        {wardDistribution.map((_, index) => (
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
                </CardContent>
              </Card>
            </div>

            {/* Weekly Summary Table */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Day</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">New Cases</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">Recovered</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">Tests Done</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">Positivity Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {weeklyTrends.map((day) => (
                        <tr key={day.day} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                          <td className="py-3 px-4 font-medium">{day.day}</td>
                          <td className="text-right py-3 px-4 text-critical">{day.cases}</td>
                          <td className="text-right py-3 px-4 text-success">{day.recovered}</td>
                          <td className="text-right py-3 px-4">{day.tests.toLocaleString()}</td>
                          <td className="text-right py-3 px-4">
                            <Badge variant={day.cases / day.tests > 0.15 ? "destructive" : "default"}>
                              {((day.cases / day.tests) * 100).toFixed(1)}%
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="downloads" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Available Reports
                </CardTitle>
                <CardDescription>
                  Download detailed reports in PDF format
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reportTypes.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{report.name}</h4>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <Badge variant="outline">{report.type}</Badge>
                            <span>{report.date}</span>
                            <span>{report.size}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Custom Report Generator */}
            <Card>
              <CardHeader>
                <CardTitle>Generate Custom Report</CardTitle>
                <CardDescription>
                  Create customized reports based on your requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Report Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="health">Health Summary</SelectItem>
                        <SelectItem value="disease">Disease Report</SelectItem>
                        <SelectItem value="vaccination">Vaccination Report</SelectItem>
                        <SelectItem value="hospital">Hospital Status</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Time Period</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="week">Last Week</SelectItem>
                        <SelectItem value="month">Last Month</SelectItem>
                        <SelectItem value="quarter">Last Quarter</SelectItem>
                        <SelectItem value="year">Last Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Ward</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select ward" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Wards</SelectItem>
                        {wardHealthData.map(ward => (
                          <SelectItem key={ward.ward} value={ward.ward}>{ward.ward}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Format</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
