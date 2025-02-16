import { useRef, useEffect, useMemo } from 'react';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Plant component with loading and error handling
function Plant({ position, modelPath, scale = 1, rotation = 0 }) {
  const { scene } = useGLTF(modelPath);

  return (
    <primitive
      object={scene}
      position={position}
      scale={scale}
      rotation={[0, rotation, 0]}
    />
  );
}

// Ground tile component with instancing for better performance
function Ground() {
  const { scene } = useGLTF('/src/assets/dirt/ground.glb');
  const tileSize = 1.5; // Halved tile size
  const gridSize = 100; // Doubled grid size for more tiles
  const offset = (gridSize * tileSize) / 2;

  // Create instances data
  const instances = useMemo(() => {
    const temp = [];
    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        // Random rotation in 90-degree increments (0, 90, 180, or 270 degrees)
        const rotationIndex = Math.floor(Math.random() * 4);
        const rotation = (rotationIndex * Math.PI) / 2;

        temp.push({
          position: [
            x * tileSize - offset,
            0,
            z * tileSize - offset
          ],
          rotation: [0, rotation, 0],
          scale: 1.5 // Halved scale to match new tile size
        });
      }
    }
    return temp;
  }, []);

  // Clone the soil model for each instance
  return instances.map((instance, index) => (
    <primitive
      key={`soil-${index}`}
      object={scene.clone()}
      position={instance.position}
      rotation={instance.rotation}
      scale={instance.scale}
    />
  ));
}

export function Scene() {
  const sceneRef = useRef();
  const controlsRef = useRef();

  // Rotate scene
  useFrame((state, delta) => {
    if (sceneRef.current) {
      sceneRef.current.rotation.y += delta * 0.1;
    }
  });

  // Set initial camera position
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.object.position.set(20, 8, 20);
      controlsRef.current.target.set(0, 2, 0); // Look at a point slightly above ground
      controlsRef.current.update();
    }
  }, []);

  // Define all available plant models
  const plantModels = [
    {
      path: '/src/assets/plants/Bush.glb',
      scale: 15.0,
      yOffset: 1.0
    },
    {
      path: '/src/assets/plants/Desert marigold.glb',
      scale: 0.3,
      yOffset: 0
    },
    {
      path: '/src/assets/plants/Fern.glb',
      scale: 0.8,
      yOffset: 0.7
    },
    {
      path: '/src/assets/plants/Mushroom.glb',
      scale: 0.08,
      yOffset: 0
    },
    {
      path: '/src/assets/plants/Pastel Plume Flowers.glb',
      scale: 0.9,
      yOffset: 1
    },
    {
      path: '/src/assets/plants/Pine Tree.glb',
      scale: 2.5,
      yOffset: 4.4
    },
    {
      path: '/src/assets/plants/Tree-2.glb',
      scale: 2.5,
      yOffset: 4.25
    },
    {
      path: '/src/assets/plants/tulip 3.glb',
      scale: 1.4,
      yOffset: 0.85
    }
  ];

  // Calculate positions in a circle
  const radius = 16; // Increased radius to match new ground scale
  const plants = plantModels.map((model, index) => {
    const angle = (index / plantModels.length) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    return {
      ...model,
      position: [x, model.yOffset, z],
      rotation: -angle + Math.PI // Make plants face outward
    };
  });

  // Preload all models
  plantModels.forEach(model => useGLTF.preload(model.path));
  useGLTF.preload('/src/assets/dirt/Fertile Soil.glb');

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        minPolarAngle={Math.PI / 6} // Minimum 30 degrees from horizontal
        maxPolarAngle={Math.PI / 2.1}
        enableZoom={true}
        enablePan={true}
        minDistance={15}
        maxDistance={50}
        maxAzimuthAngle={Infinity}
        minAzimuthAngle={-Infinity}
      />

      {/* Scene container for rotation */}
      <group ref={sceneRef}>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} />
        <hemisphereLight intensity={0.3} />

        {/* Ground */}
        <Ground />

        {/* Plants */}
        {plants.map((plant, index) => (
          <Plant
            key={index}
            position={plant.position}
            modelPath={plant.path}
            scale={plant.scale}
            rotation={plant.rotation}
          />
        ))}
      </group>
    </>
  );
}

// Preload all models to prevent loading flicker
useGLTF.preload([
  '/src/assets/plants/Bush.glb',
  '/src/assets/plants/Desert marigold.glb',
  '/src/assets/plants/Fern.glb',
  '/src/assets/plants/Mushroom.glb',
  '/src/assets/plants/Pastel Plume Flowers.glb',
  '/src/assets/plants/Pine Tree.glb',
  '/src/assets/plants/Tree-2.glb',
  '/src/assets/plants/tulip 3.glb',
  '/src/assets/dirt/Fertile Soil.glb'
]);
