import React, { useState } from 'react';

const experienceYears = Array.from({ length: 6 }, (_, i) => `${i} Year${i === 1 ? '' : 's'}`);
const experienceMonths = Array.from({ length: 12 }, (_, i) => `${i} Month${i === 1 ? '' : 's'}`);
const years = Array.from({ length: 6 }, (_, i) => (2025 - i).toString());
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setField } from '../profileSlice';

export const WorkExperienceForm: React.FC<{
  onBack: () => void;
  onNext: () => void;
}> = ({ onBack, onNext }) => {
  const dispatch = useAppDispatch();
  const form = useAppSelector((state) => state.profile);
  const [fresher, setFresher] = useState<'yes' | 'no' | null>(
    form.company || form.jobProfile || form.joiningDate ? 'no' : null
  );
  const [fields, setFields] = useState({
    totalExperienceYear: '',
    totalExperienceMonth: '',
    currentCompany: form.company || '',
    currentJobTitle: form.jobProfile || '',
    joiningYear: form.joiningDate ? form.joiningDate.split(' ')[1] : '',
    joiningMonth: form.joiningDate ? form.joiningDate.split(' ')[0] : '',
    noticePeriod: form.noticePeriod || '',
    jobProfile: form.jobProfile || '',
  });

  const handleField = (field: string, value: string) => {
    setFields(f => ({ ...f, [field]: value }));
    // Sync to global state for review tab
    if (field === 'currentCompany') dispatch(setField({ field: 'company', value }));
    if (field === 'currentJobTitle') dispatch(setField({ field: 'jobProfile', value }));
    if (field === 'noticePeriod') dispatch(setField({ field: 'noticePeriod', value }));
    if (field === 'jobProfile') dispatch(setField({ field: 'jobProfile', value }));
    if (field === 'joiningYear' || field === 'joiningMonth') {
      const joiningMonth = field === 'joiningMonth' ? value : fields.joiningMonth;
      const joiningYear = field === 'joiningYear' ? value : fields.joiningYear;
      const joiningDate = joiningMonth && joiningYear ? `${joiningMonth} ${joiningYear}` : '';
      dispatch(setField({ field: 'joiningDate', value: joiningDate }));
    }
  };

  // Helper to determine if Review & Submit should be enabled
  const isReviewEnabled = () => {
    // You can add more robust checks as needed
    // For now, enable if fresher is selected (yes/no) and if not fresher, required fields are filled
    if (fresher === 'yes') return true;
    if (fresher === 'no') {
      return (
        fields.totalExperienceYear !== '' &&
        fields.totalExperienceMonth !== '' &&
        fields.currentCompany.trim() !== '' &&
        fields.currentJobTitle.trim() !== '' &&
        fields.joiningYear !== '' &&
        fields.joiningMonth !== '' &&
        fields.noticePeriod !== ''
      );
    }
    return false;
  };

  return (
    <form style={{
      background: '#fff', padding: 32, borderRadius: 8, maxWidth: 900, margin: '40px auto',
      boxShadow: '0 2px 8px #eee', width: '100%'
    }}>
      {/* Stepper */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 32, gap: 0 }}>
        {['Basic info', 'Work experience', 'Education', 'Review & submit'].map((label, idx) => {
          // Step 3 (Review & submit) is enabled if isReviewEnabled() is true
          const isActive = idx === 1;
          const isEnabled = idx < 3 || (idx === 3 && isReviewEnabled());
          return (
            <React.Fragment key={label}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 120, opacity: isEnabled ? 1 : 0.5, cursor: isEnabled ? 'pointer' : 'not-allowed' }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: isActive ? '#23235b' : '#fff',
                  border: isActive ? '2px solid #23235b' : '2px solid #bbb',
                  color: isActive ? '#fff' : '#bbb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                  fontSize: 16,
                  marginBottom: 4,
                  pointerEvents: isEnabled ? 'auto' : 'none',
                }}>{idx + 1}</div>
                <span style={{ color: isActive ? '#23235b' : '#bbb', fontWeight: isActive ? 600 : 400, fontSize: 14 }}>{label}</span>
              </div>
              {idx < 3 && <div style={{ flex: 1, height: 2, background: '#eee', minWidth: 40, maxWidth: 80 }} />}
            </React.Fragment>
          );
        })}
      </div>
      <h2 style={{ marginBottom: 8 }}>Work experience</h2>
      <div style={{ color: '#888', marginBottom: 24 }}>Details like job title, company name, etc. help employers understand your work.</div>
      <div style={{ marginBottom: 24 }}>
        <span style={{ fontWeight: 500, fontSize: 16 }}>Are you a fresher?</span>
        <div style={{ display: 'inline-flex', marginLeft: 16, gap: 8 }}>
          <button
            type="button"
            style={{
              background: fresher === 'yes' ? '#23235b' : '#fff',
              color: fresher === 'yes' ? '#fff' : '#23235b',
              border: '1.5px solid #23235b',
              borderRadius: 6,
              padding: '6px 32px',
              fontWeight: 600,
              fontSize: 15,
              cursor: 'pointer',
              outline: 'none',
              boxShadow: fresher === 'yes' ? '0 2px 8px #e5e5e5' : undefined
            }}
            onClick={() => setFresher('yes')}
          >Yes</button>
          <button
            type="button"
            style={{
              background: fresher === 'no' ? '#23235b' : '#fff',
              color: fresher === 'no' ? '#fff' : '#23235b',
              border: '1.5px solid #23235b',
              borderRadius: 6,
              padding: '6px 32px',
              fontWeight: 600,
              fontSize: 15,
              cursor: 'pointer',
              outline: 'none',
              boxShadow: fresher === 'no' ? '0 2px 8px #e5e5e5' : undefined
            }}
            onClick={() => setFresher('no')}
          >No</button>
        </div>
      </div>
      {fresher === 'no' && (
        <>
          {/* Total experience */}
          <div style={{ background: '#fafbfc', borderRadius: 8, padding: 24, marginBottom: 24 }}>
            <label style={{ fontWeight: 500 }}>Total experience<span style={{ color: 'red' }}>*</span></label>
            <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
              <select
                value={fields.totalExperienceYear}
                onChange={e => handleField('totalExperienceYear', e.target.value)}
                style={{ flex: 1, padding: 8, border: '1px solid #ccc', borderRadius: 4 }}
              >
                <option value="">Select year</option>
                {experienceYears.map((y, i) => (
                  <option key={y} value={i}>{y}</option>
                ))}
              </select>
              <select
                value={fields.totalExperienceMonth}
                onChange={e => handleField('totalExperienceMonth', e.target.value)}
                style={{ flex: 1, padding: 8, border: '1px solid #ccc', borderRadius: 4 }}
              >
                <option value="">Select month</option>
                {experienceMonths.map((m, i) => (
                  <option key={m} value={i}>{m}</option>
                ))}
              </select>
            </div>
          </div>
          {/* Company and job title */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
            <div style={{ flex: 1 }}>
              <label>Current company name<span style={{ color: 'red' }}>*</span></label>
              <input
                type="text"
                value={fields.currentCompany}
                onChange={e => handleField('currentCompany', e.target.value)}
                placeholder="Type your organisation"
                style={{ width: '100%', padding: 8, marginTop: 4, border: '1px solid #ccc', borderRadius: 4 }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>Current job title<span style={{ color: 'red' }}>*</span></label>
              <input
                type="text"
                value={fields.currentJobTitle}
                onChange={e => handleField('currentJobTitle', e.target.value)}
                placeholder="Type your designation"
                style={{ width: '100%', padding: 8, marginTop: 4, border: '1px solid #ccc', borderRadius: 4 }}
              />
            </div>
          </div>
          {/* Joining date */}
          <div style={{ background: '#fafbfc', borderRadius: 8, padding: 24, marginBottom: 24 }}>
            <label style={{ fontWeight: 500 }}>Joining date<span style={{ color: 'red' }}>*</span></label>
            <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
              <select
                value={fields.joiningYear}
                onChange={e => handleField('joiningYear', e.target.value)}
                style={{ flex: 1, padding: 8, border: '1px solid #ccc', borderRadius: 4 }}
              >
                <option value="">Select year</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              <select
                value={fields.joiningMonth}
                onChange={e => handleField('joiningMonth', e.target.value)}
                style={{ flex: 1, padding: 8, border: '1px solid #ccc', borderRadius: 4 }}
              >
                <option value="">Select month</option>
                {months.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>
          {/* Notice period */}
          <div style={{ marginBottom: 24 }}>
            <label>Notice period<span style={{ color: 'red' }}>*</span></label>
            <select
              value={fields.noticePeriod}
              onChange={e => handleField('noticePeriod', e.target.value)}
              style={{ width: '100%', padding: 8, marginTop: 4, border: '1px solid #ccc', borderRadius: 4 }}
            >
              <option value="">Select notice period</option>
              <option value="15 days or less">15 days or less</option>
              <option value="1 month">1 month</option>
              <option value="2 months">2 months</option>
              <option value="More than 2 months">More than 2 months</option>
            </select>
          </div>
          {/* Job profile */}
          <div style={{ marginBottom: 24 }}>
            <label>Job profile</label>
            <textarea
              value={fields.jobProfile}
              onChange={e => handleField('jobProfile', e.target.value)}
              placeholder="Type here"
              style={{ width: '100%', padding: 8, marginTop: 4, border: '1px solid #ccc', borderRadius: 4, minHeight: 60, resize: 'vertical' }}
              maxLength={200}
            />
            <div style={{ color: '#888', fontSize: 12, marginTop: 4, textAlign: 'right' }}>{fields.jobProfile.length}/200</div>
          </div>
        </>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button
          type="button"
          style={{
            background: 'none',
            color: '#23235b',
            border: 'none',
            fontWeight: 500,
            fontSize: 16,
            cursor: 'pointer',
            padding: 0,
            marginLeft: 80,
            outline: 'none',
            boxShadow: 'none',
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
            padding: '10px 40px',
            border: 'none',
            borderRadius: 6,
            fontWeight: 600,
            fontSize: 16,
            cursor: 'pointer',
            marginRight: 80,
            boxShadow: '0 2px 8px #e2e2e9',
            transition: 'background 0.2s',
          }}
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </form>
  );
};
