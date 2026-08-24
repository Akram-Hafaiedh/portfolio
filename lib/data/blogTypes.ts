// lib/data/blogTypes.ts

export interface Author {
    name: string;
    avatar: string;
    role?: string;
}

export interface BlogSeries {
    id: string;
    title: string;
    part: number;
    totalParts: number;
}

export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    content: string; // Markdown formatted string
    date: string; // Format: YYYY-MM-DD
    readTime: string; // e.g. "5 min read" / "5 min de lecture"
    category: string; // e.g. "Engineering", "Design", "DevOps"
    tags: string[];
    image: string; // Main banner image
    author: Author;
    featured?: boolean;
    series?: BlogSeries;
}
