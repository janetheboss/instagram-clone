import { useCallback, useEffect, useState } from 'react';
import { postsService } from '../services';
import type { Post } from '../types';

interface UsePostsResult {
  posts: Post[];
  loading: boolean;
  error: string | null;
  addPost: (post: Post) => void;
  refresh: () => Promise<void>;
}

export function usePosts(): UsePostsResult {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await postsService.list();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addPost = useCallback((post: Post) => {
    setPosts((prev) => [post, ...prev]);
  }, []);

  return { posts, loading, error, addPost, refresh };
}