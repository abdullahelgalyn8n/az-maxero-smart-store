import React from 'react';
import {
  Crown,
  Lock,
  Unlock,
  Percent,
  Gift,
  ShieldCheck,
  ShoppingCart,
  ArrowUpRight,
  Check,
} from 'lucide-react';
import { EXCLUSIVE_MEMBER_OFFERS, PRODUCTS_CATALOG } from '../data/products';
import { formatEgp, type ProductItem, type RouteState } from '../utils/pricingAndCatalog';
import { ProductIllustration } from '../components/ProductIllustration';

interface ExclusiveOffersPageProps {
  theme: 'light' | 'dark';
  lang: 'en' | 'ar';
  isMember: boolean;
  onNavigate: (route: RouteState) => void;
  onOpenLogin: () => void;
  onToggleDemoMember: () => void;
  onAddToCart: (product: ProductItem) => void;
}

export const ExclusiveOffersPage: React.FC<ExclusiveOffersPageProps> = ({
  theme,
  lang,
  isMember,
  onNavigate,
  onOpenLogin,
  onToggleDemoMember,
  onAddToCart,
}) => {
  const isLight = theme === 'light';

  const handleAddOfferToCart = (productSlug: string) => {
    const found = PRODUCTS_CATALOG.find((p) => p.slug === productSlug) || PRODUCTS_CATALOG[1];
    onAddToCart(found);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header Section (Matches screenshot 1) */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-extrabold bg-amber-500/15 border-amber-500/40 text-amber-800 dark:text-[#E5C888]">
          <Crown className="w-3.5 h-3.5" />
          <span>{lang === 'ar' ? 'للأعضاء فقط' : 'Members Only'}</span>
        </div>

        <h1
          className={`font-display text-3xl sm:text-5xl font-extrabold tracking-tight ${
            isLight ? 'text-slate-950' : 'text-white'
          }`}
        >
          {lang === 'ar' ? 'عروض الأعضاء الحصرية' : 'Exclusive Member Offers'}
        </h1>

        <p className={`text-sm sm:text-base font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          {lang === 'ar'
            ? 'اشترك الآن وافتح العروض الحصرية وباقات الكاش باك المضاعفة المخصصة للأعضاء فقط!'
            : 'Subscribe now and unlock offers only members can see!'}
        </p>
      </div>

      {/* LOCKED STATE vs UNLOCKED STATE */}
      {!isMember ? (
        <div className="relative rounded-3xl overflow-hidden py-8 px-4">
          {/* Background Blurred Skeleton Grid (Matches screenshot 1) */}
          <div
            aria-hidden="true"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-35 blur-[2px] pointer-events-none select-none"
          >
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className={`rounded-2xl border p-4 space-y-4 ${
                  isLight
                    ? 'bg-slate-200 border-slate-300'
                    : 'bg-[#161923] border-slate-800'
                }`}
              >
                <div
                  className={`h-40 rounded-xl ${
                    isLight ? 'bg-slate-300' : 'bg-[#1E2330]'
                  }`}
                />
                <div
                  className={`h-3 w-2/3 rounded ${
                    isLight ? 'bg-slate-300' : 'bg-slate-800'
                  }`}
                />
                <div
                  className={`h-3 w-1/2 rounded ${
                    isLight ? 'bg-slate-300' : 'bg-slate-800'
                  }`}
                />
                <div
                  className={`h-9 w-full rounded-lg ${
                    isLight ? 'bg-amber-700/40' : 'bg-amber-500/20'
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Center Lock Gate Modal Card (Matches screenshot 1 + Demo Unlock button) */}
          <div className="inset-0 absolute flex items-center justify-center p-4">
            <div
              className={`max-w-md w-full rounded-3xl border p-7 sm:p-8 text-center space-y-5 shadow-2xl ${
                isLight
                  ? 'bg-white/98 border-amber-500 text-slate-950'
                  : 'bg-[#12131A]/95 border-amber-500/35 text-white backdrop-blur-md'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center ${
                  isLight
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : 'bg-amber-500/15 text-[#D4AF37] border border-amber-500/30'
                }`}
              >
                <Lock className="w-7 h-7" />
              </div>

              <div className="space-y-2">
                <h2 className="font-display text-xl sm:text-2xl font-extrabold">
                  {lang === 'ar'
                    ? 'هذه الصفحة حصرية للأعضاء فقط'
                    : 'This page is exclusive to members'}
                </h2>
                <p className={`text-xs sm:text-sm ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                  {lang === 'ar'
                    ? 'اشترك الآن وافتح العروض الحصرية التي لا يراها إلا أعضاء MAXERO!'
                    : 'Subscribe now and unlock offers only members can see!'}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                <a
                  href="/membership"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate({ page: 'membership' });
                  }}
                  className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-colors ${
                    isLight
                      ? 'bg-amber-700 hover:bg-amber-800 text-white'
                      : 'bg-[#C9A45C] hover:bg-[#D4AF37] text-slate-950'
                  }`}
                >
                  {lang === 'ar'
                    ? 'اشترك الآن - 3,000 ج.م'
                    : 'Subscribe Now - 3,000 EGP'}
                </a>

                <button
                  type="button"
                  onClick={onOpenLogin}
                  className={`px-5 py-2.5 rounded-xl text-xs font-extrabold border transition-colors ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-900 border-slate-300'
                      : 'bg-slate-900 hover:bg-slate-800 text-white border-slate-700'
                  }`}
                >
                  {lang === 'ar' ? 'تسجيل الدخول أولاً' : 'Login First'}
                </button>
              </div>

              {/* Instant Member Preview Button for Seamless Testing */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={onToggleDemoMember}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-extrabold inline-flex items-center justify-center gap-2 border transition-colors ${
                    isLight
                      ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-400'
                      : 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border-emerald-500/40'
                  }`}
                >
                  <Unlock className="w-4 h-4" />
                  <span>
                    {lang === 'ar'
                      ? 'فتح ومعاينة عروض الأعضاء الحصرية الآن (وضع العضو)'
                      : 'Unlock & Preview Exclusive Member Offers Now'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* UNLOCKED VIP MEMBER OFFERS GRID */
        <div className="space-y-6">
          <div
            className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-4 ${
              isLight
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-emerald-950/30 border-emerald-700/50 text-emerald-200'
            }`}
          >
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold">
              <Unlock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>
                {lang === 'ar'
                  ? 'مرحباً بك في قسم العروض الحصرية للأعضاء! جميع الباقات أدناه تشمل خصم 5% فوري + كاش باك 50% وهدايا مجانية.'
                  : 'Welcome to the Member-Only Vault! All bundles below include 5% instant discount + 50% cashback & VIP gifts.'}
              </span>
            </div>
            <button
              type="button"
              onClick={onToggleDemoMember}
              className="text-xs font-extrabold underline opacity-80 hover:opacity-100"
            >
              {lang === 'ar' ? 'قفل المعاينة' : 'Lock Preview'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXCLUSIVE_MEMBER_OFFERS.map((offer) => (
              <article
                key={offer.id}
                className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all ${
                  isLight
                    ? 'bg-white border-amber-400 shadow-sm hover:shadow-md'
                    : 'bg-[#12141C] border-amber-500/35 hover:border-amber-400'
                }`}
              >
                <div>
                  <div className="relative h-52 bg-white border-b border-slate-200 p-4">
                    <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md text-[11px] font-extrabold bg-amber-900 text-white shadow-xs">
                      {lang === 'ar' ? offer.tagAr : offer.tag}
                    </span>
                    <ProductIllustration
                      deviceType={offer.deviceType}
                      primaryColor={offer.primaryColor}
                      secondaryColor={offer.secondaryColor}
                      screenLabel={offer.screenLabel}
                    />
                  </div>

                  <div className="p-5 space-y-3">
                    <h3
                      className={`text-base font-extrabold leading-snug ${
                        isLight ? 'text-slate-950' : 'text-white'
                      }`}
                    >
                      {lang === 'ar' ? offer.titleAr : offer.title}
                    </h3>
                    <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                      {lang === 'ar' ? offer.summaryAr : offer.summary}
                    </p>

                    <ul className="space-y-1.5 pt-1">
                      {(lang === 'ar' ? offer.perksAr : offer.perks).map((perk, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs font-semibold">
                          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span className={isLight ? 'text-slate-800' : 'text-slate-200'}>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-5 pt-0 space-y-3">
                  <div
                    className={`p-3 rounded-xl border space-y-1 ${
                      isLight
                        ? 'bg-amber-50/80 border-amber-300'
                        : 'bg-[#181A24] border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>
                        {lang === 'ar' ? 'السعر العادي:' : 'Regular Price:'}
                      </span>
                      <span className="font-mono-num line-through opacity-70">
                        {formatEgp(offer.regularPrice, lang)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-extrabold">
                      <span className={isLight ? 'text-amber-900' : 'text-[#D4AF37]'}>
                        {lang === 'ar' ? 'سعر العضو VIP:' : 'VIP Member Price:'}
                      </span>
                      <span
                        className={`font-mono-num text-base ${
                          isLight ? 'text-amber-950' : 'text-[#E5C158]'
                        }`}
                      >
                        {formatEgp(offer.memberExclusivePrice, lang)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-extrabold text-emerald-700 dark:text-emerald-400">
                      <span>{lang === 'ar' ? 'استرداد الكاش باك (50%):' : '50% Cashback Return:'}</span>
                      <span className="font-mono-num">+{formatEgp(offer.cashbackAmount, lang)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleAddOfferToCart(offer.productSlug)}
                      className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold inline-flex items-center justify-center gap-1.5 transition-colors ${
                        isLight
                          ? 'bg-amber-700 hover:bg-amber-800 text-white'
                          : 'bg-[#C9A45C] hover:bg-[#D4AF37] text-slate-950'
                      }`}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? 'اطلب الباقة الآن' : 'Claim VIP Offer'}</span>
                    </button>

                    <a
                      href={`/products/${offer.productSlug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate({ page: 'product-detail', productSlug: offer.productSlug });
                      }}
                      className={`p-2.5 rounded-xl border transition-colors ${
                        isLight
                          ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-900'
                          : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200'
                      }`}
                      aria-label="View product details"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Bottom 4-Card Benefits Strip (Matches screenshot 1) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        {[
          {
            icon: <Percent className="w-5 h-5" />,
            en: '5% discount on all products — up to 200K EGP purchases',
            ar: 'خصم 5% على جميع المنتجات — حتى مشتريات 200 ألف ج.م',
          },
          {
            icon: <Gift className="w-5 h-5" />,
            en: '50% cashback (25% every 3 months) — requires membership + product investment',
            ar: '50% كاش باك (25% كل 3 أشهر) — يتطلب العضوية + استثمار المنتج',
          },
          {
            icon: <Crown className="w-5 h-5" />,
            en: 'Membership required for product investment',
            ar: 'العضوية مطلوبة للاستفادة من استثمار المنتج',
          },
          {
            icon: <ShieldCheck className="w-5 h-5" />,
            en: '1,500 EGP marketing commission per referral (5 levels)',
            ar: '1,500 ج.م عمولة تسويقية لكل إحالة (عبر 5 مستويات)',
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-2xl border text-center space-y-3 ${
              isLight
                ? 'bg-white border-slate-300 shadow-2xs'
                : 'bg-[#12141C] border-slate-800'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl mx-auto flex items-center justify-center ${
                isLight ? 'text-amber-800 bg-amber-100' : 'text-[#D4AF37] bg-amber-500/10'
              }`}
            >
              {item.icon}
            </div>
            <p className={`text-xs font-bold leading-relaxed ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {lang === 'ar' ? item.ar : item.en}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
