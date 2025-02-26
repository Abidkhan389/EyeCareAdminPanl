/**
 * Enum representing the types of alerts that can be used within the application.
 * This categorization allows for consistent handling and styling of different alert messages.
 *
 * @example
 * // Usage of ALERT_TYPE
 * const myAlertType = ALERT_TYPE.ERROR;
 */
export enum ALERT_TYPE {
  /** Indicates an error alert. */
  ERROR = 'Error',

  /** Indicates a success alert. */
  SUCCESS = 'Success',

  /** Indicates a warning alert. */
  WARNING = 'Warning',

  /** Indicates a primary alert, typically used for general information. */
  PRIMARY = 'Primary',
}
