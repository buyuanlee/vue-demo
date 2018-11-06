new Vue({
    el: "#app",
    data: {
        message:'nihao'
    },
    methods: {
        changeFirstChar: function(todo){
            this.message = 'good evening'
        }
    },
    filters:{
        changeChar(value){
            if(!value){
                return '';
            }else{
                return value.charAt().toUpperCase()+value.substring(1)
            }
        }
    }
})