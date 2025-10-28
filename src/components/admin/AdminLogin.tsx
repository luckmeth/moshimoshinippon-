import { useState } from 'react';
import { Shield, Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Pre-configured admin credentials
  // In production, these should be stored securely in environment variables
  const ADMIN_CREDENTIALS = [
    { email: 'admin@moshimoshinippon.com', password: 'MoshiMoshi@2024!' },
    { email: 'methullakvindu5@gmail.com', password: 'Admin@123456' },
    // Add more admin users as needed
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate a slight delay for security
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check credentials
    const isValid = ADMIN_CREDENTIALS.some(
      cred => cred.email === email && cred.password === password
    );

    setLoading(false);

    if (isValid) {
      // Store admin session (expires in 24 hours)
      const sessionData = {
        email: email,
        loginTime: new Date().getTime(),
        expiresIn: 24 * 60 * 60 * 1000 // 24 hours
      };
      sessionStorage.setItem('adminSession', JSON.stringify(sessionData));
      onLoginSuccess();
    } else {
      setError('Invalid email or password');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
      </div>

      <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border-4 border-red-600">
        <div className="text-center mb-8">
          <div className="bg-red-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="text-white" size={40} />
          </div>
          <h1 className="text-3xl font-bold text-black mb-2">Admin Login</h1>
          <p className="text-gray-600">Moshi Moshi Nippon</p>
          <p className="text-sm text-gray-500 mt-2">もしもし にっぽん</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              <Mail className="inline mr-2" size={16} />
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none transition-colors"
              placeholder="admin@example.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              <Lock className="inline mr-2" size={16} />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none transition-colors pr-12"
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <Shield size={20} />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-gray-600 hover:text-red-600 transition-colors text-sm font-medium"
          >
            ← Back to Website
          </a>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-600 text-center">
            🔒 Secure admin access · Session expires in 24 hours
          </p>
        </div>
      </div>
    </div>
  );
}

// Session validation function
export function isAdminAuthenticated(): boolean {
  const sessionData = sessionStorage.getItem('adminSession');
  
  if (!sessionData) return false;
  
  try {
    const session = JSON.parse(sessionData);
    const currentTime = new Date().getTime();
    const sessionExpiry = session.loginTime + session.expiresIn;
    
    if (currentTime > sessionExpiry) {
      sessionStorage.removeItem('adminSession');
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
}

// Logout function
export function adminLogout(): void {
  sessionStorage.removeItem('adminSession');
  window.location.href = '/';
}