"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const t = useTranslations("common");
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSettingsOpen, setMobileSettingsOpen] = useState(false);

  const settingsRef = useRef<HTMLDivElement | null>(null);

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/#about", label: t("nav.about") },
    { href: "/#news", label: t("nav.news") },
    // { href: "/#competitions", label: t("nav.competitions") },
    // { href: "/#education", label: t("nav.education") },
    // { href: "/#gallery", label: t("nav.gallery") },
    { href: "/#contact", label: t("nav.contact") },
  ];

  // قفل کردن اسکرول صفحه وقتی مودال موبایل باز است
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // بستن منوی تنظیمات با کلیک در بیرون
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!settingsRef.current) return;
      if (settingsRef.current.contains(e.target as Node)) return;
      setMobileSettingsOpen(false);
    }

    if (mobileSettingsOpen) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [mobileSettingsOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full">
        {/* کانتینر بیرونی با فاصله از لبه بالای صفحه */}
        <div className="mx-auto px-3 sm:px-4 pt-3 sm:pt-4">
          {/* محفظه شناور بلورین در مرکز با حداکثر عرض ۱۲۰۰ پیکسل */}
          <div
            className={[
              "mx-auto",
              "max-w-[1200px]",
              "rounded-2xl",
              "bg-white/70 backdrop-blur-xl",
              "dark:bg-slate-950/65",
              "border border-slate-200/60 dark:border-slate-800/70",
              "shadow-[0_10px_30px_-20px_rgba(2,6,23,0.35)] dark:shadow-[0_10px_30px_-20px_rgba(0,0,0,0.65)]",
              "transition-colors duration-300",
            ].join(" ")}
          >
            <div className="flex h-16 sm:h-20 items-center justify-between px-3 sm:px-6 lg:px-8">
              {/* نشان برند فدراسیون (ترازبندی شده برای حفظ فضا در موبایل) */}
              <Link
                href="/"
                className="group flex items-center gap-2 sm:gap-3 transition-transform hover:scale-[1.01] min-w-0"
              >
                <div className="relative flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-linear-to-tr from-blue-600 via-sky-500 to-amber-400 p-0.5 shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/35 transition-all">
                  <div className="flex h-full w-full items-center justify-center rounded-[10px] sm:rounded-[14px] bg-white dark:bg-slate-900">
                    <svg
                      className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-sky-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="5" r="2" />
                      <path d="m9 20 3-6 3 2 3-5" />
                      <path d="m6 8 6 2 4-3" />
                      <path d="M4 14l4-1 2 3" />
                    </svg>
                  </div>
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="text-xs sm:text-base font-black tracking-tight text-slate-900 dark:text-white truncate">
                    {t("brand")}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">
                    {t("subBrand")}
                  </span>
                </div>
              </Link>

              {/* منوی ناوبری دسکتاپ با هاور لاین نوری */}
              <nav className="hidden xl:flex items-center gap-7 text-[14px] font-medium text-slate-600 dark:text-slate-300">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`group relative py-2 transition-all duration-300 ease-out hover:-translate-y-1 hover:text-slate-900 dark:hover:text-white ${
                        isActive
                          ? "font-semibold text-slate-900 dark:text-white"
                          : "text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      <span>{link.label}</span>
                      <span
                        className={`absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-linear-to-r from-blue-600 to-sky-400 dark:from-sky-400 dark:to-indigo-400 transition-all duration-300 ease-out ${
                          isActive
                            ? "opacity-100 scale-x-100"
                            : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                        }`}
                      />
                    </Link>
                  );
                })}
              </nav>

              {/* بخش دکمه‌ها و کنترل‌ها */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                {/* کنترل‌های مجزا فقط در دسکتاپ */}
                <div className="hidden xl:flex items-center gap-2.5">
                  <LanguageSwitcher />
                  <ThemeToggle />
                </div>

                {/* دکمه ورود به پورتال در دسکتاپ و تبلت */}
                <Link
                  href="/login"
                  className="hidden md:inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-blue-600 via-blue-700 to-indigo-700 px-4 py-2 sm:px-4.5 sm:py-2.5 text-xs font-bold text-white shadow-md shadow-blue-600/25 transition-all hover:shadow-lg hover:shadow-blue-600/40 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                  <span>{t("login")}</span>
                </Link>

                {/* دکمه پاپ‌اور تنظیمات در موبایل */}
                <div className="relative xl:hidden" ref={settingsRef}>
                  <button
                    type="button"
                    onClick={() => setMobileSettingsOpen((v) => !v)}
                    className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-slate-200/70 text-slate-700 hover:bg-slate-100/70 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900/60 transition"
                    aria-label={t("settings")}
                  >
                    <svg
                      className="h-4.5 w-4.5 sm:h-5 sm:w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
                      <path d="M19.4 15a1.8 1.8 0 0 0 .36 1.98l.05.05a2.2 2.2 0 0 1-1.56 3.76 2.2 2.2 0 0 1-1.56-.64l-.05-.05a1.8 1.8 0 0 0-1.98-.36 1.8 1.8 0 0 0-1.1 1.65V22a2.2 2.2 0 0 1-4.4 0v-.07A1.8 1.8 0 0 0 6 20.3a1.8 1.8 0 0 0-1.98.36l-.05.05a2.2 2.2 0 0 1-1.56.64A2.2 2.2 0 0 1 .85 17.6l.05-.05A1.8 1.8 0 0 0 1.26 15a1.8 1.8 0 0 0-1.65-1.1H-.5a2.2 2.2 0 0 1 0-4.4h.11A1.8 1.8 0 0 0 1.26 8a1.8 1.8 0 0 0-.36-1.98l-.05-.05A2.2 2.2 0 0 1 2.4 2.21c.56 0 1.12.21 1.56.64l.05.05A1.8 1.8 0 0 0 6 3.26a1.8 1.8 0 0 0 1.1-1.65V1.5a2.2 2.2 0 0 1 4.4 0v.11A1.8 1.8 0 0 0 13.7 3a1.8 1.8 0 0 0 1.98-.36l.05-.05a2.2 2.2 0 0 1 1.56-.64 2.2 2.2 0 0 1 1.56 3.76l-.05.05A1.8 1.8 0 0 0 19.4 9c.7 0 1.33.4 1.65 1.1h.11a2.2 2.2 0 0 1 0 4.4h-.11A1.8 1.8 0 0 0 19.4 15Z" />
                    </svg>
                  </button>

                  {mobileSettingsOpen && (
                    <div className="absolute left-0 sm:right-0 mt-2 w-56 rounded-2xl border border-slate-200/80 bg-white/95 p-3 shadow-2xl backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/95 z-50">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800/80">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          {t("settings")}
                        </span>
                      </div>

                      <div className="mt-2.5 grid gap-2">
                        <div className="flex items-center justify-between rounded-xl border border-slate-200/70 bg-slate-50/70 px-3 py-2 dark:border-slate-800/80 dark:bg-slate-900/50">
                          <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                            {t("language")}
                          </span>
                          <LanguageSwitcher />
                        </div>

                        <div className="flex items-center justify-between rounded-xl border border-slate-200/70 bg-slate-50/70 px-3 py-2 dark:border-slate-800/80 dark:bg-slate-900/50">
                          <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                            {t("theme")}
                          </span>
                          <ThemeToggle />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* دکمه باز کردن مودال ناوبری موبایل */}
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-slate-200/70 text-slate-700 hover:bg-slate-100/70 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900/60 xl:hidden transition"
                  aria-label={t("menu")}
                >
                  <svg
                    className="h-4.5 w-4.5 sm:h-5 sm:w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* مودال ناوبری موبایل (کاملاً مجزا از هدر و بدون کش آمدن نوار) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden flex items-end sm:items-center justify-center">
          {/* بک‌دراپ تاریک و بلورین پشت مودال */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* کارت مودال منو */}
          <div className="relative w-full sm:max-w-md max-h-[85vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-2xl backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/95 transition-all">
            {/* سربرگ مودال موبایل */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-xs">
                  {t("brand").slice(0, 1)}
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {t("brand")}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 transition"
                aria-label={t("close")}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* لیست پیوندهای ناوبری */}
            <nav className="flex flex-col gap-1.5 py-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-sky-400"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
                    }`}
                  >
                    <span>{link.label}</span>
                    <svg className="h-4 w-4 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </Link>
                );
              })}
            </nav>

            {/* فوتر مودال با دکمه مستقیم ورود */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 py-3 text-sm font-bold text-white shadow-md shadow-blue-500/25 transition hover:shadow-lg active:scale-[0.99]"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
                <span>{t("login")}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
