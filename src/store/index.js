import { Store } from 'flux/utils';
import { AppDispatcher } from 'yes';

let todoListCount = 0;

class TodoListStore extends Store {
    __onDispatch(action) {
        switch (action.type) {
        case 'RECEIVETODOLIST':
            todoListCount = action.data.totalRecords;
            this.__emitChange();
            break;
        default:

        }
    }
    getCount() {
        return todoListCount;
    }
}

export default new TodoListStore(AppDispatcher);
