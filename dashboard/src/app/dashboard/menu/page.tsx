"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { getMenuItems, toggleMenuAvailability } from "@/lib/firebase/menu";
import { formatCurrency } from "@/lib/utils";
import type { MenuItem } from "@/types";
import { UtensilsCrossed, Search, RefreshCw, Plus, Edit, Loader2, Eye, EyeOff } from "lucide-react";

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");

  // Load menu items
  const loadMenuItems = async () => {
    setLoading(true);
    try {
      const data = await getMenuItems();
      setMenuItems(data);
    } catch (error) {
      console.error("Error loading menu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMenuItems();
  }, []);

  // Get unique categories
  const categories = ["ALL", ...new Set(menuItems.map((item) => item.category))];

  // Filter menu items
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "ALL" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Toggle availability
  const handleToggleAvailability = async (menuId: string, currentStatus: boolean) => {
    try {
      await toggleMenuAvailability(menuId, !currentStatus);
      await loadMenuItems();
    } catch (error) {
      console.error("Error toggling availability:", error);
      alert("Failed to update availability");
    }
  };

  // Stats
  const stats = {
    total: menuItems.length,
    available: menuItems.filter((item) => item.isAvailable).length,
    categories: new Set(menuItems.map((item) => item.category)).size,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Menu Management</h1>
          <p className="text-gray-600 mt-1">Manage restaurant menu items and categories</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={loadMenuItems}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Menu Item
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Items</p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
              <UtensilsCrossed className="h-12 w-12 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Available</p>
                <p className="text-3xl font-bold text-green-600">{stats.available}</p>
              </div>
              <Eye className="h-12 w-12 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Categories</p>
                <p className="text-3xl font-bold text-purple-600">{stats.categories}</p>
              </div>
              <UtensilsCrossed className="h-12 w-12 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search menu items..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button key={category} variant={categoryFilter === category ? "default" : "outline"} size="sm" onClick={() => setCategoryFilter(category)}>
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            <p>No menu items found</p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {/* Image */}
              <div className="aspect-video bg-gray-100 relative">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <UtensilsCrossed className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                {!item.isAvailable && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="danger">Unavailable</Badge>
                  </div>
                )}
              </div>

              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                    <Badge variant="outline">{formatCurrency(item.price)}</Badge>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>

                  <div className="flex items-center gap-2 text-sm">
                    <span>⭐ {item.rating?.toFixed(1) || "0.0"}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600">{item.reviewCount || 0} reviews</span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => handleToggleAvailability(item.id, item.isAvailable)}>
                      {item.isAvailable ? (
                        <>
                          <EyeOff className="mr-2 h-4 w-4" />
                          Hide
                        </>
                      ) : (
                        <>
                          <Eye className="mr-2 h-4 w-4" />
                          Show
                        </>
                      )}
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
