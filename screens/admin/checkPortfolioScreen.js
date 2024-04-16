import { useFocusEffect } from "@react-navigation/core";
import { useCallback } from "react";
import { FlatList } from "react-native";



export default function checkPortfolioScreen(){

    const [data, setData] = useState([])

    const getData = () => {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
           
           
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              redirect: 'follow'
            };
            
            fetch(ip_address+'/getAllTasksForCheck', requestOptions)
              .then( response => response.json())
              .then( result => {
                setData(result)
            })
              .catch(error => console.log('error', error));
        } catch (error) {
          console.error(error);
        }
    }
    
    useFocusEffect(useCallback(()=>{
        getData()
    }))

    return(
        <View>
            
            <FlatList
               data={data}
               vertical={true}        
               renderItem={({item})=> (
               
                 <checkPortfolioCard 
                 id = {item.id} 
                 name = {item.fio}  
                 description = {item.class} 
                 avatar = {item.avatar} 
                 nameofkonkurs = {item.nameofkonkurs} 
                 level = {item.level} 
                 place = {item.place} 
                 photo = {item.photo} />
               )}
               // ItemSeparatorComponent={() => {
               //   return (<View style={styles.itemseparator}/>);}}
            />
        </View>
    )

}