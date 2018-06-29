import React, { PureComponent } from 'react';
import { DynamicControl } from 'yes'; // eslint-disable-line import/no-unresolved
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 12,
        backgroundColor: 'white',
    },
    item: {
        flex: 1,
        flexBasis: 0,
    },
});
export default class Flexbox extends PureComponent {
    render() {
        return (
            <View style={[styles.container, this.props.containerStyle]}>
                {
                    this.props.items.map((item) => {
                        if (item.text !== null && item.text !== undefined) {
                            return <Text style={[styles.item,item.style]} >{item.text}</Text>;
                        }
                        return (
                            <DynamicControl
                                key={item.yigoid}
                                yigoid={item.yigoid}
                                isCustomLayout
                                showLabel={false}
                                layoutStyles={styles.item}
                                contentContainerStyle={{ justifyContent: 'flex-end', alignItems: 'center' }}
                                // hideWhenEmptyValue
                            />
                        );
                    })
                }
            </View>
        )
    }
}