export type CategoryId =
  | 'all'
  | 'iphone'
  | 'smartphones'
  | 'laptops'
  | 'electronics'
  | 'umrah'
  | 'hajj'
  | 'domestic'
  | 'international';

export type BrandName =
  | 'All Brands'
  | 'Apple'
  | 'Samsung'
  | 'Vivo'
  | 'Redmi'
  | 'Realme'
  | 'Poco'
  | 'Lenovo'
  | 'HP'
  | 'LG'
  | 'Tornado'
  | 'MAXERO Travel';

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'cashback-desc' | 'popular';

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  nameAr: string;
  category: Exclude<CategoryId, 'all'>;
  categoryLabel: string;
  categoryLabelAr: string;
  brand: Exclude<BrandName, 'All Brands'>;
  basePrice: number;
  inStock: boolean;
  featured?: boolean;
  cashbackEligible: boolean;
  exclusiveOnly?: boolean;
  exclusiveExtraDiscount?: number;
  specs: {
    ramStorage?: string;
    display?: string;
    processor?: string;
    camera?: string;
    battery?: string;
    warranty: string;
    warrantyAr: string;
    deliveryMemberOnly: string;
    deliveryMemberOnlyAr: string;
  };
  description: string;
  descriptionAr: string;
  visualStyle: {
    deviceType: 'samsung-a' | 'samsung-s' | 'iphone-pro' | 'iphone-std' | 'vivo-aura' | 'vivo-lite' | 'xiaomi' | 'laptop' | 'appliance' | 'umrah' | 'hajj' | 'domestic' | 'international';
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    badgeText?: string;
    screenLabel: string;
  };
  createdAtOrder: number;
  popularityScore: number;
}

export interface FilterCriteria {
  category: CategoryId;
  brand: BrandName;
  searchQuery: string;
  sortBy: SortOption;
  cashbackOnly?: boolean;
}

export interface RouteState {
  page: 'home' | 'products' | 'product-detail' | 'exclusive-offers' | 'choose-product' | 'membership' | 'contact';
  productSlug?: string;
  categoryFilter?: CategoryId;
}

export const MEMBERSHIP_ANNUAL_FEE_EGP = 3000;
export const MEMBERSHIP_ANNUAL_FEE_USD = 60;
export const MEMBER_DISCOUNT_RATE = 0.05;
export const MEMBER_MAX_PURCHASE_CAP_EGP = 200000;
export const REFERRAL_LEVEL_COMMISSIONS_EGP = [500, 400, 300, 200, 100] as const;

/**
 * Calculates the 5% member price and discount amount, respecting the 200,000 EGP cap.
 */
export function calculateMemberPricing(basePrice: number): {
  basePrice: number;
  discountAmount: number;
  memberPrice: number;
  discountPercentage: number;
} {
  if (basePrice <= 0) {
    return { basePrice: 0, discountAmount: 0, memberPrice: 0, discountPercentage: 5 };
  }
  const eligibleAmount = Math.min(basePrice, MEMBER_MAX_PURCHASE_CAP_EGP);
  const memberPrice = Math.round(basePrice - eligibleAmount * MEMBER_DISCOUNT_RATE);
  const discountAmount = basePrice - memberPrice;
  return {
    basePrice,
    discountAmount,
    memberPrice,
    discountPercentage: 5,
  };
}

/**
 * Calculates the 50% Cashback Program breakdown (25% every 3 months after 3-month delivery).
 */
export function calculateCashbackProgram(basePrice: number): {
  totalCashback: number;
  firstInstallment3Months: number;
  secondInstallment6Months: number;
  netEffectiveCostForMember: number;
  deliveryMonths: number;
} {
  const { memberPrice } = calculateMemberPricing(basePrice);
  const totalCashback = Math.round(basePrice * 0.5);
  const firstInstallment3Months = Math.round(basePrice * 0.25);
  const secondInstallment6Months = totalCashback - firstInstallment3Months;
  const netEffectiveCostForMember = Math.max(0, memberPrice - totalCashback);
  return {
    totalCashback,
    firstInstallment3Months,
    secondInstallment6Months,
    netEffectiveCostForMember,
    deliveryMonths: 3,
  };
}

/**
 * Calculates 5-level referral commission earnings in EGP and USD.
 * Level 1: 500 EGP, Level 2: 400 EGP, Level 3: 300 EGP, Level 4: 200 EGP, Level 5: 100 EGP (Total 1,500 EGP per full chain).
 */
