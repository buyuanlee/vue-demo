new Vue({
    el: "#app",
    data: {
        name: '🐸',
        msg: ''
    },
    methods: {
        tellYou() {
            this.onepiece = '苟利'
        }
    },
    computed: {
        onepiece: {
            get() {
                return this.name + '👓';
            },
            set(newVal) {
                this.msg = newVal + '国家生死以，岂因祸福避趋之';
            }
        }
    }
})