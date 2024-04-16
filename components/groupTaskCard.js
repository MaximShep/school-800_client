import { useEffect, useState } from "react"
import { Text, TouchableOpacity } from "react-native"
import ip_address from "../config"
import { useNavigation } from "@react-navigation/core"


export default function GroupTaskCard(props){

    const {id, name, description, date_of_creation, date_of_deadline, point, track, image } = props
    const {navigate} = useNavigation()


    useEffect(()=>{
    },[])

    return(

        <TouchableOpacity
        onPress={()=>{
           navigate('Карточка задания');
           global.task_id = id;
           global.task_name = name;
           global.task_description = description;
           global.task_date_of_creation = date_of_creation;
           global.task_date_of_deadline = date_of_deadline;
           global.task_point = point;
           global.task_image = image
           }}>
            <Text>
               {name}
            </Text>
            <Text>
                {point} баллов 
            </Text>
            <Text>
                {image}
            </Text>
        </TouchableOpacity>

    )




}