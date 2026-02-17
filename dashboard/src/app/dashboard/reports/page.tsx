"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { getOrders } from "@/lib/firebase/orders";
import { getDrivers } from "@/lib/firebase/drivers";
import { formatCurrency } from "@/lib/utils";
import { Download, Calendar, TrendingUp, DollarSign, ShoppingBag, Users, Loader2 } from "lucide-react";

export default function ReportsPage() {
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<"today" | "week" | "month" | "year">("month");
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    avgOrderValue: 0,
    totalDrivers: 0,
    completedOrders: 0,
    cancelledOrders: 0,
  });

  useEffect(() => {
    loadReports();
  }, [period]);

  const loadReports = async () => {
    setLoading(true);
    try {
      const orders = await getOrders();
      const drivers = await getDrivers();

      // Calculate stats
      const completed = orders.filter((o) => o.status === "DELIVERED");
      const cancelled = orders.filter((o) => o.status === "CANCELLED");
      const totalRevenue = completed.reduce((sum, o) => sum + o.total, 0);
      const avgOrderValue = completed.length > 0 ? totalRevenue / completed.length : 0;

      setStats({
        totalOrders: orders.length,
        totalRevenue,
        avgOrderValue,
        totalDrivers: drivers.length,
        completedOrders: completed.length,
        cancelledOrders: cancelled.length,
      });
    } catch (error) {
      console.error("Error loading reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const exportReport = () => {
    // Export CSV
    const csvData = [
      ["Metric", "Value"],
      ["Total Orders", stats.totalOrders],
      ["Completed Orders", stats.completedOrders],
      ["Cancelled Orders", stats.cancelledOrders],
      ["Total Revenue", stats.totalRevenue],
      ["Average Order Value", stats.avgOrderValue.toFixed(2)],
      ["Total Drivers", stats.totalDrivers],
    ];

    const csv = csvData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `report-${period}-${new Date().toISOString()}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">View business insights and performance metrics</p>
        </div>
        <div className="flex gap-3">
          <Select value={period} onChange={(e) => setPeriod(e.target.value as any)} className="w-40">
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </Select>
          <Button onClick={exportReport}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-blue-50">
                    <ShoppingBag className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                  <p className="text-3xl font-bold">{stats.totalOrders}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-green-50">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                  <p className="text-3xl font-bold">{formatCurrency(stats.totalRevenue)}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-purple-50">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Avg Order Value</p>
                  <p className="text-3xl font-bold">{formatCurrency(stats.avgOrderValue)}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-green-50">
                    <ShoppingBag className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Completed Orders</p>
                  <p className="text-3xl font-bold text-green-600">{stats.completedOrders}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-red-50">
                    <ShoppingBag className="h-6 w-6 text-red-600" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Cancelled Orders</p>
                  <p className="text-3xl font-bold text-red-600">{stats.cancelledOrders}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-orange-50">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Drivers</p>
                  <p className="text-3xl font-bold">{stats.totalDrivers}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Completion Rate</p>
                    <p className="text-sm text-gray-600">{stats.totalOrders > 0 ? ((stats.completedOrders / stats.totalOrders) * 100).toFixed(1) : 0}% of orders completed</p>
                  </div>
                  <div className="text-2xl font-bold text-green-600">{stats.totalOrders > 0 ? ((stats.completedOrders / stats.totalOrders) * 100).toFixed(1) : 0}%</div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Cancellation Rate</p>
                    <p className="text-sm text-gray-600">{stats.totalOrders > 0 ? ((stats.cancelledOrders / stats.totalOrders) * 100).toFixed(1) : 0}% of orders cancelled</p>
                  </div>
                  <div className="text-2xl font-bold text-red-600">{stats.totalOrders > 0 ? ((stats.cancelledOrders / stats.totalOrders) * 100).toFixed(1) : 0}%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
