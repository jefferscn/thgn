import React, { PureComponent } from 'react';
import TextareaItem from 'antd-mobile/lib/textarea-item';
import { ControlWrap as controlWrap, Util } from 'yes';

class TextArea extends PureComponent {
    state = {
        text: this.props.displayValue,
    }
    onChange = (val) => {
        this.setState({
            text: val,
        });
    }
    onBlur = () => {
        console.log('blur');
        Util.blurExec(() => {
            this.props.onChange(this.state.text);
        });
        // this.props.onChange(this.state.text);
    }
    render() {
        return (
            <TextareaItem
                onChange={this.onChange}
                onBlur={this.onBlur}
                editable={!this.props.disabled}
                placeholder={this.props.placeholder}
                autoHeight={this.props.autoHeight}
            />
        );
    }
}

export default controlWrap(TextArea);
