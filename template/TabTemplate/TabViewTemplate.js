import React from 'react';
import { DynamicControl, getMappedComponentHOC } from 'yes'; // eslint-disable-line import/no-unresolved
import { Components } from 'yes-native'; // eslint-disable-line import/no-unresolved
import CellLayoutTemplate from './CellLayoutTemplate';
import controls from '../../config/control.js';

const CellLayout = getMappedComponentHOC(CellLayoutTemplate);
const { TabView, TextGrid } = Components;
class TabViewTemplate extends TabView {
    componentWillMount() {
        const routes = this.props.itemList.map((item, index) => ({
            key: item.key || index,
            title: item.caption,
            tagName: item.tagName,
            items: item.items,
        }));
        this.setState({
            routes,
            loading: false,
        });
    }
    renderScene = ({ route }) => { // eslint-disable-line react/prop-types
        const metaKey = route.key;
        let props = {};
        if (this.props.controls && this.props.controls[metaKey]) {
            props = this.props.controls[metaKey];
        }
        if (route.tagName === 'gridlayoutpanel') {
            const newItems = [];
            route.items.forEach((item) => {
                if (item.tagName !== 'label') {
                    newItems.push(item);
                }
            });
            return (
                <CellLayout
                    items={newItems}
                    yigoid={route.key}
                    {...props}
                />
            );
        }
        if (route.tagName === 'grid') {
            if (this.props.controls && this.props.controls[metaKey]) {
                return <TextGrid yigoid={metaKey} {...this.props.controls[metaKey]} />;
            }
        }
        this.calculateElement(props);
        return <DynamicControl yigoid={route.key} {...props} />;
    }
    calculateElement(props) {
        if (props.control && typeof props.control === 'string') {
            props['control'] = controls[props.control];
        }
        for (const key in props) {
            const ele = props[key];
            if (ele && ele.type === 'element') {
                const Control = controls[ele.elementType];
                props[key] = <Control {...ele.elementProps} />;
            }
        }
    }
}

export default TabViewTemplate;
// export default getMappedComponentHOC(TabViewTemplate);
