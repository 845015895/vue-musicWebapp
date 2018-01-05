<template>
  <div class="new">
    <h3 class="newTitle">最新音乐</h3>
  </div>
</template>
<style lang="scss">
  @import "../scss/size";

  .newTitle{
    border-left: px(3) solid #df3436;
  }
</style>
<script >
  import $ from "jquery";

  export default {
    data(){
      return {
        data: ""
      }
    },
    created: function () {

      this.getData();
    },
    mounted: function () {

    },
    methods:{

      getData: function() {
        let self =this;
        $.ajax({
          type: "get",
          url: "/rank/info/?rankid=31308&page=1&json=true",
          dataType: "json",
          success : function (data) {
            self.data = data;
          },
          error: function (err) {

          }

        })
      }

    }
  }



</script>
