import Vue from 'vue';
import ErrorAlert from '~/components/ErrorAlert.vue'

const components = {ErrorAlert};

Object.entries(components).forEach(([name, component]) => {
    Vue.component(name, component)
});
