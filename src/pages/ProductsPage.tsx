import React, { useState, useEffect } from 'react';
import {
  Search,
  LayoutGrid,
  List,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Zap,
} from 'lucide-react';
import { PRODUCTS_CATALOG } from '../data/products';
import {
  filterAndSortProducts,
  type BrandName,
  type CategoryId,
  type ProductItem,
  type RouteState,
  type SortOption,
} from '../utils/pricingAndCatalog';
import { ProductCard } from '../components/ProductCard';

interface ProductsPageProps {
  initialCategory?: CategoryId;
  theme: 'light' | 'dark';
  lang: 'en' | 'ar';
  onNavigate: (route: RouteState) => void;
  onAddToCart: (product: ProductItem) => void;
}

const CATEGORIES_LIST: { id: CategoryId; labelEn: string; labelAr: string }[] = [
  { id: 'all', labelEn: 'All', labelAr: 'الكل' },
  { id: 'iphone', labelEn: 'iPhone', labelAr: 'آيفون' },
  { id: 'smartphones', labelEn: 'Smartphones', labelAr: 'الهواتف الذكية' },
  { id: 'laptops', labelEn: 'Laptops', labelAr: 'لابتوب' },
  { id: 'electronics', labelEn: 'Electronics', labelAr: 'الأجهزة الكهربائية' },
  { id: 'umrah', labelEn: 'Umrah Trips', labelAr: 'رحلات العمرة' },
  { id: 'hajj', labelEn: 'Hajj Trips', labelAr: 'رحلات الحج' },
  { id: 'domestic', labelEn: 'Domestic Trips', labelAr: 'الرحلات الداخلية' },
  { id: 'international', labelEn: 'International Trips', labelAr: 'الرحلات الدولية' },
];

const BRANDS_LIST: BrandName[] = [
  'All Brands',
  'Samsung',
  'Apple',
  'Vivo',
  'Redmi',
  'Realme',
  'Poco',
  'Lenovo',
  'HP',
  'LG',
  'Tornado',
  'MAXERO Travel',
];

