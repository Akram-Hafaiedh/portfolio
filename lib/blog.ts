// lib/blog.ts
import { blogPosts as enBlogPosts } from './data/en/blog';
import { blogPosts as frBlogPosts } from './data/fr/blog';
import { BlogPost } from './data/blogTypes';

export type { BlogPost };

export const getBlogPosts = (lang: 'en' | 'fr' = 'en'): BlogPost[] => {
    const posts = lang === 'fr' ? frBlogPosts : enBlogPosts;
    // Sort posts by date descending
    return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getBlogPostBySlug = (slug: string, lang: 'en' | 'fr' = 'en'): BlogPost | undefined => {
    const posts = getBlogPosts(lang);
    return posts.find((post) => post.slug === slug);
};

export const getFeaturedBlogPost = (lang: 'en' | 'fr' = 'en'): BlogPost | undefined => {
    const posts = getBlogPosts(lang);
    return posts.find((post) => post.featured === true) || posts[0];
};

export const getCategories = (lang: 'en' | 'fr' = 'en'): string[] => {
    const posts = getBlogPosts(lang);
    return Array.from(new Set(posts.map((post) => post.category)));
};

export const getRelatedBlogPosts = (currentPost: BlogPost, lang: 'en' | 'fr' = 'en', limit = 2): BlogPost[] => {
    const posts = getBlogPosts(lang);
    return posts
        .filter((post) => post.slug !== currentPost.slug && (post.category === currentPost.category || post.tags.some(tag => currentPost.tags.includes(tag))))
        .slice(0, limit);
};
