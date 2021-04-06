import { getBaseDateConfig, getBaseInputConfig } from '@/utils/formDesignBaseConfig'
export default {
  sysBusType: getBaseInputConfig(),
  purpose: getBaseInputConfig(),
  createdTime: getBaseDateConfig(),
  updateTime: getBaseDateConfig()
}
