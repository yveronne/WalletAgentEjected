import React from "react"
import {View, Text, TouchableOpacity, Alert} from "react-native"
import translate from "../utils/language";
import EStyleSheet from "react-native-extended-stylesheet";
import moment from "moment"
import {validateTransaction} from "../API/WalletApi"


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

    _validate(){
        validateTransaction(parseInt(this.state.operation.otp), global.token)
            .then(response => {
                if(response.message != null){
                    Alert.alert("Succès", response.message,
                        [
                            {text: "OK", style: "cancel"}
                        ]);
                }
                else if (response.error != null){
                    Alert.alert("Echec", response.error,
                        [
                            {text: translate("back"), style : "cancel"}
                        ]);
                }
            })
            .catch(error => console.log(error))
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
                <View style={styles.button_container}>
                        <TouchableOpacity onPress={() => {this._validate()}}
                                          style={styles.button}>
                            <Text style={styles.button_text}> Valider </Text>
                        </TouchableOpacity>
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

    },
    button_container: {
        flex: 1,
        justifyContent: "center",
        textAlign: "center",
        flexDirection: "row",
        paddingBottom: "$heightie"
    },
    button: {
        backgroundColor: "#FF0000",
        borderRadius: 10,
        height: 50,
        width: "$width/1.5",
        justifyContent: "center"
    },
    button_text: {
        textAlign: "center",
        color: "#FFFFFF",
        fontSize: "2.3rem"
    },
});

export default OperationDetails