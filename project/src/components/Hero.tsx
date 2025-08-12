import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Earth from "./canvas/Earth"; // Adjust path if needed

const Hero = () => {
  return (
    <section id="home" className="relative w-full h-screen mx-auto overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 75 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            alpha: true,
            depth: true,
          }}
        >
          <Suspense fallback={null}>
            <Earth />
          </Suspense>
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 section-wrapper h-full flex flex-col justify-center sm:px-16 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-lg bg-black/30 rounded-2xl p-8 border border-accent/20"
        >
          <div className="flex flex-col justify-center items-start">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-20 h-20 rounded-full bg-gradient-to-r from-accent to-accent-700 flex items-center justify-center mb-6"
            >
              <span className="text-4xl font-bold text-white">KR</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-6xl font-bold text-white mb-4"
            >
              Hi, I'm{" "}
              <span className="gradient-text" data-text="Kruthik Reddy">
                Kruthik Reddy
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl text-gray-300 mb-8 max-w-2xl"
            >
              I'm a Computer Science and Engineering student specializing in
              Cybersecurity. Passionate about ethical hacking, secure software
              engineering, and building robust systems to defend against modern digital threats.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex gap-4"
            >
              <a
                href="mailto:kruthikjreddy@gmail.com"
                className="btn btn-primary flex items-center gap-2 group"
              >
                <span>Let's Work Together</span>
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="https://www.linkedin.com/in/kruthik-reddy-j"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline group"
              >
                <span>Let's Connect</span>
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <a href="#about" className="group flex flex-col items-center" aria-label="Scroll to About section">
            <div className="w-[35px] h-[64px] rounded-3xl border-4 border-accent/50 flex justify-center items-start p-2 group-hover:border-accent transition-colors duration-300">
              <motion.div
                animate={{ y: [0, 24, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="w-3 h-3 rounded-full bg-accent mb-1 group-hover:shadow-neon"
              />
            </div>
            <span className="text-accent mt-2 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
              Scroll Down
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
