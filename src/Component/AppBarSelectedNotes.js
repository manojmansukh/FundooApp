import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Appbar, Card, Searchbar, Provider, Menu, Divider } from 'react-native-paper';
import ColorPalette from 'react-native-color-palette'

export default class AppBarSelectedNotes extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ListView: true,
            selectionMode: true,
            pin: false,
            archive: false,
            visible: false,
            permanantDelete: false,
            trash: false,
            displayColorPicker: false,
        }
    }

    _openMenu = () => this.setState({ visible: true });

    _closeMenu = () => this.setState({ visible: false });

    handleClick = () => {
        console.log("colour");

        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };



    render() {
        const popover = {
            position: 'absolute',
            zIndex: '2',
        }
        const cover = {
            // position: 'fixed',
            // top: '0px',
            // right: '0px',
            // bottom: '0px',
            // left: '0px',
        }
        let selectedColor = '#C0392B';
        return (
            <Appbar style={styles.top}>
                <Appbar.Action icon={require('../Image/arrow_back.png')}
                    onPress={() => {
                        this.setState({ selectionMode: false }, () => {
                            console.log(this.state.selectionMode);
                            this.props.handleSelectionMode(this.state.selectionMode)
                        })
                    }} />
                <Provider>
                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>

                        <Appbar.Action icon={this.state.pin ? require('../Image/pin.png') : require('../Image/unpin.png')}
                            onPress={() => this.setState({ pin: !this.state.pin }, () => {
                                console.log("manoj" + this.state.pin);
                                this.props.handlePinStatus(this.state.pin)
                            })} />
                        <Appbar.Action icon={require('../Image/bell1.png')}
                            onPress={this.showDialog} />
                        <Appbar.Action icon={require('../Image/ColourBoard.png')}
                            onPress={this.handleClick} />
                        { this.state.displayColorPicker ? 
                        <ColorPalette
                        // onChange={color => selectedColor = color}
                        // value={selectedColor}
                        colors={['#C0392B', '#E74C3C', '#9B59B6', '#8E44AD', '#2980B9']}
                        title={"Controlled Color Palette:"}
                        // icon={
                        //   <Icon name={'check-circle-o'} size={25} color={'black'} />
                        // React-Native-Vector-Icons Example
                      //}
                    /> : null }
                        <Appbar.Action icon={require('../Image/Label.png')}
                            onPress={() => { }} />

                        <Menu
                            visible={this.state.visible}
                            onDismiss={this._closeMenu}
                            style={{backgroundColor:'pink',width:'50%'}}
                            anchor={
                                <Appbar.Action icon={require('../Image/More.png')} onPress={this._openMenu} />
                            }>

                            <Menu.Item onPress={() => {
                                this.setState({ archive: !this.state.archive }, () => {
                                    this.props.handleArchive(this.state.archive)
                                    
                                })
                            }} title="Archive" />
                            
                            <Menu.Item onPress={() => {
                                this.setState({ trash: true }, () => {
                                    console.log("hiii trash");
                                    this.props.handleTrash(this.state.trash)
                                })
                            }} title="Delete" />
    
                            <Divider />
                            <Menu.Item onPress={() => {
                                this.setState({ permanantDelete: true }, () => {
                                    this.props.handlePermantDelete(this.state.permanantDelete)
                                })
                            }} title="Permanant Delete" />
                            
                            <Divider />
                            <Menu.Item onPress={() => { }} title="Make Copy" />
                            <Menu.Item onPress={() => { }} title="Send" />
                        </Menu>
                    </View>
                </Provider>
            </Appbar>



        );
    }
}
const styles = StyleSheet.create({
    top: {
        backgroundColor: 'white',
        width: '100%',
        left: 0,
        right: 0,
        bottom: 0,
        borderWidth: .1,
    },
    input: {
        marginTop: 10,
        width: '90%',
        height: 70,
        alignSelf: "center",
        borderBottomColor: 'black',
        fontSize: 30,
        //Horizontal:50
    },
});
