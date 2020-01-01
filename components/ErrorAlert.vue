<template>
    <div class="alert alert-danger alert-dismissable mt-2 mb-2" v-if="errors.length" role="alert">
        <h5 class="alert-heading mb-2 font-w400">Error</h5>
        <ul class="" style="padding-left: 18px;">
            <li class="list-item"
                v-for="(error, index) of errors" :key="index">
                {{error}}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "ErrorAlert",
        props: {
            errors: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>
