<template>
  <div class="search">
    <div class="searchMain">
      <div class="searchBar">
        <div class="searchImg"></div>
        <input type="text" class="searchIpt" id="searchIpt" placeholder="搜索歌曲、歌手"
               v-on:focus="inputFocus()" autocomplete="off" v-model="search">
        <div class="deleteImg" v-show="showDelete" v-on:click="clear()"></div>
      </div>
    </div>
    <div class="hotSearch" v-if="!isShowList&&!showNotes">
      <h3>热门搜索</h3>
      <ul class="hotUl">
        <li v-for="(item,index) in hotList" v-on:click="doSearch(item)">{{item}}</li>
      </ul>
    </div>
    <div v-if="isShowList&&!showNotes" class="showSearch">
      <h3>最佳匹配</h3>
      <ul class="bestMatch">
        <li v-for="(list,index) in bestMatchList" v-on:click="postMusic(index)">
          <p>{{list.Grp ? list.SongName : list.Grp[0].SongName}}</p>
          <p>{{list.Grp ? list.FileName : list.Grp[0].FileName}}</p>
        </li>
      </ul>
    </div>

    <div class="searchNotes" v-if="showNotes">
      <h3 class="searchBtn" v-on:click="doSearch(search)">搜索“{{search}}”</h3>
    </div>


  </div>
</template>
<style lang="scss">
  @import "../scss/size";

  ::-webkit-input-placeholder { /* WebKit browsers */
    color: #c4c4c4;
  }

  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #c4c4c4;
  }

  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #c4c4c4;
  }

  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #c4c4c4;
  }

  .searchMain {
    width: 100%;
    height: px(60);
    padding: px(15) px(20);
    box-sizing: border-box;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    .searchBar {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
      border-radius: px(100);
      border: 0;
      background: #ebecec;
      padding: 0 px(30);
      box-sizing: border-box;

      .searchImg {
        width: px(14);
        height: px(14);
        background: url("../assets/search.svg") no-repeat;
        position: absolute;
        top: px(8);
        left: px(8);
      }

      .searchIpt {
        /*display: block;*/
        width: 100%;
        height: 100%;
        /*border-radius: px(100);*/
        border: 0;
        outline: none;
        background: transparent;
        font-size: px(14);
        /*padding: 0 px(30);*/
        /*box-sizing: border-box;*/
      }
      .deleteImg {
        width: px(14);
        height: px(14);
        background: url("../assets/delete.svg") no-repeat;
        position: absolute;
        top: px(8);
        right: px(8);
      }
    }
  }

  .hotSearch {
    padding: px(15) px(13) 0;

    .hotUl {
      margin: px(10) 0 px(7);
      list-style: none;

      li {
        display: inline-block;
        height: px(32);
        margin-right: px(8);
        margin-bottom: px(8);
        padding: 0 px(14);
        font-size: px(14);
        line-height: px(32);
        color: #333;
        border: 1px solid #d3d4da;
        border-radius: px(100);
      }
    }
  }

  .showSearch {
    padding: px(15) px(13) 0;

    li {
      list-style: none;
      padding: px(8) 0;
      border-bottom: 1px solid rgba(0, 0, 0, .1);

      p:nth-child(1) {
        color: rgb(80, 125, 175);
        font-size: px(18);
        line-height: px(26);
      }

      p:nth-child(2) {
        color: rgb(136, 136, 136);
        font-size: px(14);
        line-height: px(18);
      }
    }

  }

  h3 {
    font-size: px(14);
    line-height: px(14);
    color: #666;
    font-weight: 400;
  }

  .searchBtn {
    height: px(50);
    margin-left: px(10);
    padding-right: px(12);
    font-size: px(16);
    line-height: px(50);
    color: #507daf;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }

</style>
<script>

  import $ from "jquery";

  export default {
    data() {
      return {
        hotList: ["说散就散", "林俊杰", "全部都是你", "前任3插曲"],
        search: "",
        bestMatchList: "",
        songName: "",
        singerName: "",
        isShowList: false,
        showNotes: false,
        showDelete: false


      }
    },
    mounted: function () {
      let self = this;
      this.$root.$on("indexData", function (index) {
        self.indexObj = index;
        if (self.indexObj.component === "search") {
          if (self.indexObj.index >= self.bestMatchList.length) {
            self.indexObj.index = 0;
          }
          self.postMusic(self.indexObj.index);
        }
      });
    },
    methods: {
      doSearch: function (searchName) {
        let self = this;
        self.search = searchName;
        $.ajax({
          type: "get",
          url: `/song_search_v2?keyword=${searchName}&page=1&clientver=&platform=WebFilter`,
          dataType: "json",
          success: function (res) {
            self.bestMatchList = res.data.lists;
            self.isShowList = true;
            self.showNotes = false;
//              if()
//              self.bestMatchList =  self.data.
          },
          error: function (err) {
            console.log(err);
          }
        });
      },
      inputFocus: function () {
        let self = this;
        //监听输入框变化
        let searchIpt = $("#searchIpt");
        let oldValue = searchIpt.val();
        if (oldValue) {
          self.showDelete = true;
        } else {
          self.showDelete = false;
        }

        searchIpt.bind('input porpertychange', function () {
          let value = searchIpt.val();
          if (value) {
            self.showNotes = true;
            self.showDelete = true;
          } else {
            self.showNotes = false;
            self.isShowList = false;
            self.showDelete = false;

          }

        });


      },
      clear: function () {
        $("#searchIpt").val("");
        this.search = "";
        this.showNotes = false;
        this.showDelete = false;
        this.isShowList = false;

      },
      postMusic: function (index) {
        let self = this;
        let hash = self.bestMatchList[index].Grp ? self.bestMatchList[index].FileHash : self.bestMatchList[index].Grp[0].Filehash;

        $.ajax({
          type: "get",
          url: `/yy/index.php?r=play/getdata&hash=${hash}`,
          dataType: "json",
          success: function (res) {
            self.$root.$emit("showMini", true);
            self.$root.$emit("data", res.data);
            self.$root.$emit("index", index);
            self.$root.$emit("component", "search");
            self.$root.$emit("hash",hash);
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
