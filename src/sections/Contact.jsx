import { useState } from "react";
import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { socials } from "../constants";
import gsap from "gsap";

const Contact = () => {
  const text = `Got a question, idea, or project in mind?
    I'd love to hear from you and discuss further!`;
  const items = [
    "just imagine, I code",
    "just imagine, I code",
    "just imagine, I code",
    "just imagine, I code",
    "just imagine, I code",
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    // Mailto fallback: opens default mail client if backend submit function is empty
    const subject = encodeURIComponent(
      `Portfolio Inquiry from ${formData.name || "Portfolio Visitor"}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name || "N/A"}\nEmail: ${
        formData.email || "N/A"
      }\n\nMessage:\n${formData.message || ""}`
    );
    window.location.href = `mailto:gaurunnati01@gmail.com?subject=${subject}&body=${body}`;
  };

  useGSAP(() => {
    gsap.from(".social-link", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: ".social-link",
      },
    });
  }, []);

  return (
    <section
      id="contact"
      className="flex flex-col justify-between min-h-screen bg-black"
    >
      <div>
        <AnimatedHeaderSection
          subTitle={"You Dream It, I Code it"}
          title={"Contact"}
          text={text}
          textColor={"text-white"}
          withScrollTrigger={true}
        />
        <div className="flex flex-col lg:flex-row px-10 font-light text-white uppercase lg:text-[32px] text-[26px] leading-none mb-10 gap-12">
          {/* Contact Details */}
          <div className="flex flex-col w-full lg:w-1/2 gap-10">
            <div className="social-link">
              <h2>E-mail</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <a
                href="mailto:gaurunnati01@gmail.com"
                className="text-xl tracking-wider lowercase md:text-2xl lg:text-3xl hover:text-white/80 transition-colors"
              >
                gaurunnati01@gmail.com
              </a>
            </div>
            <div className="social-link">
              <h2>Phone</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <p className="text-xl lowercase md:text-2xl lg:text-3xl">
                +33 7 12 12 32 12
              </p>
            </div>
            <div className="social-link">
              <h2>Social Media</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <div className="flex flex-wrap gap-2">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs leading-loose tracking-widest uppercase md:text-sm hover:text-white/80 transition-colors duration-200"
                  >
                    {"{ "}
                    {social.name}
                    {" }"}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form with mailto fallback */}
          <div className="flex flex-col w-full lg:w-1/2 social-link">
            <h2>Send a Message</h2>
            <div className="w-full h-px my-2 bg-white/30 mb-6" />
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-sm normal-case font-normal">
              <div>
                <label className="block mb-2 text-xs tracking-wider uppercase text-white/60">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
                />
              </div>
              <div>
                <label className="block mb-2 text-xs tracking-wider uppercase text-white/60">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
                />
              </div>
              <div>
                <label className="block mb-2 text-xs tracking-wider uppercase text-white/60">
                  Your Message
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-8 py-3 text-xs tracking-widest uppercase transition-all duration-300 border border-white rounded-full cursor-pointer hover:bg-white hover:text-black w-fit font-medium"
              >
                Send via Mail
              </button>
            </form>
          </div>
        </div>
      </div>
      <Marquee items={items} className="text-white bg-transparent" />
    </section>
  );
};

export default Contact;
