"use client";

import { ArrowLeft, Baby, LocationEdit, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { babyShowerAlbums } from "@/data/babyShowerDetails";
import NavBar from "@/components/custom/NavBar";
import Footer from "@/components/custom/Footer";

export default function BabyShowerGalleryPage() {
  return (
    <>
    <NavBar/>
    <main className="pt-20">
    <div className="min-h-screen bg-green-50/30 pt-10 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <a
              href="/gallery"
              className="flex items-center gap-1 text-rose-600 font-medium mb-2 hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </a>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl font-serif">
              Baby Shower Makeup Gallery
            </h1>
            <p className="text-slate-600 mt-2">
              Cherishing beautiful moments of motherhood and celebration.
            </p>
          </div>

          <div className="bg-white px-4 py-2 rounded-full border shadow-sm text-sm font-medium text-slate-600">
            {babyShowerAlbums.length} Lovely Celebrations
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {babyShowerAlbums.map((album) => (
            <div
              key={album.id}
              className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-green-100">
                <img
                  src={album.coverImage}
                  alt={album.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-lg font-bold font-serif mb-1">
                    {album.momName}
                  </h3>
                  <p className="text-sm text-slate-200 flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-green-300" />
                    {album.location}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                  <Star className="h-3.5 w-3.5 text-green-500" />
                  {album.title}
                </div>

                <a href={`/gallery/babyShower/${album.id}`} className="block">
                  <Button
                    variant="outline"
                    className="w-full text-xs h-9 border-slate-200 hover:bg-green-50 hover:text-green-700 hover:border-green-200"
                  >
                    View Album
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
    </main>
    <Footer/>
    </>
  );
}
