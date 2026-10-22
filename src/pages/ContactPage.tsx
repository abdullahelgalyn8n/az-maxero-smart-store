import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageCircle } from 'lucide-react';

interface ContactPageProps {
  theme: 'light' | 'dark';
  lang: 'en' | 'ar';
}

export const ContactPage: React.FC<ContactPageProps> = ({ theme, lang }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Membership & Cashback Inquiry');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const isLight = theme === 'light';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      setError(
        lang === 'ar'
          ? 'يرجى ملء الاسم ورقم الهاتف والرسالة.'
          : 'Please fill in your name, phone number, and message.'
      );
      return;
    }
    setError('');
    setSubmittedTicket(`TKT-${Math.floor(10000 + Math.random() * 90000)}`);
    setName('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1
          className={`font-display text-3xl sm:text-5xl font-extrabold tracking-tight ${
            isLight ? 'text-slate-950' : 'text-[#E5C888]'
          }`}
        >
          {lang === 'ar' ? 'تواصل معنا' : 'Contact MAXERO'}
        </h1>
        <p className={`text-sm sm:text-base font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          {lang === 'ar'
            ? 'فريق خدمة عملاء ماكسيرو في مصر الجديدة جاهز للرد على استفساراتكم حول المنتجات والعضوية ونظام الكاش باك.'
            : 'Our Heliopolis headquarters team is ready to assist you with product orders, membership activation, and cashback plans.'}
        </p>
      </div>

      {/* 3 Direct Contact Cards (Exact details from screenshot) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className={`p-6 rounded-2xl border space-y-3 ${
            isLight
              ? 'bg-white border-slate-300 shadow-2xs'
              : 'bg-[#12141C] border-slate-800'
          }`}
        >
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center ${
              isLight ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-500/15 text-emerald-400'
            }`}
          >
            <Phone className="w-5 h-5" />
          </div>
          <h2 className={`text-base font-extrabold ${isLight ? 'text-slate-950' : 'text-white'}`}>
            {lang === 'ar' ? 'واتساب وهاتف خدمة العملاء' : 'WhatsApp & Direct Line'}
          </h2>
          <p className="font-mono-num text-lg font-extrabold text-amber-800 dark:text-[#E5C158]">
            01117562300
          </p>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            {lang === 'ar'
              ? 'متاح يومياً للرد الفوري وتأكيد إثباتات الدفع والطلبات.'
              : 'Available daily for instant support and payment verification.'}
          </p>
        </div>

        <div
          className={`p-6 rounded-2xl border space-y-3 ${
            isLight
              ? 'bg-white border-slate-300 shadow-2xs'
              : 'bg-[#12141C] border-slate-800'
          }`}
        >
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center ${
              isLight ? 'bg-amber-100 text-amber-800' : 'bg-amber-500/15 text-[#D4AF37]'
            }`}
          >
            <Mail className="w-5 h-5" />
          </div>
          <h2 className={`text-base font-extrabold ${isLight ? 'text-slate-950' : 'text-white'}`}>
            {lang === 'ar' ? 'البريد الإلكتروني الرسمي' : 'Official Email'}
          </h2>
          <p className="font-mono-num text-lg font-extrabold text-amber-800 dark:text-[#E5C158]">
            info@maxeroo.com
          </p>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            {lang === 'ar'
              ? 'للتعاقدات المؤسسية والشراكات وطلبات الجملة.'
              : 'For corporate inquiries, wholesale orders, and member support.'}
          </p>
        </div>

        <div
          className={`p-6 rounded-2xl border space-y-3 ${
            isLight
              ? 'bg-white border-slate-300 shadow-2xs'
              : 'bg-[#12141C] border-slate-800'
          }`}
        >
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center ${
              isLight ? 'bg-sky-100 text-sky-800' : 'bg-sky-500/15 text-sky-400'
            }`}
          >
            <MapPin className="w-5 h-5" />
          </div>
          <h2 className={`text-base font-extrabold ${isLight ? 'text-slate-950' : 'text-white'}`}>
            {lang === 'ar' ? 'المقر الرئيسي — مصر الجديدة' : 'Heliopolis Headquarters'}
          </h2>
          <p className={`text-xs font-bold leading-relaxed ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
            {lang === 'ar'
              ? 'عمارات العبور - طريق صلاح سالم - مصر الجديدة، عمارة رقم 4 - الدور السابع، بجوار رئاسة الحرس الجمهوري وأمام الجهاز المركزي للمحاسبات'
              : 'Al Obour Buildings - Salah Salem Rd - Heliopolis, Building No. 4 - 7th Floor, Next to the Republican Guard HQ & opposite the Central Auditing Organization'}
          </p>
        </div>
      </div>

      {/* Contact Inquiry Form + Working Hours */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
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
            {lang === 'ar' ? 'أرسل لنا رسالة مباشرة' : 'Send Us a Direct Message'}
          </h2>

          {submittedTicket && (
            <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-400 text-emerald-950 text-xs font-bold flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>
                {lang === 'ar'
                  ? `تم استلام رسالتك بنجاح (رقم التذكرة ${submittedTicket})! سيتواصل معك فريق خدمة العملاء خلال ساعات.`
                  : `Message received (Ticket ${submittedTicket})! Our support team will contact you shortly.`}
              </span>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-xl bg-red-100 border border-red-400 text-red-950 text-xs font-bold">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="contact-name"
                className={`block text-xs font-bold mb-1 ${
                  isLight ? 'text-slate-800' : 'text-slate-300'
                }`}
              >
                {lang === 'ar' ? 'الاسم بالكامل *' : 'Your Name *'}
              </label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={lang === 'ar' ? 'الاسم' : 'Full Name'}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium ${
                  isLight
                    ? 'bg-slate-50 border-slate-300 text-slate-950'
                    : 'bg-[#181B26] border-slate-700 text-white'
                }`}
              />
            </div>

            <div>
              <label
                htmlFor="contact-phone"
                className={`block text-xs font-bold mb-1 ${
                  isLight ? 'text-slate-800' : 'text-slate-300'
                }`}
              >
                {lang === 'ar' ? 'رقم الهاتف / واتساب *' : 'Phone / WhatsApp *'}
              </label>
              <input
                id="contact-phone"
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

          <div>
            <label
              htmlFor="contact-subject"
              className={`block text-xs font-bold mb-1 ${
                isLight ? 'text-slate-800' : 'text-slate-300'
              }`}
            >
              {lang === 'ar' ? 'موضوع الاستفسار' : 'Inquiry Topic'}
            </label>
            <select
              id="contact-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                isLight
                  ? 'bg-slate-50 border-slate-300 text-slate-950'
                  : 'bg-[#181B26] border-slate-700 text-white'
              }`}
            >
              <option value="Membership & Cashback Inquiry">
                {lang === 'ar' ? 'استفسار عن العضوية والكاش باك 50%' : 'Membership & 50% Cashback Inquiry'}
              </option>
              <option value="Order Delivery Status">
                {lang === 'ar' ? 'متابعة حالة طلب أو شحنة' : 'Order Delivery Status'}
              </option>
              <option value="Umrah & Hajj Booking">
                {lang === 'ar' ? 'حجز رحلات العمرة والحج والسياحة' : 'Umrah, Hajj & Travel Booking'}
              </option>
              <option value="Marketing Commission Withdrawal">
                {lang === 'ar' ? 'سحب أرباح العمولات التسويقية' : 'Marketing Commission Withdrawal'}
              </option>
            </select>
          </div>

          <div>
            <label
              htmlFor="contact-msg"
              className={`block text-xs font-bold mb-1 ${
                isLight ? 'text-slate-800' : 'text-slate-300'
              }`}
            >
              {lang === 'ar' ? 'رسالتك *' : 'Your Message *'}
            </label>
            <textarea
              id="contact-msg"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                lang === 'ar'
                  ? 'اكتب تفاصيل استفسارك هنا...'
                  : 'Write your inquiry details here...'
              }
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium ${
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
            <span>{lang === 'ar' ? 'إرسال الرسالة' : 'Send Message'}</span>
          </button>
        </form>

        {/* Right: Headquarters Info & FAQ */}
        <div
          className={`lg:col-span-5 rounded-3xl border p-6 sm:p-8 space-y-6 ${
            isLight
              ? 'bg-white border-slate-300 shadow-xs'
              : 'bg-[#12141C] border-slate-800'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Clock className={`w-5 h-5 ${isLight ? 'text-amber-800' : 'text-[#D4AF37]'}`} />
            <h3 className={`font-display text-lg font-extrabold ${isLight ? 'text-slate-950' : 'text-white'}`}>
              {lang === 'ar' ? 'مواعيد العمل والزيارة' : 'Headquarters Visiting Hours'}
            </h3>
          </div>

          <div
            className={`p-4 rounded-2xl border space-y-2 text-xs font-semibold ${
              isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-[#171A24] border-slate-800 text-slate-200'
            }`}
          >
            <div className="flex justify-between">
              <span>{lang === 'ar' ? 'السبت — الخميس:' : 'Saturday — Thursday:'}</span>
              <span className="font-mono-num font-bold">10:00 AM – 09:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span>{lang === 'ar' ? 'الجمعة (دعم أونلاين):' : 'Friday (Online Support):'}</span>
              <span className="font-mono-num font-bold">02:00 PM – 10:00 PM</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h4 className={`text-sm font-extrabold ${isLight ? 'text-slate-950' : 'text-white'}`}>
              {lang === 'ar' ? 'الأسئلة الشائعة السريعة' : 'Quick Answers'}
            </h4>
            <div
              className={`p-3.5 rounded-xl border text-xs space-y-1 ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#171A24] border-slate-800'
              }`}
            >
              <div className={`font-bold ${isLight ? 'text-slate-950' : 'text-white'}`}>
                {lang === 'ar'
                  ? 'كيف يتم تفعيل العضوية بعد التحويل؟'
                  : 'How fast is membership activated?'}
              </div>
              <p className={isLight ? 'text-slate-600' : 'text-slate-400'}>
                {lang === 'ar'
                  ? 'يتم مراجعة إثبات الدفع وتفعيل الحساب خلال 24 ساعة كحد أقصى.'
                  : 'Admin approval completes within 24 hours of submitting payment proof.'}
              </p>
            </div>

            <div
              className={`p-3.5 rounded-xl border text-xs space-y-1 ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#171A24] border-slate-800'
              }`}
            >
              <div className={`font-bold ${isLight ? 'text-slate-950' : 'text-white'}`}>
                {lang === 'ar'
                  ? 'متى أستلم المنتج في نظام العضوية فقط؟'
                  : 'What is the delivery time for membership-only orders?'}
              </div>
              <p className={isLight ? 'text-slate-600' : 'text-slate-400'}>
                {lang === 'ar'
                  ? 'يتم تسليم الموبايلات والأجهزة خلال أسبوعين إلى شهر كحد أقصى.'
                  : 'Mobiles & electronics are delivered within 2 weeks to 1 month max.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
