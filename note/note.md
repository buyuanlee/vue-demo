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

### 过滤器

#### 使用方法

Vue支持在{{ }} 插值的尾部添加小管道符"|"进行过滤，经常用于格式化文本，比如字母全部答谢，货币千位使用逗号分隔等，过滤的规则是自定义的，通过给Vue实例添加选项`filters`来设置。

#### 过滤器的写法

1. 过滤器+过滤器的名字
```html
{{data | filterData}}
```
2. 过滤器的串联
```html
{{data | filter1 |filter2 |filter3}}
```
3. 过滤器的参数
```html
{{data | filterData(arg1,arg2)}
```
注意此处的`arg1`和`arg2`对应的值分别是`filterData`里面的第二个和第三个参数
```javascript
var app = new Vue({
    el:'#el',
    data:{},
    filters:{
        filterData:function(value,a,b){
            
        }
    }
})
```
此处，对应的就是`a`与`b`

### 指令和事件

#### 指令
带有前缀`v-`,能帮我们快速完成DOM操作，循环渲染，隐藏和显示。

#### 四个常见的指令
1. `v-text`解析文本
2. `v-html`解析html
3. `v-bind`动态更新html上面的属性，如id、class等
4. `v-on`用来绑定事件监听器

### 语法糖
`v-bind`-----`:`
`v-on`----`@`

### 计算属性comuted
计算属性依赖于Vue中的数据
#### getter和setter
如果计算属性直接接一个function，默认的就是getter函数
#### 计算属性缓存
1. 页面中的方法：如果是调用方法，只要页面重新渲染，方法就会重新执行，不需要渲染，则不需要重新执行
2. 计算属性：不管渲染不渲染，只要计算属性依赖的数据未发生变化，就不会变化
#### 结论
1. 计算属性可以实现的，method一定可以实现
2. 计算属性是给予它的依赖的缓存的，当遍历大数组或者做大量计算的时候，应当使用计算属性。

### `v-bind`
#### v-bind的作用
动态地绑定一个或多个特性，或一个组件 prop 到表达式。
#### 绑定class的几种形式
1. 对象语法：对象的key是类名，value是布尔值。当class的表达式过长或者逻辑复杂时，还可以绑定一个计算属性
2. 数组语法：数组中的成员直接对应类名
3. 数组和对象混用
```html
<div :class="[{'active':isActive},errorClass]"></div>
```
4. 组件上使用（待）
#### 绑定内联样式
key代表style的属性值，value代表对应的值
```html
<div :style="{'color':color,'fontSize':fontSize+'px'}"></div>
```
**在Vue中，只要是大写字母都换转换成`-`加上小写字母**

### 内置基本指令
#### `v-cloak`遮盖物
> 这个指令保持在元素上直到关联实例结束编译。和 CSS 规则如 [v-cloak] { display: none } 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕。
1. 作用：解决初始化慢而导致的页面闪动
2. 一般与`[v-cloak]:{display: none;}`结合使用
#### v-once
定义它的元素和组件只渲染一次

### 条件渲染指令
#### v-if v-else-f v-else
1. 后面接的是等号，等号后的内容必须是布尔值
2. v-if的弊端：为了节约资源，会进行复用；解决方法：加key值
#### v-show
显现与否取决于布尔值
#### v-if与v-show的比较
1. v-if实时渲染：页面显示则渲染，不显示，则移除
2. v-show不管先不显示都会在DOM中。只是改变了display的属性
3. 结论：需要经常切换页面v-show，需要实时观察的话就用v-if

### 列表渲染v-for
#### 当需要将一个数组遍历或者枚举一个对象属性的时候循环显示时
#### v-for 一定是写在要遍历的元素上
#### 遍历多个对象（数组）
1. 普通写法
```html
<ul>
    <li v-for="item in items">{{itme.name}}</li>
</ul>
```
2. 获取索引
```html
<ul>
    <li v-for="（item,index) in items">{{index}}-{{itme.name}}</li>
</ul>
```
#### 遍历一个对象的多个属性

### 数组的更新、过滤与排序
- push()：在末尾添加元素
- pop()：将数组的最后一个元素移除
- shift()：删除数组的第一个元素
- unshif()：在数组的第一个元素位置添加一个元素
- splice()：可以添加或者删除函数，返回被删除的元素 
    * 第一个参数表示开始操作的位置
    * 第二个参数表示要操作的长度
    * 第三个参数为可选参数，如果有，表示需要增加的元素，可以为多个
- sort()：排序
- reverse()：反转

#### 2个检测不到的数组变动
1. 改变数组的制定项
    - 解决方法：Vue.set()
2. 改变数组长度
    - 解决方法：splice()
    
### 方法与事件
如果方法中带有参数，不加（），默认传原生事件对象。

### 修饰符
在vue中传入event对象用$event
- stop阻止单击事件向上冒泡
- prevent：提交事件并且不重载页面
- self：只是作用元素本身，而不是子元素时调用
- once：只执行一次的方法
#### 可以监听键盘事件
VueJS提供的
- .enter
- .tab
- .delete (捕获“删除”和“退格”键)
- .esc
- .space
- .up
- .down
- .left
- .right
- .ctrl
- .alt
- .shift
- .meta

