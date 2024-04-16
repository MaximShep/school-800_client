import { View, Text } from "react-native"


export default function GroupRatingListItem(props){

    const {fio, points } = props

   


    return(

        <View>
            <Text>
               {fio}
            </Text>
            <Text>
                {points} баллов 
            </Text>
           
        </View>

    )




}