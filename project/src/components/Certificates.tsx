import React from "react";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { useInView } from "react-intersection-observer";
import { Award, ExternalLink } from "lucide-react";

const certificates = [
  {
    title: "Certified Ethical Hacker (CEH)",
    issuer: "EC-Council",
    date: "Augest 2025",
    description: "Industry-recognized certification focused on ethical hacking techniques and cybersecurity practices.",
    image: "https://www.webasha.com/blog/uploads/images/image_750x_6319caf999d4b.jpg",
    link: "#"
  },
  {
    title: "Ethical Hacking Essentials (EHE)",
    issuer: "EC-Council",
    date: "November 2024",
    description: "Fundamentals of ethical hacking, including penetration testing and vulnerability assessment.",
    image: "https://iclass.eccouncil.org/wp-content/uploads/2022/05/EHE_intl.jpg",
    link: "https://raw.githubusercontent.com/KruthikReddy88/My-Folio/refs/heads/main/project/public/Ethical%20Hacking%20Essentials.jpg"
  },
  {
    title: "Introduction to CISSP: Security Assessment & Operations",
    issuer: "Simplilearn",
    date: "September 2024",
    description: "Exploration of key CISSP domains with focus on risk management, security operations, and assessment.",
    image: "https://rms.koenig-solutions.com/Sync_data/CCE_Logo/2239-cissp.jpgL.jpg",
    link: "https://raw.githubusercontent.com/KruthikReddy88/My-Folio/refs/heads/main/project/public/Simplilearn.jpg"
  },
  {
    title: "Digital Forensics for Pentesters",
    issuer: "Packt",
    date: "February 2025",
    description: "Hands-on training in digital forensics tools, investigation techniques, and cybercrime analysis.",
    image: "https://cdn.mos.cms.futurecdn.net/v2/t:0,l:0,cw:1920,ch:1080,q:80,w:1920/5fz9SMYxWbv44jFVcD4vmd.jpg",
    link: "https://raw.githubusercontent.com/KruthikReddy88/My-Folio/refs/heads/main/project/public/DF%20for%20pentesters.jpg"
  }
];

const CertificateCard = ({ index, certificate }) => {
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
      className="w-full sm:w-[calc(50%-16px)] lg:w-[calc(50%-24px)]"
    >
      <Tilt
        options={{
          max: 15,
          scale: 1.05,
          speed: 450,
        }}
        className="bg-tertiary rounded-2xl overflow-hidden h-full"
      >
        <div className="relative w-full h-[200px] overflow-hidden">
          <img 
            src={certificate.image} 
            alt={certificate.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-tertiary via-transparent to-transparent"></div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center mb-3">
            <Award className="text-accent mr-2 h-5 w-5" />
            <h3 className="text-white text-xl font-bold">{certificate.title}</h3>
          </div>
          
          <div className="flex justify-between items-center mb-3">
            <p className="text-secondary text-sm">{certificate.issuer}</p>
            <p className="text-accent text-sm">{certificate.date}</p>
          </div>
          
          <p className="text-secondary mb-4">{certificate.description}</p>
          
          <a 
            href={certificate.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-accent hover:text-white transition-colors duration-300"
          >
            View Certificate <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Certificates = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="certificates" className="relative py-16 md:py-24">
      <div className="section-wrapper">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="section-heading">MY ACHIEVEMENTS</p>
          <h2 className="section-subtext">CERTIFICATES</h2>
        </motion.div>

        <div className="mt-16 flex flex-wrap gap-8 justify-center">
          {certificates.map((certificate, index) => (
            <CertificateCard 
              key={certificate.title}
              index={index}
              certificate={certificate}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
