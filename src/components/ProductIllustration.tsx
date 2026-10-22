import React from 'react';
import type { ProductItem } from '../utils/pricingAndCatalog';

interface ProductIllustrationProps {
  deviceType: ProductItem['visualStyle']['deviceType'];
  primaryColor: string;
  secondaryColor: string;
  accentColor?: string;
  screenLabel: string;
  className?: string;
}

export const ProductIllustration: React.FC<ProductIllustrationProps> = ({
  deviceType,
  primaryColor,
  secondaryColor,
  accentColor = '#D4AF37',
  screenLabel,
  className = '',
}) => {
  const uniqueId = React.useId().replace(/:/g, '');

  // 1. Samsung Galaxy A17 / A07 / A55 Studio Dual-View (Back + Front overlapping, matching screenshot!)
  if (deviceType === 'samsung-a' || deviceType === 'samsung-s') {
    const isUltra = deviceType === 'samsung-s';
    const rx = isUltra ? 6 : 16;
    return (
      <div className={`relative w-full h-full flex items-center justify-center bg-white select-none overflow-hidden p-4 ${className}`}>
        <svg viewBox="0 0 260 240" className="w-full h-full max-h-56 drop-shadow-md" role="img" aria-label={screenLabel}>
          <defs>
            <linearGradient id={`sam-back-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="60%" stopColor={primaryColor} stopOpacity="0.88" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
            <linearGradient id={`sam-screen-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="35%" stopColor={primaryColor} />
              <stop offset="75%" stopColor={secondaryColor} />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
          </defs>

          {/* Back Phone View (Left) */}
          <g transform="translate(34, 16)">
            <rect x="0" y="0" width="98" height="198" rx={rx} fill={`url(#sam-back-${uniqueId})`} stroke="#94A3B8" strokeWidth="1.5" />
            {/* Vertical Camera Pill Island */}
            <rect x="10" y="12" width="22" height="62" rx="11" fill="#0F172A" opacity="0.18" />
            <circle cx="21" cy="24" r="7.5" fill="#0F172A" stroke="#CBD5E1" strokeWidth="1.5" />
            <circle cx="21" cy="24" r="3" fill="#334155" />
            <circle cx="21" cy="43" r="7.5" fill="#0F172A" stroke="#CBD5E1" strokeWidth="1.5" />
            <circle cx="21" cy="43" r="3" fill="#334155" />
            <circle cx="21" cy="62" r="7.5" fill="#0F172A" stroke="#CBD5E1" strokeWidth="1.5" />
            <circle cx="21" cy="62" r="2.5" fill="#334155" />
            <circle cx="40" cy="33" r="3" fill="#FEF08A" stroke="#CBD5E1" strokeWidth="0.8" />
            <text x="49" y="168" textAnchor="middle" fill="#334155" fontSize="8" fontWeight="700" letterSpacing="1.5">
              SAMSUNG
            </text>
          </g>

          {/* Front Screen View (Right, matching vertical "Galaxy A17/A07" typography in screenshot) */}
          <g transform="translate(116, 22)">
            <rect x="0" y="0" width="100" height="196" rx={rx} fill="#0F172A" stroke="#334155" strokeWidth="2" />
            <rect x="4" y="4" width="92" height="188" rx={rx - 2} fill={`url(#sam-screen-${uniqueId})`} />
            {/* U-Notch / Punch hole */}
            <circle cx="50" cy="11" r="3.5" fill="#0F172A" />
            {/* Bold Vertical Typography like Samsung A17/A07 promo image */}
            <g transform="translate(64, 108) rotate(-90)">
              <text x="0" y="-6" textAnchor="middle" fill="#0F172A" fontSize="21" fontWeight="800" fontFamily="Outfit, sans-serif">
                Galaxy
              </text>
              <text x="0" y="18" textAnchor="middle" fill="#0F172A" fontSize="24" fontWeight="900" fontFamily="Outfit, sans-serif">
                {screenLabel.replace('Galaxy ', '')}
              </text>
            </g>
          </g>
        </svg>
      </div>
    );
  }

  // 2. iPhone 16 Pro Max / 15 Pro Studio Dual-View (Desert / Natural Titanium)
  if (deviceType === 'iphone-pro' || deviceType === 'iphone-std') {
    const isPro = deviceType === 'iphone-pro';
    return (
      <div className={`relative w-full h-full flex items-center justify-center bg-white select-none overflow-hidden p-4 ${className}`}>
        <svg viewBox="0 0 260 240" className="w-full h-full max-h-56 drop-shadow-md" role="img" aria-label={screenLabel}>
          <defs>
            <linearGradient id={`ip-back-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="50%" stopColor={primaryColor} stopOpacity="0.9" />
              <stop offset="100%" stopColor="#D6C7B8" />
            </linearGradient>
            <linearGradient id={`ip-front-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#090A0F" />
              <stop offset="45%" stopColor={secondaryColor} />
              <stop offset="75%" stopColor={primaryColor} />
              <stop offset="100%" stopColor="#111827" />
            </linearGradient>
          </defs>

          {/* Back Titanium Chassis */}
          <g transform="translate(32, 16)">
            <rect x="0" y="0" width="98" height="198" rx="18" fill={`url(#ip-back-${uniqueId})`} stroke="#A89888" strokeWidth="1.8" />
            {/* Pro Camera Plateau */}
            <rect x="8" y="8" width="48" height="48" rx="12" fill={primaryColor} stroke="#9C8B7A" strokeWidth="1.2" />
            <circle cx="21" cy="21" r="9" fill="#1E293B" stroke="#8C7A6B" strokeWidth="2" />
            <circle cx="21" cy="21" r="3.5" fill="#0F172A" />
            <circle cx="21" cy="43" r="9" fill="#1E293B" stroke="#8C7A6B" strokeWidth="2" />
            <circle cx="21" cy="43" r="3.5" fill="#0F172A" />
            {isPro && (
              <>
                <circle cx="42" cy="32" r="9" fill="#1E293B" stroke="#8C7A6B" strokeWidth="2" />
                <circle cx="42" cy="32" r="3.5" fill="#0F172A" />
              </>
            )}
            <circle cx="42" cy="16" r="3.5" fill="#FEF3C7" />
            <circle cx="42" cy="47" r="3.5" fill="#334155" />
            {/* Minimalist Center Emblem */}
            <circle cx="49" cy="102" r="9" fill="#8C7A6B" opacity="0.35" />
          </g>

          {/* Front Super Retina XDR Display */}
          <g transform="translate(116, 22)">
            <rect x="0" y="0" width="100" height="196" rx="18" fill="#0F172A" stroke="#78716C" strokeWidth="2" />
            <rect x="4" y="4" width="92" height="188" rx="15" fill={`url(#ip-front-${uniqueId})`} />
            {/* Dynamic Island */}
            <rect x="33" y="9" width="34" height="9" rx="4.5" fill="#000000" />
            {/* Orbital Ribbon Graphic */}
            <path d="M 10 140 Q 52 75 92 120 Q 55 165 10 140 Z" fill="none" stroke={primaryColor} strokeWidth="2.5" opacity="0.8" />
            <path d="M 12 110 Q 48 55 90 95" fill="none" stroke={accentColor} strokeWidth="1.5" opacity="0.65" />
            <text x="50" y="174" textAnchor="middle" fill="#F8FAFC" fontSize="9.5" fontWeight="700" letterSpacing="0.5">
              {screenLabel}
            </text>
          </g>
        </svg>
      </div>
    );
  }

  // 3. Vivo V70 / V60 Lite / Y31 / Xiaomi / Realme / Poco Studio Dual-View
  if (deviceType === 'vivo-aura' || deviceType === 'vivo-lite' || deviceType === 'xiaomi') {
    const isAura = deviceType === 'vivo-aura';
    return (
      <div className={`relative w-full h-full flex items-center justify-center bg-white select-none overflow-hidden p-4 ${className}`}>
        <svg viewBox="0 0 260 240" className="w-full h-full max-h-56 drop-shadow-md" role="img" aria-label={screenLabel}>
          <defs>
            <linearGradient id={`vv-back-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="55%" stopColor={primaryColor} stopOpacity="0.85" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
            <linearGradient id={`vv-screen-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={secondaryColor} />
              <stop offset="50%" stopColor={accentColor} />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
          </defs>

          {/* Back View */}
          <g transform="translate(34, 16)">
            <rect x="0" y="0" width="96" height="198" rx="15" fill={`url(#vv-back-${uniqueId})`} stroke="#CBD5E1" strokeWidth="1.5" />
            {isAura ? (
              <>
                {/* Square-Rounded ZEISS / Aura Camera Module */}
                <rect x="10" y="10" width="46" height="54" rx="12" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.5" />
                <circle cx="24" cy="24" r="8" fill="#0F172A" stroke="#CBD5E1" strokeWidth="1.2" />
                <circle cx="24" cy="44" r="8" fill="#0F172A" stroke="#CBD5E1" strokeWidth="1.2" />
                {/* Aura Ring Light */}
                <circle cx="43" cy="44" r="7" fill="none" stroke="#FEF08A" strokeWidth="2.5" />
                <rect x="38" y="18" width="12" height="7" rx="1.5" fill="#1D4ED8" />
                <text x="44" y="23.5" textAnchor="middle" fill="#FFFFFF" fontSize="4.5" fontWeight="800">
                  ZEISS
                </text>
              </>
            ) : (
              <>
                <rect x="10" y="10" width="32" height="54" rx="10" fill="#1E293B" opacity="0.85" />
                <circle cx="26" cy="24" r="8.5" fill="#0F172A" stroke="#E2E8F0" strokeWidth="1.5" />
                <circle cx="26" cy="46" r="8.5" fill="#0F172A" stroke="#E2E8F0" strokeWidth="1.5" />
                <circle cx="26" cy="46" r="5" fill="none" stroke="#FDE047" strokeWidth="1.5" />
              </>
            )}
            <text x="26" y="172" fill="#475569" fontSize="9.5" fontWeight="700" letterSpacing="1">
              {screenLabel.split(' ')[0].toUpperCase()}
            </text>
          </g>

          {/* Front Curved Screen View */}
          <g transform="translate(114, 22)">
            <rect x="0" y="0" width="98" height="196" rx="15" fill="#0F172A" stroke="#475569" strokeWidth="1.8" />
            <rect x="3.5" y="3.5" width="91" height="189" rx="12" fill={`url(#vv-screen-${uniqueId})`} />
            <circle cx="49" cy="10" r="3" fill="#0F172A" />
            {/* Flowing Silk Wave */}
            <path d="M 4 130 C 35 80, 65 160, 94 90 L 94 192 L 4 192 Z" fill="#FFFFFF" opacity="0.18" />
            <text x="49" y="102" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800">
              {screenLabel}
            </text>
          </g>
        </svg>
      </div>
    );
  }

  // 4. Laptops (MacBook Air M3, Lenovo Legion, HP Victus)
  if (deviceType === 'laptop') {
    return (
      <div className={`relative w-full h-full flex items-center justify-center bg-white select-none overflow-hidden p-4 ${className}`}>
        <svg viewBox="0 0 260 220" className="w-full h-full max-h-52 drop-shadow-md" role="img" aria-label={screenLabel}>
          <defs>
            <linearGradient id={`lap-scr-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={secondaryColor} />
              <stop offset="55%" stopColor="#1E3A8A" />
              <stop offset="100%" stopColor={accentColor} />
            </linearGradient>
          </defs>
          {/* Laptop Lid / Display */}
          <rect x="38" y="28" width="184" height="122" rx="8" fill="#0F172A" stroke={primaryColor} strokeWidth="3" />
          <rect x="44" y="34" width="172" height="108" rx="4" fill={`url(#lap-scr-${uniqueId})`} />
          {/* Notch */}
          <rect x="115" y="34" width="30" height="5" rx="2" fill="#0F172A" />
          {/* Screen Content */}
          <circle cx="130" cy="88" r="32" fill="#FFFFFF" opacity="0.12" />
          <text x="130" y="92" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="800" fontFamily="Outfit, sans-serif">
            {screenLabel}
          </text>
          {/* Laptop Base Deck */}
          <path d="M 16 150 L 244 150 L 234 162 L 26 162 Z" fill={primaryColor} stroke="#64748B" strokeWidth="1.5" />
          <rect x="108" y="150" width="44" height="4" rx="2" fill="#64748B" />
        </svg>
      </div>
    );
  }

  // 5. Electronics & Home Appliances (LG OLED, Inverter AC, Tornado Fridge)
  if (deviceType === 'appliance') {
    return (
      <div className={`relative w-full h-full flex items-center justify-center bg-white select-none overflow-hidden p-4 ${className}`}>
        <svg viewBox="0 0 260 220" className="w-full h-full max-h-52 drop-shadow-md" role="img" aria-label={screenLabel}>
          <defs>
            <linearGradient id={`app-scr-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="50%" stopColor="#0284C7" />
              <stop offset="100%" stopColor={accentColor} />
            </linearGradient>
          </defs>
          <rect x="28" y="32" width="204" height="126" rx="6" fill="#0F172A" stroke="#475569" strokeWidth="2.5" />
          <rect x="33" y="37" width="194" height="116" rx="3" fill={`url(#app-scr-${uniqueId})`} />
          <circle cx="130" cy="95" r="36" fill="#FFFFFF" opacity="0.14" />
          <text x="130" y="92" textAnchor="middle" fill="#FFFFFF" fontSize="15" fontWeight="800" fontFamily="Outfit, sans-serif">
            {screenLabel}
          </text>
          <text x="130" y="110" textAnchor="middle" fill="#E2E8F0" fontSize="9.5" fontWeight="600">
            OFFICIAL WARRANTY · IN STOCK
          </text>
          {/* Stand */}
          <rect x="112" y="158" width="36" height="14" fill="#64748B" />
          <rect x="82" y="172" width="96" height="5" rx="2.5" fill="#334155" />
        </svg>
      </div>
    );
  }

  // 6. Umrah, Hajj, Domestic & International Trips
  return (
    <div className={`relative w-full h-full flex items-center justify-center bg-white select-none overflow-hidden p-4 ${className}`}>
      <svg viewBox="0 0 260 220" className="w-full h-full max-h-52 drop-shadow-md" role="img" aria-label={screenLabel}>
        <defs>
          <linearGradient id={`trip-bg-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={secondaryColor} />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
        </defs>
        <rect x="24" y="20" width="212" height="180" rx="16" fill={`url(#trip-bg-${uniqueId})`} stroke={primaryColor} strokeWidth="2" />
        {deviceType === 'umrah' || deviceType === 'hajj' ? (
          <>
            {/* Stylized Kaaba & Golden Arch */}
            <path d="M 75 155 L 75 82 Q 130 42 185 82 L 185 155 Z" fill="none" stroke="#D4AF37" strokeWidth="2" opacity="0.5" />
            <rect x="102" y="82" width="56" height="58" rx="3" fill="#090A0F" stroke="#D4AF37" strokeWidth="2" />
            <rect x="102" y="94" width="56" height="8" fill="#D4AF37" />
            <rect x="134" y="112" width="12" height="22" rx="1.5" fill="#D4AF37" />
          </>
        ) : (
          <>
            {/* Sun, Waves & Luxury Resort */}
            <circle cx="130" cy="86" r="26" fill={primaryColor} opacity="0.85" />
            <path d="M 48 132 Q 90 118 130 132 T 212 132" fill="none" stroke="#38BDF8" strokeWidth="4" />
            <path d="M 60 146 Q 100 134 130 146 T 200 146" fill="none" stroke="#BAE6FD" strokeWidth="2.5" />
          </>
        )}
        <text x="130" y="178" textAnchor="middle" fill="#F8FAFC" fontSize="13" fontWeight="800" fontFamily="Outfit, sans-serif">
          {screenLabel}
        </text>
      </svg>
    </div>
  );
};
