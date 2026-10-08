import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Avatar } from '../../components/common/Avatar';
import { mockUsers } from '../../services/mockData';
import type { Post } from '../../types/Post';
import type { User } from '../../types/User';
import styles from './ProfilePage.module.css';

interface ProfilePageProps {
  posts: Post[];
}

export function ProfilePage({ posts }: ProfilePageProps) {
  const { username } = useParams<{ username: string }>();
  const { user: currentUser } = useAuth();

  // Prefer the logged-in user if the URL matches; otherwise look up in mock users.
  // When we add a real API, this becomes a fetch by username.
  const profileUser: User | undefined =
    currentUser && currentUser.username === username
      ? currentUser
      : mockUsers.find((u) => u.username === username);

  if (!profileUser) {
    return (
      <div className={styles.notFound}>
        <p>User not found</p>
      </div>
    );
  }

  const userPosts = posts.filter((p) => p.author.id === profileUser.id);
  const isOwnProfile = currentUser?.id === profileUser.id;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.avatarWrapper}>
          <Avatar src={profileUser.avatarUrl} alt={profileUser.username} size={150} />
        </div>

        <div className={styles.info}>
          <div className={styles.topRow}>
            <h1 className={styles.username}>{profileUser.username}</h1>
            {!isOwnProfile && (
              <button className={styles.followButton}>Follow</button>
            )}
          </div>

          <div className={styles.stats}>
            <span>
              <strong>{userPosts.length}</strong> posts
            </span>
            <span>
              <strong>{profileUser.followerCount.toLocaleString()}</strong> followers
            </span>
            <span>
              <strong>{profileUser.followingCount}</strong> following
            </span>
          </div>

          <div className={styles.bio}>
            <p className={styles.displayName}>{profileUser.displayName}</p>
            {profileUser.bio && <p>{profileUser.bio}</p>}
          </div>
        </div>
      </header>

      <section className={styles.grid}>
        {userPosts.length === 0 ? (
          <p className={styles.noPosts}>No posts yet</p>
        ) : (
          userPosts.map((post) => (
            <div key={post.id} className={styles.gridItem}>
              <img src={post.imageUrl} alt={post.caption} />
            </div>
          ))
        )}
      </section>
    </div>
  );
}