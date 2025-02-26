export interface FacultySubjectList {
    facultyId: string;  // or the appropriate type
    subjectId: string;  // or the appropriate type
  }
  export  interface ClassRoomManagement {
    facultySubjectIds: FacultySubjectList[];
  }