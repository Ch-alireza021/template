"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const t = useTranslations("common");
  const { theme, setTheme } = useTheme();

  return (
    <button
      aria-label={t("theme")}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-lg border border-slate-300 p-2 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-sky-400" />
      <span className="sr-only">{t("theme")}</span>
    </button>
  );
}
