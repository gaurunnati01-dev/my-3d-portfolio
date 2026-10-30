import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Float,
  Lightformer,
  OrbitControls,
  useGLTF,
  Html,
} from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { name } from "../constants";

const Model = () => {
  const { scene } = useGLTF("/models/model.glb");
  return <primitive object={scene} scale={2.0} position={[0, -0.5, 0]} />;
};

const LoadingPrompt = () => (
  <Html center>
    <div className="flex items-center justify-center px-4 py-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/20">
      <p className="text-xs font-mono tracking-widest text-white uppercase animate-pulse">
        Loading 3D Model...
      </p>
    </div>
  </Html>
);

const Hero = () => {
  // Mobile device detection for performance optimization
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const text = `I help growing brands and startups gain an
unfair advantage through premium
results driven webs/apps`;

  return (
    <section id="home" className="flex flex-col justify-end min-h-screen">
      <AnimatedHeaderSection
        subTitle={"404 No Bugs Found"}
        title={name || "Unnati Gaur"}
        text={text}
        textColor={"text-black"}
      />
      <figure
        className="absolute inset-0 -z-50"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas
          shadows
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
        >
          <ambientLight intensity={0.5} />
          <OrbitControls enableZoom={false} />
          <Suspense fallback={<LoadingPrompt />}>
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
    </section>
  );
};

useGLTF.preload("/models/model.glb");

export default Hero;
