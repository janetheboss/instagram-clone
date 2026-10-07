import styles from './Avatar.module.css';

interface AvatarProps{
  src: string;
  alt: string;
  size?: number;
}

export function Avatar({ src, alt, size = 32 }: AvatarProps) {
  return(
    <img
    src = {src}
    alt = {alt}
    className= {styles.avatar}
    style={{width: size, height: size}}/>
  );

}