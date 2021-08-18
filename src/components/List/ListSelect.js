import { Select } from 'antd'
import { listSelector } from '@/recoilStore/testStore/testStore'
import { useRecoilValue } from 'recoil'
const { Option } = Select

export default function ListSelect() {
    const list = useRecoilValue(listSelector)
    return (
        <Select className="d-select" style={{ width: 120 }}>
            {list.map(item => (
                <Option key={item.id} value={item.name}>
                    {item.name}
                </Option>
            ))}
        </Select>
    )
}
