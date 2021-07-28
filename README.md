# Description

- prettier以插件方式注入eslint规则中
- eslint-watch根据prettier规则自动修复代码格式（错误并不能修复），**不局限于IDE配置**
- 使用craco扩展cra webpack配置，目前Snowpack和Vite问题较多，生态不完善，暂不考虑使用
- 抽离craco部分（proxy和alias）配置
- 采用recoil管理状态（理念同Hook，即插即用）
- 自定义Hook，实现逻辑和UI分离、组件高度复用
- 路由动态导入，尽量减少bundle包大小
- 第三方库抽离，尽量减少主入口包大小，同时加快首页渲染
- 老项目框架实用代码可以集成进来，主要是axios那一套
- 还没想到。。。

# TODO

- 微前端解决方案：暂时考虑Single-Spa和Qiankun
- 自制一个CLI，以后公司所有新项目通过该CLI统一管理一套代码模板，类Create-React-App，往内部添加业务代码即可
- 从JavaScript往TypeScript迁移