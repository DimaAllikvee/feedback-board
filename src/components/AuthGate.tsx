import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pb } from '../lib/pocketbase';
import { User, UserRole } from '../types';
import { HometownLogo } from './icons/HometownLogo';
import { 
  RuneUser,
  RuneKanban,
  RuneZap,
  RuneMessageSquare,
  RuneMail,
  RuneLock,
  RuneArrowRight,
  RuneAlertTriangle,
  RuneGithub,
  RuneGoogle
} from './icons/RuneIcons';
import { PasswordToggle } from './ui/PasswordToggle';

interface AuthGateProps {
  onLoginSuccess: (user: User) => void;
}

export const AuthGate: React.FC<AuthGateProps> = ({ onLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    setError(null);
    setLoading(true);
    try {
      const authData = await pb.collection('users').authWithOAuth2({ provider });
      if (authData?.record) {
        const user: User = {
          id: authData.record.id,
          email: authData.record.email,
          name: authData.record.name || authData.meta?.name || authData.meta?.username || (authData.record.email?.split('@')[0]) || 'Member',
          avatar: authData.record.avatar || authData.meta?.avatarUrl,
          role: (authData.record.role as UserRole) || 'user',
          is_pro: Boolean(authData.record.is_pro),
        };
        onLoginSuccess(user);
      }
    } catch (err: any) {
      console.warn(`[PocketBase OAuth Error - ${provider}]:`, err);
      if (err?.isAbort) {
        // User closed the popup
        return;
      }
      const isMissingProvider = 
        err?.data?.data?.provider?.code === 'validation_invalid_provider' ||
        err?.message?.toLowerCase().includes('missing or is not enabled') ||
        (err?.status === 0 && !navigator.onLine === false);

      if (isMissingProvider) {
        setError(`OAuth2 provider "${provider}" is not active in PocketBase. Open PocketBase Admin -> Collections -> users -> Options -> OAuth2, enable Google, enter Client ID & Secret, and click the blue "Save changes" button.`);
      } else {
        const msg = err?.data?.message || err?.message || `Failed to authenticate with ${provider}.`;
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const cleanEmail = email.trim();

    try {
      if (mode === 'register') {
        if (!name.trim()) {
          throw new Error('Please enter your full name');
        }
        if (password.length < 8) {
          throw new Error('Password must be at least 8 characters');
        }

        try {
          await pb.collection('users').create({
            email: cleanEmail,
            password,
            passwordConfirm: password,
            name: name.trim(),
            role: 'user',
            is_pro: false,
          });
        } catch (regErr: any) {
          console.error('[PocketBase Register Error]:', regErr);
          let userMsg = 'Registration failed. Please check the form fields.';
          if (regErr?.data?.data?.email?.code === 'validation_not_unique' || regErr?.data?.data?.email?.message) {
            userMsg = 'An account with this email address already exists. Please sign in instead.';
          } else if (regErr?.data?.data?.password?.message) {
            userMsg = `Password error: ${regErr.data.data.password.message}`;
          } else if (regErr?.message) {
            userMsg = regErr.message;
          }
          
          setError(userMsg);
          return;
        }

        // Authenticate the newly created user
        try {
          const authData = await pb.collection('users').authWithPassword(cleanEmail, password);
          const user: User = {
            id: authData.record.id,
            email: authData.record.email,
            name: authData.record.name || name.trim(),
            role: (authData.record.role as UserRole) || 'user',
            is_pro: Boolean(authData.record.is_pro),
            avatar: authData.record.avatar,
          };
          onLoginSuccess(user);
          return;
        } catch {
          setError('Account was created, but initial sign-in failed. Please click Sign In.');
          return;
        }
      } else {
        // Mode: login
        let authRecord: any = null;

        // 1. Try public users collection
        try {
          const authData = await pb.collection('users').authWithPassword(cleanEmail, password);
          authRecord = authData?.record;
        } catch {
          // 2. Also check _superusers collection (for PocketBase admin / superuser accounts)
          try {
            const superAuth = await pb.collection('_superusers').authWithPassword(cleanEmail, password);
            if (superAuth?.record) {
              let publicUserId = superAuth.record.id;
              try {
                const userMatch = await pb.collection('users').getFirstListItem(`email="${superAuth.record.email}"`);
                if (userMatch) publicUserId = userMatch.id;
              } catch {
                // fallback
              }
              authRecord = {
                id: publicUserId,
                email: superAuth.record.email,
                name: 'Dmitri Allikvee',
                role: 'admin',
                is_pro: true,
              };
            }
          } catch {
            // Superuser auth also failed
          }
        }

        if (authRecord) {
          const user: User = {
            id: authRecord.id,
            email: authRecord.email,
            name: authRecord.name || authRecord.email?.split('@')[0] || 'Member',
            role: (authRecord.role as UserRole) || 'user',
            is_pro: Boolean(authRecord.is_pro),
            avatar: authRecord.avatar,
          };
          onLoginSuccess(user);
          return;
        }

        // Authentication failed — strictly reject, NO mock user!
        setError('Invalid email or password. Please verify your credentials or create a new account.');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Authentication failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full flex-1 flex flex-col items-center justify-center py-10 sm:py-16 px-4 sm:px-6">
      
      {/* Background Ambient Radial Glow & Texture (Cal.com / KeenThemes pattern) */}
      <div 
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="h-[450px] w-[600px] max-w-full rounded-full bg-indigo-500/5 blur-[120px]" />
        <div className="absolute top-1/4 h-[300px] w-[400px] rounded-full bg-zinc-700/5 blur-[90px]" />
      </div>

      {/* Brand Header */}
      <motion.div 
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-lg mb-8"
      >
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-100 shadow-xl mb-4 hover:border-zinc-700 transition-colors">
          <HometownLogo size={24} />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
          Sign in to Hometown
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed max-w-sm mx-auto">
          Explore product milestones, cast priority votes, and collaborate on new features.
        </p>
      </motion.div>

      {/* Main Authentication Card (coss.com / shadcn / reui inspired) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[440px] bg-[#0c0d12]/90 backdrop-blur-2xl border border-zinc-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
      >
        {/* Emil Kowalski Sliding Tab Switcher */}
        <div className="flex rounded-xl bg-zinc-900/90 p-1 border border-zinc-800/80 mb-6">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(null); }}
            className={`relative flex-1 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer select-none ${
              mode === 'login' ? 'text-zinc-100 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {mode === 'login' && (
              <motion.span
                layoutId="activeAuthGateTab"
                className="absolute inset-0 rounded-lg bg-zinc-800 border border-zinc-700/80 shadow-sm"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative z-10">Sign In</span>
          </button>
          
          <button
            type="button"
            onClick={() => { setMode('register'); setError(null); }}
            className={`relative flex-1 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer select-none ${
              mode === 'register' ? 'text-zinc-100 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {mode === 'register' && (
              <motion.span
                layoutId="activeAuthGateTab"
                className="absolute inset-0 rounded-lg bg-zinc-800 border border-zinc-700/80 shadow-sm"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative z-10">Create Account</span>
          </button>
        </div>

        {/* Error Alert */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -4 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -4 }}
              transition={{ duration: 0.14 }}
              role="alert"
              className="p-3.5 mb-5 rounded-xl bg-rose-950/70 border border-rose-500/40 text-rose-200 text-xs leading-relaxed overflow-hidden"
            >
              <div className="flex items-start gap-2.5">
                <RuneAlertTriangle size={16} className="text-rose-400 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-rose-200">{error}</p>
                  
                  {/* Mode switch helper if not registered */}
                  {mode === 'login' && (
                    <p className="text-[11px] text-zinc-400 mt-1">
                      Don't have an account yet?{' '}
                      <button
                        type="button"
                        onClick={() => { setMode('register'); setError(null); }}
                        className="text-rose-300 hover:text-white font-medium underline underline-offset-2 cursor-pointer"
                      >
                        Create an account here
                      </button>
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Social OAuth Sign In (Google & GitHub) */}
        <div className="space-y-3 mb-5">
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              disabled={loading}
              onClick={() => handleOAuthLogin('github')}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-xs font-medium text-zinc-200 transition-all cursor-pointer active:scale-98 disabled:opacity-50"
            >
              <RuneGithub size={15} />
              <span>GitHub</span>
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => handleOAuthLogin('google')}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-xs font-medium text-zinc-200 transition-all cursor-pointer active:scale-98 disabled:opacity-50"
            >
              <RuneGoogle size={15} />
              <span>Google</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-zinc-800/80" />
            <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">or with email</span>
            <div className="flex-1 h-px bg-zinc-800/80" />
          </div>
        </div>

        {/* Form Elements with Design System Checklist compliance */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label htmlFor="auth-name" className="block text-xs font-medium text-zinc-300 mb-1.5">
                Full Name
              </label>
              <div className="relative flex items-center">
                <RuneUser size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                <input
                  id="auth-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Vance"
                  className="w-full bg-zinc-900/80 text-xs text-zinc-100 placeholder-zinc-500 pl-10 pr-3.5 py-2.5 rounded-xl border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400/30 focus:border-zinc-500 transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="auth-email" className="block text-xs font-medium text-zinc-300 mb-1.5">
              Email Address
            </label>
            <div className="relative flex items-center">
              <RuneMail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
              <input
                id="auth-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-zinc-900/80 text-xs text-zinc-100 placeholder-zinc-500 pl-10 pr-3.5 py-2.5 rounded-xl border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400/30 focus:border-zinc-500 transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="auth-password" className="text-xs font-medium text-zinc-300">
                Password
              </label>
              <span className="text-[10px] text-zinc-500">Min. 8 characters</span>
            </div>
            <div className="relative flex items-center">
              <RuneLock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
              <input
                id="auth-password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-zinc-900/80 text-xs text-zinc-100 placeholder-zinc-500 pl-10 pr-10 py-2.5 rounded-xl border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400/30 focus:border-zinc-500 transition-all"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                <PasswordToggle
                  isVisible={showPassword}
                  onToggle={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-zinc-950 bg-zinc-100 hover:bg-white transition-[background-color,transform] duration-100 cursor-pointer disabled:opacity-50 select-none shadow-sm flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-3.5 h-3.5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                <span>Verifying with Database...</span>
              </div>
            ) : (
              <>
                <span>{mode === 'login' ? 'Sign In to Board' : 'Create Account'}</span>
                <RuneArrowRight size={14} />
              </>
            )}
          </motion.button>
        </form>

      </motion.div>

      {/* Feature Highlights Underneath (Concentric Radius & Calm Palette) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl w-full mt-8"
      >
        <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/60 text-center">
          <div className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 mb-2">
            <RuneKanban size={15} />
          </div>
          <h3 className="text-xs font-semibold text-zinc-200">Kanban Roadmap</h3>
          <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
            Follow engineering milestones from Review to Shipped in real-time.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/60 text-center">
          <div className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 mb-2">
            <RuneZap size={15} />
          </div>
          <h3 className="text-xs font-semibold text-zinc-200">Priority Upvoting</h3>
          <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
            Influence roadmap priority with community voting and supporter weight.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/60 text-center">
          <div className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 mb-2">
            <RuneMessageSquare size={15} />
          </div>
          <h3 className="text-xs font-semibold text-zinc-200">Community Debates</h3>
          <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
            Discuss technical trade-offs and react with semantic vector icons.
          </p>
        </div>
      </motion.div>

    </div>
  );
};

export default AuthGate;
