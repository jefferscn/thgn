import React, { Component } from 'react';
import { AppDispatcher, BillformStore } from 'yes';
import {
    withNavigation,
    createMaterialTopTabNavigator,
} from 'react-navigation';
import DynamicView from './DynamicView';
import WorkitemView from './WorkitemView';
import FieldView from './FieldView';
// import { generateTabRouteConfig } from './util';
import './template';
import projectJSON from './config/project.json';
import loginJSON from './config/login.json';
import initialPageJSON from './config/initialPage.json';
import control from './config/control.js';
import { ControlMappings, Switch } from 'yes-platform';
import { generateTabRouter, generatePageRouter } from 'yes-router';
import generateRouteComponent from './util/generateRouteComponent';
import trinasolarAuthenticatedRoute from './util/AuthenticatedRoute';
import { Linking } from 'react-native';
import { getExtra } from './util/trinasolarApi';

const { sessionKey, serverPath, appName } = projectJSON;
const { template, tooltip, companyName, bgImagePath, logoImagePath } = loginJSON;

ControlMappings.defaultControlMapping.reg('checkbox', Switch);
let rootEl = null;
try {
    if (document) {
        rootEl = document.getElementById('app');
    }
} catch (e) {
    console.info(e.message);    // eslint-disable-line no-console
}
const appOptions = {
    sessionKey,
    serverPath,
    appName,
    rootEl,
    loginConfig: {
        template: control[template],
        tooltip,
        companyName,
        // bgImage: require(`${bgImagePath}`),
        // logoImage: require(`${logoImagePath}`),
    },

};

const TodoTab = createMaterialTopTabNavigator(
    {
        Unfinished: {
            screen: generateRouteComponent({
                formKey: 'TSL_ToDoList',
                title: '待办',
                key: 'TodoList',
                oid: -1,
                status: 'DEFAULT',
            }),
        },
        Focused: {
            screen: generateRouteComponent({
                formKey: 'OA_FocusWorkflow',
                title: '关注',
                key: 'focusworkflow',
                oid: -1,
                status: 'DEFAULT',
            }),

        },
    }, {
        headerMode: 'none',
        navigationOptions: {
            title: '我审批的',
        },
        // onTransitionStart: () => {
        //     AppDispatcher.dispatch({
        //         type: 'TRANSITIONSTART',
        //     });
        // },
        // onTransitionEnd: () => {
        //     AppDispatcher.dispatch({
        //         type: 'TRANSITIONEND',
        //     });
        // },
    }
);
const routes = {
    TodoList: {
        screen: TodoTab,
        path: 'TodoList',
        navigationOptions: {
            title: '我审批的',
        },
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
    WorkitemField: {
        screen: withNavigation(FieldView),
        path: 'WORKITEM/:wid/:field',
    },
    DynamicMulti: {
        screen: withNavigation(DynamicView),
        path: 'YESMOBILE/:metaKey/:status',
    },
};

let MainRouter = null;
switch (initialPageJSON.type) {
    case 'tab':
        MainRouter = generateTabRouter(initialPageJSON.tab, routes, generateRouteComponent);
        break;
    case 'custom':
        const customScreen = control[initialPageJSON.page];
        MainRouter = generatePageRouter(customScreen, routes);
        break;
    case 'page':
        const homeScreen = generateRouteComponent(initialPageJSON.page);
        MainRouter = generatePageRouter(homeScreen, routes);
        break;
    default:
}
// Tabs
// let MainTabNavigator;
// switch (initialPageJSON.type) {
//     case 'tab':
//         const routeConfig = generateTabRouteConfig(initialPageJSON.tab);
//         const tabNavigatorConfig = {
//             tabBarPosition: 'bottom',
//         };
//         MainTabNavigator = tabNavigator(routeConfig, tabNavigatorConfig);
//         break;
//     default:

// }

// function generateStackNavigator(customStackConfig, customRouteConfigMap) {
//     const defaultRouteConfigMap = {
//         Master: {
//             screen: MainTabNavigator,
//             path: 'master',
//         },
//         DynamicDetail: {
//             screen: withNavigation(DynamicView),
//             path: 'YESMOBILE/:metaKey/:id/:status',
//         },
//         DynamicDetail1: {
//             screen: withNavigation(DynamicView),
//             path: 'YES/:metaKey/:id/:status',
//         },
//         Workitem: {
//             screen: withNavigation(WorkitemView),
//             path: 'WORKITEM/:wid',
//         },
//         WorkitemField: {
//             screen: withNavigation(FieldView),
//             path: 'WORKITEM/:wid/:field',
//         },
//         DynamicMulti: {
//             screen: withNavigation(DynamicView),
//             path: 'YESMOBILE/:metaKey/:status',
//         },
//     };
//     const defaultStackConfig = {
//         headerMode: 'none',
//     };
//     const routeConfigMap = Object.assign(defaultRouteConfigMap, customRouteConfigMap);
//     const stackConfig = Object.assign(customStackConfig, defaultStackConfig);
//     return stackNavigator(routeConfigMap, stackConfig);
// }

// const stackConfigOfCard = {
//     mode: 'card',
// };
// const stackConfigOfModal = {
//     mode: 'modal',
//     cardStyle: {
//         backgroundColor: 'rgba(0,0,0,0.25)',
//         justifyContent: 'center',
//         paddingLeft: 24,
//         paddingRight: 24,
//     },
//     navigationOptions: {
//         header: null,
//     },
// };
// const MainCardNavigator = generateStackNavigator(stackConfigOfCard);
// const MainModalNavigator = generateStackNavigator(stackConfigOfModal, {
//     globalLoading: {
//         screen: LoadingComp,
//         path: 'globalLoading',
//     },
// });

// const MainNavigator = stackNavigator(
//     {
//         Card: {
//             screen: MainCardNavigator,
//             path: 'card',
//         },
//         Modal: {
//             screen: MainModalNavigator,
//             path: 'modal',
//         },

//     },
//     {
//         mode: 'card',
//         headerMode: 'screen',
//         cardStyle: {
//             backgroundColor: 'rgba(0,0,0,0.25)',
//             opacity: 1,
//         },
//         onTransitionStart: () => {
//             AppDispatcher.dispatch({
//                 type: 'TRANSITIONSTART',
//             });
//         },
//         onTransitionEnd: () => {
//             AppDispatcher.dispatch({
//                 type: 'TRANSITIONEND',
//             });
//         },
//     },
// );

AppDispatcher.register((action) => {
    switch (action.type) {
        case 'WORKFLOWCHANGE':
            setTimeout(() => {
                BillformStore.reloadFormData('TSL_ToDoList.-1');
            }, 0);
            break;
        default:
    }
});

Linking.getInitialURL = async () => {
    // const hash = (window || this).location.hash;
    // const relativePath = hash.slice(1);
    try {
        const extra = await getExtra();
        if (extra && extra.workflowItem) {
            const relativePath = `card/WORKITEM/${extra.workflowItem}`;
            return `://${relativePath}`;
        }
        return null;
    } catch (ex) {
        return null;
    }
};
// function MainNavigatorWrapper(props) {
//     return (
//         <MainNavigator
//             {...props}
//             screenProps={{
//                 firstArgument: 'hahage',
//             }}
//         />
//     );
// }

appOptions.router = MainRouter;
appOptions.mock = true;
appOptions.debug = true;
// appOptions.authenticatedRoute = trinasolarAuthenticatedRoute;
export default appOptions;
