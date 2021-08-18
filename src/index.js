import React from 'react'
import ReactDOM from 'react-dom'
import { RecoilRoot } from 'recoil'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import reportWebVitals from './reportWebVitals'
import App from './App'
import 'moment/locale/zh-cn'
import 'antd/dist/antd.css'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import 'reset-css'
ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <React.StrictMode>
            <RecoilRoot>
                <App name="app" />
            </RecoilRoot>
        </React.StrictMode>
    </ConfigProvider>,
    document.getElementById('root'),
)

reportWebVitals()
