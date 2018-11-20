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
### render函数的第三个参数-代表子节点
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