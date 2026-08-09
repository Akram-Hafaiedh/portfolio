// app/[locale]/blog/[slug]/page.tsx
import { getBlogPostBySlug, getRelatedBlogPosts, getBlogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import BlogPostDetailClient from '@/app/components/blog/BlogPostDetailClient';
import type { Metadata } from 'next';

interface BlogPostPageProps {
    params: Promise<{
        locale: string;
        slug: string;
    }>;
}

// Generate static routes for the blog posts at build time (optional but excellent for performance)
export async function generateStaticParams() {
    const locales = ['en', 'fr'];
    const paths: { locale: string; slug: string }[] = [];

    locales.forEach((locale) => {
        const posts = getBlogPosts(locale as 'en' | 'fr');
        posts.forEach((post) => {
            paths.push({
                locale,
                slug: post.slug,
            });
        });
    });

    return paths;
}

// Generate dynamic page metadata for search crawler indexing
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { locale, slug } = await params;
    const post = getBlogPostBySlug(slug, locale as 'en' | 'fr');

    if (!post) {
        return {
            title: 'Article Not Found',
        };
    }

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.date,
            authors: [post.author.name],
            images: [
                {
                    url: post.image,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [post.image],
        },
    };
}

export default async function BlogPostDetailPage({ params }: BlogPostPageProps) {
    const { locale, slug } = await params;
    const post = getBlogPostBySlug(slug, locale as 'en' | 'fr');

    if (!post) {
        notFound();
    }

    const relatedPosts = getRelatedBlogPosts(post, locale as 'en' | 'fr', 2);

    return (
        <BlogPostDetailClient
            post={post}
            relatedPosts={relatedPosts}
        />
    );
}
