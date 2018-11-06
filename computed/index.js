new Vue({
    el: "#app",
    data: {
        firstName: 'Lee',
        lastName: 'JianWei'
    },
    computed: {
        fullName() {
            return this.firstName + '---' + this.lastName;
        }
    },
})

// * 计算缓存vs方法(Methods)
    // * 计算属性computed具有缓存，而methods无缓存
// * Computed属性vs 侦听器(Watch属性)
    // * watch方法--观察Vue实例上的数据变动,只要指定的数据改变就会执行预定的函数