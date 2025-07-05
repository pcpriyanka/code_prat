import React, { useState, useEffect } from 'react';

const degreeOptions = [
  'B.Tech', 'M.Tech', 'B.Sc', 'M.Sc', 'B.Com', 'M.Com', 'B.A', 'M.A', 'PhD', 'Diploma', 'Other'
];
const years = Array.from({ length: 30 }, (_, i) => (2025 - i).toString());

import { useAppDispatch } from '../../../app/hooks';
import { setField } from '../profileSlice';

// Accept currentStep and completedSteps as props for stepper control
export const EducationForm: React.FC<{
  onBack: () => void;
  onNext: () => void;
  currentStep?: number; // 0-based
  completedSteps?: number[]; // array of completed step indices
}> = ({ onBack, onNext, currentStep = 2, completedSteps = [0, 1] }) => {
  const dispatch = useAppDispatch();
  const [entries, setEntries] = useState<any[]>([]);
  const [fields, setFields] = useState({
    degree: '',
    institute: '',
    location: '',
    startYear: '',
    endYear: '',
  });

  const handleField = (field: string, value: string) => {
    setFields(f => ({ ...f, [field]: value }));
  };


  const isAddDisabled = !fields.degree || !fields.institute || !fields.location || !fields.startYear || !fields.endYear;
  const handleAdd = () => {
    if (!isAddDisabled) {
      const newEntries = [...entries, { ...fields }];
      setEntries(newEntries);
      setFields({ degree: '', institute: '', location: '', startYear: '', endYear: '' });
    }
  };

  const handleRemove = (idx: number) => {
    const newEntries = entries.filter((_, i) => i !== idx);
    setEntries(newEntries);
  };

  // Sync education entries to global state for review tab
  useEffect(() => {
    dispatch(setField({ field: 'educationEntries', value: entries }));
  }, [entries, dispatch]);

  // Helper to determine if Review & Submit should be enabled
  const isReviewEnabled = () => {
    // At least one education entry must be present
    return entries.length > 0 && entries.every((e: any) => e.degree && e.institute && e.location && e.startYear && e.endYear);
  };

  return (
    <form style={{
      background: '#fff', padding: 32, borderRadius: 8, maxWidth: 900, margin: '40px auto',
      boxShadow: '0 2px 8px #eee', width: '100%'
    }}>
      {/* Stepper */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 32, gap: 0 }}>
        {['Basic info', 'Work experience', 'Education', 'Review & submit'].map((label, idx, arr) => {
          const isEnabled = idx < 3 || (idx === 3 && isReviewEnabled());
          const isActive = idx === currentStep;
          const isCompleted = completedSteps.includes(idx);
          // Colors and styles per design
          let circleBg = '#fff', circleBorder = '#bbb', circleColor = '#bbb', labelColor = '#23235b', labelWeight = 400;
          if (isCompleted) {
            circleBg = '#fff';
            circleBorder = '#27ae60';
            circleColor = '#27ae60';
            labelColor = '#23235b';
            labelWeight = 400;
          } else if (isActive) {
            circleBg = '#23235b';
            circleBorder = '#23235b';
            circleColor = '#fff';
            labelColor = '#23235b';
            labelWeight = 700;
          } else {
            circleBg = '#fff';
            circleBorder = '#bbb';
            circleColor = '#bbb';
            labelColor = '#23235b';
            labelWeight = 400;
          }
          return (
            <React.Fragment key={label}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 120, opacity: isEnabled ? 1 : 0.5, cursor: isEnabled ? 'pointer' : 'not-allowed' }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: circleBg,
                  border: `2px solid ${circleBorder}`,
                  color: circleColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                  fontSize: 18,
                  marginBottom: 4,
                  pointerEvents: isEnabled ? 'auto' : 'none',
                  transition: 'all 0.2s',
                }}>{isCompleted ? (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="9" fill="#fff" stroke="#27ae60" strokeWidth="2" />
                    <path d="M6 10.5L9 13.5L14 8.5" stroke="#27ae60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : idx + 1}</div>
                <span style={{ color: labelColor, fontWeight: labelWeight, fontSize: 15 }}>{label}</span>
              </div>
              {idx < arr.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    height: 2,
                    background: completedSteps.includes(idx) && completedSteps.includes(idx + 1) ? '#27ae60' : '#bbb',
                    minWidth: 40,
                    maxWidth: 80,
                    margin: '0 2px',
                    transition: 'background 0.2s',
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
      <h2 style={{ marginBottom: 8 }}>Education</h2>
      <div style={{ color: '#888', marginBottom: 24 }}>Details like course, university, and more, help recruiters identify your educational background</div>
      {/* Added entries */}
      {entries.length > 0 && (
        <div style={{ background: '#fafbfc', borderRadius: 8, padding: 24, marginBottom: 24 }}>
          {entries.map((ed, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div>
                <div style={{ fontWeight: 600 }}>{ed.degree}</div>
                <div style={{ color: '#888', fontSize: 15 }}>{ed.startYear} - {ed.endYear}</div>
              </div>
              <button type="button" onClick={() => handleRemove(idx)} style={{ background: 'none', border: 'none', color: '#888', fontSize: 18, cursor: 'pointer' }}>🗑️</button>
            </div>
          ))}
        </div>
      )}
      {/* Education form */}
      <div style={{ background: '#fafbfc', borderRadius: 8, padding: 24, marginBottom: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <label>Degree</label>
          <select
            value={fields.degree}
            onChange={e => handleField('degree', e.target.value)}
            style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4, marginTop: 4 }}
          >
            <option value="">Select degree</option>
            {degreeOptions.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <label>Institute name</label>
            <input
              type="text"
              value={fields.institute}
              onChange={e => handleField('institute', e.target.value)}
              placeholder="Type your institute name"
              style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4, marginTop: 4 }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label>Location</label>
            <input
              type="text"
              value={fields.location}
              onChange={e => handleField('location', e.target.value)}
              placeholder="City"
              style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4, marginTop: 4 }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <label>Duration</label>
            <select
              value={fields.startYear}
              onChange={e => handleField('startYear', e.target.value)}
              style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4, marginTop: 4 }}
            >
              <option value="">Start year</option>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
            <select
              value={fields.endYear}
              onChange={e => handleField('endYear', e.target.value)}
              style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4, marginTop: 4 }}
            >
              <option value="">End year</option>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={isAddDisabled}
          style={{
            marginTop: 8,
            border: '1.5px solid #bbb',
            background: isAddDisabled ? '#fafbfc' : '#fff',
            color: isAddDisabled ? '#bbb' : '#23235b',
            borderRadius: 6,
            padding: '6px 18px',
            fontWeight: 600,
            fontSize: 15,
            cursor: isAddDisabled ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            opacity: isAddDisabled ? 0.7 : 1
          }}
        >
          + Add education
        </button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button
          type="button"
          style={{
            background: 'none',
            color: '#888',
            border: 'none',
            fontWeight: 500,
            fontSize: 15,
            cursor: 'pointer',
            padding: 0,
          }}
          onClick={onBack}
        >
          Back
        </button>
        <button
          type="button"
          style={{
            background: '#23235b',
            color: '#fff',
            padding: '10px 32px',
            border: 'none',
            borderRadius: 4,
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </form>
  );
};
