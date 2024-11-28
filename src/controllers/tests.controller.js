import { logger } from '../utils/logger.utils.js';

class TestsController {
  testLoggers = (req, res) => {
    logger.debug('Test logger debug');
    logger.http('Test logger http');
    logger.info('Test logger info');
    logger.warn('Test logger warn');
    logger.error('Test logger error');
    logger.fatal('Test logger fatal');
  };
}

export default new TestsController();
