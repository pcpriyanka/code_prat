import React from 'react';

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDateForInput(date: string) {
  // Accepts dd/mmm/yyyy or dd-mm-yyyy or dd/mm/yyyy or yyyy-mm-dd, returns yyyy-mm-dd for input
  if (!date) return '';
  // Remove spaces for parsing
  const clean = date.replace(/\s+/g, '');
  // dd/mmm/yyyy
  const mmmMatch = clean.match(/^(\d{2})\/([A-Za-z]{3})\/(\d{4})$/);
  if (mmmMatch) {
    const [_, d, mmm, y] = mmmMatch;
    const mIdx = MONTHS.findIndex(mon => mon.toLowerCase() === mmm.toLowerCase());
    if (mIdx !== -1) {
      return `${y}-${String(mIdx+1).padStart(2, '0')}-${d.padStart(2, '0')}`;
    }
  }
  // dd-mm-yyyy or dd/mm/yyyy
  if (/\d{2}[\/-]\d{2}[\/-]\d{4}/.test(clean)) {
    const [d, m, y] = clean.split(/[-\/]/);
    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  }
  return date;
}

function formatDateForDisplay(date: string) {
  // Accepts yyyy-mm-dd, returns dd/mmm/yyyy
  if (!date) return '';
  if (/\d{4}-\d{2}-\d{2}/.test(date)) {
    const [y, m, d] = date.split('-');
    const mmm = MONTHS[parseInt(m, 10) - 1] || m;
    return `${d}/${mmm}/${y}`;
  }
  // If already in dd/mmm/yyyy, return as is
  if (/\d{2}\/[A-Za-z]{3}\/ d{4}/.test(date)) {
    return date;
  }
  return date;
}
export const DateInput: React.FC<DateInputProps> = ({ value, onChange, error }) => {
  // Show formatted date in input (dd/mmm/yyyy)
  const displayValue = formatDateForDisplay(formatDateForInput(value));
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dateRef = React.useRef<HTMLInputElement>(null);

  // Convert yyyy-mm-dd to dd/mmm/yyyy and vice versa
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value; // yyyy-mm-dd
    if (/\d{4}-\d{2}-\d{2}/.test(val)) {
      onChange(formatDateForDisplay(val));
    }
  };

  // When clicking the calendar icon or input, open the native date picker
  const openDatePicker = () => {
    if (dateRef.current) {
      dateRef.current.showPicker ? dateRef.current.showPicker() : dateRef.current.focus();
    }
  };

  // Get yyyy-mm-dd for native input
  const nativeValue = formatDateForInput(value);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative' }}>
        <input
          ref={inputRef}
          type="text"
          value={displayValue}
          onChange={e => {
            // Accept dd/mmm/yyyy, dd-mm-yyyy, dd/mm/yyyy
            let val = e.target.value
              .replace(/\s/g, '')
              .replace(/-/g, '/')
              .replace(/(\d{2})\/[A-Za-z]{3}\/(\d{4})/, (match, d, mmm, y) => `${d}/${mmm}/${y}`)
              .replace(/(\d{2})[\/-](\d{2})[\/-](\d{4})/, (match, d, m, y) => {
                // Convert numeric month to mmm
                const mmm = MONTHS[parseInt(m, 10) - 1] || m;
                return `${d}/${mmm}/${y}`;
              });
            // Only allow valid format or partial input
            if (/^\d{0,2}(\/[A-Za-z]{0,3})?(\/\d{0,4})?$/.test(val)) {
              onChange(val);
            } else {
              // fallback: allow typing
              onChange(e.target.value);
            }
          }}
          placeholder="dd/mmm/yyyy"
          style={{ padding: 8, border: '1px solid #ccc', borderRadius: 4, width: '100%' }}
          maxLength={12}
          onFocus={e => e.target.select()}
        />
        {/* Hidden native date input for calendar picker */}
        <input
          ref={dateRef}
          type="date"
          value={nativeValue}
          onChange={handleDateChange}
          style={{ position: 'absolute', right: 36, top: 8, opacity: 0, width: 24, height: 24, cursor: 'pointer', zIndex: 2 }}
          tabIndex={-1}
        />
        {/* Calendar icon overlay */}
        <span
          style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#888', cursor: 'pointer', zIndex: 3 }}
          onClick={openDatePicker}
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2" stroke="#888" strokeWidth="2"/><path d="M16 3v4M8 3v4" stroke="#888" strokeWidth="2" strokeLinecap="round"/><path d="M3 9h18" stroke="#888" strokeWidth="2"/></svg>
        </span>
      </div>
      {error && <span style={{ color: '#c00', fontSize: 12, marginTop: 4 }}>{error}</span>}
    </div>
  );
};
