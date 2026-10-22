import React, { useState } from 'react';
import { X, ShieldCheck, Lock } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
  lang: 'en' | 'ar';
  onLoginSuccess: (name: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  theme,
  lang,
  onLoginSuccess,
}) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const isLight = theme === 'light';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      setError(
        lang === 'ar'
          ? 'يرجى إدخال رقم الهاتف أو البريد الإلكتروني وكلمة المرور.'
          : 'Please enter your phone/email and password.'
      );
      return;
    }
    setError('');
    onLoginSuccess(identifier.split('@')[0]);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Member Login"
    >
      <div
        className={`w-full max-w-md rounded-3xl border p-6 sm:p-8 space-y-5 shadow-2xl ${
          isLight
            ? 'bg-white border-slate-300 text-slate-950'
            : 'bg-[#12141C] border-slate-800 text-white'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className={`w-5 h-5 ${isLight ? 'text-amber-800' : 'text-[#D4AF37]'}`} />
            <h2 className="font-display text-xl font-extrabold">
              {lang === 'ar' ? 'تسجيل دخول الأعضاء' : 'MAXERO Member Login'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Login Modal"
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-100 border border-red-400 text-red-950 text-xs font-bold">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="login-id"
              className={`block text-xs font-bold mb-1 ${
                isLight ? 'text-slate-800' : 'text-slate-300'
              }`}
            >
              {lang === 'ar' ? 'رقم الهاتف أو البريد الإلكتروني' : 'Phone Number or Email'}
            </label>
            <input
              id="login-id"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="member@maxeroo.com / 01117562300"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium ${
                isLight
                  ? 'bg-slate-50 border-slate-300 text-slate-950'
                  : 'bg-[#181B26] border-slate-700 text-white'
              }`}
            />
          </div>

          <div>
            <label
              htmlFor="login-pass"
              className={`block text-xs font-bold mb-1 ${
                isLight ? 'text-slate-800' : 'text-slate-300'
              }`}
            >
              {lang === 'ar' ? 'كلمة المرور' : 'Password'}
            </label>
            <input
              id="login-pass"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium ${
                isLight
                  ? 'bg-slate-50 border-slate-300 text-slate-950'
                  : 'bg-[#181B26] border-slate-700 text-white'
              }`}
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-xl text-xs font-extrabold transition-colors ${
              isLight
                ? 'bg-amber-700 hover:bg-amber-800 text-white'
                : 'bg-[#C9A45C] hover:bg-[#D4AF37] text-slate-950'
            }`}
          >
            {lang === 'ar' ? 'دخول وتفعيل مزايا العضو' : 'Sign In & Unlock Member Benefits'}
          </button>
        </form>

        <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => {
              onLoginSuccess('VIP Member');
              onClose();
            }}
            className={`w-full py-2.5 px-4 rounded-xl border text-xs font-extrabold inline-flex items-center justify-center gap-2 ${
              isLight
                ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-400'
                : 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border-emerald-500/40'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>
              {lang === 'ar'
                ? 'دخول سريع بحساب عضو تجريبي (فتح العروض الحصرية)'
                : 'Quick Demo Member Login (Unlock Exclusive Offers)'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
