import React, { PureComponent } from 'react';
import { Avatar } from 'react-native-material-ui';
import { ControlWrap as controlWrap } from 'yes';

class AvatarComponent extends PureComponent {
    calcText() {
        if (!this.props.displayValue) {
            return '';
        }
        let txt = this.props.displayValue.split(' ')[0];
        txt = txt.substr(txt.length - 2, 2);
        return txt;
    }
    render() {
        return (
            <Avatar text={this.calcText()} />
        );
    }
}

export default controlWrap(AvatarComponent);
