var plusDate = function (value) {
    return value < 10 ? '0' + value : value
}
var app = new Vue({
    el: "#app",
    data: {
        data: new Date()
    },
    filters: {
        //这里的value就是需要过滤的数据
        formatDate: function (value) {
            var date = new Date()
            var year = date.getFullYear()
            var month = plusDate(date.getMonth() + 1)
            var day = plusDate(date.getDate())
            var hours = plusDate(date.getHours())
            var minutes = plusDate(date.getMinutes())
            var seconds = plusDate(date.getUTCSeconds())
            return year + '年' + '-' + month + '月' + '-' + day + '日\n' + hours + '时' + '-' + minutes + '分' + '-' + seconds + '秒'
        }
    },
    mounted: function () {
        var _this = this//this代表Vue实例
        this.timer = setInterval(function () {
            _this.data = new Date()
        }, 1000)
    },
    beforeDestroy: function () {
        if (this.timer) {
            clearInterval(this.timer)
        }
    }
})
//需求一：在页面中实时显示当前时间
//需求二：在月份，日期，小时等小于10的时候补0