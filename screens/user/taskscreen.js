import { useFocusEffect } from "@react-navigation/core";
import { useCallback,useState } from "react";
import { FlatList, Text, View } from "react-native";
import { ip_address } from "../../config";
import GroupTaskCard from "../../components/groupTaskCard";
import IndividualTaskCard from "../../components/individualTaskCard";





export default function UserTasksScreen(){

    const [groupTasksData, setGroupTasksData] = useState([])
    const [individualTasksData, setIndividualTasksData] = useState([])

    const getIndividualTaskData = () => {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
           
            var raw = JSON.stringify({
                user_id: global.user_id
            });
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            
            fetch(ip_address+'/getAllIndividualTasks', requestOptions)
              .then( response => response.json())
              .then( result => {
                setIndividualTasksData(result)
            })
              .catch(error => console.log('error', error));
        } catch (error) {
          console.error(error);
        }
    }

    const getGroupTaskData = () => {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
           
            var raw = JSON.stringify({
               grp: global.user_grp
            });
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            
            fetch(ip_address+'/getAllUsersDataByGrp', requestOptions)
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
        getIndividualTaskData()
        getGroupTaskData()
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
        </View>
    )



}