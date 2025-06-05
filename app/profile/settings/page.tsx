"use client";

import { useState, useEffect, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Bell, KeyRound, Mail } from 'lucide-react';

interface NotificationPreferences {
  orderUpdates: boolean;
  promotionalEmails: boolean;
  newsletter: boolean;
  securityAlerts: boolean;
}

const getStoredNotificationPreferences = (): NotificationPreferences => {
  if (typeof window !== 'undefined') {
    const prefs = localStorage.getItem('notificationPreferences');
    return prefs ? JSON.parse(prefs) : {
      orderUpdates: true,
      promotionalEmails: false,
      newsletter: false,
      securityAlerts: true,
    };
  }
  return {
    orderUpdates: true,
    promotionalEmails: false,
    newsletter: false,
    securityAlerts: true,
  };
};

const storeNotificationPreferences = (prefs: NotificationPreferences) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('notificationPreferences', JSON.stringify(prefs));
  }
};

export default function SettingsPage() {
  const [notificationPrefs, setNotificationPrefs] = useState<NotificationPreferences>(getStoredNotificationPreferences());
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [confirmNewEmail, setConfirmNewEmail] = useState('');

  useEffect(() => {
    setNotificationPrefs(getStoredNotificationPreferences());
  }, []);

  const handleNotificationToggle = (key: keyof NotificationPreferences) => {
    const updatedPrefs = { ...notificationPrefs, [key]: !notificationPrefs[key] };
    setNotificationPrefs(updatedPrefs);
    storeNotificationPreferences(updatedPrefs);
    alert('Notification preferences saved!');
  };

  const handlePasswordChange = (e: FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert("New passwords don't match!");
      return;
    }
    // Mock password change
    alert('Password changed successfully! (This is a mock action)');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  const handleEmailChange = (e: FormEvent) => {
    e.preventDefault();
    if (newEmail !== confirmNewEmail) {
      alert("New emails don't match!");
      return;
    }
    // Mock email change
    alert('Email change request submitted! (This is a mock action)');
    setNewEmail('');
    setConfirmNewEmail('');
  };

  return (
    <div className="space-y-10 max-w-3xl">
      <div>
        <h2 className="text-2xl font-semibold mb-1">Settings</h2>
        <p className="text-sm text-muted-foreground">
          Manage your application preferences, notification settings, and account security.
        </p>
      </div>

      {/* Notification Preferences */}
      <section className="space-y-6">
        <div className="flex items-center">
          <Bell className="h-6 w-6 mr-3 text-primary" />
          <h3 className="text-xl font-semibold">Notification Preferences</h3>
        </div>
        <div className="space-y-4 p-6 border rounded-lg shadow-sm bg-card">
          {[ 
            { key: 'orderUpdates', label: 'Order Updates', description: 'Receive updates on your order status.' },
            { key: 'promotionalEmails', label: 'Promotional Emails', description: 'Get information about new products and special offers.' },
            { key: 'newsletter', label: 'Newsletter', description: 'Subscribe to our weekly football news and insights.' },
            { key: 'securityAlerts', label: 'Security Alerts', description: 'Receive alerts for important security events related to your account.' },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50 transition-colors">
              <div>
                <Label htmlFor={item.key} className="font-medium">{item.label}</Label>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
              <Switch 
                id={item.key} 
                checked={notificationPrefs[item.key as keyof NotificationPreferences]} 
                onCheckedChange={() => handleNotificationToggle(item.key as keyof NotificationPreferences)}
              />
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Change Password (Mock) */}
      <section className="space-y-6">
        <div className="flex items-center">
          <KeyRound className="h-6 w-6 mr-3 text-primary" />
          <h3 className="text-xl font-semibold">Change Password</h3>
        </div>
        <form onSubmit={handlePasswordChange} className="space-y-4 p-6 border rounded-lg shadow-sm bg-card">
          <div className="space-y-1">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Enter your current password" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter your new password" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
            <Input id="confirmNewPassword" type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} placeholder="Confirm your new password" />
          </div>
          <Button type="submit">Change Password</Button>
        </form>
      </section>

      <Separator />

      {/* Change Email (Mock) */}
      <section className="space-y-6">
        <div className="flex items-center">
          <Mail className="h-6 w-6 mr-3 text-primary" />
          <h3 className="text-xl font-semibold">Change Email Address</h3>
        </div>
        <form onSubmit={handleEmailChange} className="space-y-4 p-6 border rounded-lg shadow-sm bg-card">
          <div className="space-y-1">
            <Label htmlFor="newEmail">New Email Address</Label>
            <Input id="newEmail" type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="Enter your new email address" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="confirmNewEmail">Confirm New Email Address</Label>
            <Input id="confirmNewEmail" type="email" value={confirmNewEmail} onChange={(e) => setConfirmNewEmail(e.target.value)} placeholder="Confirm your new email address" />
          </div>
          <Button type="submit">Update Email Address</Button>
        </form>
      </section>

    </div>
  );
}
