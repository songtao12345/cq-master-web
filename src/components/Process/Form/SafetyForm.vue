<template>
  <el-form v-loading="loading" :rules="rules" :model="formData"  ref="formData"  label-suffix=":"
             label-width="170px" size="small" align="left" style="max-width:900px">
            <el-form-item v-if="operate == '详情'" label="申请人" prop="supplyDate">
                <span>{{formData.username}}</span>
            </el-form-item> 
             <el-form-item v-if="operate !== '新增'" label="申请部门" prop="depName">
                <el-input type="text" disabled v-model="formData.depName" maxlength="100" show-word-limit></el-input>
            </el-form-item>
           

            <!-- <el-form-item label="申请部门" prop="applyDep">
                <el-input type="text" v-model="formData.applyDep" maxlength="100" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="contactName">
                <el-input type="text" v-model="formData.contactName" maxlength="100" show-word-limit></el-input>
            </el-form-item> -->
             <!-- <el-form-item label="创建日期" prop="creatDate">
                <el-date-picker v-model="formData.creatDate" type="date" placeholder="选择日期">
                </el-date-picker>
             </el-form-item>
              <el-form-item label="更新日期" prop="updateDate">
                <el-date-picker v-model="formData.updateDate" type="date" placeholder="选择日期">
                </el-date-picker>
              </el-form-item> -->


               <el-form-item label="标题" prop="title">
                <el-input type="text" v-model="formData.title" maxlength="100" show-word-limit></el-input>
            </el-form-item>

             <el-form-item label="描述" prop="description">
              <el-input type="textarea" v-model="formData.description" maxlength="500" :autosize="{minRows: 5}" show-word-limit></el-input>
             </el-form-item>
            <el-form-item label="上传文件" prop="description">
                <el-upload
                class="upload-demo"
                ref="upload"
                action=""
                :limit="limit"
                :show-file-list="true"
                :on-exceed="masterFileMax"
                :http-request="upLoadFile"
                accept="image/jpeg,image/gif,image/png,application/zip,application/xml,.bpmn"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="files"
                :on-success="handleSuccess"
                :auto-upload="false"
                :on-change="handleChange">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>

                
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                </el-upload>


            </el-form-item>
             <el-form-item label="是否内部项目" prop="inside">
                 <template>
                    <el-radio v-model="formData.duration" :label="1" :disabled="'新增' == this.operate ? false:true">是</el-radio>
                    <el-radio v-model="formData.duration" :label="0" :disabled="'新增' == this.operate ? false:true">否</el-radio>
                </template>
             </el-form-item>
            <el-form-item align="right" v-if="operate != '详情'">
                <el-button  type="primary" @click="submitForm('formData')" size="small">确定</el-button>
                <!-- <el-button  type="primary" @click="save('formData')" size="small">确定</el-button> -->
                <el-button  @click="clickClose()" size="small">关闭</el-button>
            </el-form-item>
  </el-form>
</template>

<script>
import api from '@/api/safety'
export default {
    name: 'SafetyForm',
    props: {
        operate: { //操作标识：新增，编辑，详情
            type: String,
            default: '详情'
        },
        businessKey: String, // 业务id
    },
    watch: {
        businessKey: {
            immediate: true, // 很重要！！！
            handler (newVal) {
                if(newVal) {
                    this.getById()
                }
            }
        }
    },
    data() {
        return {
            // radio: '0',
            loading: false,
            rules: {
                title: [
                    {required: false, message: '请输入标题', trigger: 'change'},
                ],
            },
            formData: { // 提交表单数据
                duration: 0
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
        // getoldname(){
        //         console.log(this.formData);
        // },
         // 提交表单数据
        submitForm(formName) {
            console.log(formName);
            this.$refs[formName].validate( async (valid) => {
                if (valid) {
                    // 校验通过，提交表单数据
                    this.loading = true
                    try {
                      let response = {}
                   
                      if('新增' == this.operate) {
                            // console.log(this.formData);
                            // console.log(this.formData.title.this.formData.description);
                               this.file = new FormData();
                                for (let i = 0; i < this.fileList.length; i++) {
                                    this.file.append("file", this.fileList[i].raw, this.fileList[i].name);
                                }
                                this.file.append('uploadrole', "lizy");
                                console.log(this.formData);
                                console.log(this.formData.type);
                                response = await api.add(this.file,this.formData)
                                // console.log(response);


                            // response = await api.addmany(this.formData.title.this.formData.description)
                      }else if('编辑' == this.operate) {
                            response = await api.update(this.formData)
                      }
                      console.log(response);
                      if(response.data.code === 200) {
                        //   this.$refs.elup.autoUpload = true
                          // 将表单清空
                          this.$refs['formData'].resetFields()
                          // 关闭窗口
                          this.clickClose(true)
                          this.$message.success('提交成功')
                      }
                      this.loading = false
                    } catch(e) {
                      this.loading = false
                    }
                }
            })
        },
        clickClose(refresh = false) {
            // 将表单清空
            this.$refs['formData'].resetFields()
            this.$emit('close', refresh)
        },
        async getById() {
            const {data} = await api.getById(this.businessKey)
            // console.log(data);
            // 格式化时间
            data.data.leaveDate = [ data.data.startDate, data.data.endDate]
            this.formData = data.data
            this.fileObj.name = data.data.oldName
            this.files.push(this.fileObj)
            // console.log(this.files);
            console.log(this.formData);
        },
        // 上传文件
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
        // 限制上传数量弹出框
         masterFileMax(files, fileList) {
            // console.log(files, fileList);
            this.$message.warning(`请最多上传 ${this.limit} 个文件。`);
        },

       async save(formName) {

           this.file = new FormData();
           for (let i = 0; i < this.fileList.length; i++) {
               this.file.append("file", this.fileList[i].raw, this.fileList[i].name);
           }
           this.file.append('uploadrole', "lizy");
             const {code} = await api.add(this.file,this.formData)
            //  const {code} = await apii.addman(this.formData.title,this.formData.description)

        //    const {code} = await apii.add(this.file)
        // const {code} = await apii.addmanyone(this.formData.file)
        //    console.log(typeof(this.formData.title),this.formData.des,typeof(this.formData.file));
        // const {code} = await apii.addmanyone(this.formData.title,this.formData.description,this.formData.file)
        //    const {code} = await api.adds(this.formData)
        //    const {code} = await api.addmany(this.formData.file)
        //    console.log(code); 
            if(code === 200) {
                    //   this.$refs.elup.autoUpload = true
                        // 将表单清空
                        this.$refs['formData'].resetFields()
                        // 关闭窗口
                        this.clickClose(true)
                        this.$message.success('提交成功')
                    }


            // 图片
            //  let response = {}
            //  console.log(this.formData.file);
            //  if (!this.formData.file) return this.$message.warning('请选择文件') 
            //  this.param = new FormData()
            //  this.param.append('file', this.formData.file, this.formData.file.name)
            //  this.param.append('id', this.formData.file.uid) 
           
            // this.formData.file = this.param
            // console.log(this.param);
            // console.log(this.formData);
            // const {code} = await api.addmany(this.param) 
            // console.log(code);
            // if(code === 20000) {
            // this.$message.success('上传成功') 
            // }


            //  console.log(this.formData);
        //    response = await api.addmany(this.formData)
        //    console.log(response);

        },

       



    }
}
</script>

<style scoped>

</style>