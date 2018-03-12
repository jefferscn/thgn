import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Components } from 'yes-native'; // eslint-disable-line import/no-unresolved
import { DynamicControl } from 'yes'; // eslint-disable-line import/no-unresolved

const { ScrollView, Layout } = Components;
const { CellLayout } = Layout;
const styles = {
    textStyle: {
        color: 'gray',
    },
};
console.log('layout');
console.log(Layout);
class CellLayoutTemplate extends Component {  // eslint-disable-line
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape({
            tagName: PropTypes.string,
            key: PropTypes.number,
            caption: PropTypes.string,
        })),
    };
    render() {
        return (
            <ScrollView>
                {
                    this.props.items.map((item) =>
                        (
                            <DynamicControl
                                yigoid={item.key}
                                isCustomLayout={true}
                                layoutStyles={{ minHeight: 44 }}
                                layout={<CellLayout divider titleStyle={styles.textStyle} title={item.caption} />}
                            />
                        )
                    )
                }
            </ScrollView>
        );
    }
}

export default CellLayoutTemplate;
