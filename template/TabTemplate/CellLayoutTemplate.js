import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TableView, Section } from 'react-native-tableview-simple';
import { Components } from 'yes-native'; // eslint-disable-line import/no-unresolved
import { DynamicControl } from 'yes'; // eslint-disable-line import/no-unresolved

const { ScrollView, Layout } = Components;
const { CellLayout } = Layout;
const styles = {
    textStyle: {
        color: 'gray',
        wordWrap: 'break-word',
        whiteSpace: 'pre-wrap',
    },
    textContainerStyle: {
        flexBasis: 0,
    },
};
class CellLayoutTemplate extends Component {  // eslint-disable-line
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape({
            tagName: PropTypes.string,
            key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            caption: PropTypes.string,
        })),
    };

    static contextTypes = {
        getControlProps: PropTypes.func,
    }

    renderSection(section) {
        return (
            <Section header={section.caption} hideSeparator>
                {
                    section.items.map((item) => (
                        <DynamicControl
                            key={item.key || item}
                            yigoid={item.key || item}
                            isCustomLayout
                            showLabel={false}
                            hideWhenEmptyValue
                            layoutStyles={{ minHeight: 44, justifyContent: 'flex-end', alignItems: 'center', textAlign: 'right' }}
                            layout={this.getLayout(item)}
                            {...this.context.getControlProps(item.key || item)}
                        />
                    )
                    )
                }
            </Section>
        );
    }

    getLayout(item) {
        if (!item.layoutType || item.layoutType === 'cell') {
            return <CellLayout titleStyle={styles.textStyle} divider title={item.caption} />;
        }
        return null;
    }

    render() {
        return (
            <ScrollView>
                <TableView>
                    {
                        this.props.items.map((section) =>
                            (
                                section.isGroup ? this.renderSection(section) :
                                    section.items ?
                                        section.items.map((item) => (
                                            <DynamicControl
                                                key={item.key || item}
                                                yigoid={item.key || item}
                                                isCustomLayout
                                                showLabel={false}
                                                hideWhenEmptyValue
                                                layoutStyles={{ minHeight: 44, justifyContent: 'flex-end', alignItems: 'center', textAlign: 'right' }}
                                                layout={this.getLayout(item)}
                                                {...this.context.getControlProps(item.key || item)}
                                            />
                                        )
                                        ) :
                                        <DynamicControl
                                            key={section.key || section}
                                            yigoid={section.key || section}
                                            isCustomLayout
                                            showLabel={false}
                                            hideWhenEmptyValue
                                            layoutStyles={{ minHeight: 44, justifyContent: 'flex-end', alignItems: 'center', textAlign: 'right' }}
                                            layout={this.getLayout(section)}
                                            {...this.context.getControlProps(section.key || section)}
                                        />
                            )
                        )
                    }
                </TableView>
            </ScrollView>
        );
    }
}

export default CellLayoutTemplate;
