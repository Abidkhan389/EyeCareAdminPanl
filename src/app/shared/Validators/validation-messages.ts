export class Messages {
    public static validation_messages = {
        'email': [
            { type: 'required', message: 'Email is required' },
            { type: 'pattern', message: 'Enter a valid email' },
            { type: 'maxlength', message: 'Email should not be more than 150 characters ' },
            { type: 'whitespace', message: 'Only whitespace is not allowed ' }
        ],
        'emailWithDomain': [
            { type: 'required', message: 'Email is required' },
            { type: 'pattern', message: 'Enter a valid email' },
            { type: 'maxlength', message: 'Email should not be more than 100 characters ' },
            { type: 'whitespace', message: 'Only whitespace is not allowed ' }
        ],
        'username': [
            { type: 'required', message: 'Email is required' },
            { type: 'pattern', message: 'Enter a valid email' },
            { type: 'maxlength', message: 'Email should not be more than 25 characters ' }
        ],
        'name': [
            { type: 'required', message: 'Name is required' },
            { type: 'pattern', message: 'Enter a valid name' },
            { type: 'maxlength', message: 'Name must not be greater than 50 characters ' },
            { type: 'whitespace', message: 'Only whitespace is not allowed ' }
        ],
        'cnic': [
            { type: 'required', message: 'CNIC is required' },
            { type: 'pattern', message: 'Enter a valid CNIC' },
            { type: 'maxlength', message: 'CNIC must not be greater than 13 characters' },
        ],
        'bform': [
            { type: 'required', message: 'B-Form is required' },
            { type: 'pattern', message: 'Enter a valid B-Form' },
            { type: 'maxlength', message: 'B-Form must not be greater than 13 characters' },
            { type: 'bformGardian', message: 'B-form is could not be same as Parents/Gardian Cnic' },
        ],
        'address': [
            { type: 'required', message: 'Address is required' },
            { type: 'maxlength', message: 'Address must not be greater than 300 characters ' },
            { type: 'whitespace', message: 'Only whitespace is not allowed ' }
        ],
        'mobile': [
            { type: 'required', message: 'Mobile Number is required' },
            { type: 'pattern', message: 'Enter a valid Mobile number' },
            { type: 'whitespace', message: 'Only whitespace is not allowed ' },
            { type: 'minlength', message: 'Mobile Number must be at least 11 number ' },
            { type: 'maxlength', message: 'Mobile Number should not be more than 11 number' }
        ],

        'mobileLength': [
            { type: 'required', message: 'Mobile Number is required' },
            { type: 'pattern', message: 'Enter a valid Mobile number' },
            { type: 'whitespace', message: 'Only whitespace is not allowed ' },
            { type: 'minlength', message: 'Mobile Number must be at least 11 number ' },
            { type: 'maxlength', message: 'Mobile Number should not be more than 11 number' }
        ],
        'contactNumber': [
            { type: 'required', message: 'Number is required' },
            { type: 'pattern', message: 'Enter a valid number' },
            { type: 'whitespace', message: 'Only whitespace is not allowed ' },
            { type: 'minlength', message: 'Number must be at least 11 number ' },
            { type: 'maxlength', message: 'Number should not be more than 11 number' }
        ],
        'landLine': [
            { type: 'required', message: 'LandLine Number is required' },
            { type: 'pattern', message: 'Enter a valid LandLine number' },
            { type: 'whitespace', message: 'Only whitespace is not allowed ' },
            { type: 'minlength', message: 'LandLine Number must be at least 11 number ' },
            { type: 'maxlength', message: 'LandLine Number should not be more than 13 number' }
        ],
        'studentID': [
            { type: 'required', message: 'Student ID is required' },
            { type: 'pattern', message: 'Enter a valid Student ID' },
            { type: 'whitespace', message: 'Only whitespace is not allowed ' },
            { type: 'minlength', message: 'ID must be at least 13 number ' },
            { type: 'maxlength', message: 'ID should not be more than 13 number' },
            { type: 'registered', message: 'This Student ID is already registered' }
        ],
        'fax': [
            { type: 'required', message: 'Fax Number is required' },
            { type: 'pattern', message: 'Enter a valid Fax number' },
            { type: 'whitespace', message: 'Only whitespace is not allowed ' },
            { type: 'minlength', message: 'Fax Number must be at least 11 number ' },
            { type: 'maxlength', message: 'Fax Number should not be more than 13 number' }
        ],

        'phoneNumber': [
            { type: 'required', message: 'Phone Number is required' },
            { type: 'pattern', message: 'Enter a valid Phone number' },
            { type: 'whitespace', message: 'Only whitespace is not allowed ' },
            { type: 'minlength', message: 'Phone Number must be at least 11 number ' },
            { type: 'maxlength', message: 'Phone  Number should not be more than 13 number' }
        ],
        'password': [
            { type: 'required', message: 'Password is required' },
            { type: 'minlength', message: 'Password must be at least 4 characters ' },
            { type: 'maxlength', message: 'Password must be at most 20 characters ' },
            { type: 'pattern', message: 'Password must contain at least one uppercase, lowercase, number, special character and no space' },
            { type: 'tooltip', message: 'Password must be at least 4 and at most 20 characters ,must contain at least one uppercase, lowercase, number, special character and no space' }
        ],
        'confirmPassword': [
            { type: 'required', message: 'Confirm Password is required' },
            { type: 'minlength', message: 'Password must be at least 4 characters ' },
            { type: 'maxlength', message: 'Password must be at most 20 characters ' },
            { type: 'passwordMismatch', message: 'Password mismatch' },
            { type: 'pattern', message: 'Password must contain at least one uppercase, lowercase, number, special character and no space' },
            { type: 'tooltip', message: 'Password must be at least 8 and at most 20 characters ,must contain at least one uppercase, lowercase, number, special character and no space' }
        ],
        'code': [
            { type: 'required', message: 'Code is required' },
            { type: 'pattern', message: '6 digits are allowed' }
        ],
        
        'requiredField': [
            { type: 'required', message: 'This field is required' },
            { type: 'whitespace', message: 'Only whitespace is not allowed ' },
            { type: 'maxlength', message: 'Value must not be greater than 50 characters ' },
            { type: 'pattern', message: 'Enter a valid value ' },
        ],
        'firstName': [
            { type: 'required', message: 'First Name is required' },
            { type: 'pattern', message: 'Enter a valid First Name ' },
            { type: 'maxlength', message: 'First Name must not be greater than 20 characters' },
            { type: 'whitespace', message: 'Only whitespace is not allowed ' }
            // { type: 'validUrl', message: 'Fashduxak' }
        ],
        'lastName': [
            { type: 'required', message: 'Last Name is required' },
            { type: 'pattern', message: 'Enter a valid Last Name ' },
            { type: 'maxlength', message: 'Last Name must not be greater than 20 characters ' },
            { type: 'whitespace', message: 'Only whitespace is not allowed' }
        ],
        'dateOfBirth': [
            { type: 'required', message: 'DOB is required' },
            { type: 'dateValid', message: "Enter a valid DOB" },
            { type: 'pattern', message: 'Enter a valid DOB' },
        ],
        'genderID': [
            { type: 'required', message: 'Gender is required' }
        ],
        'emailContent': [
            { type: 'required', message: 'Value is required' },
            { type: 'pattern', message: 'Enter a valid email value ' },
            { type: 'maxlength', message: 'Value must not be greater than 1000 characters ' },
            { type: 'whitespace', message: 'Only whitespace is not allowed' }
        ],
        'subject': [
            { type: 'required', message: 'Subject is required' },
            { type: 'maxlength', message: 'Subject must not be greater than 50 characters ' }
        ],
        'answer': [
            { type: 'required', message: 'Answer is required' },
            { type: 'maxlength', message: 'Answer must not be greater than 50 characters ' },
            { type: 'whitespace', message: 'Only whitespace is not allowed' }
        ],
        'roleName': [
            { type: 'required', message: 'Role Name is required' },
            { type: 'maxlength', message: 'Role Name must not be greater than 20 characters ' },
            { type: 'pattern', message: 'Enter a valid Role Name ' },
            { type: 'whitespace', message: 'Only whitespace is not allowed' }
        ],
        'description': [
            { type: 'required', message: 'Field is required' },
            { type: 'maxlength', message: 'Field length must not be greater than 500 characters ' },
            { type: 'whitespace', message: 'Only whitespace is not allowed' }
        ],
        'value': [
            { type: 'required', message: 'Value is required' },
            { type: 'pattern', message: 'Enter a valid Value' },
            { type: 'maxlength', message: 'Value must not be greater than 50 characters ' },
            { type: 'whitespace', message: 'Only whitespace is not allowed' }
        ],
        'value100': [
            { type: 'required', message: 'Value is required' },
            { type: 'pattern', message: 'Enter a valid Value' },
            { type: 'maxlength', message: 'Value must not be greater than 100 characters ' },
            { type: 'whitespace', message: 'Only whitespace is not allowed' }
        ],
        'campusCode': [
            { type: 'required', message: 'This Code is required' },
            { type: 'pattern', message: 'Enter a valid code' },
            { type: 'whitespace', message: 'Only whitespace is not allowed ' },
            { type: 'maxlength', message: 'Code must not be greater than 10 characters' },
        ],
        'title': [
            { type: 'required', message: 'Title is required' },
            { type: 'pattern', message: 'Enter a valid Title' },
            { type: 'maxlength', message: 'Title must not be greater than 50 characters ' },
            { type: 'whitespace', message: 'Only whitespace is not allowed' }
        ],
        'composeMail': [
            { type: 'required', message: 'Message is required' },
            { type: 'maxlength', message: 'Message must not be greater than 4000 characters ' },
            { type: 'whitespace', message: 'Only whitespace is not allowed' }
        ],
        'select': [
            { type: 'required', message: 'Please select one value' },
        ],
        'amount': [
            { type: 'required', message: 'Value is required' },
            { type: 'pattern', message: 'Enter a valid Value' },
            { type: 'maxlength', message: 'Value must not be greater than 9 characters ' },
        ],
        'payment': [
            { type: 'required', message: 'Value is required' },
            { type: 'pattern', message: 'Enter a valid Value' },
            { type: 'maxlength', message: 'Value must not be greater than 14 characters ' },
        ],
        'date': [
            { type: 'required', message: 'Value is required' },
            { type: 'dateComparison', message: 'Date Start should be less than Date End' },
            { type: 'dateValid', message: "Enter a valid Date" },
            { type: 'timeValid', message: "Start time should not be less than Date time' " },
        ],
        'numberValue': [
            { type: 'required', message: 'Value is required' },
            { type: 'pattern', message: 'Enter a valid Value' },
            { type: 'maxlength', message: 'Value must not be greater than 10 characters ' },
            { type: 'whitespace', message: 'Only whitespace is not allowed' },
            { type: 'compareValue', message: 'Value can not be greater' }
        ],
        'decimal': [
            { type: 'required', message: 'Value is required' },
            { type: 'pattern', message: 'Enter a valid Value' },
            { type: 'maxlength', message: 'Value must not be greater than 10 characters ' },
            { type: 'whitespace', message: 'Only whitespace is not allowed' }
        ],
        'numberGreaterThanZero': [
            { type: 'required', message: 'Value is required' },
            { type: 'min', message: 'Minimum required number is 1' },
            { type: 'registered', message: 'This code is already registered' }
        ],
        'businessUnit': [
            { type: 'required', message: 'Value is required' },
            { type: 'registered', message: 'Please select atleast one region from selected business unit' },
            { type: 'noValue', message: 'This Business Unit has no Region' }
        ],
        'campus': [
            { type: 'required', message: 'campus is required' },
            { type: 'pattern', message: 'Enter a valid campus' },
            { type: 'noCampus', message: 'There is no campus in this region' },
            { type: 'selectCampus', message: 'Please select one campus from selected region' }
        ],
        'revision': [
            { type: 'required', message: 'value is required' },
            { type: 'pattern', message: 'Enter a valid value' },
            { type: 'valueCheck', message: 'Please enter a valid year for extension' }
        ],
        'videoLinks': [
            { type: 'required', message: 'value is required' },
            { type: 'pattern', message: 'Enter a valid value' },
            { type: 'maxlength', message: 'Value must not be greater than 300 characters ' },
            { type: 'whitespace', message: 'whitespace is not allowed' }
        ],
        'marks': [
            { type: 'required', message: 'marks is required' },
            { type: 'pattern', message: 'marks a valid value' },
            { type: 'maxlength', message: 'marks must not be greater than total marks' },
            { type: 'whitespace', message: 'whitespace is not allowed' }
        ],
        'city': [
            { type: 'required', message: 'City is required' }
        ],
      
        

    }
}
