import React, { useState, useEffect, useCallback } from 'react';
import {
  parseRouteFromUrl,
  buildUrlFromRoute,
  type ProductItem,
  type RouteState,
} from './utils/pricingAndCatalog';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ExclusiveOffersPage } from './pages/ExclusiveOffersPage';
import { ChooseProductPage } from './pages/ChooseProductPage';
import { MembershipPage } from './pages/MembershipPage';
import { ContactPage } from './pages/ContactPage';
import { CartDrawer, type CartItem } from './components/CartDrawer';
import { LoginModal } from './components/LoginModal';

export default function App() {
  const [route, setRoute] = useState<RouteState>(() =>
    parseRouteFromUrl(window.location.pathname, window.location.search)
  );

  // Default to high-contrast Light Mode (White Mode) to directly address the user's contrast request,
  // while supporting instant 1-click toggle to Dark Mode or URL ?theme=dark
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('theme') === 'dark') return 'dark';
    return 'light';
  });

  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [isMember, setIsMember] = useState<boolean>(false);
  const [memberName, setMemberName] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);

  // Sync theme & RTL attributes on document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [theme, lang]);

  // Listen to browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseRouteFromUrl(window.location.pathname, window.location.search));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = useCallback((nextRoute: RouteState) => {
    setRoute(nextRoute);
    const nextUrl = buildUrlFromRoute(nextRoute);
    if (window.location.pathname + window.location.search !== nextUrl) {
      window.history.pushState({}, '', nextUrl);
    }
  }, []);

  const handleAddToCart = useCallback(
    (product: ProductItem, plan: 'standard' | 'member' | 'cashback' = 'member') => {
      setCartItems((prev) => {
        const existingIndex = prev.findIndex((i) => i.product.id === product.id);
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + 1,
          };
          return updated;
        }
        return [...prev, { product, quantity: 1, plan }];
      });
    },
    []
  );

  const handleUpdateCartQty = useCallback((productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const handleRemoveCartItem = useCallback((productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors ${
        theme === 'light'
          ? 'bg-[#F8F9FA] text-slate-950'
          : 'bg-[#0B0C10] text-slate-100'
      }`}
    >
      <Navbar
        currentRoute={route}
        onNavigate={handleNavigate}
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
        lang={lang}
        onToggleLang={() => setLang((prev) => (prev === 'en' ? 'ar' : 'en'))}
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        isMember={isMember}
        memberName={memberName}
        onOpenLogin={() => setLoginOpen(true)}
        onToggleDemoMember={() => {
          setIsMember((prev) => {
            const next = !prev;
            setMemberName(next ? 'VIP Member' : null);
            return next;
          });
        }}
      />

      <main className="flex-1">
        {route.page === 'home' && (
          <HomePage
            theme={theme}
            lang={lang}
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
          />
        )}

        {route.page === 'products' && (
          <ProductsPage
            initialCategory={route.categoryFilter || 'all'}
            theme={theme}
            lang={lang}
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
          />
        )}

        {route.page === 'product-detail' && (
          <ProductDetailPage
            productSlug={route.productSlug || 'iphone-16-pro-max-256gb'}
            theme={theme}
            lang={lang}
            isMember={isMember}
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
          />
        )}

        {route.page === 'exclusive-offers' && (
          <ExclusiveOffersPage
            theme={theme}
            lang={lang}
            isMember={isMember}
            onNavigate={handleNavigate}
            onOpenLogin={() => setLoginOpen(true)}
            onToggleDemoMember={() => {
              setIsMember((prev) => {
                const next = !prev;
                setMemberName(next ? 'VIP Member' : null);
                return next;
              });
            }}
            onAddToCart={handleAddToCart}
          />
        )}

        {route.page === 'choose-product' && (
          <ChooseProductPage theme={theme} lang={lang} />
        )}

        {route.page === 'membership' && (
          <MembershipPage
            theme={theme}
            lang={lang}
            isMember={isMember}
            onActivateMembership={(name) => {
              setIsMember(true);
              setMemberName(name);
            }}
          />
        )}

        {route.page === 'contact' && <ContactPage theme={theme} lang={lang} />}
      </main>

      <Footer theme={theme} lang={lang} onNavigate={handleNavigate} />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        theme={theme}
        lang={lang}
        items={cartItems}
        isMember={isMember}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
        onToggleMemberPricing={() => {
          setIsMember((prev) => {
            const next = !prev;
            setMemberName(next ? 'VIP Member' : null);
            return next;
          });
        }}
      />

      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        theme={theme}
        lang={lang}
        onLoginSuccess={(name) => {
          setIsMember(true);
          setMemberName(name);
        }}
      />
    </div>
  );
}
