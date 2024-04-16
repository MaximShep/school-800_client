import { useEffect } from "react"
import { View, Text, FlatList } from "react-native"
import ip_address from "../config"
import RatingListItem from "";
import GroupRatingListItem from "./groupRatingListItem";


export default function GroupRatingListCard(props){

    const { grp, name } = props

    const [rawdata, setData] = useState([])

    const getRawRating = ()=>{
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
           
            var raw = JSON.stringify({
               grp: grp
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
                setData(result)
            })
              .catch(error => console.log('error', error));
        } catch (error) {
          console.error(error);
        }
    }

   


    useEffect(()=>{
      getRawRating()
    },[])


    return(

        <View>
          <View>
            <Text>
           {name} 
          </Text>
          <Text>
           кол-во баллов у первого места 
          </Text>
          </View>
          
          <View>
          <FlatList
                data={rawdata}
                vertical={true}        
                renderItem={({item})=> (
                  <GroupRatingListItem fio = {item.fio} points = {item.individual_points + item.group_points} />
                )}
                // ItemSeparatorComponent={() => {
                //   return (<View style={styles.itemseparator}/>);}}
                />
          </View>


        </View>

    )




}