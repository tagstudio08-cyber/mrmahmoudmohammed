import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Home, Phone, MessageCircle, ListChecks, CheckCircle2 } from "lucide-react";
import QuickBookingForm from "@/components/QuickBookingForm";
import { quduratTopics, totalQuestions } from "@/data/quduratQuestions";

const url = "https://mahmoudm.com/qudurat-questions";
const metaTitle = "الأسئلة الأكثر تكراراً في القدرات الكمي مع الحل | معلم قدرات شمال الرياض";
const metaDescription = `بنك ${totalQuestions} سؤالاً من الأسئلة الأكثر تكراراً في اختبار القدرات الكمي مع الحل خطوة بخطوة: نسب وتناسب، هندسة، متتابعات، ومسائل لفظية — إعداد الأستاذ محمود دغمش معلم رياضيات شمال الرياض.`;

const waUrl = `https://wa.me/966568598439?text=${encodeURIComponent(
  "السلام عليكم، شاهدت بنك أسئلة القدرات الكمي في الموقع وأرغب بالحجز لدورة القدرات",
)}`;

const QuduratQuestions = () => {
  const faqs = [
    {
      q: "ما أكثر أبواب القدرات الكمي تكراراً في الاختبار؟",
      a: "النسب والتناسب، والنسبة المئوية، والمقارنات، والهندسة (المحيط والمساحة والزوايا)، والمتتابعات، والمسائل اللفظية، وقراءة الجداول والرسوم البيانية.",
    },
    {
      q: "هل حل الأسئلة المتكررة يكفي للحصول على درجة عالية؟",
      a: "الأسئلة المتكررة تدرّب على أنماط التفكير وتسرّع الحل، لكن الدرجة العالية تحتاج إتقان الأساس الحسابي وإدارة وقت الاختبار مع تدريب على نماذج كاملة بتوقيت حقيقي.",
    },
    {
      q: "كم وقت أحتاج للتدرب على القسم الكمي؟",
      a: "أغلب الطلاب يحتاجون من 4 إلى 8 أسابيع بمعدل حصتين أسبوعياً مع واجب منزلي يومي قصير، ويختلف ذلك حسب مستوى الطالب وهدفه.",
    },
    {
      q: "هل الدروس حضورية أم أونلاين؟",
      a: "الدروس الحضورية متاحة في أحياء شمال الرياض، والدروس الأونلاين متاحة لجميع مناطق المملكة عبر واتساب: 0568598439.",
    },
  ];

  const quizJsonLd = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: "الأسئلة الأكثر تكراراً في القدرات الكمي",
    about: { "@type": "Thing", name: "اختبار القدرات العامة - القسم الكمي" },
    educationalLevel: "الثانوية العامة",
    inLanguage: "ar",
    url,
    hasPart: quduratTopics.flatMap((t) =>
      t.questions.map((q) => ({
        "@type": "Question",
        eduQuestionType: "Multiple choice",
        name: q.q,
        text: q.q,
        ...(q.answer
          ? {
              acceptedAnswer: { "@type": "Answer", text: q.answer + (q.solution ? ` — ${q.solution}` : "") },
              suggestedAnswer: q.options
                .filter((o) => o !== q.answer)
                .map((o) => ({ "@type": "Answer", text: o })),
            }
          : { suggestedAnswer: q.options.map((o) => ({ "@type": "Answer", text: o })) }),
      })),
    ),
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta
          name="keywords"
          content="الأسئلة الأكثر تكرارا في القدرات الكمي, أسئلة قدرات كمي مع الحل, تجميعات قدرات كمي, معلم قدرات شمال الرياض, محمود دغمش, تدريب قدرات الرياض"
        />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="ar_SA" />
        <script type="application/ld+json">{JSON.stringify(quizJsonLd)}</script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "الرئيسية", item: "https://mahmoudm.com/" },
              { "@type": "ListItem", position: 2, name: "مدرس قدرات كمي", item: "https://mahmoudm.com/qudurat" },
              { "@type": "ListItem", position: 3, name: "الأسئلة الأكثر تكراراً في الكمي", item: url },
            ],
          })}
        </script>
      </Helmet>

      <header className="relative overflow-hidden bg-gradient-to-br from-[hsl(220_85%_18%)] via-[hsl(215_80%_28%)] to-[hsl(205_85%_40%)] text-white">
        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <nav aria-label="breadcrumb" className="text-sm text-white/80 mb-6">
            <Link to="/" className="hover:text-gold inline-flex items-center gap-1">
              <Home className="w-4 h-4" /> الرئيسية
            </Link>
            <span className="mx-2">/</span>
            <Link to="/qudurat" className="hover:text-gold">مدرس قدرات كمي</Link>
            <span className="mx-2">/</span>
            <span className="text-gold">الأسئلة الأكثر تكراراً</span>
          </nav>
          <div className="text-center space-y-5 max-w-4xl mx-auto">
            <h1
              className="text-4xl md:text-6xl font-black drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
              style={{ fontFamily: "'Thmanyah Serif', serif" }}
            >
              الأسئلة الأكثر تكراراً في القدرات الكمي
            </h1>
            <p className="text-xl md:text-2xl text-[hsl(195_100%_85%)] font-bold">
              {totalQuestions} سؤالاً مختاراً مع الحل خطوة بخطوة
            </p>
            <div className="inline-flex items-center gap-3 bg-white text-[hsl(220_80%_25%)] px-6 py-3 rounded-full font-black shadow-2xl">
              <ListChecks className="w-6 h-6" />
              إعداد الأستاذ محمود دغمش - خبرة 22 عاماً
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <section className="space-y-5 text-lg leading-relaxed text-foreground">
          <p>
            جمعت في هذه الصفحة أنماط الأسئلة الأكثر تكراراً في القسم الكمي من اختبار القدرات العامة، مرتبة حسب الباب:
            النسب والتناسب، الحساب والأعداد، الهندسة، المتتابعات وقراءة الجداول، والمسائل اللفظية. كل سؤال مكتوب بخياراته
            الأربعة، وبإمكانك عرض الإجابة وطريقة الحل بعد محاولتك الشخصية.
          </p>
          <p>
            الطريقة الصحيحة للاستفادة: حل السؤال ورقياً أولاً بدون النظر للحل، ثم افتح الحل وقارن خطواتك بخطوات الحل
            المختصر. النمط المتكرر يعني أن إتقان طريقة واحدة يعطيك درجات في عدة أسئلة داخل الاختبار.
          </p>
        </section>

        <nav aria-label="أبواب الأسئلة" className="mt-10 flex flex-wrap gap-3">
          {quduratTopics.map((t) => (
            <a
              key={t.slug}
              href={`#${t.slug}`}
              className="bg-card border border-gold/40 rounded-full px-5 py-2 font-bold text-primary hover:border-gold hover:bg-gold/5 transition-colors"
            >
              {t.h2.replace(" الأكثر تكراراً في القدرات الكمي", "").replace(" الأكثر تكراراً", "")}
            </a>
          ))}
        </nav>

        {quduratTopics.map((topic) => (
          <section key={topic.slug} id={topic.slug} className="mt-14 scroll-mt-24">
            <h2 className="text-2xl md:text-3xl font-black text-primary mb-4">{topic.h2}</h2>
            <p className="text-lg leading-relaxed text-foreground mb-6">{topic.intro}</p>
            <ol className="space-y-5">
              {topic.questions.map((q, i) => (
                <li key={q.id} className="bg-card border border-border rounded-2xl p-5 hover:border-gold/60 transition-colors">
                  <h3 className="text-lg md:text-xl font-bold text-foreground leading-relaxed">
                    <span className="text-gold ml-1">{i + 1}.</span> {q.q}
                  </h3>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {q.options.map((o, j) => (
                      <li
                        key={j}
                        className="flex items-center gap-2 bg-muted/50 border border-border/60 rounded-xl px-4 py-2 text-foreground"
                      >
                        <span className="text-sm font-black text-primary">{["أ", "ب", "ج", "د"][j]}</span>
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                  {q.answer && (
                    <details className="mt-4 rounded-xl bg-primary/5 border border-primary/20 p-4 open:border-gold">
                      <summary className="cursor-pointer font-bold text-primary">عرض الحل</summary>
                      <p className="mt-3 flex items-start gap-2 text-foreground leading-relaxed">
                        <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-1" />
                        <span>
                          <strong>الإجابة: {q.answer}</strong>
                          {q.solution ? <> — {q.solution}</> : null}
                        </span>
                      </p>
                    </details>
                  )}
                </li>
              ))}
            </ol>
          </section>
        ))}

        <section className="mt-14">
          <h2 className="text-2xl md:text-3xl font-black text-primary mb-6">أسئلة شائعة عن التدريب على الكمي</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details key={i} className="bg-card border border-border rounded-xl p-5 open:border-gold">
                <summary className="cursor-pointer text-lg font-bold text-primary">{f.q}</summary>
                <p className="mt-3 text-lg leading-relaxed text-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-14 bg-primary text-primary-foreground rounded-3xl p-8 md:p-10 shadow-elegant text-center space-y-5">
          <h2 className="text-2xl md:text-3xl font-black">تدرّب على المزيد من الأسئلة مع معلم متخصص</h2>
          <p className="text-lg opacity-90">
            دورة القدرات الكمي مع الأستاذ محمود دغمش — حضورياً في شمال الرياض أو أونلاين لجميع المناطق
          </p>
          <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4">
            <a
              href="tel:+966568598439"
              className="flex items-center justify-center gap-3 bg-gold text-gold-foreground px-8 py-4 rounded-full text-xl font-black shadow-gold hover:scale-105 transition-transform"
            >
              <Phone className="w-6 h-6" />
              <span dir="ltr">اتصل: 0568598439</span>
            </a>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full text-xl font-black shadow-gold hover:scale-105 transition-transform"
            >
              <MessageCircle className="w-6 h-6" />
              واتساب
            </a>
          </div>
        </section>

        <section className="mt-12">
          <QuickBookingForm defaultStudyType="قدرات كمي" title="احجز حصة تدريب على القدرات الكمي" />
        </section>

        <nav className="mt-10 flex flex-wrap justify-center gap-5 text-center">
          <Link to="/qudurat" className="text-primary font-bold hover:text-gold underline">
            صفحة دورة القدرات الكمي
          </Link>
          <Link to="/tahsili" className="text-primary font-bold hover:text-gold underline">
            صفحة التحصيلي
          </Link>
          <Link to="/" className="text-primary font-bold hover:text-gold underline">
            ← العودة للصفحة الرئيسية
          </Link>
        </nav>
      </main>

      <footer className="bg-primary text-primary-foreground/70 py-6 text-center text-sm">
        © {new Date().getFullYear()} الأستاذ محمود محمد دغمش - جميع الحقوق محفوظة
      </footer>
    </div>
  );
};

export default QuduratQuestions;
