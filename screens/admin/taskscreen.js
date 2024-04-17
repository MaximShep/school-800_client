import { useFocusEffect, useNavigation } from "@react-navigation/core";
import { useCallback,useState } from "react";
import { FlatList, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { ip_address } from "../../config";
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndividualTaskCard from "../../components/individualTaskCard";
import GroupRatingListCard from "../../components/groupRatingListCard";
import GroupTaskCard from "../../components/groupTaskCard";
import CheckTaskCard from "../../components/checkTaskCard";





export default function AdminTasksScreen(){


  const [index, setIndex] = useState(0);
  const layout = useWindowDimensions();

  const {navigate} = useNavigation()

  const [routes] = useState([
    { key: 'first', title: 'Все задания' },
    { key: 'second', title: 'Проверка' }      
  ]);
  const [userData, setUserData] = useState([])

  

  const getAllDataForSchool=()=>{
      try {
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
         
          var raw = JSON.stringify({
             
          });
          var requestOptions = {
            method: 'GET',
            headers: myHeaders,
           
            redirect: 'follow'
          };
          
          fetch(ip_address+'/getAllUsersData', requestOptions)
            .then( response => response.json())
            .then( result => {
              setUserData(result)
          })
            .catch(error => console.log('error', error));
      } catch (error) {
        console.error(error);
      }
  }
 
  useFocusEffect(
      useCallback(()=>{
      getAllDataForSchool()
  },[]))

  const  ByGroups =  () => {
    const [groupTasksData, setGroupTasksData] = useState([])
    const [individualTasksData, setIndividualTasksData] = useState([])

    const getAllIndividualTasksData = () => {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
           
            var requestOptions = {
              method: 'GET',
              headers: myHeaders,
              redirect: 'follow'
            };
            
            fetch(ip_address+'/getAllIndividualTasksData', requestOptions)
              .then( response => response.json())
              .then( result => {
                setIndividualTasksData(result)
            })
              .catch(error => console.log('error', error));
        } catch (error) {
          console.error(error);
        }
    }

    const getAllIGroupTasksData = () => {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
           
            
            var requestOptions = {
              method: 'GET',
              headers: myHeaders,
              redirect: 'follow'
            };
            
            fetch(ip_address+'/getAllIGroupTasksData', requestOptions)
              .then( response => response.json())
              .then( result => {
                setGroupTasksData(result)
            })
              .catch(error => console.log('error', error));
        } catch (error) {
          console.error(error);
        }
    }


    useFocusEffect(useCallback(()=>{
          getAllIndividualTasksData()
          getAllIGroupTasksData()
    },[]))
    
    return(
        <View>
           <FlatList
                data={groupTasksData}
                horizontal={true}        
                renderItem={({item})=> (
                  <GroupTaskCard id = {item.id} name = {item.name}  description = {item.description} date_of_creation = {item.date_of_creation} date_of_deadline = {item.date_of_deadline} point = {item.point} track = {item.track} image = {item.image} />
                )}
                // ItemSeparatorComponent={() => {
                //   return (<View style={styles.itemseparator}/>);}}
                />

            <FlatList
                data={individualTasksData}
                vertical={true}        
                renderItem={({item})=> (
                  <IndividualTaskCard id = {item.id} name = {item.name}  description = {item.description} date_of_creation = {item.date_of_creation} date_of_deadline = {item.date_of_deadline} point = {item.point} track = {item.track} image = {item.image} />
                )}
                // ItemSeparatorComponent={() => {
                //   return (<View style={styles.itemseparator}/>);}}
                />
                 <TouchableOpacity onPress={()=>{navigate('Создать задание')}}>
                  <Text>
                    создать индивидуальное задание
                  </Text>
                </TouchableOpacity>
        </View>
    )


      }


      const  School =  () => {

        const [allIndividualTasksForCheck,  setAllIndividualTasksForCheck] = useState([])

        const getAllIndividualTasksForCheck = () =>{
          try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
           
            
            var requestOptions = {
              method: 'GET',
              headers: myHeaders,
              redirect: 'follow'
            };
            
            fetch(ip_address+'/getAllTasksForCheck', requestOptions)
              .then( response => response.json())
              .then( result => {
                setAllIndividualTasksForCheck(result)
            })
              .catch(error => console.log('error', error));
        } catch (error) {
          console.error(error);
        }
        }

        useFocusEffect(useCallback(()=>{
          getAllIndividualTasksForCheck()
        },[]))
              
      return(
          <View>
              <Text>
              Общешкольный
              </Text>
              <FlatList
              data={allIndividualTasksForCheck}
              vertical={true}        
              renderItem={({item})=> (
                <CheckTaskCard id = {item.id} name = {item.name}   point = {item.point} track = {item.track} student = {item.student} image = {item.image} />
              )}
              // ItemSeparatorComponent={() => {
              //   return (<View style={styles.itemseparator}/>);}}
              />
             
          </View>
      )
      }


      const renderScene = SceneMap({
          first: ByGroups,
          second: School,
         
        });
      
        const renderTabBar = props => (
        
          <TabBar
          
            {...props}
            indicatorStyle={{ backgroundColor: 'green'}}
               
               
               renderLabel={({ route}) => (
                <Text style={{ fontSize:wp(3.2), margin: 8, fontWeight: "bold" }}>
                  {route.title}
                </Text>
              )}
          />
        );
        return(
            
          <TabView
          renderTabBar={renderTabBar}
          style={{backgroundColor:'white'}}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />    
        
        )


    



}