<template>
    <div class="header">
        <div class="mine"></div>
        <div class="logo"></div>
        <div class="showMusic" id="showMusic" v-on:click="showMusic()"></div>
        <!--<div class="title"> 酸橙音乐</div>-->

    </div>
</template>
<style lang="scss" >
    @import "../scss/size";

    .header {
        width: 100%;
        height: px(70);
        flex: none;
        /*background: #d43c33;*/
        display: flex;
        background: #222;
        align-items: center;
        justify-content: space-between;

        color: #fff;
        box-sizing: border-box;
        padding: 0 4% 0 2%;

        .mine{
            width: px(30);
            height: px(30);
        }

        .logo {
            /*width: px(30);*/
            width: px(170);
            height: px(30);
            background: url("../assets/logo1.png") no-repeat;
            background-size: 100% 100%;
        }
        .showMusic {
            width: px(30);
            height: px(30);
            background: url("../assets/musicshow.png") no-repeat;
            background-size: contain;
        }

    }

</style>
<script>
    export default {
        data() {
            return {}
        },
        methods: {
            showMusic: function () {
                this.$root.$emit("showMain",false);
            }
        }
    }

</script>
