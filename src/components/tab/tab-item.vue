<template>
    <div class="item">
        <slot></slot>
    </div>
</template>
<style lang="scss">
    @import "../../scss/size";

    .item {
        /*display: flex;*/
        /*align-items: center;*/
        /*justify-content: center;*/
        text-align: center;
        height: px(50);
        line-height: px(50);
        font-size: px(14);
        color: hsla(0,0%,100%,.5);

        /*width: 32%;*/
    }
</style>
<script>


</script>
