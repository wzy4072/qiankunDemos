import { getBaseDateConfig, getBaseInputConfig } from '@/utils/formDesignBaseConfig'
export default {
  tenantId: getBaseInputConfig(),
  supplierCode: getBaseInputConfig(),
  supplierName: getBaseInputConfig(),
  rmk: getBaseInputConfig(),
  validSign: getBaseInputConfig(),
  status: getBaseInputConfig(),
  createdTime: getBaseDateConfig(),
  updateTime: getBaseDateConfig()
}
