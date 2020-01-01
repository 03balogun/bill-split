<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-md-8 offset-md-2 offset-0">
                <div class="d-flex align-items-end mb-5">
                    <div class="ml-auto d-sm-block d-md-flex">
                        <nuxt-link to="/bills/create" class="btn btn-primary">Create new bill</nuxt-link>
                        <button @click="logout" class="btn btn-danger ml-4">Logout</button>
                    </div>
                </div>
                <p v-if="this.currentUser.username">
                    Hi <strong>{{this.currentUser.username}}</strong> ✌🏽
                </p>
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th>
                            Title
                        </th>
                        <th>
                            Recipients
                        </th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if="isLoading && !userBills.length">
                        <td colspan="3" class="text-primary">Loading bill history...</td>
                    </tr>
                    <tr v-if="!isLoading && userBills.length === 0">
                        <td colspan="3">
                            <span class="text-danger">No previous billing.</span>
                            <nuxt-link to="/bills/create">Create new bill</nuxt-link>
                        </td>
                    </tr>
                    <tr v-if="userBills.length > 0" v-for="(bill, index) of userBills" :key="index">
                        <td>
                            {{bill.title}}
                        </td>
                        <td>
                            {{bill.bill_recipients.length}}
                        </td>
                        <td class="d-flex">
                            <nuxt-link :to="`bills/${bill.id}`" class="btn btn-sm btn-success ml-auto">
                                Details
                            </nuxt-link>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
  import {getUserFromLocalStorage} from "~/utils/storage";

  export default {
    name: 'Bills',
    middleware: 'auth',
    async mounted(){
        this.currentUser = await getUserFromLocalStorage();
        this.fetchBills();
    },
    data(){
      return {
        isLoading: true,
        currentUser: {}
      }
    },
    computed: {
      userBills() {
        return this.$store.getters['bills/getBills'];
      }
    },
    methods:{
      async fetchBills(){
          if (this.currentUser){
              await this.$store.dispatch('bills/fetchBills', this.currentUser.user_account_id);
              this.isLoading = false;
          }
      },
      async logout(){
        await this.$store.dispatch('authentication/logout');
        window.location.href = "/login";
      }
    }
  };
</script>

<style scoped>

</style>
