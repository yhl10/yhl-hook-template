import { useEffect, Suspense } from 'react'
import IndexRouter from '@routers/IndexRouter'
import { useRecoilValue } from 'recoil'
import {
    testTextSelector,
    testPromise,
} from '@/recoilStore/testStore/testStore'

function SuspenseWrap(Component) {
    return function NoNameComponent(props) {
        return (
            <Suspense fallback={<div>loading...</div>}>
                <Component {...props} />
            </Suspense>
        )
    }
}

function App(props) {
    const text = useRecoilValue(testTextSelector)

    // 异步selector 使用useRecoilValueLoadable消费
    // 或者组件外层套一层Suspense
    const promiseValue = useRecoilValue(testPromise)

    // const promiseValue = useRecoilValueLoadable(testPromise);
    // const getPromise = recoilValueLoadable => {
    //     const {state, contents} = recoilValueLoadable;
    //     if(state === 'loading') {
    //         return 'loading...';
    //     }else if(state === 'hasValue') {
    //         return contents;
    //     }
    // }

    useEffect(() => {
        console.log(props)
    }, [props])

    return (
        <div className="app-wrap">
            <nav>
                <ul>
                    <li>
                        <a href="#/aaa">aaa</a>
                    </li>
                    <li>
                        <a href="#/bbb">bbb</a>
                    </li>
                    <li>
                        <a href="#/zxc">not found</a>
                    </li>
                    <li style={{ color: 'green' }}>
                        recoil default value is: {text}
                    </li>
                    <li style={{ color: 'red' }}>
                        recoil default promiseValue is: {promiseValue}
                        {/* {getPromise(promiseValue)} */}
                    </li>
                </ul>
            </nav>
            <section>
                <IndexRouter />
            </section>
        </div>
    )
}

export default SuspenseWrap(App)
