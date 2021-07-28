import {atom, selector} from 'recoil';
import {post} from '@utils/request';

const testTextAtom = atom({
    key: 'testTextAtom',
    default: 'defaultTestText',
})

export const testTextSelector = selector({
    key: 'testTextSelector',
    get: ({get}) => {
        const value = get(testTextAtom);
        return value;
    },
    set: ({set}, newValue) => {
        set(testTextAtom, newValue);
    }
})

export const testPromise = selector({
    key: 'testPromise',
    get: async () => {
        const value = await post('/api/recoil');
        const {code, data} = value;
        if(code === 200) {
            return data;
        }
        return 'some error happen';
    },
})