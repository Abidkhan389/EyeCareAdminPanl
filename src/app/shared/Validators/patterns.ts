export class Patterns {

    public static passwordRegex: RegExp = /^(?!.*[\s])(?=.*[a-z])(?=.*\d)(?=.*[A-Z])(?=.*[0-9])(?=.*[~`!?@#\$%\^&\*\[\]"\';:_\-<>\.,=\+\/\\\(\)|{}]).+$/;
  
    public static emailRegex: RegExp = /^[0-9A-Za-z._-]+@[A-Za-z0-9]+\.[A-Za-z._-]+$/;
  
    public static codeRegex: RegExp = /^[0-9]{6}$/;
  
    public static CnicPattern: RegExp = /\d{5}\d{7}\d/;
  
    public static nameRegex: RegExp = /^[A-Za-z ]+$/;
  
    public static Num: RegExp = /^[0-9]*$/i;
  
    public static decimalNum: RegExp = /^\d*\.?\d*$/i;
  
    public static amountUnit: RegExp = /^[0-9.,]*$/;
  
    public static amount: RegExp = /^[\d]+[,|\d]*/i;
  
    public static campusCodeRegex: RegExp = /^[A-Za-z0-9]+$/;
  
    public static DatePattern: RegExp = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/[0-9]{4}$/;
  
    public static usernameRegex: RegExp = /^[0-9A-Za-z.]+$/;
  
    public static titleRegex: RegExp = /[a-zA-Z][a-zA-Z0-9.\-_,\/ ]*$/;//DON'T REMOVE THE SPACE FORM REGEX
  
    public static alphaOrNumericWithDash: RegExp = /^[\w-_.]*$/
  
    public static filterRegex: RegExp = /^(?!.*[\'\"\%\;\&])[ A-Za-z0-9_@.?\-]*$/;
  
    public static htmlRemove: RegExp = /<\/?[^>]+>/ig;
  
    public static spaceRemove: RegExp = /&nbsp;/ig;
  
    public static dimensions: RegExp = /^[0-9.]*\*?[0-9.]*$/;
  
    public static numberWithDash: RegExp = /^[0-9-]*$/;
  
    public static greaterThanZero: RegExp = /^[1-9][0-9]*$/;
  
    public static gradeRange: RegExp = /^([a-zA-Z0-9][a-zA-Z0-9 %]*)?$/;
    
    public static gradeTitle:  RegExp = /^[A-Za-z+ ]+$/;
    // public static countryCodeRegex: RegExp = /^\+\d{1,5}$/; // Allows '+', followed by 1 to 5 digits

  
  }