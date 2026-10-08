import { useId } from 'react';
import styles from './Logo.module.css';

interface LogoProps {
  size?: number;
  variant?: 'full' | 'icon-only';
}

export function Logo({ size = 32, variant = 'full' }: LogoProps) {
  const gradientId = useId();

  return (
    <div
      className={styles.wrapper}
      style={{ gap: size * 0.22 }}
      aria-label="Pulse"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        className={styles.icon}
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#f09433" />
            <stop offset="50%" stopColor="#dc2743" />
            <stop offset="100%" stopColor="#bc1888" />
          </linearGradient>
        </defs>

        {/* Rounded square background */}
        <rect
          x="2"
          y="2"
          width="44"
          height="44"
          rx="13"
          fill={`url(#${gradientId})`}
        />

        {/* Pulse waveform */}
        <path
          d="M9 24 L17 24 L20 14 L26 34 L29 24 L39 24"
          stroke="white"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      {variant === 'full' && (
        <span
          className={styles.wordmark}
          style={{ fontSize: size * 0.75 }}
        >
          Pulse
        </span>
      )}
    </div>
  );
}