<template>
    <div class="singer">
        <div class="title"> 热门 </div>
        <ul>
            <li v-for="(item,index) in singerList" class="singerLi" v-on:click="toSinger(item)">
                <img v-bind:src="item.imgurl" alt="歌手" class="singerImg">
                <span class="singerName">{{item.singername}}</span>
            </li>
        </ul>
    </div>
</template>
<style lang="scss" scoped="">
    @import "../../scss/size";

    .singer {
        flex: auto;
        width: 100%;
        background: #222;
        padding-bottom: px(80);
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;

        .title {
            height: px(30);
            line-height: px(30);
            padding-left: px(20);
            font-size: px(12);
            color: hsla(0, 0%, 100%, .5);
            background: #333;
        }
        ul {
            padding-bottom: px(80);
        }
        li {
            list-style: none;
        }
        .singerLi {
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            padding: px(20) 0 0 px(30);

            .singerImg {
                width: px(50);
                height: px(50);
                border-radius: 50%;
            }
            .singerName {
                margin-left: px(20);
                color: hsla(0, 0%, 100%, .5);
                font-size: px(14);
            }
        }
    }

</style>
<script>
    import $ from "jquery"

    export default {
        data() {
            return {
                singerList: []
            }
        },
        created() {
            this.getSinger();
        },
        methods: {
            getSinger: function () {
                let self = this;
                $.get("/api/singerList", function (data) {
                    self.singerList = JSON.parse(data).singers.list.info;
                    for (let i in self.singerList) {
                        self.singerList[i].imgurl = self.singerList[i].imgurl.replace("{size}", "400");
                    }
                })
            },
            toSinger(item){
                this.$router.push(`/singerBar/${item.singername}`);
                localStorage.setItem("_singerImg",item.imgurl);
            }
        }
    }

</script>
