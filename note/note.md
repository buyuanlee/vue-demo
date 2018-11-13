### 实例介绍

#### el

1. 用于指定页面中已经存在的DOM元素，挂载DOM中。
2. 可以是id，class或是便签

#### data

声明应用内需要双向绑定的数据

#### 访问

```javascript
var app = new Vue({
    el:'#app',
    data:{
        msg:'江来的报道不能有偏差',
        name:'长者'
    },
})
```



1. 访问Vue实例的属性

   `app.$el`

   `app.$data`

2. 访问data中的属性

   `app.msg`

   `app.name`

### 生命周期钩子

#### created

实例创建完成后调用，此阶段完成了数据的观测等，但尚未挂载，$el还不可用。需要初始化处理一些数据时比较有用

#### mounted 

el挂载到实例上后调用，一般我们的第一个业务逻辑会在这里开始。类似于jQuery的`$(document).ready()`方法

#### beforeDestroy

实例销毁之前调用，主要解绑一些使用addEventListener监听的事件等



### 文本插值和表达式

`{{}}`

文本插值的用法

简单的运算

三元运算符

文本插值不能书写表达式(语句和控制流)，支持单个表达式（注var a = x为多行表达式，因为var a;a = 6）



