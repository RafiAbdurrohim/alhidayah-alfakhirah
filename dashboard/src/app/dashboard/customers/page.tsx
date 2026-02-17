"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { getCustomers, getCustomerOrders } from "@/lib/firebase/customers";
import { formatPhoneNumber, formatDate } from "@/lib/utils";
import type { User } from "@/types";
import { Users, Search, RefreshCw, Eye, Loader2, ShoppingBag, Calendar } from "lucide-react";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<User | null>(null);
  const [customerOrders, setCustomerOrders] = useState<any[]>([]);

  // Load customers
  const loadCustomers = async () => {
    setLoading(true);
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error("Error loading customers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  // Filter customers by search
  const filteredCustomers = customers.filter((customer) => {
    const query = searchQuery.toLowerCase();
    return customer.name.toLowerCase().includes(query) || customer.phone.includes(query) || customer.email.toLowerCase().includes(query);
  });

  // View customer details
  const handleViewCustomer = async (customer: User) => {
    setSelectedCustomer(customer);
    const orders = await getCustomerOrders(customer.uid);
    setCustomerOrders(orders);
  };

  // Stats
  const stats = {
    total: customers.length,
    active: customers.filter((c) => c.isActive !== false).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Customers Analytics</h1>
          <p className="text-gray-600 mt-1">View and manage customer information</p>
        </div>
        <Button variant="outline" onClick={loadCustomers}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Customers</p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
              <Users className="h-12 w-12 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Customers</p>
                <p className="text-3xl font-bold">{stats.active}</p>
              </div>
              <ShoppingBag className="h-12 w-12 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search by name, phone, or email..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customers List ({filteredCustomers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredCustomers.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No customers found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Phone</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Joined</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.uid} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">{customer.name.charAt(0).toUpperCase()}</div>
                          <span className="font-medium">{customer.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{formatPhoneNumber(customer.phone)}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{customer.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{customer.createdAt ? formatDate(customer.createdAt, "PP") : "N/A"}</td>
                      <td className="px-4 py-3">
                        <Button size="sm" variant="ghost" onClick={() => handleViewCustomer(customer)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setSelectedCustomer(null)}>
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4">Customer Details</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Personal Information</h3>
                <p>Name: {selectedCustomer.name}</p>
                <p>Phone: {formatPhoneNumber(selectedCustomer.phone)}</p>
                <p>Email: {selectedCustomer.email}</p>
                <p>Joined: {selectedCustomer.createdAt ? formatDate(selectedCustomer.createdAt, "PPP") : "N/A"}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Order History ({customerOrders.length})</h3>
                {customerOrders.length === 0 ? (
                  <p className="text-gray-500 text-sm">No orders yet</p>
                ) : (
                  <div className="space-y-2">
                    {customerOrders.map((order: any) => (
                      <div key={order.id} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-mono text-sm">#{order.id.slice(0, 8)}</span>
                        <span className="font-semibold">{order.total} SAR</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={() => setSelectedCustomer(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
