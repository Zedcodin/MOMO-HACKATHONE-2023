import { Text } from "react-native";
import { View } from "react-native";
import MomoColors from "../constants/colors";

export function OrderCard(props){
    
    return(
        <View style={{width:"95%",height:100,backgroundColor:MomoColors.white,marginVertical:10,borderRadius:10,elevation:8,
         flexDirection:'row',justifyContent:'space-around',alignItems:'center'
        }}>
            <View >
                <Text style={{fontSize:20,fontWeight:"bold"}}>{props.fname}</Text>
            </View>
            <View>
                <Text style={{fontSize:15,fontWeight:"bold"}}>{props.phone}</Text>
                <Text style={{fontSize:15,fontWeight:"bold"}}>{props.size} Shawarma</Text>

            </View>
            <View>
                <Text style={{fontSize:15,fontWeight:"bold"}}>K{props.subTotal}</Text>
                <Text style={{fontSize:15,fontWeight:"bold",color:MomoColors.green}}>{props.timestamp}</Text>

            </View>

        </View>
    )
}