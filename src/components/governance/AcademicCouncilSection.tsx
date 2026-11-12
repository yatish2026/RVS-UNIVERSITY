import React, { useState } from 'react';
import { ShieldCheck, User, Landmark, GraduationCap } from 'lucide-react';

export interface AcademicCouncilMember {
  sNo: number;
  name: string;
  category: string;
  position: 'Chairperson' | 'Member' | 'Member Secretary' | 'Special Invitee';
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
    hasPhotoCard: false,
  },
  {
    sNo: 2,
    name: 'Dr. T. Somassoundaram',
    category: 'Dean I/c, School of Engineering and Technology (SOET)',
    position: 'Member',
    hasPhotoCard: false,
  },
  {
    sNo: 3,
    name: 'Dr. P. Jyotheeswari',
    category: 'Dean I/c, School of Computer Science and Engineering (SCSE)',
    position: 'Member',
    hasPhotoCard: false,
  },
  {
    sNo: 4,
    name: 'Dr. K. Sundeep Kumar',
    category: 'Dean I/c, School of AI and Data Science (SAID)',
    position: 'Member',
    hasPhotoCard: false,
  },
  {
    sNo: 5,
    name: 'Dr. M. Lavanya',
    category: 'Dean I/c, School of Computing and Information Sciences (SCIS)',
    position: 'Member',
    hasPhotoCard: false,
  },
  {
    sNo: 6,
    name: 'Dr. N. Giri Babu',
    category: 'Dean I/c, School of Management Studies (SOMS)',
    position: 'Member',
    hasPhotoCard: false,
  },
  {
    sNo: 7,
    name: 'Dr. V. Sujatha',
    category: 'Dean I/c, School of Allied Health Sciences (SAHS)',
    position: 'Member',
    hasPhotoCard: false,
  },
  {
    sNo: 8,
    name: 'Dr. K. Komala',
    category: 'Dean I/c, Humanities and Sciences',
    position: 'Member',
    hasPhotoCard: false,
  },
  {
    sNo: 9,
    name: 'Dr. Rayadurgam Narayana',
    category: 'Dean I/c, School of Law Studies (SOLS)',
    position: 'Member',
    hasPhotoCard: false,
  },
  {
    sNo: 10,
    name: 'Dr. E. Lokanadha Reddy',
    category: 'Registrar',
    position: 'Member Secretary',
    hasPhotoCard: false,
  },

  // Category (B): Nominated by the Chancellor of the University
  // Sub-category: Two (2) members of the Board of Management
  {
    sNo: 11,
    name: 'Dr. M. Chandrasekhar, Professor (HAG), Department of Civil Engineering, NIT, Warangal',
    category: 'Member of the Board of Management',
    position: 'Member',
    hasPhotoCard: true,
    photoImage: '/images/governance/dr-m-chandrasekhar.jpg',
    shortRole: 'Professor (HAG), NIT Warangal | Board of Management',
    subGroup: 'Two (2) members of the Board of Management',
  },
  {
    sNo: 12,
    name: 'Dr. I. Sudarsan Kumar',
    category: 'Member of the Board of Management',
    position: 'Member',
    hasPhotoCard: false,
    subGroup: 'Two (2) members of the Board of Management',
  },

  // Sub-category: Two (2) Members of the Governing Body
  {
    sNo: 13,
    name: 'Sri. Ravuri. V. Srinivas',
    category: 'Member of the Governing Body',
    position: 'Member',
    hasPhotoCard: true,
    photoImage: '/images/governance/sri-ravuri-v-srinivas.jpeg',
    shortRole: 'Member of Governing Body & Pro-Chancellor',
    subGroup: 'Two (2) Members of the Governing Body',
  },
  {
    sNo: 14,
    name: 'Dr. R. Shalini, Member, Srinivasa Educational Academy, RVS Nagar, Chittoor (AP).',
    category: 'Member of the Governing Body',
    position: 'Member',
    hasPhotoCard: false,
    shortRole: 'Member, Srinivasa Educational Academy | Governing Body',
    subGroup: 'Two (2) Members of the Governing Body',
  },

  // Sub-category: Two (2) former Vice-Chancellors of the University
  {
    sNo: 15,
    name: 'Dr. G. Ranga Janardhana',
    category: 'Former Vice-Chancellor of the University',
    position: 'Member',
    hasPhotoCard: true,
    photoImage: '/images/governance/dr-g-ranga-janardhana.jpg',
    shortRole: 'Former Vice-Chancellor of the University',
    subGroup: 'Two (2) former Vice-Chancellors of the University',
  },
  {
    sNo: 16,
    name: 'Dr. N. Dhananjaya',
    category: 'Former Vice-Chancellor of the University',
    position: 'Member',
    hasPhotoCard: true,
    photoImage: '/images/governance/dr-n-dhananjaya.webp',
    shortRole: 'Former Vice-Chancellor of the University',
    subGroup: 'Two (2) former Vice-Chancellors of the University',
  },

  // Sub-category: Three (3) Professors representing different Schools in the University
  {
    sNo: 17,
    name: 'Dr. B. Damodhara Reddy, Head, Department of Civil Engineering',
    category: 'Professor nominated by the Chancellor',
    position: 'Member',
    hasPhotoCard: false,
    subGroup: 'Three (3) Professors representing different Schools in the University (to be chosen from a panel of 6 names recommended by the Vice-Chancellor)',
  },
  {
    sNo: 18,
    name: 'Dr. V. Nirupama, Head, Department of Physics',
    category: 'Professor nominated by the Chancellor',
    position: 'Member',
    hasPhotoCard: false,
    subGroup: 'Three (3) Professors representing different Schools in the University (to be chosen from a panel of 6 names recommended by the Vice-Chancellor)',
  },
  {
    sNo: 19,
    name: 'Dr. J. Velmurugan, Head, Department of Information Technology',
    category: 'Professor nominated by the Chancellor',
    position: 'Member',
    hasPhotoCard: false,
    subGroup: 'Three (3) Professors representing different Schools in the University (to be chosen from a panel of 6 names recommended by the Vice-Chancellor)',
  },

  // Sub-category: Three (3) academicians... from outside the University
  {
    sNo: 20,
    name: 'Dr. Rakesh Kumar Jain, Vice Chancellor, Ajeenkya DY Patil University, Lohegaon, Pune - 411033',
    category: 'Professor from outside the University, nominated by the Chancellor',
    position: 'Member',
    hasPhotoCard: true,
    photoImage: '/images/governance/dr-rakesh-kumar-jain.jpg',
    shortRole: 'Vice Chancellor, Ajeenkya DY Patil University, Pune',
    subGroup: 'Three (3) academicians, either serving or retired, who held / are holding a post not below the rank of a Professor, from outside the University (to be chosen from a panel of 6 names recommended by the Vice-Chancellor)',
  },
  {
    sNo: 21,
    name: 'Dr. M. Muralidhar, Former Principal, SVU College of Engineering, S V University, Tirupati & Former Director, SVCET',
    category: 'Professor from outside the University, nominated by the Chancellor',
    position: 'Member',
    hasPhotoCard: true,
    photoImage: '/images/governance/dr-m-muralidhar.jpg',
    shortRole: 'Former Principal, SVUCE & Former Director, SVCET',
    subGroup: 'Three (3) academicians, either serving or retired, who held / are holding a post not below the rank of a Professor, from outside the University (to be chosen from a panel of 6 names recommended by the Vice-Chancellor)',
  },
  {
    sNo: 22,
    name: 'Dr. P. Sathyanarayana, DAP, JNTUA, Ananthapuramu',
    category: 'Professor from outside the University, nominated by the Chancellor',
    position: 'Member',
    hasPhotoCard: true,
    photoImage: '/images/governance/dr-p-satyanarayana.jpg',
    shortRole: 'DAP, JNTUA, Ananthapuramu',
    subGroup: 'Three (3) academicians, either serving or retired, who held / are holding a post not below the rank of a Professor, from outside the University (to be chosen from a panel of 6 names recommended by the Vice-Chancellor)',
  },

  // Sub-category: Three (3) eminent persons from industry / medicine / engineering / business / law / banking etc.
  {
    sNo: 23,
    name: 'Sri. Arun Mozhi Devan M., Executive Director, General Management, BHEL, Ranipet.',
    category: 'Nominated by the Chancellor',
    position: 'Member',
    hasPhotoCard: false,
    shortRole: 'Executive Director, General Management, BHEL, Ranipet',
    subGroup: 'Three (3) eminent persons from industry / medicine / engineering / business / law / banking etc.',
  },
  {
    sNo: 24,
    name: 'Sri. Nagaraj Chinni, Executive IT Architect and Associate Partner, IBM, Bangalore',
    category: 'Nominated by the Chancellor',
    position: 'Member',
    hasPhotoCard: false,
    subGroup: 'Three (3) eminent persons from industry / medicine / engineering / business / law / banking etc.',
  },
  {
    sNo: 25,
    name: 'Dr. T. Indrani, Apollo Clinic, Kondapur, Hyderabad.',
    category: 'Nominated by the Chancellor',
    position: 'Member',
    hasPhotoCard: false,
    shortRole: 'Apollo Clinic, Kondapur, Hyderabad',
    subGroup: 'Three (3) eminent persons from industry / medicine / engineering / business / law / banking etc.',
  },

  // Sub-category: Six (6) meritorious students
  {
    sNo: 26,
    name: 'Chikati Dhilleswari, I B. Tech - CSE-A',
    category: 'Nominated by the Chancellor',
    position: 'Member',
    hasPhotoCard: false,
    subGroup: 'Six (6) meritorious students (3 male and 3 female) - 2 each from UG, PG, and Ph. D programs in the University, (to be chosen from a panel of 12 names recommended by the Vice-Chancellor)',
  },
  {
    sNo: 27,
    name: 'Abbu Pujasri, I B. Tech - CSC - A',
    category: 'Nominated by the Chancellor',
    position: 'Member',
    hasPhotoCard: false,
    subGroup: 'Six (6) meritorious students (3 male and 3 female) - 2 each from UG, PG, and Ph. D programs in the University, (to be chosen from a panel of 12 names recommended by the Vice-Chancellor)',
  },
  {
    sNo: 28,
    name: 'Guddadha Bhaskar, I B. Tech - ECE-A',
    category: 'Nominated by the Chancellor',
    position: 'Member',
    hasPhotoCard: false,
    subGroup: 'Six (6) meritorious students (3 male and 3 female) - 2 each from UG, PG, and Ph. D programs in the University, (to be chosen from a panel of 12 names recommended by the Vice-Chancellor)',
  },
  {
    sNo: 29,
    name: 'Shaik Khadeer Basha, I B. Tech – CSE (A & R)',
    category: 'Nominated by the Chancellor',
    position: 'Member',
    hasPhotoCard: false,
    subGroup: 'Six (6) meritorious students (3 male and 3 female) - 2 each from UG, PG, and Ph. D programs in the University, (to be chosen from a panel of 12 names recommended by the Vice-Chancellor)',
  },
  {
    sNo: 30,
    name: 'C. Chenna Dinesh, I MCA',
    category: 'Nominated by the Chancellor',
    position: 'Member',
    hasPhotoCard: false,
    subGroup: 'Six (6) meritorious students (3 male and 3 female) - 2 each from UG, PG, and Ph. D programs in the University, (to be chosen from a panel of 12 names recommended by the Vice-Chancellor)',
  },
  {
    sNo: 31,
    name: 'M. Kokila, I MBA',
    category: 'Nominated by the Chancellor',
    position: 'Member',
    hasPhotoCard: false,
    subGroup: 'Six (6) meritorious students (3 male and 3 female) - 2 each from UG, PG, and Ph. D programs in the University, (to be chosen from a panel of 12 names recommended by the Vice-Chancellor)',
  },

  // Sub-category: Special Invitees nominated by the Chancellor
  {
    sNo: 32,
    name: 'Prof. Dandu Sivarama Raju, Professor & Director, Kansas State University Bulk Solids Innovation Center, 607 North Front Street, Salina.KS 67401.',
    category: 'Nominated by the Chancellor',
    position: 'Special Invitee',
    hasPhotoCard: false,
    photoImage: '/images/governance/prof-dandu-sivarama-raju.jpg',
    shortRole: 'Director, Kansas State University Bulk Solids Center, USA',
    subGroup: 'Special Invitees nominated by the Chancellor',
  },
  {
    sNo: 33,
    name: 'Dr. Sridhar Condoor, Professor of Aerospace and Mechanical Engineering, Department Chair, School of Science and Engineering, Saint Louis University, St. Louis, MO 63103, United States of America.',
    category: 'Nominated by the Chancellor',
    position: 'Special Invitee',
    hasPhotoCard: true,
    photoImage: '/images/governance/dr-sridhar-condoor.webp',
    shortRole: 'Chair, Aerospace & Mechanical Engg, Saint Louis University, USA',
    subGroup: 'Special Invitees nominated by the Chancellor',
  },
  {
    sNo: 34,
    name: 'Dr. M. Kantha Reddy, Adjunct Director, EPICS-India, Purdue University, Adjunct Director-ABET, USA',
    category: 'Nominated by the Chancellor',
    position: 'Special Invitee',
    hasPhotoCard: true,
    photoImage: '/images/governance/dr-m-kantha-reddy.jpg',
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
              <span>Academic Authority</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-navy-950">
              Academic Council Members
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Eminent academicians, distinguished former vice-chancellors, industry leaders, and international special invitees.
            </p>
          </div>
        </div>

        {/* Responsive 5-Column Grid for Photo Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {photoCardMembers.map((member) => (
            <PhotoCardItem key={member.sNo} member={member} />
          ))}
        </div>
      </div>

      {/* SECTION 2: COMPLETE TABLE EXACTLY AS PROVIDED */}
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

        {/* Responsive Table (Contact Details removed as requested) */}
        <div className="overflow-x-auto rounded-2xl border border-[#D4BC9F] shadow-sm bg-white">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-[#1B2A4A] via-[#15233E] to-[#0B172E] text-white">
                <th className="py-3.5 px-3 sm:px-4 font-bold text-center w-14 sm:w-16 border-r border-slate-700">
                  S. No.
                </th>
                <th className="py-3.5 px-4 sm:px-5 font-bold min-w-[240px] border-r border-slate-700">
                  Name
                </th>
                <th className="py-3.5 px-4 sm:px-5 font-bold min-w-[300px] border-r border-slate-700">
                  Category
                </th>
                <th className="py-3.5 px-4 font-bold text-center min-w-[180px]">
                  Position in Academic Council
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {/* Category (A) - Ex-Officio Members */}
              <tr className="bg-[#FAF3E7] border-y-2 border-[#D4BC9F]">
                <td
                  colSpan={4}
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
                    <span>{member.name}</span>
                  </td>
                  <td className="py-3 px-4 sm:px-5 text-slate-700 leading-snug border-r border-slate-200">
                    {member.category}
                  </td>
                  <td className="py-3 px-4 text-center">
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
                </tr>
              ))}

              {/* Category (B): Nominated by the Chancellor of the University */}
              <tr className="bg-[#FAF3E7] border-y-2 border-[#D4BC9F]">
                <td
                  colSpan={4}
                  className="py-2.5 px-4 font-extrabold text-xs uppercase tracking-wider text-[#8B4513]"
                >
                  Category (B): Nominated by the Chancellor of the University
                </td>
              </tr>
              {ACADEMIC_COUNCIL_MEMBERS.filter((m) => m.sNo >= 11).map((member) => (
                <RowItem key={member.sNo} member={member} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const PhotoCardItem: React.FC<{ member: AcademicCouncilMember }> = ({ member }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group bg-[#FDFBF7] rounded-xl border border-[#D4BC9F] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col">
      {/* Photo Box Container (Compact & Professional) */}
      <div className="relative aspect-[4/5] w-full bg-gradient-to-br from-[#FAF3E7] via-[#F5EADB] to-[#EBDBC2] border-b border-[#D4BC9F] overflow-hidden flex items-center justify-center">
        {member.photoImage && !imgError ? (
          <img
            src={member.photoImage}
            alt={member.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full p-3 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-full bg-white/90 border-2 border-dashed border-[#C6832B] shadow-inner flex items-center justify-center text-[#9C6019] group-hover:scale-110 transition-transform duration-300">
              <User className="w-7 h-7 text-[#9C6019]" />
            </div>
          </div>
        )}
      </div>

      {/* Member Details: Compact & Clean */}
      <div className="p-2.5 sm:p-3 flex-1 flex flex-col justify-center space-y-0.5 bg-white text-center">
        <h4 className="font-serif text-xs sm:text-sm font-bold text-navy-950 group-hover:text-[#9C6019] transition-colors leading-snug line-clamp-2">
          {member.name.split(',')[0]}
        </h4>
        {member.shortRole && (
          <p className="text-[10px] sm:text-[11px] font-semibold text-[#8B4513] line-clamp-2">
            {member.shortRole}
          </p>
        )}
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
        <span>{member.name}</span>
      </td>
      <td className="py-3 px-4 sm:px-5 text-slate-700 leading-snug border-r border-slate-200">
        {member.category}
      </td>
      <td className="py-3 px-4 text-center">
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
    </tr>
  );
};
