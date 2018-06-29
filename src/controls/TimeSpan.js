import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import { ControlWrap as controlWrap } from 'yes';
import moment from 'moment';

class TimeSpan extends PureComponent {
    reg = /[^\(\)]+(?=\))/g
    calcText() {
        const result = '已经等待了';
        const v = this.props.controlState.get('value');
        const now = new Date();
        moment.locale(window.navigator.language);
        return `${result}${moment.duration(now.getTime() - v.getTime()).humanize()}`;
    }
    render() {
        return (
            <Text style={[this.props.textStyles]}>{this.calcText()}</Text>
        );
    }
}

export default controlWrap(TimeSpan);
