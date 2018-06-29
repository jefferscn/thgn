import React, { PureComponent } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Text } from 'react-native';
import { Components, History } from 'yes-platform';
import { HeaderBackButton } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { exitApp } from '../util/trinasolarApi';
import TodoBadget from './TodoBadget';
import { refreshTodoList } from '../store/actions';
import { I18nManager } from 'react-native';
import todoImg from '../img/myTodo.svg';
import frommeImg from '../img/fromme.svg';

const {
    BillForm,
} = Components;

const styles = StyleSheet.create({
    NavTitle: {
        color: 'white',
        justifyContent: 'center',
        display: 'flex',
        flex: 1,
    },
    BackButton: {
        height: 24,
        width: 24,
        margin: 16,
        fontSize: 36,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        resizeMode: 'contain',
        transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
    Image: {
        height: 30,
        paddingRight: 6,
    },
    Text: {
        paddingLeft: 20,
    },
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
        flexDirection: 'row',
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
                <HeaderBackButton backImage={<Icon style={styles.BackButton} name='angle-left' />} onPress={exitApp} title="返回" />
            ),
            headerTitleStyle: styles.NavTitle,
            headerStyle: {
                backgroundColor: '#2196f3',
                color: 'white',
            },
        };
    };
    openTodoList = () => {
        History.push('card/TodoList');
    }
    componentDidMount() {
        this.timer = setInterval(refreshTodoList, 60 * 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    componentWillMount() {
        setTimeout(refreshTodoList, 0);
    }
    render() {
        return (
            // <BillForm>
            <ScrollView style={styles.Container}>
                <View style={styles.NavView}>
                    <TouchableOpacity style={styles.NavItemContainer} onPress={this.openTodoList}>
                        <View style={styles.NavItem}>
                            <TodoBadget>
                                <img alt="" style={{ height: 30 }} src={todoImg} />
                            </TodoBadget>
                            <Text style={styles.Text}>我审批的</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.NavItemContainer} onPress={this.openTodoList}>
                        <View style={styles.NavItem}>
                            <img alt="" style={{ height: 30 }} src={frommeImg} />
                            <Text style={styles.Text}>我发起的</Text>
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
