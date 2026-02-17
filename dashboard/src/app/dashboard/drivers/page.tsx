"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { DriverStatusBadge } from "@/components/dashboard/DriverStatusBadge";
import { DriverStatsCard } from "@/components/dashboard/DriverStatsCard";
import { getDrivers, updateDriverStatus } from "@/lib/firebase/drivers";
import { formatPhoneNumber } from "@/lib/utils";
import type { Driver, DriverStatus } from "@/types";
import { Users, TrendingUp, DollarSign, Star, Search, RefreshCw, Eye, Edit, UserPlus, Loader2 } from "lucide-react";

export default function DriversPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<DriverStatus | "ALL">("ALL");
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  // Load drivers
  const loadDrivers = async () => {
    setLoading(true);
    try {
      const filters = statusFilter !== "ALL" ? { status: statusFilter } : undefined;
      const data = await getDrivers(filters);
      setDrivers(data);
    } catch (error) {
      console.error("Error loading drivers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDrivers();
  }, [statusFilter]);

  // Filter drivers by search
  const filteredDrivers = drivers.filter((driver) => {
    const query = searchQuery.toLowerCase();
    return driver.name.toLowerCase().includes(query) || driver.phone.includes(query) || driver.vehicleNumber.toLowerCase().includes(query);
  });

  // Update driver status
  const handleStatusUpdate = async (driverId: string, newStatus: DriverStatus) => {
    try {
      await updateDriverStatus(driverId, newStatus);
      await loadDrivers(); // Reload data
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update driver status");
    }
  };

  // Calculate stats
  const stats = {
    total: drivers.length,
    available: drivers.filter((d) => d.status === "AVAILABLE").length,
    busy: drivers.filter((d) => d.status === "BUSY").length,
    totalDeliveries: drivers.reduce((sum, d) => sum + (d.totalDeliveries || 0), 0),
    avgRating: drivers.length > 0 ? (drivers.reduce((sum, d) => sum + (d.rating || 0), 0) / drivers.length).toFixed(1) : "0.0",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Drivers Management</h1>
          <p className="text-gray-600 mt-1">Manage delivery drivers and track performance</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={loadDrivers}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Driver
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <DriverStatsCard title="Total Drivers" value={stats.total} icon={Users} color="text-blue-600" bgColor="bg-blue-50" />
        <DriverStatsCard title="Available" value={stats.available} icon={TrendingUp} color="text-green-600" bgColor="bg-green-50" />
        <DriverStatsCard title="Total Deliveries" value={stats.totalDeliveries} icon={DollarSign} color="text-purple-600" bgColor="bg-purple-50" />
        <DriverStatsCard title="Avg Rating" value={stats.avgRating} icon={Star} color="text-yellow-600" bgColor="bg-yellow-50" />
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search by name, phone, or vehicle number..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
              </div>
            </div>

            {/* Status Filter */}
            <div className="w-full md:w-48">
              <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)}>
                <option value="ALL">All Status</option>
                <option value="AVAILABLE">Available</option>
                <option value="BUSY">Busy</option>
                <option value="OFFLINE">Offline</option>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Drivers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredDrivers.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            <p>No drivers found</p>
          </div>
        ) : (
          filteredDrivers.map((driver) => (
            <Card key={driver.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                {/* Driver Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">{driver.name.charAt(0).toUpperCase()}</div>
                    <div>
                      <h3 className="font-semibold">{driver.name}</h3>
                      <p className="text-sm text-gray-600">{formatPhoneNumber(driver.phone)}</p>
                    </div>
                  </div>
                  <DriverStatusBadge status={driver.status} />
                </div>

                {/* Driver Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-600">Deliveries</p>
                    <p className="text-lg font-semibold">{driver.totalDeliveries || 0}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Rating</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-semibold">{driver.rating?.toFixed(1) || "0.0"}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Vehicle</p>
                    <p className="text-sm font-medium">{driver.vehicleType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Plate</p>
                    <p className="text-sm font-medium">{driver.vehicleNumber}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => setSelectedDriver(driver)}>
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>
                  <Select value={driver.status} onChange={(e) => handleStatusUpdate(driver.id, e.target.value as DriverStatus)} className="flex-1 h-9 text-xs">
                    <option value="AVAILABLE">Available</option>
                    <option value="BUSY">Busy</option>
                    <option value="OFFLINE">Offline</option>
                  </Select>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Driver Detail Modal - Simple for now */}
      {selectedDriver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setSelectedDriver(null)}>
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4">Driver Details</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Personal Information</h3>
                <p>Name: {selectedDriver.name}</p>
                <p>Phone: {formatPhoneNumber(selectedDriver.phone)}</p>
                <p>Email: {selectedDriver.email}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Vehicle Information</h3>
                <p>Type: {selectedDriver.vehicleType}</p>
                <p>Plate Number: {selectedDriver.vehicleNumber}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Performance</h3>
                <p>Total Deliveries: {selectedDriver.totalDeliveries || 0}</p>
                <p>Monthly Deliveries: {selectedDriver.monthlyDeliveries || 0}</p>
                <p>Rating: {selectedDriver.rating?.toFixed(2) || "0.00"} ⭐</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Earnings (This Month)</h3>
                <p>Base Bonus: {selectedDriver.currentMonthEarnings?.baseBonus || 0} SAR</p>
                <p>Incentive Bonus: {selectedDriver.currentMonthEarnings?.incentiveBonus || 0} SAR</p>
                <p className="font-bold">Total: {selectedDriver.currentMonthEarnings?.total || 0} SAR</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setSelectedDriver(null)}>
                Close
              </Button>
              <Button>
                <Edit className="mr-2 h-4 w-4" />
                Edit Driver
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
