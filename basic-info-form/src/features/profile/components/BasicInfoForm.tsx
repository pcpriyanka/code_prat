import React from 'react';
import { ReviewSubmitActions } from './ReviewSubmitActions';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setField, setError, clearErrors, resetForm, fillForm } from '../profileSlice';
import { PhoneInput } from './PhoneInput';
import { DateInput } from './DateInput';
import { Tooltip } from './Tooltip';

const stateOptions = ['Select', 'Gujarat', 'Delhi', 'Maharashtra'];
const cityOptions: Record<string, string[]> = {
  Gujarat: ['Ahmedabad', 'Surat', 'Vadodara'],
  Delhi: ['New Delhi'],
  Maharashtra: ['Mumbai', 'Pune'],
};

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validate(form: any) {
  const errors: any = {};
  if (!form.fullName) errors.fullName = 'Full name is required.';
  if (!form.email) errors.email = 'Please enter your email address.';
  else if (!validateEmail(form.email)) errors.email = 'Please enter a valid email address.';
  if (!form.phoneNumber) errors.phoneNumber = 'Please enter a valid phone number.';
  if (!form.dob) errors.dob = 'Date of birth is required.';
  if (!form.state || form.state === 'Select') errors.state = 'Please select your state.';
  if (!form.city || form.city === 'Select') errors.city = 'Please select your city.';
  return errors;
}

