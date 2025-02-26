/**
 * Enumeration representing the available theme names within the application.
 * It can either be LIGHT or DARK theme.
 *
 * @enum {string}
 * @property {string} LIGHT - Represents the light theme.
 * @property {string} DARK - Represents the dark theme.
 * @property {string} SYSTEM - Represents the system theme.
 *
 * @example
 * // Usage of THEME_NAME
 * const currentTheme = THEME_NAME.LIGHT;
 */
export enum THEME_NAME {
  /** Represents the light theme. */
  LIGHT = 'Light',

  /** Represents the dark theme. */
  DARK = 'Dark',

  /** Represents the system theme. */
  SYSTEM = 'system',
}
