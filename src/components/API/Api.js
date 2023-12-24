import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
// axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.params = {
  key: '40453839-bf63bb7ffb05993fc166c6375',
  orientation: 'landscape',
  per_page: 12,
};

export const getImages = async (query, page) => {
  const { data } = await axios.get(`?search&q=${query}&page=${page}`);

  return data;
};
