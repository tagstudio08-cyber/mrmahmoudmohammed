import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const schema = z.object({
  student_name: z.string().trim().min(2, "الاسم قصير جداً").max(60, "الاسم طويل جداً"),
  city: z.string().trim().min(2, "المدينة مطلوبة").max(60, "اسم المدينة طويل"),
  study_type: z.string().trim().min(2).max(80),
});

interface Props {
  defaultStudyType: string;
  title?: string;
}

const QuickBookingForm = ({ defaultStudyType, title = "احجز حصتك الآن" }: Props) => {
  const [studentName, setStudentName] = useState("");
  const [city, setCity] = useState("الرياض");
  const [studyType, setStudyType] = useState(defaultStudyType);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ student_name: studentName, city, study_type: studyType });
    if (!parsed.success) {
      toast({ title: "تحقق من البيانات", description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("inquiries").insert(parsed.data);
    setLoading(false);
    if (error) {
      toast({ title: "تعذّر الإرسال", description: "حاول مرة أخرى من فضلك", variant: "destructive" });
      return;
    }
    setDone(true);
    toast({ title: "تم استلام طلبك", description: "سيتم التواصل معك قريباً بإذن الله" });
  };

  if (done) {
    return (
      <div className="bg-card border-2 border-gold rounded-3xl p-8 text-center space-y-3 shadow-elegant">
        <CheckCircle2 className="w-14 h-14 text-gold mx-auto" />
        <h3 className="text-2xl font-black text-primary">تم استلام طلبك بنجاح</h3>
        <p className="text-foreground/80">سيتواصل معك الأستاذ محمود في أقرب وقت ممكن.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-card border-2 border-border rounded-3xl p-6 md:p-8 shadow-elegant space-y-4">
      <h3 className="text-2xl font-black text-primary text-center">{title}</h3>
      <p className="text-center text-foreground/70 text-sm">املأ النموذج وسنتواصل معك خلال ساعات</p>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-bold mb-1 text-foreground">الاسم</label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            maxLength={60}
            required
            className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 transition"
            placeholder="اكتب اسمك"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1 text-foreground">المدينة</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            maxLength={60}
            required
            className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 transition"
            placeholder="مثال: الرياض"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1 text-foreground">نوع الدراسة</label>
          <input
            type="text"
            value={studyType}
            onChange={(e) => setStudyType(e.target.value)}
            maxLength={80}
            required
            className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 transition"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-gold text-gold-foreground py-4 rounded-xl text-lg font-black shadow-gold hover:scale-[1.02] transition-transform disabled:opacity-60"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
        {loading ? "جارٍ الإرسال..." : "إرسال الطلب"}
      </button>
      <p className="text-xs text-center text-foreground/60">بياناتك آمنة ولن تُستخدم إلا للتواصل معك بخصوص الدروس.</p>
    </form>
  );
};

export default QuickBookingForm;
