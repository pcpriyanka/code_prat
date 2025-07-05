import React, { useState, useRef, useEffect } from 'react';


type Country = { code: string; name: string; flag: string; iso: string };

const countries: Country[] = [
  
  { code: '+1', name: 'United States', flag: '🇺🇸', iso: 'us' },
  { code: '+91', name: 'India', flag: '🇮🇳', iso: 'in' },
  { code: '+44', name: 'United Kingdom', flag: '🇬🇧', iso: 'gb' },
  { code: '+81', name: 'Japan', flag: '🇯🇵', iso: 'jp' },
  { code: '+49', name: 'Germany', flag: '🇩🇪', iso: 'de' },
  { code: '+33', name: 'France', flag: '🇫🇷', iso: 'fr' },
  { code: '+61', name: 'Australia', flag: '🇦🇺', iso: 'au' },
  { code: '+86', name: 'China', flag: '🇨🇳', iso: 'cn' },
  { code: '+7', name: 'Russia', flag: '🇷🇺', iso: 'ru' },
  { code: '+39', name: 'Italy', flag: '🇮🇹', iso: 'it' },
  { code: '+34', name: 'Spain', flag: '🇪🇸', iso: 'es' },
  { code: '+55', name: 'Brazil', flag: '🇧🇷', iso: 'br' },
  { code: '+27', name: 'South Africa', flag: '🇿🇦', iso: 'za' },
  { code: '+82', name: 'South Korea', flag: '🇰🇷', iso: 'kr' },
  { code: '+62', name: 'Indonesia', flag: '🇮🇩', iso: 'id' },
  { code: '+60', name: 'Malaysia', flag: '🇲🇾', iso: 'my' },
  { code: '+66', name: 'Thailand', flag: '🇹🇭', iso: 'th' },
  { code: '+92', name: 'Pakistan', flag: '🇵🇰', iso: 'pk' },
  { code: '+880', name: 'Bangladesh', flag: '🇧🇩', iso: 'bd' },
  { code: '+20', name: 'Egypt', flag: '🇪🇬', iso: 'eg' },
  { code: '+90', name: 'Turkey', flag: '🇹🇷', iso: 'tr' },
  { code: '+31', name: 'Netherlands', flag: '🇳🇱', iso: 'nl' },
  { code: '+46', name: 'Sweden', flag: '🇸🇪', iso: 'se' },
  { code: '+47', name: 'Norway', flag: '🇳🇴', iso: 'no' },
  { code: '+45', name: 'Denmark', flag: '🇩🇰', iso: 'dk' },
  { code: '+41', name: 'Switzerland', flag: '🇨🇭', iso: 'ch' },
  { code: '+48', name: 'Poland', flag: '🇵🇱', iso: 'pl' },
  { code: '+36', name: 'Hungary', flag: '🇭🇺', iso: 'hu' },
  { code: '+420', name: 'Czech Republic', flag: '🇨🇿', iso: 'cz' },
  { code: '+43', name: 'Austria', flag: '🇦🇹', iso: 'at' },
  { code: '+40', name: 'Romania', flag: '🇷🇴', iso: 'ro' },
  { code: '+380', name: 'Ukraine', flag: '🇺🇦', iso: 'ua' },
  { code: '+375', name: 'Belarus', flag: '🇧🇾', iso: 'by' },
  { code: '+994', name: 'Azerbaijan', flag: '🇦🇿', iso: 'az' },
  { code: '+995', name: 'Georgia', flag: '🇬🇪', iso: 'ge' },
  { code: '+374', name: 'Armenia', flag: '🇦🇲', iso: 'am' },
  { code: '+84', name: 'Vietnam', flag: '🇻🇳', iso: 'vn' },
  { code: '+63', name: 'Philippines', flag: '🇵🇭', iso: 'ph' },
  { code: '+65', name: 'Singapore', flag: '🇸🇬', iso: 'sg' },
  { code: '+64', name: 'New Zealand', flag: '🇳🇿', iso: 'nz' },
  { code: '+1', name: 'Canada', flag: '🇨🇦', iso: 'ca' },
  { code: '+52', name: 'Mexico', flag: '🇲🇽', iso: 'mx' },
  { code: '+54', name: 'Argentina', flag: '🇦🇷', iso: 'ar' },
  { code: '+56', name: 'Chile', flag: '🇨🇱', iso: 'cl' },
  { code: '+51', name: 'Peru', flag: '🇵🇪', iso: 'pe' },
  { code: '+57', name: 'Colombia', flag: '🇨🇴', iso: 'co' },
  { code: '+58', name: 'Venezuela', flag: '🇻🇪', iso: 've' },
  { code: '+94', name: 'Sri Lanka', flag: '🇱🇰', iso: 'lk' },
  { code: '+977', name: 'Nepal', flag: '🇳🇵', iso: 'np' },
  { code: '+960', name: 'Maldives', flag: '🇲🇻', iso: 'mv' },
  { code: '+93', name: 'Afghanistan', flag: '🇦🇫', iso: 'af' },
  { code: '+964', name: 'Iraq', flag: '🇮🇶', iso: 'iq' },
  { code: '+98', name: 'Iran', flag: '🇮🇷', iso: 'ir' },
  { code: '+962', name: 'Jordan', flag: '🇯🇴', iso: 'jo' },
  { code: '+961', name: 'Lebanon', flag: '🇱🇧', iso: 'lb' },
  { code: '+972', name: 'Israel', flag: '🇮🇱', iso: 'il' },
  { code: '+968', name: 'Oman', flag: '🇴🇲', iso: 'om' },
  { code: '+971', name: 'United Arab Emirates', flag: '🇦🇪', iso: 'ae' },
  { code: '+966', name: 'Saudi Arabia', flag: '🇸🇦', iso: 'sa' },
  { code: '+974', name: 'Qatar', flag: '🇶🇦', iso: 'qa' },
  { code: '+965', name: 'Kuwait', flag: '🇰🇼', iso: 'kw' },
  { code: '+256', name: 'Uganda', flag: '🇺🇬', iso: 'ug' },
  { code: '+254', name: 'Kenya', flag: '🇰🇪', iso: 'ke' },
  { code: '+255', name: 'Tanzania', flag: '🇹🇿', iso: 'tz' },
  { code: '+250', name: 'Rwanda', flag: '🇷🇼', iso: 'rw' },
  { code: '+237', name: 'Cameroon', flag: '🇨🇲', iso: 'cm' },
  { code: '+234', name: 'Nigeria', flag: '🇳🇬', iso: 'ng' },
  { code: '+233', name: 'Ghana', flag: '🇬🇭', iso: 'gh' },
  { code: '+225', name: 'Ivory Coast', flag: '🇨🇮', iso: 'ci' },
  { code: '+212', name: 'Morocco', flag: '🇲🇦', iso: 'ma' },
  { code: '+213', name: 'Algeria', flag: '🇩🇿', iso: 'dz' },
  { code: '+216', name: 'Tunisia', flag: '🇹🇳', iso: 'tn' },
  { code: '+218', name: 'Libya', flag: '🇱🇾', iso: 'ly' },
  { code: '+998', name: 'Uzbekistan', flag: '🇺🇿', iso: 'uz' },
  { code: '+996', name: 'Kyrgyzstan', flag: '🇰🇬', iso:'kg'}
];

