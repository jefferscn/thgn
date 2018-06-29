import { AppDispatcher } from 'yes';

export const refreshTodoList = async () => {
    // const url = `${Svr.SvrMgr.ServletURL}/../Pending-list.action`;
    // const response = await fetch(url, {
    //     method: 'POST',
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     credentials: 'include',
    //     body: 'no=2&pageNo=0',
    // });
    // let result = response.json();
    const result = {
        totalRecords: 10,
    };
    AppDispatcher.dispatch({
        type: 'RECEIVETODOLIST',
        data: result,
    });
};
