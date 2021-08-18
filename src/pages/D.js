import { useRef, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { testPromise } from '@/recoilStore/testStore/testStore'
import List from '@components/List/List'
import ListSelect from '@components/List/ListSelect'
import './D.scss'
export default function D() {
    const data = useRecoilValue(testPromise)

    const zone = useRef()

    useEffect(() => {
        const { width, height } = zone.current.getBoundingClientRect()
        console.log(width, height)
    }, [])

    return (
        <div className="router-d-wrap">
            <ListSelect />
            <section>
                <div ref={ele => (zone.current = ele)} className="zone">
                    Router D={data}
                </div>
            </section>
            <List />
        </div>
    )
}
