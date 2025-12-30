"use client";

import Link from "next/link";
import { ArrowLeft, Camera, Instagram, BadgeCheck } from "lucide-react";
import { IoArrowForwardCircleSharp } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/custom/NavBar";
import Footer from "@/components/custom/Footer";
import { modelShoots } from "@/data/modelDetails";

export default function ModelShootsPage() {
  return (
    <>
      <NavBar />
      <main className="pt-20">
        <div className="min-h-screen bg-slate-50 pt-10 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
              <div>
                <Link
                  href="/gallery"
                  className="flex items-center gap-1 text-rose-600 font-medium mb-2 hover:underline"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Categories
                </Link>

                <h1 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900">
                  Model Photoshoots
                </h1>
                <p className="text-slate-600 mt-2">
                  Editorial looks and portfolio shoots featuring our signature makeup styles.
                </p>
              </div>

              <div className="bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm text-sm font-medium text-slate-600">
                {modelShoots.length} Professional Shoots
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {modelShoots.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition flex flex-col overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative aspect-[1/1] overflow-hidden bg-slate-100">
                    <img
                      src={item.coverImage}
                      alt={item.modelName}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex-1 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold font-serif text-slate-900 flex items-center gap-2">
                          {item.modelName}
                          {item.verifiedInstagram && (
                            <BadgeCheck className="h-5 w-5 text-white fill-sky-500" />
                          )}
                        </h3>

                        {item.instagramHandle && (
                          <a
                            href={`https://instagram.com/${item.instagramHandle}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-rose-500 hover:bg-rose-50 p-1.5 rounded-full"
                          >
                            <Instagram className="h-5 w-5" />
                          </a>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-sm text-slate-500 bg-slate-50 p-2 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Camera className="h-4 w-4 text-slate-400" />
                          <span className="truncate max-w-[120px]">
                            {item.photographer}
                          </span>
                        </div>

                        {item.photographerInsta && (
                          <a
                            href={`https://instagram.com/${item.photographerInsta}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-rose-500"
                          >
                            <IoArrowForwardCircleSharp className="h-6 w-6" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Navigation */}
                    <Button asChild className="w-full bg-slate-900 text-white hover:bg-rose-600">
                      <Link href={`/gallery/models/${item.id}`}>
                        View Album
                      </Link>
                    </Button>
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
