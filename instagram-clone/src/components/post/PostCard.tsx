import { useState } from 'react';
import { Link } from 'react-router-dom';
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
        <Link
          to={`/profile/${post.author.username}`}
          className={styles.authorLink}
        >
          <Avatar src={post.author.avatarUrl} alt={post.author.username} />
        </Link>
        <div className={styles.headerText}>
          <Link
            to={`/profile/${post.author.username}`}
            className={styles.authorLink}
          >
            <span className={styles.username}>{post.author.username}</span>
          </Link>
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
          <Link
            to={`/profile/${post.author.username}`}
            className={styles.username}
          >
            {post.author.username}
          </Link>{' '}
          {post.caption}
        </p>
      </div>

      {post.comments.length > 0 && (
        <div className={styles.comments}>
          {post.comments.map((comment) => (
            <p key={comment.id} className={styles.comment}>
              <Link
                to={`/profile/${comment.author.username}`}
                className={styles.username}
              >
                {comment.author.username}
              </Link>{' '}
              {comment.text}
            </p>
          ))}
        </div>
      )}
    </article>
  );
}