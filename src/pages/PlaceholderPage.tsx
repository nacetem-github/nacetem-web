import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PlaceholderPage({ title, description }: { title: string, description: string }) {
  return (
    <div className="flex-1 bg-slate-50 pb-20">
      {/* Header Banner */}
      <div className="bg-slate-100 py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="inline-flex items-center text-slate-500 hover:text-slate-900 text-xs font-bold uppercase tracking-widest mb-6 transition-colors">
            <ArrowLeft className="h-3 w-3 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl sm:text-5xl font-serif text-slate-900 tracking-tight">{title}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border border-slate-200 p-8 sm:p-12 min-h-[400px]">
          <div className="max-w-3xl">
            <div className="w-16 h-1 bg-gold mb-8"></div>
            <h2 className="text-2xl font-serif text-slate-900 mb-6">{description}</h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-8">
              This section of the NACETEM portal provides comprehensive information, resources, and institutional insights specifically aligned with our mandate for national innovation and technology management.
            </p>
            <div className="bg-slate-50 p-6 border border-slate-200 text-slate-600 text-xs leading-relaxed">
              <p>Content for this page will be updated in accordance with the latest Federal Ministry of Innovation, Science and Technology directives.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
