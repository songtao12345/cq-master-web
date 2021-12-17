import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  // {
  //   path: '/404',
  //   component: () => import('@/views/404'),
  //   hidden: true
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  // {
  //   path: '/workflow',
  //   component: Layout,
  //   redirect: '/workflow/model',
  //   name: 'Workflow',
  //   meta: { title: '工作流程', icon: 'example'},
  //   children: [
  //     {
  //       path: 'model',
  //       name: 'Model',
  //       component: () => import('@/views/workflow/model'),
  //       meta: { title: '模型管理', icon: 'tree'}
  //     },
  //     {
  //       path: 'process',
  //       name: 'Process',
  //       component: () => import('@/views/workflow/process'),
  //       meta: { title: '流程管理', icon: 'tree' }
  //     }
  //   ]
  // },

  {
    path: '/applyy',
    component: Layout,
    redirect: '/applyy/annual',
    name: 'Applyy',
    meta: { title: '业务办理', icon: 'form' },
    children: [
      // {
      //   path: 'leave',
      //   name: 'Leave',
      //   component: () => import('@/views/workflow/apply/leave'),
      //   meta: { title: '请假申请', icon: 'table' }
      // },
      // {
      //   path: 'loan',
      //   name: 'Loan',
      //   component: () => import('@/views/workflow/apply/loan'),
      //   meta: { title: '借款申请', icon: 'table' }
      // },
      {
        path: 'safety',
        name: 'Safety',
        component:() => import('@/views/workflow/apply/safety'),
        meta: { title: '安全生产费用使用计划', icon: 'table' }
      },
      {
        path: 'joint',
        name: 'Joint',
        component:() => import('@/views/workflow/apply/joint'),
        meta: { title: '召开联管会', icon: 'table' }
      },
      {
        path: 'crude',
        name: 'Crude',
        component:() => import('@/views/workflow/apply/crude'),
        meta: { title: '原油结算', icon: 'table' }
      },
      {
        path: 'cooperative',
        name: 'Cooperative',
        component:() => import('@/views/workflow/apply/cooperative'),
        meta: { title: '合作区块筛选及报批', icon: 'table' }
      },
      {
        path: 'bid',
        name: 'Bid',
        component:() => import('@/views/workflow/apply/bid'),
        meta: { title: '合作方招标', icon: 'table' }
      },
      {
        path: 'contract',
        name: 'Contract',
        component:() => import('@/views/workflow/apply/contract'),
        meta: { title: '合同管理流程', icon: 'table' }
      },
      {
        path: 'approval',
        name: 'Approval',
        component:() => import('@/views/workflow/apply/approval'),
        meta: { title: '合作项目管理', icon: 'table' }
      },
      {
        path: 'salary',
        name: 'Salary',
        component:() => import('@/views/workflow/apply/salary'),
        meta: { title: '薪酬管理标准和实施细则', icon: 'table' }
      },
      {
        path: 'scrap',
        name: 'Scrap',
        component:() => import('@/views/workflow/apply/scrap'),
        meta: { title: '油水井资产报废流程', icon: 'table' }
      },
      {
        path: 'declare',
        name: 'Declare',
        component:() => import('@/views/workflow/apply/declare'),
        meta: { title: '项目申报与审批', icon: 'table' }
      },
      {
        path: 'audit',
        name: 'Audit',
        component:() => import('@/views/workflow/apply/audit'),
        meta: { title: '合作项目年度审计', icon: 'table' }
      },
      {
        path: 'operation',
        name: 'Operation',
        component:() => import('@/views/workflow/apply/operation'),
        meta: { title: '石油合作项目操作费预算', icon: 'table' }
      },
    ]
  },

  // {
  //   path: '/task',
  //   component: Layout,
  //   redirect: '/task/await',
  //   name: 'Task',
  //   meta: { title: '个人任务', icon: 'example' },
  //   children: [
  //     {
  //       path: 'await',
  //       name: 'Await',
  //       component: () => import('@/views/workflow/await'),
  //       meta: { title: '待办任务', icon: 'tree' }
  //     },
  //     {
  //       path: 'complete',
  //       name: 'Complete',
  //       component: () => import('@/views/workflow/complete'),
  //       meta: { title: '已办任务', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/instance',
  //   component: Layout,
  //   redirect: '/instance/running',
  //   name: 'Instance',
  //   meta: { title: '流程实例', icon: 'example' },
  //   children: [
  //     {
  //       path: 'running',
  //       name: 'Running',
  //       component: () => import('@/views/workflow/running'),
  //       meta: { title: '运行中流程', icon: 'tree' }
  //     },
  //     {
  //       path: 'finish',
  //       name: 'Finish',
  //       component: () => import('@/views/workflow/finish'),
  //       meta: { title: '已结束流程', icon: 'tree' }
  //     },
  //   ]
  // },


  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
