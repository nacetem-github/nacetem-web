import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Phone, Mail, Clock, Send, Handshake, BookOpen, Headphones, Facebook, Linkedin, Instagram, MessageCircle, Plus, Minus, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { divIcon, type Map as LeafletMap } from 'leaflet';
import { assets } from '../assets';
import { officialSocialLinks, type SocialPlatform } from '../socialLinks';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const contactSocialIcons = { linkedin: Linkedin, facebook: Facebook, whatsapp: MessageCircle, instagram: Instagram } satisfies Record<SocialPlatform, typeof Linkedin>;

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const officeLocations = [
  {
    zone: 'Headquarters',
    address: 'National Centre for Technology Management (NACETEM), P.M.B. 012, Obafemi Awolowo University, Ile-Ife, Osun State, Nigeria.',
    lat: 7.520767,
    lng: 4.530315,
  },
  {
    zone: 'North Central',
    address: 'NACETEM North Operational office Office, 4th Floor, Federal Secretariat Complex, Phase II, Central Business District, Abuja, FCT.',
    lat: 9.062472,
    lng: 7.498484,
  },
  {
    zone: 'North Central',
    address: 'NACETEM North Central Training Office, No. 3 Dunukofia Street, Opposite NNPC Staff Quarters/JSS, Area 11, Garki, Abuja, FCT.',
    lat: 9.041927,
    lng: 7.500756,
    positionClass: 'top-[43%] left-[43%]',
  },
  {
    zone: 'North West',
    address: 'NACETEM North West Office, Federal Secretariat Complex, No. 1 Katsina Road, Kano, Kano State.',
    lat: 12.02382,
    lng: 8.51435,
    positionClass: 'top-[17%] left-[52%]',
  },
  {
    zone: 'North East',
    address: 'NACETEM North East Office, Former Pre-Degree Block, Modibbo Adama University, Yola, Adamawa State.',
    lat: 9.3489,
    lng: 12.5032,
    positionClass: 'top-[40%] left-[84%]',
  },
  {
    zone: 'South South',
    address: 'NACETEM South South Office, Niger Delta University, Wilberforce Island, Amassoma, Bayelsa State.',
    lat: 4.974712,
    lng: 6.104635,
    positionClass: 'top-[82%] left-[32%]',
  },
  {
    zone: 'South East',
    address: 'NACETEM South East Office, No. 3 Presidential Road, Opposite Presidential Hotel (PRODA Premises), Independence Layout, Enugu, Enugu State.',
    lat: 6.44113,
    lng: 7.510119,
    positionClass: 'top-[68%] left-[45%]',
  },
  {
    zone: 'South West',
    address: 'NACETEM SouthWest Zonal Office,No. 9, Kofo Abayomi Street,Victoria Island,Lagos.',
    lat: 6.479288,
    lng: 3.608023,
  },
];

const mapCenter: [number, number] = [8.5, 7.3];

