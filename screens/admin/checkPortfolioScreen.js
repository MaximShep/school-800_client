import { useFocusEffect } from "@react-navigation/core";
import { useCallback, useState, useEffect } from "react";
import { FlatList, View, Text } from "react-native";
import CheckPortfolioCard from "../../components/checkPortfolioCard";
import { ip_address } from "../../config";


export default function checkPortfolioScreen(){

    const [data, setData] = useState([])

    const getData = () => {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
           
           
            var requestOptions = {
              method: 'GET',
              headers: myHeaders,
              redirect: 'follow'
            };
            
            fetch(ip_address+'/getAllPortfolioForCheck', requestOptions)
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
      getData()

    },[])

    return(
        <View>
            
            <FlatList
               data={data}
               vertical={true}        
               renderItem={({item})=> (
               
                 <CheckPortfolioCard 
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