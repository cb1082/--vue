

import {fetchGet} from 'fetch'
import api from 'api'
const state = {
    total:undefined,
    menuList:[{id:-1,label:'推荐'}],
    bannerlist:[]
}


const mutations = {
    setTotal(state,params) {
        state.total = params.total;
    },
    setMenuList(state,params) {
        state.menuList = [...state.menuList,...params];
    },
    setBannerData(state,params) {
        state.bannerlist = params;
    }
}


const actions = {
    getGoodTotal (context){
        //请求严选的商品总数
        fetchGet(api.GOODS_TOTAL_URL).then((data)=>{
			context.commit('setTotal',data);  //调用mutations进行赋值
		})
    },
    //请求首页菜单栏的数据
    getMenuData (context){
        //请求菜单栏的数据
        fetchGet(api.CATE_LIST_URL).then((data)=>{
			//如果使用this.list 会有好多废数据（set方法，get方法等）
            let newdata = data.map(({id,name})=>({id,label:name}));   //处理数据
            // console.log(newdata);
			context.commit('setMenuList',newdata);  //调用mutations进行赋值
		})
    },
    //请求首页的轮播图数据
    getBannerData(context) {
        fetchGet(api.HOME_BANNER_LIST_URL).then((data)=>{
            let newdata = data.map(({id,picUrl})=>({id,picUrl}))
            context.commit('setBannerData',newdata);
        })
    }
}


export default {
    namespaced:true,
    state,
    mutations,
    actions
}