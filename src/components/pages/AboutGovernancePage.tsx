import React, { useEffect } from 'react';
import { 
  ArrowLeft, ArrowRight, Award, GraduationCap, Building2, 
  Users, FileText, CheckCircle2, ShieldCheck, Landmark, 
  Compass, HeartHandshake, BookOpen, Clock
} from 'lucide-react';
import { Button } from '../ui/Button';

export type AboutPageType = 
  | 'chairman' 
  | 'vice-chairman' 
  | 'principal' 
  | 'governing-body' 
  | 'academic-council' 
  | 'finance' 
  | 'admin-chart';

interface AboutGovernancePageProps {
  pageType: AboutPageType;
  onBackToHome: () => void;
}

export const AboutGovernancePage: React.FC<AboutGovernancePageProps> = ({
  pageType,
  onBackToHome,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageType]);

  // 23 Group Institutions Data
  const groupInstitutions = [
    { name: 'Sri Venkateswara College of Engineering and Technology (Autonomous)', location: 'Chittoor', courses: 'B.Tech., M.Tech., MCA & MBA' },
    { name: 'Sri Venkatesa Perumal College of Engineering & Technology', location: 'Puttur', courses: 'B.Tech., M.Tech., MCA & MBA' },
    { name: 'Chilkur Balaji Institute of Technology', location: 'Hyderabad', courses: 'B.Tech., MCA' },
    { name: 'Sri Venkateswara College of Pharmacy', location: 'Chittoor', courses: 'B.Pharm., M.Pharm, Pharm.D & Ph.D' },
    { name: 'Chilkur Balaji College of Pharmacy', location: 'Hyderabad', courses: 'B.Pharm.' },
    { name: 'Sri Venkateswara College of Education', location: 'Chittoor', courses: 'B.Ed.' },
    { name: 'Sri R.K.M Law College', location: 'Chittoor', courses: 'L.L.B' },
    { name: 'Sir Venkateswara College of Computer Sciences', location: 'Chittoor', courses: 'MCA & MBA' },
    { name: 'Sri Venkatesa Perumal College of Computer Sciences', location: 'Puttur', courses: 'MCA & MBA' },
    { name: 'Chilkur Balaji College of Computer Sciences', location: 'Hyderabad', courses: 'MCA' },
    { name: 'Sri Venkateswara College of Nursing', location: 'Chittoor', courses: 'B.Sc (Nursing)' },
    { name: 'Satya Laxmi College of Nursing', location: 'Hyderabad', courses: 'B.Sc (Nursing)' },
    { name: 'Sri Balaji Junior College', location: 'Chittoor', courses: 'Intermediate (+2)' },
    { name: 'Sri Venkateswara Junior College', location: 'Kothapalli Mitta, Chittoor', courses: 'Intermediate (+2)' },
    { name: 'Sri Vinayaka School of Nursing', location: 'Tirupati', courses: 'Gen. Nursing & Midwifery' },
    { name: 'Sri Jaswanth School of Nursing', location: 'Hyderabad', courses: 'Gen. Nursing & Midwifery' },
    { name: 'Gurunak School of Nursing', location: 'Hyderabad', courses: 'Gen. Nursing & Midwifery' },
    { name: 'Sri Venkateswara School of Nursing', location: 'Chittoor', courses: 'Gen. Nursing & Midwifery' },
    { name: 'Sri Srinivasa M.P.H.W(F) Training Institute', location: 'Tirupati', courses: 'M.P.H.W / A.N.M' },
    { name: 'Balaji M.P.H.W (F) Training Institute', location: 'Tirupati', courses: 'M.P.H.W / A.N.M' },
    { name: 'Vijetha M.P.H.W (F) Training Institute', location: 'Hyderabad', courses: 'M.P.H.W / A.N.M' },
    { name: 'Sri Durga M.P.H.W (F) Training Institute', location: 'Chittoor', courses: 'M.P.H.W / A.N.M' },
    { name: 'Sri Srinivasa M.P.H.W.(F) Training Institute', location: 'Chittoor', courses: 'M.P.H.W / A.N.M' },
  ];

  // Governing Body 12 Members
  const governingBodyMembers = [
    { sno: 1, name: 'Dr. R. Venkataswamy, Chairman, SVCET (A), R.V.S. Nagar, Chittoor', category: 'Management', designation: 'Chairman' },
    { sno: 2, name: 'Sri. R.V. Srinivas, Vice Chairman, SVCET (A), R.V.S. Nagar, Chittoor', category: 'Management', designation: 'Member' },
    { sno: 3, name: 'Smt. R. Allikeswari, Member, Srinivasa Educational Academy, R.V.S. Nagar, Chittoor', category: 'Management', designation: 'Member' },
    { sno: 4, name: 'Dr. R. Shalini, Member, Srinivasa Educational Academy, R.V.S. Nagar, Chittoor', category: 'Management', designation: 'Member' },
    { sno: 5, name: 'Dr. R. Madhuri Gandhi, Member, Srinivasa Educational Academy, R. V. S. Nagar, Chittoor', category: 'Management', designation: 'Member' },
    { sno: 6, name: 'Dr. E. Lokanadha Reddy, Vice Principal & Dean, Evaluation, SVCET, R. V. S. Nagar, Chittoor', category: 'Faculty nominated by the Principal', designation: 'Member' },
    { sno: 7, name: 'Dr. Y. N. Vijaya Kumar, Head, Electrical and Electronics Engineering Department, SVCET, Chittoor', category: 'Faculty nominated by the Principal', designation: 'Member' },
    { sno: 8, name: 'Prof. V. Sumalatha, Professor, Department of ECE, JNTUA College of Engineering, Ananthapuramu – 515002', category: 'AP State Govt. Nominee', designation: 'Member' },
    { sno: 9, name: 'Prof. S. Krishnaiah, Professor of Civil Engineering & Registrar, JNT University Anantapur, Ananthapuramu - 515002', category: 'JNT University Nominee', designation: 'Member' },
    { sno: 10, name: 'Dr. M. Muralidhar, Former Director, SVCET, R.V.S. Nagar, Chittoor (muralidhar6666@gmail.com)', category: 'Special Invitee', designation: 'Member' },
    { sno: 11, name: 'Prof. Dandu Shiva Rama Raju, Professor & Director, Kansas State University Bulk Solids Innovation Center, Salina, KS 67401 (rdandu@ksu.edu)', category: 'Special Invitee', designation: 'Member' },
    { sno: 12, name: 'Dr. M. Mohan Babu, Principal, SVCET (A), R.V.S. Nagar, Chittoor', category: 'Principal', designation: 'Member Secretary' },
  ];

  // Academic Council 34 Members
  const academicCouncilMembers = [
    { sno: 1, name: 'Dr. M. Mohan Babu, Principal, SVCET, Chittoor', category: 'Principal / Head of Institution', designation: 'Chairman', contact: '7729999200, Principal@svcetedu.org' },
    { sno: 2, name: 'Dr. B. Damodhara Reddy, Head, Civil Engineering Department, SVCET, Chittoor', category: 'Head of the Dept.', designation: 'Member', contact: '9441947480, hodce@svcetedu.org' },
    { sno: 3, name: 'Dr. Y.N. Vijaya Kumar, Head, Electrical and Electronics Department, SVCET, Chittoor', category: 'Head of the Dept.', designation: 'Member', contact: '9440045288, hodeee@svcetedu.org' },
    { sno: 4, name: 'Dr. S. Arun Saco, Head, Mechanical Engineering Department, SVCET, Chittoor', category: 'Head of the Dept.', designation: 'Member', contact: '9942794800, hodme@svcetedu.org' },
    { sno: 5, name: 'Dr. D. Srihari, Head, Electronics and Communication Engineering Department, SVCET, Chittoor', category: 'Head of the Dept.', designation: 'Member', contact: '8317689417, hodece@svcetedu.org' },
    { sno: 6, name: 'Ms. P. Jyotheeswari, Head, Computer Science and Engineering Department, SVCET, Chittoor', category: 'Head of the Dept.', designation: 'Member', contact: '8985121183, hodcse@svcetedu.org' },
    { sno: 7, name: 'Dr. M. Lavanya, Head, Computer Science and Engineering (AI&ML) Department, SVCET, Chittoor', category: 'Head of the Dept.', designation: 'Member', contact: '8919805095, hodcsm@svcetedu.org' },
    { sno: 8, name: 'Mrs. Kokila, Head, Computer Science and Engineering (DS) Department, SVCET, Chittoor', category: 'Head of the Dept.', designation: 'Member', contact: '9550955645, hodcsd@svcetedu.org' },
    { sno: 9, name: 'Dr. J. Velmurugan, Head, Information Technology Department, SVCET, Chittoor', category: 'Head of the Dept.', designation: 'Member', contact: '9440304757, hodit@svcetedu.org' },
    { sno: 10, name: 'Dr. Hamsaveni, Head, Master of Computer Applications Department, SVCET, Chittoor', category: 'Head of the Dept.', designation: 'Member', contact: '9442212136, hodmca@svcetedu.org' },
    { sno: 11, name: 'Dr. N. Giri Babu, Head, Master of Business Administration Department, SVCET, Chittoor', category: 'Head of the Dept.', designation: 'Member', contact: '9885353205, hodmba@svcetedu.org' },
    { sno: 12, name: 'Dr. K. Komala, Head, Humanities and Sciences Department, SVCET, Chittoor', category: 'Head of the Dept.', designation: 'Member', contact: '9441573658, hodhas@svcetedu.org' },
    { sno: 13, name: 'Dr. P. Gopi Krishna, Associate Head, Humanities and Sciences Department, SVCET, Chittoor', category: 'Head of the Dept.', designation: 'Member', contact: '9940569822, hodhas2@svcetedu.org' },
    { sno: 14, name: 'Dr. T. Raja Reddy, Dean I&E, SVCET, Chittoor', category: 'Nominated by Principal', designation: 'Member', contact: '8328517719, deanie@svcetedu.org' },
    { sno: 15, name: 'Dr. A. Mahamani, Professor, Mechanical Engineering Department, SVCET, Chittoor', category: 'Nominated by Principal', designation: 'Member', contact: '6300256313, research@svcetedu.org' },
    { sno: 16, name: 'Dr. C. K. Selvi, Associate Professor, Humanities and Sciences Department, SVCET, Chittoor', category: 'Nominated by Principal', designation: 'Member', contact: '9985561550, selvisailu@gmail.com' },
    { sno: 17, name: 'Dr. C. Uma Maheswari, Controller of Examinations, Mechanical Department, SVCET, Chittoor', category: 'Nominated by Principal', designation: 'Member', contact: '8639090519, ce@svcet.in' },
    { sno: 18, name: 'Prof. Dandu Sivarama Raju, Professor & Director, Kansas State University, USA', category: 'GB Nominee (Education)', designation: 'Member', contact: '(785)304-0145, rdandu@ksu.edu' },
    { sno: 19, name: 'Mr. Ajit Kumar Koppali, Chairman, VDM India on the move, Bangalore', category: 'GB Nominee (Education)', designation: 'Member', contact: '9989299064, acharyavdmajit@gmail.com' },
    { sno: 20, name: 'Mr. Sreenivasa Ramanujam. K, Head – Trainee Engagement & Academic Relations, AWS Cloud Business Unit, TCS Bangalore', category: 'GB Nominee (Industry)', designation: 'Member', contact: '08147002870, sreenivasa.ramanujam@tcs.com' },
    { sno: 21, name: 'Dr. K. Mallikharjuna Babu, Vice-Chancellor, Galgotias University, Greater Noida, Delhi NCR', category: 'GB Nominee (Industry)', designation: 'Member', contact: '09886021095, drkmbabu@gmail.com' },
    { sno: 22, name: 'Dr. Amit Kumar Patra, Director, National Atmospheric Research Laboratory (NARL), Gadanki', category: 'GB Nominee (Industry)', designation: 'Member', contact: 'director@narl.gov.in, akpatra@narl.gov.in' },
    { sno: 23, name: 'Dr. Subramani Ramakrishnan, Vice President, UPS-SCS (India) Private Limited, Chennai', category: 'GB Nominee (Sciences)', designation: 'Member', contact: '9791032904, rsubramani@ups.com' },
    { sno: 24, name: 'Mr. Arun Mozhi Devan M, Executive Director, General Management, BHEL, Ranipet', category: 'GB Nominee (Sciences)', designation: 'Member', contact: 'amdevan@bhel.in' },
    { sno: 25, name: 'Prof. G. Ranga Janardhana, Professor, Dept. of Mechanical Engineering, JNTUA Kalikiri', category: 'JNTUA Nominee', designation: 'Ex-Officio Member', contact: '9440151031, rangajanardhana@gmail.com' },
    { sno: 26, name: 'Prof. Vaishali G Ghorpade, Professor, Dept. of Civil Engineering, JNTUA Ananthapuramu', category: 'JNTUA Nominee', designation: 'Ex-Officio Member', contact: '9440497939, vaishali.civil@jntua.ac.in' },
    { sno: 27, name: 'Prof. A. P Siva Kumar, Professor, Dept. of Computer Science & Engineering, JNTUA', category: 'JNTUA Nominee', designation: 'Member', contact: '9441395659, sivakumar.cse@jntua.ac.in' },
    { sno: 28, name: 'Dr. M. Muralidhar, Former Director, SVCET, Chittoor', category: 'Special Invitee', designation: 'Member', contact: '9703621584, muralidhar6666@gmail.com' },
    { sno: 29, name: 'Dr. K. Sandeep Kumar, Dean, CSE, SVCET, Chittoor', category: 'Nominated by Principal', designation: 'Member', contact: '9845225038, deancse@svcetedu.org' },
    { sno: 30, name: 'Dr. Rakesh Kumar Jain, Vice Chancellor, Ajeenkya DY Patil University, Pune', category: 'Special Invitee', designation: 'Member', contact: '09822746067, jainrb20@gmail.com' },
    { sno: 31, name: 'Dr. A. Ramaswamy Reddy, Vice Chancellor, Mallareddy Deemed-to-be-University, Hyderabad', category: 'Special Invitee', designation: 'Member', contact: '07093767183, ramaswamyreddymail@gmail.com' },
    { sno: 32, name: 'Mr. N. Sendhil Kumar, Dean, Training and Skill Development, SVCET, Chittoor', category: 'Special Invitee', designation: 'Member', contact: '7661827999, dean.tsd@svcetedu.org' },
    { sno: 33, name: 'Dr. Sridhar Condoor, Professor & Chair of Aerospace & Mech Engineering, Saint Louis University, USA', category: 'Special Invitee', designation: 'Member', contact: '+1(314) 698-8615, sridhar.condoor@slu.edu' },
    { sno: 34, name: 'Dr. E. Lokanadha Reddy, Vice Principal, SVCET, Chittoor', category: 'Nominated by Principal', designation: 'Member Secretary', contact: '7780373131, viceprincipal@svcetedu.org' },
  ];

  const titles: Record<AboutPageType, { title: string; subtitle: string; eyebrow: string }> = {
    chairman: {
      title: "Chairman's Desk",
      subtitle: "Dr. Ravuri Venkataswamy — Founder Chairman, SV Group of Institutions",
      eyebrow: "Visionary Leadership",
    },
    'vice-chairman': {
      title: "Vice Chairman's Desk",
      subtitle: "Shri R.V. Srinivas, B.Tech., MBA (UK) & 23 Group Institutions",
      eyebrow: "Executive Leadership",
    },
    principal: {
      title: "Principal's Desk",
      subtitle: "Dr. Matam Mohan Babu, Ph.D. — Principal & Professor of Civil Engineering",
      eyebrow: "Academic Administration",
    },
    'governing-body': {
      title: "Governing Body",
      subtitle: "12 Distinguished Members of the Executive University Board",
      eyebrow: "Statutory Governance",
    },
    'academic-council': {
      title: "Academic Council",
      subtitle: "34 Council Members, Department Heads, JNTUA & Industry Nominees",
      eyebrow: "Curriculum & Academic Standards",
    },
    finance: {
      title: "Finance Committee",
      subtitle: "Statutory Committee for Financial Estimates, Budgets & Audits",
      eyebrow: "Financial Governance",
    },
    'admin-chart': {
      title: "Organisation & Administration",
      subtitle: "Hierarchical Administrative Chart of SVCET (Autonomous), Chittoor",
      eyebrow: "Institutional Hierarchy",
    },
  };

  const currentMeta = titles[pageType] || titles.chairman;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* 1. Breadcrumb Bar */}
      <div className="bg-navy-950 text-white border-b border-navy-800 py-3.5 px-4 md:px-8">
        <div className="container-custom flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs md:text-sm text-slate-300">
            <button
              onClick={onBackToHome}
              className="hover:text-gold-300 font-semibold flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Home</span>
            </button>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">About RVS</span>
            <span className="text-slate-600">/</span>
            <span className="text-gold-300 font-bold">{currentMeta.title}</span>
          </div>

          <button
            onClick={onBackToHome}
            className="text-xs text-gold-300 hover:text-gold-200 font-semibold flex items-center gap-1"
          >
            <span>Return to Homepage</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Top Regal Hero Banner */}
      <div className="relative bg-gradient-to-br from-navy-950 via-navy-900 to-navy-850 text-white py-12 md:py-16 overflow-hidden border-b border-navy-800">
        <div className="container-custom relative z-10 px-4 md:px-8">
          <div className="max-w-4xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/15 border border-gold-500/40 text-gold-300 text-xs font-bold uppercase tracking-wider">
              <Landmark className="w-3.5 h-3.5 text-gold-400" />
              <span>{currentMeta.eyebrow}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              {currentMeta.title}
            </h1>

            <p className="text-sm md:text-base text-slate-300 font-light leading-relaxed max-w-3xl">
              {currentMeta.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* 2.5 Horizontal Sub-Parts Navigation Tabs Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="container-custom px-4 md:px-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3">
            {[
              { id: 'chairman', label: "Chairman's Desk", href: '#about-chairman' },
              { id: 'vice-chairman', label: "Vice Chairman & 23 Institutions", href: '#about-vice-chairman' },
              { id: 'principal', label: "Principal's Desk", href: '#about-principal' },
              { id: 'governing-body', label: "Governing Body (12 Members)", href: '#committee-governing-body' },
              { id: 'academic-council', label: "Academic Council (34 Members)", href: '#committee-academic-council' },
              { id: 'finance', label: "Finance Committee", href: '#committee-finance' },
              { id: 'admin-chart', label: "Organisation Chart", href: '#administration' },
            ].map((tab) => (
              <a
                key={tab.id}
                href={tab.href}
                className={`px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                  pageType === tab.id
                    ? 'bg-navy-950 text-gold-300 shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-navy-950'
                }`}
              >
                {tab.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Single Dedicated Page Body */}
      <div className="py-12 md:py-16 container-custom px-4 md:px-8">
        
        {/* ========================================================================= */}
        {/* PAGE 1: CHAIRMAN'S DESK (1st Image: Dr. Ravuri Venkataswamy) */}
        {/* ========================================================================= */}
        {pageType === 'chairman' && (
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-card">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* 1st Photo: Chairman Dr. Ravuri Venkataswamy */}
              <div className="lg:col-span-4 space-y-4">
                <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-navy-950">
                  <img
                    src="/images/chairman.jpg"
                    alt="Dr. Ravuri Venkataswamy, Chairman"
                    className="w-full h-[440px] object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-70" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-serif text-xl font-bold text-white">
                      Dr. Ravuri Venkataswamy
                    </h3>
                    <p className="text-xs text-gold-300 font-semibold mt-0.5">
                      Chairman, SV Group of Educational Institutions
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-navy-950 font-bold">
                    <GraduationCap className="w-4 h-4 text-gold-600" />
                    <span>Honorary Ph.D. in Education</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Conferred by Johnson & Wales University, Rhode Island, USA for seminal research on Education in India.
                  </p>
                </div>
              </div>

              {/* Biography & Achievements */}
              <div className="lg:col-span-8 space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gold-600 font-sans">
                    Chairman's Desk
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-navy-950 mt-1">
                    Dr. Ravuri Venkataswamy
                  </h2>
                  <p className="text-sm font-semibold text-gold-600 mt-1">
                    Founder Chairman, Srinivasa Educational Academy & SV Group of Institutions
                  </p>
                  <div className="h-1 w-20 bg-gold-500 rounded-full mt-3" />
                </div>

                <div className="space-y-4 text-slate-700 text-sm md:text-base leading-relaxed font-light">
                  <p>
                    <strong>Dr. R. Venkataswamy</strong>, S/o. late Sri R. Kanakaiah, is a well known Educationist and Philanthropist of this region. With a keen interest to promote education in the backward Rayalaseema Region of Andhra Pradesh, with a motto of <em>“Education for Peace”</em>, he floated an educational society in the name of <strong>“Srinivasa Educational Academy”</strong> in the year 1998 with fellow philanthropists and educationists of this area.
                  </p>
                  <p>
                    He established <strong>Sri Venkateswara School of Nursing & Sri Srinivasa MPHW (F) Training Institute in 1986</strong> which is affiliated to Director of Medical Education, Hyderabad and recognized by Indian Nursing Council, New Delhi. In the year 1992 he started <strong>Sri R.K.M. Law College</strong>, affiliated to S.V. University, Tirupathi and recognized by Bar Council of India, New Delhi.
                  </p>
                  <p>
                    With this experience and an intention to provide quality technical education, providing self-employment to the youth of this region, he established <strong>Sri Venkateswara College of Engineering & Technology (SVCET) in the year 1998</strong>. It is approved by AICTE, New Delhi, accredited by NBA under Tier-I, and affiliated to JNTUA. In a span of about 9 years it was recognized as one of the best colleges in A.P. state with 2 Gold Medals and 95%+ results. Ranked <strong>3rd in Andhra Pradesh and 30th in India</strong> by CSR-GHRDC Survey (Competition Success Review 2010).
                  </p>
                  <p>
                    The college campus with excellent buildings across <strong>40+ Acres of land</strong> is located on R.V.S. Nagar, adjacent to the proposed RVS Medical College. Dr. Venkataswamy has adequate experience in establishing and running educational institutions. Johnson & Wales University, Rhode Island conferred an <strong>Honorary Degree, Doctor of Philosophy – Ph.D. in Education</strong> on him.
                  </p>
                  <p>
                    He is playing a major role in the state for the development of Technical education. With his vast background, he started <strong>RVS Hospitals at Chittoor</strong> to render medical services to the poor and proposed the massive venture of establishing <strong>RVS Institute of Medical Sciences</strong> catering to the aspirations of the people of Chittoor, Kadapa, Kurnool, Anantapur, and Nellore districts.
                  </p>
                </div>

                {/* Awards Received */}
                <div className="pt-6 border-t border-slate-200">
                  <h4 className="font-serif text-xl font-bold text-navy-950 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-gold-600" />
                    <span>Prestigious Awards & Recognitions Received</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <div className="text-xs font-bold text-gold-600 mb-1">1993 &bull; Hyderabad</div>
                      <h5 className="font-serif font-bold text-navy-950 text-sm mb-1">“Best Educational Promoter”</h5>
                      <p className="text-xs text-slate-600">Vijaya-Bhargavi Stage Award received at Ravindra Bharathi, Hyderabad on 15.07.1993.</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <div className="text-xs font-bold text-gold-600 mb-1">2000 &bull; National</div>
                      <h5 className="font-serif font-bold text-navy-950 text-sm mb-1">“Bharat Jyothi Award”</h5>
                      <p className="text-xs text-slate-600">Conferred by International Integrity Peace & Friendship Society for outstanding achievements.</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <div className="text-xs font-bold text-gold-600 mb-1">2003 &bull; Andhra Pradesh</div>
                      <h5 className="font-serif font-bold text-navy-950 text-sm mb-1">“Nandi Award”</h5>
                      <p className="text-xs text-slate-600">Received from the Hon’ble Chief Minister of AP for the Best Children’s Film “Little Hearts”.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGE 2: VICE CHAIRMAN'S DESK (2nd Image: Shri R.V. Srinivas) */}
        {/* ========================================================================= */}
        {pageType === 'vice-chairman' && (
          <div className="space-y-12">
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-card">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* 2nd Photo: Vice Chairman Shri R.V. Srinivas */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-navy-950">
                    <img
                      src="/images/vice-chairman.jpg"
                      alt="Shri R.V. Srinivas, Vice Chairman"
                      className="w-full h-[440px] object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-70" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-serif text-xl font-bold text-white">
                        Shri R.V. Srinivas
                      </h3>
                      <p className="text-xs text-gold-300 font-semibold mt-0.5">
                        B.Tech., MBA (Cardiff University, UK) &bull; Vice Chairman
                      </p>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                    <div className="font-bold text-navy-950 uppercase tracking-wider text-[11px]">
                      Academic Pedigree:
                    </div>
                    <div className="text-slate-700">
                      <strong>Bachelors in Technology (CSE):</strong> JNTU Hyderabad.
                    </div>
                    <div className="text-slate-700">
                      <strong>MBA (Finance & Marketing):</strong> Cardiff Business School, Cardiff University, Wales (7th Best University in U.K.).
                    </div>
                  </div>
                </div>

                {/* Biography & Global Footprint */}
                <div className="lg:col-span-8 space-y-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gold-600 font-sans">
                      Vice Chairman's Desk
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-navy-950 mt-1">
                      Shri R.V. Srinivas, <span className="text-lg font-sans font-normal text-slate-500">B.Tech., MBA (UK)</span>
                    </h2>
                    <p className="text-sm font-semibold text-gold-600 mt-1">
                      Vice Chairman, Srinivasa Educational Academy & SV Group (23 Institutions)
                    </p>
                    <div className="h-1 w-20 bg-gold-500 rounded-full mt-3" />
                  </div>

                  <div className="space-y-4 text-slate-700 text-sm md:text-base leading-relaxed font-light">
                    <p>
                      <strong>Shri R.V. Srinivas</strong> is the Vice-Chairman for Srinivasa Educational Academy and plays a proactive role in the management of <strong>23 Educational Institutions</strong> in various fields of study. He completed his MBA from <strong>Cardiff University, Wales (7th Best University in U.K.)</strong> specializing in Finance and Marketing as Major.
                    </p>
                    <p>
                      Recognizing his leadership, National Media has consistently ranked the educational institutions under his management among the top colleges in India. Under his visionary stewardship, <strong>Sri Venkateswara College of Engineering & Technology (SVCET)</strong> became the <em>Youngest College in Andhra Pradesh to get NBA Accredited under Tier-I</em>.
                    </p>
                    <p>
                      The College has made its mark globally: over <strong>280+ foreign students</strong> from Malaysia, Sudan, Tanzania, UAE, Kuwait, Nepal, Bhutan, and Sri Lanka pursue their degrees in group institutions. He helped the <strong>Royal Government of Bhutan</strong> in Nursing Education by providing scholarships for meritorious Bhutanese students.
                    </p>
                    <p>
                      The college has been accredited by <strong>NAAC</strong> (Bangalore), accredited by <strong>NBA under Tier-I</strong> (New Delhi), and granted <strong>Autonomous status by the UGC</strong> from the academic year 2011-12. The college is recognized under 12(B) and 2(F) by UGC and is deemed fit to receive Central Government assistance. It has become the preferred hiring destination for Fortune 500 tech leaders including Infosys, Wipro, Accenture, CSC, KPIT Cummins, Robert Bosch, and Mahindra Satyam.
                    </p>
                  </div>

                  {/* Social Interest & Philanthropy */}
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-navy-950 to-navy-900 text-white space-y-3">
                    <h4 className="font-serif text-lg font-bold text-gold-300 flex items-center gap-2">
                      <HeartHandshake className="w-5 h-5 text-gold-400" />
                      <span>Social Interest & Philanthropic Initiatives</span>
                    </h4>
                    <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-light">
                      A Public Charitable Trust has been instituted under the name <strong>Smt Haarika Memorial Literary and Cultural Association</strong> to assist educational, cultural, and environmental causes. He is instrumental in starting <strong>“Helping Hands”</strong>, organizing relief camps, eye camps, and regular blood donation drives, alongside providing free scholarships for international students from across SAARC countries.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Table of 23 Institutions */}
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-card space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gold-600 font-sans">
                    Institutional Footprint
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-navy-950">
                    Institutions Promoted by Srinivasa Educational Academy
                  </h3>
                </div>
                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-navy-900 text-gold-300 self-start md:self-auto">
                  Total 23 Group Institutions
                </span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                  <thead>
                    <tr className="bg-navy-950 text-white font-serif">
                      <th className="p-3.5 border-b border-navy-800 w-12 text-center">S.No</th>
                      <th className="p-3.5 border-b border-navy-800">Name of the Institution & Campus</th>
                      <th className="p-3.5 border-b border-navy-800 w-36">Location</th>
                      <th className="p-3.5 border-b border-navy-800">Courses Offered</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {groupInstitutions.map((inst, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-slate-50' : 'bg-slate-50/70 hover:bg-slate-100'}>
                        <td className="p-3.5 font-bold text-center text-slate-500">{idx + 1}</td>
                        <td className="p-3.5 font-bold text-navy-950">{inst.name}</td>
                        <td className="p-3.5 text-gold-700 font-semibold">{inst.location}</td>
                        <td className="p-3.5 text-slate-700 font-medium">{inst.courses}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGE 3: PRINCIPAL'S DESK (3rd Image: Dr. Matam Mohan Babu) */}
        {/* ========================================================================= */}
        {pageType === 'principal' && (
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-card">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* 3rd Photo: Principal Dr. Matam Mohan Babu */}
              <div className="lg:col-span-4 space-y-4">
                <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-navy-950">
                  <img
                    src="/images/principal.jpg"
                    alt="Dr. Matam Mohan Babu, Principal"
                    className="w-full h-[360px] md:h-[400px] object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-serif text-xl font-bold text-white">
                      Dr. Matam Mohan Babu
                    </h3>
                    <p className="text-xs text-gold-300 font-semibold mt-0.5">
                      Ph.D., MISTE, MISH &bull; Principal & Professor of Civil Engineering
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="font-bold text-navy-950 uppercase tracking-wider text-[11px]">
                    Doctoral Qualifications:
                  </div>
                  <div className="text-slate-700">
                    <strong>Ph.D. (Water Resources):</strong> JNTU Hyderabad
                  </div>
                  <div className="text-slate-700">
                    <strong>M.Tech (Hydraulics & Water Resources):</strong> NIT Surathkal (KREC)
                  </div>
                  <div className="text-slate-700">
                    <strong>B.Tech (Civil Engineering):</strong> NIT Warangal (REC Warangal)
                  </div>
                </div>
              </div>

              {/* Credentials & Research */}
              <div className="lg:col-span-8 space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gold-600 font-sans">
                    Principal's Desk
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-navy-950 mt-1">
                    Dr. Matam Mohan Babu
                  </h2>
                  <p className="text-sm font-semibold text-gold-600 mt-1">
                    Principal & Professor of Civil Engineering, Sri Venkateswara College of Engineering & Technology (Autonomous)
                  </p>
                  <div className="h-1 w-20 bg-gold-500 rounded-full mt-3" />
                </div>

                <div className="space-y-4 text-slate-700 text-sm md:text-base leading-relaxed font-light">
                  <p>
                    <strong>Dr. Matam Mohan Babu</strong>, an eminent academician and administrator, serves as the Principal and Professor of Civil Engineering at Sri Venkateswara College of Engineering & Technology (Autonomous), Chittoor. With an illustrious career spanning over <strong>27+ years</strong>, he has made remarkable contributions to academia, research, and institutional development.
                  </p>
                  <p>
                    Holding a Ph.D. in Water Resources from JNTU Hyderabad, M.Tech from NIT Surathkal, and B.Tech from NIT Warangal, Dr. Mohan Babu has specialized expertise in Water Resources and Fluid Mechanics with an extensive teaching experience of over 26 years.
                  </p>
                  <p>
                    As a prolific researcher, Dr. Mohan Babu has authored over <strong>42+ research papers</strong> in reputed international and national journals and has presented at various global conferences. His research contributions focus on groundwater studies, hydraulic engineering, and sustainable construction materials. Additionally, he has successfully guided multiple Ph.D. research scholars.
                  </p>
                  <p>
                    Prior to his current role, he served in key administrative positions such as <strong>Director of International Relations</strong> and <strong>Dean of Admissions & Foreign Relations</strong> at reputed institutions, significantly enhancing international collaborations, student recruitment, and NBA/NAAC accreditations.
                  </p>
                </div>

                {/* Principal Awards */}
                <div className="pt-6 border-t border-slate-200">
                  <h4 className="font-serif text-xl font-bold text-navy-950 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-gold-600" />
                    <span>Distinguished Awards Received</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-navy-900 text-gold-400">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gold-600">Year 2023</div>
                        <h5 className="font-serif font-bold text-navy-950 text-sm">‘Best Engineering College Principal Award’</h5>
                        <p className="text-xs text-slate-600 mt-0.5">Conferred by Jawaharlal Nehru Technological University Anantapur (JNTUA).</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-navy-900 text-gold-400">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gold-600">Year 2022</div>
                        <h5 className="font-serif font-bold text-navy-950 text-sm">‘Best Engineering College Principal Award’</h5>
                        <p className="text-xs text-slate-600 mt-0.5">Conferred by Indian Society for Technical Education (ISTE AP Section).</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGE 4: GOVERNING BODY (12 Members) */}
        {/* ========================================================================= */}
        {pageType === 'governing-body' && (
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-card space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold-600 font-sans">
                  Institutional Governance
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-navy-950">
                  Members of the Governing Body
                </h3>
              </div>
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-navy-900 text-gold-300 self-start md:self-auto">
                Constitutional Board &bull; 12 Members
              </span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="bg-navy-950 text-white font-serif">
                    <th className="p-3.5 border-b border-navy-800 w-14 text-center">S.No</th>
                    <th className="p-3.5 border-b border-navy-800">Name and Address</th>
                    <th className="p-3.5 border-b border-navy-800 w-48">Category</th>
                    <th className="p-3.5 border-b border-navy-800 w-36">Designation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {governingBodyMembers.map((m) => (
                    <tr key={m.sno} className={m.sno % 2 === 0 ? 'bg-white hover:bg-slate-50' : 'bg-slate-50/70 hover:bg-slate-100'}>
                      <td className="p-3.5 font-bold text-center text-slate-500">{m.sno}</td>
                      <td className="p-3.5 font-bold text-navy-950">{m.name}</td>
                      <td className="p-3.5 text-slate-700 font-medium">{m.category}</td>
                      <td className="p-3.5">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                          m.designation === 'Chairman'
                            ? 'bg-gold-100 text-gold-800 border border-gold-300'
                            : m.designation === 'Member Secretary'
                            ? 'bg-blue-100 text-blue-800 border border-blue-300'
                            : 'bg-slate-200/80 text-slate-800'
                        }`}>
                          {m.designation}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGE 5: ACADEMIC COUNCIL (34 Members) */}
        {/* ========================================================================= */}
        {pageType === 'academic-council' && (
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-card space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold-600 font-sans">
                  Academic Regulatory Body
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-navy-950">
                  Members of the Academic Council
                </h3>
              </div>
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-navy-900 text-gold-300 self-start md:self-auto">
                Total 34 Council Members
              </span>
            </div>

            <p className="text-xs md:text-sm text-slate-600 font-light leading-relaxed">
              The Academic Council is responsible for laying down academic policies, approving curricula, syllabi, exam frameworks, and collaborating with premier universities and global research entities.
            </p>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="bg-navy-950 text-white font-serif">
                    <th className="p-3.5 border-b border-navy-800 w-12 text-center">S.No</th>
                    <th className="p-3.5 border-b border-navy-800">Name and Address</th>
                    <th className="p-3.5 border-b border-navy-800 w-44">Category</th>
                    <th className="p-3.5 border-b border-navy-800 w-32">Designation</th>
                    <th className="p-3.5 border-b border-navy-800">Contact / E-mail</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {academicCouncilMembers.map((m, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-slate-50' : 'bg-slate-50/70 hover:bg-slate-100'}>
                      <td className="p-3.5 font-bold text-center text-slate-500">{m.sno}</td>
                      <td className="p-3.5 font-bold text-navy-950">{m.name}</td>
                      <td className="p-3.5 text-slate-700 text-xs">{m.category}</td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          m.designation === 'Chairman'
                            ? 'bg-gold-100 text-gold-800'
                            : m.designation === 'Member Secretary'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-slate-200/70 text-slate-700'
                        }`}>
                          {m.designation}
                        </span>
                      </td>
                      <td className="p-3.5 text-xs text-slate-600 font-mono">{m.contact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGE 6: FINANCE COMMITTEE */}
        {/* ========================================================================= */}
        {pageType === 'finance' && (
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-card space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-600 font-sans">
                Statutory Committees
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-navy-950 mt-1">
                Composition of Finance Committee
              </h3>
              <p className="text-xs md:text-sm text-slate-600 mt-1">
                The Finance Committee is constituted with the following members for a tenure period of three years.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 max-w-2xl">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="bg-navy-950 text-white font-serif">
                    <th className="p-3.5 border-b border-navy-800 w-14 text-center">S.No</th>
                    <th className="p-3.5 border-b border-navy-800">Name and Designation</th>
                    <th className="p-3.5 border-b border-navy-800 w-36">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="bg-white">
                    <td className="p-3.5 font-bold text-center text-slate-500">1</td>
                    <td className="p-3.5 font-bold text-navy-950">Dr. M. Mohan Babu (Principal)</td>
                    <td className="p-3.5 text-gold-700 font-bold">Chairman</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3.5 font-bold text-center text-slate-500">2</td>
                    <td className="p-3.5 font-bold text-navy-950">Dr. E. Lokanadha Reddy (Vice Principal & Dean Evaluation)</td>
                    <td className="p-3.5 text-slate-700 font-bold">Member</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3.5 font-bold text-center text-slate-500">3</td>
                    <td className="p-3.5 font-bold text-navy-950">Dr. P. Dhandapani</td>
                    <td className="p-3.5 text-slate-700 font-bold">Member</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Functions & Powers */}
            <div className="pt-6 border-t border-slate-200 space-y-4">
              <h4 className="font-serif text-xl font-bold text-navy-950">
                Functions & Powers of the Finance Committee
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs md:text-sm text-slate-700">
                    The annual accounts and financial estimates of the Institution shall be placed before the Finance Committee for consideration and thereafter submitted to the Governing Body together with comments for approval.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs md:text-sm text-slate-700">
                    The Finance Committee shall fix limits of the total recurring expenditure and the total non-recurring expenditure of the year based on the income and resources of the Institution.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs md:text-sm text-slate-700">
                    No expenditure other than that provided in the budget shall be incurred by the Institution without the prior approval of the Finance Committee.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs md:text-sm text-slate-700">
                    To continuously monitor, audit, and control institutional expenditure and revenue against budgetary deviations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGE 7: ADMINISTRATION & ORGANISATION CHART */}
        {/* ========================================================================= */}
        {pageType === 'admin-chart' && (
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-card space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-600 font-sans">
                Institutional Hierarchy
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-navy-950 mt-1">
                Organisation Chart of SVCET (Autonomous), Chittoor
              </h3>
              <p className="text-xs md:text-sm text-slate-600 mt-1">
                Hierarchical flow from Management & Principal to Administrative Deans, HODs, Exam Cell, and Functional Departments.
              </p>
            </div>

            {/* Official Organization Chart Image */}
            <div className="p-4 md:p-6 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
              <img
                src="/images/org-chart.png"
                alt="Organisation Chart of SVCET (Autonomous), Chittoor"
                className="max-w-full h-auto rounded-xl shadow-lg border border-slate-300"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h5 className="font-serif font-bold text-navy-950 text-sm mb-1">Executive Management</h5>
                <p className="text-xs text-slate-600">Chairman, Vice Chairman & Governing Body</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h5 className="font-serif font-bold text-navy-950 text-sm mb-1">Academic Leadership</h5>
                <p className="text-xs text-slate-600">Principal, Deans & Academic Council</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h5 className="font-serif font-bold text-navy-950 text-sm mb-1">Evaluation & Exams</h5>
                <p className="text-xs text-slate-600">Controller of Examinations & Autonomous Exam Cell</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h5 className="font-serif font-bold text-navy-950 text-sm mb-1">Student Services & Wings</h5>
                <p className="text-xs text-slate-600">Hostels, Library, Training & Placements, R&D Cell</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
