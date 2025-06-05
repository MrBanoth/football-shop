import { Button } from "@/components/ui/button";
import { HeartOff } from "lucide-react";

export default function WishlistPage() {
  return (
    <div className="container py-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-4 rounded-full bg-muted">
            <HeartOff className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Your wishlist is empty</h1>
          <p className="text-muted-foreground">
            Save items you love to your wishlist to keep track of them later.
          </p>
          <Button className="mt-4">
            <a href="/shop">Start Shopping</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
