import { useEffect, useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import ip_address from "../config"
import { useNavigation } from "@react-navigation/core"


export default function checkTaskCard(props){

    const {id, name, description, date_of_creation, date_of_deadline, point, track, image } = props
    const [trackName, setTrackName] = useState("")

    const getNameOfTrack=()=>{
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
           
            var raw = JSON.stringify({
               "track_id" : track,
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
                setTrackName(result)
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
               "track_id" : track,
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
               "track_id" : track,
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