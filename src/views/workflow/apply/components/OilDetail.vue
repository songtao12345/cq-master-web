<template>
     <el-form v-loading="loading" :rules="rules" :model="formData"  ref="formData"  label-suffix=":"
             label-width="170px" size="small" align="left" style="max-width:900px">
            <el-form-item v-if="operate == '详情'" label="申请人" prop="supplyDate">
                <span>{{formData.username}}</span>
            </el-form-item> 
             <el-form-item label="申请部门" prop="applyDep">
                <el-input type="text" v-model="formData.depName" maxlength="100" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="contactName">
                <el-input type="text" v-model="formData.contactPhone" maxlength="100" show-word-limit></el-input>
            </el-form-item>
             <el-form-item label="创建日期" prop="creatDate">
                <el-date-picker v-model="formData.createDateStr" type="date" placeholder="选择日期">
                </el-date-picker>
             </el-form-item>
             <el-form-item label="标题" prop="title">
                <el-input type="text" v-model="formData.title" maxlength="100" show-word-limit></el-input>
            </el-form-item>

             <el-form-item label="描述" prop="description">
              <el-input type="textarea" v-model="formData.description" maxlength="500" :autosize="{minRows: 5}" show-word-limit></el-input>
             </el-form-item>
              <el-form-item label="更新日期" prop="updateDate">
                <el-date-picker v-model="formData.updateDateStr" type="date" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
               <el-form-item label="上传文件" prop="description">
                     <el-upload
                        disabled
                        class="upload-demo"
                        ref="upload"
                        action=""
                        :limit="limit"
                        :show-file-list="true"
                        :http-request="upLoadFile"
                        accept="image/jpeg,image/gif,image/png,application/zip,application/xml,.bpmn"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="files"
                        :on-success="handleSuccess"
                        :auto-upload="false"
                        :on-change="handleChange">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>

                     </el-upload>
               </el-form-item>




     </el-form>
</template>

<script>
import api from '@/api/oil'
export default {
    name: 'OilDetail',
    props: {
        operate: { //操作标识：新增，编辑，详情
            type: String,
            default: '详情'
        },
        businessKey: String, // 业务id
    },
    watch: {
        businessKey: {
            immediate: true, 
            handler (newVal) {
                if(newVal) {
                    this.getById()
                }
            }
        }
    },
    data() {
        return {
            loading: false,
            rules: {
                title: [
                    {required: false, message: '请输入标题', trigger: 'change'},
                ],
            },
            formData: { // 提交表单数据
        
            }, 
             file:null,
            files: [
               
            ],
            param: null,
            limit: 1,
            fileList: [],
            fileObj: {}
        }
    },
    methods: {
            async getById() {
            const {data} = await api.getById(this.businessKey)
            // console.log(data);
            // 格式化时间
            data.leaveDate = [ data.startDate, data.endDate]
            this.formData = data
            this.fileObj.name = data.oldName
            this.files.push(this.fileObj)
            // console.log(this.files);
            },
             handleSuccess(res) {
            console.log(res+ '----');
            },
            handleChange(uploadFile, fileList) {
                // console.log(fileList);
                // this.fileList = fileList
                this.fileList = fileList
                this.file = uploadFile.raw
                // this.files[0].name = uploadFile.raw.name
            
                // this.$refs.upload.clearFiles()
            },
            handleRemove(file, fileList) {
            // console.log(file, fileList + 'handleremove');
            },
            handlePreview(file) {
            // console.log(file + 'prev');
            },
              async upLoadFile(file) {
                console.log(file);
            // 封装上传图片的表单对象
            const data = new FormData()
            data.append('file', file.file)
            console.log(data);
            const {code} = await api.add(data)
            console.log(code);
            if(code === 200) {
                this.$message.success('上传成功')
                this.$parent.fetchData()
                this.visible = false
            }
            },


    }

}
</script>

<style scoped>

</style>