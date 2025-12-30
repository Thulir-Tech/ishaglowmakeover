import { Star, Calendar } from 'lucide-react';
import Image from 'next/image';

const AboutSection = () => (
  <section id="about" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image Placeholder */}
        <div className="relative h-96 rounded-2xl bg-rose-100 overflow-hidden shadow-xl">
          <div className="absolute inset-0 flex items-center justify-center text-rose-300">
            <Image src="/images/makeUpArtist/artist.jpg" alt="Artist Portrait" fill className="object-cover" objectPosition='left' />
            <span className="font-serif text-2xl">Artist Portrait</span>
          </div>
        </div>
        
        {/* Content */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-serif mb-6 border-l-4 border-rose-500 pl-4">
            About the Artist
          </h2>
          <p className="text-lg text-slate-600 mb-6">
            Welcome to Isha Glow Makeover. I am passionate about enhancing natural beauty and creating 
            looks that make you feel confident and radiant on your special day.
          </p>
          <p className="text-slate-600 mb-8">
            With years of experience in bridal and event makeup, I specialize in creating flawless, 
            long-lasting looks tailored to your individual style and skin tone. Whether you prefer 
            a subtle natural glow or a bold glamorous look, I am here to bring your vision to life.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <div className="text-rose-500 mb-2"><Star size={24} /></div>
              <div className="font-bold text-slate-900">Premium Products</div>
              <div className="text-sm text-slate-500">MAC, Huda Beauty, Nars</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <div className="text-rose-500 mb-2"><Calendar size={24} /></div>
              <div className="font-bold text-slate-900">On-Venue Service</div>
              <div className="text-sm text-slate-500">Available for travel</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;