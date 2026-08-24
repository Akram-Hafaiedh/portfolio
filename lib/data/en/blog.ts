// lib/data/en/blog.ts
import { BlogPost } from '../blogTypes';
import { frontendPosts } from './posts/frontend';
import { architecturePosts } from './posts/architecture';
import { backendPosts } from './posts/backend';
import { securityPosts } from './posts/security';
import { integrationsPosts } from './posts/integrations';

export const blogPosts: BlogPost[] = [
  ...frontendPosts,
  ...architecturePosts,
  ...backendPosts,
  ...securityPosts,
  ...integrationsPosts,
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
