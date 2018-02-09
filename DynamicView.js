import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Components} from 'yes-native'; // eslint-disable-line
import defaultTemplateMapping from './template/defaultTemplateMapping';
import billform from './billform';
const { BillForm, WorkflowOperationBar, FormInfo } = Components;

export default class DynamicView extends Component {

    static navigationOptions = ({ navigation }) => {
        const formKey = navigation.state.params.metaKey;
        return {
            headerTitle: <FormInfo.FormCaption style={{ fontSize: 20 }} formKey={formKey} />,
            headerRight: (
                <BillForm
                    formKey={navigation.state.params.metaKey}
                    oid={navigation.state.params ? navigation.state.params.id : -1}
                    status={navigation.state.params.status || 'VIEW'}
                >
                    <WorkflowOperationBar />
                </BillForm>
            ),
            headerStyle: {
                // backgroundColor: '#2196f3',
            },
        };
    };
    static propTypes = {
        navigation: PropTypes.object,
    };

    render() {
        const formKey = this.props.navigation.state.params.metaKey;
        let extraProps;
        // 支持反向模版
        extraProps = billform.default;
        let [fKey, tKey] = formKey.split('|');
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
                status={this.props.navigation.state.params.status || 'VIEW'}
                oid={this.props.navigation.state.params ? this.props.navigation.state.params.id : -1} // eslint-disable-line
                {...this.props}
                {...extraProps}
            />
        );
    }
}
