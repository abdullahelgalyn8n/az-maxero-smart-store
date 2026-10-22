import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import {
  calculateMemberPricing,
  calculateCashbackProgram,
  formatEgp,
  type ProductItem,
} from '../utils/pricingAndCatalog';

export interface CartItem {
  product: ProductItem;
  quantity: number;
  plan: 'standard' | 'member' | 'cashback';
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
  lang: 'en' | 'ar';
  items: CartItem[];
  isMember: boolean;
  onUpdateQty: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onToggleMemberPricing: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  theme,
  lang,
  items,
  isMember,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onToggleMemberPricing,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [checkoutError, setCheckoutError] = useState('');
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);

  if (!isOpen) return null;

  const isLight = theme === 'light';

  const baseSubtotal = items.reduce(
    (sum, item) => sum + item.product.basePrice * item.quantity,
    0
  );
  const memberPricing = calculateMemberPricing(baseSubtotal);
  const activeTotal = isMember ? memberPricing.memberPrice : baseSubtotal;

  const totalEligibleCashback = items.reduce((sum, item) => {
    if (!item.product.cashbackEligible) return sum;
    return sum + calculateCashbackProgram(item.product.basePrice).totalCashback * item.quantity;
  }, 0);

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      setCheckoutError(
        lang === 'ar'
          ? 'يرجى إدخال الاسم ورقم الهاتف والعنوان لإتمام الطلب.'
          : 'Please enter your name, phone number, and delivery address.'
      );
      return;
    }
    setCheckoutError('');
    setConfirmedOrderId(`MX-${Math.floor(10000 + Math.random() * 90000)}`);
    onClearCart();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart"
    >
      <div
        className={`w-full max-w-md h-full flex flex-col justify-between border-l overflow-y-auto ${
          isLight
            ? 'bg-white border-slate-300 text-slate-950'
            : 'bg-[#10121A] border-slate-800 text-white'
        }`}
      >
        {/* Top Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className={`w-5 h-5 ${isLight ? 'text-amber-800' : 'text-[#D4AF37]'}`} />
            <h2 className="font-display text-lg font-extrabold">
              {lang === 'ar' ? 'سلة التسوق' : 'Shopping Cart'} ({items.length})
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              setConfirmedOrderId(null);
              onClose();
            }}
            aria-label="Close Cart"
            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex-1 p-5 space-y-4 overflow-y-auto">
          {confirmedOrderId ? (
            <div
              className={`p-6 rounded-2xl border text-center space-y-4 ${
                isLight
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                  : 'bg-emerald-950/30 border-emerald-700/50 text-emerald-100'
              }`}
            >
              <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-display text-xl font-extrabold">
                {lang === 'ar'
                  ? `تم تأكيد طلبك بنجاح رقم #${confirmedOrderId}`
                  : `Order #${confirmedOrderId} Confirmed!`}
              </h3>
              <p className="text-xs leading-relaxed">
                {lang === 'ar'
                  ? 'شكراً لثقتك في MAXERO! سيتواصل معك قسم المبيعات لتأكيد موعد التسليم وإجراءات الضمان والكاش باك.'
                  : 'Thank you for shopping with MAXERO! Our team will contact you via WhatsApp shortly to coordinate delivery.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setConfirmedOrderId(null);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-xl bg-emerald-700 text-white text-xs font-extrabold"
              >
                {lang === 'ar' ? 'متابعة التسوق' : 'Continue Shopping'}
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 mx-auto opacity-30" />
              <p className="text-sm font-bold opacity-75">
                {lang === 'ar' ? 'سلة التسوق فارغة حالياً' : 'Your shopping cart is empty'}
              </p>
            </div>
          ) : (
            <>
              {/* Member 5% Discount Switcher inside Cart */}
              <div
                className={`p-3.5 rounded-xl border flex items-center justify-between gap-2 text-xs ${
                  isMember
                    ? isLight
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                      : 'bg-emerald-950/30 border-emerald-700/50 text-emerald-200'
                    : isLight
                    ? 'bg-amber-50 border-amber-400 text-amber-950'
                    : 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                }`}
              >
                <div className="flex items-center gap-2 font-bold">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>
                    {isMember
                      ? lang === 'ar'
                        ? 'خصم العضوية 5% مطبق على سلتك!'
                        : '5% Member Discount Applied!'
                      : lang === 'ar'
                      ? 'فعل عضوية MAXERO لتوفير 5% فوري'
                      : 'Enable Member Mode to save 5%'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onToggleMemberPricing}
                  className="underline font-extrabold whitespace-nowrap"
                >
                  {isMember
                    ? lang === 'ar'
                      ? 'إلغاء'
                      : 'Disable'
                    : lang === 'ar'
                    ? 'تفعيل الخصم'
                    : 'Apply 5% Off'}
                </button>
              </div>

              {/* Cart Items List */}
              <div className="space-y-3">
                {items.map((item) => {
                  const itemPricing = calculateMemberPricing(item.product.basePrice);
                  const unitPrice = isMember ? itemPricing.memberPrice : item.product.basePrice;
                  return (
                    <div
                      key={item.product.id}
                      className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
                        isLight
                          ? 'bg-slate-50 border-slate-300'
                          : 'bg-[#171A24] border-slate-800'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-extrabold truncate">
                          {lang === 'ar' ? item.product.nameAr : item.product.name}
                        </div>
                        <div className="font-mono-num text-xs font-bold text-amber-800 dark:text-[#E5C158] mt-0.5">
                          {formatEgp(unitPrice, lang)} × {item.quantity}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.product.id, -1)}
                          aria-label="Decrease quantity"
                          className="w-7 h-7 rounded border border-slate-300 dark:border-slate-700 flex items-center justify-center"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono-num text-xs font-bold w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.product.id, 1)}
                          aria-label="Increase quantity"
                          className="w-7 h-7 rounded border border-slate-300 dark:border-slate-700 flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.product.id)}
                          aria-label="Remove item"
                          className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Totals & Cashback Summary */}
              <div
                className={`p-4 rounded-2xl border space-y-2 text-xs ${
                  isLight ? 'bg-slate-100 border-slate-300' : 'bg-[#151822] border-slate-800'
                }`}
              >
                <div className="flex justify-between">
                  <span>{lang === 'ar' ? 'الإجمالي الأساسي:' : 'Base Subtotal:'}</span>
                  <span className="font-mono-num font-bold">{formatEgp(baseSubtotal, lang)}</span>
                </div>
                {isMember && (
                  <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-bold">
                    <span>{lang === 'ar' ? 'خصم العضوية (5%):' : 'Member 5% Savings:'}</span>
                    <span className="font-mono-num">
                      -{formatEgp(memberPricing.discountAmount, lang)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-extrabold pt-2 border-t border-slate-300 dark:border-slate-700">
                  <span>{lang === 'ar' ? 'الإجمالي المطلوب:' : 'Total Due:'}</span>
                  <span className="font-mono-num text-amber-800 dark:text-[#E5C158]">
                    {formatEgp(activeTotal, lang)}
                  </span>
                </div>
                {totalEligibleCashback > 0 && (
                  <div className="flex justify-between text-[11px] font-bold text-emerald-700 dark:text-emerald-400 pt-1">
                    <span className="inline-flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>
                        {lang === 'ar' ? 'إجمالي الكاش باك المستحق (50%):' : 'Eligible 50% Cashback:'}
                      </span>
                    </span>
                    <span className="font-mono-num">
                      +{formatEgp(totalEligibleCashback, lang)}
                    </span>
                  </div>
                )}
              </div>

              {/* Customer Checkout Form */}
              <form onSubmit={handleCompleteOrder} className="space-y-3 pt-2">
                <h3 className="text-xs font-extrabold uppercase tracking-wider">
                  {lang === 'ar' ? 'بيانات التوصيل والتأكيد' : 'Delivery & Order Verification'}
                </h3>
                {checkoutError && (
                  <div className="p-2.5 rounded-lg bg-red-100 border border-red-400 text-red-950 text-xs font-bold">
                    {checkoutError}
                  </div>
                )}
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={lang === 'ar' ? 'الاسم بالكامل *' : 'Full Name *'}
                  aria-label="Customer Full Name"
                  className={`w-full px-3 py-2 rounded-xl border text-xs font-medium ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-950'
                      : 'bg-slate-900 border-slate-700 text-white'
                  }`}
                />
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder={lang === 'ar' ? 'رقم الموبايل / واتساب *' : 'Phone / WhatsApp *'}
                  aria-label="Customer Phone Number"
                  className={`w-full px-3 py-2 rounded-xl border text-xs font-mono-num font-bold ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-950'
                      : 'bg-slate-900 border-slate-700 text-white'
                  }`}
                />
                <input
                  type="text"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder={lang === 'ar' ? 'العنوان بالتفصيل والمحافظة *' : 'Full Delivery Address *'}
                  aria-label="Delivery Address"
                  className={`w-full px-3 py-2 rounded-xl border text-xs font-medium ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-950'
                      : 'bg-slate-900 border-slate-700 text-white'
                  }`}
                />
                <button
                  type="submit"
                  className={`w-full py-3 px-4 rounded-xl text-xs font-extrabold transition-colors ${
                    isLight
                      ? 'bg-amber-700 hover:bg-amber-800 text-white'
                      : 'bg-[#C9A45C] hover:bg-[#D4AF37] text-slate-950'
                  }`}
                >
                  {lang === 'ar' ? 'تأكيد وإرسال الطلب الآن' : 'Confirm & Place Order'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
