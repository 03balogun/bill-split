<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-md-6 offset-md-3 offset-sm-0">
                <nuxt-link to="/bills" class="btn btn-danger mb-3 btn-sm">Back</nuxt-link>
                <form action="" @submit.prevent="createBill">
                    <error-alert :errors="billCreationErrors"></error-alert>
                    <div class="mt-2">
                        <strong class="mb-2 d-block">Bill Details</strong>
                        <div class="mt-3 mb-3">
                            <label for="title">Title</label>
                            <input type="text" v-model="billData.title" placeholder="A good time with Davido"
                                   class="form-control" name="title" id="title"/>
                        </div>
                        <div class="mt-3 mb-3">
                            <label for="description">Description</label>
                            <textarea name="description"
                                      v-model="billData.description"
                                      placeholder="Quarterly hangout with the boys. 1 - Hennesy, 2 - Jack and one large fish."
                                      id="description" class="form-control" cols="30"
                                      style="height: 150px"
                                      rows="10"></textarea>
                        </div>
                    </div>
                    <div class="mt-3">
                        <strong class="mb-2 d-block">Add Recipient</strong>
                        <div class="row">
                            <div class="col-5">
                                <label for="email">Email</label>
                                <input type="email" v-model="recipient.email" placeholder="Email Friend Email" class="form-control" name="email" id="email"/>
                            </div>
                            <div class="col-5">
                                <label for="amount">Amount</label>
                                <input type="number" v-model="recipient.amount" min="0" placeholder="Enter Amount" class="form-control" name="amount" id="amount"/>
                            </div>
                            <div class="col-2 d-flex align-items-end">
                                <button type="button"
                                        @click="addRecipient"
                                        class="btn btn-primary font-weight-bold" title="Add more recipient">Add</button>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-12">
                                <table class="table table-striped">
                                    <tbody>
                                    <tr v-if="!billData.recipients.length">
                                        <td colspan="3">No recipient added</td>
                                    </tr>
                                    <tr v-for="(recipient, index) in billData.recipients" v-else>
                                        <td>
                                            {{recipient.email}}
                                        </td>
                                        <td>
                                            ₦{{recipient.amount}}
                                        </td>
                                        <td class="d-flex">
                                            <button @click="removeRecipient(recipient.email)" type="button"
                                                    class="btn ml-auto btn-sm btn-outline-danger font-weight-bold">
                                                remove
                                            </button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="mt-3 mb-5">
                        <button :disabled="isLoading" class="btn btn-success btn-block">
                            {{!isLoading ? `Submit` : `Please wait...`}}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
  import {getUserFromLocalStorage} from "~/utils/storage";

  export default {
    name: 'index',
    head: {
      title: 'Create bill info',
    },
    computed: {
        billCreationErrors() {
            return this.$store.getters['bills/getBillCreationErrors'];
        }
    },
    async mounted() {
        this.currentUser = await getUserFromLocalStorage();
    },
    data() {
      return {
        isLoading: false,
        currentUser: {},
        billData: {
          title: "",
          description: "",
          recipients: [],
        },
        recipient: {
          email: "",
          amount: "",
        }
      }
    },
    methods: {
      addRecipient(){
          if (!this.recipient.email || !this.recipient.amount) return;
          this.billData.recipients.unshift(this.recipient);
          this.recipient = {}
      },
      removeRecipient(email){
          this.billData.recipients = this.billData.recipients
            .filter(obj => (obj.email !== email));
      },
      async createBill(){
          this.isLoading = true;
          this.billData.user_account_id = this.currentUser.user_account_id;
          const response = await this.$store.dispatch('bills/createBill', this.billData);
          this.isLoading = false;
          if (response) this.$router.push(`/bills/${response.bill[0].id}`);
      }
    }
  };
</script>

<style scoped>

</style>
