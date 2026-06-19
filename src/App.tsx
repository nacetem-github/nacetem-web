import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import Layout from './components/Layout';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';

const Home = lazy(() => import('./pages/Home'));
const Initiatives = lazy(() => import('./pages/Initiatives'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const News = lazy(() => import('./pages/News'));
const NewsDetail = lazy(() => import('./pages/NewsDetail'));
const Events = lazy(() => import('./pages/Events'));
const EventDetail = lazy(() => import('./pages/EventDetail'));
const EventReport = lazy(() => import('./pages/EventReport'));
const Publications = lazy(() => import('./pages/Publications'));
const CapacityBuilding = lazy(() => import('./pages/CapacityBuilding'));
const CapacityBuildingDetail = lazy(() => import('./pages/CapacityBuildingDetail'));
const PsrTest = lazy(() => import('./pages/PsrTest'));
const SeminarSeries = lazy(() => import('./pages/SeminarSeries'));
const Research = lazy(() => import('./pages/Research'));
const PlaceholderPage = lazy(() => import('./pages/PlaceholderPage'));
const Login = lazy(() => import('./pages/Admin').then((module) => ({ default: module.Login })));
const AdminDashboard = lazy(() => import('./pages/Admin').then((module) => ({ default: module.AdminDashboard })));

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div className="min-h-screen bg-slate-50" />;
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Suspense fallback={<div className="min-h-[50vh] bg-slate-50" aria-label="Loading page" />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="research" element={<Research />} />
              <Route path="research/seminar-series" element={<SeminarSeries />} />
              <Route path="capacity-building" element={<CapacityBuilding />} />
              <Route path="capacity-building/:slug" element={<CapacityBuildingDetail />} />
              <Route path="gallery" element={<Navigate to="/news#event-gallery" replace />} />
              <Route path="events" element={<Events />} />
              <Route path="events/reports/:slug" element={<EventReport />} />
              <Route path="events/:slug" element={<EventDetail />} />
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
          </Suspense>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}
