import React from "react"
import {View, Text, TouchableOpacity, Alert, ActivityIndicator} from "react-native"
import translate from "../utils/language"
import EStyleSheet from "react-native-extended-stylesheet"
import moment from "moment"
import {validateTransaction, getOperationDetails} from "../API/WalletApi"


class OperationDetails extends React.Component {

    static navigationOptions = () => ({
        title: translate("NAVIGATION_operationDetails")
    });

    constructor(props){
        super(props);

        this.state= {
            operation : this.props.navigation.getParam("operation"),
            isLoading: false
        }
    }

    _displayLoading(){
        if(this.state.isLoading){
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large"/>
                </View>
            )
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
        validateTransaction(this.state.operation.amount, parseInt(this.state.operation.otp), global.token)
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

    _displayValidationButton(){
        if(!this.state.operation.wasvalidatedbymerchant){
            return (
                <View style={styles.button_container}>
                    <TouchableOpacity onPress={() => {this._validate()}}
                                      style={styles.button}>
                        <Text style={styles.button_text}> Valider </Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    _refresh(){
        const id = this.state.operation.id;
        getOperationDetails(id)
            .then(data => {
                this.setState({
                    isLoading: false,
                    operation: data

                })
            })
            .catch(error => console.log(error))

    }


    render() {
        return (
            <TouchableOpacity style={styles.main_container} onPress={() => this._refresh()}>
                {this._displayLoading()}
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
                <View style={styles.text_container}>
                    <Text style={styles.title}> A été validée par le client : </Text>
                    <Text style={styles.value}>{translate(this.state.operation.wasvalidatedbycustomer.toString())}</Text>
                </View>
                {this._displayValidationButton()}
            </TouchableOpacity>
        )
    }
}

const styles = EStyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: "#ededed"
    },
    loadingContainer : {
        position: "absolute",
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center"
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
    button_container: {
        flex: 1,
        justifyContent: "center",
        textAlign: "center",
        flexDirection: "row",
        paddingBottom: "$heightie",
        paddingTop: "$heightie",
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