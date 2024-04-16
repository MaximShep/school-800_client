import { useEffect } from "react"
import { View, Text } from "react-native"
import ip_address from "../config"


export default function IndividualRatingListItem(props){

    const {fio, points,grp } = props
    const [grp_image, setgrp_Image] = useState("")

    const getImageOfGroup=()=>{
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
           
            var raw = JSON.stringify({
               "grp_id" : grp,
            });
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            
            fetch(ip_address+'/getImageOfGroup', requestOptions)
              .then( response => response.json())
              .then( result => {
                console.log(result)
                setgrp_Image(result)
            })
              .catch(error => console.log('error', error));
        } catch (error) {
          console.error(error);
        }
    }

    useEffect(()=>{
        getImageOfGroup()
    },[])


    return(

        <View>
            <Text>
               {fio}
            </Text>
            <Text>
                {points} баллов 
            </Text>
            <Text>
               {grp_image} 
            </Text>
        </View>

    )




}