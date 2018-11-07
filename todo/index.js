new Vue({
    el: "#app",
    data: {
        todos: [
            {text: '看视频', done: true},
            {text: '做项目', done: false},
            {text: '看书', done: false},
            {text: '休息', done: false}
        ]
    },
    methods: {
        toggle(todo) {
            todo.done = !todo.done
        }
    }
})