import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Download, X, Instagram, ExternalLink } from 'lucide-react';
import { MaxeroLogo } from './Navbar';
import type { RouteState } from '../utils/pricingAndCatalog';

interface FooterProps {
  theme: 'light' | 'dark';
  lang: 'en' | 'ar';
  onNavigate: (route: RouteState) => void;
}

export const Footer: React.FC<FooterProps> = ({ theme, lang, onNavigate }) => {
  const [showAppPrompt, setShowAppPrompt] = useState(true);
  const [appInstalledToast, setAppInstalledToast] = useState(false);
  const isLight = theme === 'light';

  const handleNav = (e: React.MouseEvent, page: RouteState['page']) => {
    e.preventDefault();
    onNavigate({ page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`border-t transition-colors ${
        isLight
          ? 'bg-slate-900 text-slate-100 border-slate-800'
          : 'bg-[#08090C] text-slate-200 border-slate-800/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <MaxeroLogo theme="dark" />
            <p className="text-sm text-slate-300 leading-relaxed">
              {lang === 'ar'
                ? 'ماكسيرو لريادة الأعمال والتجارة — وجهتك الموثوقة لأحدث الهواتف الذكية والأجهزة الكهربائية والرحلات السياحية بأفضل الأسعار ونظام الكاش باك 50%.'
                : 'MAXERO for Entrepreneurship & Trading — Your trusted destination for the latest smartphones, laptops, home appliances, and travel packages.'}
            </p>
          </div>

          {/* Column 2: Direct Page Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              {lang === 'ar' ? 'روابط الصفحات المباشرة' : 'Direct Page Links'}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/"
                  onClick={(e) => handleNav(e, 'home')}
                  className="text-slate-300 hover:text-amber-300 transition-colors flex items-center justify-between"
                >
                  <span>{lang === 'ar' ? 'الرئيسية' : 'Home'}</span>
                  <code className="text-[11px] text-slate-400 font-mono-num">/</code>
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  onClick={(e) => handleNav(e, 'products')}
                  className="text-slate-300 hover:text-amber-300 transition-colors flex items-center justify-between"
                >
                  <span>{lang === 'ar' ? 'جميع المنتجات' : 'All Products'}</span>
                  <code className="text-[11px] text-slate-400 font-mono-num">/products</code>
                </a>
              </li>
              <li>
                <a
                  href="/exclusive-offers"
                  onClick={(e) => handleNav(e, 'exclusive-offers')}
                  className="text-slate-300 hover:text-amber-300 transition-colors flex items-center justify-between"
                >
                  <span>{lang === 'ar' ? 'العروض الحصرية للأعضاء' : 'Exclusive Offers'}</span>
                  <code className="text-[11px] text-slate-400 font-mono-num">/exclusive-offers</code>
                </a>
              </li>
              <li>
                <a
                  href="/choose-product"
                  onClick={(e) => handleNav(e, 'choose-product')}
                  className="text-slate-300 hover:text-amber-300 transition-colors flex items-center justify-between"
                >
                  <span>{lang === 'ar' ? 'اطلب منتجك الخاص' : 'Choose Custom Product'}</span>
                  <code className="text-[11px] text-slate-400 font-mono-num">/choose-product</code>
                </a>
              </li>
              <li>
                <a
                  href="/membership"
                  onClick={(e) => handleNav(e, 'membership')}
                  className="text-slate-300 hover:text-amber-300 transition-colors flex items-center justify-between"
                >
                  <span>{lang === 'ar' ? 'العضوية والكاش باك' : 'MAXERO Membership'}</span>
                  <code className="text-[11px] text-slate-400 font-mono-num">/membership</code>
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => handleNav(e, 'contact')}
                  className="text-slate-300 hover:text-amber-300 transition-colors flex items-center justify-between"
                >
                  <span>{lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}</span>
                  <code className="text-[11px] text-slate-400 font-mono-num">/contact</code>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Us (Exact details from screenshot) */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>WhatsApp: 01117562300</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>info@maxeroo.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {lang === 'ar'
                    ? 'عمارات العبور - طريق صلاح سالم - مصر الجديدة، عمارة رقم 4 - الدور السابع، بجوار رئاسة الحرس الجمهوري وأمام الجهاز المركزي للمحاسبات'
                    : 'Al Obour Buildings - Salah Salem Rd - Heliopolis, Building No. 4 - 7th Floor, Next to the Republican Guard HQ & opposite the Central Auditing Organization'}
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Follow Us & App Install */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              {lang === 'ar' ? 'تابعنا وتطبيق الموبايل' : 'Follow Us & Mobile App'}
            </h3>
            <div className="flex items-center gap-3">
              <a
                href="/contact"
                onClick={(e) => handleNav(e, 'contact')}
                aria-label="Instagram"
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-slate-200 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="/contact"
                onClick={(e) => handleNav(e, 'contact')}
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-emerald-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>

            {showAppPrompt && (
              <div className="p-3.5 rounded-xl bg-slate-800/90 border border-amber-500/30 space-y-2.5 relative">
                <button
                  type="button"
                  onClick={() => setShowAppPrompt(false)}
                  aria-label="Dismiss App Banner"
                  className="absolute top-2.5 right-2.5 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
                    <Download className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">
                      {lang === 'ar' ? 'حمل تطبيق MAXERO' : 'Download the App'}
                    </div>
                    <div className="text-[11px] text-slate-300">
                      {lang === 'ar'
                        ? 'ثبت التطبيق للوصول السريع للعروض'
                        : 'Install MAXERO on your device for quick access'}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setAppInstalledToast(true);
                    setTimeout(() => setAppInstalledToast(false), 3000);
                  }}
                  className="w-full py-1.5 px-3 rounded-lg bg-[#C9A45C] hover:bg-[#D4AF37] text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>
                    {appInstalledToast
                      ? lang === 'ar'
                        ? 'تم حفظ اختصار التطبيق بنجاح!'
                        : 'MAXERO Web App Ready!'
                      : lang === 'ar'
                      ? 'تثبيت الآن'
                      : 'Install Now'}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <a
              href="/membership"
              onClick={(e) => handleNav(e, 'membership')}
              className="hover:text-amber-300 transition-colors inline-flex items-center gap-1"
            >
              <span>{lang === 'ar' ? 'الشروط والسياسات' : 'Terms & Policies'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div>جميع الحقوق محفوظة. <a href="https://azagency.online/" target="_blank" rel="noopener noreferrer" className="hover:underline font-semibold">A.Z Agency</a> 2026 ©</div>
        </div>
      </div>

      {/* Floating WhatsApp Support Button (Bottom Left, matching reference screenshot) */}
      <a
        href="/contact"
        onClick={(e) => handleNav(e, 'contact')}
        aria-label={lang === 'ar' ? 'تواصل عبر واتساب' : 'Contact on WhatsApp'}
        className="fixed bottom-5 left-5 z-30 w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg flex items-center justify-center transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-300"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </footer>
  );
};
