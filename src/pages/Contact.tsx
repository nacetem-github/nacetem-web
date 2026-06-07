import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Phone, Mail, Clock, Send, Handshake, BookOpen, Headphones, Facebook, Linkedin, Twitter, Youtube, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { assets } from '../assets';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

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
    position: { top: '60%', left: '19%' },
  },
  {
    zone: 'North Central',
    address: 'NACETEM North Operational office Office, 4th Floor, Federal Secretariat Complex, Phase II, Central Business District, Abuja, FCT.',
    lat: 9.062472,
    lng: 7.498484,
    position: { top: '43%', left: '43%' },
  },
  {
    zone: 'North Central',
    address: 'NACETEM North Central Training Office, No. 3 Dunukofia Street, Opposite NNPC Staff Quarters/JSS, Area 11, Garki, Abuja, FCT.',
    lat: 9.041927,
    lng: 7.500756,
    position: { top: '43%', left: '43%' },
  },
  {
    zone: 'North West',
    address: 'NACETEM North West Office, Federal Secretariat Complex, No. 1 Katsina Road, Kano, Kano State.',
    lat: 12.02382,
    lng: 8.51435,
    position: { top: '17%', left: '52%' },
  },
  {
    zone: 'North East',
    address: 'NACETEM North East Office, Former Pre-Degree Block, Modibbo Adama University, Yola, Adamawa State.',
    lat: 9.3489,
    lng: 12.5032,
    position: { top: '40%', left: '84%' },
  },
  {
    zone: 'South South',
    address: 'NACETEM South South Office, Niger Delta University, Wilberforce Island, Amassoma, Bayelsa State.',
    lat: 4.974712,
    lng: 6.104635,
    position: { top: '82%', left: '32%' },
  },
  {
    zone: 'South East',
    address: 'NACETEM South East Office, No. 3 Presidential Road, Opposite Presidential Hotel (PRODA Premises), Independence Layout, Enugu, Enugu State.',
    lat: 6.44113,
    lng: 7.510119,
    position: { top: '68%', left: '45%' },
  },
  {
    zone: 'South West',
    address: 'NACETEM South West/Lagos Office, House 10, Subuola Abu Street, Greenland Estate, Lagos State.',
    lat: 6.479288,
    lng: 3.608023,
    position: { top: '68%', left: '10%' },
  },
];

export default function Contact() {
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
                    P.M.B. 012, Obafemi Awolowo University<br/>
                    Ile-Ife, Osun State, Nigeria
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
                    <p>Saturday & Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="lg:w-2/3">
              <div className="bg-slate-50 border-[2.11px] border-slate-200 rounded-[11px] p-8 md:p-12">
                <h2 className="text-3xl font-serif text-slate-900 mb-8">Send Us a Message</h2>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">Full Name</label>
                      <input type="text" id="name" className="w-full px-4 py-3 bg-white border border-slate-300 rounded-[6px] focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-slate-900 transition-colors" placeholder="Your full name" required />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">Email Address</label>
                      <input type="email" id="email" className="w-full px-4 py-3 bg-white border border-slate-300 rounded-[6px] focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-slate-900 transition-colors" placeholder="your.email@example.com" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">Phone Number</label>
                      <input type="tel" id="phone" className="w-full px-4 py-3 bg-white border border-slate-300 rounded-[6px] focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-slate-900 transition-colors" placeholder="+234 XXX XXX XXXX" />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">Subject</label>
                      <input type="text" id="subject" className="w-full px-4 py-3 bg-white border border-slate-300 rounded-[6px] focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-slate-900 transition-colors" placeholder="How can we help?" required />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">Message</label>
                    <textarea id="message" rows={5} className="w-full px-4 py-3 bg-white border border-slate-300 rounded-[6px] focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-slate-900 transition-colors resize-none" placeholder="Write your message here..." required></textarea>
                  </div>
                  <button type="submit" className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 text-white font-bold text-sm tracking-widest uppercase hover:bg-emerald-700 transition-colors rounded-[6px] w-full sm:w-auto">
                    Send Message <Send className="ml-2 h-4 w-4" />
                  </button>
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
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: Facebook, name: "Facebook", link: "#" },
                  { icon: Linkedin, name: "LinkedIn", link: "#" },
                  { icon: Twitter, name: "X (Twitter)", link: "#" },
                  { icon: Youtube, name: "YouTube", link: "#" },
                  { icon: Instagram, name: "Instagram", link: "#" }
                ].map((social, idx) => (
                  <a key={idx} href={social.link} className="w-12 h-12 flex items-center justify-center bg-slate-50 border-[2.11px] border-slate-200 rounded-[11px] text-slate-600 hover:text-emerald-700 hover:border-emerald-200 transition-all">
                    <social.icon className="w-5 h-5" />
                    <span className="sr-only">{social.name}</span>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Map */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="lg:w-2/3">
              <h2 className="text-3xl font-serif text-slate-900 mb-6">Locate Our Offices</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Visit our headquarters or zonal offices for inquiries, meetings, partnerships, and official engagements.
              </p>
              <div className="w-full overflow-hidden rounded-2xl border border-slate-300 bg-slate-100 shadow-sm">
                <div className="relative aspect-[16/12] sm:aspect-[21/10] overflow-hidden">
                  <iframe
                    title="NACETEM offices across Nigeria"
                    src="https://maps.google.com/maps?q=Nigeria&z=6&output=embed"
                    className="absolute inset-0 h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="absolute inset-0 bg-white/10 pointer-events-none"></div>
                  {officeLocations.map((office) => (
                    <a
                      key={office.zone}
                      href={`https://www.google.com/maps/search/?api=1&query=${office.lat},${office.lng}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${office.zone} office on Google Maps`}
                      className="absolute z-10 -translate-x-1/2 -translate-y-full group"
                      style={{ top: office.position.top, left: office.position.left }}
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-emerald-600 text-white shadow-[0_10px_22px_rgba(0,0,0,0.28)] transition-transform group-hover:-translate-y-1">
                        <MapPin className="h-5 w-5" />
                      </span>
                      <span className="absolute left-1/2 top-10 hidden w-36 -translate-x-1/2 rounded-[6px] bg-slate-900 px-3 py-2 text-center text-[10px] font-bold uppercase tracking-wider text-white shadow-xl group-hover:block">
                        {office.zone}
                      </span>
                    </a>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-200 bg-white p-5">
                  {officeLocations.map((office) => (
                    <a
                      key={office.zone}
                      href={`https://www.google.com/maps/search/?api=1&query=${office.lat},${office.lng}`}
                      target="_blank"
                      rel="noreferrer"
                      className="group rounded-[8px] border border-slate-200 p-4 transition-colors hover:border-emerald-300 hover:bg-emerald-50/50"
                    >
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-700">{office.zone}</h3>
                        <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-emerald-700" />
                      </div>
                      <p className="text-xs leading-6 text-slate-600">{office.address}</p>
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
