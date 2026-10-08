import { useNavigate } from 'react-router-dom';
import { CreatePostForm } from '../../components/post/CreatePostForm';
import { useAuth } from '../../hooks/useAuth';
import { postsService } from '../../services';
import type { Post } from '../../types/Post';
import styles from './CreatePage.module.css';

interface CreatePageProps {
  onAddPost: (post: Post) => void;
}

export function CreatePage({ onAddPost }: CreatePageProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  async function handleCreate(draft: Omit<Post, 'id' | 'createdAt'>) {
    const created = await postsService.create(draft);
    onAddPost(created);
    navigate('/');
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Create post</h1>
      <CreatePostForm currentUser={user} onCreate={handleCreate} />
    </div>
  );
}