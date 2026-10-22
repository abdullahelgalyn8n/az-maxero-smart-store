import React, { useState } from 'react';
import {
  ShoppingBag,
  Sparkles,
  CheckCircle2,
  Calculator,
  Clock,
  Send,
  AlertCircle,
} from 'lucide-react';
import {
  calculateMemberPricing,
  calculateCashbackProgram,
  formatEgp,
} from '../utils/pricingAndCatalog';

interface CustomProductRequest {
  id: string;
  productName: string;
  category: string;
  estimatedPrice: number;
  planType: 'member-discount' | 'cashback-50';
  customerPhone: string;
  referenceUrl?: string;
  notes?: string;
  status: string;
  submittedAt: string;
}

interface ChooseProductPageProps {
  theme: 'light' | 'dark';
  lang: 'en' | 'ar';
}

export const ChooseProductPage: React.FC<ChooseProductPageProps> = ({ theme, lang }) => {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('Smartphones & iPhone');
  const [estimatedPriceStr, setEstimatedPriceStr] = useState('35000');
  const [planType, setPlanType] = useState<'member-discount' | 'cashback-50'>('cashback-50');
  const [customerPhone, setCustomerPhone] = useState('');
  const [referenceUrl, setReferenceUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');
  const [requests, setRequests] = useState<CustomProductRequest[]>([
    {
      id: 'REQ-9041',
      productName: 'Sony PlayStation 5 Pro 2TB Digital Edition',
      category: 'Electronics & Gaming',
      estimatedPrice: 44000,
      planType: 'cashback-50',
      customerPhone: '0109XXXX412',
      status: 'Approved — Ready for Member Order',
      submittedAt: '2 hours ago',
    },
  ]);

  const isLight = theme === 'light';
  const numericPrice = Math.max(0, Number(estimatedPriceStr) || 0);
  const memberCalc = calculateMemberPricing(numericPrice);
  const cashbackCalc = calculateCashbackProgram(numericPrice);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim() || !customerPhone.trim() || numericPrice <= 0) {
      setFormError(
        lang === 'ar'
          ? 'يرجى إدخال اسم المنتج المطلوب والسعر التقريبي ورقم الواتساب للتواصل.'
          : 'Please enter the requested product name, estimated price, and your WhatsApp number.'
      );
      return;
    }
    setFormError('');

    const newReq: CustomProductRequest = {
      id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      productName: productName.trim(),
      category,
      estimatedPrice: numericPrice,
      planType,
      customerPhone: customerPhone.trim(),
      referenceUrl: referenceUrl.trim() || undefined,
      notes: notes.trim() || undefined,
      status: lang === 'ar' ? 'قيد المراجعة التسعيرية (رد خلال 24 ساعة)' : 'Under Pricing Review (Reply within 24h)',
      submittedAt: lang === 'ar' ? 'الآن' : 'Just now',
    };

    setRequests([newReq, ...requests]);
    setProductName('');
    setReferenceUrl('');
    setNotes('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-extrabold ${
            isLight
              ? 'bg-amber-100 border-amber-400 text-amber-900'
              : 'bg-amber-500/15 border-amber-500/30 text-[#E5C888]'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>{lang === 'ar' ? 'اطلب أي منتج خاص' : 'Request Custom Product'}</span>
        </div>

        <h1
          className={`font-display text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isLight ? 'text-slate-950' : 'text-white'
          }`}
        >
          {lang === 'ar'
            ? 'اختر منتجك الخاص غير المعروض بالموقع'
            : "Choose Any Product & We'll Provide It"}
        </h1>

        <p className={`text-sm font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          {lang === 'ar'
            ? 'اطلب أي هاتف، لابتوب، جهاز منزلي أو باقة سفر غير موجودة في الكتالوج وسنقوم بتوفيرها لك بنفس مزايا العضوية (خصم 5% + كاش باك 50%).'
            : "Request any smartphone, laptop, home appliance, or trip not listed on our site and we'll source it with full MAXERO member benefits."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Custom Product Request Form */}
        <form
          onSubmit={handleSubmit}
          className={`lg:col-span-7 rounded-3xl border p-6 sm:p-8 space-y-5 ${
            isLight
              ? 'bg-white border-slate-300 shadow-xs'
              : 'bg-[#12141C] border-slate-800'
          }`}
        >
          <h2
            className={`font-display text-xl font-extrabold ${
              isLight ? 'text-slate-950' : 'text-white'
            }`}
          >
            {lang === 'ar' ? 'بيانات المنتج المطلوب' : 'Custom Product Request Form'}
          </h2>

          {formError && (
            <div className="p-3.5 rounded-xl bg-red-100 border border-red-400 text-red-950 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-700" />
              <span>{formError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="custom-prod-name"
                className={`block text-xs font-bold mb-1.5 ${
                  isLight ? 'text-slate-800' : 'text-slate-300'
                }`}
              >
                {lang === 'ar' ? 'اسم وموديل المنتج *' : 'Product Name & Model *'}
              </label>
              <input
                id="custom-prod-name"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder={
                  lang === 'ar'
                    ? 'مثال: iPad Pro M4 256GB أو غسالة إل جي...'
                    : 'e.g., iPad Pro M4 256GB or Dyson V15...'
                }
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  isLight
                    ? 'bg-slate-50 border-slate-300 text-slate-950'
                    : 'bg-[#181B26] border-slate-700 text-white'
                }`}
              />
            </div>

            <div>
              <label
                htmlFor="custom-prod-cat"
                className={`block text-xs font-bold mb-1.5 ${
                  isLight ? 'text-slate-800' : 'text-slate-300'
                }`}
              >
                {lang === 'ar' ? 'القسم / الفئة' : 'Product Category'}
              </label>
              <select
                id="custom-prod-cat"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  isLight
                    ? 'bg-slate-50 border-slate-300 text-slate-950'
                    : 'bg-[#181B26] border-slate-700 text-white'
                }`}
              >
                <option value="Smartphones & iPhone">
                  {lang === 'ar' ? 'هواتف ذكية وآيفون' : 'Smartphones & iPhone'}
                </option>
                <option value="Laptops & Tablets">
                  {lang === 'ar' ? 'لابتوب وتابلت' : 'Laptops & Tablets'}
                </option>
                <option value="Home Appliances & TV">
                  {lang === 'ar' ? 'أجهزة منزلية وشاشات' : 'Home Appliances & TV'}
                </option>
                <option value="Umrah, Hajj & Travel">
                  {lang === 'ar' ? 'رحلات عمرة وسياحة' : 'Umrah, Hajj & Travel'}
                </option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="custom-prod-price"
                className={`block text-xs font-bold mb-1.5 ${
                  isLight ? 'text-slate-800' : 'text-slate-300'
                }`}
              >
                {lang === 'ar'
                  ? 'السعر السوقي التقريبي (ج.م) *'
                  : 'Estimated Market Price (EGP) *'}
              </label>
              <input
                id="custom-prod-price"
                type="number"
                min="500"
                step="100"
                value={estimatedPriceStr}
                onChange={(e) => setEstimatedPriceStr(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-mono-num font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  isLight
                    ? 'bg-slate-50 border-slate-300 text-slate-950'
                    : 'bg-[#181B26] border-slate-700 text-white'
                }`}
              />
            </div>

            <div>
              <label
                htmlFor="custom-prod-phone"
                className={`block text-xs font-bold mb-1.5 ${
                  isLight ? 'text-slate-800' : 'text-slate-300'
                }`}
              >
                {lang === 'ar' ? 'رقم الهاتف / واتساب *' : 'WhatsApp / Phone Number *'}
              </label>
              <input
                id="custom-prod-phone"
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="010XXXXXXXX"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-mono-num font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  isLight
                    ? 'bg-slate-50 border-slate-300 text-slate-950'
                    : 'bg-[#181B26] border-slate-700 text-white'
                }`}
              />
            </div>
          </div>

          {/* Plan Selection */}
          <div>
            <span
              className={`block text-xs font-bold mb-2 ${
                isLight ? 'text-slate-800' : 'text-slate-300'
              }`}
            >
              {lang === 'ar' ? 'نظام الشراء المطلوب:' : 'Preferred Purchase Plan:'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPlanType('cashback-50')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  planType === 'cashback-50'
                    ? isLight
                      ? 'bg-amber-700 text-white border-amber-800'
                      : 'bg-[#C9A45C] text-slate-950 border-amber-400'
                    : isLight
                    ? 'bg-slate-50 text-slate-900 border-slate-300'
                    : 'bg-[#181B26] text-slate-200 border-slate-700'
                }`}
              >
                <div className="text-xs font-extrabold">
                  {lang === 'ar'
                    ? 'استثمار المنتج (كاش باك 50% + خصم 5%)'
                    : '50% Cashback Investment + 5% Off'}
                </div>
                <div className="text-[11px] opacity-85 mt-0.5">
                  {lang === 'ar'
                    ? 'استلام بعد 3 أشهر + استرداد 25% كل 3 أشهر'
                    : 'Delivery in 3 months + 25% back every 3 months'}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPlanType('member-discount')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  planType === 'member-discount'
                    ? isLight
                      ? 'bg-amber-700 text-white border-amber-800'
                      : 'bg-[#C9A45C] text-slate-950 border-amber-400'
                    : isLight
                    ? 'bg-slate-50 text-slate-900 border-slate-300'
                    : 'bg-[#181B26] text-slate-200 border-slate-700'
                }`}
              >
                <div className="text-xs font-extrabold">
                  {lang === 'ar'
                    ? 'خصم العضوية فقط (خصم 5% فوري)'
                    : 'Member 5% Discount Only'}
                </div>
                <div className="text-[11px] opacity-85 mt-0.5">
                  {lang === 'ar'
                    ? 'تسليم خلال أسبوعين إلى شهر كحد أقصى'
                    : 'Fast delivery within 2 weeks to 1 month'}
                </div>
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="custom-prod-notes"
              className={`block text-xs font-bold mb-1.5 ${
                isLight ? 'text-slate-800' : 'text-slate-300'
              }`}
            >
              {lang === 'ar'
                ? 'رابط المنتج أو مواصفات إضافية (اختياري)'
                : 'Reference Link or Specific Color/Storage Notes (Optional)'}
            </label>
            <textarea
              id="custom-prod-notes"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={
                lang === 'ar'
                  ? 'اللون المفضل، السعة التخزينية، أو رابط المنتج على أمازون/نون...'
                  : 'Preferred color, storage capacity, or store link...'
              }
              className={`w-full px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                isLight
                  ? 'bg-slate-50 border-slate-300 text-slate-950'
                  : 'bg-[#181B26] border-slate-700 text-white'
              }`}
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3.5 px-6 rounded-xl text-sm font-extrabold inline-flex items-center justify-center gap-2 transition-colors ${
              isLight
                ? 'bg-amber-700 hover:bg-amber-800 text-white shadow-sm'
                : 'bg-[#C9A45C] hover:bg-[#D4AF37] text-slate-950'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>
              {lang === 'ar'
                ? 'إرسال طلب توفير المنتج الآن'
                : 'Submit Custom Product Request'}
            </span>
          </button>
        </form>

        {/* Right: Live Pricing & Cashback Estimator + Submitted Requests */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live Estimator Card */}
          <div
            className={`rounded-3xl border p-6 space-y-4 ${
              isLight
                ? 'bg-amber-50/80 border-amber-400 text-slate-950'
                : 'bg-[#141620] border-amber-500/35 text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Calculator
                className={`w-5 h-5 ${isLight ? 'text-amber-800' : 'text-[#D4AF37]'}`}
              />
              <h3 className="font-display text-lg font-extrabold">
                {lang === 'ar'
                  ? 'حاسبة التوفير والكاش باك الفورية'
                  : 'Live Member Savings & Cashback Preview'}
              </h3>
            </div>

            <div
              className={`p-4 rounded-2xl border space-y-2.5 text-xs ${
                isLight ? 'bg-white border-amber-300' : 'bg-[#0E1017] border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={isLight ? 'text-slate-600 font-semibold' : 'text-slate-400'}>
                  {lang === 'ar' ? 'السعر السوقي المقدر:' : 'Estimated Market Price:'}
                </span>
                <span className="font-mono-num font-bold text-sm">
                  {formatEgp(memberCalc.basePrice, lang)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className={isLight ? 'text-amber-900 font-bold' : 'text-amber-300 font-bold'}>
                  {lang === 'ar' ? 'سعر عضو MAXERO (خصم 5%):' : 'MAXERO Member Price (5% Off):'}
                </span>
                <span
                  className={`font-mono-num font-extrabold text-base ${
                    isLight ? 'text-amber-900' : 'text-[#E5C158]'
                  }`}
                >
                  {formatEgp(memberCalc.memberPrice, lang)}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-emerald-700 dark:text-emerald-400 font-extrabold">
                <span className="inline-flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {lang === 'ar' ? 'إجمالي الكاش باك المسترد (50%):' : 'Total 50% Cashback Return:'}
                  </span>
                </span>
                <span className="font-mono-num text-base">
                  +{formatEgp(cashbackCalc.totalCashback, lang)}
                </span>
              </div>

              <div className="text-[11px] opacity-80 pt-1">
                {lang === 'ar'
                  ? `تحصل على ${formatEgp(
                      cashbackCalc.firstInstallment3Months,
                      lang
                    )} بعد 3 أشهر من الاستلام، و${formatEgp(
                      cashbackCalc.secondInstallment6Months,
                      lang
                    )} بعد 6 أشهر.`
                  : `Receive ${formatEgp(
                      cashbackCalc.firstInstallment3Months,
                      lang
                    )} at month 3 after delivery, and ${formatEgp(
                      cashbackCalc.secondInstallment6Months,
                      lang
                    )} at month 6.`}
              </div>
            </div>
          </div>

          {/* Submitted Custom Requests Tracker */}
          <div
            className={`rounded-3xl border p-6 space-y-4 ${
              isLight ? 'bg-white border-slate-300' : 'bg-[#12141C] border-slate-800'
            }`}
          >
            <h3
              className={`font-display text-base font-extrabold ${
                isLight ? 'text-slate-950' : 'text-white'
              }`}
            >
              {lang === 'ar'
                ? `طلباتك المرسلة (${requests.length})`
                : `Your Custom Product Requests (${requests.length})`}
            </h3>

            <div className="space-y-3">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className={`p-3.5 rounded-2xl border text-xs space-y-1.5 ${
                    isLight
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-[#171A24] border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="font-mono-num text-amber-800 dark:text-amber-400">
                      {req.id}
                    </span>
                    <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{req.status}</span>
                    </span>
                  </div>
                  <div className={`text-sm font-extrabold ${isLight ? 'text-slate-950' : 'text-white'}`}>
                    {req.productName}
                  </div>
                  <div className="flex items-center justify-between text-[11px] opacity-80">
                    <span>{req.category}</span>
                    <span className="font-mono-num font-bold">
                      {formatEgp(req.estimatedPrice, lang)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] opacity-70">
                    <Clock className="w-3 h-3" />
                    <span>{req.submittedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
