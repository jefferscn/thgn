import React, { PureComponent } from 'react';
import { StyleSheet, View, Text as RawText } from 'react-native';
import { Text } from 'yes-platform';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
});
export default class ControlWithLabel extends PureComponent  {
    render() {
        return (
            <View style={[styles.container, this.props.containerStyle]}>
                <RawText>{this.props.label}</RawText>
                <Text yigoid={this.props.yigoid} />
            </View>
        );
    }
}
