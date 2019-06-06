import React from "react"
import moment from "moment"
import {View, FlatList, ActivityIndicator} from "react-native"
import {SearchBar, ListItem} from "react-native-elements"
import {getInitiatedOperations} from "../API/WalletApi"
import translate from "../utils/language"
import EStyleSheet from "react-native-extended-stylesheet";

class InitiatedOperations extends React.Component {

    static navigationOptions = () => ({
        title: translate("NAVIGATION_initiatedOperations")
    });

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            list: []
        };
        this.array = [];
    }

    componentDidMount(){
        getInitiatedOperations(global.merchantPointID, global.token)
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
            //const itemData = item.customernumber+" "+item.type.toUpperCase()+" "+item.expectedvalidationdate;
            const itemData = item.otp;
            const textData = text.toUpperCase();

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
                placeholder={translate("search")}
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
                            title={moment(item.expectedvalidationdate).format("DD/MM/YYYY, HH:mm") + "   - " + item.customernumber}
                            subtitle={translate(item.type) + "  " +item.amount+" XAF"}
                            onPress={() => {this.props.navigation.navigate("OperationDetails", {operation: item})}}
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

export default InitiatedOperations