interface PhoneInputProps {
  country: string;
  phoneNumber: string;
  onCountryChange: (code: string) => void;
  onPhoneNumberChange: (value: string) => void;
  error?: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  country,
  phoneNumber,
  onCountryChange,
  onPhoneNumberChange,
  error,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selected = countries.find((c) => c.code === country) || countries[0];

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          ref={ref}
          style={{
            border: '1px solid #ccc',
            borderRadius: 4,
            padding: '8px 12px',
            cursor: 'pointer',
            minWidth: 80,
            background: '#fff',
            marginRight: 8,
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
          }}
          onClick={() => setOpen((v) => !v)}
        >
          <span style={{ marginRight: 8, display: 'inline-flex', alignItems: 'center', width: 24 }}>
            <span style={{
              display: 'inline-block',
              width: 20,
              height: 14,
              background: `url('https://flagcdn.com/20x14/${selected.iso}.png') no-repeat center/cover`,
              borderRadius: 2,
              marginRight: 4
            }} />
            <span style={{ fontSize: 12, color: '#888', fontWeight: 600 }}>{selected.flag}</span>
          </span>
          <span>{selected.code}</span>
          <span style={{ marginLeft: 6, fontSize: 10 }}>▼</span>
          {open && (
            <div
              style={{
                position: 'absolute',
                top: 40,
                left: 0,
                background: '#fff',
                border: '1px solid #eee',
                borderRadius: 8,
                boxShadow: '0 2px 8px #eee',
                zIndex: 10,
                width: 220,
                maxHeight: 220,
                overflowY: 'auto',
              }}
            >
              {countries.map((c) => (
                <div
                  key={c.code}
                  style={{
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    background: c.code === selected.code ? '#f5f7fa' : '#fff',
                  }}
                  onClick={() => {
                    onCountryChange(c.code);
                    setOpen(false);
                  }}
                >
                  <span style={{ marginRight: 8, display: 'inline-flex', alignItems: 'center', width: 24 }}>
                    <span style={{
                      display: 'inline-block',
                      width: 20,
                      height: 14,
                      background: `url('https://flagcdn.com/20x14/${c.iso}.png') no-repeat center/cover`,
                      borderRadius: 2,
                      marginRight: 4
                    }} />
                    <span style={{ fontSize: 12, color: '#888', fontWeight: 600 }}>{c.flag}</span>
                  </span>
                  <span style={{ flex: 1 }}>{c.name}</span>
                  <span style={{ color: '#888' }}>{c.code}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => onPhoneNumberChange(e.target.value)}
          placeholder="00000 00000"
          style={{
            flex: 1,
            padding: 8,
            border: '1px solid #ccc',
            borderRadius: 4,
          }}
        />
      </div>
      {error && <span style={{ color: '#c00', fontSize: 12, marginTop: 4 }}>{error}</span>}
    </div>
  );
};
