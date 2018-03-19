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
class CellLayoutTemplate extends Component {  // eslint-disable-line
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape({
            tagName: PropTypes.string,
            key: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
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
                                key={item.key}
                                yigoid={item.key}
                                isCustomLayout
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
