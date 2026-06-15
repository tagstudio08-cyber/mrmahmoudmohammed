import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Download, RefreshCw, LogOut, Trash2, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";
import { toast } from "@/hooks/use-toast";

const AdminHead = () => (
  <Helmet>
    <title>لوحة التحكم - الأدمن</title>
    <meta name="description" content="لوحة تحكم الأدمن لإدارة الاستفسارات والآراء." />
    <meta name="robots" content="noindex, nofollow" />
    <link rel="canonical" href="https://mrmahmoudmohammed.lovable.app/admin" />
    <meta property="og:title" content="لوحة التحكم - الأدمن" />
    <meta property="og:description" content="لوحة تحكم الأدمن." />
    <meta property="og:url" content="https://mrmahmoudmohammed.lovable.app/admin" />
  </Helmet>
);

const ADMIN_EMAIL = "doghmishtaha@gmail.com";

interface Inquiry {
  id: string;
  student_name: string;
  city: string;
  study_type: string;
  created_at: string;
}

interface Review {
  id: string;
  student_name: string;
  message: string;
  rating: number;
  created_at: string;
}

const Admin = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const isAdmin = session?.user?.email === ADMIN_EMAIL;

  const load = async () => {
    setLoading(true);
    const [inq, rev] = await Promise.all([
      supabase.from("inquiries").select("*").order("created_at", { ascending: false }),
      supabase.from("reviews").select("*").order("created_at", { ascending: false }),
    ]);
    if (inq.data) setInquiries(inq.data as Inquiry[]);
    if (rev.data) setReviews(rev.data as Review[]);
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin]);

  const grouped = inquiries.reduce<Record<string, Inquiry[]>>((acc, i) => {
    (acc[i.study_type] ||= []).push(i);
    return acc;
  }, {});

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().toLowerCase() !== ADMIN_EMAIL) {
      toast({ title: "بريد غير مصرح به", variant: "destructive" });
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/admin`,
        shouldCreateUser: true,
      },
    });
    setBusy(false);
    if (error) {
      toast({ title: error.message, variant: "destructive" });
    } else {
      setSent(true);
      toast({ title: "تم إرسال رابط الدخول إلى بريدك" });
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const deleteReview = async (id: string) => {
    if (!confirm("حذف هذا الرأي؟")) return;
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) {
      toast({ title: "فشل الحذف", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "تم الحذف" });
      setReviews((r) => r.filter((x) => x.id !== id));
    }
  };

  const downloadExcel = async () => {
    const XLSX = await import("xlsx");
    const wb = XLSX.utils.book_new();
    const allRows = inquiries.map((i, idx) => ({
      "#": idx + 1,
      "اسم الطالب": i.student_name,
      "المدينة": i.city,
      "نوع الدراسة": i.study_type,
      "التاريخ": new Date(i.created_at).toLocaleString("ar-SA"),
    }));
    const wsAll = XLSX.utils.json_to_sheet(allRows);
    wsAll["!cols"] = [{ wch: 5 }, { wch: 25 }, { wch: 20 }, { wch: 30 }, { wch: 22 }];
    XLSX.utils.book_append_sheet(wb, wsAll, "الكل");

    Object.entries(grouped).forEach(([type, list]) => {
      const rows = list.map((i, idx) => ({
        "#": idx + 1,
        "اسم الطالب": i.student_name,
        "المدينة": i.city,
        "التاريخ": new Date(i.created_at).toLocaleString("ar-SA"),
      }));
      const ws = XLSX.utils.json_to_sheet(rows);
      ws["!cols"] = [{ wch: 5 }, { wch: 25 }, { wch: 20 }, { wch: 22 }];
      const sheetName = type.replace(/[\\/?*[\]:]/g, "-").slice(0, 31);
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
    });

    XLSX.writeFile(wb, `inquiries-${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">جاري التحميل...</div>;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4" dir="rtl">
        <AdminHead />
        <form
          onSubmit={handleAuth}
          className="w-full max-w-md bg-card border border-border rounded-3xl p-8 shadow-elegant space-y-4"
        >
          <h1 className="text-3xl font-black text-primary text-center">دخول الأدمن</h1>
          <p className="text-sm text-muted-foreground text-center">
            أدخل بريدك وسيُرسل لك رابط دخول مباشر بدون كلمة مرور
          </p>
          {session && !isAdmin && (
            <p className="text-sm text-destructive text-center">
              الحساب الحالي ليس أدمن.{" "}
              <button type="button" onClick={logout} className="underline">
                تسجيل خروج
              </button>
            </p>
          )}
          <label htmlFor="admin-email" className="sr-only">البريد الإلكتروني</label>
          <input
            id="admin-email"
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-gold"
            required
          />
          <button
            type="submit"
            disabled={busy}
            className="w-full bg-gold text-gold-foreground py-3 rounded-xl font-black shadow-gold disabled:opacity-50"
          >
            {busy ? "..." : "إرسال رابط الدخول"}
          </button>
          {sent && (
            <p className="text-sm text-center text-primary">
              ✓ تم الإرسال — افتح بريدك واضغط على الرابط للدخول
            </p>
          )}
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6" dir="rtl">
      <AdminHead />
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <h1 className="text-3xl font-black text-primary">لوحة التحكم</h1>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={load}
              className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-bold hover:bg-secondary/80"
            >
              <RefreshCw className="w-4 h-4" />
              تحديث
            </button>
            <button
              onClick={downloadExcel}
              disabled={!inquiries.length}
              className="flex items-center gap-2 bg-gold text-gold-foreground px-4 py-2 rounded-lg font-bold shadow-gold disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              تنزيل Excel
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-destructive text-destructive-foreground px-4 py-2 rounded-lg font-bold"
            >
              <LogOut className="w-4 h-4" />
              خروج
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground py-10">جاري التحميل...</p>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-primary mb-4">الاستفسارات</h2>
            {inquiries.length === 0 ? (
              <p className="text-center text-muted-foreground py-6">لا توجد استفسارات</p>
            ) : (
              <div className="space-y-8 mb-12">
                {Object.entries(grouped).map(([type, list]) => (
                  <div key={type} className="bg-card border border-border rounded-2xl overflow-hidden shadow-elegant">
                    <div className="bg-primary text-primary-foreground px-5 py-3 flex items-center justify-between">
                      <h3 className="text-xl font-bold">{type}</h3>
                      <span className="bg-gold text-gold-foreground px-3 py-1 rounded-full text-sm font-bold">
                        {list.length}
                      </span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-right">
                        <thead className="bg-muted">
                          <tr>
                            <th className="p-3">#</th>
                            <th className="p-3">اسم الطالب</th>
                            <th className="p-3">المدينة</th>
                            <th className="p-3">التاريخ</th>
                          </tr>
                        </thead>
                        <tbody>
                          {list.map((i, idx) => (
                            <tr key={i.id} className="border-t border-border hover:bg-muted/40">
                              <td className="p-3">{idx + 1}</td>
                              <td className="p-3 font-bold">{i.student_name}</td>
                              <td className="p-3">{i.city}</td>
                              <td className="p-3 text-sm text-muted-foreground">
                                {new Date(i.created_at).toLocaleString("ar-SA")}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <h2 className="text-2xl font-bold text-primary mb-4">آراء الطلاب ({reviews.length})</h2>
            {reviews.length === 0 ? (
              <p className="text-center text-muted-foreground py-6">لا توجد آراء</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {reviews.map((r) => (
                  <div key={r.id} className="bg-card border border-border rounded-2xl p-5 shadow-elegant">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <p className="font-bold text-primary">{r.student_name}</p>
                        <div className="flex gap-0.5 mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < r.rating ? "fill-gold text-gold" : "text-muted-foreground/30"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => deleteReview(r.id)}
                        className="text-destructive hover:bg-destructive/10 p-2 rounded-lg"
                        title="حذف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{r.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(r.created_at).toLocaleString("ar-SA")}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;
