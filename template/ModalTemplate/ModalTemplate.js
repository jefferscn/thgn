import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { Dialog, DialogDefaultActions } from 'react-native-material-ui';
import defaultTemplateMapping from '../defaultTemplateMapping';
import CellLayoutTemplate from '../TabTemplate/CellLayoutTemplate';
import TabTemplateForm from '../TabTemplate';
class ModalTemplateForm extends TabTemplateForm{
    onActionPress = (action)=>{
        this.onControlClick(action);
    }

    renderContent(itemList){
        const { extraProps } = this.props;
        let items = [];

        Object.keys(itemList).forEach((key) => {
            const item = itemList[key];
            if(item.tagName==='gridlayoutpanel'){
                items= items.concat(item.items);
            }
        });

        items = items.filter((item)=>{
            return item.tagName!='button' && item.tagName!='label';
        });

        return (
            <Dialog fullWidth={true} style={{container:{width:'100%'}}}>
                <Dialog.Title><Text>{this.props.extraProps.title}</Text></Dialog.Title>
                    <Dialog.Content>
                        <CellLayoutTemplate
                            items = { items }
                            {...extraProps}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                    <DialogDefaultActions
                        actions={this.props.extraProps.actions}
                        onActionPress={this.onActionPress}
                    />
                    </Dialog.Actions>
            </Dialog>
        );

    }
}

defaultTemplateMapping.reg('modal', ModalTemplateForm);
export default ModalTemplateForm;;;