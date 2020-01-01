<template>
    <div class="container mt-3">
        <div class="row" v-if="bill">
            <div class="col-md-6 offset-md-3 offset-sm-0">
                <div class="row">
                    <div class="col-2">
                        <nuxt-link to="/bills" class="btn btn-danger mb-3 btn-sm">Back</nuxt-link>
                    </div>
                    <div class="col-10 mt-1 align-items-center">
                        <h5 class="d-inline text-center">{{bill.title}}</h5>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <small class="d-block mb-3">Date Created: {{bill.created_at}}</small>
                        <p>
                            {{bill.description}}
                        </p>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-12">
                        <h6>Recipients:</h6>
                        <table class="table">
                            <thead>
                            <tr>
                                <th>Email</th>
                                <th>Amount</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-if="bill.bill_recipients" v-for="(bill_recipient, index) of bill.bill_recipients" :key="index">
                                <td>
                                    {{bill_recipient.email}}
                                </td>
                                <td>
                                    ₦{{bill_recipient.amount}}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Details",
        mounted() {
            this.getBill();
        },
        data(){
          return {
              bill: null
          }
        },
        computed: {
            userBills() {
                return this.$store.getters['bills/getBills'];
            }
        },
        methods: {
            getBill(){
                try{
                    const { id } = this.$route.params;
                    if (!id) {
                        return this.$root.error({statusCode: 404, message: 'Page not found'})
                    }
                    this.bill = this.userBills.find(bill => {return bill.id === parseInt(id)});
                    if (!this.bill){
                        this.$router.push('/bills');
                    }
                }catch (e) {
                    this.$router.push('/bills');
                }
            }
        }
    }
</script>

<style scoped>

</style>
