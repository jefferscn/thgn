import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Components } from 'yes-platform'; // eslint-disable-line
import TemplateView from './TemplateView';
import { YIUI } from 'yes-core';
import { WorkitemWrap as workitemWrap } from 'yes';
const { BillForm, WorkflowOperationBar, FormInfo, LoadingComp } = Components;

const WorkitemBill = workitemWrap(BillForm, LoadingComp);
export default class WorkitemView extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <WorkitemBill workitemId={navigation.state.params.wid}>
                <FormInfo.FormCaption style={{ fontSize: 20 }} />
            </WorkitemBill>,
            headerRight: (
                <WorkitemBill
                    workitemId={navigation.state.params.wid}
                >
                    <WorkflowOperationBar />
                </WorkitemBill>
            ),
            headerStyle: {
                // backgroundColor: '#2196f3',
            },
        };
    };

    static propTypes = {
        navigation: PropTypes.object,
    };

    state = {
        loading: true,
    }

    async componentWillMount() {
        const workitemInfo = await YIUI.BPMService.loadWorkitemInfo(this.props.navigation.state.params.wid);
        if (workitemInfo) {
            const expVals = {};
            expVals[YIUI.BPMConstants.WORKITEM_INFO] = workitemInfo;
            this.setState({
                loading: false,
                expVals,
            });
        }
    }

    render() {
        if (this.state.loading) {
            return <LoadingComp />;
        }
        let formKey = this.state.expVals.WorkitemInfo.FormKey;
        if (this.state.expVals.WorkitemInfo.TemplateKey) {
            formKey = `${formKey}|${this.state.expVals.WorkitemInfo.TemplateKey}`;
        }
        const oid = this.state.expVals.WorkitemInfo.OID ? this.state.expVals.WorkitemInfo.OID : -1;
        return (<TemplateView
            formKey={formKey}
            oid={oid}
            field={this.props.navigation.state.params.field}
            status={'VIEW'}
            expVals={this.state.expVals}
        />);
    }
}
