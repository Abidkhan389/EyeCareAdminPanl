import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
export class excelGeneratorService {
     static exportDoctorPatientReport(data: any[], fileName: string) {
       const rows: any[] = [];

    data.forEach((docBlock, index) => {

      // Doctor header
      rows.push({
        Doctor: `${docBlock.doctor.doctorFirstName} ${docBlock.doctor.doctorLastName}`,
        CNIC: docBlock.doctor.doctorCnic,
        Mobile: docBlock.doctor.doctorMobile,
        Patients: docBlock.TotalPatients
      });

      // Empty line
      rows.push({});

      // Patient table header
      rows.push({
        PatientName: 'Patient Name',
        CNIC: 'CNIC',
        City: 'City',
        Mobile: 'Mobile',
        TimeSlot: 'TimeSlot',
        Fee: 'Fee',
        AppointmentDate: 'Appointment Date'
      });

      // Patient rows
      docBlock.patients.forEach((p: any) => {
        rows.push({
          PatientName: `${p.patientFirstName} ${p.patientLastName}`,
          CNIC: p.patientCnic,
          City: p.patientCity,
          Mobile: p.patientMobile,
          TimeSlot: p.timeSlot,
          Fee: p.docterDiscountFee,
          AppointmentDate: new Date(p.appointmentDate).toLocaleDateString()
        });
      });

      // Space between doctors
      rows.push({});
      rows.push({});
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });

    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

   saveAs(blob, `${fileName}.xlsx`);
  }
}