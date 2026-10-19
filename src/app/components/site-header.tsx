import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import { Activity } from "lucide-react";

export async function SiteHeader() {
  // مشخص کردن شاخه common برای دسترسی به brand، navHome و بقیه کلیدها
  const t = await getTranslations("common");

  return (
    <header className="border-b border-slate-200/70 dark:border-slate-800">
      <div className="container-page flex min-h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="rounded-xl bg-brand-600 p-2 text-white">
            <Activity />
          </span>
          {t("brand")}
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link href="/">{t("navHome")}</Link>
          <a href="#events">{t("navEvents")}</a>
          <a href="#resources">{t("navResources")}</a>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link
            href="/login"
            className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white"
          >
            {t("login")}
          </Link>
        </div>
      </div>
    </header>
  );
}
