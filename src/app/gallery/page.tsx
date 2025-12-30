"use client";

// Note: In your real Next.js app, use: import Link from 'next/link';
import { ArrowRight, Sparkles, Star, Scissors, Baby, Flower, Camera } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/button';
import NavBar from "@/components/custom/NavBar";
import Footer from "@/components/custom/Footer";

// Mock data for categories
const categories = [
  {
    id: 'bridal',
    title: 'Bridal Makeup',
    description: 'Exquisite looks for your special day. Traditional, Modern, and Airbrush styles.',
    icon: Sparkles,
    color: 'bg-rose-100 text-rose-600',
    href: '/gallery/bridal',
    image: '/images/cover/bridalCover.webp'
  },
  {
    id: 'baby-shower',
    title: 'Baby Shower',
    description: 'Glowing looks for moms-to-be. Traditional Seemantham or modern baby shower makeovers.',
    icon: Baby,
    color: 'bg-green-100 text-green-600',
    href: '/gallery/babyShower',
    image: '/images/cover/babyShowerCover.webp'
  },
  {
    id: 'model-shoots',
    title: 'Model Photoshoots',
    description: 'High-fashion and editorial makeup looks for professional model portfolios and commercial shoots.',
    icon: Camera,
    color: 'bg-blue-100 text-blue-600',
    href: '/gallery/models',
    image: '/images/cover/modelCover.jpg'
  }
//   {
//     id: 'puberty',
//     title: 'Puberty Ceremony',
//     description: 'Celebrating coming of age (Manjal Neerattu Vizha) with traditional half-saree draping and elegant makeup.',
//     icon: Flower,
//     color: 'bg-yellow-100 text-yellow-600',
//     href: '/gallery/puberty',
//     image: 'https://images.unsplash.com/photo-1610177727394-43666d92639e?q=80&w=800&auto=format&fit=crop'
//   },
  
//   {
//     id: 'hair',
//     title: 'Hair Styling',
//     description: 'Creative updos, braids, and styling to complement your perfect look.',
//     icon: Scissors,
//     color: 'bg-amber-100 text-amber-600',
//     href: '/gallery/hair',
//     image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=800&auto=format&fit=crop'
//   }
];

export default function GalleryPage() {
  return (
    <>
    <NavBar />
    <main className='pt-20'>
    <div className="min-h-screen bg-slate-50 pt-10 pb-24 px-4 sm:px-6 lg:px-8">
        
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-rose-700 sm:text-5xl font-serif mb-4">
            Our Portfolio
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explore our work across different categories. Select a category to view detailed galleries.
          </p>
        </div>

        {/* Updated grid to handle 5 items nicely */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col w-full"
            >
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/10 transition-colors z-10" />
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 z-20">
                  <div className={cn("p-3 rounded-xl shadow-lg", category.color)}>
                    <category.icon className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-3 font-serif">
                  {category.title}
                </h3>
                <p className="text-slate-600 mb-8 flex-1 leading-relaxed">
                  {category.description}
                </p>
                
                {/* Changed Link to <a> for preview compatibility */}
                <a href={category.href} className="w-full">
                  <Button className="w-full group-hover:bg-rose-600 transition-colors">
                    View Gallery
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </main>
    <Footer />
    </>
  );
}