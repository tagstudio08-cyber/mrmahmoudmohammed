import { useState } from "react";
import { TrendingUp, BookOpen, Building2, Lightbulb, Star, Phone, GraduationCap, Quote, Calculator, MessageCircle } from "lucide-react";
import teacherImg from "@/assets/teacher.png";
import { supabase } from "@/integrations/supabase/client";
import ReviewsSection from "@/components/ReviewsSection";
import ScrollVideoSection from "@/components/ScrollVideoSection";

const studyTypes = [
  "قدرات كمي",
  "تحصيلي رياضيات",
  "رياضيات - مرحلة ابتدائية",
  "رياضيات - مرحلة متوسطة",
  "رياضيات - مرحلة ثانوية",
  "رياضيات - جامعة الإمام",
  "رياضيات - جامعة الملك سعود",
  "موهبة في الرياضيات",
];

const services = [
  { icon: TrendingUp, title: "تدريس قدرات كمي وتحصيلي رياضيات" },
  { icon: BookOpen, title: "مدرس رياضيات جميع المراحل" },
  { icon: Building2, title: "مدرس رياضيات جامعات الإمام والملك سعود" },
  { icon: Lightbulb, title: "تدريس موهبة في الرياضيات" },
  { icon: Star, title: "تدريس موهبة" },
];

const Index = () => {
  const [studyType, setStudyType] = useState(studyTypes[0]);
  const [studentName, setStudentName] = useState("");
  const [city, setCity] = useState("");
  const trimmedName = studentName.trim().slice(0, 60);
  const trimmedCity = city.trim().slice(0, 60);
  const namePart = trimmedName ? `\nاسمي: ${trimmedName}.` : "";
  const cityPart = trimmedCity ? `\nالمدينة: ${trimmedCity}.` : "";
  const waMessage = encodeURIComponent(
    `السلام عليكم أستاذ محمود،${namePart}${cityPart}\nأرغب بالاستفسار عن دروس: ${studyType}.\nشكراً لك.`
  );
  const waUrl = `https://wa.me/966568598439?text=${waMessage}`;
  return (
    <div className="min-h-screen bg-transparent" dir="rtl">
      <header className="relative overflow-hidden bg-gradient-to-br from-[hsl(220_85%_18%)] via-[hsl(215_80%_28%)] to-[hsl(205_85%_40%)] text-white">
        <div className="absolute inset-0 opacity-[0.08] select-none pointer-events-none text-7xl font-bold leading-none">
          <div className="absolute top-10 right-10">ax²+bx+c=0</div>
          <div className="absolute top-1/2 left-10">f(x)</div>
          <div className="absolute bottom-10 right-1/3">∫ √π</div>
        </div>

        <div className="container relative mx-auto px-4 py-20 md:py-28">
          <div className="text-center space-y-5 max-w-4xl mx-auto flex flex-col items-center">
            <p className="text-2xl md:text-3xl font-medium text-white/85">الأستاذ</p>
            <h1 className="font-black leading-tight">
              <span className="block text-5xl md:text-7xl lg:text-8xl text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                محمود محمد دغمش
              </span>
              <span className="block text-xl md:text-2xl lg:text-3xl text-[hsl(195_100%_78%)] mt-4 font-bold">
                معلم رياضيات شمال الرياض - خبرة 22 عاماً
              </span>
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold border-b-2 border-[hsl(195_100%_75%)]/70 pb-3 inline-block mx-auto">
              للقدرات والتحصيلي وجميع المراحل
            </h2>
            <p className="text-lg md:text-xl font-semibold text-white/90 pt-2">
              دروس خصوصية في الرياضيات - حضوري وأونلاين
            </p>
            <div className="inline-flex items-center gap-3 bg-white text-[hsl(220_80%_25%)] px-7 py-3 rounded-full font-black text-lg md:text-xl shadow-2xl mt-4">
              <GraduationCap className="w-6 h-6" />
              خبرة 22 عام في التدريس
            </div>
          </div>
        </div>
      </header>

      <ScrollVideoSection />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black text-center text-primary mb-4">الخدمات التعليمية</h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-14 rounded-full" />

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {services.map((s, i) => (
              <div
                key={i}
                className="group flex flex-col items-center text-center gap-4 bg-card p-6 rounded-2xl border border-border hover:border-gold transition-all hover:shadow-elegant hover:-translate-y-1"
              >
                <div className="shrink-0 w-16 h-16 rounded-full gradient-primary flex items-center justify-center shadow-elegant group-hover:scale-110 transition-transform">
                  <s.icon className="w-8 h-8 text-white" />
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
          <div className="max-w-3xl mx-auto bg-primary/40 backdrop-blur border border-gold/40 rounded-3xl p-8 space-y-6">
            <div className="flex items-center justify-center gap-4">
              <Calculator className="w-12 h-12 text-gold" />
              <div className="text-right">
                <p className="text-lg opacity-90">للحجز والاستفسار</p>
                <p className="text-2xl font-bold">تواصل الآن مباشرة</p>
              </div>
            </div>
            <div className="space-y-3 text-right">
              <label className="block text-sm font-bold text-gold">اسم الطالب</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                maxLength={60}
                placeholder="اكتب اسم الطالب"
                className="w-full bg-background text-foreground border-2 border-gold/60 rounded-xl px-4 py-3 text-lg font-medium focus:outline-none focus:border-gold"
              />
              <label className="block text-sm font-bold text-gold pt-2">المدينة</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                maxLength={60}
                placeholder="اكتب اسم المدينة"
                className="w-full bg-background text-foreground border-2 border-gold/60 rounded-xl px-4 py-3 text-lg font-medium focus:outline-none focus:border-gold"
              />
              <label className="block text-sm font-bold text-gold pt-2">اختر نوع الدراسة</label>
              <select
                value={studyType}
                onChange={(e) => setStudyType(e.target.value)}
                className="w-full bg-background text-foreground border-2 border-gold/60 rounded-xl px-4 py-3 text-lg font-medium focus:outline-none focus:border-gold cursor-pointer"
              >
                {studyTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4">
              <a
                href="tel:+966568598439"
                className="flex items-center justify-center gap-3 bg-gold text-gold-foreground px-8 py-4 rounded-full text-xl md:text-2xl font-black shadow-gold hover:scale-105 transition-transform"
              >
                <Phone className="w-6 h-6" />
                <span dir="ltr">اتصل: 0568598439</span>
              </a>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (trimmedName || trimmedCity) {
                    supabase.from("inquiries").insert({
                      student_name: trimmedName || "غير محدد",
                      city: trimmedCity || "غير محدد",
                      study_type: studyType,
                    }).then(() => {});
                  }
                }}
                className="flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full text-xl md:text-2xl font-black shadow-gold hover:scale-105 transition-transform"
              >
                <MessageCircle className="w-6 h-6" />
                واتساب مع رسالة
              </a>
            </div>
          </div>
        </div>
      </section>

      <ReviewsSection />

      <footer className="bg-primary text-primary-foreground/70 py-6 text-center text-sm">
        © {new Date().getFullYear()} الأستاذ محمود محمد دغمش - جميع الحقوق محفوظة
      </footer>
    </div>
  );
};

export default Index;
