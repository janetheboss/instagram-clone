import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Avatar } from './Avatar';
import { Logo } from './Logo';
import styles from './Layout.module.css';

export function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className={styles.container}>
      <nav className={styles.sidebar}>
        <div className={styles.brand}>
          <Logo size={30} />
        </div>

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/create"
          className={({ isActive }) =>
            isActive
              ? `${styles.createButton} ${styles.createButtonActive}`
              : styles.createButton
          }
        >
          <span className={styles.plusIcon}>+</span>
          <span>Create</span>
        </NavLink>

        {user && (
          <NavLink
            to={`/profile/${user.username}`}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Profile
          </NavLink>
        )}

        <div className={styles.spacer} />

        {user && (
          <div className={styles.userBox}>
            <Link to={`/profile/${user.username}`} className={styles.userLink}>
              <Avatar src={user.avatarUrl} alt={user.username} size={28} />
              <span className={styles.username}>@{user.username}</span>
            </Link>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Log out
            </button>
          </div>
        )}
      </nav>

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}