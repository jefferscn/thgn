import React, { PureComponent } from 'react';
import { Components } from 'yes-native'; // eslint-disable-line
import defaultTemplateMapping from './template/defaultTemplateMapping';
import billform from './billform';
import FieldView from './FieldView';

export default class TemplateView extends PureComponent {
    render() {
        const { formKey, status, oid, ...otherProps } = this.props;
        let extraProps;
        // 支持反向模版
        extraProps = billform.default;
        const [fKey, tKey] = formKey.split('|');
        if (billform[fKey]) {
            extraProps = Object.assign(extraProps, billform[fKey]);
        }
        if (billform[formKey]) {
            extraProps = Object.assign(extraProps, billform[formKey]);
        }
        const TemplateComponent = defaultTemplateMapping.get(extraProps.formTemplate);

        // if (this.props.field) {
        //     return (<FieldView
        //         formKey={formKey}
        //         status={status || 'VIEW'}
        //         field={this.props.field}
        //         oid={oid ? oid : -1} // eslint-disable-line
        //         {...otherProps}
        //         {...extraProps}
        //     />);
        // }

        return (
            <TemplateComponent
                formKey={formKey}
                status={status || 'VIEW'}
                oid={oid ? oid : -1} // eslint-disable-line
                {...otherProps}
                {...extraProps}
            />
        );
    }
}