### v-model与表单
#### 基本用法
用于在**表单类元素**上双向绑定事件
#### input和textarea
只依赖于绑定的数据，不再关心初始化时插入的value
#### 单选框
1. 单个单选按钮，直接用v-bind绑定一个布尔值（v-model不生效）
2. 如果是组合使用，就需要v-model来配合value使用，绑定选中的单选框的value值，此处所绑定的初始值可以随意给
#### 复选框
1.  单个复选框，直接绑定一个布尔值；可以用v-bind或者v-model
2.  多个复选框，v-model配合value使用，v-model绑定一个数组
#### 下拉框
1. 单选，所绑定的value值初始化可以为数组，也可以是字符串，有value直接优先匹配一个value值，没有value就匹配一个text值
2. 多选，v-model配合value使用，v-model绑定一个数组，与复选框类似
3. v-model一定是绑定在select标签上
#### 总结
如果是单选，初始化最好给定一个字符串；如果是多选，初始化最好给定一个数组
#### 绑定值
-  单选按钮   
只需要用v-bind给单个单选框绑定一个value值，此时v-model绑定的就是它的value值
- 多选按钮  
#### 修饰符
- lazy
- number
- trim  

### 组件
#### 组件的使用方法
1. 全局注册
    - 优点：所有的Vue实例都可以用
    - 缺点：权限太大，容错率降低
```javascript
    Vue.component(tag,{
        template:'<div>我是一个全局组件</div>'
    })
```
2. 局部注册
在table中受到限制是，利用is属性
```javascript
    new Vue({
        el: '#app',
        data: {},
        components: {
            'app-component': {
                template: `<div>我是一个局部组件</div>`
            }
        }
    })
```
```html
<table>
    <tbody is="my-compontent></tbody>"
</table>
```
#### 使用的注意事项
- 命名必须使用小写字母/短横杠（不可以用驼峰）
- template中内容必须被一个DOM元素包裹
- 在组件定义中，除了template之外还可以使用其他选项-data、computed、methods（data必须是一个方法）
```javascript
    new Vue({
        el: '#app',
        data: {},
        components: {
            'app-component': {
                template: `<div>我是一个局部组件</div>`,
                data:function(){
                    return {
                     
                    }
                }
            }
        }
    })
```
#### 使用props传递数据 父组件向子组件传递数据
- 在组件中使用props来从父组件中接收参数，在props中定义的属性，都可以在组件中直接使用
- **props中的数据来自父组件，data中return的数组是自身的数据。2种情况作用域都是组件本身，可以在template、methods、computed中直接使用**
- props的值有两种，一种是字符串数组，一种是对象
- v-bind动态绑定来自父组件的数据
```html
<son-component v-bind:sondata="parentdata"></son-component>
```
#### 是否使用v-bind传递数据的区别
```html
<child-component msg="[3,6,9]">
<child-component :msg="[3,6,9]">
```
第一个是字符串，第二个是数组
#### 单向数据流
##### 概念：props传递数据是单向的，父组件数据变化时会传递给子组件，反向不行
##### 目的：父子组件解耦，避免子组件影响父组件
##### 应用场景              
1. 父组件传递初始值进来，子组件将它作为初始值保存起来，在自己的作用域下可以随意使用和修改，这种情况可以在组件data内再声明一个数据，引用父组件的prop
    -  注册组件
    - 将父组件的数据传递进来，并在子组件中用props接收
    - 将传递进来的数据通过初始值保存起来
```html
<div id="app">
    <my-component init-count="Vue"></my-component>
</div>
<script>
    new Vue({
        el: '#app',
        data: {}
        components: {
            'my-component': {
                props: ['init-count'],
                template: `<div>{{init-count}}</div>`,
                data: function () {
                    return {
                        count: this.initCount
                    }
                }
            }
        }
    })
```
2. props作为需要被转变的原始值传入，这种情况用计算属性就可以了
    - 注册组件
    - 将父组件的数据传递进来，并在子组件中用props接收
    - 将传递进来的数据通过计算属性进行重新计算
```html
<div id="app">
    <input type="text" v-model="width">
    <my-component :width="width" msg="请输入宽度"></my-component>
</div>

<script src="https://cdn.bootcss.com/vue/2.5.17/vue.js"></script>
<script>
    new Vue({
        el: '#app',
        data: {
            width: '',
        },
        components: {
            'my-component': {
                props: ['msg', 'width'],
                template: `<div :style="style">{{msg}}</div>`,
                computed: {
                    style: function () {
                        return {
                            width: this.width + 'px',
                            background: 'green'
                        }
                    }
                }
            }
        }
    })
</script>    
```
### 关于命名方式
#### vue组件中的驼峰命名和短横线命名
##### 在html中，不区分大小写，例如myMsg和mysmg是一致的。因此在组件中的html中使用必须使用短横线命名方式。
##### 在组件中，父组件给子组件传递数据必须使用短横线命名。在`template`中，必须使用驼峰命名。
##### 在组件的`data`中，引用this.XXX只能是驼峰命名

### 数据验证
- type:类型
- defult：默认值
- required：是否必填
```javascript
Vue.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 匹配任何类型)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
})
```