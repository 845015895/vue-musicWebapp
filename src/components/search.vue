<template>
  <div class="search">
    <div class="searchMain">
      <div class="searchBar">
        <div class="searchImg"></div>
        <input type="text" class="searchIpt" placeholder="搜索歌曲、歌手" autocomplete="off" v-model="search">
      </div>
    </div>
    <div class="hotSearch">
      <h3>热门搜索</h3>
      <ul class="hotUl">
        <li v-for="(item,index) in hotList" v-on:click="doSearch(item)">{{item}}</li>
      </ul>
    </div>
    <div>{{data}}</div>


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
        background-image: url("../assets/search.svg");
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
        /*padding: 0 px(30);*/
        /*box-sizing: border-box;*/
      }
    }
  }

  .hotSearch {
    padding: px(15) px(13) 0;
    h3 {
      font-size: px(14);
      line-height: px(14);
      color: #666;
      font-weight: 400;
    }

    .hotUl{
      margin: px(10) 0 px(7);
      list-style: none;

      li{
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

</style>
<script>

  import $ from "jquery";
  export default {
    data(){
      return{
        hotList: ["说散就散","林俊杰","全部都是你","前任3插曲"],
        search: "",
        data: ""
      }
    },
    methods: {
      doSearch: function (searchName) {
        let self = this;
        self.search = searchName;
          $.ajax({
            type: "get",
            url: `/song_search_v2?keyword=${searchName}前任3插曲&page=1&clientver=&platform=WebFilter`,
            dataType: "json",
            success : function (res) {
              self.data = res;
            },
            error: function (err) {
              console.log(err);
            }
          });
      }
    }
  }
</script>
