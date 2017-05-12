### Swiper
#### 基本结构
![Alt text](http://www.swiper.com.cn/uploads/allimg/141225/1-141225162955559.png)
***
#### 名词解释
| 名词          | 描述           
| ------------- |:-------------
| Swiper | 整个滑动对象，有时特指滑块释放后仍然正向移动直到贴合边缘的过程(过渡)
| container | Swiper的容器，里面包括滑动块（slides）的封套（wrapper)、分页器(pagination)、前进按钮等      
| wrapper | 触控的对象，可触摸区域，移动的块的集合，过渡时会随slide切换产生位移
| slider | 切换的滑块，可以包含文字、图片、html元素或另外一个Swiper
| pagination | 分页器，指示slide的数量和当前活动的slide
| active slide | 活动滑块，即当前看到的(visible)slide，当可视slide不止一个时，默认最左边那个是活动滑块
| callback | 回调函数，在某些情况下触发
***
#####实例
```
<div class="swiper-container">
  <div class="swiper-wrapper">
    <div class="swiper-slide">slider1</div>
    <div class="swiper-slide">slider2</div>
    <div class="swiper-slide">slider3</div>
  </div>
</div>
<script> 

var mySwiper = new Swiper('.swiper-container', {
    initialSlide :2,//设定初始化时slide的索引
    direction : 'vertical',//Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)
    speed:300,//滑动速度，即slider自动滑动开始到结束的时间（单位ms），也是触摸滑动时释放至贴合的时间。
    autoplay: 5000,//自动切换的时间间隔（单位ms），不设定该参数slide不会自动切换
    //可以在某个slide上设置单独的停留时间，例<div class="swiper-slide" data-swiper-autoplay="2000">
    
})
</script>
```
利用transition-timing-function改变Swiper的切换时间曲线
http://bbs.swiper.com.cn/forum.php?mod=viewthread&tid=13
