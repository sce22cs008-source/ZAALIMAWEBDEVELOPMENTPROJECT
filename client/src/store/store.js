import { configureStore, createSlice } from '@reduxjs/toolkit';

const resumeSlice = createSlice({
  name: 'resume',
  initialState: {
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      linkedin: '',
      website: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    atsScore: 0,
    matchedKeywords: [],
    missingKeywords: [],
    loading: false,
  },
  reducers: {
    updatePersonalInfo: (state, action) => {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },
    setSummary: (state, action) => {
      state.summary = action.payload;
    },
    addExperience: (state, action) => {
      state.experience.push(action.payload);
    },
    updateExperience: (state, action) => {
      const { index, data } = action.payload;
      state.experience[index] = data;
    },
    setATSData: (state, action) => {
      const { score, matched, missing } = action.payload;
      state.atsScore = score;
      state.matchedKeywords = matched;
      state.missingKeywords = missing;
    }
  },
});

export const { 
  updatePersonalInfo, 
  setSummary, 
  addExperience, 
  updateExperience, 
  setATSData 
} = resumeSlice.actions;

export const store = configureStore({
  reducer: {
    resume: resumeSlice.reducer,
  },
});
