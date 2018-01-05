
export default {
  namespace: 'comment',

  state: {
    value: 0,
  },
  reducers: {
    save(state, { payload: { value } }) {
      return { ...state, value };
    },
  },
};
