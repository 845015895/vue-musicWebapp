<template>
  <div class="miniRadio" v-show="showMini">
    <!--<audio id="audio" v-on:ended="musicEnd($event)" v-bind:src="musicUrl" controlsList="nodownload" preload="auto"-->
    <!--v-on:canplay="canplaythrough" autoplay="autoplay">-->

    <!--歌手图片-->
    <div class="authorImg" :style="{backgroundImage:`url(${singerImg})`,backgroundSize:`cover`}"></div>
    <!--歌名-->
    <div class="musicBar">
      <p class="songName">{{songName}}</p>
      <p class="authorName">{{authorName}}</p>
    </div>

    <!--操作区域-->
    <div class="btnGroup">
      <div class="btn playBtn" id="playBtn" v-show="!isPlaying" v-on:click="play()"></div>
      <div class="btn pauseBtn" v-show="isPlaying" v-on:click="stop()"></div>
      <!--<div class="btn playBtn" v-show="!isPlaying"></div>-->
      <!--<div class="btn pauseBtn" v-show="isPlaying"></div>-->
      <div class="btn nextBtn" v-on:click="next()"></div>
    </div>
    <!--音乐播放器标签-->
    <!--<audio id="audio" v-bind:src="musicUrl" autoplay="autoplay" v-on:ended="musicEnd($event)"  v-on:canplay="canplaythrough">-->
    <!--<audio id="audio" v-on:ended="musicEnd($event)" v-bind:src="musicUrl" controlsList="nodownload" preload="auto"-->
    <!--v-on:canplay="canPlay()" autoplay="autoplay" v-on:play="isPlay()" >-->
    <audio id="audio" v-on:ended="musicEnd($event)" v-bind:src="musicUrl" controlsList="nodownload" preload="auto"
           autoplay="autoplay" v-on:play="isPlay()">
      亲 您的浏览器不支持html5的audio标签
    </audio>
  </div>
</template>
<style lang="scss">
  @import "../scss/size";

  .miniRadio {
    width: 100%;
    height: px(76);
    position: fixed;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .9);
    color: #fff;
    display: flex;
    align-items: center;
    padding-left: px(5);

    .authorImg {
      width: px(65);
      height: px(65);
      box-sizing: border-box;
      border-radius: px(5);
    }

    .musicBar {
      box-sizing: border-box;
      padding-left: px(10);
      width: px(170);

      .songName {
        width: px(170);
        font-size: px(16);
        padding-bottom: px(5);
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      .authorName {
        font-size: px(13);
        color: #888;
      }
    }

    .btnGroup {
      display: flex;
      .btn {
        width: px(35);
        height: px(35);
      }
      .playBtn {
        background: url("../assets/play_icon.png");
        background-size: cover;
      }
      .pauseBtn {
        background: url("../assets/pause_icon.png");
        background-size: cover;
      }
      .nextBtn {
        margin-left: px(15);
        background: url("../assets/next_icon.png");
        background-size: cover;
      }

    }

  }


</style>
<script>
  import $ from "jquery";
  import music from "../assets/music.mp3";

  export default {
    data() {
      return {
        musicUrl: "",
        show: false,
        showMini: false,
        singerImg: "",
        songName: "",
        authorName: "",
        isPlaying: false,
        currentIndex: "",
        musicId: "",
        songList: "",
        //是哪一版块来的数据
        component: false,
        index: ""

      }
    },
    created() {

      let self = this;
      this.$root.$on("index", function (index) {
        self.currentIndex = index;
      });
      this.$root.$on("songList", function (songList) {
        self.songList = songList;
      });

      this.$root.$on("component", function (component) {
        self.component = component;
      });
      this.$root.$on("showMini", function (showMini) {
        self.showMini = showMini;
      });
      this.$root.$on("index", function (index) {
        self.index = index;
      });
      this.$root.$on("data", function (data) {
        self.musicUrl = data.play_url;
        self.singerImg = data.img;
        self.songName = data.song_name;
        self.authorName = data.audio_name.split("-")[0];
//
      });


    },
    mounted: function () {

    },
    methods: {
      play: function () {
        let audio = document.querySelector('#audio');
        if (!this.isPlaying) {
          audio.load();
          audio.play();
          document.addEventListener("WeixinJSBridgeReady", function () {
            audio.load();
            audio.play();
          }, false);
          this.isPlaying = true;
        }
      },
      stop: function () {
        let audio = document.querySelector('#audio');
        if (this.isPlaying) {
          audio.pause();
          this.isPlaying = false;
        }
      },
      next: function () {

        let self = this;
        ++self.currentIndex;
        switch (self.component) {
          case "hot":
            this.$root.$emit( "indexData",{"component":"hot","index":self.currentIndex});
            break;
          case "soar":
            this.$root.$emit( "indexData",{"component":"soar","index":self.currentIndex});
            break;
          case "new":
            this.$root.$emit( "indexData",{"component":"new","index":self.currentIndex});
            break;
          case "search":
            this.$root.$emit( "indexData",{"component":"search","index":self.currentIndex});
            break;
        }

      },
//      canPlay: function () {
//        this.play();
//        console.log("可以开始")
//      },
      isPlay: function () {
        this.isPlaying = true;
      },
      musicEnd: function (e) {
        let audio = e.target;
        let self = this;
        self.isPlaying = false;
        audio.currentTime = 0;
        ++self.currentIndex;
        switch (self.component) {
          case "hot":
            this.$root.$emit( "indexData",{"component":"hot","index":self.currentIndex});
            break;
          case "soar":
            this.$root.$emit( "indexData",{"component":"soar","index":self.currentIndex});
            break;
          case "new":
            this.$root.$emit( "indexData",{"component":"new","index":self.currentIndex});
            break;
          case "search":
            this.$root.$emit( "indexData",{"component":"search","index":self.currentIndex});
            break;
        }
      },

    }
//  props: ["musicUrl"]
  }
</script>
