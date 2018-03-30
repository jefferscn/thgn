import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import { ControlWrap as controlWrap } from 'yes';

class PathText extends PureComponent {
    calcText() {
        if (!this.props.displayValue) {
            return '';
        }
        const txt = this.props.displayValue.split('/').pop();
        return txt;
    }
    render() {
        return (
            <Text style={[this.props.textLayouts]}>{this.calcText()}</Text>
        );
    }
}

export default controlWrap(PathText);
