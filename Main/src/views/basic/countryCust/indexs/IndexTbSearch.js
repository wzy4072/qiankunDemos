import { getBaseDateConfig, getBaseInputConfig } from '@/utils/formDesignBaseConfig'

export default {
    groupId: getBaseInputConfig(),
    tenantId: getBaseInputConfig(),
    sysId: getBaseInputConfig(),
    nameZh: getBaseInputConfig(),
    nameEn: getBaseInputConfig(),
    curId: getBaseInputConfig(),
    enCode: getBaseInputConfig(),
    code: getBaseInputConfig(),
    timeZoneId: getBaseInputConfig(),
    validSign: getBaseInputConfig(),
    createdTime: getBaseDateConfig(),
    updateTime: getBaseDateConfig()
}
