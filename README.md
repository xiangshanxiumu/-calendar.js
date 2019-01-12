### 日历插件封装 calendar.js

使用方法:文档中外链式引入，<script type='text/javascript' src='calendar.js'></script>

new Calendar(Obj);

使用案例：

<div id='calendar'><div>

<script type='text/javascript'>

​    new Calendar({

​        id:"calendar",

​        width:"500px",

​        height:"500px"

})

</script>

上述案例 参数为对象，id为获取文档中节点，width和height也可不传，外部再设置CSS 也可以

或者其他同一文档下的外链js文件中也可以执行生成日历对象实例：

window.onload = function () {

​    new Calendar({

​        id:"calendar",

​        width:"500px",

​        height:"500px"

})

}

jQuery方法：

$(document).ready(function(){

​    new Calendar({

​        id:"calendar",

​        width:"500px",

​        height:"500px"

})

})



