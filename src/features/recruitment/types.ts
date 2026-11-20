// Recruitment form schema. The schema is stored on the server (hr-api) and edited
// from the admin console, so the public form is rendered entirely from data.

export type FieldType =
  | 'text'
  | 'textarea'
  | 'email'
  | 'tel'
  | 'number'
  | 'date'
  | 'year'
  | 'select'
  | 'choice'
  | 'checkbox'
  | 'file';

export type FieldWidth = 'full' | 'half' | 'third' | 'quarter';

/** A single visibility rule. `section` defaults to the field's own section (or repeat item). */
export interface Condition {
  section?: string;
  field: string;
  equals?: string | string[] | boolean;
  notEquals?: string | string[] | boolean;
}

export interface FieldDef {
  id: string;
  label: string;
  type: FieldType;
  width?: FieldWidth;
  required?: boolean;
  placeholder?: string;
  help?: string;
  /** Inline options (used when listId is not set). */
  options?: string[];
  /** Options from a shared list (Lists & Categories). */
  listId?: string;
  /** Only show list options whose tags include this field's current value. */
  filterBy?: { section?: string; field: string };
  /** All rules must pass for the field to be shown. */
  showIf?: Condition[];
  pattern?: string;
  patternMessage?: string;
  min?: number;
  max?: number;
  maxLength?: number;
  transform?: 'uppercase';
  defaultValue?: string;
  accept?: string;
  maxSizeMB?: number;
  /** Core fields the system relies on (name, email…) cannot be deleted. */
  locked?: boolean;
  /** Temporarily removed from the form without deleting it. */
  hidden?: boolean;
}

export interface SectionDef {
  id: string;
  title: string;
  description?: string;
  fields: FieldDef[];
  repeatable?: boolean;
  minItems?: number;
  maxItems?: number;
  itemLabel?: string;
  addLabel?: string;
  showIf?: Condition[];
  hidden?: boolean;
}

export interface StepDef {
  id: string;
  title: string;
  description?: string;
  sections: SectionDef[];
  showIf?: Condition[];
  hidden?: boolean;
}

export interface ListOption {
  label: string;
  group?: string;
  tags?: string[];
  hidden?: boolean;
}

export interface ListDef {
  id: string;
  name: string;
  description?: string;
  options: ListOption[];
}

export interface FormSettings {
  formTitle: string;
  formSubtitle: string;
  intro: string;
  acceptingApplications: boolean;
  closedMessage: string;
  notifyEmails: string[];
  sendApplicantCopy: boolean;
  senderName: string;
  replyTo: string;
  applicantEmailMessage: string;
  declarationText: string;
  successMessage: string;
  idPrefix: string;
  attachFilesToEmail: boolean;
}

export interface FormSchema {
  version: number;
  updatedAt: string | null;
  settings: FormSettings;
  steps: StepDef[];
  lists: ListDef[];
}

export interface FileMeta {
  name: string;
  size: number;
  type: string;
  /** Server-side stored file name (set after upload). */
  stored?: string;
}

export type FieldValue = string | boolean | FileMeta | null | undefined;
export type SectionValues = Record<string, FieldValue>;
export type FormValues = Record<string, SectionValues | SectionValues[]>;

export type ApplicationStatus = 'New' | 'Under Review' | 'Shortlisted' | 'Interview' | 'Selected' | 'On Hold' | 'Rejected';

export const APPLICATION_STATUSES: ApplicationStatus[] = [
  'New',
  'Under Review',
  'Shortlisted',
  'Interview',
  'Selected',
  'On Hold',
  'Rejected',
];

export interface ApplicationSummary {
  id: string;
  submittedAt: string;
  status: ApplicationStatus;
  name: string;
  email: string;
  mobile: string;
  postType: string;
  jobNature: string;
  department: string;
  designation: string;
  hasResume: boolean;
}

export interface ApplicationRecord extends ApplicationSummary {
  schemaVersion: number;
  data: FormValues;
  notes: string;
  emailLog: { to: string; kind: string; ok: boolean; at: string; error?: string }[];
  history: { at: string; status: ApplicationStatus; note?: string }[];
}
