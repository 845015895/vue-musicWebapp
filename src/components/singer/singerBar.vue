<template>
    <div class="showRank">
        <div class="backBtn" v-on:click="toRank()"></div>
        <div class="rankBanner" v-bind:style="{backgroundImage:'url(' + singerImg + ')'}">
            <!--<div>-->
                <!--<div class="hotTitle"></div>-->
                <!--<div class="updateDate">更新日期：{{date}}</div>-->
            <!--</div>-->
            <div class="shadow">
                <div class="rankTitle">{{singerName}}</div>
                <div class="playBtn" v-on:click=" showMiniRadio(0)">播放全部</div>
            </div>
        </div>
        <div class="musicListBar">
            <div v-show="showLoading" class="loadingBar">
                <mt-spinner type="fading-circle" :size="30"></mt-spinner>
            </div>
            <ul class="musicList" v-show="!showLoading">
                <li v-for="(item,index) in songList" v-on:click=" showMiniRadio(index)">
                    <div class="songList">
                        <p>{{item.OriSongName}}</p>
                        <p>
                            {{item.FileName}}</p>
                    </div>
                    <div class="playImg"></div>

                </li>
            </ul>
        </div>

    </div>

    <!--<mini-radio v-if="showMini" v-bind:musicUrl="musicUrl"></mini-radio>-->
</template>
<style lang="scss" scoped="">
    @import "../../scss/size";

    .showRank {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: #222;
        display: flex;
        flex-direction: column;
        .rankBanner {
            flex: none;
            width: 100%;
            height: px(250);
            background-repeat: no-repeat;
            background-size: cover;
            padding-left: px(20);
            box-sizing: border-box;
            position: relative;



            .shadow {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                position: absolute;
                left: 0;
                top: 0;
                background-color: rgba(7,17,27,.4);
                z-index: 1;
                padding: px(10) 0 px(20) 0;
                box-sizing: border-box;
                .rankTitle{
                    color: #fff;
                    font-size: px(25);
                    line-height: px(30);
                }
                .playBtn{
                    width: px(110);
                    height: px(35);
                    font-size: px(16);
                    line-height: px(35);
                    border-radius: px(100);
                    border: 1px solid #ffcd32;
                    color: #ffcd32;
                    text-align: center;
                    padding-left: px(30);
                    background: url("../../assets/playBtn.png") no-repeat left px(20) center;
                    background-size: px(20) px(20);
                }
            }
            .updateDate {
                padding-top: px(10);
                color: #fff;
                font-size: px(13);
                position: absolute;
                z-index: 2;
            }
        }

        .loadingBar {
            width: px(50);
            margin: px(50) auto;
            text-align: center;
        }

        .musicListBar {
            flex: auto;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            .musicList {
                padding-top: px(10);
                padding-bottom: px(80);
                li {
                    list-style: none;
                    display: flex;
                    padding: px(5) 0 px(5) px(15);
                    box-sizing: border-box;
                    width: 100%;
                    height: px(70);
                    align-items: center;
                    border-bottom: 1px solid rgba(0, 0, 0, .1);
                    .rankImg {
                        width: px(50);
                        height: px(50);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        img{
                            display: block;
                            width: px(30);
                            height: px(30);
                        }
                    }
                    .topNum {
                        width: px(50);
                        line-height: px(50);
                        height: 100%;
                        color: #ffcd32;
                        text-align: center;
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

                        p:nth-child(1) {
                            width: 100%;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            overflow: hidden;
                            font-size: px(16);
                            color: #fff;
                        }

                        p:nth-child(2) {
                            margin-top: px(5);
                            font-size: px(13);
                            color: #888;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            width: 100%;
                            overflow: hidden;
                            color: hsla(0, 0%, 100%, .3);
                        }
                    }
                    .playImg {
                        width: px(25);
                        height: px(25);
                        padding: 0 px(10);
                        background: url("../../assets/play.png") no-repeat;
                        background-size: contain;
                    }
                }
            }
        }
        .backBtn{
            position: absolute;
            top: px(10);
            left: px(10);
            width: px(30);
            height: px(30);
            background: url("../../assets/back.png") no-repeat;
            background-size: 100% 100%;
            z-index: 10;
        }
    }


</style>
<script>
    import $ from "jquery";
    import miniRadio from "../miniRadio.vue"

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
                component: "",
                rankid: "",
                title: "",
                singerName: "",
                singerImg: ""
            }
        },
        components: {
            miniRadio
        },
        created: function () {
            this.singerName = this.$route.params.id;
            this.singerImg = localStorage.getItem("_singerImg");
            this.getData(this.singerName);
        },
        activated:function () {
            this.songList = [];
            this.singerName = this.$route.params.id;
            this.singerImg = localStorage.getItem("_singerImg");
            this.getData(this.singerName);
        },
        methods: {
            toRank(){
              this.$router.push("/singer");
            },
            getData: function (singerName) {
                let self = this;
                $.ajax({
                    type: "get",
                    url: `/api/search?keyword=${singerName}&page=1`,
                    dataType: "json",
                    success: function (res) {
                        self.songList = res.data.lists;
                        self.showLoading = false;
                    },
                    error: function (err) {
                        console.log(err);
                    }
                });
            },
            showMiniRadio: function (index) {
                let self = this;
                localStorage.setItem("_playList",JSON.stringify(self.songList));
                localStorage.setItem("_index",index);
                this.$root.$emit("component", "search");
                this.$root.$emit("showMini", true);
            }
        }
    }


</script>
