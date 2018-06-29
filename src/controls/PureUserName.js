import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import { ControlWrap as controlWrap } from 'yes';

class PureUserName extends PureComponent {
    reg = /[^\(\)]+(?=\))/g
    calcText() {
        if (!this.props.displayValue) {
            return '';
        }
        const result = this.props.displayValue.match(this.reg);
        if (result.length > 0) {
            const nameTmp = result[0];
            return nameTmp.split('_')[0];
        }
        return this.displayValue;
    }
    render() {
        return (
            <Text style={[this.props.textStyles]}>{this.calcText()}</Text>
        );
    }
}

export default controlWrap(PureUserName);
