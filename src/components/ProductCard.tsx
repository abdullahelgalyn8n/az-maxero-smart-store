import React, { useState } from 'react';
import { ShoppingCart, Star, Check, ArrowUpRight, Sparkles } from 'lucide-react';
import {
  calculateMemberPricing,
  calculateCashbackProgram,
  formatEgp,
  type ProductItem,
  type RouteState,
} from '../utils/pricingAndCatalog';
import { ProductIllustration } from './ProductIllustration';

interface ProductCardProps {
  product: ProductItem;
  theme: 'light' | 'dark';
  lang: 'en' | 'ar';
  viewMode?: 'grid' | 'list';
  onNavigate: (route: RouteState) => void;
  onAddToCart: (product: ProductItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  theme,
  lang,
  viewMode = 'grid',
  onNavigate,
  onAddToCart,
}) => {
  const [justAdded, setJustAdded] = useState(false);
  const isLight = theme === 'light';

  const pricing = calculateMemberPricing(product.basePrice);
  const cashback = calculateCashbackProgram(product.basePrice);

  const handleOpenDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate({ page: 'product-detail', productSlug: product.slug });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdd = () => {
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  if (viewMode === 'list') {
    return (
      <article
        className={`rounded-2xl border overflow-hidden transition-all flex flex-col sm:flex-row items-stretch ${
          isLight
            ? 'bg-white border-slate-300 hover:border-amber-600/70 shadow-xs hover:shadow-md'
            : 'bg-[#12151E] border-slate-800 hover:border-amber-500/40'
        }`}
      >
        {/* Left Image Area */}
        <a
          href={`/products/${product.slug}`}
          onClick={handleOpenDetails}
          className="relative sm:w-64 h-56 sm:h-auto shrink-0 bg-white border-b sm:border-b-0 sm:border-r border-slate-200 flex items-center justify-center p-4"
        >
          {product.featured && (
            <span
              className="absolute top-3 left-3 z-10 w-6 h-6 rounded-full bg-amber-100 border border-amber-400 text-amber-800 flex items-center justify-center"
              title="Featured Product"
            >
              <Star className="w-3.5 h-3.5 fill-amber-600 text-amber-700" />
            </span>
          )}
          {product.cashbackEligible && (
            <span className="absolute top-3 right-3 z-10 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-900 text-amber-100 border border-amber-700 shadow-xs">
              {lang === 'ar' ? 'كاش باك 50%' : 'Cashback'}
            </span>
          )}
          <ProductIllustration
            deviceType={product.visualStyle.deviceType}
            primaryColor={product.visualStyle.primaryColor}
            secondaryColor={product.visualStyle.secondaryColor}
            accentColor={product.visualStyle.accentColor}
            screenLabel={product.visualStyle.screenLabel}
          />
        </a>

        {/* Right Details Area */}
        <div className="flex-1 p-5 flex flex-col justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold mb-1.5">
              <span className={isLight ? 'text-slate-700' : 'text-slate-300'}>
                {lang === 'ar' ? product.categoryLabelAr : product.categoryLabel}
              </span>
              <span aria-hidden="true" className="text-slate-400">
                ·
              </span>
              <span className={ isLight ? 'text-emerald-800 font-bold' : 'text-emerald-400 font-bold' }>
                {product.inStock
                  ? lang === 'ar'
                    ? 'متوفر في المخزون'
                    : 'In Stock'
                  : lang === 'ar'
                  ? 'غير متوفر'
                  : 'Out of Stock'}
              </span>
              {product.specs.ramStorage && (
                <>
                  <span aria-hidden="true" className="text-slate-400">
                    ·
                  </span>
                  <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>
                    {product.specs.ramStorage}
                  </span>
                </>
              )}
            </div>

            <h3 className="text-lg font-bold tracking-tight">
              <a
                href={`/products/${product.slug}`}
                onClick={handleOpenDetails}
                className={`hover:underline ${isLight ? 'text-slate-950' : 'text-white'}`}
              >
                {lang === 'ar' ? product.nameAr : product.name}
              </a>
            </h3>

            <p className={`mt-1 text-xs line-clamp-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {lang === 'ar' ? product.descriptionAr : product.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-3 border-t border-slate-200 dark:border-slate-800">
            <div className="space-y-1">
              <div className="flex items-center gap-3 text-xs">
                <span className={isLight ? 'text-slate-600 font-medium' : 'text-slate-400'}>
                  {lang === 'ar' ? 'السعر الأساسي:' : 'Base Price:'}
                </span>
                <span
                  className={`font-mono-num font-bold text-sm ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {formatEgp(pricing.basePrice, lang)}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className={isLight ? 'text-amber-900 font-bold' : 'text-amber-400 font-semibold'}>
                  {lang === 'ar' ? 'سعر العضو (خصم 5%):' : 'Member Price (5% discount):'}
                </span>
                <span
                  className={`font-mono-num font-extrabold text-base ${
                    isLight ? 'text-amber-800' : 'text-amber-300'
                  }`}
                >
                  {formatEgp(pricing.memberPrice, lang)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`/products/${product.slug}`}
                onClick={handleOpenDetails}
                className={`px-5 py-2.5 rounded-lg text-xs font-extrabold transition-colors flex items-center gap-1.5 ${
                  isLight
                    ? 'bg-amber-700 hover:bg-amber-800 text-white'
                    : 'bg-[#C9A45C] hover:bg-[#D4AF37] text-slate-950'
                }`}
              >
                <span>{lang === 'ar' ? 'التفاصيل' : 'Details'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={handleAdd}
                aria-label={`Add ${product.name} to cart`}
                className={`p-2.5 rounded-lg border transition-colors ${
                  justAdded
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : isLight
                    ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-900'
                    : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200'
                }`}
              >
                {justAdded ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Default Grid Card (Matches reference screenshot layout + enhanced contrast)
  return (
    <article
      className={`group rounded-2xl border overflow-hidden transition-all flex flex-col justify-between ${
        isLight
          ? 'bg-white border-slate-300 hover:border-amber-600/80 shadow-xs hover:shadow-md'
          : 'bg-[#12141C] border-slate-800/90 hover:border-amber-500/40'
      }`}
    >
      {/* Top Studio Visual Frame */}
      <div>
        <a
          href={`/products/${product.slug}`}
          onClick={handleOpenDetails}
          className="relative block h-48 bg-white border-b border-slate-200 overflow-hidden"
        >
          {/* Top-Left Featured Star */}
          {product.featured && (
            <span
              className="absolute top-3 left-3 z-10 w-6 h-6 rounded-full bg-amber-100/95 border border-amber-400 flex items-center justify-center shadow-2xs"
              title={lang === 'ar' ? 'منتج مميز' : 'Featured Product'}
            >
              <Star className="w-3.5 h-3.5 fill-amber-600 text-amber-700" />
            </span>
          )}

          {/* Top-Right Cashback Tag */}
          {product.cashbackEligible && (
            <span className="absolute top-3 right-3 z-10 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-400 shadow-2xs">
              {lang === 'ar' ? 'كاش باك 50%' : 'Cashback'}
            </span>
          )}

          <div className="w-full h-full transition-transform duration-200 group-hover:scale-[1.03]">
            <ProductIllustration
              deviceType={product.visualStyle.deviceType}
              primaryColor={product.visualStyle.primaryColor}
              secondaryColor={product.visualStyle.secondaryColor}
              accentColor={product.visualStyle.accentColor}
              screenLabel={product.visualStyle.screenLabel}
            />
          </div>
        </a>

        {/* Card Metadata & Title */}
        <div className="p-4 pb-2">
          {/* Category · Stock Status (Unboxed clean metadata with high contrast) */}
          <div className="flex items-center justify-between gap-2 text-xs mb-1.5">
            <div className="flex items-center gap-1.5 font-semibold">
              <span
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  isLight
                    ? 'bg-slate-100 text-slate-800 border border-slate-300'
                    : 'bg-slate-800 text-slate-200 border border-slate-700'
                }`}
              >
                {lang === 'ar' ? product.categoryLabelAr : product.categoryLabel}
              </span>
              <span
                className={`text-[11px] font-bold ${
                  isLight ? 'text-emerald-800' : 'text-teal-400'
                }`}
              >
                {product.inStock
                  ? lang === 'ar'
                    ? 'متوفر'
                    : 'In Stock'
                  : lang === 'ar'
                  ? 'نفذت الكمية'
                  : 'Out of Stock'}
              </span>
            </div>
            <span className={`text-[11px] font-semibold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {product.brand}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="text-[15px] font-bold tracking-tight leading-snug line-clamp-1">
            <a
              href={`/products/${product.slug}`}
              onClick={handleOpenDetails}
              className={`hover:underline ${isLight ? 'text-slate-950' : 'text-white'}`}
            >
              {lang === 'ar' ? product.nameAr : product.name}
            </a>
          </h3>

          {/* Key Spec Line */}
          {product.specs.ramStorage && (
            <p className={`text-[11px] mt-0.5 truncate font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {product.specs.ramStorage}
            </p>
          )}
        </div>
      </div>

      {/* Pricing & Actions Footer */}
      <div className="p-4 pt-2 space-y-3">
        {/* Pricing Block */}
        <div
          className={`p-2.5 rounded-xl border space-y-1.5 ${
            isLight
              ? 'bg-slate-50 border-slate-200/90'
              : 'bg-[#171A24] border-slate-800/90'
          }`}
        >
          {/* Base Price Row */}
          <div className="flex items-center justify-between text-xs">
            <span className={isLight ? 'text-slate-700 font-medium' : 'text-slate-400'}>
              {lang === 'ar' ? 'السعر الأساسي' : 'Base Price'}
            </span>
            <span
              className={`font-mono-num font-bold text-sm ${
                isLight ? 'text-slate-950' : 'text-white'
              }`}
            >
              {formatEgp(pricing.basePrice, lang)}
            </span>
          </div>

          {/* Member Price Subtitle */}
          <div
            className={`text-[10px] leading-tight pt-1 border-t ${
              isLight
                ? 'text-slate-600 border-slate-200'
                : 'text-slate-400 border-slate-800'
            }`}
          >
            {lang === 'ar'
              ? 'سعر العضو (خصم 5% — حتى مشتريات 200 ألف ج.م):'
              : 'Member price (5% off — up to 200K EGP purchases):'}
          </div>

          {/* 5% Discount Row (High Contrast in Light & Dark Mode) */}
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-extrabold ${
                isLight ? 'text-amber-900' : 'text-[#D4AF37]'
              }`}
            >
              {lang === 'ar' ? 'خصم 5%' : '5% discount'}
            </span>
            <span
              className={`font-mono-num text-sm font-extrabold ${
                isLight ? 'text-amber-900' : 'text-[#E5C158]'
              }`}
            >
              {formatEgp(pricing.memberPrice, lang)}
            </span>
          </div>

          {/* Cashback preview if eligible */}
          {product.cashbackEligible && (
            <div
              className={`flex items-center justify-between pt-1 border-t text-[11px] font-bold ${
                isLight
                  ? 'border-amber-200/80 text-emerald-800'
                  : 'border-slate-800 text-emerald-400'
              }`}
            >
              <span className="inline-flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>{lang === 'ar' ? 'استرداد كاش باك 50%:' : '50% Cashback Return:'}</span>
              </span>
              <span className="font-mono-num">{formatEgp(cashback.totalCashback, lang)}</span>
            </div>
          )}
        </div>

        {/* Action Buttons Row: Details + Add to Cart */}
        <div className="flex items-center gap-2">
          <a
            href={`/products/${product.slug}`}
            onClick={handleOpenDetails}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-extrabold text-center transition-colors ${
              isLight
                ? 'bg-amber-700 hover:bg-amber-800 text-white shadow-2xs'
                : 'bg-[#C9A45C] hover:bg-[#D4AF37] text-slate-950'
            }`}
          >
            {lang === 'ar' ? 'التفاصيل' : 'Details'}
          </a>
          <button
            type="button"
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
            className={`p-2.5 rounded-lg border transition-colors shrink-0 ${
              justAdded
                ? 'bg-emerald-600 border-emerald-600 text-white'
                : isLight
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-900'
                : 'bg-[#1A1D27] hover:bg-slate-800 border-slate-700 text-slate-200'
            }`}
          >
            {justAdded ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </article>
  );
};
