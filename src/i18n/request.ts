import * as rootParams from 'next/root-params';
import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';
import {notFound} from 'next/navigation';

export default getRequestConfig(async () => {
  const paramValue = await rootParams.locale();

  if (!hasLocale(routing.locales, paramValue)) {
    notFound();
  }

  return {
    locale: paramValue,
    messages: (await import(`../messages/${paramValue}.json`)).default
  };
});