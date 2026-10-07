import { useState } from 'react';
import type { Post } from '../../types/Post';
import { Avatar } from '../common/Avatar';
import { formatRelativeTime } from '../../utils/formatDate';
import styles from './PostCard.module.css';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(post.likedByMe);
  const [likeCount, setLikeCount] = useState(post.likeCounter);

  function handleLikeClick() {
    if (liked) {
      setLiked(false);
      setLikeCount(likeCount - 1);
    } else {
      setLiked(true);
      setLikeCount(likeCount + 1);
    }
  }

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <Avatar src={post.author.avatarUrl} alt={post.author.username} />
        <div className={styles.headerText}>
          <span className={styles.username}>{post.author.username}</span>
          <span className={styles.time}>{formatRelativeTime(post.createdAt)}</span>
        </div>
      </header>

      <div className={styles.imageWrapper}>
        <img src={post.imageUrl} alt={post.caption} className={styles.image} />
      </div>

      <div className={styles.actions}>
        <button
          className={`${styles.actionButton} ${liked ? styles.liked : ''}`}
          onClick={handleLikeClick}
          aria-label={liked ? 'Unlike' : 'Like'}
        >
          {liked ? '❤️' : '🤍'}
        </button>
        <span className={styles.likeCount}>{likeCount} likes</span>
      </div>

      <div className={styles.body}>
        <p>
          <span className={styles.username}>{post.author.username}</span>{' '}
          {post.caption}
        </p>
      </div>

      {post.comments.length > 0 && (
        <div className={styles.comments}>
          {post.comments.map((comment) => (
            <p key={comment.id} className={styles.comment}>
              <span className={styles.username}>{comment.author.username}</span>{' '}
              {comment.text}
            </p>
          ))}
        </div>
      )}
    </article>
  );
}