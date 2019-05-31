import React from 'react';
import EStyleSheet from "react-native-extended-stylesheet"
import {Dimensions} from "react-native"
import Navigation from "./Navigation/Navigation"

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

EStyleSheet.build({
    $rem: width / 40,
    $heightie: height / 40,
    $height: height,
    $width: width
});

export default class App extends React.Component {
    render() {
        return (
            <Navigation/>
        );
    }
}

