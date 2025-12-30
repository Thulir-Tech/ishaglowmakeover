"use client";

import { Instagram, Phone, Mail, MapPin } from 'lucide-react';
import appConfig from '@/lib/appConfig';

const socialMediaDetails = appConfig.socialMediaDetails;
const instagramHandle = socialMediaDetails.instagramHandle == undefined ? '' : socialMediaDetails.instagramHandle;
const instagramUrl = socialMediaDetails.instagramUrl == undefined ? '' : socialMediaDetails.instagramUrl;
const contactDetails = appConfig.contactDetails;
const mobileNumber = contactDetails.phone == undefined ? '' : contactDetails.phone;
const emailAddress = contactDetails.email == undefined ? '' : contactDetails.email;
const studioAddress = contactDetails.address == undefined ? '' : contactDetails.address;
const footerConfig = appConfig.footerConfig;
const brandName = footerConfig.brandName == undefined ? '' : footerConfig.brandName;
const description = footerConfig.description == undefined ? '' : footerConfig.description;
const copyrightText = footerConfig.copyrightText == undefined ? '' : footerConfig.copyrightText;
let copyrightLink = '#';
if (footerConfig.copyrightDirTypeID !== undefined) {
  if(footerConfig.copyrightDirTypeID == 1) { // Whatsapp Link
    copyrightLink = footerConfig.copyrightWhatsappLink == undefined ? '' : footerConfig.copyrightWhatsappLink;
  }
}

const Footer = () => (
    <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
                <h3 className="text-lg font-bold font-serif text-rose-400 mb-4">{brandName}</h3>
                <p className="text-slate-400 text-sm mb-4">
                    {description}
                </p>
                <a
                    href={copyrightLink}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <p className="text-slate-500 text-xs hover:text-rose-500 transition-colors">
                        {copyrightText}
                    </p>
                </a>
            </div>
            <div>
                <h3 className="text-lg font-bold mb-4">Contact</h3>
                <div className="space-y-2 text-slate-400 text-sm">
                    <a href="tel:+918778032363" className="flex items-center gap-2 hover:text-rose-400 transition-colors">
                        <Phone size={16} /> {mobileNumber}
                    </a>
                    <a href="mailto:rajeem65@gmail.com" className="flex items-center gap-2 hover:text-rose-400 transition-colors">
                        <Mail size={16} /> {emailAddress}
                    </a>
                    <a href="https://maps.app.goo.gl/C2nghbV3XYXA4f867" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-rose-400 transition-colors">
                        <MapPin size={16} /> {studioAddress}
                    </a>
                </div>
            </div>
            <div>
                <h3 className="text-lg font-bold mb-4">Follow Us</h3>
                <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-rose-400 transition-colors"
                >
                    <Instagram size={20} /> {instagramHandle}
                </a>
            </div>
        </div>
    </footer>
);

export default Footer;