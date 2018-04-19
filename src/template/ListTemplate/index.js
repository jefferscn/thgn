import React, { PureComponent } from 'react';
import { Components } from 'yes-platform';
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
                        isCustomLayout
                        primaryKey="Topic"
                        style={{
                            primaryText: {
                                fontSize: 12,
                                whiteSpace: 'nowrap',
                            },
                            secondaryText: {
                                fontSize: 10,
                                whiteSpace: 'nowrap',
                            },
                        }}
                        secondKey={['displayname', {
                            yigoid: 'InstanceState',
                            layoutStyles: {
                                justifyContent: 'flex-end',
                            },
                        }]}
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
