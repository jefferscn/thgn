import React, { PureComponent } from 'react';
import { ControlWrap as controlWrap } from 'yes';
import Icon from 'react-native-vector-icons/FontAwesome';
/*
{caption: "通过", value: "1", key: "Approve"}
{caption: "有意见", value: "8", key: "HaveOpinions"}
{caption: "待处理", value: "-1", key: "Pending"}
{caption: "拒绝", value: "3", key: "Reject"}
{caption: "拒绝指派", value: "7", key: "RejectForward"}
{caption: "撤回", value: "0", key: "RecedeBack"}
{caption: "加签", value: "20", key: "RecedeBack1"}
{caption: "系统作废", value: "21", key: "RecedeBack2"}
{caption: "指派", value: "2", key: "Forward"}
{caption: "直送", value: "6", key: "Jumptorecedefrom"}
{caption: "暂停", value: "22", key: "Pause"}
{caption: "取消暂停", value: "23", key: "Renew"}
{caption: "完成（终止）", value: "24", key: "FinishEnd"}
{caption: "完成（同意）", value: "25", key: "FinishApprove"}
{caption: "完成（拒绝）", value: "26", key: "FinishReject"}
*/
class AuditStatusIcon extends PureComponent {
    calcIconName() {
        switch (this.props.controlState.get('value')) {
        case '1':
            return {
                name: 'check',
                color: 'green',
            };
        case '3':
            return {
                name: 'times',
                color: 'red',
            };
        case '24':
            return {
                name: 'ban',
                color: 'red',
            };
        case '25':
            return {
                name: 'ban',
                color: 'red',
            };
        case '26':
            return {
                name: 'ban',
                color: 'red',
            };
        case '22':
            return {
                name: 'ban',
                color: 'red',
            };
        case '-1':
            return {
                name: 'play',
                color: 'green',
            };
        default:
            return {
                name: 'play',
                color: 'green',
            };
        }
    }

    render() {
        return (
            <Icon {...this.calcIconName()} {...this.props} />
        );
    }
}

export default controlWrap(AuditStatusIcon);
