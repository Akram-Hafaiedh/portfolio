import { faqData as enFaq, FAQItem } from './data/en/faq';
import { faqData as frFaq } from './data/fr/faq';

export type { FAQItem };

export const getFaqData = (lang: 'en' | 'fr' = 'en') => {
    return lang === 'fr' ? frFaq : enFaq;
}

export const faqData = enFaq; // Backward compatibility