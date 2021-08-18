import { message } from 'antd'
import { useHistory } from 'react-router-dom'
import useTitle from '@useHook/useTitle'
import { useSetRecoilState, useResetRecoilState } from 'recoil'
import { testTextSelector } from '@/recoilStore/testStore/testStore'

export default function B() {
    useTitle('B')
    const changeRecoil = useSetRecoilState(testTextSelector)
    const resetRecoil = useResetRecoilState(testTextSelector)

    const history = useHistory()

    const gotoA = () => {
        history.replace({
            pathname: '/aaa',
            search: 'ids=1234&name=yyy',
        })
    }

    const onlyChange = word => {
        changeRecoil(word)
        message.success(`recoil value after change is: "${word}"`)
    }

    const onlyReset = () => {
        message.success(`recoil value has reset`)
        resetRecoil()
    }

    return (
        <>
            <h1>Router B</h1>
            <button onClick={gotoA}>goto routerA</button>
            <button onClick={() => onlyChange('new text')}>onlyChange</button>
            <button onClick={onlyReset}>onlyReset</button>
        </>
    )
}
