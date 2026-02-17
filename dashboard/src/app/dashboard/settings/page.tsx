"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useAuthStore } from "@/lib/hooks/useAuth";
import { User, Bell, Shield, Database, Save, RefreshCw } from "lucide-react";

export default function SettingsPage() {
  const { user } = useAuthStore();
  const [saving, setSaving] = useState(false);

  // Profile settings
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    newOrders: true,
    orderUpdates: true,
    driverStatus: true,
    systemUpdates: false,
  });

  // System settings
  const [system, setSystem] = useState({
    deliveryFee: 10,
    minSubtotal: 50,
    currency: "SAR",
    timezone: "Asia/Riyadh",
  });

  const handleSaveProfile = async () => {
    setSaving(true);
    // Simulate save
    setTimeout(() => {
      setSaving(false);
      alert("Profile updated successfully!");
    }, 1000);
  };

  const handleSaveNotifications = async () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert("Notification settings updated!");
    }, 1000);
  };

  const handleSaveSystem = async () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert("System settings updated!");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account and system preferences</p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <CardTitle>Profile Settings</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Full Name</label>
              <Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="Enter your name" />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Email Address</label>
              <Input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} placeholder="Enter your email" disabled />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Phone Number</label>
              <Input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} placeholder="Enter your phone" />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button onClick={handleSaveProfile} disabled={saving}>
                <Save className="mr-2 h-4 w-4" />
                {saving ? "Saving..." : "Save Profile"}
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  setProfile({
                    name: user?.name || "",
                    email: user?.email || "",
                    phone: user?.phone || "",
                  })
                }
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle>Notification Preferences</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">New Orders</p>
                <p className="text-sm text-gray-600">Get notified when new orders arrive</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={notifications.newOrders} onChange={(e) => setNotifications({ ...notifications, newOrders: e.target.checked })} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Order Updates</p>
                <p className="text-sm text-gray-600">Get notified about order status changes</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={notifications.orderUpdates} onChange={(e) => setNotifications({ ...notifications, orderUpdates: e.target.checked })} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Driver Status</p>
                <p className="text-sm text-gray-600">Get notified about driver availability</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={notifications.driverStatus} onChange={(e) => setNotifications({ ...notifications, driverStatus: e.target.checked })} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">System Updates</p>
                <p className="text-sm text-gray-600">Get notified about system maintenance</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={notifications.systemUpdates} onChange={(e) => setNotifications({ ...notifications, systemUpdates: e.target.checked })} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="pt-2">
              <Button onClick={handleSaveNotifications} disabled={saving}>
                <Save className="mr-2 h-4 w-4" />
                {saving ? "Saving..." : "Save Preferences"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            <CardTitle>System Configuration</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Default Delivery Fee</label>
                <div className="flex gap-2">
                  <Input type="number" value={system.deliveryFee} onChange={(e) => setSystem({ ...system, deliveryFee: parseInt(e.target.value) })} />
                  <span className="flex items-center px-3 border rounded-lg bg-gray-50">SAR</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Minimum Subtotal</label>
                <div className="flex gap-2">
                  <Input type="number" value={system.minSubtotal} onChange={(e) => setSystem({ ...system, minSubtotal: parseInt(e.target.value) })} />
                  <span className="flex items-center px-3 border rounded-lg bg-gray-50">SAR</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Currency</label>
                <Select value={system.currency} onChange={(e) => setSystem({ ...system, currency: e.target.value })}>
                  <option value="SAR">SAR (Saudi Riyal)</option>
                  <option value="USD">USD (US Dollar)</option>
                  <option value="EUR">EUR (Euro)</option>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Timezone</label>
                <Select value={system.timezone} onChange={(e) => setSystem({ ...system, timezone: e.target.value })}>
                  <option value="Asia/Riyadh">Riyadh (GMT+3)</option>
                  <option value="Asia/Dubai">Dubai (GMT+4)</option>
                  <option value="UTC">UTC (GMT+0)</option>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button onClick={handleSaveSystem} disabled={saving}>
                <Save className="mr-2 h-4 w-4" />
                {saving ? "Saving..." : "Save System Settings"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>Security</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="font-medium mb-2">Password</p>
              <p className="text-sm text-gray-600 mb-4">Change your password to keep your account secure</p>
              <Button variant="outline">Change Password</Button>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="font-medium mb-2">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600 mb-4">Add an extra layer of security to your account</p>
              <Button variant="outline">Enable 2FA</Button>
            </div>

            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="font-medium text-red-800 mb-2">Danger Zone</p>
              <p className="text-sm text-red-600 mb-4">Once you delete your account, there is no going back</p>
              <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-100">
                Delete Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
