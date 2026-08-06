import React, { useEffect, useState } from 'react';
import { Send, X } from 'lucide-react';

const contactEmail = 'info@nacetem.gov.ng';

type ProgramInterestModalProps = {
  isOpen: boolean;
  onClose: () => void;
  programTitle: string;
  studyCentres?: string[];
};

export default function ProgramInterestModal({ isOpen, onClose, programTitle, studyCentres = [] }: ProgramInterestModalProps) {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [studyCentre, setStudyCentre] = useState('');
  const [notes, setNotes] = useState('');
  const [showFallbackHint, setShowFallbackHint] = useState(false);
  const [serverStatus, setServerStatus] = useState<string | null>(null);
  const [isServerSubmitting, setIsServerSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setWhatsapp('');
      setEmail('');
      setStudyCentre('');
      setNotes('');
      setShowFallbackHint(false);
      setServerStatus(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const buildMessage = () =>
    `Programme: ${programTitle}\nWhatsApp Number: ${whatsapp}\nPreferred Study Centre: ${studyCentre || 'No preference'}\n\nAdditional Information:\n${notes || 'N/A'}`;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const mailSubject = `Programme Interest: ${programTitle}`;
    const mailBody = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${encodeURIComponent(buildMessage())}`;
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(mailSubject)}&body=${mailBody}`;
    setShowFallbackHint(true);
  };

  const handleServerSubmit = async () => {
    setServerStatus(null);
    setIsServerSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone: whatsapp,
          subject: `Programme Interest: ${programTitle}`,
          message: buildMessage(),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'Unable to send message via server.');
      }

      setServerStatus('Your interest has been submitted successfully. Our team will reach out to you shortly.');
      setName('');
      setWhatsapp('');
      setEmail('');
      setStudyCentre('');
      setNotes('');
      setShowFallbackHint(false);
    } catch (error) {
      setServerStatus(`Server fallback failed: ${error instanceof Error ? error.message : 'please try again later.'}`);
    } finally {
      setIsServerSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/70 px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="program-interest-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[11px] bg-white p-7 sm:p-9 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close form"
          className="absolute top-5 right-5 inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="w-12 h-1 bg-gold mb-6"></div>
        <h2 id="program-interest-title" className="text-2xl font-serif text-slate-900 mb-2">
          Declare Your Interest
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          Share your details for <span className="font-semibold text-slate-800">{programTitle}</span> and our admissions team
          will contact you with next steps.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="interest-name" className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="interest-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-[6px] focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-slate-900 transition-colors"
              placeholder="Your full name"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="interest-whatsapp" className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">
                WhatsApp Number
              </label>
              <input
                type="tel"
                id="interest-whatsapp"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-[6px] focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-slate-900 transition-colors"
                placeholder="+234 XXX XXX XXXX"
                required
              />
            </div>
            <div>
              <label htmlFor="interest-email" className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="interest-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-[6px] focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-slate-900 transition-colors"
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          {studyCentres.length > 0 && (
            <div>
              <label htmlFor="interest-centre" className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">
                Preferred Study Centre
              </label>
              <select
                id="interest-centre"
                value={studyCentre}
                onChange={(e) => setStudyCentre(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-[6px] focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-slate-900 transition-colors"
              >
                <option value="">No preference</option>
                {studyCentres.map((centre) => (
                  <option key={centre} value={centre}>
                    {centre}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label htmlFor="interest-notes" className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">
              Additional Information <span className="normal-case font-normal text-slate-400">(optional)</span>
            </label>
            <textarea
              id="interest-notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-[6px] focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-slate-900 transition-colors resize-none"
              placeholder="Anything else we should know? (e.g. current occupation, questions)"
            ></textarea>
          </div>

          <p className="text-xs text-slate-500">
            When you submit, your email client will open addressed to {contactEmail}. If it does not open, use the server
            fallback button below.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              className="inline-flex flex-1 items-center justify-center px-6 py-3 bg-emerald-700 text-white font-bold text-xs tracking-widest uppercase hover:bg-emerald-800 transition-colors rounded-[6px]"
            >
              Submit Interest <Send className="ml-2 h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleServerSubmit}
              disabled={isServerSubmitting}
              className="inline-flex flex-1 items-center justify-center px-6 py-3 bg-slate-900 text-white font-bold text-xs tracking-widest uppercase hover:bg-slate-800 transition-colors rounded-[6px] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isServerSubmitting ? 'Sending...' : 'Send via Server'}
            </button>
          </div>

          {showFallbackHint ? (
            <div className="rounded-2xl border border-amber-300/80 bg-amber-50/80 p-3 text-sm text-amber-900">
              Your local email client didn&apos;t open? Click <span className="font-semibold">Send via Server</span> to submit
              using the fallback path.
            </div>
          ) : null}
          {serverStatus ? <p className="text-sm text-slate-700">{serverStatus}</p> : null}
        </form>
      </div>
    </div>
  );
}
