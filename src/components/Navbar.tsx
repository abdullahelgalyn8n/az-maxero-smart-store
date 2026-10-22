import React, { useState } from 'react';
import {
  ShoppingCart,
  Globe,
  Sun,
  Moon,
  Crown,
  ShoppingBag,
  Menu,
  X,
  Link2,
  Check,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { buildUrlFromRoute, type RouteState } from '../utils/pricingAndCatalog';

interface NavbarProps {
  currentRoute: RouteState;
  onNavigate: (route: RouteState) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  lang: 'en' | 'ar';
  onToggleLang: () => void;
  cartCount: number;
  onOpenCart: () => void;
  isMember: boolean;
  memberName: string | null;
  onOpenLogin: () => void;
  onToggleDemoMember: () => void;
}

export const MaxeroLogo: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => (
  <div className="flex items-center gap-2.5 select-none">
    <div
      className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
        theme === 'light'
          ? 'bg-slate-900 border-amber-600/50 shadow-sm'
          : 'bg-slate-900/90 border-amber-500/40'
      }`}
    >
      <svg viewBox="0 0 40 40" className="w-7 h-7" aria-hidden="true">
        <defs>
          <linearGradient id="maxeroGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#9A6700" />
          </linearGradient>
          <linearGradient id="maxeroTeal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
        </defs>
        <path
          d="M20 4 C13 10, 9 18, 14 26 C16 29, 20 31, 20 31 C20 31, 28 27, 29 19 C30 12, 24 7, 20 4 Z"
          fill="url(#maxeroGold)"
        />
        <path
          d="M15 16 C12 21, 14 27, 20 30 C18 25, 18 20, 23 15 C20 14, 17 14, 15 16 Z"
          fill="url(#maxeroTeal)"
        />
      </svg>
    </div>
    <div className="flex flex-col">
      <span
        className={`font-display text-lg font-extrabold tracking-wider leading-none ${
          theme === 'light' ? 'text-slate-900' : 'text-white'
        }`}
      >
        MAX<span className={theme === 'light' ? 'text-amber-700' : 'text-amber-400'}>ERO</span>
      </span>
      <span
        className={`hidden sm:block text-[10px] font-semibold tracking-tight leading-tight ${
          theme === 'light' ? 'text-slate-600' : 'text-slate-400'
        }`}
      >
        ENTREPRENEURSHIP &amp; TRADING
      </span>
    </div>
  </div>
);

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  theme,
  onToggleTheme,
  lang,
  onToggleLang,
  cartCount,
  onOpenCart,
  isMember,
  memberName,
  onOpenLogin,
  onToggleDemoMember,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const navItems: {
    id: RouteState['page'];
    labelEn: string;
    labelAr: string;
    href: string;
    icon?: 'crown' | 'bag';
  }[] = [
    { id: 'home', labelEn: 'Home', labelAr: 'الرئيسية', href: '/' },
    { id: 'products', labelEn: 'Products', labelAr: 'المنتجات', href: '/products' },
    {
      id: 'exclusive-offers',
      labelEn: 'Exclusive Offers',
      labelAr: 'العروض الحصرية',
      href: '/exclusive-offers',
      icon: 'crown',
    },
    {
      id: 'choose-product',
      labelEn: 'Choose Product',
      labelAr: 'اختر منتجك',
      href: '/choose-product',
      icon: 'bag',
    },
    { id: 'membership', labelEn: 'Membership', labelAr: 'العضوية', href: '/membership' },
    { id: 'contact', labelEn: 'Contact', labelAr: 'تواصل معنا', href: '/contact' },
  ];

  const currentPath = buildUrlFromRoute(currentRoute);
  const fullDisplayUrl = `https://maxeroo.com${currentPath}`;

  const handleCopyUrl = () => {
    const shareUrl = `${window.location.origin}${currentPath}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl).catch(() => {});
    }
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleLinkClick = (e: React.MouseEvent, page: RouteState['page']) => {
    e.preventDefault();
    onNavigate({ page });
    setMobileMenuOpen(false);
  };

  const isLight = theme === 'light';

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
        isLight
          ? 'bg-white/95 border-slate-300 text-slate-900 shadow-xs'
          : 'bg-[#0B0C10]/95 border-slate-800 text-slate-100'
      }`}
    >
      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, 'home')}
          className="shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg"
          aria-label="MAXERO Home"
        >
          <MaxeroLogo theme={theme} />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive =
              currentRoute.page === item.id ||
              (item.id === 'products' && currentRoute.page === 'product-detail');

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.id)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? isLight
                      ? 'bg-amber-100 text-amber-950 border border-amber-400/70'
                      : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                    : isLight
                    ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                {item.icon === 'crown' && (
                  <Crown
                    className={`w-3.5 h-3.5 ${
                      isLight ? 'text-amber-700' : 'text-amber-400'
                    }`}
                  />
                )}
                {item.icon === 'bag' && (
                  <ShoppingBag
                    className={`w-3.5 h-3.5 ${
                      isLight ? 'text-amber-700' : 'text-amber-400'
                    }`}
                  />
                )}
                <span>{lang === 'ar' ? item.labelAr : item.labelEn}</span>
              </a>
            );
          })}
        </nav>

        {/* Actions Zone */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Shopping Cart Button */}
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={lang === 'ar' ? 'سلة التسوق' : 'Shopping Cart'}
            className={`relative p-2 rounded-lg border transition-colors ${
              isLight
                ? 'bg-slate-100 border-slate-300 text-slate-900 hover:bg-slate-200'
                : 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {cartCount > 0 && (
              <span
                data-testid="cart-badge"
                className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-amber-600 text-white text-[11px] font-bold flex items-center justify-center tabular-nums shadow-xs"
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Theme Switcher (White Mode vs Dark Mode with explicit contrast fix) */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={
              isLight
                ? lang === 'ar'
                  ? 'التبديل للوضع الليلي'
                  : 'Switch to Dark Mode'
                : lang === 'ar'
                ? 'التبديل للوضع النهاري'
                : 'Switch to Light Mode'
            }
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              isLight
                ? 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800'
                : 'bg-slate-800 text-amber-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            {isLight ? (
              <>
                <Moon className="w-3.5 h-3.5 text-amber-300" />
                <span className="hidden sm:inline">{lang === 'ar' ? 'الوضع الليلي' : 'Dark'}</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">{lang === 'ar' ? 'الوضع النهاري' : 'Light'}</span>
              </>
            )}
          </button>

          {/* Language Switcher */}
          <button
            type="button"
            onClick={onToggleLang}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              isLight
                ? 'bg-slate-100 border-slate-300 text-slate-900 hover:bg-slate-200'
                : 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'EN' : 'العربية'}</span>
          </button>

          {/* Login / Member Indicator */}
          <button
            type="button"
            onClick={onOpenLogin}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
              isMember
                ? isLight
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-400'
                  : 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60'
                : isLight
                ? 'text-slate-800 hover:bg-slate-100 border border-slate-300'
                : 'text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {isMember ? (
              <>
                <UserCheck className="w-3.5 h-3.5" />
                <span>{memberName || (lang === 'ar' ? 'عضو نشط' : 'Member Active')}</span>
              </>
            ) : (
              <span>{lang === 'ar' ? 'تسجيل الدخول' : 'Login'}</span>
            )}
          </button>

          {/* Primary Subscribe Button */}
          <a
            href="/membership"
            onClick={(e) => handleLinkClick(e, 'membership')}
            className={`hidden sm:inline-flex px-3.5 py-2 rounded-lg text-xs font-extrabold transition-colors whitespace-nowrap shadow-xs ${
              isLight
                ? 'bg-amber-700 hover:bg-amber-800 text-white'
                : 'bg-[#C9A45C] hover:bg-[#D4AF37] text-slate-950'
            }`}
          >
            {lang === 'ar' ? 'اشترك الآن' : 'Subscribe'}
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={lang === 'ar' ? 'القائمة' : 'Toggle Menu'}
            className={`lg:hidden p-2 rounded-lg border ${
              isLight
                ? 'border-slate-300 text-slate-900 hover:bg-slate-100'
                : 'border-slate-700 text-slate-200 hover:bg-slate-800'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Dedicated Route / URL Bar & Member Preview Toggle */}
      <div
        className={`border-t text-xs transition-colors ${
          isLight
            ? 'bg-slate-100 border-slate-200 text-slate-700'
            : 'bg-[#12141D] border-slate-800/80 text-slate-300'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2">
          {/* Active Page Dedicated URL */}
          <div className="flex items-center gap-2 min-w-0">
            <span
              className={`font-semibold whitespace-nowrap ${
                isLight ? 'text-slate-600' : 'text-slate-400'
              }`}
            >
              {lang === 'ar' ? 'رابط الصفحة:' : 'Page URL:'}
            </span>
            <code
              data-testid="active-page-url"
              dir="ltr"
              className={`px-2 py-0.5 rounded font-mono-num text-[11px] font-semibold truncate border ${
                isLight
                  ? 'bg-white text-slate-900 border-slate-300'
                  : 'bg-slate-900 text-amber-300 border-slate-700'
              }`}
            >
              {fullDisplayUrl}
            </code>
            <button
              type="button"
              onClick={handleCopyUrl}
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold border transition-colors whitespace-nowrap ${
                isLight
                  ? 'bg-white hover:bg-slate-200 text-slate-800 border-slate-300'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
            >
              {copiedUrl ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span>{lang === 'ar' ? 'تم النسخ' : 'Copied'}</span>
                </>
              ) : (
                <>
                  <Link2 className="w-3 h-3" />
                  <span>{lang === 'ar' ? 'نسخ الرابط' : 'Copy Link'}</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Member Status Switcher for Testing Exclusive Offers & Member Prices */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleDemoMember}
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded font-bold text-[11px] border transition-colors ${
                isMember
                  ? isLight
                    ? 'bg-emerald-700 text-white border-emerald-800'
                    : 'bg-emerald-600/20 text-emerald-300 border-emerald-500/40'
                  : isLight
                  ? 'bg-amber-100 text-amber-950 border-amber-400 hover:bg-amber-200'
                  : 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>
                {isMember
                  ? lang === 'ar'
                    ? 'وضع العضو مفعل (خصم 5% + العروض الحصرية مفتوحة)'
                    : 'Member Mode: ON (5% Off & VIP Offers Unlocked)'
                  : lang === 'ar'
                  ? 'تفعيل معاينة حساب عضو (فتح العروض الحصرية)'
                  : 'Preview as Active Member (Unlock VIP Offers)'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-t px-4 py-3 space-y-1 ${
            isLight ? 'bg-white border-slate-200' : 'bg-[#0E1017] border-slate-800'
          }`}
        >
          {navItems.map((item) => {
            const isActive = currentRoute.page === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.id)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-bold ${
                  isActive
                    ? isLight
                      ? 'bg-amber-100 text-amber-950'
                      : 'bg-amber-500/20 text-amber-300'
                    : isLight
                    ? 'text-slate-800 hover:bg-slate-100'
                    : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                {lang === 'ar' ? item.labelAr : item.labelEn}
              </a>
            );
          })}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin();
              }}
              className={`w-full py-2 rounded-lg text-xs font-bold border ${
                isLight
                  ? 'bg-slate-100 text-slate-900 border-slate-300'
                  : 'bg-slate-800 text-white border-slate-700'
              }`}
            >
              {isMember
                ? lang === 'ar'
                  ? 'حساب العضو النشط'
                  : 'Member Account'
                : lang === 'ar'
                ? 'تسجيل الدخول'
                : 'Login'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
