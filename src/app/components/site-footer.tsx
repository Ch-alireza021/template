import { getTranslations } from "next-intl/server";
export async function SiteFooter() {
  const t = await getTranslations("common");
  return (
    <footer className="border-t border-slate-200 py-7 text-center text-sm text-slate-500 dark:border-slate-800">
      © {new Date().getFullYear()} · {t("footer")}
    </footer>
  );
}
