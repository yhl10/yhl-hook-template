import { useEffect, Suspense } from 'react'
import IndexRouter from '@routers/IndexRouter'
import './App.scss'

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
    // 异步selector 使用useRecoilValueLoadable消费
    // 或者组件外层套一层Suspense

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
                        <a href="#/ccc">ccc</a>
                    </li>
                    <li>
                        <a href="#/ddd">ddd</a>
                    </li>
                    <li>
                        <a href="#/zxc">not found</a>
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
