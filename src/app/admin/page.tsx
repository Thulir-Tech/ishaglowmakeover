"use client";

import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  LayoutDashboard,
  MessageSquare,
  Calendar as CalendarIcon,
  Settings,
  LogOut,
  Search,
  Trash2,
  Loader2,
  Phone,
  Menu,
  X,
} from "lucide-react";

import { db } from "../../lib/firebase";
import { cn } from "../../lib/utils";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

/* ================= TYPES ================= */

interface Enquiry {
  id: string;
  name?: string;
  Name?: string;
  phone?: string;
  Number?: string;
  eventDate?: string;
  EventDate?: string;
  message?: string;
  Message?: string;
  submissionDate?: string;
  SubmissionDate?: string;
  submissionTime?: string;
  SubmissionTime?: string;
  createdAt?: any;
  CreatedAt?: any;
}

interface Booking {
  id: string;
  name: string;
  category: string;
  package: string;
  eventDate: string;
  eventName: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  mobileNumber: string;
  currentDate?: any;
}

/* ================= COMPONENT ================= */

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("messages");
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const [loadingMessages, setLoadingMessages] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(true);

  /* ================= FIRESTORE ================= */

  useEffect(() => {
    const q = query(collection(db, "Messages"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as Enquiry[];
      setEnquiries(data);
      setLoadingMessages(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "Bookings"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as Booking[];
      setBookings(data);
      setLoadingBookings(false);
    });
    return () => unsub();
  }, []);

  /* ================= HANDLERS ================= */

  const deleteMessage = async (id: string) => {
    if (confirm("Delete this message?")) {
      await deleteDoc(doc(db, "Messages", id));
    }
  };

  const deleteBooking = async (id: string) => {
    if (confirm("Delete this booking?")) {
      await deleteDoc(doc(db, "Bookings", id));
    }
  };

  /* ================= FILTER ================= */

  const filteredEnquiries = enquiries.filter((e) =>
    (e.Name || e.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBookings = bookings.filter((b) =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* ================= SIDEBAR ITEM ================= */

  const SidebarItem = ({
    icon: Icon,
    label,
    id,
  }: {
    icon: any;
    label: string;
    id: string;
  }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        setMobileMenuOpen(false);
      }}
      className={cn(
        "flex w-full items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition",
        activeTab === id
          ? "bg-rose-50 text-rose-600"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      )}
    >
      <Icon className="h-5 w-5" />
      {label}
    </button>
  );

  return (
    <div className="flex min-h-screen bg-white">

      {/* DESKTOP SIDEBAR */}
      <aside className="w-64 bg-white border-r fixed h-full hidden md:block">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold font-serif text-rose-500">
            ISHA GLOW
          </h1>
          <p className="text-xs text-slate-400 uppercase">Admin Panel</p>
        </div>
        <nav className="p-4 space-y-1">
          <SidebarItem icon={MessageSquare} label="Messages" id="messages" />
          <SidebarItem icon={CalendarIcon} label="Bookings" id="bookings" />
          <SidebarItem icon={LayoutDashboard} label="Services" id="services" />
          <div className="pt-4 mt-4 border-t">
            <SidebarItem icon={Settings} label="Settings" id="settings" />
            <SidebarItem icon={LogOut} label="Logout" id="logout" />
          </div>
        </nav>
      </aside>

      {/* MOBILE SIDEBAR */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl">
            <div className="p-6 border-b flex justify-between items-center">
              <h1 className="font-bold text-rose-500">ISHA GLOW</h1>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="p-4 space-y-1">
              <SidebarItem icon={MessageSquare} label="Messages" id="messages" />
              <SidebarItem icon={CalendarIcon} label="Bookings" id="bookings" />
              <SidebarItem icon={LayoutDashboard} label="Services" id="services" />
            </nav>
          </aside>
        </div>
      )}

      {/* MAIN */}
      <main className="flex-1 md:ml-64 p-6">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 border rounded-lg bg-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <h2 className="text-2xl font-bold capitalize">{activeTab}</h2>
          </div>

          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              className="pl-10 w-64"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">

          {/* MESSAGES */}
          {activeTab === "messages" && (
            loadingMessages ? (
              <div className="h-64 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEnquiries.map((e) => (
                    <TableRow key={e.id}>
                      <TableCell>{e.Name || e.name}</TableCell>
                      <TableCell>{e.Number || e.phone}</TableCell>
                      <TableCell>{e.Message || e.message}</TableCell>
                      <TableCell className="text-right space-x-2">
                        {/* Call */}
                        {(e.Number || e.phone) && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              window.open(`tel:${e.Number || e.phone}`)
                            }
                          >
                            <Phone className="h-4 w-4 text-green-600" />
                          </Button>
                        )}

                        {/* Delete */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteMessage(e.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )
          )}

          {/* BOOKINGS */}
          {activeTab === "bookings" && (
            loadingBookings ? (
              <div className="h-64 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Event Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((b) => (
                    <TableRow key={b.id}>
                      <TableCell>{b.name}</TableCell>
                      <TableCell>{b.category}</TableCell>
                      <TableCell>{b.eventDate}</TableCell>
                      <TableCell>{b.city}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => window.open(`tel:${b.mobileNumber}`)}>
                          <Phone className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteBooking(b.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )
          )}

          {/* SERVICES */}
          {activeTab === "services" && (
            <div className="p-6 text-center text-slate-500">
              Services management coming soon.
            </div>
          )}

          {/* SETTINGS */}
          {activeTab === "settings" && (
            <div className="p-6 text-center text-slate-500">
              Settings coming soon.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
