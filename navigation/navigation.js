import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//import LoginScreen from '../screens/loginscreen';


import UserProfileScreen from '../screens/user/profile';
import UserRatingScreen from '../screens/user/ratingscreen';
import UserTasksScreen from '../screens/user/taskscreen';
import CreatePortfolioScreen from '../screens/user/addAchievment';

//Admin


const Login_Stack = createNativeStackNavigator()
const MainScreen_Stack = createBottomTabNavigator()
const USerProfile_Stack = createNativeStackNavigator()




function UserProfileNavigator(){
    return(
    
        <USerProfile_Stack.Navigator>
            <USerProfile_Stack.Screen name="ee" options={{headerShown: false}} component={UserProfileScreen}/>
            <USerProfile_Stack.Screen name="Добавить портфолио"  options={{headerShown: false}} component={CreatePortfolioScreen}/>
         </USerProfile_Stack.Navigator>
      )
}


function UserMainScreenNavigator(){

    return(
    
        <MainScreen_Stack.Navigator>
            <MainScreen_Stack.Screen name="Задания" options={{headerShown: false}} component={UserTasksScreen}/>
            <MainScreen_Stack.Screen name="Рейтинг"  options={{headerShown: false}} component={UserRatingScreen}/>
            <MainScreen_Stack.Screen name="Профиль" options={{headerShown: false}} component={UserProfileNavigator}/>
         </MainScreen_Stack.Navigator>
      )
 //User
 if(global.role === 1){
  return(
    
    <MainScreen_Stack.Navigator>
        <MainScreen_Stack.Screen name="Задания" options={{headerShown: false}} component={UserTasksScreen}/>
        <MainScreen_Stack.Screen name="Рейтинг"  options={{headerShown: false}} component={UserRatingScreen}/>
        <MainScreen_Stack.Screen name="Профиль" options={{headerShown: false}} component={UserProfileScreen}/>
     </MainScreen_Stack.Navigator>
  )
 }

 //Admin
 if(global.role === 2){
  
 }

 
}

function Login_StackNavigator(){

  
    return(
    
        <MainScreen_Stack.Navigator>
            <MainScreen_Stack.Screen name="Задания" options={{headerShown: false}} component={UserTasksScreen}/>
            <MainScreen_Stack.Screen name="Рейтинг"  options={{headerShown: false}} component={UserRatingScreen}/>
            <MainScreen_Stack.Screen name="Профиль" options={{headerShown: false}} component={UserProfileNavigator}/>
         </MainScreen_Stack.Navigator>
      )
  
  
}


export default function AppNavigation(){
    return(
       
        <NavigationContainer>
           <Login_StackNavigator/>
        </NavigationContainer>
       
    )
}