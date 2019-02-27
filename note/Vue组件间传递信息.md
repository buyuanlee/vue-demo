# Vue组件间传递数据
组件是Vue很强大的一个功能，所以掌握Vue组件之间的信息传递很重要。大致分为三种常见的情况。
- 父组件向子组件传递数据
- 子组件向父组件传递数据
- 兄弟组件传递数据

下面我们就这三种情况，分别演示其方法
## 父组件通过rop向子组件传递数据
> Prop 是你可以在组件上注册的一些自定义特性。当一个值传递给一个 prop 特性的时候，它就变成了那个组件实例的一个属性。    

- 一个组件可以拥有任意数量的prop
- 任何值都可以传递给任何prop    
**demo**
```html
<div id="app">
    <my-component title="我是第一个组件"></my-component>
    <my-component title="我是第二个组件"></my-component>
    <my-component title="我是第三个组件"></my-component>
</div>

<script src="https://cdn.bootcss.com/vue/2.5.17/vue.js"></script>
<script>
    Vue.component('my-component', {
        props: ['title'],
        template: '<h2>{{title}}</h2>'
    })


    new Vue({
        el: '#app',
        data: {},
    })
</script>
```

## 通过事件子组件向父组件发送数据
类似于JavaScript的设计模式——观察者模式，`dispatchEvent`和`addEventListener`。在Vue中，子组件用`$emit()`来触发事件，父组件用`$on()` 来监听子组件的事件。

- 自定义事件
- 在子组件中用`$emit`触发事件，第一个参数是事件名，后边的参数是要传递的数据
-  在自定义事件中用一个参数来接受     
**demo**
```html
<div id="app">
    <div :style="{ fontSize: postFontSize + 'em' }">
        <blog-post
                v-for="post in posts"
                v-bind:key="post.id"
                v-bind:post="post"
                @change="enlargeText"
        ></blog-post>
    </div>
</div>
<script>
    Vue.component('blog-post', {
        props: ['post'],
        template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <button @click="$emit('change')">
        增大字号
      </button>
      <div v-html="post.content"></div>
    </div>
  `
    })

    new Vue({
        el: '#app',
        data: {
            posts: [
                {id: 1, title: '我是标题一'},
                {id: 2, title: '我是标题二'},
                {id: 3, title: '我是标题三'}
            ],
            postFontSize: 1
        },
        methods: {
            enlargeText: function () {
                this.postFontSize += 0.1
            }
        }
    })
</script>
```
## 使用bus进行兄弟组件传递数据
在兄弟组件进行数据传递时，通常的做法是使用一个空的Vue实例作为中央事件总线：
```javascript
var bus = new Vue()
```
```javascript
//触发组件A中的事件
bus.$emit('id-selected',1)
```
```javascript
//在组件B创建的钩子中监听事件
bus.$on('id-selected',function(id){
    //...
})
```
**demo**
```html
<div id="app">
    <first-component></first-component>
    <second-component></second-component>
</div>

<script>
    Vue.component('first-component', {
        template: `<div><button @click="handle">点我向b组件传递数据</button></div>`,
        data: function () {
            return {
                aaa: '我是来自A组件的内容'
            }
        },
        methods: {
            handle: function () {
                this.$root.bus.$emit('haha', this.aaa)
            }
        }
    })
    Vue.component('second-component', {
        template: `<div>我是一个组件</div>`,
        created: function () {
            this.$root.bus.$on('haha', function (value) {
                alert(value)
            })
        }
    })
    new Vue({
        el: '#app',
        data: {
            bus: new Vue()
        }
    })
</script>
```
#### 父链
`this.$parent`
#### 子链(利用索引)
```html
<my-component ref='xxx'>
```
`this.$refs.xxx`