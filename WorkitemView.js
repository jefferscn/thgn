import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Components } from 'yes-native'; // eslint-disable-line
import TemplateView from './TemplateView';
import { YIUI } from 'yes-core';
import { WorkitemWrap as workitemWrap } from 'yes';
const { BillForm, WorkflowOperationBar, FormInfo, LoadingComp } = Components;

const WorkitemBill = workitemWrap(BillForm, LoadingComp);
export default class WorkitemView extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        const formKey = navigation.state.params.metaKey;
        return {
            headerTitle: <FormInfo.FormCaption style={{ fontSize: 20 }} formKey={formKey} />,
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
            this.setState({
                loading: false,
                workitemInfo,
            });
        }
    }

    render() {
        if (this.state.loading) {
            return <LoadingComp />;
        }
        let formKey = this.state.workitemInfo.FormKey;
        if (this.state.workitemInfo.TemplateKey) {
            formKey = `${formKey}|${this.state.workitemInfo.TemplateKey}`;
        }
        const oid = this.state.workitemInfo.OID ? this.state.workitemInfo.OID : -1;
        const expVals = {};
        expVals[YIUI.BPMConstants.WORKITEM_INFO] = this.state.workitemInfo;
        return (<TemplateView
            formKey={formKey}
            oid={oid}
            status={'VIEW'}
            expVals={expVals}
        />);
    }
}
