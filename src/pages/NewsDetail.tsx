import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, Tag, UserRound } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getNewsArticleBySlug, newsArticles } from '../data/news';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export default function NewsDetail() {
  const { slug } = useParams();
  const article = getNewsArticleBySlug(slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 pt-32 pb-24 px-4">
        <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 text-center shadow-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-gold mb-4">News Article</p>
          <h1 className="text-3xl sm:text-4xl font-serif text-slate-900 mb-4">Article Not Found</h1>
          <p className="text-slate-600 leading-relaxed mb-8">
            The article you are trying to open could not be found. It may have been moved, renamed, or removed.
          </p>
          <Link
            to="/news"
            className="inline-flex items-center justify-center px-6 py-3 bg-emerald-700 text-white text-xs font-bold uppercase tracking-widest rounded-[6px] hover:bg-emerald-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to News
          </Link>
        </div>
      </div>
    );
  }

  const relatedArticles = newsArticles
    .filter((item) => item.id !== article.id)
    .slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 bg-slate-900 overflow-hidden border-b-8 border-gold">
        <div className="absolute inset-0">
          <img
            src={article.image}
            alt={article.imageAlt}
            className="w-full h-full object-cover opacity-25 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/85 to-slate-900/30" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            to="/news"
            className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-gold hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to News
          </Link>

          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center bg-gold text-slate-900 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm">
                <Tag className="h-3 w-3 mr-1.5" /> {article.category}
              </span>
              <span className="inline-flex items-center text-slate-200 text-xs font-bold uppercase tracking-widest">
                <Calendar className="h-4 w-4 mr-2 text-gold" /> {article.date}
              </span>
              {article.author && (
                <span className="inline-flex items-center text-slate-200 text-xs font-bold uppercase tracking-widest">
                  <UserRound className="h-4 w-4 mr-2 text-gold" /> By {article.author}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white leading-tight max-w-4xl">
              {article.title}
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm mb-12">
              <img src={article.image} alt={article.imageAlt} className="w-full h-[260px] sm:h-[420px] object-cover" />
            </div>

            <article className="max-w-3xl mx-auto">
              {article.author && (
                <p className="mb-5 text-xs font-bold uppercase tracking-widest text-emerald-700">
                  Written by {article.author}
                </p>
              )}
              <p className="text-xl text-slate-700 leading-relaxed mb-10 font-serif border-l-4 border-gold pl-6">
                {article.summary}
              </p>

              <div className="space-y-6 text-slate-700 leading-8 text-[15px] sm:text-base">
                {article.content.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                <Link
                  to="/news"
                  className="inline-flex items-center justify-center px-6 py-3 border border-emerald-700 text-emerald-800 text-xs font-bold uppercase tracking-widest rounded-[6px] hover:bg-emerald-50 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back to News
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-emerald-700 text-white text-xs font-bold uppercase tracking-widest rounded-[6px] hover:bg-emerald-800 transition-colors"
                >
                  Contact NACETEM <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </div>
            </article>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-xs font-bold text-gold uppercase tracking-widest mb-3">Continue Reading</p>
            <h2 className="text-3xl sm:text-4xl font-serif text-slate-900">Related News</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map((item) => (
              <Link
                key={item.id}
                to={`/news/${item.slug}`}
                className="group bg-white border border-slate-200 rounded-[11px] overflow-hidden hover:border-emerald-500 transition-colors flex flex-col h-full"
              >
                <div className="h-44 overflow-hidden relative">
                  <img src={item.image} alt={item.imageAlt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-xs text-gold mb-3 font-bold uppercase tracking-widest">{item.date}</p>
                  <h3 className="text-lg font-serif text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug mb-4">{item.title}</h3>
                  <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-emerald-700 mt-auto">
                    Read More <ArrowRight className="h-4 w-4 ml-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
