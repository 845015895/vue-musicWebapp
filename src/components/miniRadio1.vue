<template>
    <div class="audioBar" v-bind:class="{miniHeight: isMini,mainHeight:!isMini}"v-show="showMini">
        <!--<audio id="audio" v-on:ended="musicEnd($event)" v-bind:src="musicUrl" controlsList="nodownload" preload="auto"-->
        <!--v-on:canplay="canplaythrough" autoplay="autoplay">-->
        <div class="miniBar" v-show="isMini">
            <!--歌手图片-->
            <div class="authorImg" :style="{backgroundImage:`url(${singerImg})`,backgroundSize:`cover`}"
                 v-on:click="showMain()"></div>
            <!--歌名-->
            <div class="musicBar" v-on:click="showMain()">
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
        </div>
        <div class="mainBar" v-show="!isMini" :style="{backgroundImage:`url(${singerImg})`,backgroundSize:`cover`}">
            <div class="overflow"></div>
            <div class="goBack" v-on:click="goBack()">
                <div class="goBackImg"></div>
                <div class="musicName">{{songName}}</div>
            </div>
            <div class="outLine" id="outLine">
                <div class="mainSingerImg" :style="{backgroundImage:`url(${singerImg})`,backgroundSize:`cover`}"></div>
            </div>


            <div class="lyrics">
                <div class="lyricsBar">
                    <p v-for="(item,index) in lyrics" v-bind:class="{light:isLight===index}">{{item.lyricsStr}}</p>
                </div>
            </div>
            <div class="process" id="process">
                <mt-range
                    :bar-height="2"
                    v-model="audio.currentTime"
                    :min="0"
                    :max="duration"
                    :step="1"
                    disabled
                    v-on:click.native="rangeChange($event)"
                >
                    <div slot="start" class="start">{{playTime}}</div>
                    <div slot="end" class="end">{{allTime}}</div>
                </mt-range>
            </div>
            <!--<div id="progress">-->
            <!--&lt;!&ndash;创建加载进度条&ndash;&gt;-->
            <!--<span id="bar">-->
            <!--&lt;!&ndash;创建控制点&ndash;&gt;-->
            <!--<div id="control"></div>-->
            <!--</span>-->
            <!--</div>-->
            <div class="audioTool">
                <div class="skipBtn back" v-on:click="back()"></div>
                <div class="btn playBtn" v-show="!isPlaying" v-on:click="play()" id="mainPlayBtn"></div>
                <div class="btn pauseBtn" v-show="isPlaying" v-on:click="stop()"></div>
                <div class="skipBtn next" v-on:click="next()"></div>
            </div>

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
<style lang="scss" scoped="">
    @import "../scss/size";

    .start, .end {
        font-size: px(14);
        width: 35px;
    }


    .audioBar {
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 5;

        .miniBar {
            background: rgba(0, 0, 0, .9);
            color: #fff;
            display: flex;
            align-items: center;
            width: 100%;
            height: px(76);
            padding-left: px(5);

            .authorImg {
                width: px(65);
                height: px(65);

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
                    text-overflow: ellipsis;
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
        .mainBar {
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, .6);
            color: #fff;

            .overflow {
                width: 100%;
                height: 100%;
                position: fixed;
                background-color: rgba(0, 0, 0, .6);
                left: 0;
                top: 0;
                z-index: -1;
                -webkit-filter: blur(5px); /* Chrome, Safari, Opera */
                filter: blur(5px);
            }

            .goBack {
                width: 100%;
                padding: px(15) px(10);
                text-align: center;

                .goBackImg {
                    float: left;
                    width: px(16);
                    height: px(30);
                    background: url("../assets/goback_1.png");
                    background-size: cover;
                }
                .musicName {
                }

            }
            .mainSingerImg {
                width: 100%;
                height: 100%;
                border-radius: 100%;

            }
            .outLine {
                width: px(205);
                height: px(205);
                padding: px(40);
                box-sizing: border-box;
                background: url("../assets/disc.png") no-repeat;
                background-size: cover;
                margin: px(30) auto;
                border-radius: 100%;
                animation: play 5s linear infinite;

            }

            .lyrics {
                width: 100%;
                height: px(130);
                overflow: hidden;

                .lyricsBar {
                    position: relative;
                    transition: top 0.5s;
                    top: px(40);
                    text-align: center;
                    p {
                        color: #d9d9d9;
                        font-size: px(15);
                        min-height: px(30);
                        line-height: px(30);
                    }
                    .light {
                        color: #a6e22d;
                    }
                }

            }

            .process {
                padding: 0 px(10);
            }

            .audioTool {
                padding-top: px(5);
                padding-bottom: px(5);
                display: flex;
                align-content: center;
                margin-top: px(20);
                .btn {
                    margin: 0 auto;
                    width: px(58);
                    height: px(58);
                    border: 0;
                    outline: none;
                }
                .playBtn {
                    background: url("../assets/play_play.png");
                    background-size: cover;
                }
                .pauseBtn {
                    background: url("../assets/play_pause.png");
                    background-size: cover;
                }

                .skipBtn {
                    width: px(43);
                    height: px(43);
                }
                .back {
                    margin-left: 20%;
                    background: url("../assets/play_prev.png") no-repeat;
                    background-size: cover;
                }
                .next {
                    margin-right: 20%;
                    background: url("../assets/play_next.png") no-repeat;
                    background-size: cover;
                }
            }
        }

        #progress {
            margin: px(10) auto px(10) auto;
            width: 80%;
            height: 10px;
            background: rgba(204, 204, 204, 0.5);
            border-radius: 10px;
            overflow: hidden;
            /*进度加载*/
            #bar {
                width: 0;
                height: 100%;
                background: #39f;
                display: block;
                position: relative;
                border-radius: 10px;
                left: 0;
                text-align: right;

            }
            /*控制点*/
            #control {
                width: 10px;
                height: 10px;
                background: #fff;
                position: relative;
                top: 0;
                left: -10px;
                border-radius: 10px;
                cursor: pointer;
            }
        }

    }
    .miniHeight{
        height: px(76);
        transition: height 0.5s;
    }
    .mainHeight{
        height: 100%;
        transition: height 0.5s;
    }

    @keyframes play {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }


