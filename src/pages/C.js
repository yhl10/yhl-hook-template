import { useRecoilValue } from 'recoil'
import { testTextSelector } from '@/recoilStore/testStore/testStore'
export default function C() {
    const text = useRecoilValue(testTextSelector)
    return (
        <>
            <h1>Router C</h1>
            <div style={{ color: 'green' }}>Recoil text: {text}</div>
        </>
    )
}
