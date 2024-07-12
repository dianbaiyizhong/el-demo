import Mock from 'mockjs'
import hmoeApi from './mockData.js'
//拦截请求
Mock.mock('/home/getData', hmoeApi.getHomeData);
Mock.mock('/home/getCount', hmoeApi.getCountData);
Mock.mock('/home/getDeptInfo', hmoeApi.getDeptInfo);


