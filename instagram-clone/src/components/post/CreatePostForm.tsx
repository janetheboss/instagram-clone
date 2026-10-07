import { useState } from 'react';
import type { User } from '../../types/User';
import type { Post } from '../../types/Post';
import styles from './CreatePostForm.module.css';

interface CreatePostFormProps {
  currentUser: User;
  onCreate: (post: Post) => void;
}

export function CreatePostForm({ currentUser, onCreate }: CreatePostFormProps) {
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const canSubmit = caption.trim().length > 0 && imageUrl.trim().length > 0;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!canSubmit) return;

    const newPost: Post = {
      id: crypto.randomUUID(),
      author: currentUser,
      imageUrl: imageUrl.trim(),
      caption: caption.trim(),
      likeCounter: 0,
      likedByMe: false,
      comments: [],
      createdAt: new Date().toISOString(),
    };

    onCreate(newPost);

    setCaption('');
    setImageUrl('');
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="caption">Caption</label>
        <textarea
          id="caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="What's on your mind?"
          rows={3}
          maxLength={2200}
        />
        <span className={styles.helper}>{caption.length} / 2200</span>
      </div>

      <div className={styles.field}>
        <label htmlFor="imageUrl">Image URL</label>
        <input
          id="imageUrl"
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://picsum.photos/seed/abc/600/600"
        />
      </div>

      {imageUrl && (
        <div className={styles.preview}>
          <img src={imageUrl} alt="Preview" />
        </div>
      )}

      <button type="submit" disabled={!canSubmit} className={styles.button}>
        Share
      </button>
    </form>
  );
}