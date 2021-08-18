import { useList } from '@/useHook/useList'

export default function List() {
    const { list } = useList()
    return (
        <ul className="d-ul">
            {list.map(item => (
                <li key={item.id}>{item.name}</li>
            ))}
        </ul>
    )
}
