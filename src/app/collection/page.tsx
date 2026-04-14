import { Suspense } from 'react';
import { Metadata } from 'next';
import CollectionPageContent from '@/components/CollectionPageContent';

export const metadata: Metadata = {
  title: 'Luxury Watch Collection | Chronos Masterpieces',
  description: 'Explore our curated collection of haute horlogerie. From the technical brilliance of the Apex series to the timeless elegance of the Heritage collection.',
  openGraph: {
    title: 'The Chronos Collection',
    description: 'A curated gallery of the world’s most exquisite timepieces.',
  }
};

export default function CollectionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <CollectionPageContent />
    </Suspense>
  );
}
