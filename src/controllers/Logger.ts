/* eslint-disable @typescript-eslint/no-explicit-any */

// types
import type { TLogLevel } from '@app/types';

export default class Logger {
  private readonly _level: TLogLevel;

  constructor(level: TLogLevel) {
    this._level = level;
  }

  /**
   * private methods
   */

  private canLog(allowedLevel: TLogLevel): boolean {
    switch (this._level) {
      case 'error':
        return allowedLevel === 'error';
      case 'warn':
        return allowedLevel === 'error' || allowedLevel === 'warn';
      case 'info':
        return (
          allowedLevel === 'error' ||
          allowedLevel === 'warn' ||
          allowedLevel === 'info'
        );
      case 'debug':
        return true;
      default:
        return false;
    }
  }

  /**
   * public methods
   */

  public debug(message?: any, ...optionalParams: any[]): void {
    this.canLog('debug') && console.log(message, ...optionalParams);
  }

  public error(message?: any, ...optionalParams: any[]): void {
    this.canLog('error') && console.error(message, ...optionalParams);
  }

  public info(message?: any, ...optionalParams: any[]): void {
    this.canLog('info') && console.info(message, ...optionalParams);
  }

  public warn(message?: any, ...optionalParams: any[]): void {
    this.canLog('warn') && console.warn(message, ...optionalParams);
  }
}
