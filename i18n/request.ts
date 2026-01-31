import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from '../i18n.config';
import { notFound } from 'next/navigation';

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    // Validate that the incoming `locale` parameter is valid
    if (!locale || !locales.includes(locale as any)) {
        locale = defaultLocale;
    }

    const common = (await import(`../messages/${locale}/common.json`)).default;
    const home = (await import(`../messages/${locale}/home.json`)).default;
    const about = (await import(`../messages/${locale}/about.json`)).default;
    const projects = (await import(`../messages/${locale}/projects.json`)).default;
    const projectDetails = (await import(`../messages/${locale}/projectDetails.json`)).default;
    const contact = (await import(`../messages/${locale}/contact.json`)).default;
    const booking = (await import(`../messages/${locale}/booking.json`)).default;
    const experience = (await import(`../messages/${locale}/experience.json`)).default;

    return {
        locale: locale as string,
        messages: {
            ...common,
            ...home,
            ...about,
            ...projects,
            ...projectDetails,
            ...contact,
            ...booking,
            ...experience
        }
    };
});
