import React from "react"
import {View, TouchableOpacity, Image, Text} from "react-native"
import EStyleSheet from "react-native-extended-stylesheet";
import {logout} from "../API/WalletApi"
import translate from "../utils/language"

class Menu extends React.Component {
    _logOut(){
        logout(global.token)
            .then(response => {
                global.token = null;
                this.props.navigation.navigate("Login")
            })
            .catch(error => console.log("Une erreur est survenue lors de la déconnexion"))
    }


    render() {
        return (
            <View style={styles.main_container}>
                <View style={styles.menu_item}>
                    <TouchableOpacity style={styles.menu_touchable}
                                    onPress={() => this.props.navigation.navigate("InitiatedOperations")}>
                        <Image source={require("../Images/todo.png")} style={styles.menu_image}/>
                        <Text> {translate("MENU_operations")} </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.menu_item}>
                    <TouchableOpacity style={styles.menu_touchable} onPress={() => this._logOut()}>
                        <Image source={require("../Images/logout.png")} style={styles.menu_image}/>
                        <Text> {translate("MENU_signOut")} </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = EStyleSheet.create({
    main_container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        backgroundColor: "#ededed",
    },
    menu_item: {
        flexDirection: "column",
        justifyContent: "center",
        borderBottomColor: "#000000",
        borderBottomWidth: 1
    },
    menu_touchable: {
        height: "$heightie*4",
        flexDirection: "row",
        alignItems: "center"
    },
    menu_image: {
        width: "$heightie*2",
        height: "$heightie*2",
        marginLeft: "$heightie",
        marginRight: "$heightie"
    }
});

export default Menu