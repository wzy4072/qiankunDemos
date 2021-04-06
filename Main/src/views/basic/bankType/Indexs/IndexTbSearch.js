import { getBaseDateConfig, getBaseSelectConfig } from '@/utils/formDesignBaseConfig'
import { dict, dictGroup } from '@/components/Dict/dictUtil'

dictGroup('yesOrNo')
export default {
    validSign_eq: () => {
        const validSignSelect = getBaseSelectConfig()
        const yes = dict('yesOrNo', '1')
        const no = dict('yesOrNo', '0')
        validSignSelect.options.options = [{ label: yes, value: '1' }, { label: no, value: '0' }]
        return validSignSelect
    },
    isDomesticBank_eq: () => {
        const isDomesticBankSelect = getBaseSelectConfig()
        const yes = dict('yesOrNo', '1')
        const no = dict('yesOrNo', '0')
        isDomesticBankSelect.options.options = [{ label: yes, value: '1' }, { label: no, value: '0' }]
        return isDomesticBankSelect
    },
    netbankCfcaDate: getBaseDateConfig(),
    createdTime: getBaseDateConfig(),
    updateTime: getBaseDateConfig()
}
