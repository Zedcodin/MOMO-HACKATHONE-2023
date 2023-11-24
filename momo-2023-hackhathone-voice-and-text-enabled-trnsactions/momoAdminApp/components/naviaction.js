import { createStackNavigator } from "@react-navigation/stack"
import MomoOrdersIndex from "../views/MomoOrdersIndex"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MomoColors from "../constants/colors"
import { View } from "react-native"
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
//import MomoOrdersIndex from "../views/MomoOrdersIndex"



export function StackNavigation(){
    const Stack = createStackNavigator()
    return(
        <Stack.Navigator
         screenOptions={{
            headerShown:false
         }}
        
        >
            <Stack.Screen name="home" component={BottomNavigator} />
        </Stack.Navigator>

    )
}

export function BottomNavigator({navigation}) {
 


    const Tab = createBottomTabNavigator()
    return (
      <Tab.Navigator
  
        screenOptions={{
  
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: MomoColors.black,
          tabBarStyle: { backgroundColor: 'red' },
          tabBarActiveBackgroundColor: MomoColors.primary,
          tabBarInactiveTintColor: 'white',
          tabBarShowLabel: false,
          tabBarBackground: () => (
            <View style={{ width: "100%", backgroundColor:MomoColors.primary, height: '100%' }} />
          ),
  
          headerShown: false,
          tabBarStyle: { height: 60,borderTopWidth:0,borderColor:MomoColors.primary,elevation:0 }
          
        }}
  
  
      >
        <Tab.Screen
          name='Shop'
          options={{ tabBarIcon: ({ color }) => <MaterialCommunityIcons name='home' size={40} color={color} /> }}
  
          
  
          component={MomoOrdersIndex} />
  
  
  <Tab.Screen
          name='localmall'
          options={{ tabBarIcon: ({ color }) => <MaterialCommunityIcons name='headset' size={45} color={color} /> }}
  
          component={MomoOrdersIndex} />
  
        <Tab.Screen
          name='support1'
          options={{ tabBarIcon: ({ color }) => <MaterialCommunityIcons name='bell' size={40} color={color} /> }}
  
          component={MomoOrdersIndex} />
  
  
        <Tab.Screen
          name='Shop2w'
          options={{ tabBarIcon: ({ color }) => <MaterialCommunityIcons name='account' size={40} color={color} /> }}
  
          component={MomoOrdersIndex} />
  
  
      </Tab.Navigator>
    )
  }
  
  