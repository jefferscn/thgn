export const getSsoToken = () => {
    return new Promise((resolve, reject) => {
        try {
            cordova.exec((data) => {
                localStorage.setItem('ssoToken', data.ssoToken);
                resolve(data.ssoToken);
            }, (data) => {
                reject(data);
            }, 'MideaUser', 'getUser', []);
        } catch (e) {
            reject(e);
        }
    }, false);
};

export const exitApp = () => {
    cordova.exec((success) => {
    }, (error) => {
    }, 'MideaCommon', 'exit', []);
};

export const getExtra = () => {
    return new Promise((resolve, reject) => {
        cordova.exec((data) => {
            resolve(data.extra);
        }, (error) => {
            reject(error);
        }, 'MideaCommon', 'getExtra', ['com.trinasolar.bpm']);
    });
};
