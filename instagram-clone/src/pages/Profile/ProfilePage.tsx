import { useParams } from 'react-router-dom';

export function ProfilePage() {
  const { username } = useParams<{ username: string }>();

  return (
    <div>
      <h1>Profile: {username}</h1>
      <p>User info and posts will show up here.</p>
    </div>
  );
}