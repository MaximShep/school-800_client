import { useFocusEffect, useNavigation } from '@react-navigation/core';
import React, {useCallback, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { ip_address } from '../../config';


  

export default function UserProfileScreen(){
   
    const {navigate} = useNavigation()

    const [corpusName, setCorpusName] = useState("");
    const [points, setPoints] = useState(0)
    const [dataByTrack, setDataByTrack] = useState([])

    const getCorpus = ()=>{
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
           
            var raw = JSON.stringify({
                corpus_id: global.corpus
            });
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            
            fetch(ip_address+'/getCorpusName', requestOptions)
              .then( response => response.json())
              .then( result => {
                setCorpusName(result)
            })
              .catch(error => console.log('error', error));
        } catch (error) {
          console.error(error);
        }
    }

    const getPoints = () => {

        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
           
            var raw = JSON.stringify({
                id: global.user_id
            });
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            
            fetch(ip_address+'/getUserData', requestOptions)
              .then( response => response.json())
              .then( result => {
                setPoints(result.individual_points + result.group_points)

            })
              .catch(error => console.log('error', error));
        } catch (error) {
          console.error(error);
        }

    }

    const getDataByTrack = () => {
        //getAllStatisticsForUser
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
           
            var raw = JSON.stringify({
                user_id: global.user_id
            });
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            
            fetch(ip_address+'/getAllStatisticsForUser', requestOptions)
              .then( response => response.json())
              .then( result => {
                setDataByTrack(result)
            })
              .catch(error => console.log('error', error));
        } catch (error) {
          console.error(error);
        }

    }

    useFocusEffect(useCallback(()=>{
        getCorpus()
        getPoints()
        getDataByTrack()
    },[]))

    const DirectionItem = ({ direction, progress, tasksCompleted, color }) => {
        return (
          <View style={styles.directionItem}>
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { width: `${(progress * 100) + 10}%`, backgroundColor: color }]} />
              <Text style={styles.directionTitle}>{direction}</Text>
            </View>
            <Text style={styles.tasksCompletedText}>{tasksCompleted}</Text>
          </View>
        );
      };
    
    return(
        <View style={styles.container}>
            <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.name}>{global.user_fio}</Text>
          <Text style={styles.points}>{points}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.detailsContainer}>
          <View style={styles.column}>
            <Text style={styles.label}>Корпус</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.info}>{corpusName}</Text>
            </View>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Класс</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.info}>{global.user_class}</Text>
            </View>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.directionsContainer}>
          <Text style={styles.directionsLabel}>Направления</Text>
          <View style={styles.directionsColumn}>
          <FlatList
                data={dataByTrack}
                vertical={true}        
                renderItem={({item})=> (
                    <DirectionItem direction = {item.name} progress={item.progress} tasksCompleted={item.completed_tasks} color="#EE7527" />                )}
                // ItemSeparatorComponent={() => {
                //   return (<View style={styles.itemseparator}/>);}}
                />
          </View>
        </View>
        <View style={styles.separator} />
        <TouchableOpacity style={styles.addButton} onPress={()=>{navigate('Добавить портфолио')}}>
          <Text style={styles.addButtonText}>Добавить достижение</Text>
        </TouchableOpacity>
      </View>
        </View>
    )



}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  points: {
    fontSize: 18,
  },
  separator: {
    width: '80%',
    height: 1,
    backgroundColor: 'black',
    marginVertical: 20,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  column: {
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    borderRadius: 5,
  },
  info: {
    fontSize: 16,
  },
  directionsContainer: {
    marginTop: 20,
    marginBottom: 20,
    width: '80%',
  },
  directionsColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  directionsLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  directionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
  },
  progressContainer: {
    flex: 1,
    position: 'relative',
  },
  progressBar: {
    height: 40,
    borderRadius: 5,
  },
  directionTitle: {
    position: 'absolute',
    textAlign: 'center',
    lineHeight: 40,
    fontSize: 16,
    color: '#000',
    zIndex: 1,
    width: '100%',
  },
  tasksCompletedText: {
    fontSize: 16,
  },
  addButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  bottomNavItem: {
    width: 50,
    height: 50,
    backgroundColor: 'lightblue',
    borderRadius: 25,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

