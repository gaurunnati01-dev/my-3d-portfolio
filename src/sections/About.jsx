import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import profileImg from "../assets/unnati-profile.jpg";

const About = () => {
  const text = `Passionate about clean architecture
    I build scalable, high-performance solutions
    from prototype to production`;

  const aboutText = `I am a Software Developer who cares about one thing: building software that actually works under pressure.

I don't just write code; I architect solutions. Whether it's optimizing a database query, fixing a stubborn UI bug, or building a 3D experience from scratch, my focus is always on performance and clean structure.

My background includes building full-stack applications with React, Node.js, and Python. I enjoy the challenge of taking a complex problem, breaking it down, and writing the cleanest possible code to solve it.

Currently, I am looking for a Software Developer role where I can bring my obsession with performance and clean architecture to a team that values shipping high-quality products.`;

  const imgRef = useRef(null);

  useGSAP(() => {
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false,
      },
      ease: "power1.inOut",
    });

    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
    });
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: { trigger: imgRef.current },
    });
  });

  return (
    <section id="about" className="min-h-screen bg-black rounded-b-4xl">
      <AnimatedHeaderSection
        subTitle={"Code with purpose, Built to scale"}
        title={"About"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      <div className="flex flex-col items-center justify-between gap-16 px-10 pb-16 text-xl font-light tracking-wide lg:flex-row md:text-1xl lg:text-3xl text-white/80">
        <img
          ref={imgRef}
          src={profileImg}
          alt="Unnati Gaur"
          className="w-md rounded-3xl object-cover grayscale"
        />
        <AnimatedTextLines text={aboutText} className={"w-full"} />
      </div>
    </section>
  );
};

export default About;
