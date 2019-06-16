import React from "react"
import translate from "../utils/language"
import {View, Text, TouchableOpacity, Alert} from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"
import moment from "moment"



class WaitingListDetails extends React.Component {

    static navigationOptions = () => ({
        title: translate("NAVIGATION_waitingListDetails")
    });

    constructor(props){
        super(props);

        this.state= {
            item : this.props.navigation.getParam("item")
        }
    }


    render() {
        return (
            <View style={styles.main_container}>
                <View style={styles.text_container}>
                    <Text style={styles.title}> {translate("date") +" :"} </Text>
                    <Text style={styles.value}>{moment(this.state.item.date).format("DD/MM/YYYY, HH:mm")}</Text>
                </View>
                <View style={styles.text_container}>
                    <Text style={styles.title}> {translate("customer") +" :"}</Text>
                    <Text style={styles.value}> {this.state.item.customernumber} </Text>
                </View>
                <View style={styles.reason_container}>
                    <Text style={styles.title}> {translate("reason") +" :"} </Text>
                    <Text style={styles.value}>{this.state.item.reason}</Text>
                </View>
            </View>
        )
    }
}

const styles = EStyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: "#ededed"
    },
    text_container: {
        flexDirection: "column",
        paddingBottom: "$heightie",
        paddingLeft: "$heightie/2",
        height: "$heightie*4",
        borderBottomColor: "#5c5c5c",
        borderStyle: "dashed",
        borderBottomWidth: 1,
        flex: 1
    },
    title: {
        fontWeight: "bold",
        fontSize: "1.7rem",
        textTransform: "uppercase",
        color: "#000000",
        paddingBottom: "$heightie/2",
        marginTop: "$heightie/2",
        marginLeft: 0,
        paddingLeft: 0,
    },
    value: {
        fontSize: "1.6rem",
        color: "#000000",
        marginBottom: "$heightie/2",
        marginLeft: 0,
        paddingLeft: 0,

    },
    reason_container: {
        flexDirection: "column",
        paddingBottom: "$heightie",
        paddingLeft: "$heightie/2",
        height: "$heightie*4",
        borderBottomColor: "#5c5c5c",
        borderStyle: "dashed",
        borderBottomWidth: 1,
        flex: 5
    }
});

export default WaitingListDetails