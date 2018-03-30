import React, { PureComponent } from 'react';
import { Components } from 'yes-native'; // eslint-disable-line
import defaultTemplateMapping from './template/defaultTemplateMapping';
import billform from './billform';
import FieldView from './FieldView';
import PropTypes from 'prop-types';
import CustomControls from './config/control.js';

export default class TemplateView extends PureComponent {
    static childContextTypes = {
        getControlProps: PropTypes.func,
    }

    controlProps = {}

    getChildContext() {
        return {
            getControlProps: this.getControlProps,
        };
    }

    getControlProps = (yigoid) => {
        const { formKey } = this.props;
        const [fKey, tKey] = formKey.split('|');
        if (this.controlProps[yigoid]) {
            return this.controlProps[yigoid];
        }
        const { controls } = billform[fKey];
        const key = `${fKey}_${yigoid}`;
        let props = controls[yigoid];
        if (props) {
            this.calculateElement(props);
            this.controlProps[key] = props;
            return props;
        }
        return {};
    }

    calculateElement(props) {
        if (props.control && typeof props.control === 'string') {
            props['control'] = CustomControls[props.control];
        }
        for (const key in props) {
            const ele = props[key];
            if (ele && ele.type === 'element') {
                const Control = CustomControls[ele.elementType];
                props[key] = <Control {...ele.elementProps} />;
            }
        }
    }

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
