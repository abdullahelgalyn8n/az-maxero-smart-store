import React, { useState } from 'react';
import {
  ShoppingBag,
  ArrowRight,
  Eye,
  Users,
  Crown,
  Smartphone,
  Laptop,
  Zap,
  Moon,
  Star,
  Plane,
  Globe,
  Check,
  AlertTriangle,
  RotateCcw,
  Gift,
} from 'lucide-react';
import { HOME_PRODUCT_CATEGORIES, PRODUCTS_CATALOG } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import type { CategoryId, ProductItem, RouteState } from '../utils/pricingAndCatalog';

interface HomePageProps {
  theme: 'light' | 'dark';
  lang: 'en' | 'ar';
  onNavigate: (route: RouteState) => void;
  onAddToCart: (product: ProductItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  theme,
  lang,
  onNavigate,
  onAddToCart,
}) => {
  const [featuredTab, setFeaturedTab] = useState<'all' | 'mobiles' | 'tech' | 'travel'>('all');
  const isLight = theme === 'light';

  const renderCategoryIcon = (iconName: string) => {
    const cls = `w-6 h-6 ${isLight ? 'text-amber-800' : 'text-[#D4AF37]'}`;
    switch (iconName) {
      case 'iphone':
      case 'smartphone':
        return <Smartphone className={cls} />;
      case 'laptop':
        return <Laptop className={cls} />;
      case 'zap':
        return <Zap className={cls} />;
      case 'moon':
        return <Moon className={cls} />;
      case 'star':
        return <Star className={cls} />;
      case 'plane':
        return <Plane className={cls} />;
      case 'globe':
        return <Globe className={cls} />;
      case 'shopping-bag':
      default:
        return <ShoppingBag className={cls} />;
    }
  };

  const featuredProducts = PRODUCTS_CATALOG.filter((p) => {
    if (featuredTab === 'mobiles') return p.category === 'iphone' || p.category === 'smartphones';
    if (featuredTab === 'tech') return p.category === 'laptops' || p.category === 'electronics';
    if (featuredTab === 'travel')
      return (
        p.category === 'umrah' ||
        p.category === 'hajj' ||
        p.category === 'domestic' ||
        p.category === 'international'
      );
    return p.featured;
  }).slice(0, 8);

  const handleCategoryClick = (catId: string) => {
    if (catId === 'custom') {
      onNavigate({ page: 'choose-product' });
    } else {
      onNavigate({ page: 'products', categoryFilter: catId as CategoryId });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-0">
      {/* 1. HERO SECTION (High Contrast in both Light Mode & Dark Mode) */}
      <section
        className={`relative overflow-hidden border-b transition-colors ${
          isLight
            ? 'bg-gradient-to-b from-amber-50/70 via-white to-slate-50 border-slate-200'
            : 'bg-gradient-to-b from-[#14120E] via-[#0B0C10] to-[#0B0C10] border-slate-800'
        }`}
      >
        {/* Subtle Architectural Background Accent */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-15"
        >
          <div
            className={`w-[620px] h-[320px] rounded-full blur-3xl ${
              isLight ? 'bg-amber-300/60' : 'bg-amber-500/25'
            }`}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
          <p
            className={`text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-3 ${
              isLight ? 'text-amber-900' : 'text-[#D4AF37]'
            }`}
          >
            {lang === 'ar'
              ? 'ماكسيرو لريادة الأعمال والتجارة'
              : 'MAXERO for Entrepreneurship & Trading'}
          </p>

          <h1
            className={`font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.12] ${
              isLight ? 'text-slate-950' : 'text-[#E5C888]'
            }`}
            style={{ textWrap: 'balance' }}
          >
            {lang === 'ar' ? 'حلول ذكية، بلا حدود.' : 'Smart Solutions, No Limits.'}
          </h1>

          <p
            className={`mt-4 text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}
          >
            {lang === 'ar'
              ? 'وجهتك الموثوقة لأحدث الهواتف الذكية والأجهزة الإلكترونية والرحلات بأفضل الأسعار ونظام استرداد نقدي (كاش باك) يصل إلى 50%.'
              : 'Your trusted destination for the latest smartphones and electronics at the best prices'}
          </p>

          {/* Hero Primary & Secondary CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/products"
              onClick={(e) => {
                e.preventDefault();
                onNavigate({ page: 'products' });
              }}
              className={`px-7 py-3.5 rounded-xl text-sm font-extrabold inline-flex items-center gap-2 transition-all shadow-sm ${
                isLight
                  ? 'bg-amber-700 hover:bg-amber-800 text-white'
                  : 'bg-[#C9A45C] hover:bg-[#D4AF37] text-slate-950'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{lang === 'ar' ? 'تسوق الآن' : 'Shop Now'}</span>
            </a>

            <a
              href="/membership"
              onClick={(e) => {
                e.preventDefault();
                onNavigate({ page: 'membership' });
              }}
              className={`px-7 py-3.5 rounded-xl text-sm font-extrabold inline-flex items-center gap-2 border-2 transition-all ${
                isLight
                  ? 'bg-white hover:bg-amber-50 text-amber-900 border-amber-700'
                  : 'bg-transparent hover:bg-amber-500/10 text-[#D4AF37] border-[#C9A45C]/60'
              }`}
            >
              <span>{lang === 'ar' ? 'اشترك في العضوية' : 'Join Membership'}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Live Visitors & Members Counters */}
          <div className="mt-12 inline-flex flex-wrap items-center justify-center gap-8 sm:gap-14 px-8 py-4 rounded-2xl border backdrop-blur-xs bg-white/80 dark:bg-slate-900/50 border-slate-300 dark:border-slate-800">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <Eye className={`w-4 h-4 ${isLight ? 'text-amber-800' : 'text-[#D4AF37]'}`} />
                <span
                  className={`font-mono-num text-2xl sm:text-3xl font-extrabold ${
                    isLight ? 'text-amber-900' : 'text-[#E5C158]'
                  }`}
                >
                  23,645+
                </span>
              </div>
              <div
                className={`text-xs font-bold mt-0.5 ${
                  isLight ? 'text-slate-700' : 'text-slate-400'
                }`}
              >
                {lang === 'ar' ? 'زائر للموقع' : 'Visitors'}
              </div>
            </div>

            <div
              className={`h-10 w-px hidden sm:block ${
                isLight ? 'bg-slate-300' : 'bg-slate-800'
              }`}
            />

            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <Users className={`w-4 h-4 ${isLight ? 'text-sky-700' : 'text-sky-400'}`} />
                <span
                  className={`font-mono-num text-2xl sm:text-3xl font-extrabold ${
                    isLight ? 'text-sky-800' : 'text-sky-400'
                  }`}
                >
                  16,459+
                </span>
              </div>
              <div
                className={`text-xs font-bold mt-0.5 ${
                  isLight ? 'text-slate-700' : 'text-slate-400'
                }`}
              >
                {lang === 'ar' ? 'عضو مشترك' : 'Members'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CASHBACK ANNOUNCEMENT RIBBON & EXCLUSIVE DEALS BANNER */}
      <div
        className={`py-2.5 px-4 text-center text-xs sm:text-sm font-extrabold border-b ${
          isLight
            ? 'bg-amber-200 text-slate-950 border-amber-300'
            : 'bg-[#C9A45C] text-slate-950 border-amber-500/40'
        }`}
      >
        {lang === 'ar'
          ? 'يحصل الأعضاء على استرداد نقدي (كاش باك) يصل إلى 50% على منتجات مختارة!'
          : 'Members get up to 50% cashback on selected products!'}
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
        <a
          href="/exclusive-offers"
          onClick={(e) => {
            e.preventDefault();
            onNavigate({ page: 'exclusive-offers' });
          }}
          className={`w-full p-4 sm:px-6 rounded-xl border flex items-center justify-between gap-4 transition-all ${
            isLight
              ? 'bg-amber-50 hover:bg-amber-100/80 border-amber-400 text-slate-950 shadow-2xs'
              : 'bg-[#C9A45C] hover:bg-[#D4AF37] border-amber-400 text-slate-950'
          }`}
        >
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-10 h-10 rounded-lg bg-slate-950/10 flex items-center justify-center shrink-0">
              <Crown className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-slate-950">
                {lang === 'ar'
                  ? 'يستمتع الأعضاء بعروض حصرية الآن!'
                  : 'Members are enjoying exclusive deals right now!'}
              </div>
              <div className="text-xs font-semibold text-slate-800">
                {lang === 'ar'
                  ? 'حتى 50% كاش باك وخصم فوري 5% على جميع المنتجات — اشترك واستفد الآن'
                  : 'Up to 50% cashback and 5% discount on all products - Subscribe & benefit'}
              </div>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-950 shrink-0" />
        </a>
      </div>

      {/* 3. OUR PRODUCTS (9 CATEGORIES EXPLORER) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center mb-10">
          <h2
            className={`font-display text-3xl sm:text-4xl font-extrabold tracking-tight ${
              isLight ? 'text-slate-950' : 'text-[#E5C888]'
            }`}
          >
            {lang === 'ar' ? 'أقسام المنتجات' : 'Our Products'}
          </h2>
          <p className={`mt-2 text-sm font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            {lang === 'ar'
              ? 'استكشف مجموعتنا الواسعة من المنتجات والرحلات'
              : 'Explore our wide range of products'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {HOME_PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryClick(cat.id)}
              className={`group relative p-6 rounded-2xl border text-center transition-all flex flex-col items-center justify-center min-h-[168px] ${
                isLight
                  ? 'bg-white hover:bg-amber-50/50 border-slate-300 hover:border-amber-600 shadow-xs hover:shadow-md'
                  : 'bg-[#12141C] hover:bg-[#171A24] border-slate-800 hover:border-amber-500/40'
              }`}
            >
              {cat.badge && (
                <span
                  className={`absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold border ${
                    isLight
                      ? 'bg-amber-100 text-amber-900 border-amber-400'
                      : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                  }`}
                >
                  {lang === 'ar' ? cat.badgeAr : cat.badge}
                </span>
              )}

              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3.5 transition-transform group-hover:scale-105 ${
                  isLight
                    ? 'bg-amber-100/90 border border-amber-300'
                    : 'bg-[#C9A45C]/15 border border-[#C9A45C]/30'
                }`}
              >
                {renderCategoryIcon(cat.iconName)}
              </div>

              <h3
                className={`text-base font-extrabold tracking-tight ${
                  isLight ? 'text-slate-950' : 'text-white'
                }`}
              >
                {lang === 'ar' ? cat.titleAr : cat.title}
              </h3>

              <p
                className={`mt-1 text-xs leading-relaxed max-w-[240px] ${
                  isLight ? 'text-slate-600' : 'text-slate-400'
                }`}
              >
                {lang === 'ar' ? cat.subtitleAr : cat.subtitle}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* 4. FEATURED CATALOG SHOWCASE (Organized UI Preview) */}
      <section
        className={`py-14 border-y transition-colors ${
          isLight
            ? 'bg-slate-100/80 border-slate-200'
            : 'bg-[#0E1016] border-slate-800/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span
                className={`text-xs font-extrabold uppercase tracking-wider ${
                  isLight ? 'text-amber-800' : 'text-[#D4AF37]'
                }`}
              >
                {lang === 'ar' ? 'تشكيلة مختارة' : 'Featured Catalog'}
              </span>
              <h2
                className={`font-display text-2xl sm:text-3xl font-extrabold mt-1 ${
                  isLight ? 'text-slate-950' : 'text-white'
                }`}
              >
                {lang === 'ar'
                  ? 'أحدث المنتجات الأكثر طلباً'
                  : 'Most Popular & Cashback-Eligible Products'}
              </h2>
            </div>

            {/* Segmented Quick Filter Controls */}
            <div
              className={`inline-flex flex-wrap items-center gap-1 p-1 rounded-xl border ${
                isLight
                  ? 'bg-white border-slate-300'
                  : 'bg-[#151822] border-slate-800'
              }`}
            >
              {[
                { id: 'all', labelEn: 'Top Featured', labelAr: 'الأبرز' },
                { id: 'mobiles', labelEn: 'iPhone & Smartphones', labelAr: 'الموبايلات والآيفون' },
                { id: 'tech', labelEn: 'Laptops & Appliances', labelAr: 'اللابتوب والأجهزة' },
                { id: 'travel', labelEn: 'Umrah, Hajj & Trips', labelAr: 'العمرة والرحلات' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFeaturedTab(tab.id as typeof featuredTab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                    featuredTab === tab.id
                      ? isLight
                        ? 'bg-amber-700 text-white'
                        : 'bg-[#C9A45C] text-slate-950'
                      : isLight
                      ? 'text-slate-700 hover:text-slate-950'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {lang === 'ar' ? tab.labelAr : tab.labelEn}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                theme={theme}
                lang={lang}
                onNavigate={onNavigate}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href="/products"
              onClick={(e) => {
                e.preventDefault();
                onNavigate({ page: 'products' });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-extrabold border transition-colors ${
                isLight
                  ? 'bg-slate-900 hover:bg-slate-800 text-white border-slate-900'
                  : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700'
              }`}
            >
              <span>
                {lang === 'ar'
                  ? `عرض جميع المنتجات (${PRODUCTS_CATALOG.length} منتج)`
                  : `Browse All ${PRODUCTS_CATALOG.length} Products`}
              </span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 5. MAXERO MEMBERSHIP SECTION (Exact details from screenshot) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2
            className={`font-display text-3xl sm:text-4xl font-extrabold tracking-tight ${
              isLight ? 'text-slate-950' : 'text-[#E5C888]'
            }`}
          >
            {lang === 'ar' ? 'عضوية MAXERO' : 'MAXERO Membership'}
          </h2>
          <p className={`mt-2 text-sm font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            {lang === 'ar'
              ? 'انضم إلى عضويتنا الحصرية واستمتع بمزايا استثنائية'
              : 'Join our exclusive membership and enjoy incredible benefits'}
          </p>
        </div>

        {/* Center Membership Card */}
        <div
          className={`max-w-xl mx-auto rounded-3xl border p-6 sm:p-8 transition-all ${
            isLight
              ? 'bg-white border-amber-500/80 shadow-lg'
              : 'bg-gradient-to-b from-[#171820] to-[#11131A] border-[#C9A45C]/40 shadow-2xl'
          }`}
        >
          <div className="text-center border-b pb-6 border-slate-200 dark:border-slate-800">
            <div
              className={`w-12 h-12 rounded-2xl mx-auto flex items-center justify-center mb-3 ${
                isLight
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : 'bg-amber-500/15 text-[#D4AF37] border border-amber-500/30'
              }`}
            >
              <Star className="w-6 h-6" />
            </div>
            <div
              className={`font-display text-3xl sm:text-4xl font-extrabold tabular-nums ${
                isLight ? 'text-amber-900' : 'text-[#E5C888]'
              }`}
            >
              3,000 EGP / $60
            </div>
            <p className={`text-xs font-bold mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {lang === 'ar' ? 'اشتراك سنوي لمدة عام كامل' : 'One-year subscription'}
            </p>
          </div>

          <ul className="py-6 space-y-3.5 text-xs sm:text-sm">
            {[
              {
                en: '5% discount on all products — up to 200,000 EGP purchases',
                ar: 'خصم 5% على جميع المنتجات — حتى مشتريات بقيمة 200,000 ج.م',
              },
              {
                en: '50% cashback (25% every 3 months) — requires membership + product investment, delivery after 3 months',
                ar: '50% كاش باك (25% كل 3 أشهر) — يتطلب العضوية + استثمار المنتج، والاستلام بعد 3 أشهر',
              },
              {
                en: '50% marketing commission (1,500 EGP / $30 across 5 levels per referral)',
                ar: '50% عمولة تسويقية (1,500 ج.م / 30$ موزعة على 5 مستويات لكل إحالة)',
              },
              {
                en: 'Membership is required for product investment (cashback)',
                ar: 'العضوية شرط أساسي للاستفادة من نظام استثمار المنتج (الكاش باك)',
              },
              {
                en: 'Use marketing earnings to buy products or withdraw cash',
                ar: 'استخدم أرباح التسويق لشراء منتجات من الموقع أو سحبها نقداً',
              },
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <Check
                  className={`w-4 h-4 shrink-0 mt-0.5 ${
                    isLight ? 'text-amber-800' : 'text-[#D4AF37]'
                  }`}
                />
                <span className={`font-medium ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                  {lang === 'ar' ? item.ar : item.en}
                </span>
              </li>
            ))}
          </ul>

          {/* Delivery Notice Box */}
          <div
            className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 mb-6 ${
              isLight
                ? 'bg-amber-50 border-amber-400 text-amber-950 font-semibold'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-200'
            }`}
          >
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
            <span>
              {lang === 'ar'
                ? 'ملاحظة: في حالة العضوية فقط (بدون استثمار المنتج)، يتم تسليم الموبايلات والأجهزة الكهربائية خلال أسبوعين إلى شهر كحد أقصى.'
                : 'Note: For membership only (without product investment), mobiles & electronics are delivered within 2 weeks to 1 month max.'}
            </span>
          </div>

          <div className="text-center">
            <a
              href="/membership"
              onClick={(e) => {
                e.preventDefault();
                onNavigate({ page: 'membership' });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-extrabold inline-flex items-center justify-center gap-2 transition-colors ${
                isLight
                  ? 'bg-amber-700 hover:bg-amber-800 text-white shadow-sm'
                  : 'bg-[#C9A45C] hover:bg-[#D4AF37] text-slate-950'
              }`}
            >
              <span>{lang === 'ar' ? 'اشترك الآن' : 'Subscribe'}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* How It Works (01 - 04) */}
        <div className="mt-16">
          <h3
            className={`text-center font-display text-xl font-extrabold mb-8 ${
              isLight ? 'text-slate-950' : 'text-white'
            }`}
          >
            {lang === 'ar' ? 'كيف يعمل النظام؟' : 'How It Works'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: '01',
                en: 'Choose your subscription plan',
                ar: 'اختر باقة الاشتراك السنوية',
              },
              {
                num: '02',
                en: 'Submit payment proof',
                ar: 'أرسل إثبات الدفع عبر المنصة',
              },
              {
                num: '03',
                en: 'Admin approval within 24 hours',
                ar: 'تفعيل الإدارة خلال 24 ساعة',
              },
              {
                num: '04',
                en: 'Start enjoying exclusive discounts',
                ar: 'ابدأ الاستمتاع بالخصومات والكاش باك',
              },
            ].map((step) => (
              <div
                key={step.num}
                className={`p-5 rounded-2xl border text-center ${
                  isLight
                    ? 'bg-white border-slate-300 shadow-2xs'
                    : 'bg-[#12141C] border-slate-800'
                }`}
              >
                <div
                  className={`font-display text-2xl font-extrabold tabular-nums mb-1.5 ${
                    isLight ? 'text-amber-800' : 'text-[#D4AF37]'
                  }`}
                >
                  {step.num}
                </div>
                <p className={`text-xs font-bold ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
                  {lang === 'ar' ? step.ar : step.en}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom 2 Cards: Cashback Program & Marketing Commission */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className={`p-6 rounded-2xl border ${
              isLight
                ? 'bg-white border-slate-300 shadow-xs'
                : 'bg-[#12141C] border-slate-800'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isLight
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-[#C9A45C] text-slate-950'
                }`}
              >
                <RotateCcw className="w-5 h-5" />
              </div>
              <h4
                className={`text-base font-extrabold ${
                  isLight ? 'text-slate-950' : 'text-white'
                }`}
              >
                {lang === 'ar' ? 'برنامج الكاش باك (50%)' : 'Cashback Program'}
              </h4>
            </div>
            <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              {lang === 'ar'
                ? 'العضوية + استثمار المنتج: استلم منتجك بعد 3 أشهر، ثم احصل على 50% كاش باك (25% كل 3 أشهر) بالإضافة إلى خصم 5% على المنتجات حتى 200 ألف ج.م.'
                : 'Membership + product investment: receive your product after 3 months, then get 50% cashback (25% every 3 months) + 5% discount on products up to 200K EGP.'}
            </p>
          </div>

          <div
            className={`p-6 rounded-2xl border ${
              isLight
                ? 'bg-white border-slate-300 shadow-xs'
                : 'bg-[#12141C] border-slate-800'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isLight
                    ? 'bg-sky-100 text-sky-900 border border-sky-300'
                    : 'bg-sky-400 text-slate-950'
                }`}
              >
                <Gift className="w-5 h-5" />
              </div>
              <h4
                className={`text-base font-extrabold ${
                  isLight ? 'text-slate-950' : 'text-white'
                }`}
              >
                {lang === 'ar' ? 'العمولة التسويقية (5 مستويات)' : 'Marketing Commission'}
              </h4>
            </div>
            <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              {lang === 'ar'
                ? 'اربح 1,500 ج.م / 30$ (50%) موزعة عبر 5 مستويات عن كل عضو يشتري العضوية عن طريقك (500، 400، 300، 200، 100 ج.م). استخدمها لشراء منتجات أو اسحبها كاش!'
                : 'Earn 1,500 EGP / $30 (50%) across 5 levels for every member you refer (500, 400, 300, 200, 100 EGP). Use it to buy products or withdraw cash!'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
