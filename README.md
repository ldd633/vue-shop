# 这是一个手机端的项目

主要采用vue-router，vue-resource，vuex，以及webpack开发的一个手机端的商城项目。
主要完成的事前端的功能，后台数据的接口在word文件里面。

每一个功能都有分析思路，代码也都有注释。


## [主流开源协议之间有何异同？](https://www.zhihu.com/question/19568896)

## 上传代码？？？
1. git add .
2. git commit -m "提交信息"
3. git push

## 制作首页App组件
1. 完成 Header 区域，使用的是 Mint-UI 中的Header组件
2. 制作底部的 Tabbar 区域，使用的是 MUI 的 Tabbar.html
 + 在制作 购物车 小图标的时候，操作会相对多一些：
 + 先把 扩展图标的 css 样式，拷贝到 项目中
 + 拷贝 扩展字体库 ttf 文件，到项目中
 + 为 购物车 小图标 ，添加 如下样式 `mui-icon mui-icon-extra mui-icon-extra-cart`
3. 要在 中间区域放置一个 router-view 来展示路由匹配到的组件

## 改造 tabbar 为 router-link

## 设置路由高亮

## 点击 tabbar 中的路由链接，展示对应的路由组件

## 制作首页轮播图布局

## 加载首页轮播图数据
1. 获取数据， 如何获取呢， 使用 vue-resource
2. 使用 vue-resource 的 this.$http.get 获取数据
3. 获取到的数据，要保存到 data 身上
4. 使用 v-for 循环渲染 每个 item 项

## 改造 九宫格 区域的样式

## 改造 新闻资讯 路由链接

## 新闻资讯 页面 制作
1. 绘制界面， 使用 MUI 中的 media-list.html
2. 使用 vue-resource 获取数据
3. 渲染真实数据

## 实现 新闻资讯列表 点击跳转到新闻详情
1. 把列表中的每一项改造为 router-link,同时，在跳转的时候应该提供唯一的Id标识符
2. 创建新闻详情的组件页面  NewsInfo.vue
3. 在 路由模块中，将 新闻详情的 路由地址 和 组件页面对应起来

## 实现 新闻详情 的 页面布局 和数据渲染

## 单独封装一个 comment.vue 评论子组件
1. 先创建一个 单独的 comment.vue 组件模板
2. 在需要使用 comment 组件的 页面中，先手动 导入 comment 组件
 + `import comment from './comment.vue'`
3. 在父组件中，使用 `components` 属性，将刚才导入 comment 组件，注册为自己的 子组件
4. 将注册子组件时候的，注册名称，以 标签形式，在页面中 引用即可

## 获取所有的评论数据显示到页面中

## 实现点击加载更多评论的功能
1. 为加载更多按钮，绑定点击事件，在事件中，请求 下一页数据
2. 点击加载更多，让 pageIndex++ , 然后重新调用 this.getComments() 方法重新获取最新一页的数据
3. 为了防止 新数据 覆盖老数据的情况，我们在 点击加载更多的时候，每当获取到新数据，应该让 老数据 调用 数组的 concat 方法，拼接上新数组
    （后面页数太多，则返回空，数据拼接上空没影响）

##（第三天）：发表评论
1. 把文本框做双向数据绑定
2. 为发表按钮绑定一个事件
3. 校验评论内容是否为空，如果为空，则提示用户，评论不能为空
4. 通过vue-resorce发送一个请求，把评论内容提交给服务器
5. 当发表评论成功后，重新刷新列表，查看最新的评论
    + 如果重新调用getComments方法刷新评论列表的树，可能只能得到最后一页的评论，前几页的评论可能获取不到
    + 所以换一种思路，当评论成功后，在客户端手动拼接出一个最新的评论，然后调用数组的unshift方法，把最新的评论追加到comments的开头

## 改造图片分析图片 按钮为 路由的连接并显示对应的组件页面
 ## 绘制图片列表组件页面结构并美化样式
 1. 顶部的滑动条的制作(效果没出来，错误还没解决)
 2. 制作底部的图片列表
 
 ## 制作顶部滑动条的坑们：
 1. 需要借助于mui中的tab-top-webview-main
 2. 需要把slider区域的mui-fullscreen类去掉
 3. 滑动条无法正常触发滑动，通过检查官方文档，这是js组件 ，需要出初始化
    + 导入js文件
    + 调用官方提供的方式去初始化
    ```
    mui('.mui-scroll-wrapper').scroll({
    	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    ```
4. 我们在初始化滑动条的时候，导入了mui.js但是，控制台报错`mui.js:3493 Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them`
 + 经过我们合理推测，觉得坑能是mui.js中用到了 'caller', 'callee', and 'arguments'，但是webpack
 打包好的bundle.js中，默认严格模式，所以这两者冲突了；
 + 解决方案：1. 把mui.js中的非严格模式的代码改掉：不现实。
             2. 把webpack打包严格模式给禁用；
 + 选择第二种方案：babel-plugin-transform-remove-strict-mode 这个插件
 7. 获取所有分类，渲染列表
 
  ###制作图片列表区
  1. 图片列表懒加载，使用mint-ui现成的组件`lazy-load`
  
  
  ###实现了图片里表的懒加载
  
  ###实现了点击图片跳转到图片详情页面
  1. 在改造li程router-link的时候，需要时用tag属性，指定要渲染为哪种元素
  
  ##实现详请页面的布局美化，同时获取数据，渲染页面
  
  +https://github.com/LS1231/vue-preview 缩略图插件
  
  ## 实现图片详情中缩略图功能
  1. 使用插件 https://github.com/LS1231/vue-preview 缩略图插件
  2. 获取到所有图片列表。
  3. 每个图片数据必须有w和h属性
