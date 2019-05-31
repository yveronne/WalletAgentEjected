import React from "react"
import moment from "moment"
import {View, FlatList, ActivityIndicator, Alert} from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"
import {SearchBar, ListItem} from "react-native-elements"
import {getWaitingList, markAsServed} from "../API/WalletApi"

class WaitingList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            list: []
        };
        this.array = [];
    }

    _serve(id){
        markAsServed(id, global.token)
            .then(response => {
                if (response.error == null){
                    const removedItemIndex = this.state.list.findIndex(item => item.id === id);
                    var listie = this.state.list;
                    if (removedItemIndex !== -1) {
                        listie.splice(removedItemIndex, 1);
                        this.setState({
                            list: listie
                        });
                    }
                }
                else {
                    Alert.alert("Echec", response.error,
                        [
                            {text: "Retour", style : "cancel"}
                        ]);
                }
            })
            .catch(error => console.log("Une erreur est survenue " +error))
    }

    componentDidMount(){
        getWaitingList(global.merchantPointID, global.token)
            .then(data => {
                this.setState({
                    isLoading: false,
                    list: data
                });
                this.array = this.state.list
            })
            .catch(error => {
                this.setState({isLoading: false})
            });
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

    _searchFilterFunction (text) {
        this.setState({
            value: text
        });

        const newData = this.array.filter(item => {
            const itemData = item.customernumber;
            const textData = text;

            return itemData.indexOf(textData) > -1;
        });
        this.setState({ list: newData });
    };

    _renderSeparator = () => {
        return (
            <View style={styles.mySeparator}>
            </View>
        )
    };

    _renderHeader = () =>{
        return (
            <SearchBar
                placeholder="Chercher un numéro de téléphone"
                lightTheme
                round
                onChangeText={text => this._searchFilterFunction(text)}
                autoCorrect={false}
                value={this.state.value}
            />
        );
    };


    render() {
        return (
            <View style={styles.main_container}>
                {this._displayLoading()}
                <FlatList
                    data={this.state.list}
                    renderItem={ ({item}) =>
                        <ListItem
                            key={item.id.toString()}
                            title={item.customernumber}
                            subtitle={moment(item.date).format("DD/MM/YYYY, hh:mm:ss")}
                            onLongPress={() => {this._serve(item.id)}}
                        />

                    }
                    keyExtractor={item => item.id.toString()}
                    ItemSeparatorComponent={this._renderSeparator}
                    ListHeaderComponent={this._renderHeader}
                />
            </View>
        )
    }
}

const styles = EStyleSheet.create({
    loadingContainer : {
        position: "absolute",
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center"
    },
    mySeparator : {
        height: 1,
        backgroundColor : "#000000",
    },
    main_container: {
        flex: 1,
        backgroundColor: "#ededed"
    }
});

export default WaitingList