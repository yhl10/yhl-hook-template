import { queryString } from '../utils'
import { add } from '../utils/add'
describe('some test', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(add(1, 2)).toBe(3)
    })
    test('adds 1 + 2 to equal 3', () => {
        expect(queryString('?name=a')).toStrictEqual({ name: 'a' })
    })
})
