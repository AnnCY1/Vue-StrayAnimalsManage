<template>
  <div class="trail">
     <baidu-map :center="center" :zoom="zoom" @ready='handler' class="trailMap"
                :scroll-wheel-zoom="true">

      <bm-marker :position="center" :dragging="true" @click="infoWindowOpen" class="bm-marker" title="汤圆">
              <bm-info-window :show="isShow" @close="infoWindowClose" @open="infoWindowOpen" 
                              class="bm-info" >汤圆</bm-info-window>
      </bm-marker>

     </baidu-map>
  </div>
</template>



<script>

export default {

    name:"Trail",
    data(){
        return{
            center: {lng: 0, lat: 0},
            zoom: 3 ,
            isShow:false,
            // animalName:'汤圆'
        }
    },
    methods: {
      handler ({BMap, map}) { 
          let map3d = new BMap.Map("allmap")
            // 初始化地图,设置中心点坐标和地图级别
          this.center.lng = 113.622444
          this.center.lat = 34.754811
          this.zoom = 19

          console.log(map3d)


         
      },
      infoWindowClose(){
         this.isShow = false
      },
      infoWindowOpen(){
         this.isShow = true
      },
  },
   
    
}
</script>

<style lang='less' scoped>
  .trail{
     width: 100%;
     height: 100%;
     .trailMap{
       width: 100%;
       height: 100%;

       .bm-marker{
         width: 100px;
         .bm-info{
          width: 40px;
          height: 40px;
       }
       }
       
     }
  }
</style>