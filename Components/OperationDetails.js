import React from "react"
import {View, Text} from "react-native"
import translate from "../utils/language";
import EStyleSheet from "react-native-extended-stylesheet";
import moment from "moment"


class OperationDetails extends React.Component {

    static navigationOptions = () => ({
        title: translate("NAVIGATION_operationDetails")
    });

    constructor(props){
        super(props);

        this.state= {
            operation : this.props.navigation.getParam("operation")
        }
    }

    _displayBeneficiary(){
        const type = this.state.operation.type;
        if(type === "depot"){
            return (
                <View style={styles.text_container}>
                    <Text style={styles.title}> {translate("beneficiary") +" :"} </Text>
                    <Text style={styles.value}> {this.state.operation.beneficiarynumber} </Text>
                </View>
            )
        }
    }


    render() {
        return (
            <View style={styles.main_container}>
                <View style={styles.text_container}>
                    <Text style={styles.title}> {translate("type") + " :"}  </Text>
                    <Text style={styles.value}>{translate(this.state.operation.type)}</Text>
                </View>
                <View style={styles.text_container}>
                    <Text style={styles.title}> {translate("initiationDate") +" :"} </Text>
                    <Text style={styles.value}>{moment(this.state.operation.date).format("DD/MM/YYYY, HH:mm")}</Text>
                </View>
                <View style={styles.text_container}>
                    <Text style={styles.title}> {translate("customer") +" :"}</Text>
                    <Text style={styles.value}> {this.state.operation.customernumber} </Text>
                </View>
                <View style={styles.text_container}>
                    <Text style={styles.title}> {translate("amount") +" :"} </Text>
                    <Text style={styles.value}>{this.state.operation.amount + " XAF"}</Text>
                </View>
                {this._displayBeneficiary()}
                <View style={styles.text_container}>
                    <Text style={styles.title}> {translate("expectedDate") +" :"} </Text>
                    <Text style={styles.value}>{moment(this.state.operation.expectedvalidationdate).format("DD/MM/YYYY, HH:mm")}</Text>
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
        flexDirection: "row",
        alignItems: "flex-end",
        paddingBottom: "$heightie",
        height: "$heightie*4"
    },
    title: {
        fontWeight: "bold",
        fontSize: "1.9rem",
        color: "#000000"
    },
    value: {
        fontSize: "1.8rem",
        color: "#000000"

    }
});

export default OperationDetails