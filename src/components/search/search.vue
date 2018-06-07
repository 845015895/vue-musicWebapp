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
                <li v-for="(item,index) in hotList" v-on:click="doSearch(item.k)">{{item.k}}</li>
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
        <div class="hotSearch" v-if="searchList.length">
            <h3>搜索历史</h3>
            <div v-for="item in searchList" class="searchList" v-on:click="doSearch(item)">
                <div >{{item}}</div>
                <div v-on:click="deleteSearch(item)" v-on:click.stop></div>
            </div>
        </div>


    </div>
</template>
<style lang="scss" scoped="">
    @import "../../scss/size";

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

    .search {
        flex: auto;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        background: #222;
        padding-bottom: px(80);
    }

    .searchMain {
        margin-top: px(20);
        width: 100%;
        height: px(60);
        padding: px(10) px(20);
        box-sizing: border-box;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);

        .searchBar {
            position: relative;
            display: flex;
            width: 100%;
            height: 100%;
            border-radius: px(100);
            border: 0;
            padding: 0 px(40);
            box-sizing: border-box;
            background: #333;
            color: #fff;

            .searchImg {
                width: px(16);
                height: px(16);
                background: url("../../assets/search.svg") no-repeat;
                position: absolute;
                top: px(12);
                left: px(12);
            }

            .searchIpt {
                /*display: block;*/
                width: 100%;
                height: 100%;
                /*border-radius: px(100);*/
                border: 0;
                outline: none;
                background: transparent;
                font-size: px(16);
                color: #fff;
                /*padding: 0 px(30);*/
                /*box-sizing: border-box;*/
            }
            .deleteImg {
                width: px(16);
                height: px(16);
                background: url("../../assets/delete.svg") no-repeat;
                position: absolute;
                top: px(12);
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
                margin-right: px(12);
                margin-bottom: px(12);
                padding: 0 px(14);
                font-size: px(14);
                line-height: px(32);
                background: #333;
                color: hsla(0, 0%, 100%, .3);
                border-radius: px(10);
            }
        }

        .searchList {
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            justify-content: space-between;
            height: px(40);
            overflow: hidden;
            color: hsla(0, 0%, 100%, .5);
            margin-top: px(10);

            div:nth-child(2) {
                width: px(25);
                height: px(25);
                background: url("../../assets/delete.png") no-repeat;
                background-size: cover;
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
        font-size: px(16);
        line-height: px(16);
        color: hsla(0, 0%, 100%, .5);
        font-weight: 600;
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
                hotList: [],
                search: "",
                bestMatchList: "",
                songName: "",
                singerName: "",
                isShowList: false,
                showNotes: false,
                showDelete: false,
                searchList: []
            }
        },
        created() {
            this.searchList = [];
            if (localStorage.getItem("_search")) {
                this.searchList = JSON.parse(localStorage.getItem("_search"));
            }
            this.hotSearch();
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
            hotSearch() {
                let self = this;
                let time = new Date().getTime();
                $.ajax({
                    type: "get",
                    url: `/api/hotSearch?time=${time}`,
                    dataType: "json",
                    success: function (res) {
                        self.hotList = res.data.hotkey.splice(0, 10);

                    },
                    error: function (err) {
                        console.log(err);
                    }
                });
            },
            doSearch: function (searchName) {
                let self = this;
                self.search = searchName;
                $.ajax({
                    type: "get",
                    url: `/api/search?keyword=${searchName}&page=1`,
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
                    self.doSearch(value);
//                    if (value) {
//                        self.showNotes = true;
//                        self.showDelete = true;
//                    } else {
//                        self.showNotes = false;
//                        self.isShowList = false;
//                        self.showDelete = false;
//
//                    }

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
                localStorage.setItem("_playList", JSON.stringify(this.bestMatchList));
                localStorage.setItem("_index", index);
                this.$root.$emit("component", "search");
                this.$root.$emit("showMini", true);

                if (this.search && !this.array_contain(this.searchList, this.search)) {
                    this.searchList.push(this.search);
                    localStorage.setItem("_search", JSON.stringify(this.searchList));
                }

            },
            deleteSearch(val) {
                let index = this.searchList.indexOf(val);
                if (index > -1) {
                    this.searchList.splice(index, 1);
                    localStorage.setItem("_search", JSON.stringify(this.searchList));
                }
            },
            array_contain: function (array, obj) {  //数组去重
                for (let i = 0; i < array.length; i++) {
                    if (array[i] === obj)//如果要求数据类型也一致，这里可使用恒等号===
                        return true;
                }
                return false;
            }

        }
    }
</script>
