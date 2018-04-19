import React from 'react';
import { DynamicControl, getMappedComponentHOC } from 'yes'; // eslint-disable-line import/no-unresolved
import { TabView, Components } from 'yes-platform'; // eslint-disable-line import/no-unresolved
import CellLayoutTemplate from './CellLayoutTemplate';
// import TabView from './TabView;

const CellLayout = getMappedComponentHOC(CellLayoutTemplate);
// const { TabView, TextGrid } = Components;
class TabViewTemplate extends TabView {
    componentWillMount() {
        const routes = this.props.itemList.map((item, index) => ({
            key: item.key || index,
            title: item.caption,
            layoutType: item.layoutType,
            items: item.items,
        }));
        this.setState({
            routes,
            loading: false,
        });
    }
    renderScene = ({route}) => { // eslint-disable-line react/prop-types
        return (
            <CellLayout
                items={route.items}
                layoutType={route.layoutType}
                yigoid={route.key}
            />
        );
    }
}

export default TabViewTemplate;
// export default getMappedComponentHOC(TabViewTemplate);
