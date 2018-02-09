import React, { PureComponent } from 'react';
import { Components } from 'yes-native';
import defaultTemplateMapping from '../defaultTemplateMapping';
import LeftIcon from './LeftIcon';
import DateText from './DateText';
const {
    BillForm,
    View,
    TextLinkList,
} = Components;

class ListTemplate extends PureComponent {
    render() {
        return (
            <BillForm
                formKey="TSL_ToDoList"
                entry="TSL/OA_ToDoList"
            >
                <View style={{ flex: 1 }}>
                    <TextLinkList
                        yigoid="list"
                        rowHeight={80}
                        isCustomLayout
                        primaryKey="Topic"
                        secondKey={['displayname', 'InstanceState']}
                        tertiaryKey={['WorkitemName']}
                        leftElement={<LeftIcon yigoid="ProcessKey" />}
                        rightElement={<DateText yigoid="creattime" />}
                    />
                </View>
            </BillForm>
        );
    }
}
defaultTemplateMapping.reg('list', ListTemplate);
export default ListTemplate;
