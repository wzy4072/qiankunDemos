import { getBaseDateConfig, getBaseInputConfig } from '@/utils/formDesignBaseConfig'
export default {
  tenantId: getBaseInputConfig(),
  typeId: getBaseInputConfig(),
  bifCode: getBaseInputConfig(),
  name: getBaseInputConfig(),
  isSystem: getBaseInputConfig(),
  isDomesticBank: getBaseInputConfig(),
  isBankForeign: getBaseInputConfig(),
  validSign: getBaseInputConfig(),
  createdTime: getBaseDateConfig(),
  updateTime: getBaseDateConfig()
}
