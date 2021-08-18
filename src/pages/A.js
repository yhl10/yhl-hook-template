import Buttons from '@/components/Buttons/Buttons'
import { useLocation } from 'react-router-dom'
import useTitle from '@useHook/useTitle'
import { queryString } from '@utils'
import { useRecoilState } from 'recoil'
import { testTextSelector } from '@/recoilStore/testStore/testStore'

export default function A() {
    const setTitle = useTitle('A')
    const { search } = useLocation()
    const { ids, name } = queryString(search)
    const [text, setText] = useRecoilState(testTextSelector)

    return (
        <>
            <h1>Router A</h1>
            {Object.keys(queryString(search)).length > 0 && (
                <div>
                    <span>PageB jump to here,</span>
                    <span>&nbsp;id is: {ids}</span>
                    <span>&nbsp;and name is: {name}</span>
                </div>
            )}
            <div style={{ color: 'green' }}>Recoil text: {text}</div>
            <Buttons
                text="both read and write"
                onClick={() => setText('both read and write')}
            />
            <Buttons text="tab1" onClick={() => setTitle('tab1')} />
            <Buttons text="tab2" onClick={() => setTitle('tab2')} />
        </>
    )
}
