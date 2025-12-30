"use client";

import { useState } from 'react';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { Phone, MapPin, Clock, Mail, Loader2, AlertCircle, Calendar as CalendarIcon } from 'lucide-react';
import { format } from "date-fns";

// These imports rely on the files generated above
import { db, appId as importedAppId } from '../../lib/firebase';
import appConfig from '../../lib/appConfig';
import { cn } from "../../lib/utils";

// UI Components
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type ContactSectionProps = {
  user?: any;
};

const ContactSection = ({ user }: ContactSectionProps) => {
  const [formData, setFormData] = useState({ name: '', phone: '', eventDate: '', message: '' });
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [showCalendar, setShowCalendar] = useState(false);
  
  const [status, setStatus] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>('');

  // Safe access to config with fallbacks
  const { contactDetails } = appConfig || { contactDetails: {} };
  const mobileNumber  = contactDetails?.phone || '';
  const emailAddress  = contactDetails?.email || '';
  const studioAddress = contactDetails?.address || '';
  const workingHours  = contactDetails?.hours || '';
  const mapLink       = contactDetails?.mapLink || '#';

  // Ensure we have a valid string for appId even if env vars are missing
  const safeAppId = importedAppId || 'default-ishaglow-app';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('');
    setDebugInfo('');

    if (!safeAppId) {
      setStatus('Configuration Error');
      setDebugInfo('App ID is missing. Check .env.local variables.');
      return;
    }

    const nameTrimmed = formData.name?.trim() || '';
    if (!nameTrimmed) {
      setStatus('Name is required');
      return;
    }

    setIsSubmitting(true);

    const now = new Date();
    const submissionDate = now.toLocaleDateString();
    const submissionTime = now.toLocaleTimeString();

    // Sanitize document ID (remove slashes, limit length if you want, replace spaces)
    const sanitizeDocId = (s: string) =>
      s.replace(/[\/\\#\[\]\s]/g, '_').slice(0, 150);

    const docId = sanitizeDocId(nameTrimmed);

    // Event date: use Timestamp if user picked one, otherwise keep empty string
    const eventTimestamp = date ? Timestamp.fromDate(date) : null;
    const eventDateString = date ? format(date, "PPP") : '';

    const payload = {
      Name: nameTrimmed,
      Number: formData.phone || '',
      EventDate: eventDateString,     // human-friendly string
      EventDate_ts: eventTimestamp,   // Firestore Timestamp (nullable)
      Message: formData.message || '',
      SubmissionDate: submissionDate,
      SubmissionTime: submissionTime,
      CreatedAt: Timestamp.now(),
      appId: safeAppId
    };

    try {
      // Write to top-level collection 'Messages' with document id = sanitized name
      const docRef = doc(db, 'Messages', docId);

      console.log(`Saving to: Messages/${docId}`, payload);

      await setDoc(docRef, payload);

      console.log('Save successful');
      setStatus('Message Sent! We will call you soon.');

      // Reset form
      setFormData({ name: '', phone: '', eventDate: '', message: '' });
      setDate(undefined);
    } catch (err: any) {
      console.error('Firestore Error:', err);
      setStatus('Error sending message');
      setDebugInfo(err?.message || 'Unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column: Contact Info */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-serif mb-6 border-l-4 border-rose-500 pl-4">
              Get in Touch
            </h2>
            <p className="text-slate-600 mb-8">
              Ready for your makeover? Fill out the form or contact us directly.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 text-rose-500"><Phone className="h-6 w-6" /></div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-900">Phone</h3>
                  <a href={`tel:${mobileNumber.replace(/\s/g, '')}`} className="text-slate-600 hover:text-rose-500">{mobileNumber}</a>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 text-rose-500"><Mail className="h-6 w-6" /></div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-900">Email</h3>
                  <a href={`mailto:${emailAddress}`} className="text-slate-600 hover:text-rose-500">{emailAddress}</a>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 text-rose-500"><MapPin className="h-6 w-6" /></div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-900">Studio</h3>
                  <a href={mapLink} target="_blank" rel="noreferrer" className="text-slate-600 hover:text-rose-500">{studioAddress}</a>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 text-rose-500"><Clock className="h-6 w-6" /></div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-900">Hours</h3>
                  <p className="text-slate-600  hover:text-rose-500">{workingHours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-100">
             <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700">Name</label>
                  <Input
                    type="text"
                    id="name"
                    required
                    className="mt-1"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Phone Number</label>
                  <Input
                    type="tel"
                    id="phone"
                    required
                    className="mt-1"
                    placeholder="+91 90000 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                {/* Event Date Picker (ShadCN UI) */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="eventDate" className="block text-sm font-medium text-slate-700">Event Date</label>
                  <div className="relative">
                    <Button
                      type="button"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal border-slate-200 h-10 bg-white text-slate-900",
                        !date && "text-slate-500"
                      )}
                      onClick={() => setShowCalendar(!showCalendar)}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                    
                    {showCalendar && (
                      <div className="absolute top-12 z-20 w-auto p-0 bg-white border rounded-md shadow-lg">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(d) => {
                            setDate(d);
                            setShowCalendar(false);
                          }}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700">Message</label>
                  <Textarea
                    id="message"
                    rows={4}
                    className="mt-1"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-50 disabled:cursor-not-allowed items-center gap-2"
                >
                   {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                   {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                
                {status && (
                  <p className={`text-sm text-center mt-2 ${status.includes('Error') || status.includes('Waiting') ? 'text-red-500' : 'text-slate-600'}`}>
                    {status}
                  </p>
                )}
                
                {debugInfo && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-xs text-red-700 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Debug Error:</span> {debugInfo}
                    </div>
                  </div>
                )}
             </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;