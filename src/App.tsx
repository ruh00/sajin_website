import { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/utils/cn';
import { CustomCursor } from '@/components/CustomCursor';
import { 
  ArrowDown, 
  BookOpen, 
  Briefcase, 
  Certificate, 
  Envelope, 
  Globe, 
  Handshake, 
  Lightbulb, 
  Link as LinkIcon, 
  MapPin, 
  Phone, 
  Student, 
  TreeStructure,
  User,
  Users
} from '@phosphor-icons/react';

// Types
interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  responsibilities: string[];
}

interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  result: string;
}

interface AchievementItem {
  title: string;
  organization: string;
  year: string;
  description: string;
}

// Data
const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: <User size={18} /> },
  { id: 'about', label: 'About', icon: <BookOpen size={18} /> },
  { id: 'experience', label: 'Experience', icon: <Briefcase size={18} /> },
  { id: 'education', label: 'Education', icon: <Student size={18} /> },
  { id: 'achievements', label: 'Achievements', icon: <Certificate size={18} /> },
  { id: 'contact', label: 'Contact', icon: <Envelope size={18} /> },
];

const experiences: ExperienceItem[] = [
  {
    role: 'Intern Teacher',
    organization: 'Fatehabad Model Multilateral High School',
    period: 'Jan 2025 – April 2025',
    responsibilities: [
      'Developed and delivered curriculum-aligned lessons and instructional materials',
      'Coordinated academic, co-curricular, and cultural programs for student development',
      'Fostered effective communication and professional relationships with students and colleagues',
    ],
  },
];

const education: EducationItem[] = [
  {
    degree: 'B.Ed (Honours)',
    institution: 'Institute of Education and Research (IER), University of Chittagong',
    year: '2023',
    result: 'CGPA: 3.50/4.00',
  },
  {
    degree: 'HSC (Science)',
    institution: 'Govt. Shah Sultan College, Bogra',
    year: '2019',
    result: 'GPA: 4.67/5.00',
  },
  {
    degree: 'SSC (Science)',
    institution: 'Shariakandi Govt. High School, Bogra',
    year: '2017',
    result: 'GPA: 5.00/5.00',
  },
];

const achievements: AchievementItem[] = [
  {
    title: 'Creative Talent Hunt Competition - Three-Time Champion',
    organization: 'Ministry of Education, Bangladesh',
    year: '2014–2016',
    description: '1st Position at Upazila level for three consecutive years',
  },
  {
    title: 'Speech Competition - 1st Position',
    organization: 'Ministry of Power, Energy and Mineral Resources',
    year: '2016',
    description: 'Awarded for oration on "Renewable Energy and its Role in Mitigating the Energy Crisis in Bangladesh"',
  },
];

const volunteerRoles = [
  {
    title: 'Volunteer Tutor',
    organization: 'Ekla Cholo Re, University of Chittagong',
    description: 'Provided literacy and numeracy instruction to underprivileged and street children',
    icon: <Handshake size={20} />,
  },
  {
    title: 'Seminar Judge',
    organization: 'IER Debating Club, University of Chittagong',
    description: 'Evaluated public speaking at "IER Shikkha Vabna 1.0" seminar',
    icon: <Certificate size={20} />,
  },
  {
    title: 'Joint General Secretary',
    organization: 'Rajshahi District Students Association',
    description: 'Led meetings and streamlined coordination (2023–2024)',
    icon: <TreeStructure size={20} />,
  },
  {
    title: 'Cultural & Education Secretary',
    organization: 'Rajshahi District Students Association',
    description: 'Executed large-scale events and academic programs (2021–2023)',
    icon: <Lightbulb size={20} />,
  },
  {
    title: 'Debater & Public Speaker',
    organization: 'Chittagong University Debating Society (CUDS)',
    description: 'Completed 16th Debate & Public Speaking Workshop. ',
    icon: <Users size={20} />,
  },
];

const skills = [
  { category: 'Digital', items: ['Microsoft Office', 'Internet Research'] },
  { category: 'Professional', items: ['Effective Communication', 'Critical Thinking', 'Leadership', 'Classroom Management', 'Adaptability'] },
  { category: 'Languages', items: ['Bengali (Native)', 'English (Fluent)'] },
];

// Components
const SectionHeading: React.FC<{ children: React.ReactNode; subtitle?: string }> = ({ children, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-100px' }}
    transition={{ duration: 0.6 }}
    className="mb-16"
  >
    {subtitle && (
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-sm font-medium tracking-widest text-zinc-500 uppercase"
      >
        {subtitle}
      </motion.span>
    )}
    <h2 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-900 mt-2">
      {children}
    </h2>
    <div className="w-16 h-px bg-zinc-300 mt-4" />
  </motion.div>
);

const Navigation: React.FC<{ activeSection: string }> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-zinc-200/50' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-light tracking-tight text-zinc-900"
          >
            TRMS
          </motion.div>
          
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-full transition-all duration-300',
                  activeSection === item.id
                    ? 'bg-zinc-900 text-white'
                    : 'text-zinc-600 hover:bg-zinc-100'
                )}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          <motion.a
            href="#contact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 text-white text-sm font-medium rounded-full hover:bg-zinc-800 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
          >
            Get in Touch
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
};

