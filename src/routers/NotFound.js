import {useHistory} from 'react-router-dom';

export default function NotFound() {
    const history = useHistory();

    const onBackHome = () => {
        history.replace('/');
    }
    const onBackPrev = () => {
        history.go(-1);
    }
    return (
        <>
            <h1>404</h1>
            <button onClick={onBackHome}>返回首页</button>
            <button onClick={onBackPrev}>返回上一级</button>
        </>
    )
}