import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ListViewItem extends PureComponent {
    renderLeftElement() {
        return this.props.leftElement;
    }

    renderCenterElement() {
        return this.props.centerElement;
    }

    renderRightElement() {
        return this.props.rightElement;
    }

    renderArrow() {
        return this.props.showArrow ? <Icon style={styles.arrow} name='chevron-right' /> : null;
    }

    onPress = () => {
        this.props.onPress();
    }

    render() {
        return (
            <TouchableOpacity onPress={this.onPress} >
                <View style={[styles.container, this.props.containerStyle]}>
                    {this.renderLeftElement()}
                    {this.renderCenterElement()}
                    {this.renderRightElement()}
                    {this.renderArrow()}
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    arrow: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        display: 'flex',
        width: 20,
        color: 'rgba(0,0,0,0.6)',
    },
    centerStyle: {

    },
    primaryContainer: {

    },
    primaryText: {

    },
    secondaryContainer: {

    },
    secondaryText: {

    },
});
