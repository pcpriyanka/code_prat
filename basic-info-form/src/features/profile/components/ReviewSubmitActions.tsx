import React, { useState } from 'react';
import { useAppSelector } from '../../../app/hooks';

interface Props {
  onBack: () => void;
}

export const ReviewSubmitActions: React.FC<Props> = ({ onBack }) => {
  const form = useAppSelector((state) => state.profile);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [checked, setChecked] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitClicked(true);
    if (!resumeFile || !checked) return;
    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(44, 44, 44, 0.10)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 8px 32px rgba(44,44,44,0.10)',
          width: 420,
          maxWidth: '90vw',
          padding: '0 0 32px 0',
          textAlign: 'center',
          position: 'relative',
        }}>
          <div style={{
            background: 'linear-gradient(180deg, #D1FADF 0%, #fff 100%)',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            padding: '32px 0 0 0',
          }}>
            <div style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: '#E7F9EF',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}>
              <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="#D1FADF"/><path d="M16 25.5L22 31.5L34 19.5" stroke="#039855" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
          <button
            onClick={() => setShowSuccess(false)}
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              background: 'none',
              border: 'none',
              fontSize: 22,
              color: '#888',
              cursor: 'pointer',
            }}
            aria-label="Close"
          >
            ×
          </button>
          <div style={{ marginTop: 16, marginBottom: 8, fontWeight: 700, fontSize: 22, color: '#23235b' }}>
            Profile submitted successfully
          </div>
          <div style={{ color: '#444', fontSize: 16, marginBottom: 24 }}>
            {form.fullName ? `${form.fullName}'s profile has been created and saved.` : 'Profile has been created and saved.'}<br />
            {form.email && (
              <>A confirmation email was sent to {form.email}</>
            )}
          </div>
          <button
            style={{
              background: '#23235b',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '10px 32px',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              marginTop: 8,
              boxShadow: '0 2px 8px #e2e2e9',
            }}
            onClick={() => window.location.reload()}
          >
            View profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ border: '1px dashed #d6d6db', borderRadius: 6, padding: 20, marginBottom: 24, background: '#fafbfc' }}>
        <div style={{ fontWeight: 500, marginBottom: 8 }}>Resume upload<span style={{ color: 'red' }}>*</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <input type="file" style={{ display: 'none' }} id="resume-upload" onChange={handleFileChange} />
          <label htmlFor="resume-upload" style={{
            display: 'inline-flex', alignItems: 'center',
            background: '#fff', border: '1px solid #ececf0', borderRadius: 4, padding: '8px 20px', cursor: 'pointer', fontWeight: 500
          }}>
            <span style={{ marginRight: 8 }}>Upload resume</span>
            <svg width="18" height="18" fill="none" viewBox="0 0 18 18"><path d="M9 2v10m0 0l-3-3m3 3l3-3" stroke="#23235b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><rect x="3" y="14" width="12" height="2" rx="1" fill="#ececf0"/></svg>
          </label>
          {resumeFile && <span style={{ color: '#23235b', fontSize: 15 }}>{resumeFile.name}</span>}
        </div>
        {submitClicked && !resumeFile && <div style={{ color: '#c00', fontSize: 13, marginTop: 4 }}>Please upload your resume.</div>}
        <div style={{ color: '#888', fontSize: 12, marginTop: 8 }}>Supported formats: doc, docx, rtf, pdf, up to 2 MB</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 32 }}>
        <button
          type="button"
          onClick={onBack}
          style={{
            background: 'none', color: '#23235b', border: 'none', fontWeight: 500, fontSize: 16, cursor: 'pointer', padding: 0,
          }}
        >
          Back
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <label style={{ display: 'flex', alignItems: 'center', fontSize: 15, color: '#23235b', fontWeight: 500 }}>
            <input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)} style={{ marginRight: 8 }} />
            Yes, I've checked the above data
          </label>
          <button
            type="submit"
            style={{
              background: '#23235b', color: '#fff', padding: '10px 32px', border: 'none', borderRadius: 6, fontWeight: 600, fontSize: 16, cursor: 'pointer', opacity: checked && resumeFile ? 1 : 0.7
            }}
            disabled={!checked || !resumeFile}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};
