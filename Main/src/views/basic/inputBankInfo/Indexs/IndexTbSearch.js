import { getBaseDateConfig, getBaseInputConfig } from '@/utils/formDesignBaseConfig'

export default {
    tenantId: getBaseInputConfig(),
    sysBankCode: getBaseInputConfig(),
    bankName: getBaseInputConfig(),
    bankPrefix: getBaseInputConfig(),
    bankCityCode: getBaseInputConfig(),
    ibpsCode: getBaseInputConfig(),
    prov: getBaseInputConfig(),
    city: getBaseInputConfig(),
    bankTypeId: getBaseInputConfig(),
    createdTime: getBaseDateConfig(),
    updateTime: getBaseDateConfig()
}
