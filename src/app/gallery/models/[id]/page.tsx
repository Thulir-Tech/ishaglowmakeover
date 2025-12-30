import Link from "next/link";
import React from "react";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    Camera,
    Instagram,
    BadgeCheck,
} from "lucide-react";
import NavBar from "@/components/custom/NavBar";
import Footer from "@/components/custom/Footer";
import { Button } from "@/components/ui/button";
import ShareButton from "@/components/custom/ShareButton";
import { modelShoots } from "@/data/modelDetails";

export default async function ModelAlbumPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const album = modelShoots.find((m) => m.id === id);

    if (!album) {
        notFound();
    }

    return (
        <>
            <NavBar />
            <main className="pt-20">
                <div className="min-h-screen bg-slate-50 pt-10 pb-24 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">

                        {/* Navigation */}
                        <div className="mb-8">
                            <Link
                                href="/gallery/models"
                                className="inline-flex items-center text-slate-700 hover:text-slate-900 font-medium"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Models
                            </Link>
                        </div>

                        {/* Header Card */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 mb-12">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                                <div>
                                    {/* Badge */}
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-semibold mb-3 uppercase tracking-wide">
                                        Model Shoot
                                        {album.verifiedInstagram && (
                                            <BadgeCheck className="h-4 w-4 text-white fill-sky-500" />
                                        )}
                                    </div>

                                    {/* Title */}
                                    <h1 className="text-3xl md:text-4xl font-bold font-serif text-slate-900 mb-2">
                                        {album.modelName}
                                    </h1>

                                    {/* Meta */}
                                    <div className="flex flex-wrap gap-4 text-sm text-slate-500 mt-4">

                                        <div className="flex items-center gap-1.5">
                                            <a
                                                href={`https://instagram.com/${album.photographerInsta}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1.5 hover:text-slate-900"
                                            >
                                            <Camera className="h-4 w-4" />
                                            {album.photographer} </a>
                                        </div>

                                        {album.instagramHandle && (
                                            <a
                                                href={`https://instagram.com/${album.instagramHandle}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1.5 hover:text-slate-900"
                                            >
                                                <Instagram className="h-4 w-4" />
                                                @{album.instagramHandle}
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3">
                                    <ShareButton title={album.modelName} />
                                    <Button
                                        variant="default"
                                        className="bg-slate-900 hover:bg-slate-800 text-white"
                                    >
                                        <Link href="/booking?category=photoshoot">Book This Look</Link>
                                    </Button>
                                </div>
                            </div>


                        </div>

                        {/* Masonry Grid (Same as Bridal) */}
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                            {album.images.map((img, index) => (
                                <div
                                    key={index}
                                    className="break-inside-avoid relative group rounded-xl overflow-hidden bg-slate-100 shadow-sm hover:shadow-md transition-all"
                                >
                                    <img
                                        src={img}
                                        alt={`${album.modelName} ${index + 1}`}
                                        className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
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
