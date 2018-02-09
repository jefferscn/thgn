import React, { Component } from 'react';
import { Components } from 'yes-native';
const { DynamicBillForm, BillForm, OperationBar } = Components;
export default class MTodoListView extends Component {
    static navigationOptions= (navigation) => ({
        title: '待办',
        tabBarLabel: '待办',
        headerRight: <BillForm formKey="MOA_ToDoList2"><OperationBar /></BillForm>,
        headerStyle: {
            // backgroundColor: '#2196f3',
        },
    })
    render() {
        return (
            <DynamicBillForm
                formKey="MOA_ToDoList2"
                status="EDIT"
                oid="-1"
            />
        );
    }
}
