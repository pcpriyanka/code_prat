import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileState } from './types';

const initialState: ProfileState = {
  fullName: '',
  email: '',
  phoneCountry: '+91',
  phoneNumber: '',
  dob: '',
  state: '',
  city: '',
  linkedin: '',
  // Work experience
  company: '',
  joiningDate: '',
  jobProfile: '',
  institute: '',
  noticePeriod: '',
  // Education
  degree: '',
  duration: '',
  licenseNumber: '',
  educationLocation: '',
  educationEntries: [],
  errors: {},
};

const filledState: ProfileState = {
  fullName: 'Johnathan Doe',
  email: 'john.doe@example.com',
  phoneCountry: '+91',
  phoneNumber: '99999 99999',
  dob: '2026-12-30',
  state: 'Gujarat',
  city: 'Ahmedabad',
  linkedin: 'https://linkedin.com/in/johndoe',
  // Work experience
  company: 'Adobe',
  joiningDate: 'Jan 2023',
  jobProfile: 'Frontend Developer',
  institute: 'GCET',
  noticePeriod: '2 months',
  // Education
  degree: 'B.Tech',
  duration: '2020 - 2023',
  licenseNumber: 'LIC-DFSA-2024-8934',
  educationLocation: 'Mumbai',
  educationEntries: [],
  errors: {},
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setField: <K extends keyof Omit<ProfileState, 'errors'>>(
      state: ProfileState,
      action: PayloadAction<{ field: K; value: ProfileState[K] }>
    ) => {
      state[action.payload.field] = action.payload.value;
      state.errors[action.payload.field] = '';
    },

    setError: (state, action: PayloadAction<{ field: keyof Omit<ProfileState, 'errors'>; message: string }>) => {
      state.errors[action.payload.field] = action.payload.message;
    },
    clearErrors: (state) => {
      state.errors = {};
    },
    resetForm: () => initialState,
    fillForm: () => filledState,
  },
});

export const { setField, setError, clearErrors, resetForm, fillForm } = profileSlice.actions;
export default profileSlice.reducer;
