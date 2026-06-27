import { createSlice } from '@reduxjs/toolkit';
import { Api } from '@/lib/api';

const siteSettingsSlice = createSlice({
  name: 'siteSettings',
  initialState: {
    welcome: null,
    whyChooseUs: null,
    testimonials: [],
    footer: null,
    privacyPolicy: '',
    termsOfService: '',
    logo: '',
    stats: [],
    pageBanners: {},
    contactSectionImage: '',
    sectionHeadings: {},
    loading: false,
    fetched: false,
  },
  reducers: {
    setLoading(state, action) { state.loading = action.payload; },
    setFetched(state) { state.fetched = true; },
    setSettings(state, action) {
      const s = action.payload;
      if (s.welcome) state.welcome = s.welcome;
      if (s.whyChooseUs) state.whyChooseUs = s.whyChooseUs;
      if (Array.isArray(s.testimonials) && s.testimonials.length > 0) state.testimonials = s.testimonials;
      if (s.footer) state.footer = s.footer;
      if (s.privacyPolicy) state.privacyPolicy = s.privacyPolicy;
      if (s.termsOfService) state.termsOfService = s.termsOfService;
      if (s.logo) state.logo = s.logo;
      if (Array.isArray(s.stats) && s.stats.length > 0) state.stats = s.stats;
      if (s.pageBanners) state.pageBanners = s.pageBanners;
      if (s.contactSectionImage) state.contactSectionImage = s.contactSectionImage;
      if (s.sectionHeadings) state.sectionHeadings = s.sectionHeadings;
    },
  },
});

export const { setLoading, setFetched, setSettings } = siteSettingsSlice.actions;

export const fetchSiteSettings = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await Api('get', 'site-settings', '', null);
    if (res?.status) dispatch(setSettings(res.data?.data || {}));
  } catch (_) {}
  finally {
    dispatch(setLoading(false));
    dispatch(setFetched());
  }
};

export default siteSettingsSlice.reducer;
