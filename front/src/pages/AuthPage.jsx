import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import useToastStore from "../store/toastStore";
import { useAuth } from "../context/AuthContext";

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userType, setUserType] = useState('user');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const addToast = useToastStore((s) => s.addToast);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((!isLogin && !formData.name) || !formData.email || !formData.password) {
      addToast("Please fill in all required fields", "error");
      return;
    }
    
    if (isLogin) {
      if (userType === 'admin') {
        const success = login(formData.email, formData.password);
        if (success) {
          addToast("Admin signed in successfully!", "success");
          navigate('/admin/dashboard');
        } else {
          addToast("Invalid admin credentials", "error");
        }
      } else {
        addToast("Signed in successfully!", "success");
        navigate('/');
      }
    } else {
      addToast("Account created successfully!", "success");
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-manrope">
      {/* LEFT SIDE (40%) */}
      <div className="lg:w-[40%] relative hidden lg:flex flex-col justify-center px-12 xl:px-16 overflow-hidden">
        {/* Background Image & Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/images/gym-bag.webp")' }}
        />
        <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/80 to-transparent" />
        
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="inline-block">
              <h1 className="text-[48px] xl:text-[56px] font-extrabold text-white tracking-tight leading-none mb-6">
                FITZONE
              </h1>
            </Link>
            <p className="text-body-lg xl:text-h3 text-white/90 max-w-md leading-relaxed font-medium">
              Transform your body, elevate your lifestyle. Join our premium fitness community today.
            </p>
          </motion.div>
        </div>
      </div>

      {/* RIGHT SIDE (60%) */}
      <div className="flex-1 lg:w-[60%] bg-[#f8f9fa] flex items-center justify-center px-6 py-12 lg:py-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[420px]"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-10">
            <Link to="/" className="text-[40px] font-extrabold text-gray-900 tracking-tight">
              FITZONE
            </Link>
          </div>

          <h2 className="text-[32px] font-bold text-gray-800 leading-tight">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-body-md text-gray-500 mt-2 mb-8">
            {isLogin ? "Sign in to access your fitness journey" : "Join our exclusive community of fitness enthusiasts"}
          </p>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button className="flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-lg py-2.5 text-body-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-lg py-2.5 text-body-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Apple
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              {isLogin ? "Or sign in with email" : "Or continue with email"}
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {isLogin && (
              <div className="flex p-1 bg-gray-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => setUserType('user')}
                  className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${userType === 'user' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  User
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('admin')}
                  className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${userType === 'admin' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Admin
                </button>
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="text-body-sm font-semibold text-gray-700 mb-1.5 block">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#f3f4f6] border border-transparent rounded-lg px-4 py-3 text-body-md text-gray-900 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm"
                  placeholder="Alex Morgan"
                />
              </div>
            )}

            <div>
              <label className="text-body-sm font-semibold text-gray-700 mb-1.5 block">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#f3f4f6] border border-transparent rounded-lg px-4 py-3 text-body-md text-gray-900 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm"
                placeholder="alex@luxe.com"
              />
            </div>

            <div>
              <label className="text-body-sm font-semibold text-gray-700 mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-[#f3f4f6] border border-transparent rounded-lg px-4 py-3 pr-12 text-body-md text-gray-900 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm"
                  placeholder="Min. 8 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end -mt-2">
                <button type="button" className="text-body-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#5558e6] hover:to-[#7c4dec] text-white font-semibold py-3.5 rounded-lg transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 mt-2"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-body-sm text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setIsLogin(!isLogin)} 
                className="text-blue-600 font-semibold hover:underline"
              >
                {isLogin ? "Create an account" : "Sign in"}
              </button>
            </p>
            
            {!isLogin && (
              <p className="text-[12px] text-gray-400 mt-6 leading-relaxed max-w-xs mx-auto">
                By creating an account, you agree to FITZONE's{" "}
                <a href="#" className="underline hover:text-gray-600 transition-colors">Terms of Service</a> and{" "}
                <a href="#" className="underline hover:text-gray-600 transition-colors">Privacy Policy</a>
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
