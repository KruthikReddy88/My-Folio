import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { EarthCanvas } from "./canvas";
import { Send, Mail, Linkedin, Github } from "lucide-react";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      alert("Thank you. I will get back to you soon.");
      setForm({
        name: "",
        email: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-16 md:py-24 xl:mt-12">
      <div className="section-wrapper xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
        >
          <p className="section-subtext">Get in touch</p>
          <h3 className="section-heading">CONTACT</h3>

          <div className="mt-8 flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="flex items-center gap-4 transform transition-all duration-300 hover:translate-x-2">
                <div className="flex justify-center items-center w-12 h-12 rounded-full bg-tertiary">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Email</h4>
                  <a href="mailto:kruthikjreddy@gmail.com" className="text-secondary hover:text-white transition-colors">
                    kruthikjreddy@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 transform transition-all duration-300 hover:translate-x-2">
                <div className="flex justify-center items-center w-12 h-12 rounded-full bg-tertiary">
                  <Linkedin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-white">LinkedIn</h4>
                  <a 
                    href="https://www.linkedin.com/in/kruthik-reddy-j" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-secondary hover:text-white transition-colors"
                  >
                    Kruthik Reddy
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 transform transition-all duration-300 hover:translate-x-2">
                <div className="flex justify-center items-center w-12 h-12 rounded-full bg-tertiary">
                  <Github className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-white">GitHub</h4>
                  <a 
                    href="https://github.com/KruthikReddy88" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-secondary hover:text-white transition-colors"
                  >
                    Kruthik Reddy
                  </a>
                </div>
              </div>
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="mt-12 flex flex-col gap-8"
            >
              <label className="flex flex-col">
                <span className="text-white font-medium mb-4">NAME</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="What's your name?"
                  className="contact-form-input"
                  required
                />
              </label>
              <label className="flex flex-col">
                <span className="text-white font-medium mb-4">EMAIL</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="What's your email address?"
                  className="contact-form-input"
                  required
                />
              </label>
              <label className="flex flex-col">
                <span className="text-white font-medium mb-4">Message</span>
                <textarea
                  rows={7}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="What would you like to say?"
                  className="contact-form-input"
                  required
                />
              </label>

              <button
                type="submit"
                className="btn btn-primary py-3 px-8 outline-none w-fit flex items-center gap-2"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
                <Send className={`w-5 h-5 ${loading ? "animate-pulse" : "animate-bounce-slow"}`} />
              </button>
            </form>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
        >
          <EarthCanvas />
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;