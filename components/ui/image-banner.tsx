"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils"; // Assuming you have this utility

interface ImageBannerProps {
  images: string[];
  interval?: number; // Interval in milliseconds
  className?: string;
}

const ImageBanner: React.FC<ImageBannerProps> = ({
  images,
  interval = 5000, // Default to 5 seconds
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [images, interval]);

  if (!images || images.length === 0) {
    return null; // Don't render if no images
  }

  return (
    <div
      className={cn(
        "relative w-full h-80 md:h-[28rem] lg:h-[32rem] overflow-hidden rounded-lg shadow-lg my-8 group", // Increased height
        className
      )}
    >
      {images.map((src, index) => (
        <Image
          key={src + index} // Add index to key for safety if image URLs aren't unique
          src={src}
          alt={`Banner image ${index + 1}`}
          fill
          style={{ objectFit: "cover" }} // Ensures image covers the div
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            index === currentIndex ? "opacity-100" : "opacity-0"
          )}
          priority={index === 0} // Prioritize loading the first image
        />
      ))}
      {/* Optional: Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={`dot-${index}`}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-colors",
              currentIndex === index ? "bg-white" : "bg-white/50 hover:bg-white/75"
            )}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageBanner;
