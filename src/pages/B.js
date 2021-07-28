import {useHistory} from 'react-router-dom';
import useTitle from '@useHook/useTitle';
import {useSetRecoilState, useResetRecoilState} from 'recoil';
import {testTextSelector} from '@/recoilStore/testStore/testStore';

export default function B() {
    useTitle('B');
    const changeRecoil = useSetRecoilState(testTextSelector);
    const resetRecoil = useResetRecoilState(testTextSelector);

    const history = useHistory();

    const gotoA = () => {
        history.replace({pathname: '/aaa', search: 'ids=1234&name=yyy'})
    }

    return (
        <>
            <h1>Router B</h1>
            <button onClick={gotoA}>gotoA</button>
            <button onClick={() => changeRecoil('new text')}>onlyChange</button>
            <button onClick={resetRecoil}>onlyReset</button>
        </>
    )
}