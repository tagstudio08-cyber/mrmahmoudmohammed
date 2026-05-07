import { useEffect, useState } from "react";
import { Star, Send, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Review {
  id: string;
  student_name: string;
  message: string;
  rating: number;
  created_at: string;
}

const ReviewsSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);
    if (data) setReviews(data as Review[]);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    const m = message.trim();
    if (!n || !m) {
      toast({ title: "يرجى تعبئة الاسم والرسالة", variant: "destructive" });
      return;
    }
    if (n.length > 60 || m.length > 500) {
      toast({ title: "النص طويل جداً", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert({
      student_name: n,
      message: m,
      rating,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "حدث خطأ، حاول لاحقاً", variant: "destructive" });
      return;
    }
    setName("");
    setMessage("");
    setRating(5);
    toast({ title: "شكراً لك! تم إضافة رأيك" });
    load();
  };

  return (
    <section className="py-20 bg-secondary/40" dir="rtl">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-black text-center text-primary mb-4">
          آراء الطلاب
        </h2>
        <div className="w-24 h-1 bg-gold mx-auto mb-12 rounded-full" />

        {reviews.length > 0 ? (
          <div className="overflow-x-auto pb-4 -mx-4 px-4 mb-12">
            <div className="flex gap-5 w-max">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="w-80 shrink-0 bg-card border border-border rounded-2xl p-6 shadow-elegant hover:border-gold transition-all"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < r.rating ? "fill-gold text-gold" : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-foreground leading-relaxed mb-4 line-clamp-5">
                    "{r.message}"
                  </p>
                  <div className="border-t border-border pt-3 flex items-center justify-between">
                    <p className="font-bold text-primary">{r.student_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(r.created_at).toLocaleDateString("ar-SA")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-muted-foreground mb-12">
            كن أول من يشارك رأيه
          </p>
        )}

        <form
          onSubmit={submit}
          className="max-w-2xl mx-auto bg-card border border-border rounded-3xl p-8 shadow-elegant space-y-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="w-6 h-6 text-gold" />
            <h3 className="text-2xl font-bold text-primary">شاركنا رأيك</h3>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">الاسم</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={60}
              placeholder="اكتب اسمك"
              className="w-full bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">التقييم</label>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => {
                const v = i + 1;
                return (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setRating(v)}
                    className="p-1"
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        v <= rating ? "fill-gold text-gold" : "text-muted-foreground/40"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">رسالتك</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={500}
              rows={4}
              placeholder="اكتب رأيك أو تجربتك مع الأستاذ..."
              className="w-full bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-gold resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {message.length}/500
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 bg-gold text-gold-foreground py-3 rounded-xl font-black text-lg shadow-gold hover:scale-[1.02] transition-transform disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
            {submitting ? "جاري الإرسال..." : "إرسال الرأي"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ReviewsSection;
