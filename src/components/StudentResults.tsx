import { Helmet } from "react-helmet-async";
import { TrendingUp, Award, BarChart3 } from "lucide-react";

interface ResultRow {
  name: string;
  exam: string;
  date: string;
  quantitative: number;
  total: number;
  note?: string;
}

const results: ResultRow[] = [
  {
    name: "عبدالرحمن بن عبدالله بن علي الشايع",
    exam: "اختبار القدرات العامة الورقي - ديسمبر 2025",
    date: "1447/06/29هـ - 2025/12/20م",
    quantitative: 98.4,
    total: 89,
    note: "أعلى درجة كمي محققة",
  },
  {
    name: "فهد سعد ابراهيم السحيم",
    exam: "اختبار القدرات العامة - ديسمبر 2024",
    date: "1446/06/18هـ - 2024/12/19م",
    quantitative: 95.5,
    total: 80,
    note: "ارتفعت درجته الكمي من 87.70 إلى 95.5",
  },
  {
    name: "عبدالرحمن بن عبدالله بن علي الشايع",
    exam: "اختبار القدرات العامة الورقي - ديسمبر 2024",
    date: "1446/06/19هـ - 2024/12/20م",
    quantitative: 93.6,
    total: 84,
  },
  {
    name: "راكان فهد محمد الدعيدع",
    exam: "اختبار القدرات العامة الورقي - ديسمبر 2025",
    date: "1447/07/02هـ - 2025/12/22م",
    quantitative: 90.6,
    total: 92,
  },
  {
    name: "فهد سعد ابراهيم السحيم",
    exam: "اختبار القدرات العامة - ديسمبر 2023",
    date: "1445/06/10هـ - 2023/12/23م",
    quantitative: 87.7,
    total: 77,
  },
];

const average = (
  results.reduce((s, r) => s + r.quantitative, 0) / results.length
).toFixed(1);
const highest = Math.max(...results.map((r) => r.quantitative));

const StudentResults = ({ compact = false }: { compact?: boolean }) => (
  <section className={compact ? "mt-12" : "py-20 bg-secondary/30"} aria-labelledby="student-results-heading">
    <Helmet>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "نتائج طلاب الأستاذ محمود دغمش في اختبار القدرات الكمي",
        "itemListElement": results.map((r, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": `${r.name} — درجة الكمي ${r.quantitative} في ${r.exam}`,
        })),
      })}</script>
    </Helmet>

    <div className={compact ? "" : "container mx-auto px-4 max-w-5xl"}>
      <h2
        id="student-results-heading"
        className={`font-black text-primary mb-4 ${compact ? "text-3xl" : "text-4xl md:text-5xl text-center"}`}
      >
        نتائج طلاب الأستاذ محمود دغمش في القدرات الكمي
      </h2>
      <p className={`text-lg leading-relaxed text-foreground mb-8 ${compact ? "" : "text-center max-w-3xl mx-auto"}`}>
        نتائج حقيقية موثّقة من تقارير المركز الوطني للقياس (قياس) لطلاب درسوا القدرات الكمي
        مع الأستاذ محمود محمد دغمش في شمال الرياض.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-card border border-gold/40 rounded-2xl p-6 text-center">
          <Award className="w-8 h-8 text-gold mx-auto mb-2" />
          <div className="text-4xl font-black text-primary" dir="ltr">{highest}</div>
          <div className="text-sm font-bold text-muted-foreground mt-1">أعلى درجة كمي موثّقة</div>
        </div>
        <div className="bg-card border border-gold/40 rounded-2xl p-6 text-center">
          <BarChart3 className="w-8 h-8 text-gold mx-auto mb-2" />
          <div className="text-4xl font-black text-primary" dir="ltr">{average}</div>
          <div className="text-sm font-bold text-muted-foreground mt-1">متوسط درجات الكمي في النتائج المنشورة</div>
        </div>
        <div className="bg-card border border-gold/40 rounded-2xl p-6 text-center">
          <TrendingUp className="w-8 h-8 text-gold mx-auto mb-2" />
          <div className="text-4xl font-black text-primary" dir="ltr">+7.8</div>
          <div className="text-sm font-bold text-muted-foreground mt-1">تحسّن طالب واحد بين اختبارين (87.7 ← 95.5)</div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full text-right">
          <caption className="sr-only">جدول نتائج طلاب القدرات الكمي مع الأستاذ محمود دغمش</caption>
          <thead className="bg-primary text-primary-foreground">
            <tr>
              <th scope="col" className="p-4 font-black">اسم الطالب</th>
              <th scope="col" className="p-4 font-black">الاختبار</th>
              <th scope="col" className="p-4 font-black">درجة الكمي</th>
              <th scope="col" className="p-4 font-black">الدرجة الكلية</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={i} className="border-t border-border">
                <td className="p-4 font-bold text-foreground">
                  {r.name}
                  {r.note && <span className="block text-sm font-medium text-gold mt-1">{r.note}</span>}
                </td>
                <td className="p-4 text-muted-foreground">
                  {r.exam}
                  <span className="block text-sm mt-1">{r.date}</span>
                </td>
                <td className="p-4 text-2xl font-black text-primary" dir="ltr">{r.quantitative}</td>
                <td className="p-4 text-xl font-bold text-foreground" dir="ltr">{r.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-muted-foreground mt-4">
        النتائج مأخوذة من تقارير نتائج قياس الرسمية الخاصة بالطلاب، وقد أُخفيت أرقام السجل المدني حفاظاً على الخصوصية.
      </p>
    </div>
  </section>
);

export default StudentResults;
