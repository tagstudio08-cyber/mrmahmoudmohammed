import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Download, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Inquiry {
  id: string;
  student_name: string;
  city: string;
  study_type: string;
  created_at: string;
}

const Admin = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setInquiries(data as Inquiry[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const downloadExcel = () => {
    const rows = inquiries.map((i, idx) => ({
      "#": idx + 1,
      "اسم الطالب": i.student_name,
      "المدينة": i.city,
      "نوع الدراسة": i.study_type,
      "التاريخ": new Date(i.created_at).toLocaleString("ar-SA"),
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    ws["!cols"] = [{ wch: 5 }, { wch: 25 }, { wch: 20 }, { wch: 30 }, { wch: 22 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "الاستفسارات");
    XLSX.writeFile(wb, `inquiries-${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  return (
    <div className="min-h-screen bg-background p-6" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <h1 className="text-3xl font-black text-primary">سجل الحجوزات والاستفسارات</h1>
          <div className="flex gap-2">
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
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-elegant">
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">اسم الطالب</th>
                  <th className="p-3">المدينة</th>
                  <th className="p-3">نوع الدراسة</th>
                  <th className="p-3">التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={5} className="p-6 text-center text-muted-foreground">جاري التحميل...</td></tr>
                ) : inquiries.length === 0 ? (
                  <tr><td colSpan={5} className="p-6 text-center text-muted-foreground">لا توجد استفسارات بعد</td></tr>
                ) : (
                  inquiries.map((i, idx) => (
                    <tr key={i.id} className="border-t border-border hover:bg-muted/40">
                      <td className="p-3">{idx + 1}</td>
                      <td className="p-3 font-bold">{i.student_name}</td>
                      <td className="p-3">{i.city}</td>
                      <td className="p-3">{i.study_type}</td>
                      <td className="p-3 text-sm text-muted-foreground">
                        {new Date(i.created_at).toLocaleString("ar-SA")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-4">
          إجمالي الاستفسارات: {inquiries.length}
        </p>
      </div>
    </div>
  );
};

export default Admin;
