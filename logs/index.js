const Log4js = require("log4js");
const Path = require("path");

// 基本配置
Log4js.configure({
    appenders: {
        cheese: {
            type: 'file',
            filename: Path.resolve(__dirname, 'w_log.log')
        }
    },
    categories: { default: { appenders: ['cheese'], level: 'trace' } }
});

const logger = Log4js.getLogger('cheese');

class WLogger {

    // 跟踪
    static trace(str) {
        logger.trace(str)
    }

    // debug
    static debug(str) {
        logger.debug(str)
    }

    static info(str) {
        logger.info(str)
    }

    static warn(str) {
        logger.warn(str)
    }

    static error(str) {
        logger.error(str)
    }

    static fatal(str) {
        logger.fatal(str)
    }
}

module.exports = WLogger;
