import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Float,
  Lightformer,
  OrbitControls,
  useGLTF,
  Html,
  Preload,
} from "@react-three/drei";
import { useMediaQuery } from "react-responsive";

const Model = ({ isMobile }) => {
  const { scene } = useGLTF("/models/model.glb");
  return (
    <primitive
      object={scene}
      scale={isMobile ? 1.1 : 1.4}
      position={isMobile ? [0, -0.8, 0] : [1.6, -0.6, 0]}
      rotation={[0, -0.3, 0]}
    />
  );
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
  // Mobile device detection for layout & performance optimization
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const text = `I help growing brands and startups gain an
unfair advantage through premium
results driven webs/apps`;

  return (
    <section id="home" className="relative flex flex-col justify-between min-h-screen bg-black">
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen px-6 sm:px-10 pt-28 pb-12 pointer-events-none">
        <div>
          <p className="text-xs sm:text-sm font-light tracking-[0.5rem] uppercase text-white/70">
            404 No Bugs Found
          </p>
          <h1 className="font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2">
            Hi, I'm <span className="text-[#915EFF]">Unnati Gaur</span>
          </h1>
          <p className="mt-4 text-sm sm:text-lg text-white/70 font-light max-w-lg uppercase whitespace-pre-line">
            {text}
          </p>
        </div>
      </div>

      {/* 3D Canvas Background */}
      <figure
        className="absolute inset-0 z-0"
        style={{ width: "100%", height: "100%" }}
      >
        <Canvas
          shadows
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          camera={{ position: [0, 0, 6], fov: 45 }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
          />
          <Suspense fallback={<LoadingPrompt />}>
            <Float speed={0.5}>
              <Model isMobile={isMobile} />
            </Float>
            <Preload all />
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
