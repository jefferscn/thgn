import React, { PureComponent } from 'react';
import { Components } from 'yes-platform';
import LeftIcon from './LeftIcon';
import GridView from './GridView';
import { View, Text as RawText, StyleSheet } from 'react-native';
import { AppDispatcher, Util } from 'yes';
import PureUserName from './PureUserName';
import TimeSpan from './TimeSpan';
import AuditStatusIcon from './AuditStatusIcon';

const {
    BillForm,
    Text,
} = Components;

const styles = StyleSheet.create({
    listView: {

    },
    primaryContainer: {
        flexDirection: 'row',
        lineHeight: 24,
        paddingBottom: 6,
    },
    primaryText: {
        fontSize: 17,
    },
    secondaryContainer: {
        flexDirection: 'row',
        lineHeight: 14,
        paddingBottom: 6,
    },
    secondaryText: {
        fontSize: 13,
        color: 'rgba(0,0,0,0.5)',
    },
});

console.log(`gridview=${GridView}`);

class ListTemplate extends PureComponent {
    onRefresh = () => {
        AppDispatcher.dispatch({
            type: 'RELOADFORM',
            key: Util.buildFormKey(this.props.formKey, '-1'),
        });
    }
    render() {
        return (
            <BillForm
                formKey={this.props.formKey}
                oid={-1}
                status={'DEFAULT'}
            >
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <GridView
                        yigoid="Grid1"
                        rowStyle={{
                            height: 110,
                            paddingTop: 12,
                            paddingBottom: 12,
                            borderBottom: '1px solid #ddd',
                        }}
                        onRefresh={this.onRefresh}
                        style={{ flex: 1, marginLeft: 12, backgroundColor: 'white'}}
                        isCustomLayout
                        primaryKey={<View style={styles.primaryContainer}>
                            <PureUserName isCustomLayout textStyles={styles.primaryText} yigoid="DisplayName" />
                            <RawText style={styles.primaryText}>的</RawText>
                            <Text isCustomLayout textStyles={styles.primaryText} yigoid='ProcessKey' /></View>}
                        // style={{
                        //     primaryText: {
                        //         fontSize: 14,
                        //         whiteSpace: 'nowrap',
                        //     },
                        //     secondaryText: {
                        //         fontSize: 12,
                        //         whiteSpace: 'nowrap',
                        //     },
                        //     tertiaryText: {
                        //         fontSize: 12,
                        //     },
                        // }}
                        secondKey={[<View style={styles.secondaryContainer}>
                            <RawText style={styles.secondaryText}>当前处理人: </RawText>
                            <Text isCustomeLayout textStyles={styles.secondaryText} yigoid='Handle' />
                        </View>]}
                        tertiaryKey={[<View><View style={styles.secondaryContainer}>
                            <RawText style={styles.secondaryText}>单据号: </RawText>
                            <Text isCustomeLayout textStyles={styles.secondaryText} yigoid='Topic' />
                        </View><View style={styles.secondaryContainer}>
                            <RawText style={styles.secondaryText}>流程状态: </RawText>
                            <Text isCustomeLayout textStyles={styles.secondaryText} yigoid='WorkitemName_EN' />
                        </View>
                        </View>]}
                        leftElement={<LeftIcon yigoid="ProcessKey" />}
                    />
                </View>
            </BillForm>
        );
    }
}
export default ListTemplate;
