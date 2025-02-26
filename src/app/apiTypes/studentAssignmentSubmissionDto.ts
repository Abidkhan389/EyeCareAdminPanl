export interface StudentAssessmentSubmissionDto {
  studentId: number;
  classroomId: number;
  subjectId: number;
  comments: string;
  file: File; // Use File object for compatibility with FormData
  assessmentId: number;
  assessmentType: number;
}

export interface StudentSubmissionsDetailsDto {
  studentId: number;
  classroomId: number;
  subjectId: number;
  comments: string | null;
  attachments: Attachment[];
  assignmentId: number;
  isGraded: boolean;
  grade: number;
  gradedOn: string; // ISO 8601 date string
  teacherComments: string | null;
  gradedBy: string | null;
  gradeLetter: string | null;
  assessmentId: number;
}

export interface Attachment {
  attachmentId: number;
  entityId: number;
  entityType: string;
  documentPath: string;
  fileName: string;
  fileSize: number;
  createdDate: string; // ISO 8601 date string
  uploadedBy: string;
  isArchived: boolean;
  hashChecksum: string;
}

export enum AssessmentType {
  Exam,
  Assignment,
  Project,
}
