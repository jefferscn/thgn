import React, { PureComponent } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Text } from 'react-native';
import { Components, History } from 'yes-platform';
import { HeaderBackButton } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { exitApp } from '../util/trinasolarApi';

const {
    BillForm,
} = Components;

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'column',
    },
    NavView: {
        flexDirection: 'row',
        paddingRight: 16,
        paddingTop: 16,
        paddingBottom: 16,
        backgroundColor: '#2196f3',
    },
    NavItemContainer: {
        flex: 1,
        paddingLeft: 16,
    },
    NavItem: {
        borderRadius: 4,
        height: 75,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    Category: {
    },
    CategoryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        position: 'absolute',
        left: 12,
        top: 20,
    },
    EntryContainer: {
        paddingTop: 60,
        flexDirection: 'row',
        paddingBottom: 20,
    },
    Entry: {
        width: '25%',
        alignItems: 'center',
    },
    EntryIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    EntryText: {
        paddingTop: 12,
    },
});
const entries = [
    {
        category: '出勤休假',
        items: [
            {
                icon: 'rocket',
                text: '请假',
                colorTop: '#00E68B 0%',
                colorBottom: '#00C853 100%',
            },
            {
                icon: '',
                text: '出差',
                colorTop: '',
                colorBottom: '',
                color: '',
            },
            {
                icon: '',
                text: '外出',
                colorTop: '',
                colorBottom: '',
                color: '',
            },
        ],
    },
    {
        category: '人事管理',
        items: [
            {
                icon: '',
                text: '招聘',
                color: '',
                colorTop: '',
                colorBottom: '',
            },
            {
                icon: '',
                text: '转正',
                color: '',
                colorTop: '',
                colorBottom: '',
            },
            {
                icon: '',
                text: '考核',
                color: '',
                colorTop: '',
                colorBottom: '',
            },
            {
                icon: '',
                text: '离职',
                color: '',
                colorTop: '',
                colorBottom: '',
            },
        ],
    },
];
export default class Home extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            title: '审批',
            headerLeft: (
                <HeaderBackButton onClick={exitApp} title="返回" />
            ),
            headerStyle: {
                backgroundColor: '#2196f3',
                color: 'white',
            },
        };
    };
    openTodoList = () => {
        History.push('card/TodoList');
    }
    render() {
        return (
            // <BillForm>
            <ScrollView style={styles.Container}>
                <View style={styles.NavView}>
                    <TouchableOpacity style={styles.NavItemContainer} onPress={this.openTodoList}>
                        <View style={styles.NavItem}>
                            <Text>我审批的</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.NavItemContainer} onPress={this.openTodoList}>
                        <View style={styles.NavItem}>
                            <Text>我发起的</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {
                    entries.map((category) =>
                        (
                            <View style={styles.Category}>
                                <Text style={styles.CategoryTitle}>{category.category}</Text>
                                <View style={styles.EntryContainer}>
                                    {
                                        category.items.map((entry) =>
                                            (
                                                <View style={styles.Entry}>
                                                    <View style={[styles.EntryIcon, { backgroundImage: `linear-gradient(to bottom,${entry.colorTop},${entry.colorBottom})` }]}>
                                                        <Icon
                                                            name={entry.icon}
                                                            size={20}
                                                            color={'#FFFFFF'}
                                                        />
                                                    </View>
                                                    <View style={styles.EntryText}>
                                                        <Text>{entry.text}</Text>
                                                    </View>
                                                </View>
                                            )
                                        )
                                    }
                                </View>
                            </View>
                        )
                    )
                }
            </ScrollView>
            // </BillForm>
        );
    }
}
