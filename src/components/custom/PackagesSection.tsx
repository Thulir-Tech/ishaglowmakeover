import { Check } from 'lucide-react';
import Link from 'next/link';

const PackagesSection = () => {
  const packages = [
    {
      name: "Silver Glow",
      routeId: "silver-glow",
      price: "₹12,000",
      features: ["HD Makeup", "Simple Hair Styling", "Saree Draping", "Lashes included"],
      isPopular: false,
    },
    {
      name: "Gold Radiance",
      routeId: "gold-radiance",
      price: "₹18,000",
      features: ["Airbrush Makeup", "Advanced Hair Styling", "Premium Draping", "Premium Lashes", "Touch-up Kit"],
      isPopular: true,
    },
    {
      name: "Diamond Bridal",
      routeId: "diamond-bridal",
      price: "₹25,000",
      features: ["Premium Airbrush", "Complex Hair Design", "Jewellery Setting", "Pre-wedding Trial", "Touch-up Kit"],
      isPopular: false,
    },
  ];

  return (
    <section id="packages" className="py-24 bg-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-serif mb-12 text-center text-slate-900">
          Bridal Packages
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, idx) => (
            <div key={idx} className={`relative bg-white rounded-2xl shadow-lg p-8 ${pkg.isPopular ? 'border-2 border-rose-500 transform scale-105 z-10' : 'border border-slate-100'}`}>
              {pkg.isPopular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-rose-500 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wide">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{pkg.name}</h3>
              <div className="text-4xl font-bold text-rose-500 mb-6">{pkg.price}</div>
              
              <ul className="space-y-4 mb-8">
                {pkg.features.map((feat, i) => (
                  <li key={i} className="flex items-start text-slate-600">
                    <Check className="w-5 h-5 text-green-500 mr-2 shrink-0" />
                    <span className="text-sm">{feat}</span>
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${pkg.isPopular ? 'bg-rose-500 text-white hover:bg-rose-600' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>
                <Link href={`/booking?category=bridal-makeup&package=${pkg.routeId}`}>Choose Plan</Link>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;