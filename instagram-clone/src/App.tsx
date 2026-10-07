import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/common/Layout';
import { HomePage } from './pages/Home/HomePage';
import { ProfilePage } from './pages/Profile/ProfilePage';
import { CreatePage } from './pages/Create/CreatePage';
import type { Post } from './types/Post';
import { mockPosts } from './services/mockData';

function App() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  function addPost(post: Post) {
    setPosts([post, ...posts]);
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage posts={posts} />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/create" element={<CreatePage onAddPost={addPost} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;