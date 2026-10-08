import type { Post } from '../types/Post';
import { mockPosts } from './mockData';

export const postsService = {
  async list(): Promise<Post[]> {
    // TODO: replace with `const { data } = await api.get<Post[]>('/posts'); return data;`
    await delay(500);
    return [...mockPosts];
  },

  async create(post: Omit<Post, 'id' | 'createdAt'>): Promise<Post> {
    // TODO: replace with `const { data } = await api.post<Post>('/posts', post); return data;`
    await delay(500);
    const created: Post = {
      ...post,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    return created;
  },
};

function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}