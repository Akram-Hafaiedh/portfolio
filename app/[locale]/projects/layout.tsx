import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Common' });

    return {
        title: t('seo.pages.projects'),
        description: t('seo.description'),
    };
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
