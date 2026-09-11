import librarianImg from '../assets/librarian-sreenivasulu.png';

export interface LibraryPublication {
  sNo: number;
  title: string;
  citation: string;
  isbnOrIssn?: string;
  doiOrUrl?: string;
  year: string;
}

export interface LibraryStaffMember {
  name: string;
  qualification: string;
  designation: string;
}

export const LIBRARY_DATA = {
  about: {
    heading: 'About Central Library',
    lead: 'The RVS University Central Library is the heart, mind and soul of an educational institution. It is also the nerve center of the institution. It is fountain head of innovativeness, inspiration and insightfulness both for the students and the faculty.',
    description: [
      'The Library attached with digital library is set in a spacious part of the college building. It has been systematically and steadily strengthened year by year. It contains more than 73,747 commendably classified text books and reference books. In addition to Journals and Magazines, spacious reading rooms with modern facility enhance the zeal of the students for knowledge.',
      'The College subscribes to National and International Journals of reputation along with prominent national dailies and magazines. Advanced RFID with SMART CARD Library Management Technology was introduced in the circulation section to provide seamless, automated access.',
    ],
    stats: [
      { value: '73,747+', label: 'Classified Volumes', sub: 'Textbooks & Reference Collection' },
      { value: '59,843+', label: 'Printed Books', sub: 'Across Engineering, IT, MBA & Science' },
      { value: '4,853+', label: 'E-Journals', sub: 'IEEE, ScienceDirect & Springer' },
      { value: '164', label: 'Periodicals', sub: 'National & International Subscriptions' },
    ],
  },
  librarianDesk: {
    librarian: {
      name: 'Mr. K. Sreenivasulu',
      designation: 'Asst. Librarian',
      qualification: 'M.A., M.L.I.Sc., B.Ed',
      experience: '04 yrs experience',
      image: librarianImg,
      message: 'It is my pleasure to welcome you to the RVS UNIVERSITY – CENTRAL LIBRARY. The Library is housed in a magnificent star module functional building which includes separate wings for reference section, stack rooms and reading halls, periodical section, computer centre and administrative divisions.\n\nThe collection of books has now crossed 59,843 of printed books, 164 Periodicals and 4853 e-Journals. The library supports the college rigorous programmes in Graduate, Post-Graduate Education and Research.\n\nVisitors will find an excellent collection of materials, and diverse electronic resources. Library users whether they are visiting the Library building will encounter an encouraging and helpful staff ready to answer inquiries or to help solve problems.\n\nTo-day our libraries provide extraordinarily broad and deep print and electronic resources in all areas of Science and Technology, Social Sciences and Humanities.',
    },
    staffDetails: [
      { name: 'J. Rajesh', qualification: 'M.A., M.L.I.Sc', designation: 'Asst. Librarian' },
      { name: 'V. Ganesh', qualification: 'S S C', designation: 'Binder' },
      { name: 'T Nagarajan', qualification: 'B.Com', designation: 'Book Keeper' },
      { name: 'N Anuradha', qualification: 'Inter', designation: 'Attender' },
    ],
  },
  rulesAndRegulations: {
    generalRules: [
      'Most Library Users would Appreciate Silence.',
      'Identity Card has to be shown at the entrance gate whenever demanded.',
      'Every Member / Visitor has to Sign in the gate Register in the Entrance counter before entering into the library.',
      'Smoking, Sleeping, Eating, and having refreshments in the Library is strictly not allowed.',
      'Do take care of the books and journals.',
      'The rack at the entrance is to be used to keep your Personal Belongings.',
      'Once a book has been borrowed, avoid taking it back into the Library.',
      'Underline, Marking, and Tearing will be Strictly Prohibited in the books.',
      'Do remember to switch off fans and lights after use.',
      'Usage of Cell Phone is strictly restricted inside the Library.',
      'The Circulation Counter shall be closed half an hour before closing of the Library.',
    ],
    circulation: [
      'Books may be borrowed using Smart Card and RFID Technology by Staff and Students. All the books are RFID Tagged in the Library & RFID Scanners are used at the Circulation Counter for books transactions.',
      'Regular Books may be borrowed for a period of Ten (10) Days and may be renewed for a further period of Ten (10) Days, provided the item is not required by any other member. Borrowers shall be responsible for the loss of books charged on their Card.',
      'Reservation can be done for a book which is already lent out. Reserved books are kept separately at the Circulation Counter for 2 days for each member. The reservation lapses automatically after 2 days and the next person gets the chance.',
      'Overdue charges: The book should be returned on the due date specified, otherwise for every day of delay a fine of Rs. 1.00 will be collected.',
      'Reference books viz. Encyclopedias, Dictionaries, Maps, Microfilms etc. will not be issued. Current and back volumes of Periodicals will not be issued.',
      'Books on loan may be renewed (reissued) provided those books are not in demand by other readers.',
      'No Dues Certificates will be issued either to students for writing their examinations or to staff members at the time of resignation only when all books are returned and dues cleared.',
      'A member who infringes or violates the rules shall be liable to forfeit the privilege of admission into and borrowing books from the library.',
    ],
    borrowingLimits: [
      { category: 'STAFF', limit: 'Six Books (6 Books) at a Time', period: 'Semester / Annual' },
      { category: 'STUDENTS', limit: 'Two Books (3 Books) at a Time', period: '10 Days (Renewable for 10 Days)' },
      { category: 'SPECIAL CATEGORY STUDENTS', limit: 'Four Books (4 Books) at a time under Book Bank Scheme (SC / ST Category)', period: 'Full Semester Loan' },
    ],
    timings: [
      { day: 'Monday to Saturday', hours: '9.00 A.M TO 5.30 P.M' },
      { day: 'Sunday & Holidays', hours: '9.00 A.M TO 4.00 P.M' },
    ],
  },
  publications: {
    international: [
      {
        sNo: 1,
        title: 'Use of Internet/Web Resources by the Faculty Members and Students of Engineering College Libraries in Sri Venkateswara University Area',
        citation: 'International Journal of Trend in Scientific Research and Development, Vol.1, Issue 4, pp. 491-503, www.ijtsrd.com',
        isbnOrIssn: 'ISSN: 2456-6470',
        year: 'June 2017',
      },
      {
        sNo: 2,
        title: 'Significance of Re-Engineering in Academic Library and Information Centres as the Gateway in context of Modern Management',
        citation: 'International conference Re-engineering of Library Resources and Services: challenges and opportunities (ICRLRS-2016), Library and Information Science wing, DDE Annamalai University, pp. 398-401',
        isbnOrIssn: 'ISBN: 978-81-908804-9-7',
        year: '2016',
      },
      {
        sNo: 3,
        title: 'Application of Information and Communication Technologies in Library and Information centres: an Overview',
        citation: 'International conference on Innovation Driven Librarianship: Creating Future Landscape for the New Generation Libraries and LIS Professionals (ICIDL2015), Green Pearl Publication',
        isbnOrIssn: 'ISBN: 978-93-84136-05-4',
        year: '2015',
      },
      {
        sNo: 4,
        title: 'Implementation and Usage of RFID Technology in RVS University: A Case study',
        citation: 'International conference on Scholarly Communication and Knowledge Management in higher Educational Institutions, Allied publishers, pp. 179-184',
        isbnOrIssn: 'ISBN: 978-81-8424-956-9',
        year: '2014',
      },
      {
        sNo: 5,
        title: 'Prospects of Data Mining Techniques in Digital Library: An Overview',
        citation: 'International conference on sustainability of Digital Libraries (ICSDL-2014), B S Publication, pp. 70-75',
        isbnOrIssn: 'ISBN: 978-93-83635-33-7',
        year: '2014',
      },
      {
        sNo: 6,
        title: 'Analytical study on knowledge about open source software in technological institutional LIS professionals',
        citation: 'International Journal of Library and Information science, Vol.5, Issue 11, pp. 439-446, http://www.academicjournals.org/ijlis',
        isbnOrIssn: 'ISSN: 2141-2537, DOI: 10.5897/IJLIS2013.0390',
        year: 'Dec 2013',
      },
      {
        sNo: 7,
        title: 'A Scientometric study of Digital literacy in Online Library and Information science and Technology Abstracts (LISTA)',
        citation: 'International Journal of Library and Information Studies, Vol.3, Issue 4, pp. 108-118, http://www.ijlis.org/',
        isbnOrIssn: 'ISSN: 2331-1911',
        year: 'Oct-Dec 2013',
      },
      {
        sNo: 8,
        title: 'Open Source Software’s and their Impact on Library and Information Centre: An Overview',
        citation: 'International Journal of Library and Information Science, Vol.5, Issue 4, pp. 92-96, http://www.academicjournals.org/ijlis',
        isbnOrIssn: 'ISSN: 2241-2537',
        year: 'May 2013',
      },
      {
        sNo: 9,
        title: 'Users satisfaction of Engineering Institutional Libraries in Chittoor, Andhra Pradesh - A Survey',
        citation: 'International Journal of Digital Library Services, Vol.3, Issue 1, pp. 83-95, www.ijodls.in',
        isbnOrIssn: 'ISSN: 2250-1142',
        year: 'Jan-March 2013',
      },
      {
        sNo: 10,
        title: 'Digital Preservation in State Universities of Andhra Pradesh: A Survey',
        citation: 'International Journal of Library Information Science, Vol.5, Issue 02, pp. 43-49, http://www.academicjournals.org/ijlis',
        isbnOrIssn: 'ISSN: 2141-2537',
        year: 'February 2013',
      },
      {
        sNo: 11,
        title: 'Wi-Fi Technology and Its Applications in ICT Era in Library and Information Centers: A Study',
        citation: 'International Journal of Management, IT and Engineering, Vol.3, Issue 02, pp. 112-121, www.ijmra.us',
        isbnOrIssn: 'ISSN: 2249-0558',
        year: 'February 2013',
      },
      {
        sNo: 12,
        title: 'Role of Open source software’s and their impact on Library and Information Centers: A Study',
        citation: 'International Journal of Physical and Social Sciences, Vol.2, Issue 12, pp. 266-179, www.ijmra.us',
        isbnOrIssn: 'ISSN: 2249-5894',
        year: 'December 2012',
      },
      {
        sNo: 13,
        title: 'Role of Search Engines in Library and Information Centers: An Overview',
        citation: 'International Journal of Management, IT and Engineering, Vol.2, Issue 12, pp. 112-125, www.ijmra.us',
        isbnOrIssn: 'ISSN: 2249-0558',
        year: 'December 2012',
      },
      {
        sNo: 14,
        title: 'Role of IPR issues in the Era of Information and Communication Technology',
        citation: 'International Journal of Research in Social Sciences, Vol.2, Issue 4, pp. 636-645, www.ijmra.us',
        isbnOrIssn: 'ISSN: 2249-2496',
        year: 'November 2012',
      },
      {
        sNo: 15,
        title: 'Digital Era: Utilize of cloud computing Technology in Digital Library',
        citation: 'International Journal of Digital Library Services, Vol.2, Issue 3, pp. 92-106, www.ijodls.in',
        isbnOrIssn: 'ISSN: 2250-1142',
        year: 'July-September 2012',
      },
      {
        sNo: 16,
        title: 'Citation analysis of Dissertations submitted to the Department of library and information science, Sri Venkateswara University, Tirupati',
        citation: 'International Journal of Digital Library Services, Vol.2, Issue 2, pp. 44-57, www.ijodls.in',
        isbnOrIssn: 'ISSN: 2250-1142',
        year: 'April-June 2012',
      },
      {
        sNo: 17,
        title: 'Role of Mobile communication and Technology services in Educational Libraries',
        citation: 'International Journal of Librarianship and Administration, Vol.3, Issue 1, pp. 57-68',
        isbnOrIssn: 'ISSN: 2231-1300',
        year: 'January-June 2012',
      },
    ],
    national: [
      {
        sNo: 1,
        title: 'Trends in Content Management systems in Academic Library and Information Centres: an overview',
        citation: 'Creativity, Innovation and transformation in Libraries (SALIS-2016), Department of Library, K S Rangaswamy College of Technology, pp. 262-266',
        isbnOrIssn: 'ISBN: 978-93-85469-02-2',
        year: '2016',
      },
      {
        sNo: 2,
        title: 'Significance of User education Programmes in Library and Information Centres in ICT Era: An Overview',
        citation: 'Contemporary Trends in Librarianship, SBW Publication 2015, pp. 589-594',
        isbnOrIssn: 'ISBN: 978-81-85708-64-3',
        year: '2015',
      },
      {
        sNo: 3,
        title: 'A Survey on Information and Communication Technology Infrastructure in Engineering College Libraries in Sri Venkateswara University Area',
        citation: 'SRELS Journal of Information Management, Vol.52, Issue 5, pp. 385-394',
        isbnOrIssn: 'ISSN Print: 0972-2467, ISSN Online: 0976-2477',
        year: 'October 2015',
      },
      {
        sNo: 4,
        title: 'Significance of Research Design for User Studies in R & D activities in Library and Information science Education: An Overview',
        citation: 'User Studies in Academic Libraries in the ICT Era, BS Publication 2014, pp. 24-31',
        isbnOrIssn: 'ISBN: 978-93-8363-591-7',
        year: '2014',
      },
      {
        sNo: 5,
        title: 'Relevance of Mobile Technology to afford by Engineering college library users: comparative study',
        citation: 'Merit Research Journal of Education and Review, Vol.2, Issue 07, pp. 119-126, www.meritresearchjournals.org',
        year: 'July 2014',
      },
      {
        sNo: 6,
        title: 'Evaluation of quality library service Measurement Tools in the Engineering college Libraries in Chittoor District: A Study',
        citation: 'Lead the Change: Innovative Information Professionals in the Digital Age, Spectrum Publication 2014, pp. 360-365',
        isbnOrIssn: 'ISBN: 978-93-82829-76-8',
        year: '2014',
      },
      {
        sNo: 7,
        title: 'Expertise of E-Resources in Information Resources Center for Computer Science Institutions - A Study',
        citation: 'Journal of the Young Librarians Associations 2013, pp. 10-13',
        isbnOrIssn: 'ISSN: 0975-4857',
        year: '2013',
      },
      {
        sNo: 8,
        title: 'Marketing of Information Resources in Academic libraries: An overview',
        citation: 'Emerging Technologies in Information Management, BS Publication 2014, pp. 219-228',
        isbnOrIssn: 'ISBN: 978-81-7800-332-0',
        year: '2014',
      },
      {
        sNo: 9,
        title: 'Familiarity of social networking services among Library and information science professionals - A Survey',
        citation: 'SRELS Journal of Information Management 2013, pp. 453-462',
        isbnOrIssn: 'ISSN: 0976-2477',
        year: '2013',
      },
      {
        sNo: 10,
        title: 'Libraries and Cloud computing - Winds of change',
        citation: 'Information Management Today and Tomorrow, 2013, B R Publishing Corporation, pp. 485-491',
        isbnOrIssn: 'ISBN: 978-93-5050-114-6',
        year: '2013',
      },
      {
        sNo: 11,
        title: 'Uncertainties of digital information and preservation in today’s and tomorrow’s generation: An idea',
        citation: 'Merit Research Journal of Education and Review, Vol.1, Issue 03, pp. 058-063, www.meritresearchjournals.org',
        year: 'April 2013',
      },
      {
        sNo: 12,
        title: 'Social Empowerment in Rural Areas through Information and Communication Technologies',
        citation: 'Business Vision: Management & Business Journal, Vol.9, Issue 01, pp. 86-92, www.sncps.com',
        isbnOrIssn: 'ISSN: 2231-5497',
        year: 'Jan-March 2013',
      },
      {
        sNo: 13,
        title: 'Digital Era: Role of E-Learning in Digital Libraries in Information and Communication Technology – An Overview',
        citation: 'Lingaya’s Journal of Professional Studies, Vol.6, Issue 02, pp. 87-94, www.lingayasuniversity.edu',
        isbnOrIssn: 'ISSN: 0975-539X',
        year: 'Jan-June 2013',
      },
      {
        sNo: 14,
        title: 'Total quality management and knowledge management integrations in library and information centers: A Study',
        citation: 'Journal of Research in International Business and Management, Vol.2, Issue 11, pp. 292-298, www.interesjournals.org',
        isbnOrIssn: 'ISSN: 2251-0028',
        year: 'November 2012',
      },
      {
        sNo: 15,
        title: 'Awareness of search Engines and their Impact in Library and Information centers: A study',
        citation: 'Next Generation Librarianship: strategies for change management, B S Publications, 2012, Page No. 163',
        isbnOrIssn: 'ISBN: 978-81-7800-265-1',
        year: '2012',
      },
      {
        sNo: 16,
        title: 'Library 2.0: Application and tools of Web 2.0 technologies: An overview',
        citation: 'Organization of Information in the knowledge society, Intellectual Foundation (INDIA), 2011, Page No. 225',
        isbnOrIssn: 'ISBN: 978-93-81818-00-8',
        year: '2011',
      },
      {
        sNo: 17,
        title: 'Role of cloud computing Technology in Digital Library – An Overview',
        citation: 'Library and Information Services in the Digital Era, B S Publications, August 2011, Page No. 390',
        isbnOrIssn: 'ISBN: 978-93-81075-49-4',
        year: 'August 2011',
      },
      {
        sNo: 18,
        title: 'Application of Mobile Tools and Technology in Academic Library and Information centres',
        citation: 'Indian Journal of Interdisciplinary Research, Vol.1, No.2, pp. 34-40',
        isbnOrIssn: 'ISSN: 0976-4372',
        year: 'July-Dec 2010',
      },
      {
        sNo: 19,
        title: 'Implementation of RFID with smart cards in libraries',
        citation: 'Trends and challenges in Management and corporate libraries in digital era, Allied Publishers Private Limited, pp. 379-384',
        isbnOrIssn: 'ISBN: 978-81-8424-566-0',
        year: '2010',
      },
      {
        sNo: 20,
        title: 'Strategies of International Mobility for higher education',
        citation: 'University News, Vol.48, No.28, Page No. 166',
        isbnOrIssn: 'ISSN: 0566-2257',
        year: 'July 2010',
      },
    ],
  },
};
