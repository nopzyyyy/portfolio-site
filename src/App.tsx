import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useThemeStore } from './stores/themeStore';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PhotoDetailPage from './pages/PhotoDetailPage';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import NotFoundPage from './pages/NotFoundPage';
import MouseParticleEffect from './components/effects/MouseParticleEffect';

function App() {
  const { isDarkMode } = useThemeStore();
  
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  
  return (
    <>
      <MouseParticleEffect />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/photo/:id" element={<PhotoDetailPage />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;