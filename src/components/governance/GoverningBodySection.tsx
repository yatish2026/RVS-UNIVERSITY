import React, { useState } from 'react';
import { ShieldCheck, User, Landmark } from 'lucide-react';

export interface GoverningMember {
  sNo: number;
  name: string;
  category: string;
  position: 'Chairperson' | 'Member' | 'Member Secretary';
  hasPhotoCard: boolean;
  photoImage?: string;
  shortRole?: string;
}

export const GOVERNING_BODY_MEMBERS: GoverningMember[] = [
  // Category (A) - Ex-Officio
  {
    sNo: 1,
    name: 'Dr. Ravuri Venkataswamy',
    category: 'Chancellor',
    position: 'Chairperson',
    hasPhotoCard: true,
    photoImage: '/images/governance/dr-ravuri-venkataswamy.jpeg',
    shortRole: 'Chancellor, RVS University',
  },
  {
    sNo: 2,
    name: 'Dr. M. Mohan Babu',
    category: 'Vice Chancellor',
    position: 'Member',
    hasPhotoCard: false,
  },
  {
    sNo: 3,
    name: 'Prof. S. Vijaya Bhaskara Rao',
    category: 'Chairman I/c, AP State Council of Higher Education',
    position: 'Member',
    hasPhotoCard: false,
  },
  {
    sNo: 4,
    name: 'Sri. J. Syamala Rao, IAS',
    category: 'Secretary to Government, Higher Education Department, Government of Andhra Pradesh',
    position: 'Member',
    hasPhotoCard: false,
  },
  {
    sNo: 5,
    name: 'Dr. E. Lokanadha Reddy',
    category: 'Registrar',
    position: 'Member Secretary',
    hasPhotoCard: false,
  },

  // Category (B) - Nominated Members
  {
    sNo: 6,
    name: 'Sri. Ravuri. V. Srinivas',
    category: 'An eminent academician from the fields of Science / Engineering & Technology / Social Sciences / Law / Management',
    position: 'Member',
    hasPhotoCard: true,
    photoImage: '/images/governance/sri-ravuri-v-srinivas.jpeg',
    shortRole: 'Pro-Chancellor & Eminent Academician',
  },
  {
    sNo: 7,
    name: "Dr. T. V. C. Sarma, Sci./Engr. 'SG', National Atmospheric Research Laboratory (NARL), Gadanki V & P, Pakala (M), Chittoor (D) – 517112, A.P.",
    category: 'The Director of a National Laboratory or his / her nominee not below the rank of Scientist G.',
    position: 'Member',
    hasPhotoCard: true,
    photoImage: '/images/governance/dr-tvc-sarma.jpg',
    shortRole: "Sci./Engr. 'SG', NARL",
  },
  {
    sNo: 8,
    name: 'Mr. TN Sreenivas, Vice Chairman, CII Tirupati Zone, Chief Operating Officer, Exafluence Global Analytics Pvt. Ltd.',
    category: 'Nominee of the Confederation of Indian Industry (CII)',
    position: 'Member',
    hasPhotoCard: true,
    photoImage: '/images/governance/mr-tn-sreenivas.jpg',
    shortRole: 'Vice Chairman CII Tirupati Zone & COO Exafluence',
  },
  {
    sNo: 9,
    name: 'Ms. Ramayanam Padmaja, Head-Internal Audit, Star Powerz Digital Technologies Ltd., Hyderabad',
    category: 'A reputed Chartered Accountant',
    position: 'Member',
    hasPhotoCard: false,
  },
  {
    sNo: 10,
    name: 'Smt. N. Sruthi Reddy, Member, Aditya Academy, Kakinada.',
    category: 'A member from public life who has contributed significantly to societal / national development',
    position: 'Member',
    hasPhotoCard: true,
    photoImage: '/images/governance/smt-n-sruthi-reddy.webp',
    shortRole: 'Member, Aditya Academy, Kakinada',
  },
  {
    sNo: 11,
    name: 'Dr. R. Shalini, Member, Srinivasa Educational Academy, RVS Nagar, Chittoor (AP).',
    category: 'A member of the Sponsoring Body',
    position: 'Member',
    hasPhotoCard: true,
    shortRole: 'Member, Srinivasa Educational Academy',
  },
];

export const GoverningBodySection: React.FC = () => {
  const photoCardMembers = GOVERNING_BODY_MEMBERS.filter((m) => m.hasPhotoCard);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* SECTION 1: PHOTO BOXES OF MARKED MEMBERS (5-Column Grid) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[#D4BC9F]/60 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF3E7] text-[#8B4513] border border-[#D4BC9F] text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C6832B]" />
              <span>University Authority</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-navy-950">
              Governing Body Members
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Leadership and distinguished members of the Constitution of the Governing Body.
            </p>
          </div>
        </div>

        {/* Responsive 5-Column Grid for Photo Cards (5 Dignitaries) */}
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
              <span>Official Gazette Notification</span>
            </div>
            <h3 className="font-serif text-2xl font-extrabold text-navy-950 mt-1">
              Constitution of the Governing Body
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium self-start sm:self-auto">
            Total Members: {GOVERNING_BODY_MEMBERS.length}
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
                <th className="py-3.5 px-4 sm:px-5 font-bold min-w-[220px] border-r border-slate-700">
                  Name
                </th>
                <th className="py-3.5 px-4 sm:px-5 font-bold min-w-[300px] border-r border-slate-700">
                  Category
                </th>
                <th className="py-3.5 px-4 font-bold text-center min-w-[170px]">
                  Position in Governing Body
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {/* Category (A) - Ex-Officio Header Row */}
              <tr className="bg-[#FAF3E7] border-y-2 border-[#D4BC9F]">
                <td
                  colSpan={4}
                  className="py-2.5 px-4 font-extrabold text-xs uppercase tracking-wider text-[#8B4513]"
                >
                  Category (A) - Ex-Officio
                </td>
              </tr>
              {GOVERNING_BODY_MEMBERS.filter((m) => m.sNo <= 5).map((member) => (
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

              {/* Category (B) - Nominated Members Header Row */}
              <tr className="bg-[#FAF3E7] border-y-2 border-[#D4BC9F]">
                <td
                  colSpan={4}
                  className="py-2.5 px-4 font-extrabold text-xs uppercase tracking-wider text-[#8B4513]"
                >
                  Category (B) – Nominated Members
                </td>
              </tr>
              {GOVERNING_BODY_MEMBERS.filter((m) => m.sNo >= 6).map((member) => (
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
                    <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-[#FAF3E7] text-[#8B4513] border border-[#D4BC9F]">
                      {member.position}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const PhotoCardItem: React.FC<{ member: GoverningMember }> = ({ member }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group bg-[#FDFBF7] rounded-xl border border-[#D4BC9F] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col">
      {/* Photo Box Container (Compact & Clean) */}
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

      {/* Member Details: Compact text */}
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
