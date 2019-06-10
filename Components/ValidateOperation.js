import React from "react"
import {Text, View, TextInput, TouchableOpacity, Alert, Platform, PermissionsAndroid} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet"
import {validateTransaction} from "../API/WalletApi"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import QRCodeScanner from "react-native-qrcode-scanner"
import translate from "../utils/language";



class ValidateOperation extends React.Component {

    static navigationOptions = () => ({
        title: translate("NAVIGATION_validateOperation")
    });

    constructor(props){
        super(props);
        this.code="";

        this.state= {
            qrCode: "",
            startScanner: false
        }
    }

    _codeInputChanged(text){
        this.code = text
    }

    _validate(amount){
        validateTransaction(amount, parseInt(this.code), global.token)
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

    onScan = (qr) => {
        this.setState({qrCode: qr});
        this.setState({startScanner: false});

        var qrArray = (qr.data).split(":");
        this.code = qrArray[0];
        var amount = parseFloat(qrArray[1]);
        Alert.alert("Confirmation", translate("OPERATION_scanConfirmation") +amount ,
            [
                {text: translate("validate"), onPress: () => this._validate(amount)},
                {text: translate("cancelie"), style: "cancel"}
            ]);
    };

    openScanner = () => {
        var that = this;

        if(Platform.OS === "android"){
            // noinspection JSAnnotator
            async function requestCameraPermission(){
                try {
                    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
                    if(granted === PermissionsAndroid.RESULTS.GRANTED){
                        that.setState({qrCode : ""});
                        that.setState({startScanner : true})
                    }
                    else {
                        alert("Camera permission denied")
                    }
                }
                catch (err){
                    alert("Camera ", err);
                }
            }
            requestCameraPermission();
        }
        else {
            that.setState({qrCode : ""});
            that.setState({startScanner : true})
        }
    };

    render() {
        if(!this.state.startScanner){
            return (
                <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }}
                                         contentContainerStyle={styles.main_container}
                                         enableOnAndroid={false}>
                    <View style={styles.phone_container}>
                        <Text style={styles.text}> {translate("OPERATION_code")} </Text>
                        <TextInput placeholder="Code"
                                   onChangeText={(text) => this._codeInputChanged(text)}
                                   autoFocus={false}
                                   style={styles.input}
                                   keyboardType="numeric"/>
                    </View>
                    <View style={styles.button_container}>
                        <TouchableOpacity onPress={() => {this._validate()}}
                                          style={styles.button}>
                            <Text style={styles.button_text}> {translate("validate")} </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.button_container}>
                        <TouchableOpacity onPress={() => {this.openScanner()}}
                                          style={styles.button}>
                            <Text style={styles.button_text}> {translate("OPERATION_scan")} </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            )
        }
        else {
            return (
                <QRCodeScanner
                    onRead={this.onScan}
                    showMarker={true}
                />
            )
        }

    }
}

const styles = EStyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: "#ededed",
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: "$heightie",
        paddingRight: "$heightie"
    },
    phone_container: {
        height: "$height/5",
        marginBottom: "$heightie",
        paddingTop: "$heightie",
        paddingBottom: "$heightie"
    },
    text: {
        fontSize: "2.2rem",
        color: "#000000",
        fontWeight: "bold",
        paddingBottom: "$heightie"
    },
    input: {
        borderRadius: 5,
        borderColor: "#000000",
        borderStyle: "solid",
        borderWidth: 0.5,
        paddingLeft: "$heightie/2",
        flex: 1
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

export default ValidateOperation