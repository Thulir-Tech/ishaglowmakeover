import React from "react";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, MapPin, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bridalAlbums } from "@/data/brideDetails";
import ShareButton from "@/components/custom/ShareButton";
import Link from "next/link";

export default function BridalAlbumPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);

  const album = bridalAlbums.find((a) => a.id === id);

  if (!album) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Navigation */}
        <div className="mb-8">
          <a
            href="/gallery/bridal"
            className="inline-flex items-center text-rose-600 hover:text-rose-700 font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Bridal Gallery
          </a>
        </div>

        {/* Header Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <div className="inline-block px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-xs font-semibold mb-3 uppercase tracking-wide">
                {album.service}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold font-serif text-slate-900 mb-2">
                {album.title}
              </h1>

              <div className="flex flex-wrap gap-4 text-sm text-slate-500 mt-4">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {album.date}
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {album.location}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex gap-3">
                <ShareButton title={album.title} />
                <Button className="bg-rose-600 hover:bg-rose-700 text-white">
                  <Link href="/booking?category=bridal-makeup">Book This Look</Link>
                </Button>
              </div>
            </div>
          </div>

          <p className="mt-6 text-slate-600 leading-relaxed max-w-3xl">
            {album.description}
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {album.images.map((src, index) => (
            <div
              key={index}
              className="break-inside-avoid relative group rounded-xl overflow-hidden bg-slate-100 shadow-sm hover:shadow-md transition-all"
            >
              <img
                src={src}
                alt={`${album.title} image ${index + 1}`}
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
