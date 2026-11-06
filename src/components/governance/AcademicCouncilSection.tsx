import React from 'react';
import { ShieldCheck, User, Landmark, GraduationCap, Mail, Phone, CheckCircle2 } from 'lucide-react';
import proChancellorPhoto from '../../assets/V Chairman Photo copy.jpg.jpeg';

export interface AcademicCouncilMember {
  sNo: number;
  name: string;
  category: string;
  position: 'Chairperson' | 'Member' | 'Member Secretary' | 'Special Invitee';
  contact: string;
  hasPhotoCard: boolean;
  photoImage?: string;
  shortRole?: string;
  subGroup?: string;
}

export const ACADEMIC_COUNCIL_MEMBERS: AcademicCouncilMember[] = [
  // Category (A) - Ex-Officio Members
  {
    sNo: 1,
    name: 'Dr. M. Mohan Babu',
    category: 'Vice Chancellor',
    position: 'Chairperson',
    contact: '',
    hasPhotoCard: false,
  },
  {
    sNo: 2,
    name: 'Dr. T. Somassoundaram',
    category: 'Dean I/c, School of Engineering and Technology (SOET)',
    position: 'Member',
    contact: '',
    hasPhotoCard: false,
  },
  {
    sNo: 3,
    name: 'Dr. P. Jyotheeswari',
    category: 'Dean I/c, School of Computer Science and Engineering (SCSE)',
    position: 'Member',
    contact: '',
    hasPhotoCard: false,
  },
  {
    sNo: 4,
    name: 'Dr. K. Sundeep Kumar',
    category: 'Dean I/c, School of AI and Data Science (SAID)',
    position: 'Member',
    contact: '',
    hasPhotoCard: false,
  },
  {
    sNo: 5,
    name: 'Dr. M. Lavanya',
    category: 'Dean I/c, School of Computing and Information Sciences (SCIS)',
    position: 'Member',
    contact: '',
    hasPhotoCard: false,
  },
  {
    sNo: 6,
    name: 'Dr. N. Giri Babu',
    category: 'Dean I/c, School of Management Studies (SOMS)',
    position: 'Member',
    contact: '',
    hasPhotoCard: false,
  },
  {
    sNo: 7,
    name: 'Dr. V. Sujatha',
    category: 'Dean I/c, School of Allied Health Sciences (SAHS)',
    position: 'Member',
    contact: '',
    hasPhotoCard: false,
  },
  {
    sNo: 8,
    name: 'Dr. K. Komala',
    category: 'Dean I/c, Humanities and Sciences',
    position: 'Member',
    contact: '',
    hasPhotoCard: false,
  },
  {
    sNo: 9,
    name: 'Dr. Rayadurgam Narayana',
    category: 'Dean I/c, School of Law Studies (SOLS)',
    position: 'Member',
    contact: '',
    hasPhotoCard: false,
  },
  {
    sNo: 10,
    name: 'Dr. E. Lokanadha Reddy',
    category: 'Registrar',
    position: 'Member Secretary',
    contact: '',
    hasPhotoCard: false,
  },

  // Category (B): Nominated by the Chancellor of the University
  // Sub-category: Two (2) members of the Board of Management
  {
    sNo: 11,
    name: 'Dr. M. Chandrasekhar, Professor (HAG), Department of Civil Engineering, NIT, Warangal',
    category: 'Member of the Board of Management',
    position: 'Member',
    contact: '',
    hasPhotoCard: true,
    shortRole: 'Professor (HAG), NIT Warangal | Board of Management',
    subGroup: 'Two (2) members of the Board of Management',
  },
  {
    sNo: 12,
    name: 'Dr. I. Sudarsan Kumar',
    category: 'Member of the Board of Management',
    position: 'Member',
    contact: '',
    hasPhotoCard: false,
    subGroup: 'Two (2) members of the Board of Management',
  },

  // Sub-category: Two (2) Members of the Governing Body
  {
    sNo: 13,
    name: 'Sri. Ravuri. V. Srinivas',
    category: 'Member of the Governing Body',
    position: 'Member',
    contact: '',
    hasPhotoCard: true,
    photoImage: proChancellorPhoto,
    shortRole: 'Member of Governing Body & Pro-Chancellor',
    subGroup: 'Two (2) Members of the Governing Body',
  },
  {
    sNo: 14,
    name: 'Dr. R. Shalini, Member, Srinivasa Educational Academy, RVS Nagar, Chittoor (AP).',
    category: 'Member of the Governing Body',
    position: 'Member',
    contact: '',
    hasPhotoCard: true,
    shortRole: 'Member, Srinivasa Educational Academy | Governing Body',
    subGroup: 'Two (2) Members of the Governing Body',
  },

  // Sub-category: Two (2) former Vice-Chancellors of the University
  {
    sNo: 15,
    name: 'Dr. G. Ranga Janardhana',
    category: 'Former Vice-Chancellor of the University',
    position: 'Member',
    contact: '',
    hasPhotoCard: true,
    shortRole: 'Former Vice-Chancellor of the University',
    subGroup: 'Two (2) former Vice-Chancellors of the University',
  },
  {
    sNo: 16,
    name: 'Dr. N. Dhananjaya',
    category: 'Former Vice-Chancellor of the University',
    position: 'Member',
    contact: '',
    hasPhotoCard: true,
    shortRole: 'Former Vice-Chancellor of the University',
    subGroup: 'Two (2) former Vice-Chancellors of the University',
  },

  // Sub-category: Three (3) Professors representing different Schools in the University
  {
    sNo: 17,
    name: 'Dr. B. Damodhara Reddy, Head, Department of Civil Engineering',
    category: 'Professor nominated by the Chancellor',
    position: 'Member',
    contact: '',
    hasPhotoCard: false,
    subGroup: 'Three (3) Professors representing different Schools in the University (to be chosen from a panel of 6 names recommended by the Vice-Chancellor)',
  },
  {
    sNo: 18,
    name: 'Dr. V. Nirupama, Head, Department of Physics',
    category: 'Professor nominated by the Chancellor',
    position: 'Member',
    contact: '',
    hasPhotoCard: false,
    subGroup: 'Three (3) Professors representing different Schools in the University (to be chosen from a panel of 6 names recommended by the Vice-Chancellor)',
  },
  {
    sNo: 19,
    name: 'Dr. J. Velmurugan, Head, Department of Information Technology',
    category: 'Professor nominated by the Chancellor',
    position: 'Member',
    contact: '',
    hasPhotoCard: false,
    subGroup: 'Three (3) Professors representing different Schools in the University (to be chosen from a panel of 6 names recommended by the Vice-Chancellor)',
  },

  // Sub-category: Three (3) academicians... from outside the University
  {
    sNo: 20,
    name: 'Dr. Rakesh Kumar Jain, Vice Chancellor, Ajeenkya DY Patil University, Lohegaon, Pune - 411033',
    category: 'Professor from outside the University, nominated by the Chancellor',
    position: 'Member',
    contact: '',
    hasPhotoCard: true,
    shortRole: 'Vice Chancellor, Ajeenkya DY Patil University, Pune',
    subGroup: 'Three (3) academicians, either serving or retired, who held / are holding a post not below the rank of a Professor, from outside the University (to be chosen from a panel of 6 names recommended by the Vice-Chancellor)',
  },
  {
    sNo: 21,
    name: 'Dr. M. Muralidhar, Former Principal, SVU College of Engineering, S V University, Tirupati & Former Director, SVCET',
    category: 'Professor from outside the University, nominated by the Chancellor',
    position: 'Member',
    contact: '',
    hasPhotoCard: true,
    shortRole: 'Former Principal, SVUCE & Former Director, SVCET',
    subGroup: 'Three (3) academicians, either serving or retired, who held / are holding a post not below the rank of a Professor, from outside the University (to be chosen from a panel of 6 names recommended by the Vice-Chancellor)',
  },
  {
    sNo: 22,
    name: 'Dr. P. Sathyanarayana, DAP, JNTUA, Ananthapuramu',
    category: 'Professor from outside the University, nominated by the Chancellor',
    position: 'Member',
    contact: '',
    hasPhotoCard: true,
    shortRole: 'DAP, JNTUA, Ananthapuramu',
    subGroup: 'Three (3) academicians, either serving or retired, who held / are holding a post not below the rank of a Professor, from outside the University (to be chosen from a panel of 6 names recommended by the Vice-Chancellor)',
  },

  // Sub-category: Three (3) eminent persons from industry / medicine / engineering / business / law / banking etc.
  {
    sNo: 23,
    name: 'Mr. Arun Mozhi Devan M., Executive Director, General Management, BHEL, Ranipet.',
    category: 'Nominated by the Chancellor',
    position: 'Member',
    contact: '',
    hasPhotoCard: true,
    shortRole: 'Executive Director, General Management, BHEL, Ranipet',
    subGroup: 'Three (3) eminent persons from industry / medicine / engineering / business / law / banking etc.',
  },
  {
    sNo: 24,
    name: 'Mr. Nagaraj Chinni, Executive IT Architect and Associate Partner, IBM, Bangalore',
    category: 'Nominated by the Chancellor',
    position: 'Member',
    contact: '',
    hasPhotoCard: false,
    subGroup: 'Three (3) eminent persons from industry / medicine / engineering / business / law / banking etc.',
  },
  {
    sNo: 25,
    name: 'Dr. T. Indrani, Apollo Clinic, Kondapur, Hyderabad.',
    category: 'Nominated by the Chancellor',
    position: 'Member',
    contact: '',
    hasPhotoCard: true,
    shortRole: 'Apollo Clinic, Kondapur, Hyderabad',
    subGroup: 'Three (3) eminent persons from industry / medicine / engineering / business / law / banking etc.',
  },

  // Sub-category: Six (6) meritorious students
  {
    sNo: 26,
    name: 'Chikati Dhilleswari, I B. Tech - CSE-A',
    category: 'Nominated by the Chancellor',
    position: 'Member',
    contact: '',
    hasPhotoCard: false,
    subGroup: 'Six (6) meritorious students (3 male and 3 female) - 2 each from UG, PG, and Ph. D programs in the University, (to be chosen from a panel of 12 names recommended by the Vice-Chancellor)',
  },
  {
    sNo: 27,
    name: 'Abbu Pujasri, I B. Tech - CSC - A',
    category: 'Nominated by the Chancellor',
    position: 'Member',
    contact: '',
    hasPhotoCard: false,
    subGroup: 'Six (6) meritorious students (3 male and 3 female) - 2 each from UG, PG, and Ph. D programs in the University, (to be chosen from a panel of 12 names recommended by the Vice-Chancellor)',
  },
  {
    sNo: 28,
    name: 'Guddadha Bhaskar, I B. Tech - ECE-A',
    category: 'Nominated by the Chancellor',
    position: 'Member',
    contact: '',
    hasPhotoCard: false,
    subGroup: 'Six (6) meritorious students (3 male and 3 female) - 2 each from UG, PG, and Ph. D programs in the University, (to be chosen from a panel of 12 names recommended by the Vice-Chancellor)',
  },
  {
    sNo: 29,
    name: 'Shaik Khadeer Basha, I B. Tech – CSE (A & R)',
    category: 'Nominated by the Chancellor',
    position: 'Member',
    contact: '',
    hasPhotoCard: false,
    subGroup: 'Six (6) meritorious students (3 male and 3 female) - 2 each from UG, PG, and Ph. D programs in the University, (to be chosen from a panel of 12 names recommended by the Vice-Chancellor)',
  },
  {
    sNo: 30,
    name: 'C. Chenna Dinesh, I MCA',
    category: 'Nominated by the Chancellor',
    position: 'Member',
    contact: '',
    hasPhotoCard: false,
    subGroup: 'Six (6) meritorious students (3 male and 3 female) - 2 each from UG, PG, and Ph. D programs in the University, (to be chosen from a panel of 12 names recommended by the Vice-Chancellor)',
  },
  {
    sNo: 31,
    name: 'M. Kokila, I MBA',
    category: 'Nominated by the Chancellor',
    position: 'Member',
    contact: '',
    hasPhotoCard: false,
    subGroup: 'Six (6) meritorious students (3 male and 3 female) - 2 each from UG, PG, and Ph. D programs in the University, (to be chosen from a panel of 12 names recommended by the Vice-Chancellor)',
  },

  // Sub-category: Special Invitees nominated by the Chancellor
  {
    sNo: 32,
    name: 'Prof. Dandu Sivarama Raju, Professor & Director, Kansas State University Bulk Solids Innovation Center, 607 North Front Street, Salina.KS 67401.',
    category: 'Nominated by the Chancellor',
    position: 'Special Invitee',
    contact: '',
    hasPhotoCard: true,
    shortRole: 'Director, Kansas State University Bulk Solids Innovation Center, USA',
    subGroup: 'Special Invitees nominated by the Chancellor',
  },
  {
    sNo: 33,
    name: 'Dr. Sridhar Condoor, Professor of Aerospace and Mechanical Engineering, Department Chair, School of Science and Engineering, Saint Louis University, St. Louis, MO 63103, United States of America.',
    category: 'Nominated by the Chancellor',
    position: 'Special Invitee',
    contact: 'Email Id: sridhar.condoor@slu.edu, Mobile No: +1(314) 698-8615',
    hasPhotoCard: true,
    shortRole: 'Chair, Aerospace & Mechanical Engg, Saint Louis University, USA',
    subGroup: 'Special Invitees nominated by the Chancellor',
  },
  {
    sNo: 34,
    name: 'Dr. M. Kantha Reddy, Adjunct Director, EPICS-India, Purdue University, Adjunct Director-ABET, USA',
    category: 'Nominated by the Chancellor',
    position: 'Special Invitee',
    contact: 'Email Id: kanthareddy_m@yahoo.com, Mobile No: 9866577393',
    hasPhotoCard: true,
    shortRole: 'Adjunct Director, EPICS-India, Purdue University & ABET, USA',
    subGroup: 'Special Invitees nominated by the Chancellor',
  },
];

