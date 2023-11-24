import { View, Text } from 'react-native'
import React ,{useState,useEffect}from 'react'
import MomoColors from '../constants/colors'
import { StatusBar } from 'expo-status-bar'
import { OrderCard } from '../components/cards'
import colors from '../../satanableagriadivisor/components/constsants/colors'
import { FlatList } from 'react-native'
import { collection, onSnapshot , addDoc, deleteDoc, doc ,getDocs ,orderBy, query} from 'firebase/firestore'
import { firebaseDb } from '../firebase/firbaseconfig'

const ordersData = [
    {id:1,fname:'joshua',lname:'simwawa',orderTotal:200,item:"piza"},
    {id:2,fname:'joshua',lname:'simwawa',orderTotal:200,item:"piza"},
    {id:3,fname:'joshua',lname:'simwawa',orderTotal:200,item:"piza"},
    {id:4,fname:'joshua',lname:'simwawa',orderTotal:200,item:"piza"},
    {id:5,fname:'joshua',lname:'simwawa',orderTotal:200,item:"piza"},
    {id:6,fname:'joshua',lname:'simwawa',orderTotal:200,item:"piza"},
    {id:7,fname:'joshua',lname:'simwawa',orderTotal:200,item:"piza"},



]

const MomoOrdersIndex = () => {
    const [orders,setOrder] = useState([])
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const unsubscribe = fetchOrders();

    return () => {
      // Clean up the subscription when the component unmounts
      unsubscribe();
    };
  }, []);

  const fetchOrders = () => {
    try {
      const getOrderCollection = collection(firebaseDb, 'orders');
      const orderedQuery = query(getOrderCollection, orderBy('timestamp', 'desc'));

      const unsubscribe = onSnapshot(orderedQuery, (snapshot) => {
        const newOrders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrder(newOrders);
        console.log(newOrders);
      });

      return unsubscribe;
    } catch (error) {
      // Handle the error here
      console.error('Error fetching orders:', error);
    }
  };


  const formattedData = orders.map((item) => {
    const firestoreTimestamp = item.timestamp;
    const dateObject = firestoreTimestamp.toDate();
    
    // Format the time to hh:mm AM/PM
    const hours = dateObject.getHours() % 12 || 12;
    const minutes = dateObject.getMinutes();
    const amPm = dateObject.getHours() < 12 ? 'AM' : 'PM';
    const timeString = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${amPm}`;

    return {
      ...item,
      formattedTime: timeString
    };
  });


  console.log(formattedData)



  let totalSubtotal = orders.reduce((acc, item) => acc + item.subTotal, 0);

  let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so add 1
let currentDay = currentDate.getDate();
let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let dayOfWeek = daysOfWeek[currentDate.getDay()];
let month = months[currentDate.getMonth()];
  return (
    <View style={{flex:1,backgroundColor:MomoColors.white,paddingBottom:10}}>
        <StatusBar backgroundColor={MomoColors.primary} style='light' />
        <View style={{backgroundColor:MomoColors.primary,height:80,justifyContent:'space-around',alignItems:"center"}}>
            <Text style ={{fontSize:20,color:MomoColors.white,fontWeight:'bold'}}>Todays Orders</Text>
        </View>
    <View style={{width:"100%",justifyContent:'center',alignItems:'center'}}>
        <View style={{backgroundColor:MomoColors.green,width:'85%',elevation:10,height:150,marginVertical:20,borderRadius:10,padding:20}}>
            <Text style={{fontSize:23,marginVertical:5,fontWeight:'bold',color:MomoColors.white}}>Todays Order Total</Text>
            <Text style={{fontSize:20,marginVertical:5,fontWeight:'bold',color:MomoColors.white}}>k{totalSubtotal }</Text>
            <Text style={{fontSize:20,marginVertical:5,fontWeight:'bold',color:MomoColors.white,fontStyle:'italic'}}>{ dayOfWeek + " "+ currentDay + "-" + month + "-" + currentYear}</Text>


        </View>
    
    </View>    
        <FlatList 
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={formattedData}
        style={{width:"100%"}}
        renderItem={({item})=>(
        <View style={{width:"100%",justifyContent:"center",alignItems:"center"}}>
        <OrderCard timestamp = {item.formattedTime} fname ={item.fname} phone={item.phone} subTotal = {item.subTotal} size = {item.size} />

        </View>    


        )}
        />
      
    </View>
  )
}

export default MomoOrdersIndex