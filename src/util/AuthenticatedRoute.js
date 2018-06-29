/*
 * @Author: gmf
 * @Date:   2016-03-08 15:27:21
 * @Last Modified by:   gmf
 * @Last Modified time: 2017-02-20 09:15:19
 */

import React, { Component } from 'react';
import AppStatus from 'yes/dist/stores/AppStatus';
import { Container } from 'flux/utils';
// import { UIOptCenter } from '../../yes_ext';
import { Svr, getUserInfo, loadHistory, setSession, setUserInfo } from 'yes-core';
import { Logined as logined, Logouted as logouted } from 'yes/dist/actions/AppStatusAction';
import AppDispatcher from 'yes/dist/dispatchers/AppDispatcher';
// import { getUserInfo, loadHistory, setSession } from 'yes/dist/session';
import { getSsoToken, exitApp } from './trinasolarApi';
import { LoadingComp } from 'yes-platform';

const AuthenticatedRoute = (BaseComponent, LoginComponent, key) => {
    class AuthenticatedComponent extends Component {
        static getStores() {
            return [AppStatus];
        }

        static calculateState() {
            return {
                state: AppStatus.getState(),
            };
        }

        async componentDidMount() {
            await loadHistory();
            // 这里需要与服务器进行环境同步，主要是根据当前前台的cookie
            // 读取后台对应的登录信息,
            if (!this.state.state.get('inited')) {
                try {
                    await loadHistory();
                    // await UIOptCenter.checkLogin();
                    await Svr.SvrMgr.loadTreeMenu();
                    // 能执行到这里说明缓存中的session没有过期，可以拿出来直接使用
                    const userinfo = getUserInfo();
                    AppDispatcher.dispatch(logined(userinfo));
                } catch (ex) {
                    // AppDispatcher.dispatch(logouted());
                    try {
                        const ssoToken = await getSsoToken();
                        const resp = await fetch(`${Svr.SvrMgr.ServletURL}/../trinasolarlogin?ssoToken=${ssoToken}`, {
                            credentials: 'include',
                        });
                        const result = await resp.json();
                        await setSession(result.clientID);
                        const userInfo = {
                            id: result.UserID,
                            name: result.UserName,
                            clientID: result.clientID,
                        };
                        await setUserInfo(userInfo);
                        await Svr.SvrMgr.syncServerDate();
                        AppDispatcher.dispatch(logined(userInfo));
                    } catch (e) {
                        console.log(e);
                        // exitApp();
                    }
                }
            }
        }

        render() {
            if (this.state.state.get('inited')) {
                if (AppStatus.isLogined()) {
                    return (<BaseComponent {...this.props} />);
                }
                return (<LoginComponent {...this.props} />);
            }
            return <LoadingComp icon="loading" show>初始化...</LoadingComp>;
        }
    }
    const result = Container.create(AuthenticatedComponent);
    if (key) {
        result.prototype.key = key;
    }
    return result;
};
export default AuthenticatedRoute;
