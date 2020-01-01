export default {
  methods: {
    showPassword(ev){
      const password = document.getElementById('password');
      if(password.type === 'text'){
        password.type = 'password';
        ev.target.innerText = 'show';
      }else {
        password.type = 'text';
        ev.target.innerText = 'hide';
      }
    }
  }
}
