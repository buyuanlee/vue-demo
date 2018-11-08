new Vue({
    el: "#app",
    components: {
        'child': {
            props: ['msg'],
            template: '<h2>{{msg}}</h2>'
        }
    }
})