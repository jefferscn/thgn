import React, { PureComponent } from 'react';
import { Components } from 'yes-native'; // eslint-disable-line
import defaultTemplateMapping from './template/defaultTemplateMapping';
import billform from './billform';

export default class TemplateView extends PureComponent {
    render() {
        const { formKey, status, oid, ...otherProps } = this.props;
        console.log(otherProps);
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
