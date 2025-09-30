import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from './AppContext';
import MainLayout from './components/layout/MainLayout';
import LandingPage from './pages/LandingPage';
import AdminAccess from './pages/AdminAccess';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ContentManagement from './pages/ContentManagement';
import Settings from './pages/Settings';
import AuditTrail from './pages/AuditTrail';
import './index.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminAccess />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Routes with MainLayout */}
          <Route path="/admin/*" element={
            <MainLayout>
              <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="content" element={<ContentManagement />} />
                <Route path="settings" element={<Settings />} />
                <Route path="audit-trail" element={<AuditTrail />} />
              </Routes>
            </MainLayout>
          } />
        </Routes>

        {/* Toast Notifications */}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              borderRadius: '8px',
              padding: '12px 16px',
              fontSize: '14px',
              fontWeight: '500',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              maxWidth: '400px',
            },
            success: {
              duration: 3000,
              style: {
                background: 'var(--color-green-50)',
                color: 'var(--color-green-600)',
                border: '1px solid var(--color-green-200)',
              },
              icon: '✅',
            },
            error: {
              duration: 5000,
              style: {
                background: 'var(--color-red-50)',
                color: 'var(--color-red-600)',
                border: '1px solid var(--color-red-200)',
              },
              icon: '❌',
            },
            warning: {
              duration: 4000,
              style: {
                background: 'var(--color-orange-50)',
                color: 'var(--color-orange-600)',
                border: '1px solid var(--color-orange-200)',
              },
              icon: '⚠️',
            },
            info: {
              duration: 4000,
              style: {
                background: 'var(--color-blue-50)',
                color: 'var(--color-blue-600)',
                border: '1px solid var(--color-blue-200)',
              },
              icon: 'ℹ️',
            },
            loading: {
              duration: 0, // Loading toasts don't auto-dismiss
              style: {
                background: 'var(--color-primary-50)',
                color: 'var(--color-primary-600)',
                border: '1px solid var(--color-primary-200)',
              },
              icon: '⏳',
            },
          }}
        />
      </Router>
    </AppProvider>
  );
}

export default App;