import React, { useState, useRef, useEffect } from 'react';

type Country = { code: string; name: string; flag: string; iso: string };

const countries: Country[] = [
  { code: '+91', name: 'India', flag: 'IN', iso: 'in' },
  { code: '+213', name: 'Algeria', flag: 'DZ', iso: 'dz' },
  { code: '+93', name: 'Afghanistan', flag: 'AF', iso: 'af' },
  { code: '+355', name: 'Albania', flag: 'AL', iso: 'al' },
  { code: '+376', name: 'Andorra', flag: 'AD', iso: 'ad' },
  { code: '+244', name: 'Angola', flag: 'AO', iso: 'ao' },
  { code: '+43', name: 'Austria', flag: 'AT', iso: 'at' },
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
