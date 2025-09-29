import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from './AppContext';
import LandingPage from './pages/LandingPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './index.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
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
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;