import { Feed } from '../../components/post/Feed';
import type { Post } from '../../types/Post';
import styles from './HomePage.module.css';

interface HomePageProps {
  posts: Post[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
}

export function HomePage({ posts, loading, error, onRefresh }: HomePageProps) {
  return (
    <div className={styles.page}>
      {loading && (
        <div className={styles.state}>
          <p>Loading posts…</p>
        </div>
      )}

      {error && (
        <div className={styles.state}>
          <p className={styles.errorText}>{error}</p>
          <button onClick={onRefresh} className={styles.retryButton}>
            Try again
          </button>
        </div>
      )}

      {!loading && !error && <Feed posts={posts} />}
    </div>
  );
}