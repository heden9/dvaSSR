
export default {
  namespace: 'count',

  state: {
    value: 0,
    list: new Array(100).fill(1).map((item, index) => index),
  },
  reducers: {
    save(state, { payload: { value } }) {
      return { ...state, value };
    },
    add(state, { payload: { value } }) {
      return { ...state, list: state.list.concat(value) };
    },
  },
};
