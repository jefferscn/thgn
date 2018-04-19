import React, { Component } from 'react';
import { Components } from 'yes-platform';
import DynamicView from '../DynamicView';

const { DynamicBillForm, BillForm, OperationBar } = Components;
export default function DynamicItemHOC(config) {
    const { title, formKey, headerRight, status, oid } = config;
    class DynamicItem extends Component {
        static navigationOptions = () => ({
            title,
            tabBarLabel: title,
            headerRight: headerRight ? <BillForm formKey={formKey}><OperationBar /></BillForm> : null,
        })

        render() {
            console.log(this.props);
            this.props.navigation.state.params = {
                metaKey: formKey,
                status,
                oid,
            };
            switch (config.type) {
                case 'mobilePhone':
                    return (
                        <DynamicBillForm
                            formKey={formKey}
                            status={status || 'EDIT'}
                            oid={oid || 'new'}
                        />
                    );
                case 'PC':
                    return (
                        <DynamicView
                            {...this.props}
                        />
                    );
                default:
                    return null;
            }
        }
    }
    return DynamicItem;
}
