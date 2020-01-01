import {removeUserData} from "~/utils/storage";
import sharedMutations from '~/utils/sharedMutations';

export const state = () => ({
  REGISTRATION_ERRORS: [],
  LOGIN_ERRORS: [],
});

export const getters = {
  getRegistrationErrors: state => state.REGISTRATION_ERRORS,
  getLoginErrors: state => state.LOGIN_ERRORS,
};

export const mutations = {
  ...sharedMutations
};

export const actions = {
  async register({ commit, state, dispatch }, payload) {
    try {
      commit('removeErrors', 'REGISTRATION_ERRORS');
      await this.$axios.$post('/signup', payload);
      await dispatch('login', payload);
    } catch (error) {
      console.log(error);
      commit('setRequestErrors', {response: error.response, type: 'REGISTRATION_ERRORS'})
    }
  },
  async login({commit, state}, payload) {
    try {
      commit('removeErrors', 'LOGIN_ERRORS');
      return await this.$auth.loginWith('local', { data: payload });
    } catch (error) {
      console.log(error);
      commit('setRequestErrors', {response: error.response, type: 'LOGIN_ERRORS'})
    }
  },
  async logout() {
    removeUserData();
    return await this.$auth.logout();
  }
};
