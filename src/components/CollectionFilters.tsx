'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Product } from '@/types/product';
import { useEffect, useState } from 'react';

interface CollectionFiltersProps {
  brands: string[];
  onFilterChange?: (params: { searchQuery: string; activeBrand: string }) => void;
}

export default function CollectionFilters({ brands, onFilterChange }: CollectionFiltersProps) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get('q') || '';
  const activeBrand = searchParams?.get('category') || 'All';

  return (
    <div className="flex flex-col items-end gap-6 w-full md:w-auto">
      <form method="get" className="relative w-full md:w-80">
        <input
          name="q"
          type="text"
          placeholder="Search by model or brand..."
          defaultValue={searchQuery}
          className="w-full bg-transparent border-b border-white/10 pb-2 text-white font-light outline-none focus:border-[#D4AF37] transition-colors placeholder:text-white/20 text-sm"
        />
      </form>

      <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar w-full justify-start md:justify-end snap-x snap-mandatory scroll-smooth">
        {brands.map((brand) => {
          const href = `/collection?category=${encodeURIComponent(brand)}${searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ''}`;
          const selected = activeBrand === brand;
          return (
            <Link
              key={brand}
              href={href}
              className={`text-[9px] uppercase tracking-widest px-5 py-2.5 border rounded-full transition-all duration-500 whitespace-nowrap snap-center ${
                selected
                  ? 'bg-[#D4AF37] border-[#D4AF37] text-black font-bold'
                  : 'border-white/10 text-white/40 hover:border-white/30'
              }`}
            >
              {brand}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
