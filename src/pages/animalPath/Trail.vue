<template>
  <div class="trail">
     <baidu-map :center="center" :zoom="zoom" @ready='handler' class="trailMap"
                :scroll-wheel-zoom="true">

      <bm-marker v-for="item in animalPoints" :key="item.id"  :position="item.position" :dragging="isAdmin" 
      class="bm-marker" :title="item.name">
             
      </bm-marker>

     </baidu-map>
  </div>
</template>


<script>

export default {

    name:"Trail",
    data(){
        return{
            center: {lng: 113.622444, lat: 34.754811},
            zoom: 19,
            
            isAdmin:this.$store.state.isAdmin,
            animalPoints:this.$store.state.animalPoints,
        }
    },
    methods: {
      handler ({BMap, map}) { 
 
            // 初始化地图,设置中心点坐标和地图级别
          // this.center.lng = 113.622444
          // this.center.lat = 34.754811
          // this.zoom = 19

            map.addEventListener('click', function (e) {
                                console.log(e.point.lng, e.point.lat)
                            })
         
      },
      addPoint(item){
         this.animalPoints.push(item)
      }
     
  },
   mounted(){
      this.$bus.$on('addPoint',this.addPoint)
   }
    
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