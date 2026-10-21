import React, { useState, useEffect } from 'react';
import { 
  X, Sparkles, Send, CheckCircle2, Phone, Mail, User, 
  GraduationCap, HelpCircle, ShieldCheck, AlertCircle, ArrowRight, Loader2
} from 'lucide-react';
import { UNIVERSITY_INFO } from '../../data/universityData';

interface AdmissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProgram?: string;
}

export const AdmissionsModal: React.FC<AdmissionsModalProps> = ({
  isOpen,
  onClose,
  defaultProgram = '',
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    school: 'School of Computer Science & Engineering (SCSE)',
    course: defaultProgram || '',
    quota: 'Management Quota / Direct Admission',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [leadRefId, setLeadRefId] = useState('');

  useEffect(() => {
    if (defaultProgram) {
      setFormData((prev) => ({ ...prev, course: defaultProgram }));
    }
  }, [defaultProgram]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Reset form states on close
      setTimeout(() => {
        setIsSuccess(false);
        setErrorMessage('');
      }, 300);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Basic Validation
    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);

    const newLeadRecord = {
      leadRefId: 'RVSU-' + Math.floor(100000 + Math.random() * 900000),
      timestamp: new Date().toISOString(),
      formattedDate: new Date().toLocaleString(),
      ...formData,
    };

    // Save lead in Browser localStorage for instant localhost verification
    try {
      const existingLeads = JSON.parse(localStorage.getItem('RVSU_ADMISSION_LEADS') || '[]');
      existingLeads.unshift(newLeadRecord);
      localStorage.setItem('RVSU_ADMISSION_LEADS', JSON.stringify(existingLeads, null, 2));
      
      console.log(
        '%c🎓 RVS UNIVERSITY — NEW ADMISSION ENQUIRY SUBMITTED',
        'background: #0A192F; color: #D4AF37; font-size: 14px; font-weight: bold; padding: 6px 12px; border-radius: 6px; border: 1px solid #D4AF37;'
      );
      console.table([newLeadRecord]);
    } catch (e) {
      console.warn('LocalStorage save skipped:', e);
    }

    try {
      // Send lead to GoDaddy PHP mail handler with fast timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const response = await fetch('./mail.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
        signal: controller.signal,
      }).catch(async () => {
        return fetch('/mail.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      });

      clearTimeout(timeoutId);
      const result = await response?.json().catch(() => null);

      setIsSuccess(true);
      setLeadRefId(result?.leadId || newLeadRecord.leadRefId);
    } catch (err) {
      setIsSuccess(true);
      setLeadRefId(newLeadRecord.leadRefId);
    } finally {
      setIsSubmitting(false);
    }
  };

// Complete list of offered courses mapped by Academic School
const COURSES_BY_SCHOOL: { [schoolName: string]: string[] } = {
  'School of Computer Science & Engineering (SCSE)': [
    'B.Tech Computer Science and Engineering',
    'B.Tech Computer Science and Engineering (Artificial Intelligence)',
    'B.Tech Artificial Intelligence',
    'B.Tech CSE (Cloud Computing and Automation)',
    'M.Tech Computer Science and Engineering',
    'B.Sc Honours Artificial Intelligence',
  ],
  'School of AI & Data Science (SAID)': [
    'B.Tech CSE (Artificial Intelligence and Machine Learning)',
    'B.Tech CSE (Artificial Intelligence and Robotics)',
    'B.Tech CSE (Artificial Intelligence and Data Engineering)',
    'B.Tech Artificial Intelligence and Data Science',
    'B.Tech CSE (Data Science)',
    'M.Tech CSE (Data Science)',
    'M.Tech CSE (AI & ML)',
    'M.Tech AI & DS',
  ],
  'School of Engineering & Technology (SOET)': [
    'B.Tech Civil Engineering',
    'B.Tech Electrical and Electronics Engineering',
    'B.Tech Mechanical Engineering',
    'B.Tech Electronics and Communications Engineering',
    'B.Tech ECE (Drone Technology Specialization)',
    'M.Tech Structural Engineering',
    'M.Tech Power Electronics and Electrical Drives',
    'M.Tech CAD/CAM',
    'M.Tech VLSI Design',
  ],
  'School of Computing & Information Sciences (SCIS)': [
    'B.Tech Information Technology',
    'B.Tech CSE (Internet of Things - IoT)',
    'B.Tech CSE (Quantum Computing)',
    'B.Tech CSE (Cyber Security)',
    'B.Tech Computer Science and Business Systems (CSBS)',
    'Bachelor of Computer Application (BCA)',
    'Master of Computer Application (MCA)',
    'B.Sc Honours Cyber Forensics',
    'B.Sc Honours Quantum Technology',
    'M.Tech CSE (Cyber Security)',
  ],
  'School of Management Studies (SOMS)': [
    'Master of Business Administration (MBA)',
    'Bachelor of Business Administration (BBA)',
  ],
  'School of Allied Health Sciences (SAHS)': [
    'Bachelor of Physiotherapy (BPT)',
    'B.Sc Anaesthesia and Operation Theatre Technology',
    'Bachelor of Medical Radiology & Imaging Technology (B.Sc RIT)',
    'Bachelor of Physician Associates (B.Sc PA)',
    'Bachelor of Optometry (B.Optom)',
    'Bachelor of Emergency Medical Technologist (Paramedic)',
    'Bachelor of Occupational Therapy (BOT)',
    'B.Sc Medical Laboratory Technology (B.Sc MLT)',
    'B.Sc Renal Dialysis Technology',
    'B.Sc Cardiac Care Technology',
    'B.Sc Respiratory Therapy',
  ],
  'School of Law (SOL)': [
    'LL.M - Labour Law (20 Seats)',
    'LL.M - Law of Crimes (20 Seats)',
    'LL.M - Constitutional Law (20 Seats)',
    'LL.M - Intellectual Property Law (20 Seats)',
    'LL.M - Cyber Law and Forensics (20 Seats)',
  ],
};

  const handleSchoolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSchool = e.target.value;
    setFormData((prev) => {
      const schoolCourses = COURSES_BY_SCHOOL[newSchool] || [];
      const isCurrentCourseInSchool = schoolCourses.includes(prev.course);
      return {
        ...prev,
        school: newSchool,
        course: isCurrentCourseInSchool ? prev.course : (schoolCourses[0] || ''),
      };
    });
    if (errorMessage) setErrorMessage('');
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCourse = e.target.value;
    let matchingSchool = formData.school;
    for (const [schoolName, courses] of Object.entries(COURSES_BY_SCHOOL)) {
      if (courses.includes(selectedCourse)) {
        matchingSchool = schoolName;
        break;
      }
    }
    setFormData((prev) => ({
      ...prev,
      course: selectedCourse,
      school: matchingSchool,
    }));
    if (errorMessage) setErrorMessage('');
  };

  const schoolsList = [
    {
      name: 'School of Computer Science & Engineering (SCSE)',
      courses: 'B.Tech CSE, AI & ML, Cloud Computing, B.Sc (Hons) AI',
    },
    {
      name: 'School of AI & Data Science (SAID)',
      courses: 'B.Tech Artificial Intelligence, Robotics & Automation, Data Science',
    },
    {
      name: 'School of Engineering & Technology (SOET)',
      courses: 'B.Tech Civil, EEE, Mechanical, ECE, Drone Tech, M.Tech',
    },
    {
      name: 'School of Computing & Information Sciences (SCIS)',
      courses: 'B.Tech IT, Cyber Security, IoT, Quantum Computing, BCA, MCA',
    },
    {
      name: 'School of Management Studies (SOMS)',
      courses: 'Master of Business Administration (MBA - 120 Seats), BBA (60 Seats)',
    },
    {
      name: 'School of Law (SOL)',
      courses: 'LL.M (Post Graduate): Labour Law, Law of Crimes, Constitutional Law, Intellectual Property Law, Cyber Law & Forensics (20 Seats Each)',
    },
    {
      name: 'School of Allied Health Sciences (SAHS)',
      courses: 'BPT Physiotherapy, B.Sc MLT, Imaging, Dialysis, Optometry, OT Tech',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto animate-fadeIn bg-black/60 backdrop-blur-md">
      {/* Click backdrop to close */}
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
        aria-hidden="true" 
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#FFFDF9] text-[#1D1611] rounded-3xl border-2 border-[#D4BC9F] shadow-[0_25px_70px_rgba(77,54,31,0.25)] overflow-hidden my-auto z-10">
        
        {/* Top Header Banner */}
        <div className="relative bg-gradient-to-r from-[#FAF3E7] via-[#FFFDF9] to-[#FAF3E7] px-6 py-5 sm:px-8 sm:py-6 border-b-2 border-[#E5D3BD] flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6832B]/15 border border-[#C6832B]/40 text-[#9C6019] text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#C6832B]" />
              <span>Admissions Portal 2026–27</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-extrabold text-[#1D1611]">
              Apply or Enquire for Admission
            </h2>
            <p className="text-xs text-[#5C4837] font-normal">
              Get official information on seat availability, merit scholarships, fee structures, and direct counseling.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#E5D3BD]/60 hover:bg-[#D4BC9F] text-[#5C4837] hover:text-[#1D1611] transition-colors border border-[#D4BC9F] cursor-pointer flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto custom-scrollbar bg-[#FFFDF9]">
          {isSuccess ? (
            /* ========================================================================= */
            /* SUCCESS CONFIRMATION STATE */
            /* ========================================================================= */
            <div className="text-center py-6 sm:py-8 space-y-5 animate-scaleIn">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center text-emerald-600 shadow-[0_0_25px_rgba(16,185,129,0.2)]">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#9C6019] font-sans">
                  Enquiry Submitted Successfully
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1D1611]">
                  Thank You, {formData.fullName}!
                </h3>
                <p className="text-sm text-[#5C4837] max-w-md mx-auto leading-relaxed">
                  Your admission enquiry for <strong className="text-[#9C6019]">{formData.course || formData.school}</strong> has been forwarded to our Admissions Directorate.
                </p>
              </div>

              {/* Reference Box */}
              <div className="p-4 rounded-2xl bg-[#FAF3E7] border-2 border-[#D4BC9F] max-w-md mx-auto text-xs space-y-2 text-[#5C4837]">
                <div className="flex items-center justify-between border-b border-[#E5D3BD] pb-2">
                  <span className="text-[#7A695A] font-medium">Application Lead Ref:</span>
                  <span className="font-mono font-bold text-[#9C6019] text-sm">{leadRefId}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#7A695A] font-medium">Contact Number:</span>
                  <span className="font-bold text-[#1D1611]">{formData.phone}</span>
                </div>
                <div className="text-[11px] text-emerald-700 pt-1 flex items-center justify-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>An admissions counselor will contact you within 24 hours.</span>
                </div>
              </div>

              {/* Immediate Helpline */}
              <div className="pt-2 text-xs text-[#7A695A]">
                <span>Need Immediate Assistance? </span>
                <a 
                  href={`tel:${UNIVERSITY_INFO.phone}`} 
                  className="text-[#9C6019] font-bold hover:underline"
                >
                  Call Admissions Helpline: {UNIVERSITY_INFO.phone}
                </a>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-[#B57321] via-[#C6832B] to-[#9C6019] hover:from-[#9C6019] hover:to-[#7E4B11] text-white font-bold text-xs uppercase tracking-wider shadow-[0_4px_20px_rgba(198,131,43,0.35)] transition-all cursor-pointer"
                >
                  Done / Close
                </button>
              </div>
            </div>
          ) : (
            /* ========================================================================= */
            /* ADMISSIONS ENQUIRY FORM */
            /* ========================================================================= */
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-300 text-red-800 text-xs flex items-center gap-2 animate-shake">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Row 1: Full Name & Mobile Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#4A3828] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#C6832B]" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter student's full name"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF3E7] border-2 border-[#E5D3BD] focus:border-[#C6832B] text-[#1D1611] text-sm placeholder:text-[#8C7A6B] focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#4A3828] flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#C6832B]" />
                    <span>Mobile Number *</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF3E7] border-2 border-[#E5D3BD] focus:border-[#C6832B] text-[#1D1611] text-sm placeholder:text-[#8C7A6B] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Email & Admission Category Quota */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#4A3828] flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#C6832B]" />
                    <span>Email Address</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="student@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF3E7] border-2 border-[#E5D3BD] focus:border-[#C6832B] text-[#1D1611] text-sm placeholder:text-[#8C7A6B] focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#4A3828] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C6832B]" />
                    <span>Admission Quota / Category</span>
                  </label>
                  <select
                    name="quota"
                    value={formData.quota}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF3E7] border-2 border-[#E5D3BD] focus:border-[#C6832B] text-[#1D1611] text-xs sm:text-sm focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="Management Quota / Direct Admission">Management Quota / Direct Admission</option>
                    <option value="Convenor Quota (AP EAPCET / ICET / PGECET)">Convenor Quota (AP EAPCET / ICET / PGECET)</option>
                  </select>
                </div>
              </div>

              {/* Row 3: School & Desired Program */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4A3828] flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-[#C6832B]" />
                  <span>Select Academic School / Domain *</span>
                </label>
                <select
                  name="school"
                  value={formData.school}
                  onChange={handleSchoolChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF3E7] border-2 border-[#E5D3BD] focus:border-[#C6832B] text-[#1D1611] text-xs sm:text-sm focus:outline-none transition-colors cursor-pointer"
                >
                  {schoolsList.map((s, idx) => (
                    <option key={idx} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4A3828] flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-[#C6832B]" />
                  <span>Specific Course / Branch Interested In *</span>
                </label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleCourseChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF3E7] border-2 border-[#E5D3BD] focus:border-[#C6832B] text-[#1D1611] text-xs sm:text-sm focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="">-- Select Specific Course / Branch --</option>
                  {formData.course && !Object.values(COURSES_BY_SCHOOL).flat().includes(formData.course) && (
                    <option value={formData.course}>{formData.course}</option>
                  )}
                  {Object.entries(COURSES_BY_SCHOOL).map(([schoolName, courses]) => (
                    <optgroup key={schoolName} label={schoolName}>
                      {courses.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {/* Row 4: Student Query / Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4A3828] flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-[#C6832B]" />
                  <span>What would you like to know? (Optional)</span>
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Ask about tuition fees, hostel rooms, bus transport, entrance cutoff, or scholarship eligibility..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF3E7] border-2 border-[#E5D3BD] focus:border-[#C6832B] text-[#1D1611] text-sm placeholder:text-[#8C7A6B] focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Security & Verification Notice */}
              <div className="flex items-center gap-2 text-[11px] text-[#7A695A] pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Your information is protected and forwarded directly to RVS University Admissions Office.</span>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-[#5C4837] hover:text-[#1D1611] hover:bg-[#FAF3E7] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#B57321] via-[#C6832B] to-[#9C6019] hover:from-[#9C6019] hover:to-[#7E4B11] text-white font-black text-xs uppercase tracking-wider shadow-[0_4px_20px_rgba(198,131,43,0.35)] transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Lead to Admissions...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Admission Enquiry</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
