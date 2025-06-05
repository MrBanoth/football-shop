"use client";

import { useState, useEffect, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, CreditCard, Trash2, Edit3, Star } from 'lucide-react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PaymentMethod {
  id: string;
  cardType: 'Visa' | 'Mastercard' | 'Amex' | 'Discover' | 'Other';
  lastFour: string;
  expiryMonth: string;
  expiryYear: string;
  cardholderName: string;
  isDefault?: boolean;
  billingAddressId?: string; // Optional: Link to an address ID
}

const getStoredPaymentMethods = (): PaymentMethod[] => {
  if (typeof window !== 'undefined') {
    const methods = localStorage.getItem('userPaymentMethods');
    return methods ? JSON.parse(methods) : [];
  }
  return [];
};

const storePaymentMethods = (methods: PaymentMethod[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userPaymentMethods', JSON.stringify(methods));
  }
};

export default function PaymentMethodsPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMethod, setCurrentMethod] = useState<Partial<PaymentMethod>>({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setPaymentMethods(getStoredPaymentMethods());
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentMethod(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setCurrentMethod(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitMethod = (e: FormEvent) => {
    e.preventDefault();
    let updatedMethods;
    if (isEditing && currentMethod.id) {
      updatedMethods = paymentMethods.map(method => 
        method.id === currentMethod.id ? { ...method, ...currentMethod } as PaymentMethod : method
      );
    } else {
      const newMethod: PaymentMethod = {
        id: Date.now().toString(),
        cardType: currentMethod.cardType || 'Visa',
        lastFour: currentMethod.lastFour || '',
        expiryMonth: currentMethod.expiryMonth || '',
        expiryYear: currentMethod.expiryYear || '',
        cardholderName: currentMethod.cardholderName || '',
        isDefault: currentMethod.isDefault || false,
        ...currentMethod,
      };
      updatedMethods = [...paymentMethods, newMethod];
    }
    setPaymentMethods(updatedMethods);
    storePaymentMethods(updatedMethods);
    setIsModalOpen(false);
    setCurrentMethod({});
    setIsEditing(false);
  };

  const openAddModal = () => {
    setCurrentMethod({ cardType: 'Visa' });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const openEditModal = (method: PaymentMethod) => {
    setCurrentMethod(method);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteMethod = (id: string) => {
    const updatedMethods = paymentMethods.filter(method => method.id !== id);
    setPaymentMethods(updatedMethods);
    storePaymentMethods(updatedMethods);
  };
  
  const handleSetDefault = (id: string) => {
    const updatedMethods = paymentMethods.map(method => 
      ({ ...method, isDefault: method.id === id })
    );
    setPaymentMethods(updatedMethods);
    storePaymentMethods(updatedMethods);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Payment Methods</h2>
          <p className="text-sm text-muted-foreground">
            Manage your saved payment methods for faster checkout.
          </p>
        </div>
        <Button onClick={openAddModal}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Card
        </Button>
      </div>

      {paymentMethods.length === 0 ? (
        <div className="border rounded-lg p-12 text-center flex flex-col items-center">
          <CreditCard className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No payment methods saved</h3>
          <p className="text-muted-foreground mb-6">
            Add a payment method to make your purchases smoother.
          </p>
          <Button onClick={openAddModal}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Card
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {paymentMethods.map(method => (
            <div key={method.id} className={`border rounded-lg p-6 shadow-sm relative flex items-center justify-between ${method.isDefault ? 'border-primary ring-2 ring-primary' : ''}`}>
              <div className="flex items-center">
                <CreditCard className={`mr-4 h-8 w-8 ${method.isDefault ? 'text-primary' : 'text-muted-foreground'}`} />
                <div>
                  <h3 className="text-md font-semibold">{method.cardType} ending in {method.lastFour}</h3>
                  <p className="text-xs text-muted-foreground">Expires: {method.expiryMonth}/{method.expiryYear}</p>
                  <p className="text-xs text-muted-foreground">Cardholder: {method.cardholderName}</p>
                  {method.isDefault && (
                     <div className="mt-1 text-xs text-primary font-medium flex items-center">
                       <Star className="h-3 w-3 mr-1 fill-current" /> Default Payment
                     </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {!method.isDefault && (
                  <Button variant="outline" size="sm" onClick={() => handleSetDefault(method.id)} title="Set as Default">
                    <Star className="mr-1 h-3 w-3" /> Set Default
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={() => openEditModal(method)} title="Edit Card">
                  <Edit3 className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteMethod(method.id)} title="Delete Card">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Payment Method' : 'Add New Payment Method'}</DialogTitle>
            <DialogDescription>
              {isEditing ? 'Update your card details.' : 'Enter your new card details.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitMethod} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cardholderName" className="text-right">Name on Card</Label>
              <Input id="cardholderName" name="cardholderName" value={currentMethod.cardholderName || ''} onChange={handleInputChange} className="col-span-3" required />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cardType" className="text-right">Card Type</Label>
              <Select name="cardType" value={currentMethod.cardType || 'Visa'} onValueChange={(value) => handleSelectChange('cardType', value)} >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select card type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Visa">Visa</SelectItem>
                  <SelectItem value="Mastercard">Mastercard</SelectItem>
                  <SelectItem value="Amex">American Express</SelectItem>
                  <SelectItem value="Discover">Discover</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastFour" className="text-right">Last 4 Digits</Label>
              <Input id="lastFour" name="lastFour" value={currentMethod.lastFour || ''} onChange={handleInputChange} className="col-span-3" placeholder="XXXX" maxLength={4} pattern="[0-9]{4}" required />
            </div>

            <div className="grid grid-cols-2 items-center gap-4">
                <div className="grid grid-cols-2 items-center gap-2 col-span-2 ml-auto">
                    <Label htmlFor="expiryMonth" className="text-right col-span-2 sm:col-span-1">Expiry</Label>
                    <div className="col-span-2 sm:col-span-1 flex gap-2">
                        <Input id="expiryMonth" name="expiryMonth" value={currentMethod.expiryMonth || ''} onChange={handleInputChange} placeholder="MM" maxLength={2} pattern="(0[1-9]|1[0-2])" className="w-1/2" required />
                        <Input id="expiryYear" name="expiryYear" value={currentMethod.expiryYear || ''} onChange={handleInputChange} placeholder="YY" maxLength={2} pattern="[0-9]{2}" className="w-1/2" required />
                    </div>
                </div>
            </div>

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">{isEditing ? 'Save Changes' : 'Add Card'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
