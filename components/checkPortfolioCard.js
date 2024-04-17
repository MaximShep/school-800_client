import { useEffect, useState } from "react"
import { TextInput, TouchableOpacity, View, Text } from "react-native"
import { ip_address } from "../config"



export default function CheckPortfolioCard(props){

const { id, fio, classe, avatar, nameofkonkurs, level, place, photo} = props

const [score, setScore] = useState(0)

const setScorePortfolio = () => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
       
        var raw = JSON.stringify({
           "id" : id,
           "score": score
        });
        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch(ip_address+'/setPortfolioScore', requestOptions)
          .then( response => response.json())
          .then( result => {
        })
          .catch(error => console.log('error', error));
    } catch (error) {
      console.error(error);
    }
}



const deletePortfolio = () => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
       
        var raw = JSON.stringify({
           "id" : id
        });
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch(ip_address+'/deletePortfolio', requestOptions)
          .then( response => response.json())
          .then( result => {
        })
          .catch(error => console.log('error', error));
    } catch (error) {
      console.error(error);
    }
}


return (
    <View>
        <Text>
            {fio}
        </Text>
        <Text>
            {classe}
        </Text>
        <Text>
            {avatar}
        </Text>
        <Text>
            {nameofkonkurs}
        </Text>
        <Text>
            {level}
        </Text>
        <Text>
            {place}
        </Text>
        <Text>
            {photo}
        </Text>
        <TextInput
             defaultValue='балл'
             onChangeText={setScore}
             value={score}
             multiline = {true}
            />
        <TouchableOpacity onPress={()=>{setScorePortfolio()}}>
            <Text>
                Принять
            </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{deletePortfolio()}}>
            <Text>
                удалить
            </Text>
            </TouchableOpacity>
    </View>
)

}