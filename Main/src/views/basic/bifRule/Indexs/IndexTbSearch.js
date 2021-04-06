import { getBaseSelectConfig } from '@/utils/formDesignBaseConfig'

export default {
    bifCode_eq: () => {
        const bifCodeSelect = getBaseSelectConfig()
        bifCodeSelect.options.dynamic = true
        bifCodeSelect.options.dynamicKey = 'bifCode'
        return bifCodeSelect
    }
}