const markerIcon = divIcon({
  className: '',
  html: `<div style="width:32px;height:32px;border-radius:9999px;background:#10b981;border:4px solid white;box-shadow:0 12px 20px rgba(15,23,42,0.24);display:flex;align-items:center;justify-content:center;">` +
    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7z" fill="white"/><path d="M12 12.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" fill="#10b981"/></svg>` +
  `</div>`,
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const contactEmail = 'info@nacetem.gov.ng';

export default function Contact() {
  const [mapZoom, setMapZoom] = useState(6);
  const [map, setMap] = useState<LeafletMap | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [serverStatus, setServerStatus] = useState<string | null>(null);
  const [showFallbackHint, setShowFallbackHint] = useState(false);
  const [isServerSubmitting, setIsServerSubmitting] = useState(false);
  const minZoom = 4;
  const maxZoom = 12;

  useEffect(() => {
    if (map) {
      map.setZoom(mapZoom);
    }
  }, [map, mapZoom]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const mailSubject = `NACETEM Contact Form: ${subject || 'General Inquiry'}`;
    const mailBody = `Name: ${name}%0D%0AEmail: ${email}%0D%0APhone: ${phone || 'N/A'}%0D%0A%0D%0AMessage:%0D%0A${message}`;
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(mailSubject)}&body=${mailBody}`;
    setShowFallbackHint(true);
  };

  const handleServerSubmit = async () => {
    setServerStatus(null);
    setIsServerSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, subject, message }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'Unable to send message via server.');
      }

      setServerStatus('Message sent successfully via server fallback.');
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
      setShowFallbackHint(false);
    } catch (error) {
      setServerStatus(
        `Server fallback failed: ${error instanceof Error ? error.message : 'please try again later.'}`,
      );
    } finally {
      setIsServerSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-900 border-b-8 border-gold">
        <div className="absolute inset-0">
          <img 
            src={assets.headquartersImage} 
            alt="Contact NACETEM" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-3xl mx-auto">
            <div className="inline-flex items-center text-gold text-xs font-bold uppercase tracking-widest mb-6 border-b border-gold pb-1 px-1">
              Contact NACETEM
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight mb-6">
              We Would Love to Hear From You
            </h1>
            <p className="text-lg text-slate-100/90 mb-10 leading-relaxed">
              Have questions, partnership inquiries, training requests, research collaborations, or need support? Reach out to our team and we will respond promptly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2 & 3. Contact Info & Form */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Contact Information */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="lg:w-1/3">
              <h2 className="text-3xl font-serif text-slate-900 mb-8">Get In Touch</h2>
              
              <div className="space-y-8">
                <div className="flex flex-col">
                  <div className="flex items-center text-emerald-700 font-bold mb-2">
                    <MapPin className="h-5 w-5 mr-3" />
                    Office Address
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed pl-8">
                    National Centre for Technology Management (NACETEM)<br/>
                    SouthWest Zonal Office,<br/>
                    No. 9, Kofo Abayomi Street,<br/>
                    Victoria Island, Lagos.
                  </p>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center text-emerald-700 font-bold mb-2">
                    <Phone className="h-5 w-5 mr-3" />
                    Phone Numbers
                  </div>
                  <div className="text-slate-600 text-sm leading-relaxed pl-8">
                    <p><a href="tel:+2348063753640" className="hover:text-emerald-600 transition-colors">08063753640</a></p>
                    <p><a href="tel:+2348055154949" className="hover:text-emerald-600 transition-colors">08055154949</a></p>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center text-emerald-700 font-bold mb-2">
                    <Mail className="h-5 w-5 mr-3" />
                    Email Address
                  </div>
                  <div className="text-slate-600 text-sm leading-relaxed pl-8">
                    <p><a href="mailto:dg.ceo@nacetem.gov.ng" className="hover:text-emerald-600 transition-colors">dg.ceo@nacetem.gov.ng</a></p>
                    <p><a href="mailto:info@nacetem.gov.ng" className="hover:text-emerald-600 transition-colors">info@nacetem.gov.ng</a></p>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center text-emerald-700 font-bold mb-2">
                    <Clock className="h-5 w-5 mr-3" />
                    Working Hours
                  </div>
                  <div className="text-slate-600 text-sm leading-relaxed pl-8">
                    <p>Monday – Friday: 8:00 AM – 4:00 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div id="contact-form" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="scroll-mt-28 lg:w-2/3">
              <div className="bg-slate-50 border-[2.11px] border-slate-200 rounded-[11px] p-8 md:p-12">
                <h2 className="text-3xl font-serif text-slate-900 mb-8">Send Us a Message</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-[6px] focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-slate-900 transition-colors"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-[6px] focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-slate-900 transition-colors"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-[6px] focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-slate-900 transition-colors"
                        placeholder="+234 XXX XXX XXXX"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-[6px] focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-slate-900 transition-colors"
                        placeholder="How can we help?"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">Message</label>
                    <textarea
                      id="message"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-[6px] focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-slate-900 transition-colors resize-none"
                      placeholder="Write your message here..."
                      required
                    ></textarea>
                  </div>
                  <p className="text-xs text-slate-500">When you submit, your email client will open with the message addressed to {contactEmail}. If your local email client does not open, use the server fallback button.</p>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <button type="submit" className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 text-white font-bold text-sm tracking-widest uppercase hover:bg-emerald-700 transition-colors rounded-[6px] w-full sm:w-auto">
                      Send Message <Send className="ml-2 h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleServerSubmit}
                      disabled={isServerSubmitting}
                      className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white font-bold text-sm tracking-widest uppercase hover:bg-slate-800 transition-colors rounded-[6px] w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isServerSubmitting ? 'Sending...' : 'Send via Server'}
                    </button>
                  </div>
                  {showFallbackHint ? (
                    <div className="mt-3 rounded-2xl border border-amber-300/80 bg-amber-50/80 p-3 text-sm text-amber-900">
                      Your local email client didn&apos;t open? Click <span className="font-semibold">Send via Server</span> to submit using the fallback path.
                    </div>
                  ) : null}
                  {serverStatus ? (
                    <p className="mt-3 text-sm text-slate-700">{serverStatus}</p>
                  ) : null}
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Quick Contact Cards */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif mb-6">How Can We Help You?</h2>
            <p className="text-slate-100/80 max-w-2xl mx-auto">Direct your inquiry to the right department for a faster response.</p>
          </div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Handshake, title: "Partnership & Collaboration", desc: "Interested in strategic partnerships, research collaboration, or institutional engagement? Our team is ready to work with you." },
              { icon: BookOpen, title: "Training & Capacity Building", desc: "Need information about our training programmes, workshops, certifications, or digital academy? Contact our training department." },
              { icon: Headphones, title: "Technical Support", desc: "Need help with NACETEM platforms, digital systems, or online services? Our support team is available to assist you." }
            ].map((card, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="bg-slate-800 border border-slate-700 p-8 rounded-[11px] hover:border-emerald-500 transition-colors flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-emerald-900/50 flex items-center justify-center rounded-full mb-6">
                  <card.icon className="h-8 w-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-serif text-gold mb-4">{card.title}</h3>
                <p className="text-sm text-slate-100/90 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. Social Media & Map */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Social Media */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="lg:w-1/3">
              <h2 className="text-3xl font-serif text-slate-900 mb-6">Connect With Us</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Stay updated with our latest programmes, innovations, research activities, and national initiatives.
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {officialSocialLinks.map((social) => {
                  const Icon = contactSocialIcons[social.platform];
                  return (
                    <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-[11px] border-2 border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 transition-all hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800">
                      <span className="flex items-center gap-3"><Icon className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-wider">{social.name}</span></span>
                      <ExternalLink className="h-3.5 w-3.5 opacity-50 transition-opacity group-hover:opacity-100" />
                    </a>
                  );
                })}
              </div>
            </motion.div>

            {/* Map */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="lg:w-2/3">
              <h2 className="text-3xl font-serif text-slate-900 mb-6">Locate Our Offices</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Visit our headquarters or zonal offices for inquiries, meetings, partnerships, and official engagements.
              </p>
              <div className="w-full overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)] backdrop-blur-xl">
                <div className="relative aspect-[16/12] sm:aspect-[21/10] overflow-hidden">
                  <MapContainer
                    center={mapCenter}
                    zoom={mapZoom}
                    whenCreated={setMap}
                    scrollWheelZoom={true}
                    zoomControl={false}
                    className="h-full w-full"
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {officeLocations.map((office) => (
                      <Marker key={office.zone} position={[office.lat, office.lng]} icon={markerIcon}>
                        <Popup>
                          <div className="max-w-xs">
                            <h3 className="text-sm font-bold text-slate-900">{office.zone}</h3>
                            <p className="text-xs text-slate-600 mt-1">{office.address}</p>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>

                  <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-2">
                    <div className="rounded-2xl bg-white/95 border border-slate-200/80 shadow-xl p-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setMapZoom((current) => Math.max(minZoom, current - 1))}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white hover:bg-slate-900 transition"
                        aria-label="Zoom out"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setMapZoom((current) => Math.min(maxZoom, current + 1))}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white hover:bg-slate-900 transition"
                        aria-label="Zoom in"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="rounded-2xl bg-slate-900/90 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-100 shadow-lg">
                      Zoom {mapZoom}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-200 bg-slate-50 p-5">
                  {officeLocations.map((office) => (
                    <a
                      key={office.zone}
                      href={`https://www.google.com/maps/search/?api=1&query=${office.lat},${office.lng}`}
                      target="_blank"
                      rel="noreferrer"
                      className="group rounded-[16px] border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md"
                    >
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <span className="rounded-full bg-emerald-600/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                          {office.zone}
                        </span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-emerald-700" />
                      </div>
                      <p className="text-sm leading-6 text-slate-600">{office.address}</p>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. Call To Action */}
      <section className="py-24 bg-emerald-900 relative overflow-hidden text-center text-white">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-serif mb-6 leading-tight">Let's Build Innovation Together</h2>
          <p className="text-emerald-100 text-lg mb-10 leading-relaxed">
            Partner with NACETEM to advance Science, Technology, Innovation, and Digital Transformation in Nigeria.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="inline-flex items-center justify-center px-8 py-4 bg-gold text-slate-900 font-bold text-sm tracking-widest uppercase hover:bg-white hover:text-emerald-900 transition-colors rounded-[6px]">
              Contact Us <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <Link to="/initiatives" className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-emerald-500 text-white font-bold text-sm tracking-widest uppercase hover:bg-emerald-800 transition-colors rounded-[6px]">
              Explore Our Programmes
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