</style>
<script>
    import $ from "jquery";
    import music from "../assets/music.mp3";
    import resize from "../tools/resize";
    import mtRange from "../components/range/index.vue"

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
                index: "",
                isMini: true,
                lyrics: [],
                isLight: false,
                hash: "",
                rangeValue: 0,
                duration: 0,
                allTime: "00:00",
                playTime: "00:00",
                currentTime: 0,
                touch: false,
                audio: ""

            }
        },
        components: {
            mtRange
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
            this.$root.$on("showMain", function (showMain) {
                self.isMini = showMain;
            });
            this.$root.$on("hash", function (hash) {
                $.ajax({
                    type: "get",
                    url: `/music?hash=${hash}`,
                    dataType: "json",
                    success: function (res) {
                        let lyricsTemp = res.data.lyrics.split("\r\n");
                        self.lyrics = [];
                        self.render(lyricsTemp);
                    },
                    error: function (err) {
                        console.log(err);
                    }
                });


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
            let self = this;
            let playTimeM, playTimeS, allTimeM, allTimeS;
//      let bar = document.querySelector("#bar");
            let progress = document.querySelector("#progress");
//      let control = document.querySelector("#control");
            let audio = document.querySelector('#audio');
            self.currentTime = audio.currentTime;
            self.audio = audio;
            audio.loop = false;
            audio.addEventListener("timeupdate", function () {
                self.duration = Number(audio.duration); //总时间
                self.rangeValue = Number(audio.currentTime);  //当前时间

                //显示播放时间和总时长
                if (!isNaN(audio.duration)) {
                    allTimeM = Math.floor(Math.floor(audio.duration) / 60);
                    allTimeS = Math.floor(audio.duration) % 60;
                    self.allTime = (allTimeM > 9 ? allTimeM : "0" + allTimeM) + ":" + (allTimeS > 9 ? allTimeS : "0" + allTimeS);
                }
                if (Math.floor(audio.currentTime) < 10) {
                    self.playTime = "00:" + "0" + Math.floor(audio.currentTime);
                } else if (Math.floor(audio.currentTime) >= 10 && Math.floor(audio.currentTime) < 60) {
                    self.playTime = "00:" + Math.floor(audio.currentTime);
                } else {
                    playTimeM = Math.floor(Math.floor(audio.currentTime) / 60);
                    playTimeS = Math.floor(audio.currentTime) % 60;
                    self.playTime = (playTimeM > 9 ? playTimeM : "0" + playTimeM) + ":" + (playTimeS > 9 ? playTimeS : "0" + playTimeS);
                }

                //歌词同步
                for (let i = 0; i < self.lyrics.length; i++) {
                    if (audio.currentTime /*当前播放的时间*/ > self.lyrics[i].time) {
                        //显示到页面
                        self.isLight = i;
                        $(".lyricsBar").css('top', resize.resetPx(50) - i * resize.resetPx(30));
                    }
                }
            }, false);
//      self.rotation();
        },
        methods: {
            showMain: function () {
                this.isMini = false;
            },
            goBack: function () {
                this.isMini = true;
            },
            play: function () {
                let audio = document.querySelector('#audio');
                if (!this.isPlaying) {
//          audio.load();
                    audio.play();
                    document.addEventListener("WeixinJSBridgeReady", function () {
//            audio.load();
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
                        this.$root.$emit("indexData", {"component": "hot", "index": self.currentIndex});
                        break;
                    case "soar":
                        this.$root.$emit("indexData", {"component": "soar", "index": self.currentIndex});
                        break;
                    case "new":
                        this.$root.$emit("indexData", {"component": "new", "index": self.currentIndex});
                        break;
                    case "search":
                        this.$root.$emit("indexData", {"component": "search", "index": self.currentIndex});
                        break;
                }

            },
            back: function () {
                let self = this;
                --self.currentIndex;
                switch (self.component) {
                    case "hot":
                        this.$root.$emit("indexData", {"component": "hot", "index": self.currentIndex});
                        break;
                    case "soar":
                        this.$root.$emit("indexData", {"component": "soar", "index": self.currentIndex});
                        break;
                    case "new":
                        this.$root.$emit("indexData", {"component": "new", "index": self.currentIndex});
                        break;
                    case "search":
                        this.$root.$emit("indexData", {"component": "search", "index": self.currentIndex});
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
                        this.$root.$emit("indexData", {"component": "hot", "index": self.currentIndex});
                        break;
                    case "soar":
                        this.$root.$emit("indexData", {"component": "soar", "index": self.currentIndex});
                        break;
                    case "new":
                        this.$root.$emit("indexData", {"component": "new", "index": self.currentIndex});
                        break;
                    case "search":
                        this.$root.$emit("indexData", {"component": "search", "index": self.currentIndex});
                        break;
                }
            },
            render: function (lyrics) {
                let pattern = /\[\d{2}:\d{2}.\d{2}\]/g;
                let self = this;
                for (let i in lyrics) {
                    if (lyrics[i] !== "") {
                        let temp = {};
                        let time = "";
                        let t1 = "";
                        let t2 = "";
                        time = lyrics[i].match(pattern);
                        t1 = time[0];
                        t2 = t1.slice(1, -1).split(':');
                        temp.time = parseInt(t2[0], 10) * 60 + parseFloat(t2[1]);
                        temp.lyricsStr = lyrics[i].replace(pattern, "");
                        self.lyrics.push(temp);
                    }
                }

            },
            rangeChange(event) {

                let audio = document.querySelector('#audio');
                let offset = event.offsetX;
                let rangeWidth = document.querySelector("#process").offsetWidth - 70;
                let clickLength = Math.floor(offset * audio.duration / rangeWidth);
                console.log("offset" + offset);
                if (offset < rangeWidth) {
                    audio.currentTime = clickLength;
                }
//        if(event.path[0].className === "mt-range-content"){
//          let audio = document.querySelector('#audio');
//          let offset = event.offsetX;
//          let rangeWidth = document.querySelector("#process").offsetWidth - 70;
//          let clickLength = Math.floor(offset * audio.duration / rangeWidth);
//          console.log("offset" + offset);
//          if (offset < rangeWidth) {
//            audio.currentTime = clickLength;
//          }
//        }

            }
//      rotation: function() {
//        let self =this;
//        $("#outLine").rotate({
//          angle: 0,
//          animateTo: 360,
////          callback: self.rotation
//        });
//      }


        }
//  props: ["musicUrl"]
    }
</script>
