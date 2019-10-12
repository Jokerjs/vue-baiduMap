<template>
  <div class="layout">
    <Menu mode="horizontal" theme="dark" active-name="index">
      <div class="layout-logo"></div>
      <div class="layout-nav">
        <Menu-item name="index">
          <Icon type="ios-navigate"></Icon>
          首页
        </Menu-item>
      </div>
    </Menu>
    <Menu mode="horizontal" :active-name="name">
      <div class="layout-assistant">
        <Menu-item name="MyMap" to="my-map">地图</Menu-item>
        <Menu-item name="Charts" to="Charts">Charts</Menu-item>
        <Menu-item name="EchartsMap" to="echarts-map">Echarts地图</Menu-item>
        <Menu-item name="HenanMap" to="henan-map">河南地图</Menu-item>
        <Menu-item name="ZhengzhouMap" to="zhengzhou-map">郑州地图</Menu-item>
        <Menu-item name="JinshuiMap" to="jinshui-map">金水区地图</Menu-item>
      </div>
    </Menu>
    <div class="layout-breadcrumb">
      <Breadcrumb>
        <Breadcrumb-item href="#">首页</Breadcrumb-item>
        <Breadcrumb-item href="#">{{title}}</Breadcrumb-item>
      </Breadcrumb>
    </div>
    <div class="layout-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import router from '@/router'
export default {
  name: 'layout',
  data () {
    return {
      menu: null,
      title: '',
      name: '',
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    this.title = this.$route.meta.title
    this.name = this.$route.name
    router.beforeEach((to, from, next) => {
      this.title = to.meta.title
      this.name = to.name
      next()
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
  }
  .layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout-nav{
    width: 420px;
    margin: 0 auto;
  }
  .layout-assistant{
    margin: 0 auto;
    height: inherit;
  }
  .layout-breadcrumb{
    padding: 10px 15px 0;
  }
  .layout-content{
    min-height: 400px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
  .layout-content-main{
    padding: 10px;
  }
  .layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
</style>
