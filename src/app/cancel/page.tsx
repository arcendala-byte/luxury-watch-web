import Link from 'next/link';

export default function CancelPage() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-red-500 text-6xl mb-6">✕</div>
        <h1 className="text-white text-4xl font-extralight tracking-tighter mb-4">
          Payment Cancelled
        </h1>
        <p className="text-white/40 mb-8 leading-relaxed">
          Your payment has been cancelled. Your cart is still available.
        </p>
        <Link
          href="/checkout"
          className="inline-block bg-[#D4AF37] text-black py-4 px-8 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-white transition-all"
        >
          Return to Checkout
        </Link>
      </div>
    </main>
  );
}
