import { useState } from "react";
import { 
  Building2, 
  BedDouble, 
  Wind, 
  Pill,
  Phone,
  MapPin,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Package
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { StatCard } from "@/components/ui/stat-card";
import { Progress } from "@/components/ui/progress";
import { hospitals, medicineStock } from "@/data/mockData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Hospitals() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hospital.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || hospital.type.toLowerCase() === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalBeds = hospitals.reduce((sum, h) => sum + h.totalBeds, 0);
  const availableBeds = hospitals.reduce((sum, h) => sum + h.availableBeds, 0);
  const totalICU = hospitals.reduce((sum, h) => sum + h.icuBeds, 0);
  const totalVentilators = hospitals.reduce((sum, h) => sum + h.ventilators, 0);

  const getOxygenBadge = (status: string) => {
    switch (status) {
      case "Adequate": return <Badge className="bg-success text-success-foreground">Adequate</Badge>;
      case "Low": return <Badge className="bg-warning text-warning-foreground">Low</Badge>;
      case "Critical": return <Badge variant="destructive">Critical</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStockBadge = (status: string) => {
    switch (status) {
      case "adequate": return <Badge className="bg-success text-success-foreground">Adequate</Badge>;
      case "low": return <Badge className="bg-warning text-warning-foreground">Low Stock</Badge>;
      case "critical": return <Badge variant="destructive">Critical</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Hospital Infrastructure
          </h1>
          <p className="text-muted-foreground">
            Real-time monitoring of hospital resources, beds, and medical supplies
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Hospitals"
            value={hospitals.length}
            icon={<Building2 className="h-6 w-6" />}
            variant="info"
          />
          <StatCard
            title="Available Beds"
            value={`${availableBeds} / ${totalBeds}`}
            icon={<BedDouble className="h-6 w-6" />}
            variant={availableBeds < totalBeds * 0.2 ? "critical" : "success"}
          />
          <StatCard
            title="ICU Beds"
            value={totalICU}
            icon={<Wind className="h-6 w-6" />}
            variant="warning"
          />
          <StatCard
            title="Ventilators"
            value={totalVentilators}
            icon={<Wind className="h-6 w-6" />}
            variant="default"
          />
        </div>

        <Tabs defaultValue="hospitals" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="hospitals">Hospitals & Beds</TabsTrigger>
            <TabsTrigger value="inventory">Medicine Inventory</TabsTrigger>
          </TabsList>

          <TabsContent value="hospitals" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search hospitals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="government">Government</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="phc">PHC</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Hospital Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredHospitals.map((hospital) => {
                const occupancyRate = ((hospital.totalBeds - hospital.availableBeds) / hospital.totalBeds) * 100;
                
                return (
                  <Card key={hospital.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{hospital.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{hospital.type}</Badge>
                            {hospital.status === "high-demand" && (
                              <Badge variant="destructive">High Demand</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Bed Availability */}
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Bed Occupancy</span>
                          <span className="font-medium">{hospital.availableBeds} / {hospital.totalBeds} available</span>
                        </div>
                        <Progress 
                          value={occupancyRate} 
                          className={`h-2 ${occupancyRate > 80 ? '[&>div]:bg-critical' : occupancyRate > 60 ? '[&>div]:bg-warning' : '[&>div]:bg-success'}`}
                        />
                      </div>

                      {/* Resources Grid */}
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="bg-muted/50 rounded-lg p-2">
                          <p className="text-lg font-bold text-foreground">{hospital.icuBeds}</p>
                          <p className="text-xs text-muted-foreground">ICU</p>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-2">
                          <p className="text-lg font-bold text-foreground">{hospital.ventilators}</p>
                          <p className="text-xs text-muted-foreground">Ventilators</p>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-2">
                          {getOxygenBadge(hospital.oxygenStatus)}
                          <p className="text-xs text-muted-foreground mt-1">O₂</p>
                        </div>
                      </div>

                      {/* Contact */}
                      <div className="space-y-2 pt-2 border-t border-border">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{hospital.address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-primary" />
                          <a href={`tel:${hospital.phone}`} className="text-primary hover:underline">
                            {hospital.phone}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-6">
            {/* Medicine Stock Overview */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-success/5 border-success/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-success/20 flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {medicineStock.filter(m => m.status === "adequate").length}
                      </p>
                      <p className="text-sm text-muted-foreground">Adequate Stock</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-warning/5 border-warning/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-warning/20 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-warning" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {medicineStock.filter(m => m.status === "low").length}
                      </p>
                      <p className="text-sm text-muted-foreground">Low Stock Items</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-critical/5 border-critical/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-critical/20 flex items-center justify-center">
                      <AlertTriangle className="h-6 w-6 text-critical" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {medicineStock.filter(m => m.status === "critical").length}
                      </p>
                      <p className="text-sm text-muted-foreground">Critical Items</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Medicine Stock Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Medicine & Equipment Stock
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Item Name</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Category</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">Current Stock</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">Min Required</th>
                        <th className="text-center py-3 px-4 font-medium text-muted-foreground">Status</th>
                        <th className="text-center py-3 px-4 font-medium text-muted-foreground">Stock Level</th>
                      </tr>
                    </thead>
                    <tbody>
                      {medicineStock.map((item, index) => {
                        const stockPercentage = (item.stock / item.minRequired) * 100;
                        return (
                          <tr key={index} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                            <td className="py-3 px-4 font-medium">{item.name}</td>
                            <td className="py-3 px-4 text-muted-foreground">{item.category}</td>
                            <td className="text-right py-3 px-4">{item.stock.toLocaleString()}</td>
                            <td className="text-right py-3 px-4 text-muted-foreground">{item.minRequired.toLocaleString()}</td>
                            <td className="text-center py-3 px-4">{getStockBadge(item.status)}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <Progress 
                                  value={Math.min(stockPercentage, 100)} 
                                  className={`h-2 w-24 ${
                                    stockPercentage < 50 ? '[&>div]:bg-critical' : 
                                    stockPercentage < 80 ? '[&>div]:bg-warning' : 
                                    '[&>div]:bg-success'
                                  }`}
                                />
                                <span className="text-sm text-muted-foreground w-12">
                                  {Math.round(stockPercentage)}%
                                </span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
