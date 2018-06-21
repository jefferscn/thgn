import React, { PureComponent } from 'react';
import { ImagePicker } from 'antd-mobile';
import { attachmentActionWrap } from 'yes';

class AttachmentAction extends PureComponent {
    onAddImage= (files)=> {
        this.props.addAttachment(files[0].file);
    }
    onSelectFail= ()=> {

    }
    render() {
        return (
            <ImagePicker
                files={[]}
                onChange={this.onAddImage}
                onFail={this.onSelectFail}
            />
        )
    }
}

export default attachmentActionWrap(AttachmentAction);
