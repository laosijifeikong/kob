import { createStore } from 'vuex'
import ModuleUser from '@/store/user'
import ModulePk from '@/store/pk'
import ModuleRecord from '@/store/record'
import ModuleRouter from '@/store/router'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: ModuleUser,
    pk: ModulePk,
    record: ModuleRecord,
    router: ModuleRouter,
  }
})
