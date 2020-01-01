export default {
    setRequestErrors(state, { response, type}){
        if (!response) {
            state[type] = ['Please check your network and try again.'];
            return;
        }
        if (response.status === 400){
            let { message: errors } = response.data;
            errors = Object.keys(errors).map( error_key => {
                if (errors[error_key]){
                    return errors[error_key].map( errorMessages => errorMessages).join(' ')
                }
            });
            state[type] = errors;
            return;
        }
        state[type] = ['Internal server error, contact admin if error persist.']
    },
    removeErrors(state, type){
        state[type] = [];
    }
}
