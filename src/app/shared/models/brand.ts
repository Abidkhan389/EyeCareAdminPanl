/**
 * Enum representing specific brand names within the application.
 * This can be used to identify or categorize products, components, or services according to their brand.
 *
 * @example
 * // Usage of BRAND_NAME
 * const myBrand = BRAND_NAME.BB;
 */
export enum BRAND_NAME {
  /** Represents the brand name 'Bright Board'. */
  BB = 'bright board',
}

/**
 * Interface representing the brand details.
 * @property {BRAND_NAME} brand - The specific brand name from the BRAND_NAME enum.
 * @property {string} name - The human-readable name of the brand.
 * @property {string} buildDate - The build date of the brand-related component.
 * @property {string} version - The version of the brand-related component.
 */
export interface IBrand {
  brand: BRAND_NAME;
  name: string;
  buildDate: string;
  version: string;
}
