"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { OrderStatusBadge } from "@/components/dashboard/OrderStatusBadge";
import { getTodayStats, getOrders } from "@/lib/firebase/orders";
import { getActiveDriversCount } from "@/lib/firebase/drivers";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";
import type { Order } from "@/types";
import { ShoppingBag, DollarSign, Users, TrendingUp, Loader2 } from "lucide-react";

const statsConfig = [
  {
    title: "Today's Orders",
    key: "todayOrders",
    icon: ShoppingBag,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Today's Revenue",
    key: "todayRevenue",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Active Drivers",
    key: "activeDrivers",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Total Orders",
    key: "totalOrders",
    icon: TrendingUp,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
];

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    todayOrders: 0,
    todayRevenue: 0,
    activeDrivers: "0 / 0",
    totalOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Load today's stats
      const todayData = await getTodayStats();

      // Load active drivers
      const driversData = await getActiveDriversCount();

      // Load all orders for total count
      const allOrders = await getOrders();

      // Load recent orders (last 5)
      const recent = allOrders.slice(0, 5);

      setStats({
        todayOrders: todayData.ordersCount,
        todayRevenue: todayData.revenue,
        activeDrivers: `${driversData.active} / ${driversData.total}`,
        totalOrders: allOrders.length,
      });

      setRecentOrders(recent);
    } catch (error) {
      console.error("Error loading dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsConfig.map((stat) => {
          const Icon = stat.icon;
          const value = stat.key === "todayRevenue" ? formatCurrency(stats[stat.key] as number) : stats[stat.key as keyof typeof stats];

          return (
            <Card key={stat.title} className="stat-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold">{value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {recentOrders.length === 0 ? (
            <p className="text-center py-8 text-gray-500">No orders yet</p>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="font-mono text-sm font-medium text-gray-600">#{order.id.slice(0, 8)}</div>
                    <div>
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-sm text-gray-500">{formatRelativeTime(order.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold">{formatCurrency(order.total)}</span>
                    <OrderStatusBadge status={order.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <ShoppingBag className="h-8 w-8 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold mb-1">View All Orders</h3>
            <p className="text-sm text-gray-600">Manage and track orders</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold mb-1">Manage Drivers</h3>
            <p className="text-sm text-gray-600">View driver performance</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold mb-1">View Reports</h3>
            <p className="text-sm text-gray-600">Analytics and insights</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