export const BasicInfoForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const form = useAppSelector((state) => state.profile);
  const [step, setStep] = React.useState(0); // 0: Basic info, 1: Work experience, 2: Education, 3: Review

  const handleChange = (field: string, value: string) => {
    dispatch(setField({ field: field as any, value }));
    if (field === 'state') dispatch(setField({ field: 'city', value: '' }));
  };


  const handleNext = () => {
    if (step === 0) {
      const errors = validate(form);
      if (Object.keys(errors).length) {
        Object.entries(errors).forEach(([field, message]) => {
          dispatch(setError({ field: field as any, message: message as string }));
        });
      } else {
        dispatch(clearErrors());
        setStep(1);
      }
    } else if (step === 1) {
      // TODO: validate work experience fields if needed
      setStep(2);
    } else {
      // TODO: validate education fields if needed
      alert('Education step complete! (Proceed to next step)');
    }
  };

  const handleBack = () => {
    if (step === 1) setStep(0);
    else if (step === 2) setStep(1);
    // else: could go to previous page if needed
  };

  if (step === 1) {
    const { WorkExperienceForm } = require('./WorkExperienceForm');
    return <WorkExperienceForm onBack={handleBack} onNext={() => setStep(2)} />;
  }
  if (step === 2) {
    const { EducationForm } = require('./EducationForm');
    return <EducationForm onBack={handleBack} onNext={() => setStep(3)} />;
  }
  if (step === 3) {
    // REVIEW & SUBMIT TAB
    return (
      <div style={{
        background: '#fff', padding: 32, borderRadius: 8, maxWidth: 900, margin: '40px auto',
        boxShadow: '0 2px 8px #eee', width: '100%',
      }}>
        {/* Stepper */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 32, gap: 0 }}>
          {['Basic info', 'Work experience', 'Education', 'Review & submit'].map((label, idx, arr) => {
            const isCompleted = idx < step;
            const isActive = idx === step;
            return (
              <React.Fragment key={label}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 120 }}>
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: isCompleted ? '#fff' : isActive ? '#23235b' : '#fff',
                    border: isCompleted ? '2px solid #1ec773' : isActive ? '2px solid #23235b' : '2px solid #bbb',
                    color: isCompleted ? '#1ec773' : isActive ? '#fff' : '#bbb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    fontSize: 18,
                    marginBottom: 4,
                    position: 'relative',
                    zIndex: 1,
                    transition: 'all 0.2s',
                  }}>
                    {isCompleted ? (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="10" fill="#1ec773" />
                        <path d="M6 10.5L9 13.5L14 8.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      idx + 1
                    )}
                  </div>
                  <span style={{
                    color: isCompleted ? '#222' : isActive ? '#23235b' : '#bbb',
                    fontWeight: isActive ? 700 : 400,
                    fontSize: 16,
                    marginTop: 2,
                    transition: 'all 0.2s',
                    letterSpacing: 0.1,
                    textAlign: 'center',
                    textShadow: isActive ? '0 1px 0 #fff' : 'none',
                  }}>{label}</span>
                </div>
                {idx < arr.length - 1 && (
                  <div
                    style={{
                      flex: 1,
                      height: 2,
                      background: isCompleted ? '#1ec773' : '#e0e0e0',
                      minWidth: 80,
                      maxWidth: 120,
                      margin: '0 0 0 0',
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
        <h2 style={{ marginBottom: 4 }}>Review & submit</h2>
        <div style={{ color: '#888', marginBottom: 24 }}>Almost done! Double-check your info.</div>
        {/* Info Card as Table */}
        <div style={{ border: '1px solid #ececf0', borderRadius: 8, padding: 0, marginBottom: 32, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
            <tbody>
              {/* Basic Info */}
              <tr style={{ background: '#fafbfc' }}>
                <td colSpan={4} style={{ fontWeight: 600, padding: '20px 32px', borderBottom: '1px solid #ececf0' }}>Basic information</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 32px', color: '#23235b', fontWeight: 500 }}>{form.fullName || '-'}</td>
                <td style={{ padding: '12px 32px', color: '#23235b', fontWeight: 500 }}>{form.email || '-'}</td>
                <td style={{ padding: '12px 32px', color: '#23235b', fontWeight: 500 }}>{form.state && form.city ? `${form.city}, ${form.state}` : '-'}</td>
                <td style={{ padding: '12px 32px', color: '#23235b', fontWeight: 500 }}>{form.phoneNumber || '-'}</td>
              </tr>
              <tr>
                <td style={{ padding: '0 32px 12px 32px', color: '#888', fontSize: 13 }}>Full name</td>
                <td style={{ padding: '0 32px 12px 32px', color: '#888', fontSize: 13 }}>Email address</td>
                <td style={{ padding: '0 32px 12px 32px', color: '#888', fontSize: 13 }}>Location</td>
                <td style={{ padding: '0 32px 12px 32px', color: '#888', fontSize: 13 }}>Phone number</td>
              </tr>
              <tr>
                <td colSpan={4} style={{ padding: '0 32px 12px 32px', color: '#23235b', fontWeight: 500 }}>{form.linkedin || '-'}</td>
              </tr>
              <tr>
                <td colSpan={4} style={{ padding: '0 32px 24px 32px', color: '#888', fontSize: 13 }}>LinkedIn</td>
              </tr>
              {/* Work Experience */}
              <tr style={{ background: '#fafbfc' }}>
                <td colSpan={4} style={{ fontWeight: 600, padding: '20px 32px 8px 32px', borderBottom: '1px solid #ececf0' }}>Work experience</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 32px', color: '#23235b', fontWeight: 500 }}>{form.company || '-'}</td>
                <td style={{ padding: '12px 32px', color: '#23235b', fontWeight: 500 }}>{form.institute || '-'}</td>
                <td style={{ padding: '12px 32px', color: '#23235b', fontWeight: 500 }}>{form.joiningDate || '-'}</td>
                <td style={{ padding: '12px 32px', color: '#23235b', fontWeight: 500 }}>{form.noticePeriod || '-'}</td>
              </tr>
              <tr>
                <td style={{ padding: '0 32px 12px 32px', color: '#888', fontSize: 13 }}>Company</td>
                <td style={{ padding: '0 32px 12px 32px', color: '#888', fontSize: 13 }}>Institute</td>
                <td style={{ padding: '0 32px 12px 32px', color: '#888', fontSize: 13 }}>Joining date</td>
                <td style={{ padding: '0 32px 12px 32px', color: '#888', fontSize: 13 }}>Notice period</td>
              </tr>
              <tr>
                <td colSpan={4} style={{ padding: '0 32px 12px 32px', color: '#23235b', fontWeight: 500 }}>{form.jobProfile || '-'}</td>
              </tr>
              <tr>
                <td colSpan={4} style={{ padding: '0 32px 24px 32px', color: '#888', fontSize: 13 }}>Job profile</td>
              </tr>
              {/* Education */}
              <tr style={{ background: '#fafbfc' }}>
                <td colSpan={4} style={{ fontWeight: 600, padding: '20px 32px 8px 32px', borderBottom: '1px solid #ececf0' }}>Education</td>
              </tr>
              {(form.educationEntries && form.educationEntries.length > 0) ? (
                form.educationEntries.map((ed: any, idx: number) => (
                  <tr key={idx}>
                    <td style={{ padding: '12px 32px', color: '#23235b', fontWeight: 500 }}>{ed.degree || '-'}</td>
                    <td style={{ padding: '12px 32px', color: '#23235b', fontWeight: 500 }}>{ed.institute || '-'}</td>
                    <td style={{ padding: '12px 32px', color: '#23235b', fontWeight: 500 }}>{ed.startYear && ed.endYear ? `${ed.startYear} - ${ed.endYear}` : '-'}</td>
                    <td style={{ padding: '12px 32px', color: '#23235b', fontWeight: 500 }}>{ed.location || '-'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td style={{ padding: '12px 32px', color: '#23235b', fontWeight: 500 }}>-</td>
                  <td style={{ padding: '12px 32px', color: '#23235b', fontWeight: 500 }}>-</td>
                  <td style={{ padding: '12px 32px', color: '#23235b', fontWeight: 500 }}>-</td>
                  <td style={{ padding: '12px 32px', color: '#23235b', fontWeight: 500 }}>-</td>
                </tr>
              )}
              <tr>
                <td style={{ padding: '0 32px 12px 32px', color: '#888', fontSize: 13 }}>Degree</td>
                <td style={{ padding: '0 32px 12px 32px', color: '#888', fontSize: 13 }}>Institute</td>
                <td style={{ padding: '0 32px 12px 32px', color: '#888', fontSize: 13 }}>Duration</td>
                <td style={{ padding: '0 32px 12px 32px', color: '#888', fontSize: 13 }}>Location</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Resume upload, Checkbox and Submit */}
        <ReviewSubmitActions onBack={() => setStep(2)} />
      </div>
    );
  }

  return (
    <form style={{
      background: '#fff', padding: 32, borderRadius: 8, maxWidth: 900, margin: '40px auto',
      boxShadow: '0 2px 8px #eee', width: '100%',
    }}>
      {/* Stepper */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 32, gap: 0 }}>
        {['Basic info', 'Work experience', 'Education', 'Review & submit'].map((label, idx, arr) => {
          const isCompleted = idx < step;
          const isActive = idx === step;
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
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 120 }}>
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
                  position: 'relative',
                  zIndex: 1,
                  transition: 'all 0.2s',
                }}>
                  {isCompleted ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="10" r="9" fill="#fff" stroke="#27ae60" strokeWidth="2" />
                      <path d="M6 10.5L9 13.5L14 8.5" stroke="#27ae60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    idx + 1
                  )}
                </div>
                <span style={{
                  color: labelColor,
                  fontWeight: labelWeight,
                  fontSize: 16,
                  marginTop: 2,
                  transition: 'all 0.2s',
                  letterSpacing: 0.1,
                  textAlign: 'center',
                  textShadow: isActive ? '0 1px 0 #fff' : 'none',
                }}>{label}</span>
              </div>
              {idx < arr.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    height: 2,
                    background: (idx < step - 1) ? '#27ae60' : isCompleted ? '#27ae60' : '#e0e0e0',
                    minWidth: 80,
                    maxWidth: 120,
                    margin: '0 0 0 0',
                    transition: 'background 0.2s',
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
      <h2 style={{ marginBottom: 8 }}>Basic information</h2>
      <div style={{ color: '#888', marginBottom: 24 }}>Let's start with the essentials.</div>
      {/* Form Fields */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
        <div style={{ flex: '1 1 260px', minWidth: 200 }}>
          <label>Full name<span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            value={form.fullName}
            onChange={e => handleChange('fullName', e.target.value)}
            placeholder="Enter full name"
            style={{ width: '100%', padding: 8, marginTop: 4, border: form.errors.fullName ? '1px solid #c00' : '1px solid #ccc', borderRadius: 4 }}
          />
          {form.errors.fullName && <span style={{ color: '#c00', fontSize: 12 }}>{form.errors.fullName}</span>}
        </div>
        <div style={{ flex: '1 1 260px', minWidth: 200 }}>
          <label>Email address<span style={{ color: 'red' }}>*</span></label>
          <input
            type="email"
            value={form.email}
            onChange={e => handleChange('email', e.target.value)}
            placeholder="Enter your email"
            style={{ width: '100%', padding: 8, marginTop: 4, border: form.errors.email ? '1px solid #c00' : '1px solid #ccc', borderRadius: 4 }}
          />
          {form.errors.email && <span style={{ color: '#c00', fontSize: 12 }}>{form.errors.email}</span>}
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
        <div style={{ flex: '1 1 260px', minWidth: 200 }}>
          <label>Phone number<span style={{ color: 'red' }}>*</span></label>
          <PhoneInput
            country={form.phoneCountry}
            phoneNumber={form.phoneNumber}
            onCountryChange={v => handleChange('phoneCountry', v)}
            onPhoneNumberChange={v => handleChange('phoneNumber', v)}
            error={form.errors.phoneNumber}
          />
        </div>
        <div style={{ flex: '1 1 260px', minWidth: 200 }}>
          <label>Date of birth<span style={{ color: 'red' }}>*</span></label>
          <DateInput
            value={form.dob}
            onChange={v => handleChange('dob', v)}
            error={form.errors.dob}
          />
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
        <div style={{ flex: '1 1 260px', minWidth: 200 }}>
          <label>State<span style={{ color: 'red' }}>*</span></label>
          <select
            value={form.state}
            onChange={e => handleChange('state', e.target.value)}
            style={{ width: '100%', padding: 8, marginTop: 4, border: form.errors.state ? '1px solid #c00' : '1px solid #ccc', borderRadius: 4 }}
          >
            {stateOptions.map((state) => (
              <option key={state} value={state === 'Select' ? '' : state}>{state}</option>
            ))}
          </select>
          {form.errors.state && <span style={{ color: '#c00', fontSize: 12 }}>{form.errors.state}</span>}
        </div>
        <div style={{ flex: '1 1 260px', minWidth: 200, position: 'relative' }}>
          <label>
            City<span style={{ color: 'red' }}>*</span>
            <Tooltip message="City options will load once a state is selected.">
              <span style={{ marginLeft: 4, fontSize: 13, cursor: 'pointer', verticalAlign: 'middle' }}>ⓘ</span>
            </Tooltip>
          </label>
          <select
            value={form.city}
            onChange={e => handleChange('city', e.target.value)}
            disabled={!form.state || form.state === 'Select'}
            style={{ width: '100%', padding: 8, marginTop: 4, border: form.errors.city ? '1px solid #c00' : '1px solid #ccc', borderRadius: 4 }}
          >
            <option value="">Select</option>
            {(cityOptions[form.state] || []).map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          {form.errors.city && <span style={{ color: '#c00', fontSize: 12 }}>{form.errors.city}</span>}
        </div>
      </div>
      <div style={{ marginBottom: 24 }}>
        <label>Add LinkedIn url</label>
        <input
          type="text"
          value={form.linkedin}
          onChange={e => handleChange('linkedin', e.target.value)}
          placeholder="linkedin.com/in/yourhandle"
          style={{ width: '100%', padding: 8, marginTop: 4, border: '1px solid #ccc', borderRadius: 4 }}
        />
        <div style={{ color: '#888', fontSize: 12, marginTop: 4 }}>
          Used to verify your professional presence. Please ensure the URL is accurate and publicly viewable.
        </div>
      </div>
      {/* Sticky footer button row, styled to match design */}
      <div
        style={{
          position: 'sticky',
          left: 0,
          right: 0,
          bottom: 0,
          background: '#f6f7fa',
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          borderTop: '1px solid #ececf0',
          padding: '24px 0 0 0',
          margin: '40px -32px -32px -32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          minHeight: 80,
        }}
      >
        <button
          type="button"
          onClick={handleBack}
          disabled={step === 0}
          style={{
            background: 'none',
            color: '#23235b',
            border: 'none',
            fontWeight: 500,
            fontSize: 16,
            cursor: step === 0 ? 'not-allowed' : 'pointer',
            marginLeft: 80,
            padding: 0,
            opacity: step === 0 ? 0.5 : 1,
            outline: 'none',
            boxShadow: 'none',
            transition: 'opacity 0.2s',
          }}
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
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </form>
  );
};
