import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Home, Phone, MessageCircle, Calculator, BookOpen, TrendingUp, BarChart3, Grid3X3, Layers } from "lucide-react";

const subjects = [
  { icon: Calculator, title: "حساب التكامل", to: "/integral-calculus", desc: "طرق التكامل والتطبيقات الهندسية والفيزيائية." },
  { icon: BookOpen, title: "أسس الرياضيات", to: "/math-foundations", desc: "المنطق الرياضي وطرق البرهان والمجموعات والعلاقات." },
  { icon: TrendingUp, title: "حساب التفاضل والتكامل", to: "/calculus", desc: "النهايات والاتصال والمشتقات وتطبيقاتها." },
  { icon: BarChart3, title: "حساب المتجهات", to: "/vector-calculus", desc: "الدوال المتجهة والتدرج والتكاملات الخطية والسطحية." },
  { icon: Grid3X3, title: "الجبر الخطي", to: "/linear-algebra", desc: "المصفوفات والمحددات والفضاءات والقيم الذاتية." },
  { icon: Layers, title: "التحليل العددي (1)", to: "/numerical-analysis", desc: "الطرق العددية للمعادلات والاستيفاء والتكامل." },
];

const waUrl = `https://wa.me/966568598439?text=${encodeURIComponent("السلام عليكم أستاذ محمود،\nأرغب بالاستفسار عن دروس مواد الرياضيات الجامعية.\nشكراً لك.")}`;

const MathSubjects = () => (
  <div className="min-h-screen bg-background" dir="rtl">
    <Helmet>
      <title>مواد رياضيات جامعية - الأستاذ محمود دغمش شمال الرياض</title>
      <meta name="description" content="دروس مواد الرياضيات الجامعية: حساب التكامل، أسس الرياضيات، التفاضل والتكامل، حساب المتجهات، الجبر الخطي، التحليل العددي - مع الأستاذ محمود دغمش." />
      <meta name="keywords" content="مواد رياضيات جامعية, حساب التكامل, أسس الرياضيات, الجبر الخطي, حساب المتجهات, التحليل العددي, معلم رياضيات شمال الرياض" />
      <link rel="canonical" href="https://mahmoudm.com/math-subjects" />
      <meta property="og:title" content="مواد رياضيات جامعية - الأستاذ محمود دغمش" />
      <meta property="og:description" content="صفحات مستقلة لكل مادة رياضيات جامعية مع شرح وحل تمارين ومراجعة اختبارات." />
      <meta property="og:url" content="https://mahmoudm.com/math-subjects" />
      <meta property="og:type" content="website" />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "مواد رياضيات جامعية",
        itemListElement: subjects.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: s.title,
          url: `https://mahmoudm.com${s.to}`,
        })),
      })}</script>
    </Helmet>

    <header className="bg-gradient-to-br from-[hsl(220_85%_18%)] via-[hsl(215_80%_28%)] to-[hsl(205_85%_40%)] text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <nav aria-label="breadcrumb" className="text-sm text-white/80 mb-6">
          <Link to="/" className="hover:text-gold inline-flex items-center gap-1"><Home className="w-4 h-4" /> الرئيسية</Link>
          <span className="mx-2">/</span>
          <span className="text-gold">مواد رياضيات</span>
        </nav>
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black" style={{ fontFamily: "'Thmanyah Serif', serif" }}>مواد رياضيات جامعية</h1>
          <p className="text-xl md:text-2xl text-[hsl(195_100%_85%)] font-bold">لكل مادة صفحة مستقلة بشرحها وموضوعاتها وأسئلتها</p>
        </div>
      </div>
    </header>

    <main className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((s) => (
          <Link key={s.to} to={s.to} className="group bg-card border border-border hover:border-gold rounded-2xl p-6 text-center transition-all hover:-translate-y-1 hover:shadow-elegant">
            <div className="mx-auto w-16 h-16 rounded-full gradient-primary flex items-center justify-center shadow-elegant group-hover:scale-110 transition-transform">
              <s.icon className="w-8 h-8 text-white" />
            </div>
            <h2 className="mt-4 text-xl font-black text-primary">{s.title}</h2>
            <p className="mt-2 text-foreground/80 leading-relaxed">{s.desc}</p>
            <span className="mt-4 inline-block font-bold text-gold">تفاصيل المادة ←</span>
          </Link>
        ))}
      </div>

      <section className="mt-14 bg-primary text-primary-foreground rounded-3xl p-8 md:p-10 text-center space-y-5 shadow-elegant">
        <h2 className="text-2xl md:text-3xl font-black">احجز حصتك في أي مادة</h2>
        <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4">
          <a href="tel:+966568598439" className="flex items-center justify-center gap-3 bg-gold text-gold-foreground px-8 py-4 rounded-full text-xl font-black shadow-gold hover:scale-105 transition-transform">
            <Phone className="w-6 h-6" /> <span dir="ltr">اتصل: 0568598439</span>
          </a>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full text-xl font-black shadow-gold hover:scale-105 transition-transform">
            <MessageCircle className="w-6 h-6" /> واتساب
          </a>
        </div>
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

export default MathSubjects;
