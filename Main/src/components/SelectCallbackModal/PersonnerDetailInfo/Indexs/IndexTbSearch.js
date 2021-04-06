import { getBaseDateConfig, getBaseInputConfig } from '@/utils/formDesignBaseConfig'
export default {
  tenantId: getBaseInputConfig(),
  corpId: getBaseInputConfig(),
  workNo: getBaseInputConfig(),
  userName: getBaseInputConfig(),
  idcard: getBaseInputConfig(),
  sex: getBaseInputConfig(),
  deptName: getBaseInputConfig(),
  mobile: getBaseInputConfig(),
  bankAcc: getBaseInputConfig(),
  accName: getBaseInputConfig(),
  bifCode: getBaseInputConfig(),
  bankCode: getBaseInputConfig(),
  bankName: getBaseInputConfig(),
  cardType: getBaseInputConfig(),
  prov: getBaseInputConfig(),
  city: getBaseInputConfig(),
  rmk: getBaseInputConfig(),
  validSign: getBaseInputConfig(),
  createdTime: getBaseDateConfig(),
  updateTime: getBaseDateConfig()
}
