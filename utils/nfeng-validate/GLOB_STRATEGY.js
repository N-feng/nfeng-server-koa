const GLOB_STRATEGY = {
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    isCardNo: function(card) {
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        return reg.test(card)
    },
    // 是否为手机号码
    isMobile: function(mobile) {
        return /^1\d{10}$/.test(mobile)
    },
    // 是否为空
    isNonEmpty: function(value) {
        return value.length !== 0
    },
    //纯英文
    onlyEn: function(value) {
        return /^[A-Za-z]+$/.test(value);
    },
    //纯中文
    onlyZh: function(value) {
        return /^[\u4e00-\u9fa5]+$/.test(value);
    }
};

module.exports = GLOB_STRATEGY
