import React, { PureComponent } from 'react';
import { Row, Col } from 'antd-mobile';
import { View } from 'react-native';

export default class GridLayout extends PureComponent {
    renderTitle() {
        return (
            <Row>
            </Row>
        )
    }
    renderRows() {

    }
    renderRow() {

    }
    render() {
        return (
            <View>
                {this.renderTitle()}
                {this.renderRows()}
            </View>
        )
    }
}
