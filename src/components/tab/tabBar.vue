<template>
  <div class="tab">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'tabBar',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../scss/size";

  .tab{
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: px(50);
    overflow: hidden;
    /*position: fixed;*/
    /*top: px(70);*/
    /*left: 0;*/
    border-bottom: 1px solid #e4e4e4;
    padding-left: 10%;
    padding-right: 10%;
    box-sizing: border-box;
  }
</style>
