'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

// 1. We move the logic into a separate internal component
function VerifyPaymentContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading');

  useEffect(() => {
    if (!reference) {
      setStatus('failed');
      return;
    }

    // verify payment with Paystack
    const verify = async () => {
      try {
        const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY}`,
          },
        });

        const data = await res.json();
        if (data.status && data.data.status === 'success') {
          setStatus('success');
        } else {
          setStatus('failed');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('failed');
      }
    };

    verify();
  }, [reference]);

  if (status === 'loading') {
    return (
      <div className="text-center">
        <div className="w-12 h-12 border-t border-[#D4AF37] animate-spin rounded-full mx-auto mb-6" />
        <p className="text-white/40 uppercase tracking-[0.3em] text-[10px]">
          Verifying Payment...
        </p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="text-center max-w-md">
        <div className="text-[#D4AF37] text-6xl mb-6">✓</div>
        <h1 className="text-white text-4xl font-extralight tracking-tighter mb-4">
          Payment Confirmed
        </h1>
        <p className="text-white/40 mb-8 leading-relaxed">
          Thank you for your purchase. Your order has been successfully processed and payment confirmed.
        </p>
        <Link
          href="/collection"
          className="inline-block bg-[#D4AF37] text-black py-4 px-8 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-white transition-all"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center max-w-md">
      <div className="text-red-500 text-6xl mb-6">✕</div>
      <h1 className="text-white text-4xl font-extralight tracking-tighter mb-4">
        Payment Failed
      </h1>
      <p className="text-white/40 mb-8 leading-relaxed">
        Payment verification failed. Please try again.
      </p>
      <Link
        href="/checkout"
        className="inline-block bg-[#D4AF37] text-black py-4 px-8 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-white transition-all"
      >
        Return to Checkout
      </Link>
    </div>
  );
}

// 2. The main export wraps everything in a Suspense boundary
export default function VerifyPaymentPage() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">
      <Suspense fallback={
        <div className="text-center">
          <div className="w-12 h-12 border-t border-[#D4AF37] animate-spin rounded-full mx-auto mb-6" />
          <p className="text-white/40 uppercase tracking-[0.3em] text-[10px]">
            Initialising...
          </p>
        </div>
      }>
        <VerifyPaymentContent />
      </Suspense>
    </main>
  );
}