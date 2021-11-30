
<template>
  <el-dialog  title="Activiti工作流在线流程设计器" :visible.sync="visible" :before-close="handleClose" fullscreen >
    <div class="modeler" >
      <!-- <form id="form1" action="" target="target1" method="get" onsubmit="send" ref="form"></form> -->
      <iframe class="iframe" id='designFrame' name='target1' :src='src'></iframe>
    </div>
  </el-dialog>
</template>

<script>
// import {getToken} from '@/utils/auth';//登陆人的token
import api from '@/api/img'
export default {
    props: {
      modelId: String,
    },

    data() {
      return {
        visible: false,
        a:null
      }
    },

    computed:{
        src(){
          return "/modeler.html?modelId="+this.modelId
        },
        apiUrl(){
          // return  'http://localhost:9528'+process.env.VUE_APP_BASE_API // "/dev-api";//后台部署的api服务
          return  'http://localhost:9528'
        }
       

    },
    
    mounted(){
      //全局存入当前vue实例，供activiti调用    
      window.getMyVue = this;

      // this.$nextTick(()=>{
         
      //      console.log(this.$refs.iframe);
         
      // })

 
      //  var idoc = iframe.document;
      //  console.log(idoc);


      // setTimeout(() => {
      //   var iframe = document.querySelector("#iframe");
      //   this.populateIframe(iframe, [["Authorization", "Bearer " + this.token()]]);
      // }, 0);
      console.log( this.$refs.form);
      // this.$refs.form

    },
    
    methods:{

       token(){
            return getToken();//token
        },

    //   populateIframe(iframe, headers) {
    //   var xhr = new XMLHttpRequest();
    //   xhr.open("GET", 'http://localhost:9528/modeler.html?modelId='+this.modelId);
    //   xhr.responseType = "blob";
    //   headers.forEach((header) => {
    //     xhr.setRequestHeader(header[0], header[1]);
    //   });
    //   xhr.onreadystatechange = () => {
    //     if (xhr.readyState === xhr.DONE) {
    //       if (xhr.status === 200) {
    //         // iframe.src = URL.createObjectURL(xhr.response);
    //         iframe.src = 'http://localhost:9528/modeler.html?modelId='+this.modelId
    //       }
    //     }
    //   };
    //   xhr.send();
    // },




      goto(){
        this.$message.success("保存模型成功");
        this.$router.push({name:"/sys/activiti"})    
      },
  
      handleClose(done) {
        this.$confirm('请记得点击左上角保存按钮，确定关闭设计窗口?', '确认关闭',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            // 关闭
            done();
            // 刷新数据
            this.$parent.fetchData()
        }).catch(() => {})
      },
      send() {
        console.log("test");
      }   
    }
  }
</script>
<style scoped>
.iframe {
  width: 100%;
  height: calc(100vh - 120px);
  border: 0px;
}
</style>