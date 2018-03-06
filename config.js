import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Picker } from 'react-native';
import { actions, AppDispatcher, BillformStore } from 'yes';
import {Components} from 'yes-native';   // eslint-disable-line
import {
    StackNavigator as stackNavigator,
    TabNavigator as tabNavigator,
    withNavigation,
} from 'react-navigation';
import DynamicView from './DynamicView';
import WorkitemView from './WorkitemView';
import { generateTabRouteConfig } from './util';
import './template';
import projectJSON from './config/project.json';
import loginJSON from './config/login.json';
import initialPageJSON from './config/initialPage.json';
import control from './config/control.json';
const { sessionKey, serverPath, appName } = projectJSON;
const { template, tooltip, companyName, bgImagePath, logoImagePath } = loginJSON;
const { LoadingComp } = Components;
let rootEl = null;
try {
    if (document) {
        rootEl = document.getElementById('app');
    }
} catch (e) {
    console.info(e.message);    // eslint-disable-line no-console
}
console.log(control);
const appOptions = {
    sessionKey,
    serverPath,
    appName,
    rootEl,
    loginConfig: {
        template: control[template],
        tooltip,
        companyName,
        bgImage: require(`${bgImagePath}`),
        logoImage: require(`${logoImagePath}`),
    },

};
// Tabs
let MainTabNavigator;
switch (initialPageJSON.type) {
    case 'tab':
        const routeConfig = generateTabRouteConfig(initialPageJSON.tab);
        const tabNavigatorConfig = {
            tabBarPosition: 'bottom',
        };
        MainTabNavigator = tabNavigator(routeConfig, tabNavigatorConfig);
        break;
    default:

}

function generateStackNavigator(customStackConfig, customRouteConfigMap) {
    const defaultRouteConfigMap = {
        Master: {
            screen: MainTabNavigator,
            path: 'master',
        },
        DynamicDetail: {
            screen: withNavigation(DynamicView),
            path: 'YESMOBILE/:metaKey/:id/:status',
        },
        DynamicDetail1: {
            screen: withNavigation(DynamicView),
            path: 'YES/:metaKey/:id/:status',
        },
        Workitem: {
            screen: withNavigation(WorkitemView),
            path: 'WORKITEM/:wid',
        },
        DynamicMulti: {
            screen: withNavigation(DynamicView),
            path: 'YESMOBILE/:metaKey/:status',
        },
    };
    const defaultStackConfig = {
        headerMode: 'none',
    };
    const routeConfigMap = Object.assign(defaultRouteConfigMap, customRouteConfigMap);
    const stackConfig = Object.assign(customStackConfig, defaultStackConfig);
    return stackNavigator(routeConfigMap, stackConfig);
}

const stackConfigOfCard = {
    mode: 'card',
};
const stackConfigOfModal = {
    mode: 'modal',
    cardStyle: {
        backgroundColor: 'rgba(0,0,0,0.25)',
        justifyContent: 'center',
        paddingLeft: 24,
        paddingRight: 24,
    },
    navigationOptions: {
        header: null,
    },
};
const MainCardNavigator = generateStackNavigator(stackConfigOfCard);
const MainModalNavigator = generateStackNavigator(stackConfigOfModal, {
    globalLoading: {
        screen: LoadingComp,
        path: 'globalLoading',
    },
});

const MainNavigator = stackNavigator(
    {
        Card: {
            screen: MainCardNavigator,
            path: 'card',
        },
        Modal: {
            screen: MainModalNavigator,
            path: 'modal',
        },

    },
    {
        mode: 'card',
        headerMode: 'screen',
        cardStyle: {
            backgroundColor: 'rgba(0,0,0,0.25)',
            opacity: 1,
        },
        onTransitionStart: () => {
            AppDispatcher.dispatch({
                type: 'TRANSITIONSTART',
            });
        },
        onTransitionEnd: () => {
            AppDispatcher.dispatch({
                type: 'TRANSITIONEND',
            });
        },
    },
);
AppDispatcher.register((action) => {
    switch (action.type) {
        case 'WORKFLOWCHANGE':
            setTimeout(() => {
                BillformStore.reloadFormData('OA_ToDoList.-1');
            }, 0);
            break;
        default:
    }
});

function MainNavigatorWrapper(props) {
    return (
        <MainNavigator
            {...props}
            screenProps={{
                firstArgument: 'hahage',
            }}
        />
    );
}

appOptions.router = MainNavigatorWrapper;
appOptions.mock = true;
appOptions.debug = true;
export default appOptions;
