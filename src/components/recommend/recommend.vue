<template>
    <div class="recommend">
        <div class="slide">
            <!--<div class="swiper-container" id="about-swiper">-->
                <!--<div class="swiper-wrapper">-->
                    <!--<div class="swiper-slide" v-for="item in sliderList">-->
                        <!--<img v-bind:src="item.picUrl" alt="">-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
            <div class="swiper-container">
                <div class="swiper-wrapper" >
                    <div class="swiper-slide"></div>
                    <div class="swiper-slide"></div>
                    <div class="swiper-slide"></div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
        <div>
            <h3 class="newTitle">热门歌曲推荐</h3>
            <div class="loadingBar" v-show="getNewList === false">
                <mt-spinner type="fading-circle" :size="30"></mt-spinner>
            </div>
            <ul class="soaringList" v-if="getNewList === true">
                <li v-for="(item,index) in soaringSongList" v-on:click="playSoarSong(index,soaringSongList);">
                    <!--<img :src="{item.img}" alt="">-->
                    <div :style="{background:`url(${item.imgUrl})`,backgroundSize:`cover` } " class="soaringImg"></div>
                    <div class="soaringName"><h2>{{item.filename.split("-")[1]}}</h2>
                        <p>{{item.filename.split("-")[0]}}</p></div>
                </li>
            </ul>
            <!--<h3 class="newTitle">最新音乐</h3>-->
            <!--<ul class="newList">-->
                <!--<li v-for="(item,index) in songList" v-on:click="playNewMusic(index, songList);">-->
                    <!--<div class="songList">-->
                        <!--<p>{{item.songName ? item.songName : item.filename.split("-")[1]}}<span-->
                            <!--class="mark">{{item.intro !== "(undefined" ? item.intro : " "}}</span></p>-->
                        <!--<p>{{item.filename.split("-")[0] + "- " + item.remark}}</p>-->
                    <!--</div>-->
                    <!--<div class="playImg"></div>-->
                <!--</li>-->
            <!--</ul>-->
        </div>

    </div>
