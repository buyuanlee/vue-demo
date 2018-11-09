Vue.component('add-life', {
    data: function () {
        return {
            count: 0
        }
    },
    template: '<button v-on:click="count++">你的生命值续 {{ count }} s</button>'
})

new Vue(
    {
        el: '#sacrifice'
    }
)