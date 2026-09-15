import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pb } from '../lib/pocketbase';
import { User, UserRole } from '../types';
import { 
  RuneX, 
  RuneCheck,
  RuneAlertTriangle
} from './icons/RuneIcons';
import { HometownLogo } from './icons/HometownLogo';

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  onClose,
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const cleanEmail = email.trim();

    try {
      if (mode === 'register') {
        if (password.length < 8) {
          setError('Password must be at least 8 characters long.');
          setLoading(false);
          return;
        }

        try {
          await pb.collection('users').create({
            email: cleanEmail,
            password,
            passwordConfirm: password,
            name: name.trim() || cleanEmail.split('@')[0],
            role: 'user',
            is_pro: false,
          });

          // Authenticate immediately after registration
          const authData = await pb.collection('users').authWithPassword(cleanEmail, password);
          const user: User = {
            id: authData.record.id,
            email: authData.record.email,
            name: authData.record.name || name.trim() || cleanEmail.split('@')[0],
            role: (authData.record.role as UserRole) || 'user',
            is_pro: Boolean(authData.record.is_pro),
            avatar: authData.record.avatar,
          };
          onLoginSuccess(user);
          onClose();
        } catch (regErr: any) {
          console.error('[PocketBase Register Failed]:', regErr);
          const dataErr = regErr?.data?.data || {};
          let msg = regErr?.message || 'Failed to register account.';

          if (dataErr.email?.code === 'validation_not_unique') {
            msg = 'An account with this email address already exists. Please sign in instead.';
          } else if (dataErr.password?.message) {
            msg = dataErr.password.message;
          }

          setError(msg);
        }
      } else {
        // Mode === 'login'
        let authRecord: any = null;

        // 1. Try regular users collection
        try {
          const authData = await pb.collection('users').authWithPassword(cleanEmail, password);
          authRecord = authData?.record;
        } catch {
          // 2. Also check _superusers collection (for PocketBase admin / superuser accounts)
          try {
            const superAuth = await pb.collection('_superusers').authWithPassword(cleanEmail, password);
            if (superAuth?.record) {
              authRecord = {
                id: superAuth.record.id,
                email: superAuth.record.email,
                name: 'Dmitri Allikvee (Admin)',
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
          onClose();
          return;
        }

        // Authentication failed — strictly reject, NO mock user fallback!
        setError('Invalid email or password. Please verify your credentials or create a new account.');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Authentication error';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 4 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md bg-[#0c0d12] border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button with Tactile Feedback */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 transition-colors cursor-pointer"
        >
          <RuneX size={18} />
        </motion.button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-200">
            <HometownLogo size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-100 tracking-tight">
              {mode === 'login' ? 'Sign In to Hometown' : 'Create an Account'}
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              PocketBase Backend Authentication
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center rounded-xl bg-zinc-900 p-1 border border-zinc-800 mb-5">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(null); }}
            className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setError(null); }}
            className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              mode === 'register'
                ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Register
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Elena Rostova"
                className="w-full bg-zinc-900 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 px-3.5 py-2 rounded-xl border border-zinc-800 focus:outline-none focus:border-zinc-600 transition-colors"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full bg-zinc-900 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 px-3.5 py-2 rounded-xl border border-zinc-800 focus:outline-none focus:border-zinc-600 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-zinc-900 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 px-3.5 py-2 rounded-xl border border-zinc-800 focus:outline-none focus:border-zinc-600 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-medium text-zinc-950 bg-zinc-100 hover:bg-white active:scale-98 transition-all disabled:opacity-50 mt-2 cursor-pointer shadow-sm"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <RuneCheck size={14} />
                <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
              </>
            )}
          </button>
        </form>

      </motion.div>
    </motion.div>
  );
};
