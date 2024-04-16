import { useState } from "react"
import { Text, TextInput, Image, View, StyleSheet,FlatList, TouchableOpacity  } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { ip_address } from "../../config";
import { useNavigation } from "@react-navigation/core";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { Dropdown } from 'react-native-element-dropdown';






export default function CreatePortfolioScreen() {

    const {navigate} = useNavigation()
    const navigation = useNavigation()

    const [name, setName] = useState('')
    const [level, setLevel] = useState('')
    const [place, setPlace] = useState('')
    const [track, setTrack] = useState(1)
    const [image, setImage] = useState('')

    const data_level = [
  
        {value:1,label:"Городской"},
        {value:2,label:"Региональный"},
        {value:3,label:"Межрегиональный"},
        {value:4,label:"Всероссийский"},
        {value:5,label:"международный"}
      
      ]

      const data_Place = [
  
        {value:1,label:"1 место"},
        {value:2,label:"2 место"},
        {value:3, label:"3 место"}
      
      ]

      const data_track = [
  
        {value:1,label:"Видеонаблюдение"},
        {value:2, label:"Cигнализация"}
      
      ]


      const DropdownLevelComponent = (props) => {
    
        const {sub} = props
    
        const renderItem = item => {
          return (
            <View style={styles.item}>
              <Text style={styles.textItem}>{item.label}</Text>
            </View>
          );
        };
    
        return (
          <Dropdown
            style={{ width:widthPercentageToDP(41)
            }}
            placeholderStyle={styles.componentViewText}
            selectedTextStyle={styles.componentViewText}
            iconStyle={{backgroundColor:'#fff'}}
            data={data_level}
            
            maxHeight={400}
            labelField="label"
            valueField="value"
            placeholder={sub}
            value={level}
            onChange={item => {setLevel(item.label);}}
            renderItem={renderItem}
          />
        );
      };

      const DropdownPlaceComponent = (props) => {
    
        const {sub} = props
    
        const renderItem = item => {
          return (
            <View style={styles.item}>
              <Text style={styles.textItem}>{item.label}</Text>
            </View>
          );
        };
    
        return (
          <Dropdown
            style={{ width:widthPercentageToDP(41)
            }}
            placeholderStyle={styles.componentViewText}
            selectedTextStyle={styles.componentViewText}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={{backgroundColor:'#fff'}}
            data={data_Place}
            
            maxHeight={400}
            labelField="label"
            valueField="value"
            placeholder={sub}
            value={place}
            onChange={item => {setPlace(item.label);}}
            renderItem={renderItem}
          />
        );
      };

      const DropdownTrackComponent = (props) => {
    
        const {sub} = props
    
        const renderItem = item => {
          return (
            <View style={styles.item}>
              <Text style={styles.textItem}>{item.label}</Text>
              
            </View>
          );
        };
    
        return (
          <Dropdown
            style={{ width:widthPercentageToDP(41)
            }}
            placeholderStyle={styles.componentViewText}
            selectedTextStyle={styles.componentViewText}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={{backgroundColor:'#fff'}}
            data={data_track}
            maxHeight={400}
            labelField="label"
            valueField="value"
            placeholder={sub}
            value={track}
            onChange={item => {setTrack(item.value);}}
            renderItem={renderItem}
          />
        );
      };

    const addPortfolio = () =>{
        if(name != "" && level != "" && place != "" && image != ""){
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
        
            var raw = JSON.stringify({
                user: global.user_id,
                name: name,
                level: level,
                place: place,
                track:track,
                image:image
            });
            
        
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
             
            };
           
            fetch(ip_address + '/createPortfolio', requestOptions)
              .then(response => response.json())
              .then(result => { console.log(result)})
              .catch(error => console.log('error', error));
                navigation.goBack()
        
        }
        
        
       
    }

    
    const addImage = async (base64) => { setImage({"base64": base64[0].base64})}


    const openGallery = () => {
        
        launchImageLibrary({
            mediaType: 'photo',
            includeBase64: true,
            quality: 0.01
           },response => {
            if(response.didCancel){
                    console.log("отмена")
            } 
            else if( response.errorCode) {
                console.log("ошибка")
            }
            else {
                addImage(response.assets)
            }
        })
    }

    return (
        <View >
             
            <Text >
                Наименование мероприятия
            </Text>
            <TextInput
             defaultValue='Введите название'
             style={styles.textinput}
             onChangeText={setName}
             value={name}
             multiline = {true}
            />

            <Text>
                уровень мероприятия
            </Text>
            <DropdownLevelComponent/>
          
            <Text>
                Направление
            </Text> 
            <DropdownTrackComponent/>

            <Text>
                Место
            </Text> 
            <DropdownPlaceComponent/>
            
            <TouchableOpacity onPress={()=>{openGallery()}}>
            <Text style={styles.photoHead}>
                Добавить фото
            </Text>
            </TouchableOpacity>
            <FlatList
            data={image}
            extraData={image}
            horizontal={true}        
            renderItem={({item,index})=> (           
                                  <Image id={index} style={{width: 120, height: 120}} source={{uri: `data:image/jpeg;base64,${item.base64}`}} />
           
            )}
            />
          
            
            <TouchableOpacity style={{justifyContent:'center',alignItems:'center', top:heightPercentageToDP(-1)}}onPress={()=>{addPortfolio()}}>
              
                <Text>
                    Отправить на модерацию
                </Text>
               
            </TouchableOpacity>
           
          
        </View>
    )


}
const styles = StyleSheet.create({
    container:{
        width: '100%', height: '100%',
    },
    head:{
        fontFamily:'Black',
        fontSize:heightPercentageToDP(3.7),
        width:widthPercentageToDP(80),
        left:widthPercentageToDP(2),
        top:heightPercentageToDP(-0.9),
        lineHeight:heightPercentageToDP(3.7)
    },
    tegs:{
        fontFamily:'ExtraBold',
        fontSize:heightPercentageToDP(1.6),
        left:widthPercentageToDP(2),
        top:heightPercentageToDP(1.8)
    },
    tegsList:{
        left:widthPercentageToDP(2),
        top:heightPercentageToDP(21.5),
        width:widthPercentageToDP(100),
        position:'absolute',
    },
    stop:{
        top:heightPercentageToDP(-3.8),
        borderBottomEndRadius:heightPercentageToDP(1.8),borderBottomStartRadius:heightPercentageToDP(1.8),borderTopEndRadius:heightPercentageToDP(1.8),
        borderTopStartRadius:heightPercentageToDP(1.8),
        borderWidth:2,
        
        left:widthPercentageToDP(66),
        width:widthPercentageToDP(31),
        height:heightPercentageToDP(4.7),
        
        justifyContent:'center',
        alignItems:'center'
    },
    stopText:{
        fontFamily:'Bold',
        fontSize:heightPercentageToDP(1.8),
        letterSpacing:heightPercentageToDP(-0.1),
    },
    buttonBack:{
        left:widthPercentageToDP(2),
        top:heightPercentageToDP(0.7),
        height:heightPercentageToDP(4.7),
        width:heightPercentageToDP(4.7),
    },
    tegsText:{
        fontFamily:'Bold',
        fontSize:heightPercentageToDP(1.4),
        top:heightPercentageToDP(9),
        left:widthPercentageToDP(2),
        letterSpacing:heightPercentageToDP(-0.07),
    },
    pleceHead:{
        fontFamily:'ExtraBold',
        fontSize:heightPercentageToDP(1.6),
        left:widthPercentageToDP(2),
        top:heightPercentageToDP(50)
    },
    placeList:{
        left:widthPercentageToDP(2),
        top:heightPercentageToDP(0),
    },
    descriptionText:{
        fontFamily:'ExtraBold',
        fontSize:heightPercentageToDP(1.6),
        left:widthPercentageToDP(2),
       top:heightPercentageToDP(9)
    },
    descrription:{
        width:widthPercentageToDP(96),
        height:heightPercentageToDP(23),
        left:widthPercentageToDP(2),
        borderRadius:heightPercentageToDP(2),
        fontFamily:'SemiBold',
        fontSize:heightPercentageToDP(1.5),
        paddingVertical:heightPercentageToDP(2),
        paddingHorizontal:widthPercentageToDP(3),
        top:heightPercentageToDP(10)
    }, 
    photoHead:{
        fontFamily:'ExtraBold',
        fontSize:heightPercentageToDP(1.6),
        left:widthPercentageToDP(2),
        top:heightPercentageToDP(12.5)
    },
    plus:{
        width:widthPercentageToDP(5),
        height:widthPercentageToDP(5),
        top:heightPercentageToDP(10.5),
        left:widthPercentageToDP(93)
    },
    readyText:{
        fontFamily:'Bold',
        position:'absolute',
        fontSize:heightPercentageToDP(1.8),
        left:widthPercentageToDP(31),
        letterSpacing:-1
    },
    buttonReady:{
        width:widthPercentageToDP(102),
        height:heightPercentageToDP(7)
    }
});