export function calculateReferralCommission(countsPerLevel: [number, number, number, number, number]): {
  byLevel: number[];
  totalEgp: number;
  totalUsd: number;
} {
  const byLevel = countsPerLevel.map((count, idx) => {
    const safeCount = Math.max(0, Math.floor(count));
    return safeCount * REFERRAL_LEVEL_COMMISSIONS_EGP[idx];
  });
  const totalEgp = byLevel.reduce((acc, val) => acc + val, 0);
  const totalUsd = Math.round((totalEgp / 50) * 100) / 100;
  return {
    byLevel,
    totalEgp,
    totalUsd,
  };
}

/**
 * Filters and sorts catalog products cleanly.
 */
export function filterAndSortProducts(
  products: ProductItem[],
  criteria: FilterCriteria
): ProductItem[] {
  const query = criteria.searchQuery.trim().toLowerCase();

  const filtered = products.filter((item) => {
    if (item.exclusiveOnly) return false;
    if (criteria.category !== 'all' && item.category !== criteria.category) {
      return false;
    }
    if (criteria.brand !== 'All Brands' && item.brand !== criteria.brand) {
      return false;
    }
    if (criteria.cashbackOnly && !item.cashbackEligible) {
      return false;
    }
    if (query.length > 0) {
      const searchable = [
        item.name,
        item.nameAr,
        item.brand,
        item.categoryLabel,
        item.categoryLabelAr,
        item.specs.ramStorage || '',
        item.description,
      ]
        .join(' ')
        .toLowerCase();
      if (!searchable.includes(query)) {
        return false;
      }
    }
    return true;
  });

  return [...filtered].sort((a, b) => {
    switch (criteria.sortBy) {
      case 'price-asc':
        return a.basePrice - b.basePrice;
      case 'price-desc':
        return b.basePrice - a.basePrice;
      case 'cashback-desc': {
        const cbA = a.cashbackEligible ? a.basePrice * 0.5 : 0;
        const cbB = b.cashbackEligible ? b.basePrice * 0.5 : 0;
        if (cbB !== cbA) return cbB - cbA;
        return b.basePrice - a.basePrice;
      }
      case 'popular':
        return b.popularityScore - a.popularityScore;
      case 'newest':
      default:
        return b.createdAtOrder - a.createdAtOrder;
    }
  });
}

/**
 * Parses URL pathname and optional search query into a deterministic RouteState.
 */
export function parseRouteFromUrl(pathname: string, search: string = ''): RouteState {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';
  const params = new URLSearchParams(search);
  const catParam = params.get('category') as CategoryId | null;

  if (cleanPath === '/' || cleanPath === '/home') {
    return { page: 'home' };
  }
  if (cleanPath === '/products') {
    return {
      page: 'products',
      categoryFilter: catParam || 'all',
    };
  }
  if (cleanPath.startsWith('/products/')) {
    const slug = decodeURIComponent(cleanPath.slice('/products/'.length));
    return {
      page: 'product-detail',
      productSlug: slug,
    };
  }
  if (cleanPath === '/exclusive-offers') {
    return { page: 'exclusive-offers' };
  }
  if (cleanPath === '/choose-product') {
    return { page: 'choose-product' };
  }
  if (cleanPath === '/membership') {
    return { page: 'membership' };
  }
  if (cleanPath === '/contact') {
    return { page: 'contact' };
  }
  return { page: 'home' };
}

/**
 * Builds a clean URL path string from a RouteState.
 */
export function buildUrlFromRoute(route: RouteState): string {
  switch (route.page) {
    case 'home':
      return '/';
    case 'products':
      if (route.categoryFilter && route.categoryFilter !== 'all') {
        return `/products?category=${encodeURIComponent(route.categoryFilter)}`;
      }
      return '/products';
    case 'product-detail':
      return `/products/${encodeURIComponent(route.productSlug || '')}`;
    case 'exclusive-offers':
      return '/exclusive-offers';
    case 'choose-product':
      return '/choose-product';
    case 'membership':
      return '/membership';
    case 'contact':
      return '/contact';
    default:
      return '/';
  }
}

export function formatEgp(amount: number, lang: 'en' | 'ar' = 'en'): string {
  const formatted = amount.toLocaleString('en-US');
  return lang === 'ar' ? `${formatted} ج.م` : `${formatted} EGP`;
}
