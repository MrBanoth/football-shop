'use client';

import { useState } from 'react';
import { X, Filter as FilterIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

type FilterSection = {
  id: string;
  name: string;
  options: {
    value: string;
    label: string;
    count: number;
  }[];
};

const filters: FilterSection[] = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'jerseys', label: 'Jerseys', count: 42 },
      { value: 'shoes', label: 'Shoes', count: 38 },
      { value: 'balls', label: 'Balls', count: 24 },
      { value: 'accessories', label: 'Accessories', count: 19 },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: 's', label: 'S', count: 15 },
      { value: 'm', label: 'M', count: 28 },
      { value: 'l', label: 'L', count: 32 },
      { value: 'xl', label: 'XL', count: 21 },
      { value: 'xxl', label: 'XXL', count: 12 },
    ],
  },
];

export function FilterSidebar() {
  const [open, setOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  return (
    <div className="lg:block">
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          className="w-full justify-between"
          onClick={() => setOpen(true)}
        >
          <span>Filters</span>
          <FilterIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div
        className={cn(
          'fixed inset-0 z-50 lg:relative lg:block lg:inset-auto',
          !open && 'hidden'
        )}
      >
        <div className="fixed inset-0 bg-black/50 lg:hidden" onClick={() => setOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white p-6 shadow-lg overflow-y-auto lg:static lg:block lg:w-full lg:max-w-none lg:shadow-none lg:p-0">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium">Filters</h3>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close filters</span>
            </Button>
          </div>

          <ScrollArea className="h-[calc(100vh-180px)] lg:h-auto lg:max-h-none">
            <div className="space-y-8">
              {/* Price Range */}
              <div>
                <h4 className="text-sm font-medium mb-4">Price Range</h4>
                <div className="space-y-4">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={1000}
                    step={10}
                    minStepsBetweenThumbs={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Filter Sections */}
              {filters.map((section) => (
                <div key={section.id}>
                  <h4 className="text-sm font-medium mb-4">{section.name}</h4>
                  <div className="space-y-3">
                    {section.options.map((option) => (
                      <div key={option.value} className="flex items-center">
                        <Checkbox id={`${section.id}-${option.value}`} className="h-4 w-4" />
                        <Label
                          htmlFor={`${section.id}-${option.value}`}
                          className="ml-3 text-sm text-gray-600 cursor-pointer"
                        >
                          {option.label}
                        </Label>
                        <span className="ml-auto text-sm text-muted-foreground">
                          {option.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="mt-6 lg:hidden">
            <Button className="w-full" onClick={() => setOpen(false)}>
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
