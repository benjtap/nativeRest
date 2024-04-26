// import {DEV_BACKEND_URL, PROD_BACKEND_URL} from '@env';

const devEnvironmentVariables = {
  BACKEND_URL: "http://192.168.1.104/Restapi"
};

// const prodEnvironmentVariables = {
//   BACKEND_URL: PROD_BACKEND_URL,
// };

export default devEnvironmentVariables 

//export default __DEV__ ? devEnvironmentVariables : prodEnvironmentVariables;