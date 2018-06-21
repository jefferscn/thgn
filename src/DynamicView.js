import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Components } from 'yes-platform'; // eslint-disable-line
import TemplateView from './TemplateView';
const { BillForm, OperationBar, FormInfo } = Components;

export default class DynamicView extends Component {
    static navigationOptions = ({ navigation }) => {
        const formKey = navigation.state.params.metaKey;
        return {
            headerTitle: (<BillForm
                formKey={navigation.state.params.metaKey}
                oid={navigation.state.params ? navigation.state.params.id : -1}
                status={navigation.state.params.status || 'VIEW'}
            ><FormInfo.FormCaption style={{ fontSize: 20 }} formKey={formKey} />
            </BillForm>),
            headerRight: (
                <BillForm
                    formKey={navigation.state.params.metaKey}
                    oid={navigation.state.params ? navigation.state.params.id : -1}
                    status={navigation.state.params.status || 'VIEW'}
                >
                    <OperationBar />
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
