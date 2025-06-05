"use client";

import { useState, useEffect, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, Home, Trash2, Edit3, Star } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';

interface Address {
  id: string;
  type: 'Shipping' | 'Billing' | 'Both'; // Type of address
  isDefault?: boolean;
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phoneNumber?: string;
}

const getStoredAddresses = (): Address[] => {
  if (typeof window !== 'undefined') {
    const addresses = localStorage.getItem('userAddresses');
    return addresses ? JSON.parse(addresses) : [];
  }
  return [];
};

const storeAddresses = (addresses: Address[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userAddresses', JSON.stringify(addresses));
  }
};

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Partial<Address>>({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setAddresses(getStoredAddresses());
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitAddress = (e: FormEvent) => {
    e.preventDefault();
    let updatedAddresses;
    if (isEditing && currentAddress.id) {
      updatedAddresses = addresses.map(addr => 
        addr.id === currentAddress.id ? { ...addr, ...currentAddress } as Address : addr
      );
    } else {
      const newAddress: Address = {
        id: Date.now().toString(), // Simple unique ID
        type: currentAddress.type || 'Shipping',
        isDefault: currentAddress.isDefault || false,
        fullName: currentAddress.fullName || '',
        addressLine1: currentAddress.addressLine1 || '',
        city: currentAddress.city || '',
        state: currentAddress.state || '',
        zipCode: currentAddress.zipCode || '',
        country: currentAddress.country || 'USA', // Default country
        ...currentAddress,
      };
      updatedAddresses = [...addresses, newAddress];
    }
    setAddresses(updatedAddresses);
    storeAddresses(updatedAddresses);
    setIsModalOpen(false);
    setCurrentAddress({});
    setIsEditing(false);
  };

  const openAddModal = () => {
    setCurrentAddress({ type: 'Shipping', country: 'USA' }); // Default values for new address
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const openEditModal = (address: Address) => {
    setCurrentAddress(address);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteAddress = (id: string) => {
    const updatedAddresses = addresses.filter(addr => addr.id !== id);
    setAddresses(updatedAddresses);
    storeAddresses(updatedAddresses);
  };
  
  const handleSetDefault = (id: string) => {
    const updatedAddresses = addresses.map(addr => 
      ({ ...addr, isDefault: addr.id === id })
    );
    setAddresses(updatedAddresses);
    storeAddresses(updatedAddresses);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">My Addresses</h2>
          <p className="text-sm text-muted-foreground">
            Manage your saved shipping and billing addresses.
          </p>
        </div>
        <Button onClick={openAddModal}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Address
        </Button>
      </div>

      {addresses.length === 0 ? (
        <div className="border rounded-lg p-12 text-center flex flex-col items-center">
          <Home className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No addresses saved</h3>
          <p className="text-muted-foreground mb-6">
            Add your shipping and billing addresses for faster checkout.
          </p>
          <Button onClick={openAddModal}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Address
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {addresses.map(addr => (
            <div key={addr.id} className={`border rounded-lg p-6 shadow-sm relative ${addr.isDefault ? 'border-primary ring-2 ring-primary' : ''}`}>
              {addr.isDefault && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full flex items-center">
                  <Star className="h-3 w-3 mr-1 fill-current" /> Default
                </div>
              )}
              <h3 className="text-lg font-semibold mb-1">{addr.fullName}</h3>
              <p className="text-sm text-muted-foreground capitalize mb-2">{addr.type} Address</p>
              <p className="text-sm">{addr.addressLine1}</p>
              {addr.addressLine2 && <p className="text-sm">{addr.addressLine2}</p>}
              <p className="text-sm">{addr.city}, {addr.state} {addr.zipCode}</p>
              <p className="text-sm">{addr.country}</p>
              {addr.phoneNumber && <p className="text-sm mt-1">Phone: {addr.phoneNumber}</p>}
              <div className="mt-4 pt-4 border-t flex justify-end space-x-2">
                {!addr.isDefault && (
                  <Button variant="outline" size="sm" onClick={() => handleSetDefault(addr.id)} title="Set as Default">
                    <Star className="mr-1 h-4 w-4" /> Default
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={() => openEditModal(addr)} title="Edit Address">
                  <Edit3 className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteAddress(addr.id)} title="Delete Address">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Address' : 'Add New Address'}</DialogTitle>
            <DialogDescription>
              {isEditing ? 'Update the details of your address.' : 'Fill in the details for your new address.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitAddress} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullName" className="text-right">Full Name</Label>
              <Input id="fullName" name="fullName" value={currentAddress.fullName || ''} onChange={handleInputChange} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="addressLine1" className="text-right">Address Line 1</Label>
              <Input id="addressLine1" name="addressLine1" value={currentAddress.addressLine1 || ''} onChange={handleInputChange} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="addressLine2" className="text-right">Address Line 2</Label>
              <Input id="addressLine2" name="addressLine2" value={currentAddress.addressLine2 || ''} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="city" className="text-right">City</Label>
              <Input id="city" name="city" value={currentAddress.city || ''} onChange={handleInputChange} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="state" className="text-right">State/Province</Label>
              <Input id="state" name="state" value={currentAddress.state || ''} onChange={handleInputChange} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="zipCode" className="text-right">Zip/Postal Code</Label>
              <Input id="zipCode" name="zipCode" value={currentAddress.zipCode || ''} onChange={handleInputChange} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="country" className="text-right">Country</Label>
              <Input id="country" name="country" value={currentAddress.country || 'USA'} onChange={handleInputChange} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNumber" className="text-right">Phone (Optional)</Label>
              <Input id="phoneNumber" name="phoneNumber" type="tel" value={currentAddress.phoneNumber || ''} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">Address Type</Label>
              <select id="type" name="type" value={currentAddress.type || 'Shipping'} onChange={handleInputChange} className="col-span-3 border border-input bg-background h-10 rounded-md px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <option value="Shipping">Shipping</option>
                <option value="Billing">Billing</option>
                <option value="Both">Both</option>
              </select>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">{isEditing ? 'Save Changes' : 'Add Address'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
