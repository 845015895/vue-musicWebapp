<template>
  <div class="hot">
    <div v-show="showLoading" class="loadingBar">
      <mt-spinner type="fading-circle" :size="30"></mt-spinner>
    </div>
    <div v-show="!showLoading">
      <div class="hotBanner">
        <div>
          <div class="hotTitle"></div>
          <div class="updateDate">更新日期：{{date}}</div>
        </div>
        <div class="shadow"></div>

      </div>
      <ul class="musicList">
        <li v-for="(item,index) in songList" v-on:click=" showMiniRadio(index)">
          <div :class="{top:index<3}" class="topNum">
            {{index < 9 ? "0" + (index + 1) : index + 1}}
          </div>
          <div class="songList">
            <p>{{item.filename.split("-")[1]}}</p>
            <p>{{item.filename.split("-")[0] + "- "}}{{item.remark ? item.remark : item.filename.split("-")[1]}}</p>
          </div>
          <div class="playImg"></div>

        </li>
      </ul>
    </div>

    <!--<mini-radio v-if="showMini" v-bind:musicUrl="musicUrl"></mini-radio>-->

  </div>
</template>
<style lang="scss">
  @import "../scss/size";

  .loadingBar {
    width: px(50);
    margin: px(50) auto;
    text-align: center;
  }

  .hotBanner {
    width: 100%;
    height: px(150);
    background-image: url("../assets/hot_music.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    padding-left: px(20);
    box-sizing: border-box;
    position: relative;

    .shadow{
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background-color: rgba(0,0,0,.2);
      z-index: 1;
    }
    div:first-child{
      position: relative;
      width: px(180);
      height: px(80);
      margin-top: px(-10);
    }

    .hotTitle {
      width: px(140);
      height: px(70);
      background: url("../assets/index1.png") no-repeat;
      background-size: contain;
      position: absolute;
      z-index: 2;
      top: 0;
    }
    .updateDate {
      padding-top: px(10);
      color: #fff;
      font-size: px(13);
      position: absolute;
      z-index: 2;
    }
  }

  .musicList {
    li {
      list-style: none;
      display: flex;
      padding-left: px(10);
      box-sizing: border-box;
      width: 100%;
      height: px(60);
      align-items: center;
      border-bottom: 1px solid rgba(0, 0, 0, .1);

      .topNum {
        width: px(30);
        height: 100%;
        display: flex;
        align-items: center;
        color: #999;
      }
      .top {
        color: #df3436;
      }
      .songList {
        padding: px(6) px(10);
        width: px(300);
        height: 100%;
        box-sizing: border-box;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;


        p:nth-child(1){
          width: 100%;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          font-size: px(16);
        }

        p:nth-child(2) {
          margin-top: px(5);
          font-size: px(13);
          color: #888;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
          overflow: hidden;
        }
      }
      .playImg{
        width: px(25);
        height: px(25);
        padding: 0 px(10);
        background: url("../assets/play.png") no-repeat;
        background-size: contain;
      }
    }
  }


</style>
<script>
  import $ from "jquery";
  import miniRadio from "./miniRadio.vue"

  export default {
    data() {
      return {
        songList: "",
        showLoading: true,
        date: "",
        showMini: false,
        musicId: "",
        musicUrl: "",
        indexObj: "",
        component: ""
      }
    },
    components: {
      miniRadio
    },
    created: function () {
      this.getData();

    },
    mounted: function () {
      let self = this;
      this.$root.$on("indexData", function (index) {
        self.indexObj = index;
        if (self.indexObj.component === "hot") {
          if (self.indexObj.index >= self.songList.length) {
            self.indexObj.index = 0;
          }
          if (self.indexObj.index < 0) {
            self.indexObj.index = self.songList.length - 1;
          }
          self.showMiniRadio(self.indexObj.index);
        }
      });
    },
    methods: {

      getData: function () {
        let self = this;
        $.ajax({
          type: "get",
          url: "/rank/info/?rankid=8888&page=1&json=true",
          dataType: "json",
          success: function (data) {
            self.songList = data.songs.list;
            self.showLoading = false;
            self.date = self.getLocalTime(data.songs.timestamp).substring(0, 10);
          },
          error: function (err) {

          }

        })
      },
      getLocalTime: function (nS) {
        return new Date(parseInt(nS) * 1000).toJSON();
      },
      showMiniRadio: function (index) {
        let self = this;

        self.musicId = self.songList[index].hash;
        $.ajax({
          type: "get",
          url: `/yy/index.php?r=play/getdata&hash=${self.musicId}`,
          dataType: "json",
          success: function (res) {
            self.$root.$emit("showMini", true);
            self.$root.$emit("data", res.data);
            self.$root.$emit("index", index);
            self.$root.$emit("component", "hot");
            self.$root.$emit("hash",self.musicId);
            let audio = new Audio();
            audio.load();
          },
          error: function (err) {

          }

        })

      }


    }
  }


</script>
