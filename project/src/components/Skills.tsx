import React from "react";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { Shield, Code, Wrench, Database } from "lucide-react";

const technologies = [
  {
    name: "Kali Linux",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  },
  {
    name: "Parrot OS",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOq0dlbQFRZlvdvWZJlWwYtREimbffZbD_Kw&s",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "C++",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  },
  {
    name: "C",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  },
  {
    name: "Linux",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-plain.svg",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "Bash",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
  },
];

const categories = [
  {
    title: "Cybersecurity",
    icon: <Shield className="w-16 h-16 text-white" />,
    skills: ["Cybersecurity", "Ethical Hacking", "Secure Coding", "Network Security", "Vulnerability Assessment"]
  },
  {
    title: "Programming",
    icon: <Code className="w-16 h-16 text-white" />,
    skills: ["Python", "C++", "C"]
  },
  {
    title: "Tools",
    icon: <Wrench className="w-16 h-16 text-white" />,
    skills: ["Wireshark", "Nmap", "Metasploit", "Burp Suite", "John the Ripper"]
  },
  {
    title: "Web Development",
    icon: <Database className="w-16 h-16 text-white" />,
    skills: ["React", "Node.js", "HTML/CSS", "Express", "RESTful APIs"]
  }
];

const SkillCard = ({ index, title, icon, skills }) => {
  return (
    <Tilt
      options={{
        max: 45,
        scale: 1,
        speed: 450,
      }}
      className="xs:w-[250px] w-full"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="service-card"
      >
        <div className="rounded-full flex justify-center items-center w-20 h-20 mb-5 bg-tertiary">
          {icon}
        </div>

        <h3 className="text-white text-[20px] font-bold text-center">{title}</h3>

        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {skills.map((skill, skillIndex) => (
            <span
              key={`skill-${index}-${skillIndex}`}
              className="skill-badge"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>
    </Tilt>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="relative py-16 md:py-24 bg-tertiary">
      <div className="section-wrapper">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="section-subtext">What I can do</p>
          <h2 className="section-heading">SKILLS & TECHNOLOGIES</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px] text-center mx-auto"
        >
          I've worked with a variety of technologies in the engineering and cybersecurity world. From analyzing system vulnerabilities to building security-focused applications, my diverse skill set allows me to approach cybersecurity challenges from multiple angles and develop comprehensive solutions.
        </motion.p>

        <div className="mt-20 flex flex-wrap gap-10 justify-center">
          {categories.map((category, index) => (
            <SkillCard key={category.title} index={index} {...category} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-white text-[24px] font-bold text-center mb-10">Technologies I've Worked With</h3>

          <div className="flex flex-row flex-wrap justify-center gap-10">
            {technologies.map((technology, index) => (
              <div className="w-28 h-28" key={technology.name}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="w-full h-full rounded-full bg-tertiary border border-white/10 flex items-center justify-center p-4 hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
                >
                  <img
                    src={technology.icon}
                    alt={technology.name}
                    className="w-16 h-16 object-contain"
                  />
                </motion.div>
                <p className="text-center text-secondary mt-2">{technology.name}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
