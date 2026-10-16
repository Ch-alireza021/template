import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

const t = await getTranslations("common");
const tLanding = await getTranslations("landing");


  return (
    <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <div className="max-w-2xl space-y-6">
        <span className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold text-blue-800 dark:bg-blue-950 dark:text-blue-300">
          {locale === "fa"
            ? "سامانه ملی ورزش مدارس"
            : "National Student Portal"}
        </span>

        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
          {tLanding("title")}
        </h1>

        <p className="text-base text-slate-600 sm:text-lg dark:text-slate-400">
          {tLanding("description")}
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link
            href="/login"
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
          >
            {t("login")}
          </Link>
          <a
            href="#features"
            className="rounded-lg border border-slate-300 px-6 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {tLanding("competitions")}
          </a>
        </div>
      </div>
    </main>
  );
}
