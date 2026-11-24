import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  FileSpreadsheet,
  Gamepad2,
  Layers3,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const tools = [
  {
    name: 'Gamification of the PSR',
    category: 'Public service learning',
    description:
      'Explore the Public Service Rules through an engaging, game-based experience designed for public servants and organisations.',
    url: 'https://psrquest.nacetem.gov.ng',
    icon: Gamepad2,
    accent: 'bg-[#e6f2eb] text-emerald-800',
    number: '01',
  },
  {
    name: 'NomiSense AI',
    category: 'Nominal roll analysis',
    description:
      'A nominal roll analyser built to help organisations work with and better understand their workforce records.',
    url: 'https://nra.nacetem.gov.ng',
    icon: FileSpreadsheet,
    accent: 'bg-[#f5eedf] text-[#765b24]',
    number: '02',
  },
];

export default function DigitalTools() {
  return (
    <div className="flex-1 overflow-hidden bg-[#FDFDFB] font-sans text-[#1A1A1A]">
      <section className="relative isolate overflow-hidden border-b-4 border-gold bg-[#004d26] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-36 -top-40 h-[28rem] w-[28rem] rounded-full border-[64px] border-white/[0.06]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-48 right-[22%] h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-24">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-gold">
              <Sparkles aria-hidden="true" className="h-4 w-4" />
              NACETEM digital tools
            </div>
            <h1 className="max-w-3xl font-serif text-4xl leading-[1.08] text-white sm:text-5xl lg:text-7xl">
              Better tools.
              <span className="block text-gold">Better public service.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-emerald-50 sm:text-lg sm:leading-8">
              Discover practical digital tools developed at NACETEM to support
              public-sector learning and organisational work.
            </p>
            <a
              href="#available-tools"
              className="mt-9 inline-flex min-h-12 items-center justify-center gap-3 rounded-sm bg-gold px-6 py-3 text-sm font-bold text-[#1A1A1A] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#004d26]"
            >
              Explore available tools
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-12 right-10 hidden rotate-6 rounded-2xl border border-white/15 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-sm lg:block"
          >
            <Layers3 className="h-16 w-16 text-gold" strokeWidth={1.2} />
          </div>
        </div>
      </section>

      <section
        id="available-tools"
        className="scroll-mt-24 py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
                Available now
              </p>
              <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
                Tools for real organisational needs
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-600 sm:text-base">
              Each tool is a separate service. Select one to visit its platform.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {tools.map((tool) => {
              const Icon = tool.icon;

              return (
                <article
                  key={tool.name}
                  className="group relative flex min-h-[22rem] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 hover:border-emerald-700/30 hover:shadow-[0_20px_50px_rgba(15,23,42,0.09)] sm:p-8"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border-[24px] border-slate-100/80 transition-colors group-hover:border-emerald-50"
                  />
                  <div className="relative flex items-start justify-between gap-4">
                    <span
                      className={`inline-flex h-14 w-14 items-center justify-center rounded-xl ${tool.accent}`}
                    >
                      <Icon aria-hidden="true" className="h-7 w-7" strokeWidth={1.8} />
                    </span>
                    <span className="font-serif text-4xl text-slate-200">
                      {tool.number}
                    </span>
                  </div>
                  <div className="relative mt-8">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">
                      {tool.category}
                    </p>
                    <h3 className="mt-3 font-serif text-2xl sm:text-3xl">
                      {tool.name}
                    </h3>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                      {tool.description}
                    </p>
                  </div>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${tool.name} (opens in a new tab)`}
                    className="relative mt-auto inline-flex min-h-12 w-fit items-center gap-3 pt-8 text-sm font-bold text-emerald-800 transition-colors hover:text-emerald-950 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-4"
                  >
                    Open tool
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-[#f5f4ef] py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white text-emerald-800 shadow-sm">
              <Building2 aria-hidden="true" className="h-6 w-6" />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
              For organisations
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
              Interested in using a tool at your organisation?
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Get in touch with NACETEM to discuss these tools and your
              organisation’s needs.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex min-h-12 w-fit items-center justify-center gap-3 rounded-sm bg-[#006633] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#004d26] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
          >
            Contact NACETEM
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <div className="bg-white py-5">
        <p className="mx-auto flex max-w-7xl items-center gap-3 px-4 text-sm leading-6 text-slate-500 sm:px-6 lg:px-8">
          <Layers3 aria-hidden="true" className="h-4 w-4 shrink-0 text-gold" />
          More digital tools will be added as they become available.
        </p>
      </div>
    </div>
  );
}
