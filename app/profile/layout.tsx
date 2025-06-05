"use client";

import { ReactNode } from 'react';
import Link from 'next/link';
import { User, ShoppingBag, MapPin, CreditCard, Settings, LogOut, Heart } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

interface ProfileSidebarLinkProps {
  href: string;
  icon: any;
  children: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const ProfileSidebarLink = ({ href, icon: Icon, children, onClick, isActive }: ProfileSidebarLinkProps) => (
  <Link href={href} onClick={onClick} className={`flex items-center space-x-3 px-4 py-3 rounded-md font-medium transition-colors 
    ${isActive ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'}
  `}>
    <Icon className={`h-5 w-5 ${isActive ? 'text-primary-foreground' : 'text-primary'}`} />
    <span>{children}</span>
  </Link>
);

const profileNavLinks = [
  { href: '/profile/account', label: 'Account Details', icon: User },
  { href: '/profile/orders', label: 'Order History', icon: ShoppingBag },
  { href: '/profile/addresses', label: 'My Addresses', icon: MapPin },
  { href: '/profile/payment-methods', label: 'Payment Methods', icon: CreditCard },
  { href: '/wishlist', label: 'My Wishlist', icon: Heart }, // Link to existing wishlist
  { href: '/profile/settings', label: 'Settings', icon: Settings },
];

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      // Consider using the AuthContext logout function here for consistency
      // For now, keeping the direct localStorage manipulation as per original logic
      alert('You have been logged out (mock action).');
      localStorage.removeItem('profileUsername'); // Example, adjust to actual keys used by AuthContext if different
      localStorage.removeItem('profileLocation');
      localStorage.removeItem('profileImageUrl');
      localStorage.removeItem('mockUser'); // Assuming 'mockUser' is the key used by AuthContext
      localStorage.removeItem('cartItems'); // If cart should be cleared on logout
      // Clear other relevant localStorage items
      router.push('/');
      // Potentially call auth.logout() if it handles redirection and state update
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-1/4 lg:w-1/5">
            <nav className="space-y-2">
              {profileNavLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <ProfileSidebarLink key={link.label} href={link.href} icon={link.icon} isActive={isActive}>
                    {link.label}
                  </ProfileSidebarLink>
                );
              })}
              <ProfileSidebarLink href="#" icon={LogOut} onClick={handleLogout} isActive={false}>
                Logout
              </ProfileSidebarLink>
            </nav>
          </aside>
          <main className="w-full md:w-3/4 lg:w-4/5">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
