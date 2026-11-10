import React, { useState } from 'react';
import { ShieldCheck, User, Landmark, Building2 } from 'lucide-react';

export interface BoardOfManagementMember {
  sNo: number;
  name: string;
  category: string;
  position: 'Chairperson' | 'Member' | 'Member Secretary' | 'Special Invitee';
  hasPhotoCard: boolean;
  photoImage?: string;
  shortRole?: string;
  subGroup?: string;
}

export const BOARD_OF_MANAGEMENT_MEMBERS: BoardOfManagementMember[] = [
  // Category (A) - Ex-Officio Members
  {
    sNo: 1,
    name: 'Dr. M. Mohan Babu',
    category: 'Vice Chancellor',
    position: 'Chairperson',
    hasPhotoCard: false,
  },

  // Sub-category: Deans / Directors /Heads of the Departments of the University
  {
    sNo: 2,
    name: 'Dr. I. Sudarsan Kumar, Director of Academic and Planning',
    category: 'nominated by the Sponsoring Body',
    position: 'Member',
    hasPhotoCard: false,
    subGroup: 'Deans / Directors /Heads of the Departments of the University (4 members from all the three categories to be nominated by the Sponsoring Body)',
  },
  {
    sNo: 3,
    name: 'Dr. P Jyotheeswari, Dean, School of Computer Science and Engineering (SCSE)',
    category: 'nominated by the Sponsoring Body',
    position: 'Member',
    hasPhotoCard: false,
    subGroup: 'Deans / Directors /Heads of the Departments of the University (4 members from all the three categories to be nominated by the Sponsoring Body)',
  },
  {
    sNo: 4,
    name: 'Dr. M Lavanya, Dean, School of Computing and Information Sciences (SCIS)',
    category: 'nominated by the Sponsoring Body',
    position: 'Member',
    hasPhotoCard: false,
    subGroup: 'Deans / Directors /Heads of the Departments of the University (4 members from all the three categories to be nominated by the Sponsoring Body)',
  },
  {
    sNo: 5,
    name: 'Dr. J Velmurugan, Head, Dept of Information Technology',
    category: 'nominated by the Sponsoring Body',
    position: 'Member',
    hasPhotoCard: false,
    subGroup: 'Deans / Directors /Heads of the Departments of the University (4 members from all the three categories to be nominated by the Sponsoring Body)',
  },
  {
    sNo: 6,
    name: 'Dr. E. Lokanadha Reddy',
    category: 'Registrar',
    position: 'Member Secretary',
    hasPhotoCard: false,
  },

  // Category (B) - Nominated Members
  // Sub-category: Three (3) persons of whom one shall be a distinguished academician...
  {
    sNo: 7,
    name: 'Dr. M. Chandrasekhar, Professor (HAG), Department of Civil Engineering, NIT, Warangal',
    category: 'nominated by the Sponsoring Body',
    position: 'Member',
    hasPhotoCard: true,
    photoImage: '/images/governance/dr-m-chandrasekhar.jpg',
    shortRole: 'Professor (HAG), NIT Warangal',
    subGroup: 'Three (3) persons of whom one shall be a distinguished academician who is not a member of the Governing Body. (to be nominated by the Sponsoring Body)',
  },
  {
    sNo: 8,
    name: 'Sri. A. Prakash Ambavaram, Vice-Chairman, Council for Social Development, Karakambadi Road, Tirupati.',
    category: 'nominated by the Sponsoring Body',
    position: 'Member',
    hasPhotoCard: true,
    photoImage: '/images/governance/sri-a-prakash-ambavaram.jpg',
    shortRole: 'Vice-Chairman, Council for Social Development, Tirupati',
    subGroup: 'Three (3) persons of whom one shall be a distinguished academician who is not a member of the Governing Body. (to be nominated by the Sponsoring Body)',
  },
  {
    sNo: 9,
    name: 'Smt. Poonuri Deepthi, MS, MBA, Annamacharya Educational Trust, Rajampeta.',
    category: 'nominated by the Sponsoring Body',
    position: 'Member',
    hasPhotoCard: true,
    shortRole: 'Annamacharya Educational Trust, Rajampeta',
    subGroup: 'Three (3) persons of whom one shall be a distinguished academician who is not a member of the Governing Body. (to be nominated by the Sponsoring Body)',
  },

  // Sub-category: Four (4) eminent persons...
  {
    sNo: 10,
    name: 'Dr. Subbaraman Balasubramanyan, Executive Director, A & T Video Networks, Madurai.',
    category: 'nominated by the Sponsoring Body',
    position: 'Member',
    hasPhotoCard: true,
    photoImage: '/images/governance/dr-subbaraman-balasubramanyan.jpg',
    shortRole: 'Executive Director, A & T Video Networks, Madurai',
    subGroup: 'Four (4) eminent persons, one each from the fields of Management / Finance / Science and Technology / Public Administration who are not members of the Governing Body (to be nominated by the Sponsoring Body)',
  },
  {
    sNo: 11,
    name: 'Sri. Rajasekhar Kandepu, Strategy, OD & Leadership Coaching, Power Mech Projects Limited, Hyderabad.',
    category: 'nominated by the Sponsoring Body',
    position: 'Member',
    hasPhotoCard: true,
    photoImage: '/images/governance/sri-rajasekhar-kandepu.jpg',
    shortRole: 'Strategy, OD & Leadership Coaching, Power Mech Projects Ltd',
    subGroup: 'Four (4) eminent persons, one each from the fields of Management / Finance / Science and Technology / Public Administration who are not members of the Governing Body (to be nominated by the Sponsoring Body)',
  },
  {
    sNo: 12,
    name: 'Sri. Ravi Kumar Krovvidi, Founder and Managing Partner, 4AT Consulting, LLP, 3rd Floor, D-Block, 1 Labs Center, Madhapur, Hyderabad, TS - 500081',
    category: 'nominated by the Sponsoring Body',
    position: 'Member',
    hasPhotoCard: true,
    photoImage: '/images/governance/sri-ravi-kumar-krovvidi.jpg',
    shortRole: 'Founder & Managing Partner, 4AT Consulting LLP, Hyderabad',
    subGroup: 'Four (4) eminent persons, one each from the fields of Management / Finance / Science and Technology / Public Administration who are not members of the Governing Body (to be nominated by the Sponsoring Body)',
  },
  {
    sNo: 13,
    name: 'Sri. T. Surendranath, Divisional Engineer, MTCE, BSNL, Chittoor',
    category: 'nominated by the Sponsoring Body',
    position: 'Member',
    hasPhotoCard: true,
    photoImage: '/images/governance/sri-t-surendranath.jpg',
    shortRole: 'Divisional Engineer, MTCE, BSNL, Chittoor',
    subGroup: 'Four (4) eminent persons, one each from the fields of Management / Finance / Science and Technology / Public Administration who are not members of the Governing Body (to be nominated by the Sponsoring Body)',
  },

  // Sub-category: Special Invitees nominated by the Sponsoring Body
  {
    sNo: 14,
    name: 'Prof. Dandu Sivarama Raju, Professor & Director, Kansas State University Bulk Solids Innovation Center, 607 North Front Street, Salina.KS 67401.',
    category: 'nominated by the Sponsoring Body',
    position: 'Special Invitee',
    hasPhotoCard: true,
    photoImage: '/images/governance/prof-dandu-sivarama-raju.jpg',
    shortRole: 'Professor & Director, Kansas State University, USA',
    subGroup: 'Special Invitees nominated by the Sponsoring Body',
  },
  {
    sNo: 15,
    name: 'Mr. Ajit Kumar Koppali, Chairman, VDM India on the move, 109 CDR IXORA, NRI Layout, 14th Main, Kalkare, Bangalore - 43',
    category: 'nominated by the Sponsoring Body',
    position: 'Special Invitee',
    hasPhotoCard: true,
    photoImage: '/images/governance/mr-ajit-kumar-koppali.jpg',
    shortRole: 'Chairman, VDM India on the move, Bangalore',
    subGroup: 'Special Invitees nominated by the Sponsoring Body',
  },
  {
    sNo: 16,
    name: 'Dr. Sridhar Condoor, Professor of Aerospace and Mechanical Engineering, Department Chair, School of Science and Engineering, Saint Louis University, St. Louis, MO 63103, United States of America.',
    category: 'nominated by the Sponsoring Body',
    position: 'Special Invitee',
    hasPhotoCard: true,
    photoImage: '/images/governance/dr-sridhar-condoor.webp',
    shortRole: 'Chair, Aerospace & Mechanical Engg., Saint Louis University, USA',
    subGroup: 'Special Invitees nominated by the Sponsoring Body',
  },
];

