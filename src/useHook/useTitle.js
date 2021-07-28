import { useRef, useEffect, useState } from 'react'

export default function useTitle(initTitle) {
    const prevTitle = useRef(initTitle)

    const [title, setTitle] = useState('')

    useEffect(() => {
        document.title = initTitle
    }, [initTitle])

    useEffect(() => {
        const newTitle =
            title.length > 0
                ? prevTitle.current + ' - ' + title
                : prevTitle.current
        document.title = newTitle
    }, [title])

    return setTitle
}
