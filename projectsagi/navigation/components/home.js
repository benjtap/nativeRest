
// import { useState } from "react";


import { SafeAreaView, ScrollView, View ,StyleSheet} from "react-native";

// import { COLORS, icons, images, SIZES } from "../constants";
// import {
//   Nearbyjobs,
//   Popularjobs,
//   ScreenHeaderBtn,
//   Welcome
 
// } from "../components";


// const Home = ({}) => {

//   const [searchTerm, setSearchTerm] = useState("");
//     return (
     
//   <ScrollView showsVerticalScrollIndicator={false}>
//   <View
//     style={{
//       flex: 1,
//       padding: SIZES.medium,
//     }}
//   >
//     <Welcome
//       searchTerm={searchTerm}
//       setSearchTerm={setSearchTerm}
//       handleClick={() => {
//         // if (searchTerm) {
//         //  //router.push(`/search/${searchTerm}`)
//         // }
//       }}
//     />
  
//     <Popularjobs />
//     <Nearbyjobs />
//   </View>
//   </ScrollView>
//     );
// };

// export default Home;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, 
//     alignItems: 'center', 
//     justifyContent: 'center'
//   },
// });

const Home = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Home screen!</Text>
  </View>
)

// const HomeStackNavigator = () => {
//   return (
//     <Stack.Navigator screenOptions={{
//       headerShown: false,
//     }}>
//       <Stack.Screen name={screens.Home} component={Home} />
//     </Stack.Navigator>
//   )
// }

export default Home