export const BoardOfManagementSection: React.FC = () => {
  const photoCardMembers = BOARD_OF_MANAGEMENT_MEMBERS.filter((m) => m.hasPhotoCard);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* SECTION 1: PHOTO BOXES OF MARKED MEMBERS */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[#D4BC9F]/60 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF3E7] text-[#8B4513] border border-[#D4BC9F] text-xs font-bold uppercase tracking-wider mb-2">
              <Building2 className="w-3.5 h-3.5 text-[#C6832B]" />
              <span>University Administration & Management</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-navy-950">
              Board of Management Members
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Distinguished academic leaders, industry experts, corporate executives, and international dignitaries.
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
              <span>Statutory Executive Constitution</span>
            </div>
            <h3 className="font-serif text-2xl font-extrabold text-navy-950 mt-1">
              Constitution of the Board of Management
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium self-start sm:self-auto">
            Total Members: {BOARD_OF_MANAGEMENT_MEMBERS.length}
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
                <th className="py-3.5 px-4 sm:px-5 font-bold min-w-[280px] border-r border-slate-700">
                  Category
                </th>
                <th className="py-3.5 px-4 font-bold text-center min-w-[180px]">
                  Position in Board of Management
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
              {BOARD_OF_MANAGEMENT_MEMBERS.filter((m) => m.sNo <= 6).map((member) => (
                <RowItem key={member.sNo} member={member} />
              ))}

              {/* Category (B) - Nominated Members */}
              <tr className="bg-[#FAF3E7] border-y-2 border-[#D4BC9F]">
                <td
                  colSpan={4}
                  className="py-2.5 px-4 font-extrabold text-xs uppercase tracking-wider text-[#8B4513]"
                >
                  Category (B) - Nominated Members
                </td>
              </tr>
              {BOARD_OF_MANAGEMENT_MEMBERS.filter((m) => m.sNo >= 7).map((member) => (
                <RowItem key={member.sNo} member={member} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const PhotoCardItem: React.FC<{ member: BoardOfManagementMember }> = ({ member }) => {
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

        {/* Position Badge Overlay */}
        <div className="absolute top-2 right-2">
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

const RowItem: React.FC<{ member: BoardOfManagementMember }> = ({ member }) => {
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
