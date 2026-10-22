import React, { useState } from 'react';
import {
  ArrowLeft,
  ShoppingCart,
  Check,
  ShieldCheck,
  Sparkles,
  Clock,
  Award,
  Link2,
} from 'lucide-react';
import { PRODUCTS_CATALOG } from '../data/products';
import {
  calculateMemberPricing,
  calculateCashbackProgram,
  formatEgp,
  type ProductItem,
  type RouteState,
} from '../utils/pricingAndCatalog';
import { ProductIllustration } from '../components/ProductIllustration';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailPageProps {
  productSlug: string;
  theme: 'light' | 'dark';
  lang: 'en' | 'ar';
  isMember: boolean;
  onNavigate: (route: RouteState) => void;
  onAddToCart: (product: ProductItem, plan?: 'standard' | 'member' | 'cashback') => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productSlug,
  theme,
  lang,
  isMember,
  onNavigate,
  onAddToCart,
}) => {
  const product =
    PRODUCTS_CATALOG.find((p) => p.slug === productSlug) || PRODUCTS_CATALOG[0];

  const [selectedPlan, setSelectedPlan] = useState<'standard' | 'member' | 'cashback'>(
    product.cashbackEligible ? 'cashback' : 'member'
  );
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const isLight = theme === 'light';
  const pricing = calculateMemberPricing(product.basePrice);
  const cashback = calculateCashbackProgram(product.basePrice);

  const relatedProducts = PRODUCTS_CATALOG.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleCopyProductLink = () => {
    const url = `${window.location.origin}/products/${product.slug}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAdd = () => {
    onAddToCart(product, selectedPlan);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Top Breadcrumb & Direct Product Link Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-bold">
          <a
            href="/products"
            onClick={(e) => {
              e.preventDefault();
              onNavigate({ page: 'products' });
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
              isLight
                ? 'bg-white hover:bg-slate-100 text-slate-900 border-slate-300'
                : 'bg-[#12141C] hover:bg-slate-800 text-slate-200 border-slate-800'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'العودة للمنتجات' : 'Back to Products'}</span>
          </a>
          <span className="text-slate-400">/</span>
          <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>
            {lang === 'ar' ? product.categoryLabelAr : product.categoryLabel}
          </span>
          <span className="text-slate-400">/</span>
          <span className={`truncate max-w-xs ${isLight ? 'text-slate-950' : 'text-white'}`}>
            {lang === 'ar' ? product.nameAr : product.name}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopyProductLink}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold ${
            isLight
              ? 'bg-amber-50 hover:bg-amber-100 text-amber-950 border-amber-300'
              : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30'
          }`}
        >
          {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
          <span>
            {copiedLink
              ? lang === 'ar'
                ? 'تم نسخ رابط المنتج!'
                : 'Product URL Copied!'
              : lang === 'ar'
              ? 'نسخ رابط المنتج المباشر'
              : 'Share Product URL'}
          </span>
        </button>
      </div>

      {/* Main 2-Column Contiguous Purchase Module */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Studio Product Showcase */}
        <div className="lg:col-span-5">
          <div
            className={`rounded-3xl border overflow-hidden bg-white p-6 h-80 sm:h-96 flex items-center justify-center relative ${
              isLight ? 'border-slate-300 shadow-sm' : 'border-slate-800'
            }`}
          >
            {product.cashbackEligible && (
              <span className="absolute top-4 right-4 z-10 px-3 py-1 rounded-lg text-xs font-extrabold bg-amber-900 text-white shadow-xs">
                {lang === 'ar' ? 'مؤهل لبرنامج الكاش باك 50%' : '50% Cashback Eligible'}
              </span>
            )}
            <ProductIllustration
              deviceType={product.visualStyle.deviceType}
              primaryColor={product.visualStyle.primaryColor}
              secondaryColor={product.visualStyle.secondaryColor}
              accentColor={product.visualStyle.accentColor}
              screenLabel={product.visualStyle.screenLabel}
            />
          </div>

          {/* Trust & Delivery Badges below gallery */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div
              className={`p-3.5 rounded-xl border flex items-start gap-2.5 text-xs ${
                isLight ? 'bg-white border-slate-300' : 'bg-[#12141C] border-slate-800'
              }`}
            >
              <Award className={`w-4 h-4 shrink-0 mt-0.5 ${isLight ? 'text-amber-800' : 'text-amber-400'}`} />
              <div>
                <div className={`font-bold ${isLight ? 'text-slate-950' : 'text-white'}`}>
                  {lang === 'ar' ? 'الضمان المعتمد' : 'Official Warranty'}
                </div>
                <div className={isLight ? 'text-slate-600' : 'text-slate-400'}>
                  {lang === 'ar' ? product.specs.warrantyAr : product.specs.warranty}
                </div>
              </div>
            </div>

            <div
              className={`p-3.5 rounded-xl border flex items-start gap-2.5 text-xs ${
                isLight ? 'bg-white border-slate-300' : 'bg-[#12141C] border-slate-800'
              }`}
            >
              <Clock className={`w-4 h-4 shrink-0 mt-0.5 ${isLight ? 'text-sky-700' : 'text-sky-400'}`} />
              <div>
                <div className={`font-bold ${isLight ? 'text-slate-950' : 'text-white'}`}>
                  {lang === 'ar' ? 'موعد التسليم' : 'Delivery Schedule'}
                </div>
                <div className={isLight ? 'text-slate-600' : 'text-slate-400'}>
                  {lang === 'ar'
                    ? product.specs.deliveryMemberOnlyAr
                    : product.specs.deliveryMemberOnly}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Contiguous Purchase & Plan Selector Module */}
        <div
          className={`lg:col-span-7 rounded-3xl border p-6 sm:p-8 space-y-6 ${
            isLight
              ? 'bg-white border-slate-300 shadow-sm'
              : 'bg-[#12141C] border-slate-800'
          }`}
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-bold mb-2">
              <span
                className={`px-2.5 py-0.5 rounded border ${
                  isLight
                    ? 'bg-slate-100 text-slate-900 border-slate-300'
                    : 'bg-slate-800 text-slate-200 border-slate-700'
                }`}
              >
                {product.brand}
              </span>
              <span className={isLight ? 'text-emerald-800' : 'text-emerald-400'}>
                ● {lang === 'ar' ? 'متوفر في المخزون' : 'In Stock & Ready'}
              </span>
            </div>

            <h1
              className={`font-display text-2xl sm:text-3xl font-extrabold tracking-tight ${
                isLight ? 'text-slate-950' : 'text-white'
              }`}
            >
              {lang === 'ar' ? product.nameAr : product.name}
            </h1>

            <p className={`mt-2 text-sm leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              {lang === 'ar' ? product.descriptionAr : product.description}
            </p>
          </div>

          {/* Interactive Purchase Plan Selector */}
          <div className="space-y-3">
            <label
              className={`block text-xs font-extrabold uppercase tracking-wider ${
                isLight ? 'text-slate-700' : 'text-slate-400'
              }`}
            >
              {lang === 'ar' ? 'اختر نظام الشراء المفضل لديك:' : 'Select Your Purchase Plan:'}
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Plan 1: Base Price */}
              <button
                type="button"
                onClick={() => setSelectedPlan('standard')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  selectedPlan === 'standard'
                    ? isLight
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-800 text-white border-amber-400'
                    : isLight
                    ? 'bg-slate-50 hover:bg-slate-100 text-slate-900 border-slate-300'
                    : 'bg-[#171A24] hover:bg-slate-800/70 text-slate-200 border-slate-800'
                }`}
              >
                <div className="text-[11px] font-bold opacity-80">
                  {lang === 'ar' ? 'السعر الأساسي (بدون عضوية)' : 'Standard Base Price'}
                </div>
                <div className="font-mono-num text-lg font-extrabold mt-1">
                  {formatEgp(pricing.basePrice, lang)}
                </div>
                <div className="text-[10px] mt-1 opacity-75">
                  {lang === 'ar' ? 'شراء مباشر بالسعر العادي' : 'Regular non-member purchase'}
                </div>
              </button>

              {/* Plan 2: Member 5% Instant Discount */}
              <button
                type="button"
                onClick={() => setSelectedPlan('member')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  selectedPlan === 'member'
                    ? isLight
                      ? 'bg-amber-700 text-white border-amber-800 shadow-xs'
                      : 'bg-[#C9A45C] text-slate-950 border-amber-300'
                    : isLight
                    ? 'bg-amber-50/70 hover:bg-amber-100/70 text-slate-950 border-amber-300'
                    : 'bg-[#171A24] hover:bg-slate-800/70 text-slate-200 border-slate-800'
                }`}
              >
                <div className="text-[11px] font-extrabold flex items-center justify-between">
                  <span>{lang === 'ar' ? 'سعر العضو (خصم 5%)' : 'Member 5% Off'}</span>
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div className="font-mono-num text-lg font-extrabold mt-1">
                  {formatEgp(pricing.memberPrice, lang)}
                </div>
                <div className="text-[10px] mt-1 font-semibold">
                  {lang === 'ar'
                    ? `توفير فوري ${formatEgp(pricing.discountAmount, lang)}`
                    : `Save ${formatEgp(pricing.discountAmount, lang)} instantly`}
                </div>
              </button>

              {/* Plan 3: 50% Cashback Investment Program */}
              <button
                type="button"
                disabled={!product.cashbackEligible}
                onClick={() => setSelectedPlan('cashback')}
                className={`p-3.5 rounded-xl border text-left transition-all disabled:opacity-45 ${
                  selectedPlan === 'cashback'
                    ? isLight
                      ? 'bg-emerald-800 text-white border-emerald-900 shadow-xs'
                      : 'bg-emerald-500 text-slate-950 border-emerald-300'
                    : isLight
                    ? 'bg-emerald-50/70 hover:bg-emerald-100/70 text-slate-950 border-emerald-300'
                    : 'bg-[#171A24] hover:bg-slate-800/70 text-slate-200 border-slate-800'
                }`}
              >
                <div className="text-[11px] font-extrabold flex items-center justify-between">
                  <span>{lang === 'ar' ? 'كاش باك 50% + خصم 5%' : '50% Cashback Plan'}</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="font-mono-num text-lg font-extrabold mt-1">
                  {product.cashbackEligible
                    ? formatEgp(cashback.totalCashback, lang)
                    : lang === 'ar'
                    ? 'غير متاح'
                    : 'N/A'}
                </div>
                <div className="text-[10px] mt-1 font-semibold">
                  {product.cashbackEligible
                    ? lang === 'ar'
                      ? 'استرداد 25% كل 3 أشهر'
                      : '25% back every 3 months'
                    : lang === 'ar'
                    ? 'خصم 5% فقط'
                    : '5% discount only'}
                </div>
              </button>
            </div>
          </div>

          {/* Cashback Schedule Breakdown Box */}
          {product.cashbackEligible && selectedPlan === 'cashback' && (
            <div
              className={`p-4 rounded-2xl border space-y-2 text-xs ${
                isLight
                  ? 'bg-emerald-50/90 border-emerald-300 text-slate-900'
                  : 'bg-emerald-950/30 border-emerald-700/50 text-emerald-100'
              }`}
            >
              <div className="font-extrabold flex items-center gap-1.5 text-sm">
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>
                  {lang === 'ar'
                    ? 'تفاصيل جدول الكاش باك 50% لهذا المنتج:'
                    : '50% Cashback Investment Schedule for This Product:'}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                <div
                  className={`p-2.5 rounded-xl border ${
                    isLight ? 'bg-white border-emerald-200' : 'bg-slate-900/80 border-slate-800'
                  }`}
                >
                  <div className="text-[11px] opacity-75">
                    {lang === 'ar' ? 'الخطوة 1 (بعد 3 أشهر)' : 'Step 1 (Month 3)'}
                  </div>
                  <div className="font-bold mt-0.5">
                    {lang === 'ar' ? 'استلام المنتج الأصلي' : 'Receive Your Product'}
                  </div>
                </div>
                <div
                  className={`p-2.5 rounded-xl border ${
                    isLight ? 'bg-white border-emerald-200' : 'bg-slate-900/80 border-slate-800'
                  }`}
                >
                  <div className="text-[11px] opacity-75">
                    {lang === 'ar' ? 'الدفعة الأولى (25%)' : '1st Payout (25%)'}
                  </div>
                  <div className="font-mono-num font-extrabold text-sm mt-0.5 text-emerald-700 dark:text-emerald-400">
                    +{formatEgp(cashback.firstInstallment3Months, lang)}
                  </div>
                </div>
                <div
                  className={`p-2.5 rounded-xl border ${
                    isLight ? 'bg-white border-emerald-200' : 'bg-slate-900/80 border-slate-800'
                  }`}
                >
                  <div className="text-[11px] opacity-75">
                    {lang === 'ar' ? 'الدفعة الثانية (25%)' : '2nd Payout (25%)'}
                  </div>
                  <div className="font-mono-num font-extrabold text-sm mt-0.5 text-emerald-700 dark:text-emerald-400">
                    +{formatEgp(cashback.secondInstallment6Months, lang)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Technical Specifications Table */}
          <div className="border-t pt-4 border-slate-200 dark:border-slate-800">
            <h2
              className={`text-xs font-extrabold uppercase tracking-wider mb-3 ${
                isLight ? 'text-slate-700' : 'text-slate-400'
              }`}
            >
              {lang === 'ar' ? 'المواصفات الفنية والتفاصيل' : 'Technical Specifications'}
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {product.specs.ramStorage && (
                <div
                  className={`p-2.5 rounded-lg border ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#171A24] border-slate-800'
                  }`}
                >
                  <dt className={isLight ? 'text-slate-500 font-semibold' : 'text-slate-400'}>
                    {lang === 'ar' ? 'الذاكرة / السعة' : 'Memory / Capacity'}
                  </dt>
                  <dd className={`font-bold mt-0.5 ${isLight ? 'text-slate-950' : 'text-white'}`}>
                    {product.specs.ramStorage}
                  </dd>
                </div>
              )}
              {product.specs.display && (
                <div
                  className={`p-2.5 rounded-lg border ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#171A24] border-slate-800'
                  }`}
                >
                  <dt className={isLight ? 'text-slate-500 font-semibold' : 'text-slate-400'}>
                    {lang === 'ar' ? 'الشاشة / الإقامة' : 'Display / Highlights'}
                  </dt>
                  <dd className={`font-bold mt-0.5 ${isLight ? 'text-slate-950' : 'text-white'}`}>
                    {product.specs.display}
                  </dd>
                </div>
              )}
              {product.specs.processor && (
                <div
                  className={`p-2.5 rounded-lg border ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#171A24] border-slate-800'
                  }`}
                >
                  <dt className={isLight ? 'text-slate-500 font-semibold' : 'text-slate-400'}>
                    {lang === 'ar' ? 'المعالج / التفاصيل' : 'Processor / Details'}
                  </dt>
                  <dd className={`font-bold mt-0.5 ${isLight ? 'text-slate-950' : 'text-white'}`}>
                    {product.specs.processor}
                  </dd>
                </div>
              )}
              {product.specs.camera && (
                <div
                  className={`p-2.5 rounded-lg border ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#171A24] border-slate-800'
                  }`}
                >
                  <dt className={isLight ? 'text-slate-500 font-semibold' : 'text-slate-400'}>
                    {lang === 'ar' ? 'الكاميرا / المميزات' : 'Camera / Features'}
                  </dt>
                  <dd className={`font-bold mt-0.5 ${isLight ? 'text-slate-950' : 'text-white'}`}>
                    {product.specs.camera}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {/* Primary Add to Cart & Membership CTA */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleAdd}
              className={`flex-1 py-3.5 px-6 rounded-xl text-sm font-extrabold inline-flex items-center justify-center gap-2 transition-colors ${
                addedFeedback
                  ? 'bg-emerald-600 text-white'
                  : isLight
                  ? 'bg-amber-700 hover:bg-amber-800 text-white shadow-sm'
                  : 'bg-[#C9A45C] hover:bg-[#D4AF37] text-slate-950'
              }`}
            >
              {addedFeedback ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>
                    {lang === 'ar' ? 'تمت الإضافة إلى السلة!' : 'Added to Shopping Cart!'}
                  </span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span>
                    {lang === 'ar'
                      ? `إضافة للسلة (${formatEgp(
                          selectedPlan === 'standard' ? pricing.basePrice : pricing.memberPrice,
                          lang
                        )})`
                      : `Add to Cart — ${formatEgp(
                          selectedPlan === 'standard' ? pricing.basePrice : pricing.memberPrice,
                          lang
                        )}`}
                  </span>
                </>
              )}
            </button>

            {!isMember && (
              <a
                href="/membership"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate({ page: 'membership' });
                }}
                className={`py-3.5 px-5 rounded-xl text-xs font-extrabold border text-center transition-colors ${
                  isLight
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-900 border-slate-300'
                    : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700'
                }`}
              >
                {lang === 'ar'
                  ? 'اشترك بالعضوية (3,000 ج.م)'
                  : 'Get Membership (3,000 EGP)'}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
          <h2
            className={`font-display text-2xl font-extrabold mb-6 ${
              isLight ? 'text-slate-950' : 'text-white'
            }`}
          >
            {lang === 'ar' ? 'منتجات مشابهة في نفس القسم' : 'Related Products'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((rel) => (
              <ProductCard
                key={rel.id}
                product={rel}
                theme={theme}
                lang={lang}
                onNavigate={onNavigate}
                onAddToCart={(item) => onAddToCart(item)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
