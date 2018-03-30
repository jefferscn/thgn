import React, { PureComponent } from 'react';
import { DynamicControl } from 'yes';
import { View } from 'yes-native';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        paddingRight: 12,
        flexDirection: 'column',
    },
    text: {
        textAlign: 'right',
    }
});

export default class ListRighElement extends PureComponent {
    render() {
        return (
            <View style={[styles.container, this.props.containerStyle]}>
                {this.props.firstline ?
                    <DynamicControl
                        textStyles={[styles.text, this.props.firstlineStyle]}
                        yigoid={this.props.firstline}
                        {...this.props.firstlineprops}
                    /> : null}
                {this.props.secondline ?
                    <DynamicControl
                        textStyles={[styles.text, this.props.secondlineStyle]}
                        yigoid={this.props.secondline}
                        {...this.props.secondlineprops}
                    /> : null}
            </View>
        );
    }
}
