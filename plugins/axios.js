import {setUserData} from "../utils/storage";

export default function ({ $axios, redirect, route }) {
  $axios.setBaseURL(process.env.API_URL);
  if (process.server) {
    return;
  }


  $axios.interceptors.response.use(async (response) => {
    if (route.name === 'login' && response.data){
      const { user }  = response.data.message;
      if (user) await setUserData(user);
    }
    return response
    },
    function (error) {
      if (error.response.status === 401) {
        // unauthorized request or expired token, use refresh token here. For now redirect back to login
        return redirect('/login');
      }
      return Promise.reject(error)
    });


  $axios.onError(error => {
    //
  });
}
