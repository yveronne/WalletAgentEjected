import React from "react"
import {createStackNavigator, createBottomTabNavigator, createAppContainer} from "react-navigation"
import {Image, StyleSheet} from "react-native"
import Login from "../Components/Login"
import WaitingList from "../Components/WaitingList"
import ValidateOperation from "../Components/ValidateOperation"
import Menu from "../Components/Menu"
import translate from "../utils/language"

const waitingListStack = createStackNavigator({
    WaitingList_stack: {
        screen : WaitingList,
        navigationOptions: {
            title: "File d'attente",
            headerStyle: {
                backgroundColor: "#FF0000"
            },
            headerTintColor: "#FFFFFF",
            headerTitleStyle: {
                fontWeight: "bold",
                color: "#FFFFFF"
            }
        }
    }

});

const operationValidationStack = createStackNavigator({
    OperationValidation_stack: {
        screen : ValidateOperation,
        navigationOptions: {
            title: "Validation de transaction",
            headerStyle: {
                backgroundColor: "#FF0000"
            },
            headerTintColor: "#FFFFFF",
            headerTitleStyle: {
                fontWeight: "bold",
                color: "#FFFFFF"
            }
        }
    }

});

const menuStack = createStackNavigator({
    menu_stack: {
        screen : Menu,
        navigationOptions: {
            header: null
        }
    }

});

const tabbie = createBottomTabNavigator({
    WaitingList: {
        screen: waitingListStack,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image source={require("../Images/clock.png")} style={styles.icon}/>
            },
            tabBarLabel: "File d'attente"
        }
    },
    OperationValidation: {
        screen: operationValidationStack,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image source={require("../Images/validate.jpg")} style={styles.icon}/>
            },
            tabBarLabel: "Validation d'opération"
        }
    },
    Menu: {
        screen: menuStack,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image source={require("../Images/hamburger.png")} style={styles.icon}/>
            },
            tabBarLabel: "Menu"
        }
    },
}, {
    tabBarOptions: {
        activeTintColor: "#FF0000",
        inactiveTintColor: "#000000",
        activeBackgroundColor: "#ededed",
        showLabel: false
    },
    // animationEnabled: true
});

const stackie = createStackNavigator({
    Login: {
        screen : Login,
        navigationOptions: {
            header: null
        }
    },
    Home: {
        screen: tabbie,
        navigationOptions: {
            header: null
        }
    }

});

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
});

export default createAppContainer(stackie)