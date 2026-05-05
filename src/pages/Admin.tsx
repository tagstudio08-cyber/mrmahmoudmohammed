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

  const grouped = inquiries.reduce<Record<string, Inquiry[]>>((acc, i) => {
    (acc[i.study_type] ||= []).push(i);
    return acc;
  }, {});

  const downloadExcel = () => {
    const wb = XLSX.utils.book_new();
    // ورقة شاملة
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

    // ورقة لكل نوع دراسة
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

        {loading ? (
          <p className="text-center text-muted-foreground py-10">جاري التحميل...</p>
        ) : inquiries.length === 0 ? (
          <p className="text-center text-muted-foreground py-10">لا توجد استفسارات بعد</p>
        ) : (
          <div className="space-y-8">
            {Object.entries(grouped).map(([type, list]) => (
              <div key={type} className="bg-card border border-border rounded-2xl overflow-hidden shadow-elegant">
                <div className="bg-primary text-primary-foreground px-5 py-3 flex items-center justify-between">
                  <h2 className="text-xl font-bold">{type}</h2>
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

        <p className="text-center text-sm text-muted-foreground mt-4">
          إجمالي الاستفسارات: {inquiries.length}
        </p>
      </div>
    </div>
  );
};

export default Admin;
