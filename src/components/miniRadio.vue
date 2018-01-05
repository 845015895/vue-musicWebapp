<template>
  <div class="miniRadio" v-show="showMini">
    <!--<audio id="audio" v-on:ended="musicEnd($event)" v-bind:src="musicUrl" controlsList="nodownload" preload="auto"-->
           <!--v-on:canplay="canplaythrough" autoplay="autoplay">-->

      <div class="authorImg" :style="{background:`url(${singerImg})`,backgroundSize:`cover`}"></div>
      <audio id="audio"  v-bind:src="musicUrl" autoplay="autoplay">
      亲 您的浏览器不支持html5的audio标签
    </audio>
  </div>
</template>
<style lang="scss">
  @import "../scss/size";

  .miniRadio{
    width: 100%;
    height: px(76);
    position: fixed;
    left: 0;
    bottom: 0;
    background: rgba(0,0,0,.9);
    color: #fff;
    display: flex;
    align-items: center;
  }
  .authorImg{
    width: px(65);
    height: px(65);
  }

</style>
<script>
export  default {
  data(){
    return {
      musicUrl: "",
      show: false,
      showMini: false,
      singerImg: ""
    }
  },
  created(){
    let self =this;
    this.$root.$on("musicUrl",function (musicUrl) {
      self.musicUrl = musicUrl;
    });
    this.$root.$on("showMini",function (showMini) {
      self.showMini = showMini;
    });
    this.$root.$on("singerImg",function (singerImg) {
      self.singerImg = singerImg;
    })
  },
//  props: ["musicUrl"]
}
</script>
