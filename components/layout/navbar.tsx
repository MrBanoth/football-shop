"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, ShoppingCart, Search, X, ChevronDown, LogOut, User as UserIcon, Heart } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils"; // Import cn

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/new-arrivals", label: "New Arrivals" },
  { href: "/sale", label: "Sale" },
  { href: "/collections", label: "Collections" },
];

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { cartItems } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State for new animated search bar
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Effect to focus search input when it opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50); // Timeout to ensure transition completed
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      if (isMenuOpen) setIsMenuOpen(false); // Close mobile menu on search
      if (isSearchOpen) setIsSearchOpen(false); // Close desktop search bar
    }
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false); // Ensure mobile menu closes
    router.push('/');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleSearch = () => {
    setIsSearchOpen(prev => !prev);
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-white transition-shadow", // Removed backdrop blur and made bg solid white
        isScrolled ? "shadow-md" : "shadow-none"
      )}
    >
      <div className="container flex h-16 items-center px-4 md:px-6">
        {/* Left Section: Logo */}
        <div className="flex flex-1 justify-start">
          <Link href="/" className="flex items-center space-x-2" onClick={() => isMenuOpen && setIsMenuOpen(false)}>
            {/* <Image src="/logo.png" alt="GoalGear Logo" width={32} height={32} className="h-8 w-8" /> */}
            <span className="text-xl font-bold text-primary">Goal</span>
            <span className="text-xl font-bold text-red-500">Gear</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-1 lg:space-x-4">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-base font-medium transition-colors",
                pathname === link.href 
                  ? "bg-primary/10 text-primary font-semibold" 
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Section: Actions */}
        <div className="flex flex-1 justify-end items-center space-x-2 sm:space-x-3">
          {/* Animated Search Bar for Desktop */}
          <div className="relative hidden md:flex items-center justify-end">
            <form
              onSubmit={handleSearchSubmit}
              className={cn(
                "flex items-center transition-all duration-300 ease-in-out overflow-hidden mr-1",
                isSearchOpen ? "w-48 opacity-100" : "w-0 opacity-0 pointer-events-none"
              )}
            >
              <Input
                ref={searchInputRef}
                type="search"
                placeholder="Search..."
                className="h-9 rounded-md w-full focus-visible:ring-primary bg-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => { 
                  // Optional: close if search bar loses focus and is empty
                  // if (!searchQuery.trim()) setIsSearchOpen(false);
                }}
              />
            </form>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full flex-shrink-0"
              onClick={toggleSearch}
              aria-label={isSearchOpen ? "Close search" : "Open search"}
            >
              <Search
                className={cn(
                  "h-5 w-5 transition-all duration-300 ease-in-out",
                  isSearchOpen && "transform rotate-90"
                )}
              />
            </Button>
          </div>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative rounded-full focus-visible:ring-0 focus-visible:ring-offset-0 sm:h-10 sm:w-auto sm:px-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.profilePicture} alt={user.name || 'User'} />
                    <AvatarFallback>
                      {user.name ? (
                        user.name.charAt(0).toUpperCase()
                      ) : (
                        <UserIcon className="h-4 w-4" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline-block ml-2 text-sm font-medium text-muted-foreground">{user.name ? user.name.split(' ')[0] : 'Account'}</span>
                  <ChevronDown className="hidden sm:inline-block ml-1 h-4 w-4 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name || "User Account"}</p>
                    {user.email && <p className="text-xs leading-none text-muted-foreground">{user.email}</p>}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/wishlist" className="w-full cursor-pointer flex items-center justify-between">
                    <div className="flex items-center">
                      <Heart className="mr-2 h-4 w-4" />
                      <span>Wishlist</span>
                    </div>
                    {wishlist.length > 0 && (
                      <span className="ml-2 text-xs bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center">
                        {wishlist.length}
                      </span>
                    )}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="w-full cursor-pointer flex items-center">
                    <UserIcon className="mr-2 h-4 w-4" /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile/orders" className="w-full cursor-pointer flex items-center">
                    <ShoppingCart className="mr-2 h-4 w-4" /> My Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="w-full cursor-pointer flex items-center text-red-500 hover:!text-red-600 focus:!text-red-600 focus:!bg-red-50">
                  <LogOut className="mr-2 h-4 w-4" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          )}

          <Button variant="ghost" size="icon" className="relative rounded-full" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
              {totalCartItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {totalCartItems}
                </span>
              )}
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */} 
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background shadow-lg">
          <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
            <form onSubmit={handleSearchSubmit} className="relative mb-3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="h-10 rounded-md pl-9 w-full focus-visible:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            
            {navLinks.map(link => (
              <Link
                key={`mobile-${link.href}`}
                href={link.href}
                className={cn(
                  "block rounded-md px-3 py-2 text-base font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === link.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="pt-3 mt-2 border-t">
              {!user ? (
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-center" asChild>
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
                  </Button>
                  <Button className="w-full justify-center" asChild>
                    <Link href="/register" onClick={() => setIsMenuOpen(false)}>Create Account</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex items-center space-x-3 px-3 py-2 mb-1">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.profilePicture} alt={user.name || 'User'} />
                      <AvatarFallback>
                        {user.name ? (
                          <span className="text-lg font-medium">{user.name.charAt(0).toUpperCase()}</span>
                        ) : (
                          <UserIcon className="h-5 w-5" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none text-foreground">{user.name || "User Account"}</p>
                      {user.email && <p className="text-xs leading-none text-muted-foreground">{user.email}</p>}
                    </div>
                  </div>
                  <Link
                    href="/profile"
                    className="flex items-center rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserIcon className="mr-2 h-4 w-4" /> My Profile
                  </Link>
                  <Link
                    href="/profile/orders"
                    className="flex items-center rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" /> My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left rounded-md px-3 py-2 text-base font-medium text-red-500 hover:bg-red-50 hover:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;