const HeroSection: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useSpring(opacity, { stiffness: 100, damping: 20 });

  const scrollToAbout = useCallback(() => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section id="home" className="min-h-[100dvh] flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-zinc-50 via-white to-zinc-100">
      {/* Decorative background elements */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 right-20 w-64 h-64 rounded-full bg-gradient-to-br from-amber-100/40 to-orange-100/20 blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-gradient-to-tr from-blue-100/30 to-indigo-100/10 blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          style={{ opacity, scale }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >

          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter text-zinc-900 leading-none"
          >
            Tafrim Reza
            <br />
            <span className="font-normal">Mohammad Sajin</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 text-xl md:text-2xl text-zinc-600 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Dedicated educator committed to driving meaningful social change
            through community learning and academic excellence
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={scrollToAbout}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 text-white font-medium rounded-full hover:bg-zinc-800 transition-all duration-300 hover:scale-105"
            >
              Explore My Journey
              <ArrowDown className="group-hover:translate-y-1 transition-transform" size={18} />
            </button>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white border border-zinc-200 text-zinc-900 font-medium rounded-full hover:bg-zinc-50 transition-all duration-300 hover:scale-105"
            >
              Contact Me
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-zinc-300 rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-zinc-400 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading subtitle="Who I Am">About Me</SectionHeading>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
          <div className="relative">
        <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200">
          
          <img
            src="https://plain-apac-prod-public.komododecks.com/202604/23/YIVAUPGAH4NXv3pJn0ds/image.jpg"
            alt="Tafrim Reza Mohammad Sajin"
            className="w-full h-full object-cover"
          />

        </div>
      </div>
 
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-lg text-zinc-600 leading-relaxed mb-6">
              I am a dedicated Education graduate from the University of Chittagong with a strong 
              foundation in teaching, community engagement, and leadership. My journey has been 
              shaped by years of academic excellence, teaching internships, and a deep commitment 
              to creating positive social change through education.
            </p>
            <p className="text-lg text-zinc-600 leading-relaxed mb-8">
              With experience as an intern teacher, volunteer tutor, and student leader, I have 
              developed the skills to coordinate programs, communicate effectively, and inspire 
              others to reach their full potential. My passion lies in making education accessible 
              and meaningful for all.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-100">
                <Globe className="w-6 h-6 text-zinc-600 mb-2" />
                <h3 className="font-medium text-zinc-900 mb-1">Location</h3>
                <p className="text-sm text-zinc-600">Chattogram, Bangladesh</p>
              </div>
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-100">
                <Certificate className="w-6 h-6 text-zinc-600 mb-2" />
                <h3 className="font-medium text-zinc-900 mb-1">Education</h3>
                <p className="text-sm text-zinc-600">B.Ed (Honours)</p>
              </div>
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-100">
                <Lightbulb className="w-6 h-6 text-zinc-600 mb-2" />
                <h3 className="font-medium text-zinc-900 mb-1">Focus</h3>
                <p className="text-sm text-zinc-600">Community Learning</p>
              </div>
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-100">
                <Handshake className="w-6 h-6 text-zinc-600 mb-2" />
                <h3 className="font-medium text-zinc-900 mb-1">Goal</h3>
                <p className="text-sm text-zinc-600">Social Impact</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 md:py-32 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading subtitle="Professional Journey">Work Experience</SectionHeading>

        <div className="grid gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-3xl p-8 md:p-10 border border-zinc-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-light text-zinc-900">{exp.role}</h3>
                  <p className="text-lg text-zinc-600 mt-1">{exp.organization}</p>
                </div>
                <span className="inline-flex items-center px-4 py-2 bg-zinc-100 rounded-full text-sm font-medium text-zinc-600 whitespace-nowrap">
                  {exp.period}
                </span>
              </div>

              <ul className="space-y-3">
                {exp.responsibilities.map((resp, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-start gap-3 text-zinc-600"
                  >
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-zinc-400 flex-shrink-0" />
                    <span>{resp}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Volunteer Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-light text-zinc-900 mb-8">Volunteer & Leadership Roles</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {volunteerRoles.map((role, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="group p-6 rounded-2xl bg-white border border-zinc-100 hover:border-zinc-200 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center mb-4 text-zinc-600 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-300">
                  {role.icon}
                </div>
                <h4 className="font-medium text-zinc-900 mb-1">{role.title}</h4>
                <p className="text-sm text-zinc-500 mb-3">{role.organization}</p>
                <p className="text-sm text-zinc-600">{role.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading subtitle="Academic Background">Education</SectionHeading>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-zinc-200 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={cn(
                  'relative flex flex-col md:flex-row gap-8',
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                )}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-zinc-900 transform -translate-x-1/2 mt-1.5 ring-4 ring-white" />

                {/* Content */}
                <div className={cn(
                  'ml-16 md:ml-0 md:w-1/2',
                  index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                )}>
                  <div className="bg-zinc-50 rounded-2xl p-6 md:p-8 border border-zinc-100 hover:shadow-md transition-shadow duration-300">
                    <span className="inline-block px-3 py-1 bg-zinc-200 rounded-full text-xs font-medium text-zinc-600 mb-3">
                      {edu.year}
                    </span>
                    <h3 className="text-xl font-medium text-zinc-900 mb-2">{edu.degree}</h3>
                    <p className="text-zinc-600 mb-3">{edu.institution}</p>
                    <p className="text-sm text-zinc-500">{edu.result}</p>
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-light text-zinc-900 mb-8">Skills & Competencies</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="p-6 rounded-2xl bg-zinc-50 border border-zinc-100"
              >
                <h4 className="font-medium text-zinc-900 mb-4">{skillGroup.category}</h4>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill, i) => (
                    <li key={i} className="flex items-center gap-2 text-zinc-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const AchievementsSection: React.FC = () => {
  return (
    <section id="achievements" className="py-24 md:py-32 bg-zinc-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading subtitle="Recognition & Awards">
          <span className="text-white">Achievements</span>
        </SectionHeading>

        <div className="grid md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500"
            >
              <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Certificate className="w-6 h-6 text-amber-400" />
              </div>

              <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-zinc-300 mb-4">
                {achievement.year}
              </span>

              <h3 className="text-xl font-medium mb-3">{achievement.title}</h3>
              <p className="text-zinc-400 mb-4">{achievement.organization}</p>
              <p className="text-zinc-300">{achievement.description}</p>

              {/* Decorative element */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '3', label: 'Years Teaching Experience' },
            { value: '5+', label: 'Leadership Roles' },
            { value: '3x', label: 'Competition Champion' },
            { value: '16th', label: 'Debate Workshop Completed' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-light text-white mb-2">{stat.value}</div>
              <div className="text-sm text-zinc-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate form submission
    setTimeout(() => {
      setFormState('success');
      setTimeout(() => setFormState('idle'), 3000);
    }, 1500);
  }, []);

  const contactInfo = [
    { icon: <Envelope size={20} />, label: 'Email', value: 'tafrimcu@gmail.com', href: 'mailto:tafrimcu@gmail.com' },
    { icon: <Phone size={20} />, label: 'Phone', value: '+880 1827-624072', href: 'tel:+8801827624072' },
    { icon: <MapPin size={20} />, label: 'Address', value: '2 No. Gate, CU Campus, Chattogram', href: null },
    { icon: <LinkIcon size={20} />, label: 'LinkedIn', value: 'Connect on LinkedIn', href: '#' },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 bg-gradient-to-br from-zinc-50 via-white to-zinc-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading subtitle="Get In Touch">Contact Me</SectionHeading>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-lg text-zinc-600 leading-relaxed mb-8">
              I am always open to discussing opportunities in education, community development, 
              or any role where I can contribute to meaningful social change. Feel free to reach out!
            </p>

            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href || undefined}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className={cn(
                    'flex items-center gap-4 p-4 rounded-2xl transition-all duration-300',
                    item.href 
                      ? 'bg-white border border-zinc-100 hover:shadow-md hover:border-zinc-200 cursor-pointer'
                      : 'bg-white/50 border border-transparent'
                  )}
                  target={item.href?.startsWith('http') ? '_blank' : undefined}
                  rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-600">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">{item.label}</p>
                    <p className="font-medium text-zinc-900">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-10 border border-zinc-100 shadow-sm">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-zinc-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 outline-none transition-all"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 outline-none transition-all resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={formState !== 'idle'}
                  className={cn(
                    'w-full py-4 rounded-xl font-medium transition-all duration-300',
                    formState === 'success'
                      ? 'bg-green-500 text-white'
                      : 'bg-zinc-900 text-white hover:bg-zinc-800'
                  )}
                  whileHover={{ scale: formState === 'idle' ? 1.02 : 1 }}
                  whileTap={{ scale: formState === 'idle' ? 0.98 : 1 }}
                >
                  {formState === 'idle' && 'Send Message'}
                  {formState === 'submitting' && (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  )}
                  {formState === 'success' && 'Message Sent!'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-zinc-900 text-zinc-400">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-white font-medium mb-1">Tafrim Reza Mohammad Sajin</p>
            <p className="text-sm">...</p>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="mailto:tafrimcu@gmail.com" className="hover:text-white transition-colors">Email</a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-zinc-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Tafrim Reza Mohammad Sajin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-[100dvh] bg-white">
      <CustomCursor />
      <Navigation activeSection={activeSection} />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <EducationSection />
        <AchievementsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
