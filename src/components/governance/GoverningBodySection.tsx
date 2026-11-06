import React from 'react';
import { ShieldCheck, User, Landmark, Mail, Phone, CheckCircle2 } from 'lucide-react';
import chancellorPhoto from '../../assets/Chairman Photo copy.jpg.jpeg';
import proChancellorPhoto from '../../assets/V Chairman Photo copy.jpg.jpeg';

export interface GoverningMember {
  sNo: number;
  name: string;
  category: string;
  position: 'Chairperson' | 'Member' | 'Member Secretary';
  contact: string;
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
    contact: '',
    hasPhotoCard: true,
    photoImage: chancellorPhoto,
    shortRole: 'Chancellor, RVS University',
  },
  {
    sNo: 2,
    name: 'Dr. M. Mohan Babu',
    category: 'Vice Chancellor',
    position: 'Member',
    contact: '',
    hasPhotoCard: false,
  },
  {
    sNo: 3,
    name: 'Prof. S. Vijaya Bhaskara Rao',
    category: 'Chairman I/c, AP State Council of Higher Education',
    position: 'Member',
    contact: '',
    hasPhotoCard: false,
  },
  {
    sNo: 4,
    name: 'Sri. J. Syamala Rao, IAS',
    category: 'Secretary to Government, Higher Education Department, Government of Andhra Pradesh',
    position: 'Member',
    contact: '',
    hasPhotoCard: false,
  },
  {
    sNo: 5,
    name: 'Dr. E. Lokanadha Reddy',
    category: 'Registrar',
    position: 'Member Secretary',
    contact: '',
    hasPhotoCard: false,
  },

  // Category (B) - Nominated Members
  {
    sNo: 6,
    name: 'Sri. Ravuri. V. Srinivas',
    category: 'An eminent academician from the fields of Science / Engineering & Technology / Social Sciences / Law / Management',
    position: 'Member',
    contact: '',
    hasPhotoCard: true,
    photoImage: proChancellorPhoto,
    shortRole: 'Pro-Chancellor & Eminent Academician',
  },
  {
    sNo: 7,
    name: "Dr. T. V. C. Sarma, Sci./Engr. 'SG', National Atmospheric Research Laboratory (NARL), Gadanki V & P, Pakala (M), Chittoor (D) – 517112, A.P.",
    category: 'The Director of a National Laboratory or his / her nominee not below the rank of Scientist G.',
    position: 'Member',
    contact: '',
    hasPhotoCard: true,
    shortRole: "Sci./Engr. 'SG', NARL",
  },
  {
    sNo: 8,
    name: 'Mr. TN Sreenivas, Vice Chairman, CII Tirupati Zone, Chief Operating Officer, Exafluence Global Analytics Pvt. Ltd.',
    category: 'Nominee of the Confederation of Indian Industry (CII)',
    position: 'Member',
    contact: '',
    hasPhotoCard: true,
    shortRole: 'Vice Chairman CII Tirupati Zone & COO Exafluence',
  },
  {
    sNo: 9,
    name: 'Ms. Ramayanam Padmaja, Head-Internal Audit, Star Powerz Digital Technologies Ltd., Hyderabad',
    category: 'A reputed Chartered Accountant',
    position: 'Member',
    contact: '',
    hasPhotoCard: false,
  },
  {
    sNo: 10,
    name: 'Smt. N. Sruthi Reddy, Member, Aditya Academy, Kakinada.',
    category: 'A member from public life who has contributed significantly to societal / national development',
    position: 'Member',
    contact: '',
    hasPhotoCard: true,
    shortRole: 'Member, Aditya Academy, Kakinada',
  },
  {
    sNo: 11,
    name: 'Dr. R. Shalini, Member, Srinivasa Educational Academy, RVS Nagar, Chittoor (AP).',
    category: 'A member of the Sponsoring Body',
    position: 'Member',
    contact: '',
    hasPhotoCard: true,
    shortRole: 'Member, Srinivasa Educational Academy',
  },
];

export const GoverningBodySection: React.FC = () => {
  const photoCardMembers = GOVERNING_BODY_MEMBERS.filter((m) => m.hasPhotoCard);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* SECTION 1: PHOTO BOXES OF MARKED MEMBERS */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[#D4BC9F]/60 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF3E7] text-[#8B4513] border border-[#D4BC9F] text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C6832B]" />
              <span>Apex University Authority</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-navy-950">
              Governing Body Members
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Apex leadership and distinguished members of the Constitution of the Governing Body.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold self-start sm:self-auto">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
            <span>{photoCardMembers.length} Key Dignitaries</span>
          </span>
        </div>

        {/* Responsive Grid for Photo Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <div className="w-full h-full p-6 flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 rounded-full bg-white/90 border-2 border-dashed border-[#C6832B] shadow-inner flex items-center justify-center text-[#9C6019] mb-3 group-hover:scale-110 transition-transform duration-300">
                      <User className="w-12 h-12 text-[#9C6019]" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-[#FAF3E7] text-[#8B4513] border border-[#D4BC9F]">
                      Official Photo Box
                    </span>
                  </div>
                )}

                {/* Position Badge Overlay */}
                <div className="absolute top-3 right-3">
                  <span
                    className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md ${
                      member.position === 'Chairperson'
                        ? 'bg-[#9C6019] text-white border border-[#784308]'
                        : 'bg-navy-950 text-white border border-slate-700'
                    }`}
                  >
                    {member.position}
                  </span>
                </div>
              </div>

              {/* Member Details */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2 bg-white">
                <div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-navy-950 group-hover:text-[#9C6019] transition-colors leading-snug">
                    {member.name}
                  </h4>
                  {member.shortRole && (
                    <p className="text-xs font-semibold text-[#8B4513] mt-1">
                      {member.shortRole}
                    </p>
                  )}
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-[11px] text-slate-500 line-clamp-3 leading-relaxed">
                    <strong className="text-slate-700 font-medium">Category:</strong> {member.category}
                  </p>
                </div>
              </div>
            </div>
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

        {/* Responsive Table */}
        <div className="overflow-x-auto rounded-2xl border border-[#D4BC9F] shadow-sm bg-white">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-[#1B2A4A] via-[#15233E] to-[#0B172E] text-white">
                <th className="py-3.5 px-3 sm:px-4 font-bold text-center w-14 sm:w-16 border-r border-slate-700">
                  S. No.
                </th>
                <th className="py-3.5 px-4 sm:px-5 font-bold min-w-[200px] border-r border-slate-700">
                  Name
                </th>
                <th className="py-3.5 px-4 sm:px-5 font-bold min-w-[260px] border-r border-slate-700">
                  Category
                </th>
                <th className="py-3.5 px-4 font-bold text-center min-w-[150px] border-r border-slate-700">
                  Position in Governing Body
                </th>
                <th className="py-3.5 px-4 font-bold min-w-[160px]">
                  Contact Details (E-mail & Mobile No.)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {/* Category (A) - Ex-Officio Header Row */}
              <tr className="bg-[#FAF3E7] border-y-2 border-[#D4BC9F]">
                <td
                  colSpan={5}
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

              {/* Category (B) - Nominated Members Header Row */}
              <tr className="bg-[#FAF3E7] border-y-2 border-[#D4BC9F]">
                <td
                  colSpan={5}
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
                    <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-[#FAF3E7] text-[#8B4513] border border-[#D4BC9F]">
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

