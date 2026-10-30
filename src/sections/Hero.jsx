import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, Lightformer, useGLTF } from "@react-three/drei";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";

const Model = () => {
  const { scene } = useGLTF("/models/model.glb");
  return <primitive object={scene} scale={1.0} position={[0, 0, 0]} />;
};

const Hero = () => {
  const text = `I help growing brands and startups gain an
unfair advantage through premium
results driven webs/apps`;

  return (
    <section
      id="home"
      className="relative flex flex-col justify-end min-h-screen bg-[#f3f3f3] overflow-hidden"
    >
      {/* 3D Canvas in background (z-0 so it renders on top of bg-[#f3f3f3]) */}
      <figure
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ width: "100%", height: "100%" }}
      >
        <Canvas
          shadows
          camera={{ position: [0, 0, 5], fov: 45 }}
        >
          <ambientLight intensity={0.8} />
          <Suspense fallback={null}>
            <Float speed={0.5}>
              <Model />
            </Float>
          </Suspense>
          <Environment resolution={256}>
            <group rotation={[-Math.PI / 3, 4, 1]}>
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[0, 5, -9]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[0, 3, 1]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[-5, -1, -1]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[10, 1, 0]}
                scale={16}
              />
            </group>
          </Environment>
        </Canvas>
      </figure>

      {/* Hero Header Content (z-10 on top of the 3D model) */}
      <div className="relative z-10 w-full pointer-events-none">
        <AnimatedHeaderSection
          title={
            <span>
              Hi, I'm <span className="text-[#915EFF]">Unnati Gaur</span>
            </span>
          }
          text={text}
          textColor={"text-black"}
        />
      </div>
    </section>
  );
};

useGLTF.preload("/models/model.glb");

export default Hero;
