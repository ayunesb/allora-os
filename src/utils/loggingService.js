// Base logger implementation
const LOG_LEVELS = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
};
const DEFAULT_OPTIONS = {
    minLevel: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    includeTimestamps: true,
};
class Logger {
    options;
    constructor(options = {}) {
        this.options = { ...DEFAULT_OPTIONS, ...options };
    }
    formatMessage(level, message, ...args) {
        let formattedMessage = message;
        // Add namespace if configured
        if (this.options.namespace) {
            formattedMessage = `[${this.options.namespace}] ${formattedMessage}`;
        }
        // Add timestamp if configured
        if (this.options.includeTimestamps) {
            const timestamp = new Date().toISOString();
            formattedMessage = `${timestamp} ${formattedMessage}`;
        }
        return formattedMessage;
    }
    shouldLog(level) {
        return LOG_LEVELS[level] >= LOG_LEVELS[this.options.minLevel];
    }
    debug(message, ...args) {
        if (this.shouldLog('debug')) {
            console.debug(this.formatMessage('debug', message), ...args);
        }
    }
    info(message, ...args) {
        if (this.shouldLog('info')) {
            console.info(this.formatMessage('info', message), ...args);
        }
    }
    warn(message, ...args) {
        if (this.shouldLog('warn')) {
            console.warn(this.formatMessage('warn', message), ...args);
        }
    }
    error(message, ...args) {
        if (this.shouldLog('error')) {
            console.error(this.formatMessage('error', message), ...args);
        }
    }
    createSubLogger(namespace) {
        return new Logger({
            ...this.options,
            namespace: this.options.namespace
                ? `${this.options.namespace}:${namespace}`
                : namespace,
        });
    }
    setMinLevel(level) {
        this.options.minLevel = level;
    }
}
// Export singleton instance
export const logger = new Logger();
