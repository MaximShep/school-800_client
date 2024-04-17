import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//import LoginScreen from '../screens/loginscreen';


import UserProfileScreen from '../screens/user/profile';
import UserRatingScreen from '../screens/user/ratingscreen';
import UserTasksScreen from '../screens/user/taskscreen';
import CreatePortfolioScreen from '../screens/user/addAchievment';
import AdminTasksScreen from '../screens/admin/taskscreen';
import checkPortfolioScreen from '../screens/admin/checkPortfolioScreen';
import LoginScreen from '../screens/loginscreen';
import createIndividualTask from '../screens/admin/addTask';

//Admin


const Login_Stack = createNativeStackNavigator()
const MainScreen_Stack = createBottomTabNavigator()
const USerProfile_Stack = createNativeStackNavigator()
const addTask_Stack = createNativeStackNavigator()


function addTask_Navigator(){
    return(
        <addTask_Stack.Navigator>
        <addTask_Stack.Screen name="ee" options={{headerShown: false}} component={AdminTasksScreen}/>
        <addTask_Stack.Screen name="Создать задание"  options={{headerShown: false}} component={createIndividualTask}/>
     </addTask_Stack.Navigator>
    )
}


function UserProfileNavigator(){
    return(
    
        <USerProfile_Stack.Navigator>
            <USerProfile_Stack.Screen name="ee" options={{headerShown: false}} component={UserProfileScreen}/>
            <USerProfile_Stack.Screen name="Добавить портфолио"  options={{headerShown: false}} component={CreatePortfolioScreen}/>
         </USerProfile_Stack.Navigator>
      )
}


function UserMainScreenNavigator(){

    
 //User
 if(global.role === 1){
  return(
    
    <MainScreen_Stack.Navigator>
            <MainScreen_Stack.Screen name="Задания" options={{headerShown: false}} component={UserTasksScreen}/>
            <MainScreen_Stack.Screen name="Рейтинг"  options={{headerShown: false}} component={UserRatingScreen}/>
            <MainScreen_Stack.Screen name="Профиль" options={{headerShown: false}} component={UserProfileNavigator}/>
         </MainScreen_Stack.Navigator>
  )
 }

 //Admin
 if(global.role === 2){
    return(
    <MainScreen_Stack.Navigator>
    <MainScreen_Stack.Screen name="Задания" options={{headerShown: false}} component={addTask_Navigator}/>
    <MainScreen_Stack.Screen name="Рейтинг"  options={{headerShown: false}} component={UserRatingScreen}/>
    <MainScreen_Stack.Screen name="Чек"  options={{headerShown: false}} component={checkPortfolioScreen}/>
    <MainScreen_Stack.Screen name="Профиль" options={{headerShown: false}} component={UserProfileNavigator}/>
 </MainScreen_Stack.Navigator>
 )
}

 
}

function Login_StackNavigator(){

  
    return(
    
        <Login_Stack.Navigator>
            <Login_Stack.Screen name="Авторизация" options={{headerShown: false}} component={LoginScreen}/>
            <Login_Stack.Screen name="Главный экран"  options={{headerShown: false}} component={UserMainScreenNavigator}/>
         </Login_Stack.Navigator>
      )
  
  
}


export default function AppNavigation(){
    return(
       
        <NavigationContainer>
           <Login_StackNavigator/>
        </NavigationContainer>
       
    )
}