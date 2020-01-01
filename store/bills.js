import sharedMutations from "~/utils/sharedMutations";

export const state = () => ({
    userBills: [],
    BILL_CREATION_ERRORS: [],
  }
);

export const mutations = {
  ...sharedMutations,
  setBills(state, payload) {
    state.userBills = payload;
  }
};

export const getters = {
  getBills: state => state.userBills,
  getBillCreationErrors: state => state.BILL_CREATION_ERRORS,
};

export const actions = {
  async fetchBills({commit, state}, user_account_id) {
    try {
      const response = (await this.$axios
        .$get(`/list?user_account_id=${user_account_id}`)).message;
      console.log({response});
      commit('setBills', response);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  async createBill({commit, state, dispatch}, payload) {
    try {
      commit('removeErrors', 'BILL_CREATION_ERRORS');
      const response = (await this.$axios.$post('/create', payload)).message;
      await dispatch('fetchBills', payload.user_account_id);
      return response;
    } catch (error) {
      commit('setRequestErrors', {response: error.response, type: 'BILL_CREATION_ERRORS'})
    }
  }
};
