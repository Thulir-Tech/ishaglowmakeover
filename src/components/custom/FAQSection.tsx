import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

const FaqSection = () => {
  // FIX: Explicitly define the type as <number | null>
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: "Do you travel to the venue?", a: "Yes, we provide on-venue services across Tamil Nadu. Travel charges may apply depending on the distance." },
    { q: "Which makeup brands do you use?", a: "We only use premium international brands like MAC, Huda Beauty, Nars, Bobbi Brown, and Estée Lauder to ensure quality and longevity." },
    { q: "Is a trial makeup available?", a: "Yes, we highly recommend a trial session for brides to ensure we achieve exactly the look you desire." },
  ];

  return (
    <section id="faqs" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-serif mb-12 text-center">
          Frequently Asked Questions
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side: Image (Hidden on mobile, visible on Desktop) */}
          <div className="hidden lg:block relative h-full min-h-[400px] rounded-2xl bg-rose-50 overflow-hidden shadow-lg">
            <div className="absolute inset-0 flex items-center justify-center text-rose-300">
              <Image src="/images/artist/artistAtWork.jpg" alt="Artist Portrait" fill className="object-cover" />
              <span className="font-serif text-2xl">Artist at Work</span>
            </div>
          </div>

          {/* Right Side: FAQs */}
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-slate-50 rounded-lg border border-slate-100 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full text-left px-6 py-4 font-bold text-slate-900 text-lg flex items-center justify-between focus:outline-none hover:bg-slate-100 transition-colors"
                >
                  {faq.q}
                  <ChevronDown 
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openIndex === i ? 'transform rotate-180' : ''}`} 
                  />
                </button>
                
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openIndex === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-4 text-slate-600 border-t border-slate-100 pt-4">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


export default FaqSection;