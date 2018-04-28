import React, { Component } from 'react';
import TemplateView from '../TemplateView';
import { Components } from 'yes-platform'; // eslint-disable-line
const { BillForm, OperationBar, FormInfo } = Components;

export default (entry) => {
    return class RouteComponent extends Component {

        static navigationOptions = () => {
            return {
                headerTitle: entry.title,
                tabBarLabel: entry.title,
                headerRight: (
                    <BillForm
                        formKey={entry.formKey}
                        oid={-1}
                        status={'EDIT'}
                    >
                        <OperationBar />
                    </BillForm>
                ),
                headerStyle: {
                    // backgroundColor: '#2196f3',
                },
            };
        };

        render() {
            return (
                <TemplateView
                    formKey={entry.formKey}
                    oid={-1}
                    status={'EDIT'}
                />
            );
        }
    };
};
