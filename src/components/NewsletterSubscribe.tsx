import { FormEvent, useState } from 'react';
import { CheckCircle2, Mail, Send, XCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterSubscribe() {
  const [email, setEmail] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [message, setMessage] = useState('Get NACETEM news, events, publications, and programme updates in your inbox.');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    if (!emailPattern.test(normalizedEmail)) {
      setSubmitState('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setSubmitState('loading');
    setMessage('Subscribing...');

    try {
      if (supabase) {
        const { error } = await supabase.from('newsletter_subscribers').insert([
          {
            email: normalizedEmail,
            status: 'subscribed',
            source: 'website_homepage',
            subscribed_at: new Date().toISOString(),
          },
        ]);

        if (error) {
          if (error.code === '23505') {
            setSubmitState('success');
            setEmail('');
            setMessage('You are already on the NACETEM newsletter list.');
            return;
          }

          throw error;
        }
      } else {
        const response = await fetch('/api/newsletter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: normalizedEmail, source: 'website_homepage' }),
        });

        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(data?.error || 'Unable to subscribe right now.');
        }
      }

      setSubmitState('success');
      setEmail('');
      setMessage('Thank you for subscribing. You are on the NACETEM newsletter list.');
    } catch (error) {
      setSubmitState('error');
      const errorMessage = error instanceof Error
        ? error.message
        : typeof error === 'object' && error && 'message' in error
          ? String(error.message)
          : 'Unable to subscribe right now. Please try again.';
      setMessage(errorMessage);
    }
  };

  const isLoading = submitState === 'loading';

  return (
    <section className="bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-center">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest mb-4 border-b border-gold/70 pb-1">
              <Mail className="h-4 w-4" />
              Newsletter
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 mb-4 leading-tight">
              Stay connected with NACETEM updates
            </h2>
            <p className="text-sm text-slate-600 leading-7 max-w-2xl">
              Receive selected updates on training opportunities, research outputs, events, institutional news, and innovation programmes.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col sm:flex-row gap-3 rounded-[11px] border border-slate-200 bg-slate-50 p-3 shadow-sm">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (submitState !== 'idle') {
                    setSubmitState('idle');
                    setMessage('Get NACETEM news, events, publications, and programme updates in your inbox.');
                  }
                }}
                placeholder="Enter your email address"
                disabled={isLoading}
                className="min-h-12 flex-1 rounded-[6px] border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 disabled:cursor-not-allowed disabled:opacity-70"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[6px] bg-emerald-600 px-6 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
                <Send className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-3 flex items-start gap-2 text-sm text-slate-600" role="status" aria-live="polite">
              {submitState === 'success' ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /> : null}
              {submitState === 'error' ? <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" /> : null}
              <p>{message}</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
