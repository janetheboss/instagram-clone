import { useNavigate } from 'react-router-dom';
import { CreatePostForm } from '../../components/post/CreatePostForm';
import { mockUsers } from '../../services/mockData';
import type { Post } from '../../types/Post';

interface CreatePageProps {
  onAddPost: (post: Post) => void;
}

export function CreatePage({ onAddPost }: CreatePageProps) {
  const navigate = useNavigate();

  function handleCreate(post: Post) {
    onAddPost(post);
    navigate('/');
  }

  return (
    <div>
      <h1>Create post</h1>
      <CreatePostForm currentUser={mockUsers[0]} onCreate={handleCreate} />
    </div>
  );
}