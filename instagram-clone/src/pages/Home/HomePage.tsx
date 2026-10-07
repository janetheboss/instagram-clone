import { Feed } from '../../components/post/Feed';
import type { Post } from '../../types/Post';
import styles from './HomePage.module.css';

interface HomePageProps {
  posts: Post[];
}

export function HomePage({ posts }: HomePageProps) {
  return (
    <div className={styles.page}>
      <Feed posts={posts} />
    </div>
  );
}