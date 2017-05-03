### 嗯 你可能认为我会说些什么 

### 框架 
这个模板是使用vue-cli这个脚手架初始化的项目，你可以自己尝试下。因为我用的是scss，所以安装完成之后还需要装sass-loader，有些时候node-sass又因为什么什么的给什么什么了，所以也需要装下，嗯，差不多就是这样。

Vue2.2.6  你想要的东西可能在根目录的package.json里面。

### 他是做什么的 
哇哈哈哈，咳咳，他是一个上拉加载更多和下拉刷新的组件，因为刚性的需求，我不得不做，所以做好了分享下，并且欢迎大家给建议，毕竟老夫还是个柴鸡。

### 怎么用？
一脸懵逼

你想剔出来用？

核心文件

>src/components/pull_refresh.vue

>src/style/pull_refresh.scss

1、在公共入口处或者局部使用都行

>import vRefresh from './components/pull_refresh.vue'

>Vue.component('v-refresh',vRefresh);

2、你来看下就是了
    <template>
        <div>
            <v-refresh 
            :on-class = "'model-scroll'"
            :on-mode = "0"
            :on-more = "success"  
            :on-tip = "tip"
            :on-tip-show = "true"
            :on-infinite = "infinite"
            :on-refresh = "refresh" >
                <ul class="model-list">
                    <li v-for="(i,index) in item">
                        <span>{{i}}</span>
                    </li>
                </ul>
            </v-refresh>
        </div>
    </template>

    <script type="text/javascript">
        export default{
            data(){
                return{
                    item: 7,
                    success: true,
                    tip: '主人看我,看我干嘛'
                }
            },
            methods:{
                infinite : function(){
                    var _V = this;
                    /*  这里是模拟ajax或者什么其他的请求数据延迟的情况，
                    *   所以我随便延迟了1秒，不然加载成功很快，过渡的
                    *   文字提示可能看都看不到
                    */
                    setTimeout(()=>{
                        _V.item += 1;
                        _V.success = false;
                    },1000);
                },
                refresh : function(){
                    var _V = this;
                    /*  这里是模拟ajax或者什么其他的请求数据延迟的情况，
                    *   所以我随便延迟了1秒，不然加载成功很快，过渡的
                    *   文字提示可能看都看不到
                    */
                    setTimeout(()=>{
                        _V.item += 1;
                        _V.success = false;
                    },1000);
                }
            }
        }
    </script>

so cool

### 参数详解
>onClass：
    类型：String
    默认值：'',
    是否必传：false

    作用：为scroll-box增加自定义样式名，
    注：如果需要监听内容更改onContentChange并定位到顶部需要传递onClass参数，
    如果你没有这个需求，那你管他干嘛呢

>onTipShow
    类型：Boolean
    默认值：true,
    是否必传：false

    作用：控制上拉加载更多和下拉刷新的文字提示是否显示

>onTip
    类型：String
    默认值：'加载成功',
    是否必传：false

    作用：控制加载成功或者失败的提示语，你想怎么蹂躏他呢？

>onMore
    类型：Boolean
    默认值：false,
    是否必传：true

    作用：决定本次上拉或者下拉是否状态是否完成，我才不管你请求成功与否

>onContentChange
    类型：Boolean
    默认值：false,
    是否必传：false

    作用：监听pull-content里面的内容是否更改，
    注：如果需要监听内容更改onContentChange并定位到顶部需要传递onClass参数，
    如果你没有这个需求，那你管他干嘛呢

>onMode
    类型：Number
    默认值：0,
    是否必传：false

    作用：加载模式
            0: 上拉加载和下拉刷新都会监听;
            1: 仅仅监听下拉刷新;
            2: 仅仅监听上拉加载更多;
            3: 老子不管了，什么都不做，就只有滑动怎么了

>onInfinite
    类型：Function
    默认值：function(){},
    是否必传：false

    作用：上拉加载更多执行的函数，你也看到我有默认值了

>onRefresh
    类型：Function
    默认值：function(){},
    是否必传：false

    作用：下拉刷新执行的函数，你也看到我兄弟有默认值了


### 你认为我玩了？

是的，没错，完了，如果你发现了bug，那么很不幸，快点和我说，我把它修复了你就当没有发生过，如果没有发现bug而且你觉得对你有些用，来吧，给我些鼓励，star一下吧（我才不管，你不给我star，今天你跑不掉）。

### END
