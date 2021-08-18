import { useEffect, useCallback } from 'react'
import { post } from '@utils/request'
import { listSelector } from '@/recoilStore/testStore/testStore'
import { useRecoilState } from 'recoil'
export function useList() {
    const [list, setList] = useRecoilState(listSelector)

    const getList = useCallback(async () => {
        const res = await post('/api/list')
        const { code, data } = res
        if (code === 200) {
            setList(data ?? [])
        } else {
            setList([])
        }
    }, [setList])

    useEffect(() => {
        getList()
    }, [getList])

    return { list, getList }
}
