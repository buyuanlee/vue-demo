new Vue({
    el: "#app",
    data: {
        msg: 'too yong,too simple',
        isChange: '忠告一'
    },
    watch: {
        msg(val, newVal) {
            this.isChange = '忠告二'
        }
    },
    methods: {
        change() {
            this.msg = 'sometime naive'
        }
    }
})