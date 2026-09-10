import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import ReviewsSection from "@/components/ReviewsSection";

const Reviews = () => (
  <div className="min-h-screen bg-background" dir="rtl">
    <Helmet>
      <title>تقييمات الطلاب - الأستاذ محمود دغمش معلم رياضيات شمال الرياض</title>
      <meta name="description" content="آراء وتقييمات طلاب الأستاذ محمود دغمش، معلم رياضيات شمال الرياض للقدرات والتحصيلي وجميع المراحل. شارك تجربتك وقيّم الدروس." />
      <meta name="keywords" content="تقييمات معلم رياضيات, آراء طلاب, معلم رياضيات شمال الرياض, الأستاذ محمود دغمش" />
      <link rel="canonical" href="https://mahmoudm.com/reviews" />
      <meta property="og:title" content="تقييمات طلاب الأستاذ محمود دغمش" />
      <meta property="og:description" content="آراء الطلاب وأولياء الأمور في دروس الرياضيات والقدرات والتحصيلي." />
      <meta property="og:url" content="https://mahmoudm.com/reviews" />
      <meta property="og:type" content="website" />
    </Helmet>

    <header className="bg-gradient-to-br from-[hsl(220_85%_18%)] via-[hsl(215_80%_28%)] to-[hsl(205_85%_40%)] text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <nav aria-label="breadcrumb" className="text-sm text-white/80 mb-6">
          <Link to="/" className="hover:text-gold inline-flex items-center gap-1"><Home className="w-4 h-4" /> الرئيسية</Link>
          <span className="mx-2">/</span>
          <span className="text-gold">تقييمات الطلاب</span>
        </nav>
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black" style={{ fontFamily: "'Thmanyah Serif', serif" }}>تقييمات الطلاب</h1>
          <p className="text-xl md:text-2xl text-[hsl(195_100%_85%)] font-bold">شارك تجربتك مع دروس الرياضيات والقدرات</p>
        </div>
      </div>
    </header>

    <main>
      <ReviewsSection />
      <nav className="pb-16 text-center">
        <Link to="/" className="text-primary font-bold hover:text-gold underline">← العودة للصفحة الرئيسية</Link>
      </nav>
    </main>

    <footer className="bg-primary text-primary-foreground/70 py-6 text-center text-sm">
      © {new Date().getFullYear()} الأستاذ محمود محمد دغمش - جميع الحقوق محفوظة
    </footer>
  </div>
);

export default Reviews;
