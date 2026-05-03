import { TrendingUp, BookOpen, Building2, Lightbulb, Star, Phone, GraduationCap, Quote, Calculator } from "lucide-react";
import teacherImg from "@/assets/teacher.png";

const services = [
  { icon: TrendingUp, title: "تدريس قدرات كمي وتحصيلي رياضيات" },
  { icon: BookOpen, title: "مدرس رياضيات جميع المراحل" },
  { icon: Building2, title: "مدرس رياضيات جامعات الإمام والملك سعود" },
  { icon: Lightbulb, title: "تدريس موهبة في الرياضيات" },
  { icon: Star, title: "تدريس موهبة" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <header className="relative overflow-hidden gradient-primary text-primary-foreground">
        <div className="absolute inset-0 opacity-10 select-none pointer-events-none text-7xl font-bold leading-none">
          <div className="absolute top-10 right-10">ax²+bx+c=0</div>
          <div className="absolute top-1/2 left-10">f(x)</div>
          <div className="absolute bottom-10 right-1/3">∫ √π</div>
        </div>

        <div className="container relative mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 gradient-gold rounded-full blur-2xl opacity-30" />
              <img
                src={teacherImg}
                alt="الأستاذ محمود محمد دغمش - مدرس رياضيات"
                className="relative max-h-[520px] w-auto drop-shadow-2xl"
              />
            </div>
          </div>

          <div className="order-1 md:order-2 text-right space-y-4">
            <p className="text-2xl md:text-3xl font-medium text-primary-foreground/90">الأستاذ</p>
            <h1 className="text-5xl md:text-7xl font-black text-gold leading-tight">محمود</h1>
            <h2 className="text-3xl md:text-5xl font-bold border-b border-gold/60 pb-4 inline-block">محمد دغمش</h2>
            <p className="text-2xl md:text-3xl font-bold pt-2">مدرس رياضيات</p>
            <div className="inline-flex items-center gap-3 bg-gold text-gold-foreground px-6 py-3 rounded-full font-bold text-lg md:text-xl shadow-gold mt-4">
              <GraduationCap className="w-6 h-6" />
              خبرة 22 عام في التدريس
            </div>
          </div>
        </div>
      </header>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black text-center text-primary mb-4">الخدمات التعليمية</h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-14 rounded-full" />

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {services.map((s, i) => (
              <div
                key={i}
                className="group flex items-center gap-5 bg-card p-6 rounded-2xl border border-border hover:border-gold transition-all hover:shadow-elegant hover:-translate-y-1"
              >
                <div className="shrink-0 w-16 h-16 rounded-full gradient-primary flex items-center justify-center shadow-elegant group-hover:scale-110 transition-transform">
                  <s.icon className="w-8 h-8 text-gold" />
                </div>
                <p className="text-lg md:text-xl font-bold text-primary leading-relaxed">{s.title}</p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto mt-16 relative bg-primary text-primary-foreground rounded-3xl p-10 shadow-elegant">
            <Quote className="absolute top-4 right-6 w-10 h-10 text-gold opacity-60" />
            <Quote className="absolute bottom-4 left-6 w-10 h-10 text-gold opacity-60 rotate-180" />
            <p className="text-2xl md:text-3xl font-bold text-center leading-relaxed">
              تعلم <span className="text-gold">الرياضيات</span> بأسلوب مبسط واحترافية عالية
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 bg-primary/40 backdrop-blur border border-gold/40 rounded-3xl p-8">
            <div className="flex items-center gap-4">
              <Calculator className="w-14 h-14 text-gold" />
              <div className="text-right">
                <p className="text-lg opacity-90">للحجز والاستفسار</p>
                <p className="text-2xl font-bold">تواصل الآن</p>
              </div>
            </div>
            <a
              href="tel:0590080739"
              className="flex items-center gap-3 bg-gold text-gold-foreground px-8 py-4 rounded-full text-2xl md:text-3xl font-black tracking-wider shadow-gold hover:scale-105 transition-transform"
              dir="ltr"
            >
              <Phone className="w-7 h-7" />
              0590080739
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground/70 py-6 text-center text-sm">
        © {new Date().getFullYear()} الأستاذ محمود محمد دغمش - جميع الحقوق محفوظة
      </footer>
    </div>
  );
};

export default Index;
