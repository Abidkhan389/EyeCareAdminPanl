import { environment } from "src/environments/environment";

export const MessageTypes = {
    error: "Error",
    info: "Info",
    failure: "Failure",
    success: "Success",
    warning: "Warning",
    question: "Question"
}
var baseUrl = environment.baseUrl;
var DooctorAvailabilityUrl = baseUrl + 'DoctorAvailability/'
var medicineTypeUrl=baseUrl + 'Medicinetype/'
export const APIPaths = {

   

    //----------DooctorAvailability URLS--------------
    getAllDoctorAvailability: DooctorAvailabilityUrl + 'getAllByProc',
    DoctorAvaailabilityActiveInActive: DooctorAvailabilityUrl + 'ActiveInActive',
    addEditDoctorAvaibality: DooctorAvailabilityUrl + 'AddEditDoctorAvaibality',
    getByIdDoctorAvaibality: DooctorAvailabilityUrl + 'GetByIdDoctorAvaibality',
     //----------Medicine Type URLS--------------
    getAllMedicineType: medicineTypeUrl + 'getAllByProc',
    updateMedicineTypeStatus: medicineTypeUrl + 'ActiveInActive',
    getMedicineTypeById: medicineTypeUrl + 'getMedicineTypeById',
    addEditmedicineType: medicineTypeUrl + 'addEditmedicineType',
   
}

export const ResultMessages = {
    serverError: "Internal Server Error",
    noSlotsFound: "No Slots Found",
    loginError: "Please log in first",
    notExist: "Data not Exist",
    requiredAllField: "Please fill all feilds",
    permissionDenied: "You Don't have right to change",
    resendCode: "Code has been resent. Please check.",
    securityQuestionLimit: "Please answer at least 3 questions.",
    selectLeftItem: "You must first select an item on the left side.",
    selectRightItem: "You must first select an item on the right side.",
    atleastOneGroupOrRole: "Please select atleast one group/role.",
    replyByCallConfirmation: "Do you confirm you have talked to the customer?",
    closeEnquiryConfirmation: "Are you sure you want to close this Enquiry?",
    fileNotFound: "Sorry, we are unable to download this file for you.",
    ClosedEnquiry: "You can not close this enquiry, It is already closed.",
    selectDeleteItem: "Please select atleast one item.",
    fileSizeLimit: "Image size can not be more than 1 MB.",
    fileExtension: "File Format not supported",
    enquiryRepliedByCall: "Enquiry is replied by call.",
    enabledEOI: "Do you want to send Expression of Interest",
    allReadySubmitted: "Your Application is already inprogress, Our sale person will contact you soon",
    approveFAF: "Do you want to approve Franchise Application Form?",
    rejectFAF: "Do you want to Reject Franchise Application Form?",
    approveConcession: "Do you want to approve Concession Form?",
    rejectConcession: "Do you want to Reject fee Concession Form?",
    approveSurvey: "Do you want to approve Survey Form?",
    rejectSurvey: "Do you want to Reject Survey Form?",
    approveSalesApproval: "Do you want to approve Sales Approval Form?",
    rejectSalesApproval: "Do you want to Reject Sales Approval Form?",
    approveCOBR: "Do you want to approve COBR?",
    rejectCOBR: "Do you want to reject COBR?",
    approveCLUR: "Do you want to approve CLUR?",
    rejectCLUR: "Do you want to reject CLUR?",
    submitFormConfirmation: "Are you sure you want to submit your Form? After Submission you can not update your information",
    addLocation: "Please add atleast one Location.",
    addVicinity: "Please add atleast one school in vicinity and nearby Allied school.",
    approveMou: "Do you want to approve MOU Form?",
    rejectMou: "Do you want to cancel MOU Form?",
    wizardSecondSubmission: "Do you want to submit this form?",
    detailsAlreadyExist: "information Already Exist.",
    exempionValue: "Exemption amount is greater than total amount",
    confirmAdmission: "Do you want to Confirm the Admission Form?",
    confirmAdmissionEnquiry: "Do you want to Confirm the Admission Enquiry?",
    confirmPushNotification: "you want to send this notification?",
    confirmChallan: "Do you want to Confirm the Challan?",
    markAttendance: "Attendence has been marked",
    markAllAttendance: "Please mark all student",
    removeUserInfo: "By Continue, Your fill data will be reset",
    wrongFile: "Please Upload a Valid Admission Template file",
    successfullyadd: "Add Successfully",
    successfullyUpdate: "Update Successfully"


}