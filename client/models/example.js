
export default {
  namespace: 'count',

  state: {
    value: 0,
  },
  reducers: {
    save(state, { payload: { value } }) {
      return { ...state, value };
    },
  },
};
