<template>
  <div class="recommend">
    <div class="loadingBar" v-show="!(showImg >= 6 && getNewList === true)" >
      <mt-spinner type="fading-circle" :size="30" ></mt-spinner>
    </div>
    <div v-show="showImg >= 6 && getNewList === true">
      <h3 class="newTitle">推荐音乐</h3>
      <ul class="soaringList" v-if="showImg>=6">
        <li v-for="(item,index) in soaringSongList" v-on:click="playSoarSong(index,soaringSongList);">
          <!--<img :src="{item.img}" alt="">-->
          <div :style="{background:`url(${item.imgUrl})`,backgroundSize:`cover` } " class="soaringImg"></div>
          <p>{{item.filename}}</p>
        </li>
      </ul>
      <h3 class="newTitle">最新音乐</h3>
      <ul class="newList">
        <li v-for="(item,index) in songList" v-on:click="playNewMusic(index, songList);">
          <div class="songList">
            <p>{{item.songName ? item.songName : item.filename.split("-")[1]}}<span class="mark">{{item.intro !== "(undefined" ? item.intro : " "}}</span></p>
            <p>{{item.filename.split("-")[0] + "- " + item.remark}}</p>
          </div>
          <div class="playImg"></div>
        </li>
      </ul>
    </div>

  </div>
</template>
<style lang="scss">
  @import "../scss/size";
  .recommend {
      padding-bottom: px(76);
  }

  .loadingBar{
    width: px(50);
    margin: px(50) auto;
    text-align: center;
  }

  .soaringList{
    width: 100%;
    overflow: hidden;

    li{
      list-style: none;
      margin-top: px(15);
      float: left;
      width: 32%;
      box-sizing: border-box;


      .soaringImg{
        width:100%;
        height: px(130);
        background-size: cover;
      }
      p{
        padding-left: px(5);
        font-size: px(14);
        height: px(40);
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp:2;
        -webkit-box-orient: vertical;
      }
    }
    li:nth-child(2),li:nth-child(5){
      margin-left: 2%;
      margin-right: 2%;
    }
  }
  .newTitle{
    margin-top: px(25);
    box-sizing: border-box;
    font-size: px(18);
    padding-left: px(10);
    font-weight: normal;
    border-left: px(3) solid #df3436;
  }

  .newList{
    list-style: none;
    padding-left: px(4);
    padding-top: px(20);
    li{
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgba(0,0,0,.1);
    }
  }

  .songList{
    padding: px(6) px(10);
    width: 100%;
    height: 100%;
    box-sizing: border-box;


    p:nth-child(1){
      width: px(300);
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      font-size: px(16);
      display: flex;

      .mark{
        color: #888;
        margin-left: px(5);
        text-overflow:ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }

    p:nth-child(2){
      margin-top: px(5);
      font-size: px(13);
      color: #888;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: px(300);
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
</style>
<script >
  import $ from "jquery";


  export default {
    data(){
      return {
        data: "",
        songList: "",
        soaringSongList: "",
        newSongInfo: {},
        showImg: 0,
        getNewList: false,
        showLoading: true,
        lyrics: []

      }
    },
    created: function () {
      this.getSoaringData();
      this.getNewData();
//
//      $('.soaringList').one('touchstart', function () {
//        let audio = new Audio();
//        audio.play();
//      })
    },
    mounted: function () {
      let self = this;
      if(self.showImg >= 6 && self.getNewList === true){
        self.showLoading = false;
      }


      this.$root.$on("indexData", function (index) {
        self.indexObj = index;
        if (self.indexObj.component === "soar") {
          if (self.indexObj.index >= self.soaringSongList.length) {
            self.indexObj.index = 0;
          }
          if (self.indexObj.index < 0) {
            self.indexObj.index = self.soaringSongList.length - 1;
          }
          self.playSoarSong(self.indexObj.index,self.soaringSongList);
        } else if (self.indexObj.component === "new") {
          if (self.indexObj.index >= self.songList.length) {
            self.indexObj.index = 0;
          }
          if (self.indexObj.index < 0) {
            self.indexObj.index = self.songList.length - 1;
          }
          self.playNewMusic(self.indexObj.index,self.songList);
        }
      });
    },
    methods:{
      getSoaringData: function(){
        let self = this;

        $.ajax({
          type: "get",
          url: "/rank/info/?rankid=22163&page=1&json=true",
          dataType: "json",
          success : function (data) {
            self.data = data.songs;
            self.soaringSongList = self.data.list.slice(0,6);
            for(let i = 0;i< self.soaringSongList.length;i++){
              self.getSoaringMusicInfo(self.soaringSongList[i].hash,self.soaringSongList[i]);
            }

          },
          error: function (err) {

          }
        });
      },
      getSoaringMusicInfo: function(hash,soaringSongList){
        let self = this;
        $.ajax({
          type: "get",
          url: `/yy/index.php?r=play/getdata&hash=${hash}`,
          dataType: "json",
          success : function (res) {
           soaringSongList.imgUrl = res.data.img;
           soaringSongList.musicUrl = res.data.play_url;
            self.showImg += 1;
          },
          error: function (err) {
            console.log(err);
          }
        });
      },
      playSoarSong: function (index,songList) {
        let self =this;
        this.$root.$emit("data",{"play_url":songList[index].musicUrl,"img":songList[index].imgUrl,
        "song_name":songList[index].filename.split("-")[1],"audio_name":songList[index].filename.split("-")[0]});
        self.$root.$emit("showMini",true);
        self.$root.$emit("index",index);
        self.$root.$emit("hash",songList[index].hash);
        self.$root.$emit("component", "soar");
      },
      getNewData: function() {
        let self =this;
        $.ajax({
          type: "get",
          url: "/rank/info/?rankid=31308&page=1&json=true",
          dataType: "json",
          success : function (data) {
            self.data = data.songs;
            self.songList = self.data.list;

            for(let i = 0;i<self.songList.length;i++){
              if(self.songList[i].filename.indexOf("【")){
                self.songList[i].filename=self.songList[i].filename.replace("【","(");
                self.songList[i].filename=self.songList[i].filename.replace("】",")");
                self.songList[i].songName =  self.songList[i].filename.split("-")[1].split("(")[0];
                self.songList[i].intro = "(" +  self.songList[i].filename.split("(")[1];
                }
            }
            self.getNewList = true;
          },
          error: function (err) {

          }

        })
      },
      playNewMusic: function (index,songList) {
        let self = this;
        let hash = songList[index].hash;
        $.ajax({
          type: "get",
          url: `/yy/index.php?r=play/getdata&hash=${hash}`,
          dataType: "json",
          success : function (res) {
            self.newSongInfo.imgUrl = res.data.img;
            self.newSongInfo.musicUrl = res.data.play_url;
            self.newSongInfo.filename = res.data.audio_name;
            self.newSongInfo.hash = hash;


            self.postNewInfo(index,self.newSongInfo);
          },
          error: function (err) {
            console.log(err);
          }
        });
      },
      postNewInfo: function (index,newSongInfo) {
        this.$root.$emit("data",{"play_url":newSongInfo.musicUrl,"img":newSongInfo.imgUrl,
          "song_name":newSongInfo.filename.split("-")[1],"audio_name":newSongInfo.filename.split("-")[0]});
        this.$root.$emit("showMini",true);
        this.$root.$emit("index",index);
        this.$root.$emit("hash",newSongInfo.hash);
        this.$root.$emit("component", "new");

      },


    }
  }



</script>

