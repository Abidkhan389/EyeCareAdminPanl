import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export class excelGeneratorService {
  static exportDoctorPatientReport(data: any[], fileName: string) {
    const rows: any[] = [];

    data.forEach((docBlock) => {

      // Doctor header (single row, clean)
      rows.push([
        'Doctor',
        `${docBlock.doctor.doctorFirstName} ${docBlock.doctor.doctorLastName}`,
        'CNIC',
        docBlock.doctor.doctorCnic,
        'Mobile',
        docBlock.doctor.doctorMobile,
        'Total Patients',
        docBlock.totalPatients
      ]);

      // Empty row
      rows.push([]);

      // Patient table header (will be bold)
      const patientHeaderRowIndex = rows.length;
      rows.push([
        'Patient Name',
        'CNIC',
        'City',
        'Mobile',
        'TimeSlot',
        'Fee',
        'Appointment Date'
      ]);

      // Patient rows
      docBlock.patients.forEach((p: any) => {
        rows.push([
          `${p.patientFirstName} ${p.patientLastName}`,
          p.patientCnic,
          p.patientCity,
          p.patientMobile,
          p.timeSlot,
          p.docterDiscountFee,
          new Date(p.appointmentDate).toLocaleDateString()
        ]);
      });

      // Space between doctors
      rows.push([]);
      rows.push([]);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(rows);

    // ---- Bold patient header rows ----
    Object.keys(worksheet).forEach(cell => {
      if (!cell.startsWith('!')) {
        const row = parseInt(cell.replace(/[A-Z]/g, ''), 10) - 1;
        if (rows[row] && rows[row][0] === 'Patient Name') {
          worksheet[cell].s = {
            font: { bold: true }
          };
        }
      }
    });

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
