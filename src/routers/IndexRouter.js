import React, { Suspense } from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

const A = React.lazy(() => import('@pages/A'))
const B = React.lazy(() => import('@pages/B'))
const C = React.lazy(() => import('@pages/C'))
const D = React.lazy(() => import('@pages/D'))
const NotFound = React.lazy(() => import('./NotFound'))

export default function IndexRouter() {
    return (
        <Suspense
            fallback={<div>loading...</div>}
            maxDuration={500} // concurrent mode 下生效
        >
            <Router>
                <Switch>
                    <Redirect exact from="/" to="/aaa" />
                    <Route exact path="/aaa" component={A} />
                    <Route exact path="/bbb" component={B} />
                    <Route exact path="/ccc" component={C} />
                    <Route exact path="/ddd" component={D} />
                    <Route exact path="*" component={NotFound} />
                </Switch>
            </Router>
        </Suspense>
    )
}
