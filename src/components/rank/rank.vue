<template>
    <div class="rankList">
        <ul>
            <li class="rankBar" v-on:click="showList(6666)">
                <div class="img soaringList"></div>
                <div class="list"><p v-for="(item,index) in soaringList">{{(index+1) + " " +item.filename.split("-")[1]+"-"+item.filename.split("-")[0]}}</p></div>
            </li>
            <li class="rankBar" v-on:click="showList(8888)">
                <div class="img hotList"></div>
                <div class="list"><p v-for="(item,index) in hotList">{{(index+1) + " " +item.filename.split("-")[1]+"-"+item.filename.split("-")[0]}}</p></div>
            </li>
            <li class="rankBar" v-on:click="showList(23784)">
                <div class="img networkList"></div>
                <div class="list"><p v-for="(item,index) in networkList">{{(index+1) + " " +item.filename.split("-")[1]+"-"+item.filename.split("-")[0]}}</p></div>
            </li>
            <li class="rankBar" v-on:click="showList(31308)">
                <div class="img newList"></div>
                <div class="list"><p v-for="(item,index) in newList">{{(index+1) + " " +item.filename.split("-")[1]+"-"+item.filename.split("-")[0]}}</p></div>
            </li>
            <li class="rankBar" v-on:click="showList(31313)">
                <div class="img hongkongList"></div>
                <div class="list"><p v-for="(item,index) in hongkongList">{{(index+1) + " " +item.filename.split("-")[1]+"-"+item.filename.split("-")[0]}}</p></div>
            </li>
            <li class="rankBar" v-on:click="showList(31310)">
                <div class="img westernList"></div>
                <div class="list"><p v-for="(item,index) in westernList">{{(index+1) + " " +item.filename.split("-")[1]+"-"+item.filename.split("-")[0]}}</p></div>
            </li>

            <li class="rankBar" v-on:click="showList(31311)">
                <div class="img koreaList"></div>
                <div class="list"><p v-for="(item,index) in koreaList">{{(index+1) + " " +item.filename.split("-")[1]+"-"+item.filename.split("-")[0]}}</p></div>
            </li>

            <li class="rankBar" v-on:click="showList(31312)">
                <div class="img japanList"></div>
                <div class="list"><p v-for="(item,index) in japanList">{{(index+1) + " " +item.filename.split("-")[1]+"-"+item.filename.split("-")[0]}}</p></div>
            </li>
            <li class="rankBar" v-on:click="showList(30972)">
                <div class="img originalList"></div>
                <div class="list"><p v-for="(item,index) in originalList">{{(index+1) + " " +item.filename.split("-")[1]+"-"+item.filename.split("-")[0]}}</p></div>
            </li>
        </ul>
        <router-view></router-view>
        <!--<div class="title"> 酸橙音乐</div>-->
    </div>
</template>
<style lang="scss" scoped="">
    @import "../../scss/size";

    .rankList {
        width: 100%;
        background: #222;
        padding-bottom: px(80);
        flex: auto;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        .rankBar{
            display: flex;
            margin: 0 px(20);
            padding-top: px(20);
            width: px(335);
            height: px(100);

            .img{
                width: px(100);
                height: px(100);
            }
            .list{
                flex: 1;
                display: -ms-flexbox;
                display: flex;
                -ms-flex-direction: column;
                flex-direction: column;
                -ms-flex-pack: center;
                justify-content: center;
                padding: 0 px(20);
                height: px(100);
                overflow: hidden;
                background: #333;
                color: hsla(0,0%,100%,.3);
                font-size: px(12);
                p{
                    width: px(200);
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    line-height: px(26);
                }
            }
            .soaringList{
                background: url("../../assets/rankImg/soar.jpg") no-repeat;
                background-size: 100% 100%;
            }
            .hotList{
                background: url("../../assets/rankImg/hot.jpg") no-repeat;
                background-size: 100% 100%;
            }
            .newList{
                background: url("../../assets/rankImg/new.jpg") no-repeat;
                background-size: 100% 100%;
            }
            .networkList{
                background: url("../../assets/rankImg/network.jpg") no-repeat;
                background-size: 100% 100%;
            }
            .westernList{
                background: url("../../assets/rankImg/western.jpg") no-repeat;
                background-size: 100% 100%;
            }
            .koreaList{
                background: url("../../assets/rankImg/korea.jpg") no-repeat;
                background-size: 100% 100%;
            }
            .hongkongList{
                background: url("../../assets/rankImg/hongkong.jpg") no-repeat;
                background-size: 100% 100%;
            }
            .japanList{
                background: url("../../assets/rankImg/japan.jpg") no-repeat;
                background-size: 100% 100%;
            }
            .originalList{
                background: url("../../assets/rankImg/original.jpg") no-repeat;
                background-size: 100% 100%;
            }
        }

    }

</style>
<script>
    import $ from "jquery";

    export default {
        data() {
            return {
                rankList: [],
                soaringList: [],
                hotList: [],
                networkList: [],
                newList: [],
                westernList: [],
                koreaList: [],
                hongkongList: [],
                japanList: [],
                originalList: [],
            }
        },
        created() {
            this.getList();
        },
        methods: {
            getList() {
                let self = this;
                $.get("/api/rank?rankid=6666&page=1", function (data) {
                    self.soaringList = JSON.parse(data).songs.list.slice(0,3);
                });
                $.get("/api/rank?rankid=8888&page=1", function (data) {
                    self.hotList = JSON.parse(data).songs.list.slice(0,3);
                });
                $.get("/api/rank?rankid=23784&page=1", function (data) {
                    self.networkList = JSON.parse(data).songs.list.slice(0,3);
                });
                $.get("/api/rank?rankid=31308&page=1", function (data) {
                    self.newList = JSON.parse(data).songs.list.slice(0,3);
                });
                $.get("/api/rank?rankid=31310&page=1", function (data) {
                    self.westernList = JSON.parse(data).songs.list.slice(0,3);
                });
                $.get("/api/rank?rankid=31311&page=1", function (data) {
                    self.koreaList = JSON.parse(data).songs.list.slice(0,3);
                });
                $.get("/api/rank?rankid=31312&page=1", function (data) {
                    self.japanList = JSON.parse(data).songs.list.slice(0,3);
                });
                $.get("/api/rank?rankid=31313&page=1", function (data) {
                    self.hongkongList = JSON.parse(data).songs.list.slice(0,3);
                });
                $.get("/api/rank?rankid=30972&page=1", function (data) {
                    self.originalList = JSON.parse(data).songs.list.slice(0,3);
                });
            },
            showList(rankid){
                this.$router.push(`/rankList/${rankid}`)
            }

        }
    }

</script>
