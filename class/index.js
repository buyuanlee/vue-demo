new Vue({
    el: "#app",
    data: {
        a: true,
        b: true,
        styleObj: {
            classC: true,
            classD: true
        },
        m: true,
        arrClass: ['classE', 'classF']
    },
    methods: {
        toggle() {
            this.m = !this.m;
        }
    }
})