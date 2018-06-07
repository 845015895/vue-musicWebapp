<template>
    <div id="index">
        <img src="../assets/player_logo1.png" alt="" class="player_logo">
        <div class="top">
            <header-bar></header-bar>
            <tab-bar>
                <tab-item v-bind:class="{active:isActive1}" id="tab1">推荐</tab-item>
                <tab-item v-bind:class="{active:isActive2}" id="tab2">排行</tab-item>
                <tab-item v-bind:class="{active:isActive3}" id="tab3">歌手</tab-item>
                <tab-item v-bind:class="{active:isActive4}" id="tab4">搜索</tab-item>
            </tab-bar>
        </div>
        <transition>
            <keep-alive>
                <router-view/>
            </keep-alive>
        </transition>

        <mini-radio></mini-radio>

    </div>
</template>

<script>
    import "../tools/resize"
    import $ from "jquery";
    import headerBar from "../components/header.vue";
    import tabBar from "../components/tab/tabBar.vue";
    import tabItem from "../components/tab/tab-item.vue";
    import miniRadio from "../components/miniRadio.vue"

    export default {
        data() {
            return {
                isActive1: true,
                isActive2: false,
                isActive3: false,
                showMini: false,
                isActive4: false,
            }
        },
        components: {
            tabItem,
            headerBar,
            tabBar,
            miniRadio
        },
        created: function () {
            this.$router.push("/");
//            if(localStorage.getItem("_playList")){
//                this.$root.$emit("component", "");
//                this.$root.$emit("showMini", true);
//            }
        },
        mounted: function () {
//            if(localStorage.getItem("_playList")){
//                this.$root.$emit("component", "");
//                this.$root.$emit("showMini", true);
//            }
            let self = this;

            $("#tab1").click(function () {
                self.isActive1 = true;
                self.isActive2 = false;
                self.isActive3 = false;
                self.isActive4 = false;
                self.$router.push("/recommend");
            });
            $("#tab2").click(function () {
                self.isActive1 = false;
                self.isActive2 = true;
                self.isActive3 = false;
                self.isActive4 = false;
                self.$router.push("/rank");
            });
            $("#tab3").click(function () {
                self.isActive1 = false;
                self.isActive2 = false;
                self.isActive3 = true;
                self.isActive4 = false;
                self.$router.push("/singer");
            });
            $("#tab4").click(function () {
                self.isActive1 = false;
                self.isActive2 = false;
                self.isActive3 = false;
                self.isActive4 = true;
                self.$router.push("/search");
            });
        },
    }
</script>

<style lang="scss">
    @import "../scss/_size.scss";

    * {
        margin: 0;
        padding: 0;
    }

    #index {
        max-width: px(375);
        height: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        .top{
            height: px(120);
            flex: none;
        }

    }

    .active {
        color: #ffcd32 !important;
        box-sizing: border-box;
        border-bottom: px(2) solid #ffcd32;
    }

    .player_logo {
        position: absolute;
        left: 0;
        opacity: 0;
        z-index: -100;
        filter: alpha(opacity=0);
    }
</style>
