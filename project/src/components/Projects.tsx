import React from "react";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { useInView } from "react-intersection-observer";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Malicious URL Detection using Machine Learning",
    description: "Built a ML-based system to detect malicious URLs using LightGBM and Random Forest, achieving 96.6% accuracy. Trained on 651K+ URLs with AUC-ROC of 0.97.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4_d1z1_pvKrFmMhi4JVHK0x9ZJQwFoiw00A&s",
    tags: ["Machine Learning", "Python", "Cybersecurity", "LightGBM"],
    source_code_link: "#",
    live_demo_link: "#",
  },
  {
    title: "Drone Control via RF Signal Interception",
    description: "Intercepts and analyzes RF signals to control drone behavior. Focus on security vulnerabilities in wireless communication protocols.",
    image: "https://www.robinradar.com/hs-fs/hubfs/Robin%20Radar%20Blog%20Images/radio-frequency-analysers-drone-detection-robin-radar-01.png?width=624&height=405&name=radio-frequency-analysers-drone-detection-robin-radar-01.png",
    tags: ["Cybersecurity", "RF Analysis", "Python", "IoT"],
    source_code_link: "#",
    live_demo_link: "#",
  },
  {
    title: "AI-Powered Malware Detection System",
    description: "A deep learning-based malware detection system built using synthetic datasets to replicate real-world malicious patterns, integrated with an Intrusion Detection System (IDS) for real-time threat identification and automated response.",
    image: "https://cdn.pixabay.com/photo/2020/05/04/14/55/cybersecurity-5125178_1280.jpg",
    tags: ["Deep Learning", "Malware Detection", "IDS", "Cybersecurity", "AI"],
    source_code_link: "#",
    live_demo_link: "#",
  },
];

const ProjectCard = ({ index, project }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <Tilt
        options={{ max: 45, scale: 1, speed: 450 }}
        className="project-card p-5 rounded-2xl sm:w-[360px] w-full"
      >
        <div className="project-card-inner">
          <div className="relative w-full h-[230px]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover rounded-2xl"
            />
            <div className="absolute inset-0 flex justify-end m-3 gap-2">
              <div
                onClick={() => window.open(project.source_code_link, "_blank")}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
              >
                <Github className="w-1/2 h-1/2 text-white" />
              </div>
              <div
                onClick={() => window.open(project.live_demo_link, "_blank")}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
              >
                <ExternalLink className="w-1/2 h-1/2 text-white" />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <h3 className="text-white font-bold text-[24px]">{project.title}</h3>
            <p className="mt-2 text-secondary text-[14px]">{project.description}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag, tagIndex) => (
              <p key={`${tag}-${tagIndex}`} className="text-[14px]" style={{ color: "#915EFF" }}>
                #{tag}
              </p>
            ))}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="projects" className="relative py-16 md:py-24">
      <div className="section-wrapper">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="section-subtext">My works</p>
          <h2 className="section-heading">PROJECTS</h2>
        </motion.div>

        <div className="w-full flex">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
          >
            The following projects showcase my skills and experience through real-world examples. 
            Each project includes a description, tech stack, and links to code and live demos.
          </motion.p>
        </div>

        <div className="mt-20 flex flex-wrap gap-7 justify-center">
          {projects.map((project, index) => (
            <ProjectCard key={`project-${index}`} index={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
