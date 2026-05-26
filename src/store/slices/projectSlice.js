import { createSlice } from '@reduxjs/toolkit';
import { projects as dummyProjects } from '@/data/siteData';
import { Api } from '@/lib/api';

function normalize(item) {
  return {
    id: item._id || item.id,
    name: item.name,
    location: item.location,
    propertySize: item.propertySize || '',
    price: item.price || '',
    status: item.status || '',
    category: item.category || 'residential',
    image: item.image || '',
    overview: item.overview || item.description || '',
    documents: Array.isArray(item.documents) ? item.documents : [],
    gallery: {
      photos: Array.isArray(item.gallery?.photos) ? item.gallery.photos : [],
      videos: Array.isArray(item.gallery?.videos) ? item.gallery.videos : [],
    },
    aboutCity: item.aboutCity || { name: '', text: '' },
    aboutSector: item.aboutSector || { name: '', text: '' },
    reraNumber: item.reraNumber || '',
    reraUrl: item.reraUrl || '',
  };
}

const projectSlice = createSlice({
  name: 'project',
  initialState: {
    list: dummyProjects,
    byId: {},
    loading: false,
    error: null,
    fetched: false,
  },
  reducers: {
    setLoading(state, action) { state.loading = action.payload; },
    setList(state, action) { state.list = action.payload; },
    setSingle(state, action) { state.byId[action.payload.id] = action.payload; },
    setError(state, action) { state.error = action.payload; },
    setFetched(state) { state.fetched = true; },
  },
});

export const { setLoading, setList, setSingle, setError, setFetched } = projectSlice.actions;

export const fetchProjects = (router) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const res = await Api('get', 'projects', '', router);

    if (res?.status) {
      const items = Array.isArray(res.data) ? res.data : res.data?.data || [];
      if (items.length) dispatch(setList(items.map(normalize)));
    } else {
      dispatch(setError('Failed to load projects. Showing cached data.'));
    }

    dispatch(setLoading(false));
    dispatch(setFetched());
    return { success: true, data: res?.data };
  } catch (err) {
    dispatch(setLoading(false));
    dispatch(setFetched());
    dispatch(setError('Network error. Please check your connection.'));
    throw err;
  }
};

export const fetchProjectById = (id, router) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const res = await Api('get', `projects/${id}`, '', router);

    if (res?.status) {
      const project = normalize(res.data?.data || res.data);
      dispatch(setSingle(project));
    } else {
      dispatch(setError('Project not found.'));
    }

    dispatch(setLoading(false));
    return { success: res?.status, data: res?.data };
  } catch (err) {
    dispatch(setLoading(false));
    dispatch(setError('Network error. Please check your connection.'));
    throw err;
  }
};

export default projectSlice.reducer;
