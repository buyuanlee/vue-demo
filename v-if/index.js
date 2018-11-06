new Vue({
    el: "#app",
    data: {
        name: 'green'
    },
    methods: {
        //不能为箭头函数，否则this不对
        toggle: function (event) {
            if (this.name === 'green') {
                this.name = 'orange'
            } else {
                this.name = 'green';
            }
        }
    }
})