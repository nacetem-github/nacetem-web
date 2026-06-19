import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, ChevronDown, Mail, Twitter, Facebook, ArrowUp, User, Building2, Send, CheckCircle2, XCircle, MessageSquareWarning, ExternalLink } from 'lucide-react';
import { useState, useEffect, useRef, type FormEvent } from 'react';
import { cn } from '../lib/utils';
import { NacetemLogo } from './NacetemLogo';
import { supabase } from '../lib/supabase';

type NewsletterState = 'idle' | 'loading' | 'success' | 'error';

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false);
  const [newsletterState, setNewsletterState] = useState<NewsletterState>('idle');
  const [newsletterName, setNewsletterName] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterOrganization, setNewsletterOrganization] = useState('');
  const [newsletterMessage, setNewsletterMessage] = useState('');
  const newsletterDialogRef = useRef<HTMLDivElement>(null);
  const newsletterNameInputRef = useRef<HTMLInputElement>(null);
  const newsletterSuccessButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    window.setTimeout(() => {
      const target = document.querySelector(location.hash);
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const hasSeenNewsletter = window.sessionStorage.getItem('nacetem-newsletter-popup');
    if (hasSeenNewsletter) return;

    const timer = window.setTimeout(() => {
      setShowNewsletterPopup(true);
      window.sessionStorage.setItem('nacetem-newsletter-popup', 'shown');
    }, 12000);

    return () => window.clearTimeout(timer);
  }, []);

  const closeNewsletterPopup = () => {
    setShowNewsletterPopup(false);
  };

  useEffect(() => {
    if (!showNewsletterPopup) return;
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.requestAnimationFrame(() => newsletterNameInputRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeNewsletterPopup();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = (Array.from(newsletterDialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ) ?? []) as HTMLElement[]).filter((element) => !element.hasAttribute('hidden'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [showNewsletterPopup]);

  useEffect(() => {
    if (showNewsletterPopup && newsletterState === 'success') newsletterSuccessButtonRef.current?.focus();
  }, [newsletterState, showNewsletterPopup]);

  const handleNewsletterSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = newsletterEmail.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNewsletterState('error');
      setNewsletterMessage('Please enter a valid email address.');
      return;
    }

    setNewsletterState('loading');
    setNewsletterMessage('Submitting your subscription…');
    try {
      if (supabase) {
        const { error } = await supabase.from('newsletter_subscribers').insert({
          email,
          full_name: newsletterName.trim(),
          organization: newsletterOrganization.trim() || null,
          status: 'subscribed',
          source: 'website_popup',
          subscribed_at: new Date().toISOString(),
        });
        if (error && error.code !== '23505') throw error;
        setNewsletterMessage(error?.code === '23505' ? 'You are already on the NACETEM newsletter list.' : 'Your subscription has been recorded successfully.');
      } else {
        const response = await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, fullName: newsletterName.trim(), organization: newsletterOrganization.trim(), source: 'website_popup' }),
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(result.error || 'Unable to subscribe right now.');
        setNewsletterMessage('Your subscription has been recorded successfully.');
      }
      setNewsletterState('success');
      setNewsletterEmail('');
    } catch (error) {
      setNewsletterState('error');
      const message = error instanceof Error
        ? error.message
        : typeof error === 'object' && error && 'message' in error
          ? String(error.message)
          : 'Unable to subscribe right now. Please try again.';
      setNewsletterMessage(message);
    }
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { 
      name: 'Research', 
      href: '/research',
      children: [
        { name: 'Seminar Series', href: '/research/seminar-series' }
      ]
    },
    { name: 'Capacity Building', href: '/capacity-building' },
    { name: 'PSR Test', href: '/psr-test' },
    {
      name: 'News & Gallery',
      href: '/news',
      children: [
        { name: 'Upcoming Events', href: '/news#upcoming-events' },
        { name: 'Featured Stories', href: '/news#featured-stories' },
        { name: 'Event Gallery', href: '/news#event-gallery' },
      ],
    },
    {
      name: 'Publications',
      href: '/publications',
      children: [
        { name: 'Policy Brief', href: '/publications#policy-briefs' },
        { name: 'Technical Report', href: '/publications#technical-reports' },
        { name: 'Newsletter', href: '/publications#newsletter' },
      ],
    },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-slate-50">
      {/* Main Header */}
      <header className="sticky top-0 z-50 relative border-b border-slate-200/70 bg-white/85 shadow-[0_8px_30px_rgba(15,23,42,0.04)] backdrop-blur-xl">
        {/* Scroll Progress Bar */}
        <div 
          className="absolute bottom-0 left-0 h-[2px] bg-gold transition-all duration-75 z-50"
          style={{ width: `${scrollProgress}%` }}
        />
        <div className="border-b border-emerald-800 bg-emerald-950 text-white">
          <div className="mx-auto flex min-h-9 max-w-7xl items-center justify-center gap-2 px-4 py-1.5 text-center text-[11px] sm:justify-end sm:px-6 lg:px-8">
            <MessageSquareWarning className="h-3.5 w-3.5 shrink-0 text-gold" aria-hidden="true" />
            <span className="hidden text-white/75 sm:inline">Public or staff concern?</span>
            <a
              href="https://nacetem.gov.ng/nacetem_grm/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center font-bold uppercase tracking-wider text-gold transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              Submit a grievance <ExternalLink className="ml-1 h-3 w-3" aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-24 items-center justify-between sm:h-28">
            {/* Logo */}
            <Link
              to="/"
              aria-label="NACETEM home"
              className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-4"
            >
              <NacetemLogo className="group-hover:-translate-y-0.5 group-hover:border-emerald-600/25 group-hover:shadow-[0_12px_30px_rgba(0,102,51,0.12)]" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  <Link
                    to={item.href}
                    className={cn(
                      'text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center',
                      'py-2 border-b-2',
                      isActive(item.href)
                        ? 'border-emerald-600 text-slate-900 opacity-100'
                        : 'border-transparent text-slate-900 opacity-70 hover:opacity-100 hover:border-slate-300'
                    )}
                  >
                    {item.name}
                    {item.children && (
                      <ChevronDown className="w-3 h-3 ml-1 mb-[2px]" />
                    )}
                  </Link>

                  {item.children && (
                    <div className="absolute left-0 top-full mt-2 w-48 bg-white border border-slate-200 shadow-lg rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                      <div className="py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            className="block px-4 py-2 text-xs font-bold text-slate-700 uppercase tracking-wider hover:bg-emerald-50 hover:text-emerald-700"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-emerald-600/25 hover:bg-emerald-50 hover:text-emerald-700"
                aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.href}
                    onClick={() => {
                      if (!item.children) setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      'flex items-center justify-between px-3 py-2 rounded-md text-base font-medium',
                      isActive(item.href)
                        ? 'bg-emerald-50 text-emerald-800'
                        : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                    )}
                  >
                    {item.name}
                    {item.children && <ChevronDown className="h-4 w-4" />}
                  </Link>
                  {item.children && (
                    <div className="pl-4 pr-3 py-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-3 py-2 text-sm font-medium text-slate-500 hover:text-emerald-700 hover:bg-slate-50 rounded-md"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative overflow-hidden border-t-4 border-gold bg-[linear-gradient(135deg,#004d26_0%,#006633_55%,#075c35_100%)] font-sans text-white">
        <div className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full border-[72px] border-white/[0.035]" />
        <div className="pointer-events-none absolute -bottom-48 left-1/4 h-96 w-96 rounded-full bg-black/10 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="relative grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {/* Logo space */}
            <div className="space-y-6">
              <NacetemLogo variant="light" className="w-fit" />
              <p className="text-sm text-emerald-50 max-w-xs leading-relaxed opacity-90">
                NACETEM is a national institution advancing science, technology and innovation for evidence-based development.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-5 opacity-70">Agency</h3>
              <ul className="space-y-3 font-medium text-sm">
                {['About Us', 'Contact Us'].map((item) => (
                  <li key={item}>
                    <Link to={item === 'About Us' ? '/about' : '/contact'} className="hover:text-emerald-200 flex items-center transition-colors">
                      <ChevronRight className="h-4 w-4 mr-1 opacity-70" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mt-8 mb-5 opacity-70">News & Gallery</h3>
              <ul className="space-y-3 font-medium text-sm">
                {[
                  { name: 'Upcoming Events', href: '/news#upcoming-events' },
                  { name: 'Featured Stories', href: '/news#featured-stories' },
                  { name: 'Event Gallery', href: '/news#event-gallery' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link to={item.href} className="hover:text-emerald-200 flex items-center transition-colors">
                      <ChevronRight className="h-4 w-4 mr-1 opacity-70" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Research */}
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-5 opacity-70">Research & Capacity</h3>
              <ul className="space-y-3 font-medium text-sm">
                {[
                  { name: 'Research', href: '/research' },
                  { name: 'Capacity Building', href: '/capacity-building' },
                  { name: 'STI Indicator Dashboard', href: '/initiatives' },
                  { name: 'PSR Test', href: '/psr-test' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link to={item.href} className="hover:text-emerald-200 flex items-center transition-colors">
                      <ChevronRight className="h-4 w-4 mr-1 opacity-70" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <h3 className="text-xs font-bold text-white uppercase tracking-wider mt-8 mb-5 opacity-70">Publications</h3>
              <ul className="space-y-3 font-medium text-sm">
                {[
                  { name: 'Policy Brief', href: '/publications#policy-briefs' },
                  { name: 'Technical Report', href: '/publications#technical-reports' },
                  { name: 'Newsletter', href: '/publications#newsletter' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link to={item.href} className="hover:text-emerald-200 flex items-center transition-colors">
                      <ChevronRight className="h-4 w-4 mr-1 opacity-70" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-5 opacity-70">Connect With Us</h3>
              <div className="flex space-x-4 mb-8">
                <a href="#" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-emerald-50 transition-all hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/20 hover:text-white">
                  <span className="sr-only">Email</span>
                  <Mail className="h-5 w-5" />
                </a>
                <a href="#" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-emerald-50 transition-all hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/20 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-emerald-50 transition-all hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/20 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="relative mt-12 flex flex-col items-center justify-between border-t border-white/15 pt-8 text-center text-xs text-emerald-100 sm:flex-row sm:text-left">
            <p>
              &copy; {new Date().getFullYear()} NACETEM. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-full shadow-2xl hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-emerald-500/30 transition-all duration-300 transform scale-100 hover:scale-110 active:scale-95 group flex items-center justify-center cursor-pointer"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5 transform group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

      {showNewsletterPopup && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-6">
          <div
            aria-hidden="true"
            onClick={closeNewsletterPopup}
            className="absolute inset-0 bg-slate-900/65 backdrop-blur-sm"
          />
          <div ref={newsletterDialogRef} role="dialog" aria-modal="true" aria-labelledby="newsletter-popup-title" aria-describedby="newsletter-popup-description" className="relative max-h-[calc(100vh-3rem)] w-full max-w-3xl overflow-y-auto rounded-[28px] bg-white shadow-2xl border border-white/70">
            <button
              type="button"
              onClick={closeNewsletterPopup}
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-sm border border-slate-200 hover:text-emerald-700 hover:border-emerald-200 transition-colors"
              aria-label="Close newsletter form"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-[260px] bg-slate-900 p-8 sm:p-10 text-white overflow-hidden">
                <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border-[28px] border-emerald-500/20"></div>
                <div className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-emerald-500/15 blur-3xl"></div>
                <NacetemLogo variant="light" />
                <div className="relative mt-12">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-gold mb-4">NACETEM Newsletter</p>
                  <h2 className="text-3xl sm:text-4xl font-serif leading-tight mb-5">Stay close to STI updates.</h2>
                  <p className="text-sm leading-7 text-white/72">
                    Get updates on NACETEM programmes, research, policy briefs, training opportunities, and innovation activities.
                  </p>
                </div>
              </div>

              <div className="p-8 sm:p-10">
                {newsletterState === 'success' ? (
                  <div className="min-h-[360px] flex flex-col items-center justify-center text-center">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 id="newsletter-popup-title" className="text-3xl font-serif text-slate-900 mb-4">Thank you for joining.</h3>
                    <p id="newsletter-popup-description" className="text-sm text-slate-600 leading-7 max-w-sm">{newsletterMessage}</p>
                    <button
                      ref={newsletterSuccessButtonRef}
                      type="button"
                      onClick={closeNewsletterPopup}
                      className="mt-8 inline-flex items-center justify-center rounded-[8px] bg-emerald-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-emerald-700 transition-colors"
                    >
                      Continue Browsing
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 id="newsletter-popup-title" className="text-3xl font-serif text-slate-900 mb-3">Join Our Newsletter</h3>
                    <p id="newsletter-popup-description" className="text-sm text-slate-600 leading-7 mb-8">
                      Fill in your details to receive periodical updates about NACETEM activities, publications, and events.
                    </p>

                    <form
                      className="space-y-5"
                      onSubmit={handleNewsletterSubmit}
                    >
                      <div>
                        <label htmlFor="newsletter-popup-name" className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                          <input
                            ref={newsletterNameInputRef}
                            id="newsletter-popup-name"
                            type="text"
                            required
                            value={newsletterName}
                            onChange={(event) => setNewsletterName(event.target.value)}
                            placeholder="Your full name"
                            className="w-full rounded-[8px] border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/10"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="newsletter-popup-email" className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                          <input
                            id="newsletter-popup-email"
                            type="email"
                            required
                            value={newsletterEmail}
                            onChange={(event) => setNewsletterEmail(event.target.value)}
                            placeholder="you@example.com"
                            className="w-full rounded-[8px] border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/10"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="newsletter-popup-organization" className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                          Organization
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                          <input
                            id="newsletter-popup-organization"
                            type="text"
                            value={newsletterOrganization}
                            onChange={(event) => setNewsletterOrganization(event.target.value)}
                            placeholder="Institution, agency, or company"
                            className="w-full rounded-[8px] border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/10"
                          />
                        </div>
                      </div>

                      {newsletterMessage && (
                        <div className={`flex items-start gap-2 text-sm ${newsletterState === 'error' ? 'text-red-700' : 'text-slate-600'}`} role="status" aria-live="polite">
                          {newsletterState === 'error' && <XCircle className="mt-0.5 h-4 w-4 shrink-0" />}
                          <span>{newsletterMessage}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={newsletterState === 'loading'}
                        className="inline-flex w-full items-center justify-center rounded-[8px] bg-emerald-600 px-6 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-emerald-900/10 hover:bg-emerald-700 transition-colors"
                      >
                        <Send className="mr-2 h-4 w-4" /> {newsletterState === 'loading' ? 'Submitting…' : 'Join Newsletter'}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
