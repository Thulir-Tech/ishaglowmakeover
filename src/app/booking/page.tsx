"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import masterData from "@/data/masterData";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Sparkles } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import NavBar from "@/components/custom/NavBar";
import Footer from "@/components/custom/Footer";

/* ================= UTIL ================= */

function formatDate(date: Date) {
  return date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    })
    .replace(/ /g, "-");
}

const slugify = (text: string) =>
  text.toLowerCase().replace(/\s+/g, "-");

/* ================= PAGE ================= */

export default function BookingPage() {
  const searchParams = useSearchParams();

  const [categoryId, setCategoryId] = useState("");
  const [packageId, setPackageId] = useState("");
  const [eventDate, setEventDate] = useState<Date | undefined>(undefined);
  const [showCalendar, setShowCalendar] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔥 Required for ShadCN Select re-render
  const [selectKey, setSelectKey] = useState(0);
  const [packageSelectKey, setPackageSelectKey] = useState(0);

  /* ================= AUTO SELECT CATEGORY + PACKAGE ================= */

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const packageParam = searchParams.get("package");

    let selectedCategoryId = "";

    // 1️⃣ CATEGORY
    if (categoryParam) {
      const category = masterData.categories.find(
        (c) => slugify(c.name) === categoryParam
      );

      if (category) {
        selectedCategoryId = category.id;
        setCategoryId(category.id);
        setSelectKey((k) => k + 1);
      }
    }

    // 2️⃣ PACKAGE (only if category resolved)
    if (packageParam && selectedCategoryId) {
      const pkg = masterData.packages.find(
        (p) =>
          p.categoryId === selectedCategoryId &&
          slugify(p.name) === packageParam
      );

      if (pkg) {
        setPackageId(pkg.id);
        setPackageSelectKey((k) => k + 1);
      }
    } else {
      setPackageId("");
    }
  }, [searchParams.toString()]);

  /* ================= FILTER PACKAGES ================= */

  const filteredPackages = masterData.packages.filter(
    (p) => p.categoryId === categoryId
  );

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!eventDate) {
      alert("Please select an event date");
      return;
    }

    setLoading(true);

    const formData = new FormData(form);

    const name = formData.get("customerName") as string;
    const eventName = formData.get("eventName") as string;
    const city = formData.get("city") as string;
    const district = formData.get("district") as string;
    const state = formData.get("state") as string;
    const pincode = formData.get("pincode") as string;
    const mobileNumber = formData.get("mobileNumber") as string;

    const today = new Date();
    const documentId = `${name}-${formatDate(today)}`;

    const bookingData = {
      id: documentId,
      name,
      category: masterData.categories.find(c => c.id === categoryId)?.name,
      package: masterData.packages.find(p => p.id === packageId)?.name,
      eventDate: format(eventDate, "yyyy-MM-dd"),
      eventName,
      currentDate: today.toISOString(),
      city,
      district,
      state,
      pincode,
      mobileNumber,
    };

    try {
      await setDoc(doc(db, "Bookings", documentId), bookingData);

      alert("Booking submitted successfully!");

      form.reset();
      setCategoryId("");
      setPackageId("");
      setEventDate(undefined);
      setSelectKey((k) => k + 1);
      setPackageSelectKey((k) => k + 1);
    } catch (error) {
      console.error(error);
      alert("Failed to submit booking");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <>
      <NavBar />

      <main className="pt-10">
        <div className="min-h-screen bg-slate-50 py-20 px-4">
          <div className="relative max-w-3xl mx-auto bg-white rounded-2xl border p-8 shadow-sm">

            <Sparkles className="absolute top-8 right-8 h-8 w-8 text-rose-700 opacity-60 pointer-events-none" />

            <h1 className="text-3xl font-bold font-serif mb-6">
              Book Your Session
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Customer Name */}
              <div className="space-y-2">
                <Label>Customer Name</Label>
                <Input name="customerName" required />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  key={selectKey}
                  value={categoryId}
                  onValueChange={(v) => {
                    setCategoryId(v);
                    setPackageId("");
                    setPackageSelectKey((k) => k + 1);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {masterData.categories.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Package */}
              <div className="space-y-2">
                <Label>Package</Label>
                <Select
                  key={packageSelectKey}
                  value={packageId}
                  onValueChange={setPackageId}
                  disabled={!categoryId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select package" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredPackages.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name} – ₹{p.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Event Name */}
              <div className="space-y-2">
                <Label>Event Name</Label>
                <Input name="eventName" required />
              </div>

              {/* Event Date */}
              <div className="space-y-2">
                <Label>Event Date</Label>
                <div className="relative">
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal border-slate-200 h-10 bg-white",
                      !eventDate && "text-slate-500"
                    )}
                    onClick={() => setShowCalendar(true)}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {eventDate ? format(eventDate, "PPP") : "Pick a date"}
                  </Button>

                  {showCalendar && (
                    <div
                      className="absolute top-12 z-20 bg-white border rounded-md shadow-lg"
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      <Calendar
                        mode="single"
                        selected={eventDate}
                        onSelect={(date) => {
                          if (!date) return;
                          setEventDate(date);
                          setShowCalendar(false);
                        }}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        initialFocus
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label>Address</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input name="city" placeholder="City" required />
                  <Input name="district" placeholder="District" required />
                  <Input name="state" placeholder="State" required />
                  <Input name="pincode" placeholder="Pincode" required />
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-2">
                <Label>Mobile Number</Label>
                <Input name="mobileNumber" required />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white"
              >
                {loading ? "Submitting..." : "Submit Booking"}
              </Button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
