import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Components } from 'yes-native'; // eslint-disable-line
import TemplateView from './TemplateView';
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
        return (
            <TemplateView
                formKey={this.props.navigation.state.params.metaKey}
                oid={this.props.navigation.state.params ? this.props.navigation.state.params.id : -1}
                status={this.props.navigation.state.params.status || 'VIEW'}
            />
        );
    }
}
