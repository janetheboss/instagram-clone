import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Logo } from '../../components/common/Logo';
import styles from './LoginPage.module.css';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = email.trim().length > 0 && password.length > 0 && !submitting;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setError(null);

    try {
      await login(email.trim(), password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.blob3} />

      <form className={styles.card} onSubmit={handleSubmit}>
        <div className={styles.brand}>
          <Logo size={56} />
        </div>
        <p className={styles.subtitle}>The heartbeat of your feed</p>

        <div className={styles.field}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
        <div className={styles.field}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" disabled={!canSubmit} className={styles.button}>
          {submitting ? 'Logging in…' : 'Log in'}
        </button>

        <p className={styles.hint}>Try alice@test.com / password</p>

        <div className={styles.divider}>
          <span>OR</span>
        </div>

        <p className={styles.switch}>
          Don&apos;t have an account?{' '}
          <Link to="/register" className={styles.switchLink}>
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}