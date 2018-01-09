<template>
  <div class="hot">
    <div v-show="showLoading" class="loadingBar">
      <mt-spinner type="fading-circle" :size="30"></mt-spinner>
    </div>
    <div v-show="!showLoading">
      <div class="hotBanner">
        <div>
          <div class="hotTitle"></div>
          <div class="updateDate">上次更新时间：{{date}}</div>
        </div>

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
    height: px(170);
    background: url("../assets/hot_music.jpg") no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    padding-left: px(20);
    box-sizing: border-box;

    .hotTitle {
      width: px(180);
      height: px(80);
      background: url("../assets/index.png") no-repeat;
      background-size: contain;
    }
    .updateDate {
      color: #fff;
      font-size: px(16);
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
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(0, 0, 0, .1);

        p:nth-child(2) {
          margin-top: px(5);
          font-size: px(14);
          color: #888;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: px(300);
          overflow: hidden;
        }
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