export const ProductsPage: React.FC<ProductsPageProps> = ({
  initialCategory = 'all',
  theme,
  lang,
  onNavigate,
  onAddToCart,
}) => {
  const [category, setCategory] = useState<CategoryId>(initialCategory);
  const [brand, setBrand] = useState<BrandName>('All Brands');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [cashbackOnly, setCashbackOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;
  const isLight = theme === 'light';

  useEffect(() => {
    setCategory(initialCategory);
    setCurrentPage(1);
  }, [initialCategory]);

  const filteredProducts = filterAndSortProducts(PRODUCTS_CATALOG, {
    category,
    brand,
    searchQuery,
    sortBy,
    cashbackOnly,
  });

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProducts = filteredProducts.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage
  );

  const handleSelectCategory = (cat: CategoryId) => {
    setCategory(cat);
    setCurrentPage(1);
    onNavigate({ page: 'products', categoryFilter: cat });
  };

  const handleResetFilters = () => {
    setCategory('all');
    setBrand('All Brands');
    setSearchQuery('');
    setSortBy('newest');
    setCashbackOnly(false);
    setCurrentPage(1);
    onNavigate({ page: 'products', categoryFilter: 'all' });
  };

  // Count per category for better UI organization
  const getCategoryCount = (catId: CategoryId) => {
    if (catId === 'all') return PRODUCTS_CATALOG.length;
    return PRODUCTS_CATALOG.filter((p) => p.category === catId).length;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
      {/* Page Header & Compact 5% Discount Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1
            className={`font-display text-2xl sm:text-3xl font-extrabold tracking-tight ${
              isLight ? 'text-slate-950' : 'text-[#E5C888]'
            }`}
          >
            {lang === 'ar' ? 'جميع المنتجات' : 'All Products'}
          </h1>
          <p className={`text-xs font-medium mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            {lang === 'ar'
              ? 'تصفح أحدث الهواتف والآيفون واللابتوب والأجهزة والرحلات بخصم 5% للأعضاء وكاش باك 50%'
              : 'Browse smartphones, iPhones, laptops, appliances & trips with 5% member discount & 50% cashback'}
          </p>
        </div>

        {/* Sleek Member 5% Discount Banner */}
        <div
          className={`rounded-2xl border px-4 py-3 flex flex-wrap items-center gap-4 ${
            isLight
              ? 'bg-amber-50/90 border-amber-400 text-slate-950 shadow-2xs'
              : 'bg-[#171612] border-amber-500/30 text-white'
          }`}
        >
          <div
            className={`px-3 py-1.5 rounded-xl font-display text-xl font-extrabold tabular-nums border ${
              isLight
                ? 'bg-white text-amber-900 border-amber-300'
                : 'bg-amber-500/15 text-[#E5C888] border-amber-500/30'
            }`}
          >
            5% OFF
          </div>
          <div className="text-xs space-y-0.5">
            <div className="font-extrabold flex items-center gap-1.5">
              <span>🎉</span>
              <span>
                {lang === 'ar'
                  ? 'خصم 5% لجميع الأعضاء — حتى مشتريات 200,000 ج.م'
                  : '5% Discount for All Members — up to 200,000 EGP purchases'}
              </span>
            </div>
            <div className={`text-[11px] font-medium flex items-center gap-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              <Zap className={`w-3 h-3 ${isLight ? 'text-amber-700' : 'text-amber-400'}`} />
              <span>
                {lang === 'ar'
                  ? 'اشترك مقابل 3,000 ج.م واستمتع بالخصم والكاش باك لمدة عام كامل'
                  : 'Subscribe for 3,000 EGP/year and unlock 5% instant off + 50% cashback'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Organized Search, Sort, View & Filters Toolbar */}
      <div
        className={`rounded-2xl border p-4 sm:p-5 space-y-4 ${
          isLight
            ? 'bg-white border-slate-300 shadow-2xs'
            : 'bg-[#12141C] border-slate-800'
        }`}
      >
        {/* Top Row: Search Input + Cashback Filter + Sort Dropdown + Grid/List View */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search
              className={`w-4 h-4 absolute top-1/2 -translate-y-1/2 ${
                lang === 'ar' ? 'right-3.5' : 'left-3.5'
              } ${isLight ? 'text-slate-500' : 'text-slate-400'}`}
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={
                lang === 'ar'
                  ? 'ابحث عن موبايل، آيفون، لابتوب، عمرة...'
                  : 'Search products by name, brand, or specs...'
              }
              aria-label="Search products"
              className={`w-full py-2.5 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                lang === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'
              } ${
                isLight
                  ? 'bg-slate-50 border-slate-300 text-slate-950 placeholder:text-slate-500'
                  : 'bg-[#181B26] border-slate-700 text-white placeholder:text-slate-400'
              }`}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Cashback Only Quick Toggle */}
            <button
              type="button"
              onClick={() => {
                setCashbackOnly(!cashbackOnly);
                setCurrentPage(1);
              }}
              className={`px-3.5 py-2.5 rounded-xl border text-xs font-extrabold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                cashbackOnly
                  ? isLight
                    ? 'bg-amber-700 text-white border-amber-800'
                    : 'bg-[#C9A45C] text-slate-950 border-amber-400'
                  : isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                  : 'bg-[#181B26] hover:bg-slate-800 text-slate-200 border-slate-700'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'منتجات الكاش باك 50%' : '50% Cashback Eligible'}</span>
            </button>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              aria-label="Sort products"
              className={`px-3.5 py-2.5 rounded-xl border text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                isLight
                  ? 'bg-slate-100 border-slate-300 text-slate-900'
                  : 'bg-[#181B26] border-slate-700 text-slate-100'
              }`}
            >
              <option value="newest">{lang === 'ar' ? 'الأحدث أولاً' : 'Newest'}</option>
              <option value="popular">{lang === 'ar' ? 'الأكثر طلباً' : 'Most Popular'}</option>
              <option value="price-asc">
                {lang === 'ar' ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}
              </option>
              <option value="price-desc">
                {lang === 'ar' ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}
              </option>
              <option value="cashback-desc">
                {lang === 'ar' ? 'أعلى قيمة كاش باك' : 'Highest Cashback Value'}
              </option>
            </select>

            {/* Grid / List View Switcher */}
            <div
              className={`inline-flex items-center rounded-xl border p-0.5 ${
                isLight ? 'bg-slate-100 border-slate-300' : 'bg-[#181B26] border-slate-700'
              }`}
            >
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                aria-label="Grid View"
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? isLight
                      ? 'bg-amber-700 text-white'
                      : 'bg-[#C9A45C] text-slate-950'
                    : isLight
                    ? 'text-slate-700 hover:text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                aria-label="List View"
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? isLight
                      ? 'bg-amber-700 text-white'
                      : 'bg-[#C9A45C] text-slate-950'
                    : isLight
                    ? 'text-slate-700 hover:text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs (with item counts) */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
          {CATEGORIES_LIST.map((cat) => {
            const active = category === cat.id;
            const count = getCategoryCount(cat.id);
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleSelectCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition-colors whitespace-nowrap inline-flex items-center gap-1.5 border ${
                  active
                    ? isLight
                      ? 'bg-amber-700 text-white border-amber-800 shadow-2xs'
                      : 'bg-[#C9A45C] text-slate-950 border-amber-400'
                    : isLight
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                    : 'bg-[#171A24] hover:bg-slate-800 text-slate-300 border-slate-800'
                }`}
              >
                <span>{lang === 'ar' ? cat.labelAr : cat.labelEn}</span>
                <span
                  className={`text-[10px] font-mono-num px-1.5 py-0.2 rounded ${
                    active
                      ? isLight
                        ? 'bg-amber-900/40 text-white'
                        : 'bg-slate-950/20 text-slate-950'
                      : isLight
                      ? 'bg-white text-slate-700'
                      : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Brand Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {BRANDS_LIST.map((b) => {
            const active = brand === b;
            return (
              <button
                key={b}
                type="button"
                onClick={() => {
                  setBrand(b);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors whitespace-nowrap border ${
                  active
                    ? isLight
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-[#C9A45C] text-slate-950 border-amber-400'
                    : isLight
                    ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                    : 'bg-[#161822] hover:bg-slate-800 text-slate-300 border-slate-800'
                }`}
              >
                {b === 'All Brands' && lang === 'ar' ? 'جميع الماركات' : b}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count & Pagination Status Bar */}
      <div className="flex items-center justify-between text-xs font-bold">
        <span className={isLight ? 'text-slate-700' : 'text-slate-400'}>
          {lang === 'ar'
            ? `${filteredProducts.length} منتج متاح`
            : `${filteredProducts.length} products`}
        </span>
        <span className={isLight ? 'text-slate-700' : 'text-slate-400'}>
          {lang === 'ar'
            ? `صفحة ${safePage} من ${totalPages}`
            : `Page ${safePage} of ${totalPages}`}
        </span>
      </div>

      {/* Product Grid or Empty State */}
      {paginatedProducts.length === 0 ? (
        <div
          className={`rounded-2xl border p-12 text-center space-y-4 ${
            isLight ? 'bg-white border-slate-300' : 'bg-[#12141C] border-slate-800'
          }`}
        >
          <p className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {lang === 'ar'
              ? 'لا توجد منتجات مطابقة لبحثك الحالي'
              : 'No products match your current filter selection'}
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold inline-flex items-center gap-2 ${
              isLight
                ? 'bg-amber-700 text-white hover:bg-amber-800'
                : 'bg-[#C9A45C] text-slate-950 hover:bg-[#D4AF37]'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>{lang === 'ar' ? 'إعادة ضبط الفلاتر' : 'Reset All Filters'}</span>
          </button>
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'
              : 'space-y-4'
          }
        >
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              theme={theme}
              lang={lang}
              viewMode={viewMode}
              onNavigate={onNavigate}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 pt-4">
          <button
            type="button"
            disabled={safePage <= 1}
            onClick={() => {
              setCurrentPage((p) => Math.max(1, p - 1));
              window.scrollTo({ top: 220, behavior: 'smooth' });
            }}
            aria-label="Previous Page"
            className={`w-9 h-9 rounded-lg border flex items-center justify-center disabled:opacity-40 ${
              isLight
                ? 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100'
                : 'bg-[#12141C] border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => {
                setCurrentPage(pageNum);
                window.scrollTo({ top: 220, behavior: 'smooth' });
              }}
              className={`w-9 h-9 rounded-lg border text-xs font-extrabold font-mono-num transition-colors ${
                safePage === pageNum
                  ? isLight
                    ? 'bg-amber-700 text-white border-amber-800'
                    : 'bg-[#C9A45C] text-slate-950 border-amber-400'
                  : isLight
                  ? 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100'
                  : 'bg-[#12141C] border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            type="button"
            disabled={safePage >= totalPages}
            onClick={() => {
              setCurrentPage((p) => Math.min(totalPages, p + 1));
              window.scrollTo({ top: 220, behavior: 'smooth' });
            }}
            aria-label="Next Page"
            className={`w-9 h-9 rounded-lg border flex items-center justify-center disabled:opacity-40 ${
              isLight
                ? 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100'
                : 'bg-[#12141C] border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
