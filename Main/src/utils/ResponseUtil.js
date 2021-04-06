const ResponseUtil = {

    /**
     * 是否是操作成功的响应代码
     * @param code 响应代码
     * @returns {boolean}
     */
    isSuccessfulCode: function (code) {
        return code === '00000001'
    }

}

export default ResponseUtil
