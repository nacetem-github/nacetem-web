import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Initiatives from './pages/Initiatives';
import About from './pages/About';
import Contact from './pages/Contact';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Events from './pages/Events';
import Publications from './pages/Publications';
import CapacityBuilding from './pages/CapacityBuilding';
import CapacityBuildingDetail from './pages/CapacityBuildingDetail';
import PsrTest from './pages/PsrTest';
import SeminarSeries from './pages/SeminarSeries';
import Research from './pages/Research';
import PlaceholderPage from './pages/PlaceholderPage';
import { Login, AdminDashboard } from './pages/Admin';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="research" element={<Research />} />
              <Route path="research/seminar-series" element={<SeminarSeries />} />
              <Route path="capacity-building" element={<CapacityBuilding />} />
              <Route path="capacity-building/:slug" element={<CapacityBuildingDetail />} />
              <Route path="gallery" element={<PlaceholderPage title="Gallery" description="Visual highlights from our events and programs." />} />
              <Route path="events" element={<Events />} />
              <Route path="psr-test" element={<PsrTest />} />
              <Route path="initiatives" element={<Initiatives />} />
              <Route path="news" element={<News />} />
              <Route path="news/:slug" element={<NewsDetail />} />
              <Route path="publications" element={<Publications />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<PlaceholderPage title="Page Not Found" description="The requested page could not be found." />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}
