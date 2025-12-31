import Link from 'next/link';

const HeroSection = () => (
  <div className="relative bg-rose-50 py-24 sm:py-32">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl font-serif mb-6">
        Reveal Your Inner Glow
      </h1>
      <p className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl mx-auto">
        Professional makeup artistry for weddings, events, and photoshoots. 
        Experience the transformation with Isha Glow Makeover.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <button className="rounded-full bg-rose-500 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 transition-all">
          <Link href='/booking'>Book Your Slot</Link>
        </button>
        <a href="gallery" className="text-sm font-semibold leading-6 text-slate-900 flex items-center gap-2">
          View Gallery <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  </div>
);

export default HeroSection;
