import { Button } from 'antd'
import style from './Buttons.module.scss'

export default function Buttons({ text, onClick }) {
    return (
        <Button className={style['blue-color']} onClick={onClick}>
            {text}
        </Button>
    )
}
