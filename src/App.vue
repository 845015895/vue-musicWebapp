<template>
  <div id="app">
    <header-bar></header-bar>
    <tab-bar>
      <tab-item v-bind:class="{active:isActive1}" id="tab1" >推荐音乐</tab-item>
      <tab-item v-bind:class="{active:isActive2}" id="tab2" >热歌榜</tab-item>
      <!--<tab-item v-bind:class="{active:isActive3}" id="tab3" >新歌榜</tab-item>-->
      <tab-item v-bind:class="{active:isActive3}" id="tab3" >搜索</tab-item>
    </tab-bar>
    <transition>
      <keep-alive>
        <router-view/>

      </keep-alive>
      </transition>

    <mini-radio ></mini-radio>

  </div>
</template>

<script>
  import "./tools/resize"
  import $ from "jquery";
  import headerBar from "./components/header.vue";
  import tabBar from "./components/tab/tabBar.vue";
  import tabItem from "./components/tab/tab-item.vue";
  import miniRadio from "./components/miniRadio.vue"

  export default {
    name: 'app',
    data() {
      return {
        isActive1: true,
        isActive2: false,
        isActive3: false,
        showMini: false
//        isActive4: false,
      }
    },
    components: {
      tabItem,
      headerBar,
      tabBar,
      miniRadio
    },
    created: function () {
      this.$router.push("/");

    },
    mounted: function () {
      let self = this;

      $("#tab1").click(function () {
        self.isActive1 = true;
        self.isActive2 = false;
        self.isActive3 = false;
//        self.isActive4 = false;
       self.$router.push("recommend");
      });
      $("#tab2").click(function () {
        self.isActive1 = false;
        self.isActive2 = true;
        self.isActive3 = false;
//        self.isActive4 = false;
        self.$router.push("hotMusic");
      });
      $("#tab3").click(function () {
        self.isActive1 = false;
        self.isActive2 = false;
        self.isActive3 = true;
//        self.isActive4 = false;
        self.$router.push("search");
      });
//      $("#tab4").click(function () {
//        self.isActive1 = false;
//        self.isActive2 = false;
//        self.isActive3 = false;
//        self.isActive4 = true;
//        self.$router.push("mine");
//      });
    },
  }
</script>

<style lang="scss">
  @import "./scss/_size.scss";
  *{
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;

  }

  .active {
    color: #d43c33;
    box-sizing: border-box;
    border-bottom: px(4) solid #d43c33;
  }
</style>
