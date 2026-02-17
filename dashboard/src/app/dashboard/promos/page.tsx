"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { getPromos, togglePromoStatus, deletePromo } from "@/lib/firebase/promos";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Promo, PromoType } from "@/types";
import { Tag, Search, RefreshCw, Plus, Edit, Trash2, Loader2, ToggleLeft, ToggleRight, Percent, DollarSign, Truck } from "lucide-react";

export default function PromosPage() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"ALL" | "ACTIVE" | "INACTIVE">("ALL");

  // Load promos
  const loadPromos = async () => {
    setLoading(true);
    try {
      const data = await getPromos();
      setPromos(data);
    } catch (error) {
      console.error("Error loading promos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPromos();
  }, []);

  // Filter promos
  const filteredPromos = promos.filter((promo) => {
    const matchesSearch = promo.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "ALL" || (filterStatus === "ACTIVE" && promo.isActive) || (filterStatus === "INACTIVE" && !promo.isActive);
    return matchesSearch && matchesStatus;
  });

  // Toggle promo status
  const handleToggleStatus = async (promoId: string, currentStatus: boolean) => {
    try {
      await togglePromoStatus(promoId, !currentStatus);
      await loadPromos();
    } catch (error) {
      console.error("Error toggling promo:", error);
      alert("Failed to update promo status");
    }
  };

  // Delete promo
  const handleDelete = async (promoId: string) => {
    if (!confirm("Are you sure you want to delete this promo?")) return;

    try {
      await deletePromo(promoId);
      await loadPromos();
    } catch (error) {
      console.error("Error deleting promo:", error);
      alert("Failed to delete promo");
    }
  };

  // Get promo type icon
  const getPromoIcon = (type: PromoType) => {
    switch (type) {
      case "PERCENT":
        return <Percent className="h-5 w-5" />;
      case "FIXED":
        return <DollarSign className="h-5 w-5" />;
      case "FREE_DELIVERY":
        return <Truck className="h-5 w-5" />;
      default:
        return <Tag className="h-5 w-5" />;
    }
  };

  // Get promo value display
  const getPromoValue = (promo: Promo) => {
    switch (promo.type) {
      case "PERCENT":
        return `${promo.value}% OFF`;
      case "FIXED":
        return `${formatCurrency(promo.value)} OFF`;
      case "FREE_DELIVERY":
        return "FREE DELIVERY";
      default:
        return promo.value;
    }
  };

  // Stats
  const stats = {
    total: promos.length,
    active: promos.filter((p) => p.isActive).length,
    inactive: promos.filter((p) => !p.isActive).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Promos Management</h1>
          <p className="text-gray-600 mt-1">Create and manage promotional offers</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={loadPromos}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Promo
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Promos</p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
              <Tag className="h-12 w-12 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active</p>
                <p className="text-3xl font-bold text-green-600">{stats.active}</p>
              </div>
              <ToggleRight className="h-12 w-12 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Inactive</p>
                <p className="text-3xl font-bold text-gray-600">{stats.inactive}</p>
              </div>
              <ToggleLeft className="h-12 w-12 text-gray-600" />
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
                <Input placeholder="Search promos..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              <Button variant={filterStatus === "ALL" ? "default" : "outline"} size="sm" onClick={() => setFilterStatus("ALL")}>
                All
              </Button>
              <Button variant={filterStatus === "ACTIVE" ? "default" : "outline"} size="sm" onClick={() => setFilterStatus("ACTIVE")}>
                Active
              </Button>
              <Button variant={filterStatus === "INACTIVE" ? "default" : "outline"} size="sm" onClick={() => setFilterStatus("INACTIVE")}>
                Inactive
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Promos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredPromos.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            <p>No promos found</p>
          </div>
        ) : (
          filteredPromos.map((promo) => (
            <Card key={promo.id} className={`hover:shadow-lg transition-shadow ${!promo.isActive ? "opacity-60" : ""}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg ${promo.type === "PERCENT" ? "bg-blue-100 text-blue-600" : promo.type === "FIXED" ? "bg-green-100 text-green-600" : "bg-purple-100 text-purple-600"}`}>{getPromoIcon(promo.type)}</div>
                    <CardTitle className="text-lg">{promo.title}</CardTitle>
                  </div>
                  <Badge variant={promo.isActive ? "success" : "default"}>{promo.isActive ? "Active" : "Inactive"}</Badge>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  {/* Promo Value */}
                  <div className="text-center py-4 bg-primary/5 rounded-lg">
                    <p className="text-2xl font-bold text-primary">{getPromoValue(promo)}</p>
                  </div>

                  {promo.description && <p className="text-sm text-gray-600">{promo.description}</p>}

                  {/* Details */}
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Min Subtotal:</span>
                      <span className="font-medium">{formatCurrency(promo.minSubtotal)}</span>
                    </div>
                    {promo.type !== "FREE_DELIVERY" && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Max Discount:</span>
                        <span className="font-medium">{formatCurrency(promo.maxDiscount)}</span>
                      </div>
                    )}
                    {promo.createdAt && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Created:</span>
                        <span className="font-medium">{formatDate(promo.createdAt, "PP")}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => handleToggleStatus(promo.id, promo.isActive)}>
                      {promo.isActive ? (
                        <>
                          <ToggleLeft className="mr-2 h-4 w-4" />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <ToggleRight className="mr-2 h-4 w-4" />
                          Activate
                        </>
                      )}
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(promo.id)}>
                      <Trash2 className="h-4 w-4 text-red-600" />
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
