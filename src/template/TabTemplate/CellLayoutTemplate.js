import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { TableView, Section } from 'react-native-tableview-simple';
import { Components } from 'yes-platform'; // eslint-disable-line import/no-unresolved
import { DynamicControl, controlVisibleWrapper, notEmptyVisibleWrapper } from 'yes'; // eslint-disable-line import/no-unresolved

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

const RelatedSection = controlVisibleWrapper(Section);
const NotEmptyRelatedSection = notEmptyVisibleWrapper(Section);
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
        createElement: PropTypes.func,
    }

    renderSection(section) {
        let S = Section;
        if (section.visibleNotEmpty) {
            S = NotEmptyRelatedSection;
        }
        if (section.visibleRelation) {
            S = RelatedSection;
        }

        return (
            <S yigoid={section.visibleRelation || section.visibleNotEmpty} sectionPaddingTop={10} sectionPaddingBottom={0} header={section.caption} hideSeparator>
                {
                    section.items.map((item) => {
                        if (item.type === 'element') {
                            return this.context.createElement(item);
                        }
                        return (
                            <DynamicControl
                                key={item.key || item}
                                yigoid={item.key || item}
                                isCustomLayout
                                showLabel={false}
                                contentContainerStyle={{ justifyContent: 'flex-end', alignItems: 'center' }}
                                // hideWhenEmptyValue
                                layoutStyles={{ minHeight: 44, textAlign: 'right' }}
                                layout={this.getLayout(item)}
                                {...this.context.getControlProps(item.key || item)}
                            />
                        )
                    })
                }
            </S>
        );
    }

    getLayout(item) {
        if (!item.layoutType || item.layoutType === 'cell') {
            return <CellLayout titleStyle={styles.textStyle} divider title={item.caption} />;
        }
        return null;
    }

    render() {
        if (this.props.isGrid) {
            return (<View style={{ flex: 1 }}>
                <DynamicControl
                    key={this.props.grid}
                    yigoid={this.props.grid}
                    isCustomLayout
                    {...this.context.getControlProps(this.props.grid)}>
                </DynamicControl>
            </View>);
        }
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
                                                contentContainerStyle={{ justifyContent: 'flex-end', alignItems: 'center' }}
                                                showLabel={false}
                                                // hideWhenEmptyValue
                                                layoutStyles={{ minHeight: 44, textAlign: 'right' }}
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
                                            contentContainerStyle={{ justifyContent: 'flex-end', alignItems: 'center' }}
                                            // hideWhenEmptyValue
                                            layoutStyles={{ minHeight: 44, textAlign: 'right' }}
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
