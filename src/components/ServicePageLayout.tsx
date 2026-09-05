import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Phone, MessageCircle, GraduationCap, CheckCircle2, Home } from "lucide-react";
import QuickBookingForm from "./QuickBookingForm";

export interface ServicePageProps {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  h1: string;
  subtitle: string;
  intro: string;
  bullets: string[];
  whyTitle: string;
  whyParagraphs: string[];
  waText: string;
  jsonLdName: string;
  jsonLdDescription: string;
  defaultStudyType: string;
}

const ServicePageLayout = (p: ServicePageProps) => {
  const url = `https://mahmoudm.com/${p.slug}`;
  const waUrl = `https://wa.me/966568598439?text=${encodeURIComponent(p.waText)}`;

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Helmet>
        <title>{p.metaTitle}</title>
        <meta name="description" content={p.metaDescription} />
        <meta name="keywords" content={p.keywords} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={p.metaTitle} />
        <meta property="og:description" content={p.metaDescription} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_SA" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": p.jsonLdName,
          "description": p.jsonLdDescription,
          "url": url,
          "provider": {
            "@type": "Person",
            "name": "محمود محمد دغمش",
            "telephone": "+966568598439",
            "jobTitle": "معلم رياضيات شمال الرياض"
          },
          "areaServed": { "@type": "City", "name": "الرياض" }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "الرئيسية", "item": "https://mahmoudm.com/" },
            { "@type": "ListItem", "position": 2, "name": p.title, "item": url }
          ]
        })}</script>
      </Helmet>

      <header className="relative overflow-hidden bg-gradient-to-br from-[hsl(220_85%_18%)] via-[hsl(215_80%_28%)] to-[hsl(205_85%_40%)] text-white">
        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <nav aria-label="breadcrumb" className="text-sm text-white/80 mb-6">
            <Link to="/" className="hover:text-gold inline-flex items-center gap-1">
              <Home className="w-4 h-4" /> الرئيسية
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gold">{p.title}</span>
          </nav>
          <div className="text-center space-y-5 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-black drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]" style={{ fontFamily: "'Thmanyah Serif', serif" }}>
              {p.h1}
            </h1>
            <p className="text-xl md:text-2xl text-[hsl(195_100%_85%)] font-bold">{p.subtitle}</p>
            <div className="inline-flex items-center gap-3 bg-white text-[hsl(220_80%_25%)] px-6 py-3 rounded-full font-black shadow-2xl">
              <GraduationCap className="w-6 h-6" />
              مع الأستاذ محمود دغمش - خبرة 22 عاماً
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <section className="prose-rtl space-y-6 text-lg leading-relaxed text-foreground">
          <p>{p.intro}</p>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-black text-primary mb-6">ما الذي ستحصل عليه</h2>
          <ul className="space-y-3">
            {p.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3 bg-card border border-border rounded-xl p-4 hover:border-gold transition-colors">
                <CheckCircle2 className="w-6 h-6 text-gold shrink-0 mt-1" />
                <span className="text-lg font-medium text-foreground">{b}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-black text-primary mb-6">{p.whyTitle}</h2>
          <div className="space-y-4 text-lg leading-relaxed text-foreground">
            {p.whyParagraphs.map((par, i) => (
              <p key={i}>{par}</p>
            ))}
          </div>
        </section>

        <section className="mt-14 bg-primary text-primary-foreground rounded-3xl p-8 md:p-10 shadow-elegant text-center space-y-5">
          <h2 className="text-2xl md:text-3xl font-black">احجز حصتك الآن</h2>
          <p className="text-lg opacity-90">تواصل مباشرة مع الأستاذ محمود دغمش للاستفسار والحجز</p>
          <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4">
            <a href="tel:+966568598439" className="flex items-center justify-center gap-3 bg-gold text-gold-foreground px-8 py-4 rounded-full text-xl font-black shadow-gold hover:scale-105 transition-transform">
              <Phone className="w-6 h-6" />
              <span dir="ltr">اتصل: 0568598439</span>
            </a>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full text-xl font-black shadow-gold hover:scale-105 transition-transform">
              <MessageCircle className="w-6 h-6" />
              واتساب
            </a>
          </div>
        </section>

        <section className="mt-12">
          <QuickBookingForm defaultStudyType={p.defaultStudyType} title={`احجز حصة ${p.title}`} />
        </section>

        <nav className="mt-10 text-center">
          <Link to="/" className="text-primary font-bold hover:text-gold underline">← العودة للصفحة الرئيسية</Link>
        </nav>
      </main>

      <footer className="bg-primary text-primary-foreground/70 py-6 text-center text-sm">
        © {new Date().getFullYear()} الأستاذ محمود محمد دغمش - جميع الحقوق محفوظة
      </footer>
    </div>
  );
};

export default ServicePageLayout;
