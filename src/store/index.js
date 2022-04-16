import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    filmForm: false,
    isCreate: false,
    isEdit: false,
    role:"",
    name:"",
    uid:localStorage.getItem('uid'),
    token:localStorage.getItem('token'),
    loggedIn: localStorage.getItem("loggedIn"),
    filmDetail:[],
    statuses:[],
    favList:[],
  },
  mutations: {
    changeCreateValue(state){
      state.isCreate = !state.isCreate;
    },
    changeEditValue(state){
      state.isEdit = !state.isEdit;
    },
    changeFilmFormValue(state){
      state.filmForm = !state.filmForm;
    },
    changeUserValue(state,value){
      state.name = value.name
      state.role = value.role
      state.uid = value.uid
    },
    changeFilmDetail(state,value){
      state.filmDetail = value
    },
    changeStatuses(state,value){
      state.statuses = value
    },
    changeFavList(state,value){
      state.favList = value
    },
  },
  actions: {
    handleIsCreate({ commit }){
      commit('changeCreateValue')
    },
    handleIsEdit({ commit }){
      commit('changeEditValue')
    },
    handleFilmForm({ commit }){
      commit('changeFilmFormValue')
    },
    async getUser({ commit, state }){
      await axios.get("/api/user", { headers: { "Authorization": "Bearer " + state.token }})
      .then(response=>{
        let uid = response.data.id
        let name = response.data.name
        let role = response.data.roles.name

        commit('changeUserValue',{'uid': uid,'name': name, 'role': role})
      })
      .catch(error => {
        console.log(error);
      });
    },
    handleFilmDetail({ commit },obj){
      commit('changeFilmDetail',obj)
    },
    handleStatuses({ commit },obj){
      commit('changeStatuses',obj)
    },
    async getFavList({ commit, state }) {
      await axios.get("/api/favorites/"+state.uid,{headers: {'Authorization': 'Bearer '+ state.token}})
        .then(response => {
          commit('changeFavList',response.data)
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
  modules: {
  }
})
