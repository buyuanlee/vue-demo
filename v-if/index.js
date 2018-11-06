new Vue({
    el: "#app",
    data: {
        inputName:'username'
    },
    methods: {
        toggle: function(todo){
            if(this.inputName==='username'){
                this.inputName = 'psd'
            }else{
                this.inputName = 'username';
            }
        }
    }
})