import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Home, AlertTriangle, Phone } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div
      className="flex min-h-screen items-center justify-center gradient-primary text-primary-foreground p-6"
      dir="rtl"
    >
      <div className="max-w-xl w-full bg-primary/40 backdrop-blur border border-gold/40 rounded-3xl p-10 text-center shadow-elegant">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-gold" />
          </div>
        </div>

        <h1 className="text-7xl md:text-8xl font-black text-gold mb-3">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-3">عذراً، الصفحة غير موجودة</h2>
        <p className="text-base md:text-lg opacity-90 mb-8">
          الرابط الذي حاولت الوصول إليه غير متاح أو تم نقله.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch justify-center gap-3">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-gold text-gold-foreground px-6 py-3 rounded-full font-bold shadow-gold hover:scale-105 transition-transform"
          >
            <Home className="w-5 h-5" />
            العودة للرئيسية
          </Link>
          <a
            href="tel:+966568598439"
            className="flex items-center justify-center gap-2 bg-background text-foreground px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform"
          >
            <Phone className="w-5 h-5" />
            <span dir="ltr">0568598439</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