export const AcademicCouncilSection: React.FC = () => {
  const photoCardMembers = ACADEMIC_COUNCIL_MEMBERS.filter((m) => m.hasPhotoCard);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* SECTION 1: PHOTO BOXES OF MARKED MEMBERS */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[#D4BC9F]/60 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF3E7] text-[#8B4513] border border-[#D4BC9F] text-xs font-bold uppercase tracking-wider mb-2">
              <GraduationCap className="w-3.5 h-3.5 text-[#C6832B]" />
              <span>Chief Academic Authority</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-navy-950">
              Academic Council Members
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Eminent academicians, distinguished former vice-chancellors, industry leaders, and international special invitees.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold self-start sm:self-auto">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
            <span>{photoCardMembers.length} Key Dignitaries</span>
          </span>
        </div>

        {/* Responsive Grid for Photo Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {photoCardMembers.map((member) => (
            <div
              key={member.sNo}
              className="group bg-[#FDFBF7] rounded-2xl border border-[#D4BC9F] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Photo Box Container */}
              <div className="relative aspect-[3/4] w-full bg-gradient-to-br from-[#FAF3E7] via-[#F5EADB] to-[#EBDBC2] border-b border-[#D4BC9F] overflow-hidden flex items-center justify-center">
                {member.photoImage ? (
                  <img
                    src={member.photoImage}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full p-5 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 rounded-full bg-white/90 border-2 border-dashed border-[#C6832B] shadow-inner flex items-center justify-center text-[#9C6019] mb-3 group-hover:scale-110 transition-transform duration-300">
                      <User className="w-10 h-10 text-[#9C6019]" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-[#FAF3E7] text-[#8B4513] border border-[#D4BC9F]">
                      Official Photo Box
                    </span>
                  </div>
                )}

                {/* Position Badge Overlay */}
                <div className="absolute top-2.5 right-2.5">
                  <span
                    className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md ${
                      member.position === 'Special Invitee'
                        ? 'bg-purple-900 text-white border border-purple-700'
                        : member.position === 'Chairperson'
                        ? 'bg-[#9C6019] text-white border border-[#784308]'
                        : 'bg-navy-950 text-white border border-slate-700'
                    }`}
                  >
                    {member.position}
                  </span>
                </div>
              </div>

              {/* Member Details */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2 bg-white">
                <div>
                  <h4 className="font-serif text-sm sm:text-base font-bold text-navy-950 group-hover:text-[#9C6019] transition-colors leading-snug line-clamp-2">
                    {member.name.split(',')[0]}
                  </h4>
                  {member.shortRole && (
                    <p className="text-[11px] font-semibold text-[#8B4513] mt-1 line-clamp-2">
                      {member.shortRole}
                    </p>
                  )}
                </div>

                {member.contact ? (
                  <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-600 space-y-0.5">
                    <p className="truncate font-medium text-slate-700">📞 {member.contact.split('Mobile No:')[1] || member.contact}</p>
                    {member.contact.includes('Email Id:') && (
                      <p className="truncate text-[#9C6019]">✉️ {member.contact.split('Email Id:')[1]?.split('Mobile No:')[0]?.trim()}</p>
                    )}
                  </div>
                ) : (
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-[10px] text-slate-500 line-clamp-2">
                      <strong className="text-slate-700 font-medium">Category:</strong> {member.category}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: COMPLETE TABLE EXACTLY AS PROVIDED ACROSS PAGES 1, 2, AND 3 */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[#D4BC9F]/60 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B4513] uppercase tracking-wider">
              <Landmark className="w-4 h-4 text-[#C6832B]" />
              <span>Statutory Council Constitution</span>
            </div>
            <h3 className="font-serif text-2xl font-extrabold text-navy-950 mt-1">
              Constitution of the Academic Council:
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium self-start sm:self-auto">
            Total Members: {ACADEMIC_COUNCIL_MEMBERS.length}
          </span>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto rounded-2xl border border-[#D4BC9F] shadow-sm bg-white">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-[#1B2A4A] via-[#15233E] to-[#0B172E] text-white">
                <th className="py-3.5 px-3 sm:px-4 font-bold text-center w-14 sm:w-16 border-r border-slate-700">
                  S. No.
                </th>
                <th className="py-3.5 px-4 sm:px-5 font-bold min-w-[220px] border-r border-slate-700">
                  Name
                </th>
                <th className="py-3.5 px-4 sm:px-5 font-bold min-w-[280px] border-r border-slate-700">
                  Category
                </th>
                <th className="py-3.5 px-4 font-bold text-center min-w-[160px] border-r border-slate-700">
                  Position in Academic Council
                </th>
                <th className="py-3.5 px-4 font-bold min-w-[180px]">
                  Contact Details (E-mail & Mobile No.)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {/* Category (A) - Ex-Officio Members */}
              <tr className="bg-[#FAF3E7] border-y-2 border-[#D4BC9F]">
                <td
                  colSpan={5}
                  className="py-2.5 px-4 font-extrabold text-xs uppercase tracking-wider text-[#8B4513]"
                >
                  Category (A) - Ex-Officio Members
                </td>
              </tr>
              {ACADEMIC_COUNCIL_MEMBERS.filter((m) => m.sNo <= 10).map((member) => (
                <tr
                  key={member.sNo}
                  className={`hover:bg-amber-50/50 transition-colors ${
                    member.hasPhotoCard ? 'bg-amber-50/20' : ''
                  }`}
                >
                  <td className="py-3 px-3 sm:px-4 text-center font-bold text-slate-700 border-r border-slate-200">
                    {member.sNo}.
                  </td>
                  <td className="py-3 px-4 sm:px-5 font-semibold text-navy-950 border-r border-slate-200">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span>{member.name}</span>
                      {member.hasPhotoCard && (
                        <span className="text-[10px] bg-[#FAF3E7] text-[#8B4513] font-bold px-1.5 py-0.5 rounded border border-[#D4BC9F]">
                          Photo Above
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 sm:px-5 text-slate-700 leading-snug border-r border-slate-200">
                    {member.category}
                  </td>
                  <td className="py-3 px-4 text-center border-r border-slate-200">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                        member.position === 'Chairperson'
                          ? 'bg-[#9C6019] text-white shadow-sm'
                          : member.position === 'Member Secretary'
                          ? 'bg-navy-900 text-white shadow-sm'
                          : 'bg-[#FAF3E7] text-[#8B4513] border border-[#D4BC9F]'
                      }`}
                    >
                      {member.position}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {member.contact ? (
                      <span className="text-xs">{member.contact}</span>
                    ) : (
                      <span className="text-slate-400 font-light">—</span>
                    )}
                  </td>
                </tr>
              ))}

              {/* Category (B): Nominated by the Chancellor of the University */}
              <tr className="bg-[#FAF3E7] border-y-2 border-[#D4BC9F]">
                <td
                  colSpan={5}
                  className="py-2.5 px-4 font-extrabold text-xs uppercase tracking-wider text-[#8B4513]"
                >
                  Category (B): Nominated by the Chancellor of the University
                </td>
              </tr>

              {/* Sub-group: Two (2) members of the Board of Management */}
              <tr className="bg-slate-100 border-y border-slate-300">
                <td
                  colSpan={5}
                  className="py-2 px-4 font-bold text-xs text-navy-950 italic"
                >
                  Two (2) members of the Board of Management
                </td>
              </tr>
              {ACADEMIC_COUNCIL_MEMBERS.filter((m) => m.sNo >= 11 && m.sNo <= 12).map((member) => (
                <RowItem key={member.sNo} member={member} />
              ))}

              {/* Sub-group: Two (2) Members of the Governing Body */}
              <tr className="bg-slate-100 border-y border-slate-300">
                <td
                  colSpan={5}
                  className="py-2 px-4 font-bold text-xs text-navy-950 italic"
                >
                  Two (2) Members of the Governing Body
                </td>
              </tr>
              {ACADEMIC_COUNCIL_MEMBERS.filter((m) => m.sNo >= 13 && m.sNo <= 14).map((member) => (
                <RowItem key={member.sNo} member={member} />
              ))}

              {/* Sub-group: Two (2) former Vice-Chancellors of the University */}
              <tr className="bg-slate-100 border-y border-slate-300">
                <td
                  colSpan={5}
                  className="py-2 px-4 font-bold text-xs text-navy-950 italic"
                >
                  Two (2) former Vice-Chancellors of the University
                </td>
              </tr>
              {ACADEMIC_COUNCIL_MEMBERS.filter((m) => m.sNo >= 15 && m.sNo <= 16).map((member) => (
                <RowItem key={member.sNo} member={member} />
              ))}

              {/* Sub-group: Three (3) Professors representing different Schools in the University */}
              <tr className="bg-slate-100 border-y border-slate-300">
                <td
                  colSpan={5}
                  className="py-2 px-4 font-bold text-xs text-navy-950 italic"
                >
                  Three (3) Professors representing different Schools in the University (to be chosen from a panel of 6 names recommended by the Vice-Chancellor)
                </td>
              </tr>
              {ACADEMIC_COUNCIL_MEMBERS.filter((m) => m.sNo >= 17 && m.sNo <= 19).map((member) => (
                <RowItem key={member.sNo} member={member} />
              ))}

              {/* Sub-group: Three (3) academicians... from outside the University */}
              <tr className="bg-slate-100 border-y border-slate-300">
                <td
                  colSpan={5}
                  className="py-2 px-4 font-bold text-xs text-navy-950 italic"
                >
                  Three (3) academicians, either serving or retired, who held / are holding a post not below the rank of a Professor, from outside the University (to be chosen from a panel of 6 names recommended by the Vice-Chancellor)
                </td>
              </tr>
              {ACADEMIC_COUNCIL_MEMBERS.filter((m) => m.sNo >= 20 && m.sNo <= 22).map((member) => (
                <RowItem key={member.sNo} member={member} />
              ))}

              {/* Sub-group: Three (3) eminent persons from industry / medicine / engineering / business / law / banking etc. */}
              <tr className="bg-slate-100 border-y border-slate-300">
                <td
                  colSpan={5}
                  className="py-2 px-4 font-bold text-xs text-navy-950 italic"
                >
                  Three (3) eminent persons from industry / medicine / engineering / business / law / banking etc.
                </td>
              </tr>
              {ACADEMIC_COUNCIL_MEMBERS.filter((m) => m.sNo >= 23 && m.sNo <= 25).map((member) => (
                <RowItem key={member.sNo} member={member} />
              ))}

              {/* Sub-group: Six (6) meritorious students */}
              <tr className="bg-slate-100 border-y border-slate-300">
                <td
                  colSpan={5}
                  className="py-2 px-4 font-bold text-xs text-navy-950 italic"
                >
                  Six (6) meritorious students (3 male and 3 female) - 2 each from UG, PG, and Ph. D programs in the University, (to be chosen from a panel of 12 names recommended by the Vice-Chancellor)
                </td>
              </tr>
              {ACADEMIC_COUNCIL_MEMBERS.filter((m) => m.sNo >= 26 && m.sNo <= 31).map((member) => (
                <RowItem key={member.sNo} member={member} />
              ))}

              {/* Sub-group: Special Invitees nominated by the Chancellor */}
              <tr className="bg-slate-100 border-y border-slate-300">
                <td
                  colSpan={5}
                  className="py-2 px-4 font-bold text-xs text-navy-950 italic"
                >
                  Special Invitees nominated by the Chancellor
                </td>
              </tr>
              {ACADEMIC_COUNCIL_MEMBERS.filter((m) => m.sNo >= 32 && m.sNo <= 34).map((member) => (
                <RowItem key={member.sNo} member={member} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const RowItem: React.FC<{ member: AcademicCouncilMember }> = ({ member }) => {
  return (
    <tr
      className={`hover:bg-amber-50/50 transition-colors ${
        member.hasPhotoCard ? 'bg-amber-50/20' : ''
      }`}
    >
      <td className="py-3 px-3 sm:px-4 text-center font-bold text-slate-700 border-r border-slate-200">
        {member.sNo}.
      </td>
      <td className="py-3 px-4 sm:px-5 font-semibold text-navy-950 border-r border-slate-200">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span>{member.name}</span>
          {member.hasPhotoCard && (
            <span className="text-[10px] bg-[#FAF3E7] text-[#8B4513] font-bold px-1.5 py-0.5 rounded border border-[#D4BC9F]">
              Photo Above
            </span>
          )}
        </div>
      </td>
      <td className="py-3 px-4 sm:px-5 text-slate-700 leading-snug border-r border-slate-200">
        {member.category}
      </td>
      <td className="py-3 px-4 text-center border-r border-slate-200">
        <span
          className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
            member.position === 'Special Invitee'
              ? 'bg-purple-100 text-purple-900 border border-purple-300'
              : member.position === 'Chairperson'
              ? 'bg-[#9C6019] text-white shadow-sm'
              : member.position === 'Member Secretary'
              ? 'bg-navy-900 text-white shadow-sm'
              : 'bg-[#FAF3E7] text-[#8B4513] border border-[#D4BC9F]'
          }`}
        >
          {member.position}
        </span>
      </td>
      <td className="py-3 px-4 text-slate-600">
        {member.contact ? (
          <div className="text-xs space-y-0.5">
            {member.contact.split(',').map((part, idx) => (
              <div key={idx}>{part.trim()}</div>
            ))}
          </div>
        ) : (
          <span className="text-slate-400 font-light">—</span>
        )}
      </td>
    </tr>
  );
};
