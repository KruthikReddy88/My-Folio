import React from "react";
import { motion } from "framer-motion";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Briefcase, GraduationCap } from "lucide-react";
import { useInView } from "react-intersection-observer";

const experiences = [
  {
    title: "CEH v12 Certification Training",
    company: "EC-Council (Upcoming)",
    date: "Aug 2025 – Nov 2025",
    description: "Certified Ethical Hacker v12 training program covering advanced cybersecurity techniques.",
    icon: <Briefcase className="w-full h-full text-white p-1" />,
    iconBg: "#383E56",
    points: [
      "Training includes hands-on labs and real-world threat simulation environments (iLabs).",
      "Covers attack vectors, vulnerability assessment, system penetration testing, and network security.",
      "Prepares for CEH v12 certification and advanced penetration testing roles."
    ]
  },
  {
    title: "Cybersecurity Analyst - Job Simulation",
    company: "Forage",
    date: "Jan 2025 – Feb 2025",
    description: "Simulated real-world cybersecurity tasks including risk assessment, threat identification, and reporting.",
    icon: <Briefcase className="w-full h-full text-white p-1" />,
    iconBg: "#383E56",
    points: [
      "Performed simulated risk assessments and identified key security threats.",
      "Practiced creating professional security reports and documentation.",
      "Learned tools used by real-world cybersecurity professionals."
    ]
  },
  {
    title: "Cybersecurity Intern",
    company: "Prodigy InfoTech",
    date: "Sep 2024 – Oct 2024",
    description: "Completed hands-on cybersecurity tasks across multiple domains.",
    icon: <Briefcase className="w-full h-full text-white p-1" />,
    iconBg: "#383E56",
    points: [
      "Implemented Caesar Cipher encryption.",
      "Developed image encryption techniques using pixel manipulation.",
      "Created a password complexity checker and simple keylogger.",
      "Analyzed network packets using Python tools."
    ]
  },
  {
    title: "B.Tech in Computer Science & Engineering (Cybersecurity)",
    company: "Alliance University",
    date: "Sep 2022 – July 2026",
    description: "Focused on cybersecurity principles, secure software design, and ethical hacking.",
    icon: <GraduationCap className="w-full h-full text-white p-1" />,
    iconBg: "#383E56",
    points: [
      "Specialized in cybersecurity and secure software development.",
      "Maintained an 8.4 CGPA.",
      "Worked on major projects like Malicious URL Detection and Drone Signal Interception.",
      "Led the university volleyball club and participated in various competitions."
    ]
  },
  {
    title: "Pre-University (PU)",
    company: "Sri Chaitanya PU College",
    date: "2020 – 2022",
    description: "Studied core subjects with emphasis on mathematics and computer science.",
    icon: <GraduationCap className="w-full h-full text-white p-1" />,
    iconBg: "#383E56",
    points: [
      "Completed coursework in mathematics, physics, and computer science.",
      "Achieved a grade of 5.56 CGPA.",
      "Participated in technical events and seminars."
    ]
  },
  {
    title: "High School",
    company: "Sri Chaitanya School",
    date: "2020",
    description: "Completed secondary education with a strong foundation in science and mathematics.",
    icon: <GraduationCap className="w-full h-full text-white p-1" />,
    iconBg: "#383E56",
    points: [
      "Graduated with 88.17% marks.",
      "Excelled in science and mathematics subjects.",
      "Engaged in extracurricular activities and leadership programs."
    ]
  }
];

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="experience" className="relative py-16 md:py-24 bg-black-100">
      <div className="section-wrapper">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="section-subtext">What I have done so far</p>
          <h2 className="section-heading">Experience & Education</h2>
        </motion.div>

        <div className="mt-20 flex flex-col">
          <VerticalTimeline lineColor="#915EFF">
            {experiences.map((experience, index) => (
              <VerticalTimelineElement
                key={index}
                contentStyle={{
                  background: "#1d1836",
                  color: "#fff",
                }}
                contentArrowStyle={{ borderRight: "7px solid #232631" }}
                date={experience.date}
                iconStyle={{ background: experience.iconBg }}
                icon={experience.icon}
                visible={inView}
              >
                <div>
                  <h3 className="text-white text-xl font-bold">{experience.title}</h3>
                  <p className="text-secondary text-base font-semibold" style={{ margin: 0 }}>
                    {experience.company}
                  </p>
                </div>

                <ul className="mt-5 list-disc ml-5 space-y-2">
                  {experience.points.map((point, pointIndex) => (
                    <li
                      key={`experience-point-${index}-${pointIndex}`}
                      className="text-white-100 text-sm pl-1 tracking-wider"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </div>
    </section>
  );
};

export default Experience;
