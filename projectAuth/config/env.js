// import {DEV_BACKEND_URL, PROD_BACKEND_URL} from '@env';

const devEnvironmentVariables = {
  BACKEND_URL: "http://192.168.1.104:5000"
};
//46.120.216.85  192.168.1.104
// http://192.168.1.104/Restapi
//const prodEnvironmentVariables = { /Resthapi
//   BACKEND_URL: PROD_BACKEND_URL,
// };https://46.120.216.85/Authapi 176.230.158.127

export default devEnvironmentVariables 

//export default __DEV__ ? devEnvironmentVariables : prodEnvironmentVariables;