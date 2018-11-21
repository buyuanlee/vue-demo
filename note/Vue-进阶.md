## render函数
template下只允许一个子节点
**在render函数的方法中，第一个参数必须是`createElement`**
### render函数的第一个参数
1. 第一个参数必选.
2. 可选类型
    - string:html标签
    - object：一个含有数据选项的对象
    - function:返回一个含有数据选项的对象
```javascript
    Vue.component('child', {
        props: ['level'],
        render: function (createElement) {
            //string:html标签
            return createElement('h1')
            //object：一个含有数据选项的对象
            return createElement({
                template: '<div>谈笑风生</div>'
            })
            //function:返回一个含有数据选项的对象
            var domFun = function () {
                return {
                    template: `<div>谈笑风生</div>`
                }
            }
            return createElement(domFun())
        }
    })
```
### render函数的第二个参数
1. 第二个参数可选
2. 第二个参数是数据对象。只能是object
    - class
    - style
    - attrs
    - domProps
```javascript
    Vue.component('child', {
        props: ['level'],
        render: function (createElement) {
            return createElement('div', {
                class: {
                    foo: true,
                    baz: false
                },
                style: {
                    height: '34px',
                    background: 'orange',
                    fontSize: '16px'
                },
                //正常的html特性(除了class和style)
                attrs: {
                    id: 'foo',
                    title: 'baz'
                },
                //用来写原生的DOM属性
                domProps: {
                    innerHTML: '<span style="color:blue;font-size:24px">江心比心</span>'
                }
            })
        }
    })
```
### render函数的第三个参数-代表子节点(Vnode虚拟节点)
1. 第三个参数可选
2. String|Array
```javascript
    Vue.component('child', {
        props: ['level'],
        render: function (createElement) {
            return createElement('div', [
                createElement('h1', '我是大标题'),
                createElement('h2', '我是二标题'),
                createElement('h3', '我是三标题')
            ])
        }
    })
```

### this.$slots在render函数中的应用
`createElement(‘header’,header)`, 返回的就是VNODE
`var header = this.$slots.header`; //–这返回的内容就是含有=VNODE的数组
```html
<div id="app">
    <my-component>
        <h2 slot="header">长者语录</h2>
        <p>too yong, too simple</p>
        <p>年轻人，不要想着搞一个大新闻</p>
        <p slot="footer">将来的报道不能有偏差</p>
    </my-component>
</div>

<script src="https://cdn.bootcss.com/vue/2.5.17/vue.js"></script>
<script>
    Vue.component('my-component', {
        render: function (createElement) {
            var header = this.$slots.header
            var footer = this.$slots.footer
            var main = this.$slots.default
            return createElement('div', [
                createElement('header', header),
                createElement('main', main),
                createElement('footer', footer)
            ])
        }
    })
    var app = new Vue({
        el: '#app',
        data: {}
    })
</script>
```

### 在render函数中使用Props传递数据
```html
<div id="app">
    <button @click="switchShow">点击显示</button>
    {{show}}
    <my-component :show="show"></my-component>
</div>

<script src="https://cdn.bootcss.com/vue/2.5.17/vue.js"></script>
<script>
    Vue.component('my-component', {
        props: ['show'],
        render: function (createElement) {
            var imgSrc
            if (this.show) {
                imgSrc = 'https://images.unsplash.com/photo-1542719980-e02651ff5b38?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6adf0e37abb17989452bffca2438dc86&auto=format&fit=crop&w=500&q=60'
            } else {
                imgSrc = 'https://images.unsplash.com/photo-1542696971-bedf437263f6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9884cfc840c17101331470d215f79821&auto=format&fit=crop&w=500&q=60'
            }
            return createElement('img', {
                attrs: {
                    src: imgSrc
                },
                style: {
                    width: '25%',
                    height: '25%'
                }
            })

        }
    })
    var app = new Vue({
        el: '#app',
        data: {
            show: false
        },
        methods: {
            switchShow: function () {
                this.show = !this.show
            }
        }
    })
</script>
```
### v-model在render函数中的应用
```html
<div id="app">
    <my-component :name="name" @input="showName"></my-component>
    <br>{{name}}
</div>

<script src="https://cdn.bootcss.com/vue/2.5.17/vue.js"></script>
<script>
    Vue.component('my-component', {
        props: ['name'],
        render: function (createElement) {
            //此处的this指的是当前的Vue实例：my-component
            var self = this
            return createElement('input', {
                domProps: {
                    value: self.name
                },
                on: {
                    //传递的是原生的event事件
                    input: function (event) {
                        //这里的this是window，故不可用
                        //this.$emit('input', event.target.value)
                        //input框的输入内容：event.target.value
                        self.$emit('input', event.target.value)
                    }
                }
            })
        }
    })
    var app = new Vue({
        el: '#app',
        data: {
            name: '长者'
        },
        methods: {
            //此处的value是触发input事件后传递过来的值
            showName: function (value) {
                this.name = value
            }
        }
    })
</script>
```
### 作用域插槽在render函数中的应用
向组件的插槽中传递数据
1. 定义`template`模版
2. 用scope标签声明；例`scope="prop"`
3. 文本插值获取数据;例`{{prop.text}}`
```html
<div id="app">
    <my-component>
        <!--prop是render函数中传递过来的内容-->
        <template scope="prop">
            {{prop.text}}
        </template>
    </my-component>
</div>

<script src="https://cdn.bootcss.com/vue/2.5.17/vue.js"></script>
<script>
    Vue.component('my-component', {
        props: [],
        render: function (createElement) {
            //$scopedSlots通过作用域插槽向父组件插槽传递数据
            return createElement('div', this.$scopedSlots.default({
                text: '我是子组件传递过来的数据'
            }))
        }
    })
    var app = new Vue({
        el: '#app',
        data: {},
        methods: {}
    })
</script>
```
### 函数化组件的应用
functional:true表示组件无状态无实例（用函数化组件来构建组件的时候，组件中无data和this）
```javascript
this.text---context.props.text
this.$slots.default---context.children
```