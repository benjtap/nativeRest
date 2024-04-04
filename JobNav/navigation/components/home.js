
import { useState } from "react";


import { SafeAreaView, ScrollView, View ,StyleSheet} from "react-native";

import { COLORS, icons, images, SIZES } from "../constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome
 
} from "../components";


const Home = ({}) => {

  const [searchTerm, setSearchTerm] = useState("");
    return (
     
  <ScrollView showsVerticalScrollIndicator={false}>
  <View
    style={{
      flex: 1,
      padding: SIZES.medium,
    }}
  >
    <Welcome
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      handleClick={() => {
        // if (searchTerm) {
        //  //router.push(`/search/${searchTerm}`)
        // }
      }}
    />
  
    <Popularjobs />
    <Nearbyjobs />
  </View>
  </ScrollView>
    );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});