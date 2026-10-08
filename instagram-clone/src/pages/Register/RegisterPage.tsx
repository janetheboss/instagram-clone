import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Logo } from '../../components/common/Logo';
import styles from './RegisterPage.module.css';

const USERNAME_PATTERN = /^[a-z0-9_]{3,20}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const emailValid = EMAIL_PATTERN.test(email.trim());
  const usernameValid = USERNAME_PATTERN.test(username.trim());
  const passwordValid = password.length >= 6;
  const passwordsMatch = password === confirmPassword;
  const displayNameValid = displayName.trim().length >= 2;

  const canSubmit =
    emailValid &&
    usernameValid &&
    passwordValid &&
    passwordsMatch &&
    displayNameValid &&
    !submitting;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setError(null);

    try {
      await register({
        email: email.trim(),
        username: username.trim(),
        displayName: displayName.trim(),
        password,
      });
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
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
          <Logo size={52} />
        </div>
        <p className={styles.subtitle}>
          Join Pulse to share and discover photos
        </p>

        <div className={styles.field}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          {email.length > 0 && !emailValid && (
            <span className={styles.fieldError}>Enter a valid email</span>
          )}
        </div>

        <div className={styles.field}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
          {username.length > 0 && !usernameValid && (
            <span className={styles.fieldError}>
              3–20 lowercase letters, numbers, underscore
            </span>
          )}
        </div>

        <div className={styles.field}>
          <input
            type="text"
            placeholder="Display name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            autoComplete="name"
          />
        </div>

        <div className={styles.field}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
          {password.length > 0 && !passwordValid && (
            <span className={styles.fieldError}>At least 6 characters</span>
          )}
        </div>

        <div className={styles.field}>
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />
          {confirmPassword.length > 0 && !passwordsMatch && (
            <span className={styles.fieldError}>Passwords do not match</span>
          )}
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" disabled={!canSubmit} className={styles.button}>
          {submitting ? 'Creating account…' : 'Sign up'}
        </button>

        <p className={styles.terms}>
          By signing up you agree to our fake terms.
        </p>

        <div className={styles.divider}>
          <span>OR</span>
        </div>

        <p className={styles.switch}>
          Have an account?{' '}
          <Link to="/login" className={styles.switchLink}>
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}