<template>
  <div class="recommend">
    <div class="loadingBar" v-show="!(showImg >= 6 && getNewList === true)" >
      <mt-spinner type="fading-circle" :size="30" ></mt-spinner>
    </div>
    <div v-show="showImg >= 6 && getNewList === true">
      <h3 class="newTitle">推荐音乐</h3>
      <ul class="soaringList" v-if="showImg>=6">
        <li v-for="(item,index) in SoaringSongList">
          <!--<img :src="{item.img}" alt="">-->
          <div :style="{background:`url(${item.imgUrl})`,backgroundSize:`cover` } " class="soaringImg"></div>
          <p>{{item.filename}}</p>
        </li>
      </ul>
      <h3 class="newTitle">最新音乐</h3>
      <ul class="newList">
        <li v-for="(item,index) in songList">
          <div class="songList">
            <p>{{item.filename.split("-")[1]}}</p>
            <p>{{item.filename.split("-")[0] + "- " + item.remark}}</p>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>
<style lang="scss">
  @import "../scss/size";

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
    margin-top: px(15);
    box-sizing: border-box;
    font-size: px(20);
    padding-left: px(10);
    font-weight: normal;
    border-left: px(3) solid #df3436;
  }

  .newList{
    list-style: none;
    padding-left: px(4);
    padding-top: px(20);
  }

  .songList{
    padding: px(6) px(10);
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(0,0,0,.1);

    p:nth-child(2){
      margin-top: px(5);
      font-size: px(14);
      color: #888;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: px(300);
      overflow: hidden;
    }
  }
</style>
<script >
  import $ from "jquery";


  export default {
    data(){
      return {
        data: "",
        songList: "",
        SoaringSongList: "",
        showImg: 0,
        getNewList: false,
        showLoading: true
      }
    },
    created: function () {
      this.getSoaringData();
      this.getNewData();
    },
    mounted: function () {

      if(this.showImg >= 6 && this.getNewList === true){
        this.showLoading = false;
      }
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
            self.SoaringSongList = self.data.list.slice(0,6);
            for(let i = 0;i< self.SoaringSongList.length;i++){
              self.getImg(self.SoaringSongList[i].hash,self.SoaringSongList[i]);
            }

          },
          error: function (err) {

          }
        });



      },
      getImg: function(hash,SoaringSongList){
        let self = this;
        $.ajax({
          type: "get",
          url: `/app/i/getSongInfo.php?cmd=playInfo&hash=${hash}`,
          dataType: "json",
          success : function (data) {
           SoaringSongList.imgUrl = data.imgUrl.replace("{size}","200");
            self.showImg += 1;
          },
          error: function (err) {
            console.log(err);
          }
        });
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
            self.getNewList = true;
          },
          error: function (err) {

          }

        })
      }

    }
  }



</script>

