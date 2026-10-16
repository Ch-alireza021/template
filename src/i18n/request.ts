import { getRequestConfig } from "next-intl/server";
import { routing, type Locale } from "./routing";

const messageLoaders: Record<Locale, () => Promise<{ default: any }>> = {
  fa: () => import("../app/messages/fa.json"),
  en: () => import("../app/messages/en.json"),
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const currentLocale: Locale =
    requested && routing.locales.includes(requested as Locale)
      ? (requested as Locale)
      : routing.defaultLocale;

  const loadMessages = messageLoaders[currentLocale] ?? messageLoaders.fa;
  const messages = (await loadMessages()).default;

  return {
    locale: currentLocale,
    messages,
  };
});