import { Suspense } from 'react';
import CollectionPageContent from '@/components/CollectionPageContent';

export default function CollectionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <CollectionPageContent />
    </Suspense>
  );
}
