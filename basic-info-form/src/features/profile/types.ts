export interface EducationEntry {
  degree: string;
  institute: string;
  location: string;
  startYear: string;
  endYear: string;
}

export interface ProfileState {
  fullName: string;
  email: string;
  phoneCountry: string;
  phoneNumber: string;
  dob: string;
  state: string;
  city: string;
  linkedin: string;
  // Work experience fields
  company?: string;
  joiningDate?: string;
  jobProfile?: string;
  institute?: string;
  noticePeriod?: string;
  // Education fields
  degree?: string;
  duration?: string;
  licenseNumber?: string;
  educationLocation?: string;
  educationEntries?: EducationEntry[];
  errors: Partial<Record<keyof Omit<ProfileState, 'errors'>, string>>;
}
