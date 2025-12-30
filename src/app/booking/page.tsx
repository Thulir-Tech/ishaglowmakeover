import { Suspense } from "react";
import BookingClient from "@/components/custom/BookingClient";

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-slate-500">
          Loading booking form…
        </div>
      }
    >
      <BookingClient />
    </Suspense>
  );
}
