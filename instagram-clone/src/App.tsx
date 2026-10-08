import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Layout } from './components/common/Layout';
import { HomePage } from './pages/Home/HomePage';
import { ProfilePage } from './pages/Profile/ProfilePage';
import { CreatePage } from './pages/Create/CreatePage';
import { LoginPage } from './pages/Login/LoginPage';
import { RegisterPage } from './pages/Register/RegisterPage';
import { useAuth } from './hooks/useAuth';
import { usePosts } from './hooks/usePosts';

function RequireAuth() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

function App() {
  const { posts, loading, error, addPost, refresh } = usePosts();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<RequireAuth />}>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <HomePage
                posts={posts}
                loading={loading}
                error={error}
                onRefresh={refresh}
              />
            }
          />
          <Route path="/profile/:username" element={<ProfilePage posts={posts} />} />
          <Route path="/create" element={<CreatePage onAddPost={addPost} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;