<template>
  <div class="school">
      <baidu-map
      :center="center"
      :zoom="zoom"
      @ready="handler"
      id="map3D"
      :scroll-wheel-zoom="true"
    >
    </baidu-map>

  </div>
</template>

<script>
export default {
  name: "School3D",
  data() {
    return {
      center: { lng: 113.622444, lat: 34.754811 },
      zoom: 19,
    };
  },
  methods: {
    handler({ BMap, map }) {
        

        var map3d = new BMapGL.Map("map3D"); // 创建Map实例
        map3d.centerAndZoom(new BMapGL.Point(113.622444, 34.754811), 19); // 初始化地图,设置中心点坐标和地图级别

        // 设置2d、3d切换
        map3d.addControl(new BMapGL.NavigationControl3D());
        map3d.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
        map3d.setHeading(60);
        map3d.setTilt(60);
    },
  },
};
</script>

<style lang = "less" scoped>
.school{
   width:100%;
   height:100%;
    #map3D {
    width: 100%;
    height: 100%;
  }
}

</style>