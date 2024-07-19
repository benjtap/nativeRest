import React, { useState, useEffect } from 'react';
//import { I18nManager } from 'react-native'
// import all the components we are going to use
import {Button,View, Text,StyleSheet,TouchableOpacity} from 'react-native';

// //import library for the TreeView
// import NestedListView, {NestedRow} from 'react-native-nested-listview'

//I18nManager.forceRTL(true);

const Menu = () => {
  const [data, setData] = useState([
 
    {
      title: 'Software',
      items: [
        {
          title: 'JS',
         
        },
        {
          title: 'React JS',
          items: [
            {
              title: 'Components',
              
            },
            {
              title: 'Hooks',
              
            },
          ],
        },
      ],
    },
  ]);
  



    const addChild = (index,level,it) => {
   

    setData(function(){
      // create shallow copy of array
      const newPost = [...data];
      
       for(var pindex in newPost){
          
        
        p = newPost[pindex] 

           //if ()

           
           console.log('pindex ' + pindex)
           console.log('index ' + index)
           console.log('level ' + level)
           

           if (level==0 )
            p.items.splice(index, 0, { title: "billy" });
          else{
            if( it.items===undefined)
            {
                 it.items = [] 
          it.items.splice(index, 0, { title: "billy" });
            }else
            {
              it.items.splice(index, 0, { title: "billy" });

            }

          }
        
     
          return newPost;
         }
      
 
     })
   
    }
   
 

  return (
<View style={{flex: 1}}>
    {data.map((item, index) => (
        <View key={index} style={{borderBottomColor: 'black', borderBottomWidth: .5}}>
           <View style = {{flexDirection:'row',flexWrap:'wrap'}}>
           <Text style={{fontSize: 30, fontWeight: 'bold'}}>{item.title} <Button   style={styles.button1}  title="הוסף"  
             onPress={() => addChild(index,0,item)} /> 
                {/* <Button   style={styles.button1}  title="מחוק"  
             onPress={() => handledeleteAudiorecord()} />  */}
              </Text></View>
          
            
          
   
            {item.items && <>
            {item.items.map((item, index) => (
                <View key={index} style={{ borderBottomColor: 'black', borderBottomWidth: .5}}>
                    
                    <View style = {{flexDirection:'row',flexWrap:'wrap'}}>
                      <Text style={{fontSize: 20, marginLeft: 40, color: 'blue'}}>{item.title} <Button   style={styles.button1}  title="הוסף"  
             onPress={() => addChild( index,1,item)} />   
              {/* <Button   style={styles.button1}  title="מחוק"  
             onPress={() => handledeleteAudiorecord()} />  */}
                   </Text></View>


                     {item.items && <>
                     {item.items.map((item, index) => (
                       <View key={index}  style={{ borderBottomColor: 'black', borderBottomWidth: .5}}>
                           <View style = {{flexDirection:'row',flexWrap:'wrap'}}>
                           <Text style={{fontSize: 18, marginLeft:60,}}>{item.title} <Button   style={styles.button1}  title="הוסף"  
             onPress={() => addChild( index,2,item)} />   
              {/* <Button   style={styles.button1}  title="מחוק"  
             onPress={() => handledeleteAudiorecord()} />  */}
                   </Text></View>

                   {item.items && <>
                     {item.items.map((item, index) => (
                       <View key={index}  style={{ borderBottomColor: 'black', borderBottomWidth: .5}}>
                           <View style = {{flexDirection:'row',flexWrap:'wrap'}}>
                           <Text style={{fontSize: 16, marginLeft: 80,}}>{item.title} <Button   style={styles.button1}  title="הוסף"  
             onPress={() => addChild( index,3,item)} />   
              {/* <Button   style={styles.button1}  title="מחוק"  
             onPress={() => handledeleteAudiorecord()} />  */}
                   </Text></View>
                   
 
                       </View>
                    ))}
                   </>}
                   </View>
                    ))}
                   </>}
                   

               </View>
            ))}
           </>}
        </View>
     ))}
</View>






  );
};

   // item.children = [
      //   ...(item.items || []),
      //   { title: `${item.title}-${item.items?.length + 1 || 1}` }
      // ];
      
     
      // item.items.splice(index, 0,{
      //   title: 'Hooks',
      // })
   
    //var myarr= [...(item.items|| [] )].splice(index, 0,{ title: "billy" })

    // data.items= [...(item.items|| [] ),{ title: "billy" }]

    // var pjson = {}
  
    // console.log(data.items[2])
    //  setData( data);
     
    //   // setData( // Replace the state
    //   //   [ // with a new array
    //   //     ...(item.items|| [] ), // that contains all the old items
    //   //   {title: 'Hooks2'},// and one new item at the end
    //   //   ]
    //   // );


    //    setData(({ index }) => {
    //     // find index of item to edit
    //        data.items= [...(item.items[index] ),{ title: "billy" }]

    //      return data
    //   });

    // setData(function(){
    //  // create shallow copy of array
    //  const newPost = [...data];
     
    //   for(var pindex in newPost){
    //         p = newPost[pindex] 
    //        // console.log(index)
    //        // console.log(p.items[0])
    //       //console.log(p.items[1])
    //       p.items.splice(index, 0, { title: "billy" });

      

    //     }
    //    return newPost;

    // })

export default Menu;

const styles = StyleSheet.create({
  
  fixToText: {
    flex: 1,
    
    justifyContent: 'space-around',
    justifyContent: 'space-between',
    marginLeft:10,
    marginRight:10
  },
  Viewitem: {
      flexDirection: 'row',
    justifyContent: 'space-around',
    margin:10,
    padding:10,
    borderBottomWidth: 1,
     
  },
  button1: { 
    backgroundColor: '#aaa', 
    borderRadius: 8, 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    alignItems: 'center', 
    marginTop: 26, 
    marginBottom: 12,
    width: 68,
    height: 48
  }

});


// const styles = StyleSheet.create({
//   row: {
//       borderColor: 'rgb(84, 85, 86)',
//       backgroundColor: 'rgb(10, 157, 40)',
//       borderWidth: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       height: 30,
//   },
  
// })