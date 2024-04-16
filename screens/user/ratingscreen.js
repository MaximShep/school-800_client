import { useFocusEffect } from "@react-navigation/core";
import { useCallback } from "react";
import { FlatList, Text, View } from "react-native";
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import GroupRatingListCard from "../../components/groupRatingListCard";
import IndividualRatingListItem from "../../components/individualRatingListItem";
import { ip_address } from "../../config";




export default function UserRatingScreen(){
   
    const [data, setData] = useState([])

    const [userData, setUserData] = useState([])

    const getAllGroups=()=>{
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
           
            var raw = JSON.stringify({
               
            });
            var requestOptions = {
              method: 'GET',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            
            fetch(ip_address+'/getAllGroups', requestOptions)
              .then( response => response.json())
              .then( result => {
                setData(result)
            })
              .catch(error => console.log('error', error));
        } catch (error) {
          console.error(error);
        }
    }

    const getAllDataForSchool=()=>{
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
           
            var raw = JSON.stringify({
               
            });
            var requestOptions = {
              method: 'GET',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            
            fetch(ip_address+'/getAllUsersData', requestOptions)
              .then( response => response.json())
              .then( result => {
                setUserData(result)
            })
              .catch(error => console.log('error', error));
        } catch (error) {
          console.error(error);
        }
    }
   
    useFocusEffect(
        useCallback(()=>{
        getAllGroups()
        getAllDataForSchool()
    },[]))

    const  ByGroups =  () => {




        return(
            <View>
                <Text>
                По факультетам
                </Text>
    
                <FlatList
                data={data}
                horizontal={true}        
                renderItem={({item})=> (
                  <GroupRatingListCard name = {item.name} grp = {item.id} />
                )}
                // ItemSeparatorComponent={() => {
                //   return (<View style={styles.itemseparator}/>);}}
                />
            </View>
        )


        }


        const  School =  () => {
                
        return(
            <View>
                <Text>
                Общешкольный
                </Text>
                <FlatList
                data={userData}
                vertical={true}        
                renderItem={({item})=> (
                  <IndividualRatingListItem fio = {item.fio} points = {item.points} grp = {item.grp}/>
                )}
                // ItemSeparatorComponent={() => {
                //   return (<View style={styles.itemseparator}/>);}}
                />
               
            </View>
        )
        }


        const renderScene = SceneMap({
            first: ByGroups,
            second: School,
           
          });
        
          const renderTabBar = props => (
          
            <TabBar
            
              {...props}
              indicatorStyle={{ backgroundColor: 'green'}}
                 
                 
                 renderLabel={({ route}) => (
                  <Text style={{ fontSize:wp(3.2), margin: 8, fontWeight: "bold" }}>
                    {route.title}
                  </Text>
                )}
            />
          );
          return(
              
            <TabView
            renderTabBar={renderTabBar}
            style={{backgroundColor:'white'}}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
          />    
          
          )

}