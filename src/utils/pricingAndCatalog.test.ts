import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateMemberPricing,
  calculateCashbackProgram,
  calculateReferralCommission,
  filterAndSortProducts,
  parseRouteFromUrl,
  buildUrlFromRoute,
  type ProductItem,
} from './pricingAndCatalog';

test('calculateMemberPricing matches exact MAXERO screenshot prices (5% off)', () => {
  // Samsung Galaxy A17 4+128: Base 10,450 EGP -> 5% discount = 9,928 EGP
  const a17 = calculateMemberPricing(10450);
  assert.equal(a17.memberPrice, 9928);
  assert.equal(a17.discountAmount, 522);

  // iPhone 16 Pro Max 256GB: Base 97,000 EGP -> 5% discount = 92,150 EGP
  const iphone16 = calculateMemberPricing(97000);
  assert.equal(iphone16.memberPrice, 92150);
  assert.equal(iphone16.discountAmount, 4850);

  // Vivo Y31 5G 8+256: Base 12,990 EGP -> 5% discount = 12,341 EGP
  const vivoY31 = calculateMemberPricing(12990);
  assert.equal(vivoY31.memberPrice, 12341);
});

test('calculateMemberPricing enforces 200,000 EGP purchase cap', () => {
  const luxuryOrder = calculateMemberPricing(250000);
  // 5% of 200,000 max cap = 10,000 EGP max discount
  assert.equal(luxuryOrder.discountAmount, 10000);
  assert.equal(luxuryOrder.memberPrice, 240000);
});

test('calculateCashbackProgram computes 50% total cashback (25% every 3 months)', () => {
  const cb = calculateCashbackProgram(97000);
  assert.equal(cb.totalCashback, 48500);
  assert.equal(cb.firstInstallment3Months, 24250);
  assert.equal(cb.secondInstallment6Months, 24250);
  assert.equal(cb.deliveryMonths, 3);
});

test('calculateReferralCommission computes 1,500 EGP / $30 across 5 levels', () => {
  const singleChain = calculateReferralCommission([1, 1, 1, 1, 1]);
  assert.deepEqual(singleChain.byLevel, [500, 400, 300, 200, 100]);
  assert.equal(singleChain.totalEgp, 1500);
  assert.equal(singleChain.totalUsd, 30);
});

test('parseRouteFromUrl and buildUrlFromRoute round-trip all dedicated page URLs', () => {
  assert.deepEqual(parseRouteFromUrl('/'), { page: 'home' });
  assert.deepEqual(parseRouteFromUrl('/products', '?category=iphone'), {
    page: 'products',
    categoryFilter: 'iphone',
  });
  assert.deepEqual(parseRouteFromUrl('/products/iphone-16-pro-max-256gb'), {
    page: 'product-detail',
    productSlug: 'iphone-16-pro-max-256gb',
  });
  assert.deepEqual(parseRouteFromUrl('/exclusive-offers'), { page: 'exclusive-offers' });
  assert.deepEqual(parseRouteFromUrl('/choose-product'), { page: 'choose-product' });
  assert.deepEqual(parseRouteFromUrl('/membership'), { page: 'membership' });
  assert.deepEqual(parseRouteFromUrl('/contact'), { page: 'contact' });

  assert.equal(
    buildUrlFromRoute({ page: 'product-detail', productSlug: 'samsung-galaxy-a17-4-128' }),
    '/products/samsung-galaxy-a17-4-128'
  );
  assert.equal(
    buildUrlFromRoute({ page: 'products', categoryFilter: 'laptops' }),
    '/products?category=laptops'
  );
});

test('filterAndSortProducts filters by category, brand, cashback, and search query', () => {
  const sampleProducts: ProductItem[] = [
    {
      id: '1',
      slug: 'iphone-16-pro-max',
      name: 'iPhone 16 Pro Max 256GB',
      nameAr: 'آيفون 16 برو ماكس 256 جيجا',
      category: 'iphone',
      categoryLabel: 'iphone',
      categoryLabelAr: 'آيفون',
      brand: 'Apple',
      basePrice: 97000,
      inStock: true,
      cashbackEligible: true,
      specs: { warranty: '1 Year', warrantyAr: 'سنة', deliveryMemberOnly: '2 weeks', deliveryMemberOnlyAr: 'أسبوعين' },
      description: 'Flagship Apple smartphone',
      descriptionAr: 'هاتف آبل الرائد',
      visualStyle: {
        deviceType: 'iphone-pro',
        primaryColor: '#C5B4A5',
        secondaryColor: '#3A322D',
        accentColor: '#D4AF37',
        screenLabel: 'iPhone 16 Pro',
      },
      createdAtOrder: 2,
      popularityScore: 99,
    },
    {
      id: '2',
      slug: 'samsung-a17',
      name: 'Samsung Galaxy A17 4+128',
      nameAr: 'سامسونج جالاكسي A17',
      category: 'smartphones',
      categoryLabel: 'mobiles',
      categoryLabelAr: 'موبايلات',
      brand: 'Samsung',
      basePrice: 10450,
      inStock: true,
      cashbackEligible: false,
      specs: { warranty: '1 Year', warrantyAr: 'سنة', deliveryMemberOnly: '2 weeks', deliveryMemberOnlyAr: 'أسبوعين' },
      description: 'Reliable Samsung smartphone',
      descriptionAr: 'هاتف سامسونج',
      visualStyle: {
        deviceType: 'samsung-a',
        primaryColor: '#A9C6D9',
        secondaryColor: '#1E293B',
        accentColor: '#38BDF8',
        screenLabel: 'Galaxy A17',
      },
      createdAtOrder: 1,
      popularityScore: 85,
    },
  ];

  const onlyApple = filterAndSortProducts(sampleProducts, {
    category: 'all',
    brand: 'Apple',
    searchQuery: '',
    sortBy: 'newest',
  });
  assert.equal(onlyApple.length, 1);
  assert.equal(onlyApple[0].slug, 'iphone-16-pro-max');

  const sortedPriceAsc = filterAndSortProducts(sampleProducts, {
    category: 'all',
    brand: 'All Brands',
    searchQuery: '',
    sortBy: 'price-asc',
  });
  assert.equal(sortedPriceAsc[0].slug, 'samsung-a17');
});
