<template>
  <div class="pathUpload">
   
    <baidu-map
      :center="center"
      :zoom="zoom"
      @ready="handler"
      class="trailMap"
      :scroll-wheel-zoom="true"
    >
      <bm-marker
        v-for="item in animalPoints"
        :key="item.id"
        :position="item.position"
        :dragging="isAdmin"
        class="bm-marker"
        :title="`${item.name}  ${item.info}  ${item.registerDate}`"
        @click="deletePoint(item)"
      >
      </bm-marker>
    </baidu-map>

    <el-dialog
      title="上传轨迹"
      :visible.sync="dialogFormVisible"
      width="400px"
      height="400px"
    >
      <common-form :propsFormLabel="formLabel" />

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CommonForm from "@/components/CommonForm.vue";



export default {
  components: { CommonForm },
  name: "PathUpload",

  data() {
    return {
      // 判断是否是管理员
      isAdmin: this.$store.state.isAdmin,

      // 地图相关数据
      animalPoints: this.$store.state.animalPoints || {},
      center: { lng: 113.622444, lat: 34.754811 },
      zoom: 19,
      pointLng: "",
      pointLat: "",

      // 表单相关数据
      formLabel: [
        { model: "name", label: "名称或特征", type: "input" },
        { model: "info", label: "说明性信息", type: "input" },
      ],
      // 用1个变量去控制表单的显示与否
      dialogFormVisible: false,
      // 用户输入的内容存在这里
      userInputForm: { name: "", registerDate: "", info: "", position: "" },
    };
  },
  methods: {
    handler({ BMap, map }) {
      //  确定下this指向
      let self = this;
      

      function clickMap(e) {
        // console.log(e.point.lng, e.point.lat)
        self.pointLng = e.point.lng;
        self.pointLat = e.point.lat;
        self.dialogFormVisible = true;
      }

      // 点击地图 可以上传轨迹点
      //  为了不让管理员点击时仍然触发click事件 这里管理员是没法上传轨迹点的  
      if (!this.isAdmin && this.$store.state.userInfo.hadLogin) {
        map.addEventListener("click", clickMap);
      }


      // if (isShow) {
        //  我原本希望通过移除事件来让click事件不要触发 但是移除不了
      //   mapDom.removeEventListener("click", clickMap);
      // }
    },

    submitForm() {
      this.$bus.$emit("sendForm");
      if (this.userInputForm.name) {
        this.userInputForm.registerDate = new Date().toLocaleString();

        //  console.log(this.userInputForm)  已经拿到了用户输入的数据  数据类型和userInputForm是一样的
        let item = this.userInputForm;
        item.position = { lng: this.pointLng, lat: this.pointLat };
        this.$store.commit("addPoint", item);
        this.dialogFormVisible = false;
      } else {
        this.$message({
          message: "请输入动物称呼或填入花纹特点",
          type: "warning",
        });
      }
    },
    receiveForm(formData) {
      // 用户输入的数据用formData接收 然后赋值给 自己的userInputForm 准备上传到数据库
      this.userInputForm = formData;
    },

    
    addEntity() {
      // this.$axios({
      //   method:'POST',
      //   url:'/api/entity/add/',
      //   data:{
      //       ak:'5N11WdFHkBVfCUnCpH423jqVXea1OQ6I',
      //       service_id:231803,
      //       entityname:'汤圆',
      //     }
      // }).then((res)=>{
      //       console.log(res)
      // }).catch(err=>{
      //    console.log(err)
      // })
      // this.$jsonp('http://yingyan.baidu.com/api/v3/entity/add',{
      //     ak:'5N11WdFHkBVfCUnCpH423jqVXea1OQ6I',
      //     service_id:231803,
      //     entityname:'汤圆',
      // }) .then((res)=>{
      //       console.log(res)
      // }).catch(err=>{
      //    console.log(err)
      // })
    },
     
    deletePoint(item) {
      if (this.isAdmin) {
        this.$confirm("确定删除此标记吗？", { type: "warning" }).then(
          () => {
            
            this.$store.commit("deletePoint",item);
            this.$message({ message: "删除成功", type: "success" });
          },
          () => {}
        );
      }
    },
  },
  mounted() {
    this.$bus.$on("receiveForm", this.receiveForm);
  },
};
</script>

<style lang='less' scoped>
.pathUpload {
  width: 100%;
  height: 100%;
  .trailMap {
    width: 100%;
    height: 100%;
  }
}
</style>