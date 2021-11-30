<template>
  <div class="dashboard-container">
    <div class="dashboard-text">长庆油田流程审批管理系统</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '@/api/menus'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.getMunusList()
  },
  methods: {
    getMunusList() {
      api.getMenus().then(res=>{
        console.log(res);
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
