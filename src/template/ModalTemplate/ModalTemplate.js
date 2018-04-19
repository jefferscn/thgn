import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { Dialog, DialogDefaultActions } from 'react-native-material-ui';
import defaultTemplateMapping from '../defaultTemplateMapping';
import CellLayoutTemplate from '../TabTemplate/CellLayoutTemplate';
import { DynamicBillForm } from 'yes-platform';
import { getMappedComponentHOC } from 'yes'; // eslint-disable-line import/no-unresolved

class ModalTemplateForm extends DynamicBillForm {
    onActionPress = (action) => {
        this.onControlClick(action);
    }

    buildChildren() {
        return (
            <Dialog fullWidth style={{ container: { width: '100%' } }}>
                <Dialog.Title><Text>{this.props.title}</Text></Dialog.Title>
                <Dialog.Content>
                    <CellLayoutTemplate
                        items={this.props.items}
                        {...this.props}
                    />
                </Dialog.Content>
                <Dialog.Actions>
                    <DialogDefaultActions
                        actions={this.props.actions}
                        onActionPress={this.onActionPress}
                    />
                </Dialog.Actions>
            </Dialog>
        );
    }
}

const WrappedModalTemplate = getMappedComponentHOC(ModalTemplateForm);
defaultTemplateMapping.reg('modal', WrappedModalTemplate);
export default WrappedModalTemplate;
