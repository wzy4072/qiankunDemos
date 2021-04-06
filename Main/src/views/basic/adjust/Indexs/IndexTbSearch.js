import { getBaseDateConfig, getBaseInputConfig } from '@/utils/formDesignBaseConfig'
export default {
  curId: getBaseInputConfig(),
  referCurId: getBaseInputConfig(),
  preTime: getBaseInputConfig(),
  oldExchangeRate: getBaseInputConfig(),
  newExchangeRate: getBaseInputConfig(),
  rmk: getBaseInputConfig(),
  status: getBaseInputConfig(),
  createDate: getBaseInputConfig(),
  createBy: getBaseInputConfig(),
  updateDate: getBaseInputConfig(),
  typeId: getBaseInputConfig(),
  foreignExchangePurchase: getBaseInputConfig(),
  foreignExchangeSell: getBaseInputConfig(),
  foreignExchangeMiddle: getBaseInputConfig(),
  createdTime: getBaseDateConfig(),
  updateTime: getBaseDateConfig()
}