</template>
<style lang="scss" scoped="">
    @import "../../scss/size";

    .recommend {
        padding-bottom: px(80);
        background: #222;
        flex: auto;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;


        .slide{
            width: px(375);
            height: px(180);
            margin-top: px(15);
            .swiper-container {
                width: 100%;
                height: 100%;
                .swiper-slide:nth-child(1){
                    background: url("../../assets/285906.jpg") no-repeat;
                    background-size: 100% 100%;
                }
                .swiper-slide:nth-child(2){
                    background: url("../../assets/286008.jpg") no-repeat;
                    background-size: 100% 100%;
                }
                .swiper-slide:nth-child(3){
                    background: url("../../assets/286018.jpg") no-repeat;
                    background-size: 100% 100%;
                }



            }

            img{
                width: 100%;
                height: 100%;
            }
        }
    }

    .loadingBar {
        width: px(50);
        margin: px(50) auto;
        text-align: center;
    }

    .soaringList {
        width: 100%;
        overflow: hidden;

        li {
            width: 100%;
            display: flex;
            box-sizing: border-box;
            -ms-flex-align: center;
            align-items: center;
            padding: 0 px(20) px(20);
            list-style: none;

            .soaringImg {
                flex: 0 0 px(60);
                width: px(60);
                height: px(60);
                background-size: cover;
            }
            .soaringName{
                flex: auto;
                padding-left: px(25);
                h2{
                    margin-top: px(10);
                    color: #fff;
                    font-size: px(14);
                    font-weight: 400;
                }
                p {
                    margin-top: px(10);
                    font-size: px(14);
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    color: hsla(0,0%,100%,.3);
                }
            }

        }
    }

    .newTitle {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: 14px;
        color: #ffcd32;
    }

    .newList {
        list-style: none;
        padding-left: px(4);
        padding-top: px(20);
        li {
            display: flex;
            align-items: center;
            border-bottom: 1px solid rgba(0, 0, 0, .1);
        }
    }

    .songList {
        padding: px(6) px(10);
        width: 100%;
        height: 100%;
        box-sizing: border-box;

        p:nth-child(1) {
            width: px(300);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: px(16);
            display: flex;

            .mark {
                color: #fff;
                margin-left: px(5);
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
        }

        p:nth-child(2) {
            margin-top: px(5);
            font-size: px(13);
            color: #fff;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: px(300);
            overflow: hidden;
        }
    }

    .playImg {
        width: px(25);
        height: px(25);
        padding: 0 px(10);
        background: url("../../assets/play.png") no-repeat;
        background-size: contain;
    }
</style>
<script>
    import $ from "jquery";
    import Swiper from "swiper"


    export default {
        data() {
            return {
                data: "",
                songList: "",
                soaringSongList: "",
                newSongInfo: {},
                showImg: 0,
                getNewList: false,
                showLoading: true,
                lyrics: [],
                musicOk: false,
                currentPage: 1,
                total: 0,
                perPage: 0,
                totalPage: 0,
                sliderList: []
            }
        },
        created: function () {
            this.getSoaringData(this.currentPage);
            this.getSlider();

//            this.getNewData(this.currentPage);
//
//      $('.soaringList').one('touchstart', function () {
//        let audio = new Audio();
//        audio.play();
//      })
        },
        mounted: function () {
            let self = this;
            if (!self.musicOk && self.getNewList === true) {
                self.showLoading = false;
            }
            let mySwiper = new Swiper('.swiper-container', {
                autoplay: 2000,//可选选项，自动滑动
                pagination : '.swiper-pagination',
            })
            this.scroll(this.$el);
        },
        methods: {
            getSoaringData: function (page) {
                let self = this;
                $.ajax({
                    type: "get",
                    url: `/api/rank?rankid=22163&page=${page}`,
                    dataType: "json",
                    success: function (data) {
                        self.data = data.songs;
                        self.soaringSongList = self.data.list;
                        for (let i = 0; i < self.soaringSongList.length; i++) {
                            self.getSoaringMusicInfo(self.soaringSongList[i].hash, self.soaringSongList[i]);
                        }

                    },
                    error: function (err) {

                    }
                });
            },
            getSoaringMusicInfo: function (hash, soaringSongList) {
                let self = this;
                $.ajax({
                    type: "get",
                    url: `/api/music?hash=${hash}`,
                    dataType: "json",
                    success: function (res) {
                        soaringSongList.imgUrl = res.data.img;
                        soaringSongList.musicUrl = res.data.play_url;
                        self.showImg += 1;
                        if (self.showImg === self.soaringSongList.length) {
                            self.getNewList = true;
                        }
                    },
                    error: function (err) {
                        console.log(err);
                    }
                });
            },
            playSoarSong: function (index, songList) {
                let self = this;
                localStorage.setItem("_playList",JSON.stringify(songList));
                localStorage.setItem("_index",index);
                this.$root.$emit("component", "");
                this.$root.$emit("showMini", true);
            },
            scroll: function (el) {
                let that = this;
                let setTimeOutId = null;
                el.addEventListener("scroll", scrollEven, false);

                function scrollEven() {
                    let scrollHeight = el.scrollHeight;//页面高度
                    let scrollTop = el.scrollTop;
                    let elementHeight = el.offsetHeight;
                    clearTimeout(setTimeOutId);
                    setTimeOutId = setTimeout(function () {
                        let scrollBottom = scrollHeight - scrollTop - elementHeight;
                        if (scrollBottom < 100) {
                            if (that.currentPage <= that.totalPage) {
                                that.getData(that.currentPage);
                            } else {
                                that.loadingState = 2;
                                that.loadingStateText = "没有更多数据了...";
                            }
                        }
                    }, 10);
                }
            },
            render(resp) {
                if (this.firstRequest) {
                    this.firstRequest = false;
                    this.total = resp.total;
                    this.perPage = resp.pagesize;   //每页大小
                    this.totalPage = Math.ceil(this.total / this.perPage);
                }
                this.currentPage = this.currentPage + 1;

            },
            getSlider(){
                let self = this;
                $.get("/api/slider",function (data) {
                    console.log(data);
                    self.sliderList = data;
                })
            }

        }
    }


</script>

