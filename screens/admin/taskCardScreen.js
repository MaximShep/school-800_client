
import { Text, View } from "react-native";





export default function taskCardScreen(){
   
    global.task_id = id;
    global.task_name = name;
    global.task_description = description;
    global.task_date_of_creation = date_of_creation;
    global.task_date_of_deadline = date_of_deadline;
    global.task_point = point;
    global.task_track_name = trackName
    return(
        <View>
            <Text>
            { global.task_id}
            </Text>
            <Text>
            {  global.task_name}
            </Text>
            <Text>
            { global.task_description}
            </Text>
            <Text>
            { global.task_date_of_creation}
            </Text>
            <Text>
            { global.task_date_of_deadline}
            </Text>
            <Text>
            { global.task_point}
            </Text>
            <Text>
            { global.task_track_name}
            </Text>
            <Text>
            { global.task_image}
            </Text>
        </View>
    )



}