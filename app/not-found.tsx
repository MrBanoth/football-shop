import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex items-center justify-center min-h-[70vh]">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Page Out of Bounds!</h2>
        <p className="text-muted-foreground mb-8">
          Looks like this page has been sent off the pitch. Let's get you back in the game.
        </p>
        <div className="space-y-4">
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
          <div className="pt-2">
            <Button asChild variant="outline">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}