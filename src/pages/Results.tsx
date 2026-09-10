import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Home, Phone, MessageCircle } from "lucide-react";
import StudentResults from "@/components/StudentResults";

const waUrl = `https://wa.me/966568598439?text=${encodeURIComponent("السلام عليكم أستاذ محمود،\nشاهدت نتائج الطلاب وأرغب بالاستفسار عن الحجز.\nشكراً لك.")}`;

const Results = () => (
  <div className="min-h-screen bg-background" dir="rtl">
    <Helmet>
      <title>نتائج طلاب القدرات - الأستاذ محمود دغمش شمال الرياض</title>
      <meta name="description" content="نتائج حقيقية لطلاب اختبار القدرات مع الأستاذ محمود دغمش، معلم رياضيات شمال الرياض: أعلى درجة كمي 98.4 وتحسن ملحوظ بين المحاولات." />
      <meta name="keywords" content="نتائج طلاب القدرات, درجات قدرات كمي, معلم قدرات شمال الرياض, الأستاذ محمود دغمش" />
      <link rel="canonical" href="https://mahmoudm.com/results" />
      <meta property="og:title" content="نتائج طلاب القدرات - الأستاذ محمود دغمش" />
      <meta property="og:description" content="درجات حقيقية لطلاب القدرات الكمي مع نسب التحسن بين المحاولات." />
      <meta property="og:url" content="https://mahmoudm.com/results" />
      <meta property="og:type" content="website" />
    </Helmet>

    <header className="bg-gradient-to-br from-[hsl(220_85%_18%)] via-[hsl(215_80%_28%)] to-[hsl(205_85%_40%)] text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <nav aria-label="breadcrumb" className="text-sm text-white/80 mb-6">
          <Link to="/" className="hover:text-gold inline-flex items-center gap-1"><Home className="w-4 h-4" /> الرئيسية</Link>
          <span className="mx-2">/</span>
          <span className="text-gold">نتائج الطلاب</span>
        </nav>
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black" style={{ fontFamily: "'Thmanyah Serif', serif" }}>نتائج طلاب القدرات</h1>
          <p className="text-xl md:text-2xl text-[hsl(195_100%_85%)] font-bold">درجات موثقة من تقارير قياس - بدون بيانات شخصية</p>
        </div>
      </div>
    </header>

    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <StudentResults compact />
      <section className="mt-14 bg-primary text-primary-foreground rounded-3xl p-8 md:p-10 text-center space-y-5 shadow-elegant">
        <h2 className="text-2xl md:text-3xl font-black">اجعل نتيجتك التالية على هذه القائمة</h2>
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

export default Results;
