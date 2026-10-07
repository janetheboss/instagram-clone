import type { Post } from '../../types/Post';
import { PostCard } from './PostCard';
import styles from './Feed.module.css';

interface FeedProps {
  posts: Post[];
}

export function Feed({ posts }: FeedProps) {
  if (posts.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No posts yet. Follow some people to see their posts here!</p>
      </div>
    );
  }

  return (
    <div className={styles.feed}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}