"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, MapPin } from 'lucide-react';

export default function AccountPage() {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null); // Will be set by useEffect

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedUsername = localStorage.getItem('profileUsername');
    const storedLocation = localStorage.getItem('profileLocation');
    const storedImageUrl = localStorage.getItem('profileImageUrl');

    setUsername(storedUsername || 'Sandeep Kumar'); // Default if null
    setLocation(storedLocation || 'Silicon Valley, CA'); // Default if null
    setImagePreview(storedImageUrl || 'https://github.com/shadcn.png'); // Default avatar if null
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImagePreview(URL.createObjectURL(file));
      // Here you would typically handle the file upload to a server
      // For now, we're just showing a preview
      // setProfileImage(file); // If you store the File object
    }
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // For simplicity, we'll just log it. 
          // You'd typically use a geocoding service to get a city/address.
          setLocation(`Lat: ${position.coords.latitude.toFixed(2)}, Lon: ${position.coords.longitude.toFixed(2)}`);
          alert('Location fetched! (Check console for coordinates)');
          console.log('Current position:', position.coords);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Could not fetch location. Please ensure location services are enabled.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Save to local storage
    localStorage.setItem('profileUsername', username);
    localStorage.setItem('profileLocation', location);
    if (imagePreview) {
      localStorage.setItem('profileImageUrl', imagePreview);
    } else {
      localStorage.removeItem('profileImageUrl');
    }
    console.log('Profile data saved to localStorage:', { username, location, imagePreview });
    alert('Profile updated successfully and saved to local storage!');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-1">Account Details</h2>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and personal information.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        {/* Profile Image Section */}
        <div className="space-y-2">
          <Label htmlFor="profile-image">Profile Picture</Label>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={imagePreview || undefined} alt={username} />
              <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="relative">
              <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById('profile-image-upload')?.click()}>
                <Camera className="mr-2 h-4 w-4" />
                Change Picture
              </Button>
              <input 
                type="file" 
                id="profile-image-upload" 
                accept="image/*" 
                onChange={handleImageChange} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer sr-only" 
              />
            </div>
          </div>
        </div>

        {/* Username Section */}
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input 
            id="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Enter your username"
          />
        </div>

        {/* Location Section */}
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <div className="flex items-center gap-2">
            <Input 
              id="location" 
              value={location} 
              onChange={(e) => setLocation(e.target.value)} 
              placeholder="Enter your city or address"
              className="flex-grow"
            />
            <Button type="button" variant="outline" onClick={handleGetCurrentLocation} className="shrink-0">
              <MapPin className="mr-2 h-4 w-4" />
              Current Location
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            You can enter your location manually or use your current location.
          </p>
        </div>
        
        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
}
