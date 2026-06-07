import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, ChevronDown, Mail, Twitter, Facebook, ArrowUp, User, Building2, Send, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { NacetemLogo } from './NacetemLogo';

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
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
    const hasSeenNewsletter = window.sessionStorage.getItem('nacetem-newsletter-popup');
    if (hasSeenNewsletter) return;

    const timer = window.setTimeout(() => {
      setShowNewsletterPopup(true);
      window.sessionStorage.setItem('nacetem-newsletter-popup', 'shown');
    }, 1400);

    return () => window.clearTimeout(timer);
  }, []);

  const closeNewsletterPopup = () => {
    setShowNewsletterPopup(false);
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
    { name: 'News', href: '/news' },
    { name: 'Publications', href: '/publications' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-slate-50">
      {/* Main Header */}
      <header className="bg-slate-50/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/80 relative">
        {/* Scroll Progress Bar */}
        <div 
          className="absolute bottom-0 left-0 h-[2px] bg-gold transition-all duration-75 z-50"
          style={{ width: `${scrollProgress}%` }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <Link to="/" className="hover:opacity-90 transition-opacity pb-1 block">
              <NacetemLogo />
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
                      isActive(item.href) && !item.children
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
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition"
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
                      isActive(item.href) && !item.children
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
      <footer className="bg-emerald-600 text-white font-sans border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Logo space */}
            <div className="space-y-6">
              <NacetemLogo variant="light" />
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
              
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mt-8 mb-5 opacity-70">News & Events</h3>
              <ul className="space-y-3 font-medium text-sm">
                {['Latest News', 'Upcoming Events', 'Past Events'].map((item) => (
                  <li key={item}>
                    <Link to="/news" className="hover:text-emerald-200 flex items-center transition-colors">
                      <ChevronRight className="h-4 w-4 mr-1 opacity-70" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Research */}
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-5 opacity-70">Research & Capacity</h3>
              <ul className="space-y-3 font-medium text-sm">
                {['Research', 'Capacity Building', 'STI Indicator Dashboard', 'PSR Test'].map((item) => (
                  <li key={item}>
                    <Link to={`/${item.toLowerCase().replace(/ /g, '-')}`} className="hover:text-emerald-200 flex items-center transition-colors">
                      <ChevronRight className="h-4 w-4 mr-1 opacity-70" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>

              <h3 className="text-xs font-bold text-white uppercase tracking-wider mt-8 mb-5 opacity-70">Publications</h3>
              <ul className="space-y-3 font-medium text-sm">
                {['Policy Brief', 'Technical Report', 'Newsletter'].map((item) => (
                  <li key={item}>
                    <Link to="/publications" className="hover:text-emerald-200 flex items-center transition-colors">
                      <ChevronRight className="h-4 w-4 mr-1 opacity-70" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-5 opacity-70">Connect With Us</h3>
              <div className="flex space-x-4 mb-8">
                <a href="#" className="text-emerald-50 hover:text-white p-2 border border-emerald-400/30 rounded-sm transition-colors">
                  <span className="sr-only">Email</span>
                  <Mail className="h-5 w-5" />
                </a>
                <a href="#" className="text-emerald-50 hover:text-white p-2 border border-emerald-400/30 rounded-sm transition-colors">
                  <span className="sr-only">Twitter</span>
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-emerald-50 hover:text-white p-2 border border-emerald-400/30 rounded-sm transition-colors">
                  <span className="sr-only">Facebook</span>
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-emerald-500 text-xs text-center sm:text-left flex flex-col sm:flex-row justify-between items-center text-emerald-100">
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
          <button
            type="button"
            aria-label="Close newsletter popup"
            onClick={closeNewsletterPopup}
            className="absolute inset-0 bg-slate-900/65 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-3xl overflow-hidden rounded-[28px] bg-white shadow-2xl border border-white/70">
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
                {newsletterSubmitted ? (
                  <div className="min-h-[360px] flex flex-col items-center justify-center text-center">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="text-3xl font-serif text-slate-900 mb-4">Thank you for joining.</h3>
                    <p className="text-sm text-slate-600 leading-7 max-w-sm">
                      Your details have been received. You will now get NACETEM newsletter updates and programme announcements.
                    </p>
                    <button
                      type="button"
                      onClick={closeNewsletterPopup}
                      className="mt-8 inline-flex items-center justify-center rounded-[8px] bg-emerald-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-emerald-700 transition-colors"
                    >
                      Continue Browsing
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-3xl font-serif text-slate-900 mb-3">Join Our Newsletter</h3>
                    <p className="text-sm text-slate-600 leading-7 mb-8">
                      Fill in your details to receive periodical updates about NACETEM activities, publications, and events.
                    </p>

                    <form
                      className="space-y-5"
                      onSubmit={(event) => {
                        event.preventDefault();
                        setNewsletterSubmitted(true);
                      }}
                    >
                      <div>
                        <label htmlFor="newsletter-name" className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                          <input
                            id="newsletter-name"
                            type="text"
                            required
                            placeholder="Your full name"
                            className="w-full rounded-[8px] border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/10"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="newsletter-email" className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                          <input
                            id="newsletter-email"
                            type="email"
                            required
                            placeholder="you@example.com"
                            className="w-full rounded-[8px] border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/10"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="newsletter-organization" className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                          Organization
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                          <input
                            id="newsletter-organization"
                            type="text"
                            placeholder="Institution, agency, or company"
                            className="w-full rounded-[8px] border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/10"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="inline-flex w-full items-center justify-center rounded-[8px] bg-emerald-600 px-6 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-emerald-900/10 hover:bg-emerald-700 transition-colors"
                      >
                        <Send className="mr-2 h-4 w-4" /> Join Newsletter
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
