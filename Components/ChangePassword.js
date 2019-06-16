import React from "react"
import {View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator} from "react-native"
import translate from "../utils/language";
import {changePassword} from "../API/WalletApi"
import EStyleSheet from "react-native-extended-stylesheet"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"

class ChangePassword extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title: translate("NAVIGATION_changePassword")
    });

    constructor(props){
        super(props);

        this.oldPassword="";
        this.newPassword="";

        this.state = {
            isLoading: false
        }
    }

    _oldPasswordInputChanged(text){
        this.oldPassword = text
    }

    _newPasswordInputChanged(text){
        this.newPassword = text
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

    changePass(){
        this.setState({isLoading: true});
        const {goBack} = this.props.navigation;
        changePassword(this.oldPassword, this.newPassword, global.token)
            .then(response => {
                this.setState({isLoading: false});
                if(response.message != null){
                    Alert.alert("Succès", response.message,
                        [
                            {text: "OK", onPress: () => goBack()}
                        ]);
                }
                else if (response.error != null){
                    Alert.alert("Echec", response.error,
                        [
                            {text: "Retour", style : "cancel"}
                        ]);
                }
                else {
                    Alert.alert("Erreur", "Une erreur est survenue. Veuillez réessayer.",
                        [
                            {text: "Retour", style : "cancel"}
                        ]);
                }
            })
            .catch(error => console.log(error))
    }


    render() {
        return (
            <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }}
                                     contentContainerStyle={styles.main_container}
                                     enableOnAndroid={false}>
                {this._displayLoading()}
                <View style={styles.input_container}>
                    <Text style={styles.text}> {translate("FORM_oldPassword")} </Text>
                    <TextInput placeholder={translate("PLACEHOLDER_oldPassword")}
                               onChangeText={(text) => this._oldPasswordInputChanged(text)}
                               autoFocus={true}
                               style={styles.input}
                               secureTextEntry={true}/>
                </View>
                <View style={styles.input_container}>
                    <Text style={styles.text}> {translate("FORM_newPassword")} </Text>
                    <TextInput placeholder={translate("PLACEHOLDER_newPassword")}
                               onChangeText={(text) => this._newPasswordInputChanged(text)}
                               style={styles.input}
                               secureTextEntry={true}/>
                </View>
                <View style={styles.button_container}>
                    <TouchableOpacity onPress={() => {this.changePass()}}
                                      style={styles.button}>
                        <Text style={styles.button_text}>{translate("validate")} </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>

        )
    }
}

const styles = EStyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: "#ededed",
        flexDirection: "column",
        padding : "$heightie"
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
    input_container: {
        flex: 2,
        marginBottom: "$heightie",
        paddingTop: "$heightie",
        paddingBottom: "$heightie",
    },
    content_container: {
        flex: 3,
        marginBottom: "$heightie",
        paddingTop: "$heightie",
        paddingBottom: "$heightie",
    },
    button_container: {
        flex: 1,
        justifyContent: "center",
        textAlign: "center",
        flexDirection: "row",
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

export default ChangePassword