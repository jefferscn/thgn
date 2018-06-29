import React from 'react';
import { ScrollView } from 'react-native';
import { Components } from 'yes-platform'; // eslint-disable-line import/no-unresolved
import { getMappedComponentHOC } from 'yes'; // eslint-disable-line import/no-unresolved
import defaultTemplateMapping from '../defaultTemplateMapping';
import CellLayoutTemplate from '../TabTemplate/CellLayoutTemplate';

const { DynamicBillForm, LoadingComp } = Components;
class NormalTemplate extends DynamicBillForm {
    buildChildren() {
        const { items } = this.props;
        const form = this.getBillForm();
        if (form) {
            return (<ScrollView><CellLayoutTemplate
                items={items}
            /></ScrollView>);
        }
        return <LoadingComp icon="loading" show>加载中...</LoadingComp>; // eslint-disable-line react/jsx-no-undef, max-len
    }
}
const WrappedNormalTemplate = getMappedComponentHOC(NormalTemplate);
defaultTemplateMapping.reg('normal', WrappedNormalTemplate);
export default WrappedNormalTemplate;
