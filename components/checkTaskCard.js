import { useEffect, useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/core"
import { ip_address } from "../config"

export default function CheckTaskCard(props){

    const {id, name, point, track, student, image } = props
    console.log(track)
    const [trackName, setTrackName] = useState("")

    const getNameOfTrack=()=>{
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
           
            var raw = JSON.stringify({
               "id" : track,
            });
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            
            fetch(ip_address+'/getTrackName', requestOptions)
              .then( response => response.json())
              .then( result => {
                console.log(result)
                setTrackName(result[0].name)
            })
              .catch(error => console.log('error', error));
        } catch (error) {
          console.error(error);
        }
    }

    const ApproveTask = () => {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
           
            var raw = JSON.stringify({
               "task_id" : id,
               "user_id": student
            });
            var requestOptions = {
              method: 'PUT',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            
            fetch(ip_address+'/setIndividualTaskCompleted', requestOptions)
              .then( response => response.json())
              .then( result => {
            })
              .catch(error => console.log('error', error));
        } catch (error) {
          console.error(error);
        }
    }
    

    const DeleteTask = () => {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
           
            var raw = JSON.stringify({
               "task_id" : id,
            });
            var requestOptions = {
              method: 'DELETE',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            
            fetch(ip_address+'/deleteIndividualTask', requestOptions)
              .then( response => response.json())
              .then( result => {
            })
              .catch(error => console.log('error', error));
        } catch (error) {
          console.error(error);
        }
    }
    

    useEffect(()=>{
        getNameOfTrack()
    },[])

    return(

        <View>
            <Text>
               {name}
            </Text>
            <Text>
                {point} баллов 
            </Text>
            <Text>
               {trackName}
            </Text>
            <Text>
                {image}
            </Text>
            <TouchableOpacity onPress={()=>{ApproveTask()}}>
                <Text>
                    Принять
                </Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>{DeleteTask()}}>
                <Text>
                    удалить
                </Text>
            </TouchableOpacity>
        </View>

    )





}