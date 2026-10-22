import React, { useState } from 'react';
import {
  Star,
  Check,
  AlertTriangle,
  Users,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import {
  calculateReferralCommission,
  formatEgp,
  REFERRAL_LEVEL_COMMISSIONS_EGP,
} from '../utils/pricingAndCatalog';

interface MembershipPageProps {
  theme: 'light' | 'dark';
  lang: 'en' | 'ar';
  isMember: boolean;
  onActivateMembership: (name: string, phone: string) => void;
}

export const MembershipPage: React.FC<MembershipPageProps> = ({
  theme,
  lang,
  isMember,
  onActivateMembership,
}) => {
  // 5-Level Referral Calculator state
  const [levelCounts, setLevelCounts] = useState<[number, number, number, number, number]>([
    2, 4, 8, 10, 15,
  ]);

  // Subscription Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'instapay' | 'vodafone' | 'bank' | 'usdt'>(
    'instapay'
  );
  const [transactionRef, setTransactionRef] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [subError, setSubError] = useState('');
  const [subSuccess, setSubSuccess] = useState(false);

  const isLight = theme === 'light';
  const commissionResult = calculateReferralCommission(levelCounts);

  const handleLevelChange = (index: number, value: string) => {
    const parsed = Math.max(0, Math.min(500, Number(value) || 0));
    const next = [...levelCounts] as [number, number, number, number, number];
    next[index] = parsed;
    setLevelCounts(next);
  };

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !transactionRef.trim()) {
      setSubError(
        lang === 'ar'
          ? 'يرجى إدخال الاسم بالكامل ورقم الهاتف ورقم عملية التحويل لتأكيد الاشتراك.'
          : 'Please enter your full name, phone number, and payment reference number.'
      );
      return;
    }
    setSubError('');
    setSubSuccess(true);
    onActivateMembership(fullName.trim(), phone.trim());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-extrabold ${
            isLight
              ? 'bg-amber-100 border-amber-400 text-amber-900'
              : 'bg-amber-500/15 border-amber-500/30 text-[#E5C888]'
          }`}
        >
          <Star className="w-3.5 h-3.5" />
          <span>{lang === 'ar' ? 'عضوية MAXERO السنوية' : 'MAXERO Annual Membership'}</span>
        </div>

        <h1
          className={`font-display text-3xl sm:text-5xl font-extrabold tracking-tight ${
            isLight ? 'text-slate-950' : 'text-[#E5C888]'
          }`}
        >
          {lang === 'ar'
            ? 'اشترك في عضوية MAXERO — 3,000 ج.م / 60$'
            : 'MAXERO Membership — 3,000 EGP / $60'}
        </h1>

        <p className={`text-sm sm:text-base font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          {lang === 'ar'
            ? 'اشتراك سنوي يفتح لك خصم 5% فوري حتى 200,000 ج.م، وبرنامج استرداد نقدي 50% (كاش باك)، وعمولات تسويقية عبر 5 مستويات.'
            : 'One-year subscription unlocking 5% instant discount up to 200,000 EGP, 50% product investment cashback, and 5-level referral commissions.'}
        </p>
      </div>

      {/* Top Split: Official Benefits Card + Subscription & Payment Proof Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Official Benefits Breakdown */}
        <div
          className={`lg:col-span-6 rounded-3xl border p-6 sm:p-8 space-y-6 ${
            isLight
              ? 'bg-white border-amber-500/80 shadow-md'
              : 'bg-[#12141C] border-amber-500/40'
          }`}
        >
          <div className="flex items-center justify-between border-b pb-5 border-slate-200 dark:border-slate-800">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-[#D4AF37]">
                {lang === 'ar' ? 'الباقة السنوية المعتمدة' : 'Official Annual Plan'}
              </div>
              <div
                className={`font-display text-3xl sm:text-4xl font-extrabold font-mono-num mt-1 ${
                  isLight ? 'text-slate-950' : 'text-white'
                }`}
              >
                3,000 EGP <span className="text-lg opacity-75">/ $60</span>
              </div>
            </div>
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                isLight
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : 'bg-amber-500/15 text-[#D4AF37] border border-amber-500/30'
              }`}
            >
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>

          <ul className="space-y-3.5 text-xs sm:text-sm">
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
                en: '50% marketing commission (1,500 EGP / $30 across 5 levels per referral: 500, 400, 300, 200, 100 EGP)',
                ar: '50% عمولة تسويقية (1,500 ج.م / 30$ موزعة على 5 مستويات لكل إحالة: 500، 400، 300، 200، 100 ج.م)',
              },
              {
                en: 'Membership is required for product investment (cashback)',
                ar: 'العضوية مطلوبة للاستفادة من نظام استثمار المنتج (الكاش باك)',
              },
              {
                en: 'Use marketing earnings to buy products or withdraw cash immediately',
                ar: 'استخدم أرباح التسويق لشراء منتجات أو سحبها نقداً فوراً',
              },
            ].map((benefit, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check
                  className={`w-4 h-4 shrink-0 mt-0.5 ${
                    isLight ? 'text-amber-800' : 'text-[#D4AF37]'
                  }`}
                />
                <span className={`font-semibold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                  {lang === 'ar' ? benefit.ar : benefit.en}
                </span>
              </li>
            ))}
          </ul>

          <div
            className={`p-4 rounded-2xl border text-xs flex items-start gap-2.5 ${
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
        </div>

        {/* Right: Step-by-Step Subscription & Payment Proof Submission */}
        <div
          className={`lg:col-span-6 rounded-3xl border p-6 sm:p-8 space-y-5 ${
            isLight
              ? 'bg-white border-slate-300 shadow-xs'
              : 'bg-[#12141C] border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <h2
              className={`font-display text-xl font-extrabold ${
                isLight ? 'text-slate-950' : 'text-white'
              }`}
            >
              {lang === 'ar'
                ? 'نموذج الاشتراك وإرسال إثبات الدفع'
                : 'Subscribe & Submit Payment Proof'}
            </h2>
            <CreditCard className={`w-5 h-5 ${isLight ? 'text-amber-800' : 'text-[#D4AF37]'}`} />
          </div>

          {subSuccess || isMember ? (
            <div
              className={`p-5 rounded-2xl border space-y-3 ${
                isLight
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                  : 'bg-emerald-950/40 border-emerald-600/50 text-emerald-100'
              }`}
            >
              <div className="flex items-center gap-2.5 text-base font-extrabold">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                <span>
                  {lang === 'ar'
                    ? 'عضويتك مفعلة الآن! يمكنك الاستمتاع بخصم 5% والعروض الحصرية.'
                    : 'Your MAXERO Membership is Active! Enjoy 5% Off & VIP Offers.'}
                </span>
              </div>
              <p className="text-xs leading-relaxed">
                {lang === 'ar'
                  ? 'تم تفعيل وضع العضو على حسابك. يمكنك الآن تصفح العروض الحصرية للأعضاء وطلب أي منتج بنظام الكاش باك 50%.'
                  : 'Member privileges are now unlocked across the store, including Exclusive Member Offers and 50% Cashback plans.'}
              </p>
            </div>
          ) : null}

          <form onSubmit={handleSubscribeSubmit} className="space-y-4">
            {subError && (
              <div className="p-3 rounded-xl bg-red-100 border border-red-400 text-red-950 text-xs font-bold">
                {subError}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="sub-name"
                  className={`block text-xs font-bold mb-1 ${
                    isLight ? 'text-slate-800' : 'text-slate-300'
                  }`}
                >
                  {lang === 'ar' ? 'الاسم الثلاثي *' : 'Full Name *'}
                </label>
                <input
                  id="sub-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={lang === 'ar' ? 'أحمد محمد علي' : 'Ahmed Mohamed'}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-950'
                      : 'bg-[#181B26] border-slate-700 text-white'
                  }`}
                />
              </div>

              <div>
                <label
                  htmlFor="sub-phone"
                  className={`block text-xs font-bold mb-1 ${
                    isLight ? 'text-slate-800' : 'text-slate-300'
                  }`}
                >
                  {lang === 'ar' ? 'رقم الواتساب / الموبايل *' : 'Phone / WhatsApp *'}
                </label>
                <input
                  id="sub-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01117562300"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-mono-num font-bold ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-950'
                      : 'bg-[#181B26] border-slate-700 text-white'
                  }`}
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <span
                className={`block text-xs font-bold mb-1.5 ${
                  isLight ? 'text-slate-800' : 'text-slate-300'
                }`}
              >
                {lang === 'ar'
                  ? 'وسيلة الدفع (3,000 ج.م أو 60$):'
                  : 'Payment Method (3,000 EGP / $60):'}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'instapay', label: 'InstaPay' },
                  { id: 'vodafone', label: 'Vodafone Cash' },
                  { id: 'bank', label: 'Bank Transfer' },
                  { id: 'usdt', label: 'USDT ($60)' },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id as typeof paymentMethod)}
                    className={`py-2 px-3 rounded-xl border text-xs font-extrabold transition-colors ${
                      paymentMethod === pm.id
                        ? isLight
                          ? 'bg-amber-700 text-white border-amber-800'
                          : 'bg-[#C9A45C] text-slate-950 border-amber-400'
                        : isLight
                        ? 'bg-slate-50 text-slate-800 border-slate-300'
                        : 'bg-[#181B26] text-slate-300 border-slate-700'
                    }`}
                  >
                    {pm.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="sub-ref"
                  className={`block text-xs font-bold mb-1 ${
                    isLight ? 'text-slate-800' : 'text-slate-300'
                  }`}
                >
                  {lang === 'ar'
                    ? 'رقم مرجع التحويل (إثبات الدفع) *'
                    : 'Payment Reference / Transaction ID *'}
                </label>
                <input
                  id="sub-ref"
                  type="text"
                  value={transactionRef}
                  onChange={(e) => setTransactionRef(e.target.value)}
                  placeholder="TXN-8849201"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-mono-num font-bold ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-950'
                      : 'bg-[#181B26] border-slate-700 text-white'
                  }`}
                />
              </div>

              <div>
                <label
                  htmlFor="sub-referral"
                  className={`block text-xs font-bold mb-1 ${
                    isLight ? 'text-slate-800' : 'text-slate-300'
                  }`}
                >
                  {lang === 'ar' ? 'كود الإحالة (اختياري)' : 'Referral Code (Optional)'}
                </label>
                <input
                  id="sub-referral"
                  type="text"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  placeholder="MAXERO-VIP"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-mono-num ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-950'
                      : 'bg-[#181B26] border-slate-700 text-white'
                  }`}
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-3.5 px-6 rounded-xl text-sm font-extrabold transition-colors ${
                isLight
                  ? 'bg-amber-700 hover:bg-amber-800 text-white shadow-sm'
                  : 'bg-[#C9A45C] hover:bg-[#D4AF37] text-slate-950'
              }`}
            >
              {lang === 'ar'
                ? 'تأكيد إرسال إثبات الدفع وتفعيل العضوية'
                : 'Submit Payment Proof & Activate Membership'}
            </button>
          </form>
        </div>
      </div>

      {/* Interactive 5-Level Referral Marketing Commission Calculator */}
      <div
        className={`rounded-3xl border p-6 sm:p-8 space-y-6 ${
          isLight
            ? 'bg-white border-slate-300 shadow-xs'
            : 'bg-[#12141C] border-slate-800'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4 border-slate-200 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-800 dark:text-[#D4AF37]">
              <Sparkles className="w-4 h-4" />
              <span>
                {lang === 'ar'
                  ? 'نظام العمولات التسويقية (1,500 ج.م / 30$)'
                  : '5-Level Referral Commission Simulator (1,500 EGP / $30)'}
              </span>
            </div>
            <h2
              className={`font-display text-2xl font-extrabold mt-1 ${
                isLight ? 'text-slate-950' : 'text-white'
              }`}
            >
              {lang === 'ar'
                ? 'احسب أرباحك التسويقية عبر المستويات الخمسة'
                : 'Calculate Your 5-Level Marketing Earnings'}
            </h2>
          </div>

          <div
            className={`px-5 py-3 rounded-2xl border text-right ${
              isLight
                ? 'bg-amber-50 border-amber-400 text-amber-950'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-200'
            }`}
          >
            <div className="text-xs font-bold opacity-80">
              {lang === 'ar' ? 'إجمالي الأرباح المتوقعة:' : 'Estimated Total Commission:'}
            </div>
            <div className="font-mono-num text-2xl font-extrabold">
              {formatEgp(commissionResult.totalEgp, lang)}{' '}
              <span className="text-sm opacity-80">(${commissionResult.totalUsd})</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {REFERRAL_LEVEL_COMMISSIONS_EGP.map((rateEgp, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border space-y-2 ${
                isLight
                  ? 'bg-slate-50 border-slate-300'
                  : 'bg-[#171A24] border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-extrabold">
                <span className={isLight ? 'text-slate-900' : 'text-white'}>
                  {lang === 'ar' ? `المستوى ${idx + 1}` : `Level ${idx + 1}`}
                </span>
                <span
                  className={`font-mono-num px-2 py-0.5 rounded ${
                    isLight
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-amber-500/20 text-amber-300'
                  }`}
                >
                  {rateEgp} EGP
                </span>
              </div>

              <div>
                <label
                  htmlFor={`level-input-${idx}`}
                  className={`block text-[11px] font-semibold mb-1 ${
                    isLight ? 'text-slate-600' : 'text-slate-400'
                  }`}
                >
                  {lang === 'ar' ? 'عدد المشتركين:' : 'Referred Members:'}
                </label>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    id={`level-input-${idx}`}
                    type="number"
                    min="0"
                    max="500"
                    value={levelCounts[idx]}
                    onChange={(e) => handleLevelChange(idx, e.target.value)}
                    className={`w-full px-2.5 py-1.5 rounded-lg border text-xs font-mono-num font-bold ${
                      isLight
                        ? 'bg-white border-slate-300 text-slate-950'
                        : 'bg-slate-900 border-slate-700 text-white'
                    }`}
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-bold">
                <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>
                  {lang === 'ar' ? 'الربح:' : 'Subtotal:'}
                </span>
                <span className="font-mono-num text-emerald-700 dark:text-emerald-400">
                  {formatEgp(commissionResult.byLevel[idx], lang)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
