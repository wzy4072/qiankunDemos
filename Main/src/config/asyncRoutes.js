const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}
export default [
          {
              path: '/appT2/index/',
              name: 'Main',
              meta: { title: '首页', permission: ['dashboard'] }
          },
          {
              path: '/appT2/demos',
              component: RouteView,
              redirect: '/demos/demo1',
              name: 'Demo',
              meta: { title: 'DEMO', permission: ['dashboard'] },
              children: [
                  {
                      path: 'demo1',
                      name: 'demo1',
                      meta: {
                          title: 'DEMO1',
                          keepAlive: true
                      }
                  },
                  {
                      path: 'demo2',
                      name: 'demo2',
                      meta: {
                          title: 'DEMO2',
                          keepAlive: true
                      }
                  },
                  {
                      path: 'demo3',
                      name: 'demo3',
                      meta: {
                          title: 'DEMO3',
                          keepAlive: true
                      }
                  },
                  {
                      path: 'bankInfo/demo',
                      name: 'bankInfoDemo',
                      meta: {
                          title: '联行号demo',
                          keepAlive: false
                      }
                  }
              ]
          },
          {
              path: '/appT2/system',
              name: 'SystemPlatform',
              redirect: '/system/platform',
              component: RouteView,
              meta: { title: '基础平台', icon: 'form', permission: ['form'] },
              children: [
                  {
                      path: '/appT2/system',
                      name: 'dataManager',
                      component: RouteView,
                      meta: { title: '数据管理', keepAlive: true, permission: ['form'] },
                      children: []
                  },
                  {
                      path: '/appT2/system/config',
                      name: 'SystemConfig',
                      component: RouteView,
                      meta: { title: '系统配置', keepAlive: true, permission: ['form'] },
                      children: [
                          {
                              path: '/appT2/system/menu',
                              name: 'menuAdjust',
                              meta: {
                                  title: '菜单管理',
                                  keepAlive: false,
                                  permission: ['form']
                              }
                          }
                      ]
                  },
                  {
                      path: '/appT2/system/permissionManager',
                      name: 'PermissionManager',
                      component: RouteView,
                      meta: { title: '权限管理', keepAlive: true, permission: ['form'] },
                      children: [
                          {
                              path: '/appT2/system/role',
                              name: 'RoleIndex',
                              meta: {
                                  title: '角色管理',
                                  keepAlive: false,
                                  permission: ['form']
                              }
                          },
                          {
                              path: '/appT2/system/role/assignResource',
                              name: 'RoleAssignResource',
                              hidden: true,
                              meta: {
                                  title: '分配资源',
                                  keepAlive: false,
                                  permission: ['form'],
                                  parentPath: '/system/role',
                                  parentTitle: '角色管理'
                              }
                          },
                          {
                              path: '/appT2/system/role/dataScope',
                              name: 'RoleDataScope',
                              hidden: true,
                              meta: {
                                  title: '数据权限',
                                  keepAlive: false,
                                  permission: ['form'],
                                  parentPath: '/system/role',
                                  parentTitle: '角色管理'
                              }
                          },
                          {
                              path: '/appT2/system/corp',
                              name: 'CorpsManagement',
                              meta: { title: '单位管理', keepAlive: false, permission: ['form'] }
                          },
                          {
                              path: '/appT2/system/user',
                              name: 'User',
                              meta: { title: '用户管理', keepAlive: false, permission: ['form'] }
                          }
                      ]
                  }
              ]
          },
          {
              path: '/appT2/devops',
              component: RouteView,
              redirect: '/devops/register',
              name: 'Devops',
              meta: { title: '服务治理', permission: ['dashboard'] },
              children: [
                  {
                      path: '/appT2/devops/Nacos',
                      name: 'Nacos',
                      meta: {
                          title: '注册/配置',
                          keepAlive: false,
                          url: 'http://localhost:8848/nacos'
                      }
                  },
                  {
                      path: '/appT2/devops/sentinel',
                      name: 'SentinelDashBoard',
                      meta: {
                          title: '服务运维',
                          keepAlive: false,
                          url: 'http://127.0.0.1:8021/'
                      }
                  },
                  {
                      path: '/appT2/devops/swagger',
                      name: 'Swagger',
                      meta: {
                          title: '聚合文档',
                          keepAlive: false,
                          url: 'http://127.0.0.1:8443/swagger-ui/index.html'
                      }
                  }
              ]
          },
          {
              path: '/appT2/manager',
              name: 'SystemSettings',
              redirect: '/',
              component: RouteView,
              meta: { title: '系统设置', keepAlive: true, permission: ['dashboard'] },
              children: [
                  {
                      path: '/appT2/manager/application',
                      name: 'ApplicationIndex',
                      meta: {
                          title: '应用管理',
                          keepAlive: false,
                          permission: ['dashboard']
                      }
                  },
                  {
                      path: '/appT2/manager/appModule',
                      name: 'ApplicationModuleIndex',
                      meta: {
                          title: '模块管理',
                          keepAlive: false,
                          permission: ['dashboard']
                      }
                  },
                  {
                      path: '/appT2/manager/application/assignApplicationMenu',
                      name: 'AssignAppModuleMenu',
                      hidden: true,
                      meta: {
                          title: '分配菜单',
                          keepAlive: false,
                          permission: ['dashboard'],
                          parentPath: '/manager/appModule',
                          parentTitle: '应用管理'
                      }
                  },
                  {
                      path: '/appT2/manager/menu',
                      name: 'menu',
                      meta: {
                          title: '菜单管理',
                          keepAlive: false,
                          permission: ['form']
                      }
                  },
                  // {
                  //     path: '/appT2/manager/menu/level',
                  //     name: 'EditMenuLevelIndex',
                  //     meta: {
                  //         title: '菜单层级管理',
                  //         keepAlive: false,
                  //         permission: ['form']
                  //     }
                  // },
                  {
                      path: '/appT2/manager/resource',
                      name: 'resource',
                      meta: {
                          title: '资源管理',
                          keepAlive: false,
                          permission: ['form']
                      }
                  },
                  {
                      path: '/appT2/manager/tenant',
                      name: 'ListTenant',
                      meta: { title: '租户管理', keepAlive: false, permission: ['dashboard'] }
                  },
                  {
                      path: '/appT2/manager/tenant/assignApplication',
                      name: 'AssignApplication',
                      hidden: true,
                      meta: {
                          title: '分配应用',
                          keepAlive: false,
                          permission: ['dashboard'],
                          parentPath: '/manager/tenant',
                          parentTitle: '租户管理'
                      }
                  }
              ]
          },

          // forms
          // {
          //     path: '/appT2/system',
          //     redirect: '/system/corp',
          //     component: RouteView,
          //     meta: { title: '权限管理', icon: 'form', permission: ['form'] },
          //     children: [
          //         {
          //             path: '/appT2/system/role',
          //             name: 'Role',
          //             meta: { title: '角色管理', keepAlive: true, permission: ['form'] }
          //         },
          //         {
          //             path: '/appT2/system/role/assignResource/:roleId',
          //             name: 'RoleAssignResource',
          //             hidden: true,
          //             meta: {
          //                 title: '分配资源',
          //                 keepAlive: true,
          //                 permission: ['form'],
          //                 parentPath: '/system/role',
          //                 parentTitle: '角色管理'
          //             }
          //         },
          //         {
          //             path: '/appT2/system/role/dataScope',
          //             name: 'RoleDataScope',
          //             hidden: true,
          //             meta: {
          //                 title: '数据权限',
          //                 keepAlive: true,
          //                 permission: ['form'],
          //                 parentPath: '/system/role',
          //                 parentTitle: '角色管理'
          //             }
          //         },
          //         {
          //             path: '/appT2/system/corp',
          //             name: 'CorpsManagement',
          //             meta: { title: '单位管理', keepAlive: true, permission: ['form'] }
          //         },
          //         {
          //             path: '/appT2/system/user',
          //             name: 'User',
          //             meta: { title: '用户管理', keepAlive: true, permission: ['form'] }
          //         }
          //     ]
          // },
          {
              path: '/appT2/basic',
              redirect: '/basic/data',
              component: RouteView,
              meta: { title: '基础数据', icon: 'form', permission: ['form'] },
              children: [
                  {
                      path: '/appT2/dataManage',
                      redirect: '/basic/dataManage',
                      component: RouteView,
                      meta: { title: '数据管理', icon: 'form', permission: ['form'] },
                      children: [
                          {
                              path: '/appT2/bankInformation',
                              redirect: '/basic/bankInformation',
                              component: RouteView,
                              meta: { title: '银行信息管理', icon: 'form', permission: ['form'] },
                              children: [
                                  {
                                      path: '/appT2/basic/inputBankInfo',
                                      name: 'inputBankInfo',
                                      meta: {
                                          title: '银行信息维护',
                                          keepAlive: true,
                                          permission: ['form']
                                      }
                                  }, {
                                      path: '/appT2/basic/bankType',
                                      name: 'BtBankType',
                                      meta: {
                                          title: '银行类型',
                                          keepAlive: true,
                                          permission: ['form']
                                      }
                                  }, {
                                      path: '/appT2/basic/bisbif',
                                      name: 'bisbif',
                                      meta: {
                                          title: '接口代码维护',
                                          keepAlive: true,
                                          permission: ['form']
                                      }
                                  }, {
                                      path: '/appT2/basic/bifRule',
                                      name: 'bifRule',
                                      meta: {
                                          title: '银行接口代码业务规则维护',
                                          keepAlive: true,
                                          permission: ['form']
                                      }
                                  }]
                          },
                          {
                              path: '/appT2/basic/currency',
                              name: 'currency',
                              meta: {
                                  title: '币种管理',
                                  keepAlive: true,
                                  permission: ['form']
                              }
                          },
                          {
                              path: '/appT2/basic/purpose',
                              name: 'purpose',
                              meta: {
                                  title: '用途管理',
                                  keepAlive: true,
                                  permission: ['form']
                              }
                          }
                      ]
                  },
                  {
                      path: '/appT2/basic/config',
                      name: 'Config',
                      meta: {
                          title: '配置管理',
                          keepAlive: true,
                          permission: ['form']
                      }
                  },
                  {
                      path: '/appT2/basic/dict',
                      name: 'DictManage',
                      meta: {
                          title: '字典管理',
                          keepAlive: true,
                          permission: ['form']
                      }
                  },
                  {
                      path: '/appT2/basic/countryCust',
                      name: 'countryCust',
                      meta: {
                          title: '国家地区',
                          keepAlive: true,
                          permission: ['form']
                      }
                  },
                  {
                      path: '/appT2/basic/region',
                      name: 'Region',
                      meta: {
                          title: '省市管理',
                          keepAlive: true,
                          permission: ['form']
                      }
                  },
                  {
                      path: '/appT2/basic/attachment',
                      name: 'Attachment',
                      meta: {
                          title: '附件管理',
                          keepAlive: true,
                          permission: ['form']
                      }
                  },
                  {
                      path: '/appT2/basic/multiLang',
                      name: 'MultiLang',
                      meta: {
                          title: '国际化管理',
                          keepAlive: true,
                          permission: ['form']
                      }
                  },
                  {
                      path: '/appT2/basic/calendar',
                      name: 'Calendar',
                      meta: {
                          title: '日历管理',
                          keepAlive: true,
                          permission: ['form']
                      }
                  },
                  {
                      path: '/appT2/basic/logAudit',
                      name: 'Log',
                      meta: {
                          title: '日志管理',
                          keepAlive: true,
                          permission: ['form']
                      }
                  },
                  {
                      path: '/appT2/basic/btratetype',
                      name: 'Btratetype',
                      meta: {
                          title: '汇率类型维护',
                          keepAlive: true,
                          permission: ['form']
                      }
                  },
                  {
                      path: '/appT2/basic/adjust',
                      name: 'adjust',
                      meta: {
                          title: '货币汇率维护',
                          keepAlive: true,
                          permission: ['form']
                      }
                  },
                  {
                      path: '/appT2/basic/adjustCheck',
                      name: 'adjustCheck',
                      meta: {
                          title: '货币汇率维护复核',
                          keepAlive: true,
                          permission: ['form']
                      }
                  },
                  {
                      path: '/appT2/basic/supplier',
                      redirect: '/basic/supplierType',
                      component: RouteView,
                      meta: { title: '客商管理', icon: 'form', permission: ['form'] },
                      children: [
                          {
                              path: '/appT2/basic/supplierType',
                              name: 'supplierType',
                              meta: {
                                  title: '供应商类别维护',
                                  keepAlive: true,
                                  permission: ['form']
                              }
                          },
                          {
                              path: '/appT2/basic/externalCorp',
                              name: 'externalCorp',
                              meta: {
                                  title: '客商资料',
                                  keepAlive: true,
                                  permission: ['form']
                              }
                          },
                          {
                              path: '/appT2/basic/externalCorp/audit',
                              name: 'externalCorpAudit',
                              meta: {
                                  title: '客商资料复核',
                                  keepAlive: true,
                                  permission: ['form']
                              }
                          },
                          {
                              path: '/appT2/basic/externalCorp/allData',
                              name: 'externalCorpAllData',
                              meta: {
                                  title: '客商资料查询',
                                  keepAlive: true,
                                  permission: ['form']
                              }
                          }
                      ]
                  }
              ]
          },
          {
              path: '/appT2/account',
              redirect: '/account/basicData',
              component: RouteView,
              meta: { title: '账户管理', icon: 'form', permission: ['form'] },
              children: [
                  {
                      path: '/appT2/paramConfig',
                      redirect: '/account/paramConfig',
                      component: RouteView,
                      meta: { title: '参数配置', icon: 'form', permission: ['form'] },
                      children: [
                          {
                              path: '/appT2/account/paramConfig/fcsConfig',
                              name: 'fcsConfig',
                              meta: {
                                  title: '内部账户管理参数',
                                  keepAlive: true,
                                  permission: ['form']
                              }
                          },
                          {
                              path: '/appT2/account/paramConfig/bankAccConfig',
                              name: 'bankAccConfig',
                              meta: {
                                  title: '银行账户管理参数',
                                  keepAlive: true,
                                  permission: ['form']
                              }
                          },
                          {
                              path: '/appT2/account/paramConfig/receivableConfig',
                              name: 'receivableConfig',
                              meta: {
                                  title: '银行流水认领参数',
                                  keepAlive: true,
                                  permission: ['form']
                              }
                          },
                          {
                              path: '/appT2/account/paramConfig/eleConfig',
                              name: 'eleConfig',
                              meta: {
                                  title: '电子回单参数',
                                  keepAlive: true,
                                  permission: ['form']
                              }
                          }
                      ]
                  },
                  {
                      path: '/appT2/basicData',
                      redirect: '/account/basicData',
                      component: RouteView,
                      meta: { title: '基础数据维护', icon: 'form', permission: ['form'] },
                      children: [
                          {
                              path: '/appT2/account/basicData/nature',
                              name: 'nature',
                              meta: {
                                  title: '账户性质维护',
                                  keepAlive: true,
                                  permission: ['form']
                              }
                          },
                          {
                              path: '/appT2/account/basicData/accAttrMaintentance',
                              name: 'AccountAttrMaintentance',
                              meta: {
                                  title: '账户属性维护',
                                  keepAlive: true,
                                  permission: ['form']
                              }
                          },
                          {
                              path: '/appT2/account/basicData/instrateAdjust',
                              name: 'instrateAdjust',
                              meta: {
                                  title: '内部利率维护',
                                  keepAlive: true,
                                  permission: ['form']
                              }
                          }
                      ]
                  },
                  {
                      path: '/appT2/innerAccountManage',
                      redirect: '/account/innerAccountManage',
                      component: RouteView,
                      meta: { title: '内部账户管理', icon: 'form', permission: ['form'] },
                      children: [
                          {
                              path: '/appT2/accountApplication',
                              redirect: '/account/accountApplication',
                              component: RouteView,
                              meta: { title: '内部账户申请', icon: 'form', permission: ['form'] },
                              children: [
                                  {
                                      path: '/appT2/account/innerAccountManage/accountApplication/fcaccOpen',
                                      name: 'innerAccOpen',
                                      meta: {
                                          title: '内部账户开户',
                                          keepAlive: true,
                                          permission: ['form']
                                      }
                                  },
                                  {
                                      path: '/appT2/account/innerAccountManage/accountApplication/fcaccClean',
                                      name: 'innerAccClean',
                                      meta: {
                                          title: '内部账户注销',
                                          keepAlive: true,
                                          permission: ['form']
                                      }
                                  },
                                  {
                                      path: '/appT2/account/innerAccountManage/accountApplication/CurrentThawing',
                                      name: 'innerAccThawing',
                                      meta: {
                                          title: '活期存款解冻',
                                          keepAlive: true,
                                          permission: ['form']
                                      }
                                  },
                                  {
                                      path: '/appT2/account/innerAccOpenEdit',
                                      name: 'innerAccOpenEdit',
                                      hidden: true,
                                      meta: {
                                          title: '内部账户开户新增',
                                          keepAlive: true,
                                          permission: ['form']
                                      }
                                  }
                              ]
                          },
                          {
                              path: '/appT2/query',
                              redirect: '/account/query',
                              component: RouteView,
                              meta: { title: '查询', icon: 'form', permission: ['form'] },
                              children: [
                                  {
                                      path: '/appT2/account/innerAccountManage/query/queryInnerAccount',
                                      name: 'queryInnerAccount',
                                      meta: {
                                          title: '内部账户查询',
                                          keepAlive: true,
                                          permission: ['form']
                                      }
                                  }
                              ]
                          }
                      ]
                  },
                  {
                      path: '/appT2/bankAccountManage',
                      redirect: '/account/bankAccountManage',
                      component: RouteView,
                      meta: { title: '银行账户管理', icon: 'form', permission: ['form'] },
                      children: [
                          {
                              path: '/appT2/bankAccReq',
                              redirect: '/account/bankAccReq',
                              component: RouteView,
                              meta: { title: '银行账户申请', icon: 'form', permission: ['form'] },
                              children: [
                                  {
                                      path: '/appT2/account/bankAccountManage/bankAccReq/bankAccApp',
                                      name: 'bankAccApp',
                                      meta: {
                                          title: '银行账号开户申请',
                                          keepAlive: true,
                                          permission: ['form']
                                      }
                                  },
                                  {
                                      path: '/appT2/account/bankAccountManage/bankAccReq/bankAccAppChange',
                                      name: 'bankAccAppChange',
                                      meta: {
                                          title: '银行账户变更申请',
                                          keepAlive: true,
                                          permission: ['form']
                                      }
                                  }
                              ]
                          },
                          {
                              path: '/appT2/query',
                              redirect: '/account/query',
                              component: RouteView,
                              meta: { title: '查询', icon: 'form', permission: ['form'] },
                              children: [
                                  {
                                      path: '/appT2/account/bankAccountManage/query/accountInfoQuery',
                                      name: 'accountInfoQuery',
                                      meta: {
                                          title: '银行账户查询',
                                          keepAlive: true,
                                          permission: ['form']
                                      }
                                  },
                                  {
                                      path: '/appT2/account/bankAccountManage/query/accountHistoryBalQuery',
                                      name: 'accountHistoryBalQuery',
                                      meta: {
                                          title: '银行账户历史余额查询',
                                          keepAlive: true,
                                          permission: ['form']
                                      }
                                  }
                              ]
                          }, {
                              path: '/appT2/offlineAccountFlowManagement',
                              redirect: '/account/offlineAccountFlowManagement',
                              component: RouteView,
                              meta: { title: '离线账户余额流水管理', icon: 'form', permission: ['form'] },
                              children: [
                                  {
                                      path: '/appT2/account/offlineAccountFlowManage/query/closeDateBankAccFlow',
                                      name: 'closeDateBankAccFlow',
                                      meta: {
                                          title: '银行账户流水截止时间维护',
                                          keepAlive: true,
                                          permission: ['form']
                                      }
                                  }/*,
                                  {
                                      path: '/appT2/account/bankAccountManage/query/accountHistoryBalQuery',
                                      name: 'accountHistoryBalQuery',
                                      meta: {
                                          title: '银行账户余额管理',
                                          keepAlive: true,
                                          permission: ['form']
                                      }
                                  },
                                  {
                                      path: '/appT2/account/bankAccountManage/query/accountHistoryBalQuery',
                                      name: 'accountHistoryBalQuery',
                                      meta: {
                                          title: '银行账户流水管理',
                                          keepAlive: true,
                                          permission: ['form']
                                      }
                                  } */
                              ]
                          }
                      ]
                  }, {
                      path: '/appT2/limitQuota',
                      redirect: '/account/limitQuota',
                      component: RouteView,
                      meta: { title: '限额管理', icon: 'form', permission: ['form'] },
                      children: [
                          {
                              path: '/appT2/account/limitQuota/accLimitQuota',
                              name: 'accLimitQuota',
                              meta: {
                                  title: '银行账户限额',
                                  keepAlive: true,
                                  permission: ['form']
                              }
                          },
                          {
                              path: '/appT2/account/limitQuota/corpLimitQuota',
                              name: 'corpLimitQuota',
                              meta: {
                                  title: '集团单位限额',
                                  keepAlive: true,
                                  permission: ['form']
                              }
                          }
                      ]
                  },
                  {
                      path: '/appT2/bankAccHandle',
                      redirect: '/account/bankAccHandle',
                      component: RouteView,
                      meta: { title: '银行账户办理', icon: 'form', permission: ['form'] },
                      children: [
                          {
                              path: '/appT2/account/bankAccHandleApp',
                              name: 'bankAccHandleApp',
                              meta: {
                                  title: '银行账号开户办理',
                                  keepAlive: true,
                                  permission: ['form']
                              }
                          }
                      ]
                  },
                  {
                      path: '/appT2/account/accountGrant',
                      name: 'accountGrant',
                      meta: {
                          title: '账户授权',
                          keepAlive: true,
                          permission: ['form']
                      }
                  }
              ]
          },
          {
              path: '/appT2/pay',
              redirect: null,
              component: RouteView,
              meta: { title: '支付结算', icon: 'form', permission: ['form'] },
              children: [
                  {
                      path: '/appT2/paramConfig',
                      redirect: '/pay/paramConfig',
                      component: RouteView,
                      meta: { title: '参数配置', icon: 'form', permission: ['form'] },
                      children: [
                          {
                              path: '/appT2/pay/paramConfig/nisConfig',
                              name: 'nisConfig',
                              meta: {
                                  title: '支付结算参数',
                                  keepAlive: true,
                                  permission: ['form']
                              }
                          },
                          {
                              path: '/appT2/pay/paramConfig/wageConfig',
                              name: 'wageConfig',
                              meta: {
                                  title: '代发工资参数',
                                  keepAlive: true,
                                  permission: ['form']
                              }
                          },
                          {
                              path: '/appT2/pay/paramConfig/expConfig',
                              name: 'expConfig',
                              meta: {
                                  title: '费用报销参数',
                                  keepAlive: true,
                                  permission: ['form']
                              }
                          }
                      ]
                  },
                  {
                      path: '/appT2/pay/basicData',
                      // redirect: '/pay/basicData',
                      component: RouteView,
                      meta: { title: '基础数据维护', icon: 'form', permission: ['form'] },
                      children: [
                          {
                              path: '/appT2/pay/payType',
                              name: 'payType',
                              meta: {
                                  title: '系统结算方式',
                                  keepAlive: true,
                                  permission: ['form']
                              }
                          },
                          {
                              path: '/appT2/pay/voucherType',
                              name: 'voucherType',
                              meta: {
                                  title: '付款方式维护',
                                  keepAlive: true,
                                  permission: ['form']
                              }
                          },
                          {
                              path: '/appT2/pay/assignPayWay',
                              name: 'AssignPayWay',
                              meta: {
                                  title: '付款方式分配',
                                  keepAlive: true,
                                  permission: ['form']
                              }
                          },
                          {
                              path: '/appT2/pay/chargeBackType',
                              name: 'chargeBackType',
                              meta: {
                                  title: '退单类型维护',
                                  keepAlive: true,
                                  permission: ['form']
                              }
                          },
                          {
                              path: '/appT2/pay/nisBusType',
                              name: 'nisBusType',
                              meta: {
                                  title: '业务种类维护',
                                  keepAlive: true,
                                  permission: ['form']
                              }
                          },
                          {
                              path: '/appT2/pay/nisCorpBus',
                              name: 'nisCorpBus',
                              meta: {
                                  title: '单位业务种类设置',
                                  keepAlive: true,
                                  permission: ['form']
                              }
                          },
                          {
                              path: '/appT2/pay/bisFailReason',
                              name: 'bisFailReason',
                              meta: {
                                  title: '交易失败原因维护',
                                  keepAlive: true,
                                  permission: ['form']
                              }
                          },
                          {
                              path: '/appT2/pay/nisPersonnelDetail',
                              name: 'nisPersonnelDetail',
                              meta: {
                                  title: '职工信息维护',
                                  keepAlive: true,
                                  permission: ['form']
                              }
                          },
                          {
                              path: '/appT2/pay/bisAccDtlImportConfig',
                              name: 'bisAccDtlImportConfig',
                              meta: {
                                  title: '银行流水智能模板导入',
                                  keepAlive: true,
                                  permission: ['form']
                              }
                          }
                      ]
                  },
                  {
                      path: '/appT2/nisBillhead',
                      redirect: null,
                      component: RouteView,
                      meta: { title: '支付管理', icon: 'form', permission: ['form'] },
                      children: [
                          {
                              path: '/appT2/pay/nisBillhead',
                              name: 'nisBillhead',
                              meta: {
                                  title: '付款办理',
                                  keepAlive: true,
                                  permission: ['form']
                              }
                          }
                      ]
                  },
                  {
                      path: '/appT2/nisExpenseDetail',
                      redirect: null,
                      component: RouteView,
                      meta: { title: '费用报销', icon: 'form', permission: ['form'] },
                      children: [
                          {
                              path: '/appT2/pay/nisExpenseDetail',
                              name: 'nisExpenseDetail',
                              meta: {
                                  title: '费用报销制单',
                                  keepAlive: true,
                                  permission: ['form']
                              }
                          },
                          {
                              path: '/appT2/pay/nisExpenseDetail/expenseQuery',
                              name: 'expenseQuery',
                              meta: {
                                  title: '费用报销查询',
                                  keepAlive: true,
                                  permission: ['form']
                              }
                          }
                      ]
                  },
                  {
                      path: '/appT2/pay/wage',
                      redirect: null,
                      component: RouteView,
                      meta: { title: '代发工资', icon: 'form', permission: ['form'] },
                      children: [
                          {
                              path: '/appT2/pay/wage/wage',
                              name: 'wage',
                              meta: {
                                  title: '代发工资制单',
                                  keepAlive: true,
                                  permission: ['form']
                              }
                          },
                          {
                              path: '/appT2/pay/wage/resultDeal',
                              name: 'wageResultDeal',
                              meta: {
                                  title: '代发工资结果异常处理',
                                  keepAlive: true,
                                  permission: ['form']
                              }
                          },
                          {
                              path: '/appT2/pay/wage/query',
                              name: 'wageQuery',
                              meta: {
                                  title: '代发工资查询',
                                  keepAlive: true,
                                  permission: ['form']
                              }
                          }
                      ]
                  }
              ]
          },
          {
              path: '/appT2/allocation',
              redirect: null,
              component: RouteView,
              meta: { title: '资金调拨', icon: 'form', permission: ['form'] },
              children: [
                  {
                      path: '/appT2/allocation/paramConfig',
                      // redirect: '/allocation/paramConfig',
                      component: RouteView,
                      meta: { title: '参数配置', icon: 'form', permission: ['form'] },
                      children: [
                          {
                              path: '/appT2/allocation/paramConfig/allotConfig',
                              name: 'allotConfig',
                              meta: {
                                  title: '资金调拨参数',
                                  keepAlive: true,
                                  permission: ['form']
                              }
                          }
                      ]
                  }
              ]
          },
          {
              path: '/appT2/task',
              redirect: null,
              component: RouteView,
              meta: { title: '任务调度中心', icon: 'form', permission: ['form'] },
              children: [
                  {
                      path: '/appT2/task/running/report',
                      name: 'runningReport',
                      meta: {
                          title: '运行报表',
                          keepAlive: true,
                          permission: ['form']
                      }
                  },
                  {
                      path: '/appT2/task/mangement/index',
                      name: 'taskMangement',
                      meta: {
                          title: '任务管理',
                          keepAlive: true,
                          permission: ['form']
                      }
                  },
                   {
                      path: '/appT2/task/dispatch/logs',
                      name: 'dispatchLogs',
                      meta: {
                          title: '调度日志',
                          keepAlive: true,
                          permission: ['form']
                      }
                  },
                  {
                      path: '/appT2/task/actuator/mangement',
                      name: 'actuatorMangement',
                      meta: {
                          title: '执行器管理',
                          keepAlive: true,
                          permission: ['form']
                      }
                  }
              ]
          }
        ]
