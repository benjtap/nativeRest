
import axios from 'axios'
import axiosCancel from 'axios-cancel';


const BASE_URL ="https://192.168.1.104:44333"

//const BASE_URL = "http://telesmsweb/";
//const BASE_URL = "http://192.168.15.56:4567/";


axiosCancel(axios, {
  debug: false // default
});
 

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: false,
  params: {} // do not remove this, its added to add params later in the config
})

// Add a request interceptor
instance.interceptors.request.use(function (config) {
 
   var token=  localStorage.getItem('jwt')
  
  if (token) {
    config.headers.common['Authorization'] = 'Bearer ' + token
    config.headers.common['Access-Control-Allow-Origin'] = '*'

    if (config.url.indexOf('fileupload') > -1){
      config.headers.common['Content-Type'] = 'multipart/form-data'
   
    }
      

  } else {
    // Use application/x-www-form-urlencoded for login
    config.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})


instance.interceptors.response.use((response) => response, (error) => {
 
  return Promise.reject(error)
 
})


export default {

  cancelation(){

    axios.cancel(instance);


  },
 
  getData (action) {
    let url = BASE_URL
    url += action
    return instance.get(url)
  },
  postData (action, data) {
    let url = BASE_URL
    url += action
    return instance.post(url, data)
  },

 
  postDatablob (action, data,responsetype) {
    let url = BASE_URL
    url += action
    return instance.post(url, data,responsetype)
  },
  
  login (action, data) {
    let url = '${BASE_URL}'
    url += action
    return instance.get(url, data)
  }
}