import React, { Component,useState,useEffect } from "react"
import {SafeAreaView, Alert, StyleSheet, Text, View, TouchableOpacity, Modal, Pressable } from "react-native"
import { Agenda } from "react-native-calendars"
import testIDs from "../testIDs"
import axiosInstance from '../helpers/axiosInstance';

 const MyCalendar = (props) => {
  const { navigation } = props;
  
  const [state, setState] = React.useState({items: undefined });
 
  const [modalVisible, setModalVisible] = useState(false);
  const [deletableval, setDeletableval] = useState(false);
  

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
       
      loadItems()
    });


    return unsubscribe;
   
  }, [navigation]);



  loadItems = async() => {
  
  const url =`/Webhttp/getgrouptiming`;
     
  await axiosInstance.get(url)

   .then(({data}) => {
     console.log(data)
    setState({  items: data })
     }).catch((err) => {
        
     }) 
   }

  const deleterecord = async() =>{

    let deletegrouptimingPost =  {
      id:deletableval,
      }
        let url =`/Webhttp/deletetimimgrecord`

     await axiosInstance.post(url,deletegrouptimingPost)
  
     .then(({data}) => {
      setModalVisible(!modalVisible) 
      loadItems()    
      })
  }



renderDay = day => {
  if (day) {
    return <Text style={styles.customDay}>{day.getDay()}</Text>
  }
  return <View style={styles.dayItem} />
}

renderItem = (reservation, isFirst) => {
  const fontSize = isFirst ? 16 : 14
  const color = isFirst ? "black" : "#43515c"

  return (
    <TouchableOpacity
      testID={testIDs.agenda.ITEM}
      style={[styles.item, { height: reservation.height }]}
      onPress={() => {
         setDeletableval(reservation.id)

         setModalVisible(true)
         }}>
      <Text style={{ fontSize, color }}> קבוצה {reservation.groupname} ב {reservation.date}</Text>
    </TouchableOpacity>
  )
}

 renderEmptyDate = () => {
  return (
    <View style={styles.emptyDate}>
      <Text>This is empty date!</Text>
    </View>
  )
}

 rowHasChanged = (r1, r2) => {
  return r1.name !== r2.name
}

 timeToString = (time) => {
  const date = new Date(time)
  return date.toISOString().split("T")[0]
}

    return (
      <SafeAreaView style={{flex: 1}}>
         <View style={styles.container}> 
  <Agenda

  testID={testIDs.agenda.CONTAINER}
  items={state.items}
   loadItemsForMonth={loadItems}
  selected={'2024-05-01'}
  renderItem={renderItem}
  renderEmptyDate={renderEmptyDate}
  rowHasChanged={rowHasChanged}
  showClosingKnob={true}

  maxData={'2050-01-01'}
  monthFormat={'MMMM yyyy'}
 
    
/>
</View>
<View style={styles.centeredView}> 
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>מחוק רשומה </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() =>{
                deleterecord()
                     }}
               >
              <Text style={styles.textStyle}>הפעל</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      </View>
      </SafeAreaView>
    )



}

const styles = StyleSheet.create({
  wrapper: {
    
    
  },
 
  container: {
    //backgroundColor: '#fff',
    flex:14,
    flexWrap: "wrap",
    flexDirection: "row",
  },
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  customDay: {
    margin: 10,
    fontSize: 24,
    color: "green"
  },
  dayItem: {
    marginLeft: 34
  },
  centeredView: {
    flex:1,
   
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
   
      width: 300,
      height: 300
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },


})
export default MyCalendar;