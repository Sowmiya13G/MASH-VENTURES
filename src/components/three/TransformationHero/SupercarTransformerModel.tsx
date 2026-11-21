"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SupercarTransformerProps {
  progress: number; // 0.0 = Muscle Car Coupe, 1.0 = Humanoid Mecha Guardian
  overclock?: boolean;
}

// Frame-rate independent exponential damping helper
function damp(current: number, target: number, lambda: number, delta: number): number {
  return current + (target - current) * (1 - Math.exp(-lambda * delta));
}

export function SupercarTransformerModel({ progress, overclock = false }: SupercarTransformerProps) {
  const rootGroup = useRef<THREE.Group>(null);
  const headGroup = useRef<THREE.Group>(null);
  const chestGrilleGroup = useRef<THREE.Group>(null);
  const doorWingLeft = useRef<THREE.Group>(null);
  const doorWingRight = useRef<THREE.Group>(null);
  const armLeftGroup = useRef<THREE.Group>(null);
  const armRightGroup = useRef<THREE.Group>(null);
  const legLeftGroup = useRef<THREE.Group>(null);
  const legRightGroup = useRef<THREE.Group>(null);
  const wheelFL = useRef<THREE.Group>(null);
  const wheelFR = useRef<THREE.Group>(null);
  const wheelRL = useRef<THREE.Group>(null);
  const wheelRR = useRef<THREE.Group>(null);
  const cabinRoof = useRef<THREE.Group>(null);
  const spineGroup = useRef<THREE.Group>(null);
  const leftHaloLight = useRef<THREE.Mesh>(null);
  const rightHaloLight = useRef<THREE.Mesh>(null);

  // Smooth internal spring value
  const animProgress = useRef(progress);

  useFrame((state, rawDelta) => {
    // Delta clamping to 50ms ensures smooth motion and prevents catch-up leaps on tab switch
    const delta = Math.min(rawDelta, 0.05);

    animProgress.current = damp(animProgress.current, progress, 5.2, delta);
    const p = animProgress.current; // 0.0 = Car, 1.0 = Robot
    const t = state.clock.getElapsedTime();

    // 1. Root group elevation and posture
    if (rootGroup.current) {
      // Car rests at y = -0.42; Robot stands at y = 0.24
      const targetY = THREE.MathUtils.lerp(-0.42, 0.24, p);
      // Robot idle breathing oscillation (only active as robot forms)
      const breathing = Math.sin(t * 1.8) * 0.04 * p;
      rootGroup.current.position.y = damp(rootGroup.current.position.y, targetY + breathing, 6.0, delta);

      // Car subtle V8 rumble when in vehicle mode
      if (p < 0.2) {
        rootGroup.current.position.y += Math.sin(t * 16.0) * 0.002 * (1 - p * 5);
      }
    }

    // 2. Front Grille & Dual Halo Headlights (Car front -> Robot Chest Pectorals)
    if (chestGrilleGroup.current) {
      // In car: sits forward at z = 1.35, y = 0.15, rotation.x = 0
      // In robot: elevates to chest at z = 0.35, y = 0.95, rotation.x = -0.15
      const grilleZ = THREE.MathUtils.lerp(1.35, 0.35, p);
      const grilleY = THREE.MathUtils.lerp(0.15, 0.95, p);
      const grillePitch = THREE.MathUtils.lerp(0, -0.16, p);

      chestGrilleGroup.current.position.z = damp(chestGrilleGroup.current.position.z, grilleZ, 5.5, delta);
      chestGrilleGroup.current.position.y = damp(chestGrilleGroup.current.position.y, grilleY, 5.5, delta);
      chestGrilleGroup.current.rotation.x = damp(chestGrilleGroup.current.rotation.x, grillePitch, 5.5, delta);
    }

    // 3. Iconic Door Wings (Car sides -> High Back Wings behind shoulders, from reference sheet)
    if (doorWingLeft.current && doorWingRight.current) {
      // Left door: car side (x = -0.88, y = 0.35, z = -0.1, rot.y = 0, rot.z = 0)
      // Robot back wing: swings up and back (x = -0.68, y = 1.25, z = -0.45, rot.y = -0.42, rot.z = -0.55)
      const wingX = THREE.MathUtils.lerp(0.88, 0.68, p);
      const wingY = THREE.MathUtils.lerp(0.35, 1.25, p);
      const wingZ = THREE.MathUtils.lerp(-0.1, -0.45, p);
      const wingRotY = THREE.MathUtils.lerp(0, 0.42, p);
      const wingRotZ = THREE.MathUtils.lerp(0, 0.55, p);

      doorWingLeft.current.position.x = damp(doorWingLeft.current.position.x, -wingX, 5.0, delta);
      doorWingLeft.current.position.y = damp(doorWingLeft.current.position.y, wingY, 5.0, delta);
      doorWingLeft.current.position.z = damp(doorWingLeft.current.position.z, wingZ, 5.0, delta);
      doorWingLeft.current.rotation.y = damp(doorWingLeft.current.rotation.y, -wingRotY, 5.0, delta);
      doorWingLeft.current.rotation.z = damp(doorWingLeft.current.rotation.z, -wingRotZ, 5.0, delta);

      doorWingRight.current.position.x = damp(doorWingRight.current.position.x, wingX, 5.0, delta);
      doorWingRight.current.position.y = damp(doorWingRight.current.position.y, wingY, 5.0, delta);
      doorWingRight.current.position.z = damp(doorWingRight.current.position.z, wingZ, 5.0, delta);
      doorWingRight.current.rotation.y = damp(doorWingRight.current.rotation.y, wingRotY, 5.0, delta);
      doorWingRight.current.rotation.z = damp(doorWingRight.current.rotation.z, wingRotZ, 5.0, delta);
    }

    // 4. Head Emergence & Magnetic LookAt
    if (headGroup.current) {
      // In car: recessed under hood at y = 0.15
      // In robot: extends up between chest and door wings to y = 1.62
      const headY = THREE.MathUtils.lerp(0.15, 1.62, p);
      const headScale = THREE.MathUtils.lerp(0.01, 1.0, Math.min(1.0, p * 1.35));
      headGroup.current.position.y = damp(headGroup.current.position.y, headY, 6.0, delta);
      headGroup.current.scale.setScalar(damp(headGroup.current.scale.x, headScale, 6.0, delta));

      // Real-time cursor tracking when in robot mode
      if (p > 0.4) {
        const mouse = state.pointer;
        const targetRotY = mouse.x * 0.46 * p;
        const targetRotX = -mouse.y * 0.26 * p;
        headGroup.current.rotation.y = damp(headGroup.current.rotation.y, targetRotY, 6.0, delta);
        headGroup.current.rotation.x = damp(headGroup.current.rotation.x, targetRotX, 6.0, delta);
      } else {
        headGroup.current.rotation.y = damp(headGroup.current.rotation.y, 0, 8.0, delta);
        headGroup.current.rotation.x = damp(headGroup.current.rotation.x, 0, 8.0, delta);
      }
    }

    // 5. Rounded Muscle Mecha Shoulders & Arms
    if (armLeftGroup.current && armRightGroup.current) {
      const armX = THREE.MathUtils.lerp(0.92, 1.28, p);
      const armY = THREE.MathUtils.lerp(0.32, 0.88, p);
      const armZ = THREE.MathUtils.lerp(-0.1, 0.05, p);
      const armRoll = THREE.MathUtils.lerp(0, 0.22, p);

      armLeftGroup.current.position.x = damp(armLeftGroup.current.position.x, -armX, 5.0, delta);
      armLeftGroup.current.position.y = damp(armLeftGroup.current.position.y, armY, 5.0, delta);
      armLeftGroup.current.position.z = damp(armLeftGroup.current.position.z, armZ, 5.0, delta);
      armLeftGroup.current.rotation.z = damp(armLeftGroup.current.rotation.z, armRoll, 5.0, delta);

      armRightGroup.current.position.x = damp(armRightGroup.current.position.x, armX, 5.0, delta);
      armRightGroup.current.position.y = damp(armRightGroup.current.position.y, armY, 5.0, delta);
      armRightGroup.current.position.z = damp(armRightGroup.current.position.z, armZ, 5.0, delta);
      armRightGroup.current.rotation.z = damp(armRightGroup.current.rotation.z, -armRoll, 5.0, delta);
    }

    // 6. Sculpted Thighs, Knees & Calves
    if (legLeftGroup.current && legRightGroup.current) {
      const legY = THREE.MathUtils.lerp(-0.12, -0.86, p);
      const legSpread = THREE.MathUtils.lerp(0.52, 0.64, p);
      const legZ = THREE.MathUtils.lerp(-0.35, 0.1, p);

      legLeftGroup.current.position.y = damp(legLeftGroup.current.position.y, legY, 5.5, delta);
      legLeftGroup.current.position.x = damp(legLeftGroup.current.position.x, -legSpread, 5.5, delta);
      legLeftGroup.current.position.z = damp(legLeftGroup.current.position.z, legZ, 5.5, delta);

      legRightGroup.current.position.y = damp(legRightGroup.current.position.y, legY, 5.5, delta);
      legRightGroup.current.position.x = damp(legRightGroup.current.position.x, legSpread, 5.5, delta);
      legRightGroup.current.position.z = damp(legRightGroup.current.position.z, legZ, 5.5, delta);
    }

    // 7. FRONT WHEELS -> Upper Back Scapula (Exact match to turnaround back view!)
    if (wheelFL.current && wheelFR.current) {
      // In car: front ground (z = 1.15, y = 0.05, x = -0.86)
      // In robot: folds onto upper back scapula (z = -0.38, y = 1.05, x = -0.38)
      const frontWheelZ = THREE.MathUtils.lerp(1.15, -0.38, p);
      const frontWheelY = THREE.MathUtils.lerp(0.05, 1.05, p);
      const frontWheelX = THREE.MathUtils.lerp(0.86, 0.38, p);
      const frontWheelRotY = THREE.MathUtils.lerp(0, Math.PI / 2, p);

      wheelFL.current.position.z = damp(wheelFL.current.position.z, frontWheelZ, 5.2, delta);
      wheelFL.current.position.y = damp(wheelFL.current.position.y, frontWheelY, 5.2, delta);
      wheelFL.current.position.x = damp(wheelFL.current.position.x, -frontWheelX, 5.2, delta);
      wheelFL.current.rotation.y = damp(wheelFL.current.rotation.y, frontWheelRotY, 5.2, delta);

      wheelFR.current.position.z = damp(wheelFR.current.position.z, frontWheelZ, 5.2, delta);
      wheelFR.current.position.y = damp(wheelFR.current.position.y, frontWheelY, 5.2, delta);
      wheelFR.current.position.x = damp(wheelFR.current.position.x, frontWheelX, 5.2, delta);
      wheelFR.current.rotation.y = damp(wheelFR.current.rotation.y, -frontWheelRotY, 5.2, delta);
    }

    // 8. REAR WHEELS -> Ankle / Heel Stabilizers (Exact match to turnaround reference!)
    if (wheelRL.current && wheelRR.current) {
      // In car: rear ground (z = -1.18, y = 0.05, x = -0.88)
      // In robot: outer ankle of foot (z = -0.12, y = -0.82, x = -0.74)
      const rearWheelZ = THREE.MathUtils.lerp(-1.18, -0.12, p);
      const rearWheelY = THREE.MathUtils.lerp(0.05, -0.82, p);
      const rearWheelX = THREE.MathUtils.lerp(0.88, 0.74, p);

      wheelRL.current.position.z = damp(wheelRL.current.position.z, rearWheelZ, 5.2, delta);
      wheelRL.current.position.y = damp(wheelRL.current.position.y, rearWheelY, 5.2, delta);
      wheelRL.current.position.x = damp(wheelRL.current.position.x, -rearWheelX, 5.2, delta);

      wheelRR.current.position.z = damp(wheelRR.current.position.z, rearWheelZ, 5.2, delta);
      wheelRR.current.position.y = damp(wheelRR.current.position.y, rearWheelY, 5.2, delta);
      wheelRR.current.position.x = damp(wheelRR.current.position.x, rearWheelX, 5.2, delta);
    }

    // 9. Cabin Roof & Fastback Quarter Panels (Folds into torso core)
    if (cabinRoof.current) {
      const roofScale = THREE.MathUtils.lerp(1.0, 0.65, p);
      const roofZ = THREE.MathUtils.lerp(-0.15, -0.1, p);
      cabinRoof.current.scale.setScalar(damp(cabinRoof.current.scale.x, roofScale, 5.0, delta));
      cabinRoof.current.position.z = damp(cabinRoof.current.position.z, roofZ, 5.0, delta);
    }

    // 10. Spine & Copper Hydraulics Visibility
    if (spineGroup.current) {
      const spineOpacity = THREE.MathUtils.lerp(0.1, 1.0, p);
      spineGroup.current.scale.setScalar(spineOpacity);
    }

    // 11. Dual Halo Headlights Glow Intensity
    if (leftHaloLight.current && rightHaloLight.current) {
      const pulse = 1.0 + Math.sin(t * 3.0) * 0.25 + (overclock ? 1.5 : 0);
      const mat = leftHaloLight.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.emissiveIntensity = 2.2 * pulse;
      }
    }
  });

  // Materials & Shaders
  // Deep Golden-Yellow Metallic Lacquer (matching reference car & robot armor)
  const muscleYellowMat = (
    <meshStandardMaterial
      color="#e5a00d"
      metalness={0.86}
      roughness={0.22}
      envMapIntensity={1.8}
    />
  );

  // Matte Carbon Black (matching hood scoop, car stripes, and robot under-chassis)
  const matteCarbonMat = (
    <meshStandardMaterial
      color="#181a1f"
      metalness={0.65}
      roughness={0.38}
    />
  );

  // Titanium Silver & Polished Alloys (matching wheels, pistons, joints)
  const titaniumMat = (
    <meshStandardMaterial
      color="#c0c6cf"
      metalness={0.94}
      roughness={0.16}
    />
  );

  // Copper Hydraulic Tubes & Spine Conduits (visible on robot back view in reference sheet)
  const copperHydraulicMat = (
    <meshStandardMaterial
      color="#b4643c"
      metalness={0.88}
      roughness={0.28}
    />
  );

  // Glowing Electric Blue Halo LED Headlights & Optic Visor (matching reference)
  const electricBlueGlowMat = (
    <meshStandardMaterial
      color="#00e5ff"
      emissive="#00e5ff"
      emissiveIntensity={overclock ? 3.5 : 2.4}
      metalness={0.8}
      roughness={0.1}
    />
  );

  // Low Profile Rubber Tires
  const tireMat = (
    <meshStandardMaterial
      color="#0d0e12"
      roughness={0.82}
      metalness={0.1}
    />
  );

  return (
    <group ref={rootGroup}>
      {/* 1. FRONT BUMPER, GRILLE & CHEST PECTORALS */}
      <group ref={chestGrilleGroup} position={[0, 0.15, 1.35]}>
        {/* Muscle Car Front Bumper / Robot Chest Plate */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.58, 0.44, 0.65]} />
          {muscleYellowMat}
        </mesh>

        {/* Recessed Honeycomb Grille Center */}
        <mesh position={[0, 0, 0.32]}>
          <boxGeometry args={[1.42, 0.28, 0.08]} />
          {matteCarbonMat}
        </mesh>

        {/* Lower Front Splitter Chin */}
        <mesh position={[0, -0.22, 0.18]}>
          <boxGeometry args={[1.62, 0.08, 0.52]} />
          {matteCarbonMat}
        </mesh>

        {/* Dual Circular Blue Halo LED Headlights (Left) */}
        <mesh ref={leftHaloLight} position={[-0.48, 0.04, 0.35]}>
          <torusGeometry args={[0.08, 0.02, 16, 32]} />
          {electricBlueGlowMat}
        </mesh>
        <mesh position={[-0.62, 0.04, 0.35]}>
          <torusGeometry args={[0.08, 0.02, 16, 32]} />
          {electricBlueGlowMat}
        </mesh>

        {/* Dual Circular Blue Halo LED Headlights (Right) */}
        <mesh ref={rightHaloLight} position={[0.48, 0.04, 0.35]}>
          <torusGeometry args={[0.08, 0.02, 16, 32]} />
          {electricBlueGlowMat}
        </mesh>
        <mesh position={[0.62, 0.04, 0.35]}>
          <torusGeometry args={[0.08, 0.02, 16, 32]} />
          {electricBlueGlowMat}
        </mesh>
      </group>

      {/* 2. HOOD SCOOP & ENGINE COMPARTMENT */}
      <group position={[0, 0.38, 0.6]}>
        {/* Sculpted Golden Muscle Hood */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.52, 0.18, 1.2]} />
          {muscleYellowMat}
        </mesh>
        {/* Matte Black Center Cowl / Induction Scoop */}
        <mesh position={[0, 0.1, 0.05]}>
          <boxGeometry args={[0.82, 0.12, 0.9]} />
          {matteCarbonMat}
        </mesh>
      </group>

      {/* 3. ICONIC DOOR WINGS (Back Wings behind shoulders, from reference sheet) */}
      {/* Left Door Wing */}
      <group ref={doorWingLeft} position={[-0.88, 0.35, -0.1]}>
        <mesh position={[-0.05, 0.1, 0]}>
          <boxGeometry args={[0.16, 0.52, 1.05]} />
          {muscleYellowMat}
        </mesh>
        {/* Black window frame & door accent stripe */}
        <mesh position={[-0.12, 0.22, 0]}>
          <boxGeometry args={[0.06, 0.3, 0.9]} />
          {matteCarbonMat}
        </mesh>
      </group>

      {/* Right Door Wing */}
      <group ref={doorWingRight} position={[0.88, 0.35, -0.1]}>
        <mesh position={[0.05, 0.1, 0]}>
          <boxGeometry args={[0.16, 0.52, 1.05]} />
          {muscleYellowMat}
        </mesh>
        {/* Black window frame & door accent stripe */}
        <mesh position={[0.12, 0.22, 0]}>
          <boxGeometry args={[0.06, 0.3, 0.9]} />
          {matteCarbonMat}
        </mesh>
      </group>

      {/* 4. CABIN ROOF & REAR FASTBACK BODY */}
      <group ref={cabinRoof} position={[0, 0.65, -0.35]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.32, 0.44, 1.45]} />
          {muscleYellowMat}
        </mesh>
        {/* Tinted fastback glass */}
        <mesh position={[0, 0.15, -0.1]}>
          <boxGeometry args={[1.15, 0.26, 1.1]} />
          {matteCarbonMat}
        </mesh>
      </group>

      {/* 5. ROBOT HEAD & BLUE OPTIC VISORS (From turnaround reference) */}
      <group ref={headGroup} position={[0, 0.2, 0.15]}>
        {/* Rounded Golden Helmet with Center Black Stripe */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.28, 24, 24]} />
          {muscleYellowMat}
        </mesh>
        {/* Matte Black Forehead Shield & Crest */}
        <mesh position={[0, 0.14, 0.12]}>
          <boxGeometry args={[0.22, 0.2, 0.28]} />
          {matteCarbonMat}
        </mesh>
        {/* Glowing Electric Blue Slit Optics (Matching reference faceplate) */}
        <mesh position={[-0.08, 0.02, 0.26]}>
          <boxGeometry args={[0.1, 0.035, 0.04]} />
          {electricBlueGlowMat}
        </mesh>
        <mesh position={[0.08, 0.02, 0.26]}>
          <boxGeometry args={[0.1, 0.035, 0.04]} />
          {electricBlueGlowMat}
        </mesh>
        {/* Angular Titanium Mouthguard */}
        <mesh position={[0, -0.12, 0.22]}>
          <boxGeometry args={[0.18, 0.12, 0.14]} />
          {titaniumMat}
        </mesh>
      </group>

      {/* 6. EXPOSED MECHANICAL SPINE & COPPER HYDRAULICS (Turnaround Back View) */}
      <group ref={spineGroup} position={[0, 0.72, -0.28]}>
        {/* Central Segmented Titanium Spine */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.16, 1.1, 16]} />
          {titaniumMat}
        </mesh>
        {/* Flanking Copper Hydraulic Lines (Reference sheet back view feature) */}
        <mesh position={[-0.14, 0, 0.04]}>
          <cylinderGeometry args={[0.03, 0.03, 0.95, 8]} />
          {copperHydraulicMat}
        </mesh>
        <mesh position={[0.14, 0, 0.04]}>
          <cylinderGeometry args={[0.03, 0.03, 0.95, 8]} />
          {copperHydraulicMat}
        </mesh>
        <mesh position={[-0.22, -0.1, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.8, 8]} />
          {copperHydraulicMat}
        </mesh>
        <mesh position={[0.22, -0.1, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.8, 8]} />
          {copperHydraulicMat}
        </mesh>
      </group>

      {/* 7. MUSCLE MECHA ARMS & FOREARM GAUNTLETS */}
      {/* Left Arm */}
      <group ref={armLeftGroup} position={[-0.92, 0.32, -0.1]}>
        {/* Rounded Golden Shoulder Cap */}
        <mesh position={[0, 0.22, 0]}>
          <boxGeometry args={[0.42, 0.36, 0.46]} />
          {muscleYellowMat}
        </mesh>
        {/* Titanium Bicep Actuator */}
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[0.11, 0.13, 0.42, 16]} />
          {titaniumMat}
        </mesh>
        {/* Sculpted Golden Forearm Gauntlet */}
        <mesh position={[-0.04, -0.48, 0.06]}>
          <boxGeometry args={[0.34, 0.54, 0.38]} />
          {muscleYellowMat}
        </mesh>
        {/* Matte Black Elbow Guard */}
        <mesh position={[-0.04, -0.3, -0.14]}>
          <boxGeometry args={[0.24, 0.18, 0.14]} />
          {matteCarbonMat}
        </mesh>
        {/* Articulated Hand & Fingers */}
        <mesh position={[-0.04, -0.82, 0.1]}>
          <boxGeometry args={[0.22, 0.2, 0.24]} />
          {titaniumMat}
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={armRightGroup} position={[0.92, 0.32, -0.1]}>
        {/* Rounded Golden Shoulder Cap */}
        <mesh position={[0, 0.22, 0]}>
          <boxGeometry args={[0.42, 0.36, 0.46]} />
          {muscleYellowMat}
        </mesh>
        {/* Titanium Bicep Actuator */}
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[0.11, 0.13, 0.42, 16]} />
          {titaniumMat}
        </mesh>
        {/* Sculpted Golden Forearm Gauntlet */}
        <mesh position={[0.04, -0.48, 0.06]}>
          <boxGeometry args={[0.34, 0.54, 0.38]} />
          {muscleYellowMat}
        </mesh>
        {/* Matte Black Elbow Guard */}
        <mesh position={[0.04, -0.3, -0.14]}>
          <boxGeometry args={[0.24, 0.18, 0.14]} />
          {matteCarbonMat}
        </mesh>
        {/* Articulated Hand & Fingers */}
        <mesh position={[0.04, -0.82, 0.1]}>
          <boxGeometry args={[0.22, 0.2, 0.24]} />
          {titaniumMat}
        </mesh>
      </group>

      {/* 8. SCULPTED THIGHS, KNEES & CALF ARMOR */}
      {/* Left Leg */}
      <group ref={legLeftGroup} position={[-0.52, -0.12, -0.35]}>
        {/* Golden Thigh Armor with Black Outer Stripe */}
        <mesh position={[0, -0.28, 0]}>
          <boxGeometry args={[0.42, 0.58, 0.46]} />
          {muscleYellowMat}
        </mesh>
        {/* Titanium Knee Hinge Pin */}
        <mesh position={[0, -0.62, 0.06]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.14, 0.14, 0.38, 16]} />
          {titaniumMat}
        </mesh>
        {/* Flared Golden Calf & Shin Armor (Reference sheet design) */}
        <mesh position={[0, -1.05, 0.02]}>
          <boxGeometry args={[0.46, 0.74, 0.52]} />
          {muscleYellowMat}
        </mesh>
        {/* Rear Copper Piston Cylinder */}
        <mesh position={[0, -0.95, -0.22]}>
          <cylinderGeometry args={[0.05, 0.05, 0.5, 8]} />
          {copperHydraulicMat}
        </mesh>
        {/* Heavy Mechanical Foot & Toe Cleat */}
        <mesh position={[0, -1.48, 0.18]}>
          <boxGeometry args={[0.48, 0.18, 0.82]} />
          {matteCarbonMat}
        </mesh>
        {/* Golden Toe Guard */}
        <mesh position={[0, -1.44, 0.42]}>
          <boxGeometry args={[0.34, 0.14, 0.24]} />
          {muscleYellowMat}
        </mesh>
      </group>

      {/* Right Leg */}
      <group ref={legRightGroup} position={[0.52, -0.12, -0.35]}>
        {/* Golden Thigh Armor with Black Outer Stripe */}
        <mesh position={[0, -0.28, 0]}>
          <boxGeometry args={[0.42, 0.58, 0.46]} />
          {muscleYellowMat}
        </mesh>
        {/* Titanium Knee Hinge Pin */}
        <mesh position={[0, -0.62, 0.06]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.14, 0.14, 0.38, 16]} />
          {titaniumMat}
        </mesh>
        {/* Flared Golden Calf & Shin Armor (Reference sheet design) */}
        <mesh position={[0, -1.05, 0.02]}>
          <boxGeometry args={[0.46, 0.74, 0.52]} />
          {muscleYellowMat}
        </mesh>
        {/* Rear Copper Piston Cylinder */}
        <mesh position={[0, -0.95, -0.22]}>
          <cylinderGeometry args={[0.05, 0.05, 0.5, 8]} />
          {copperHydraulicMat}
        </mesh>
        {/* Heavy Mechanical Foot & Toe Cleat */}
        <mesh position={[0, -1.48, 0.18]}>
          <boxGeometry args={[0.48, 0.18, 0.82]} />
          {matteCarbonMat}
        </mesh>
        {/* Golden Toe Guard */}
        <mesh position={[0, -1.44, 0.42]}>
          <boxGeometry args={[0.34, 0.14, 0.24]} />
          {muscleYellowMat}
        </mesh>
      </group>

      {/* 9. WHEELS WITH MULTI-SPOKE SILVER RIMS (Car Ground <-> Robot Scapula/Ankles) */}
      {/* Front Left Wheel (Mounts to Left Back Scapula in Robot Mode) */}
      <group ref={wheelFL} position={[-0.86, 0.05, 1.15]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.35, 0.35, 0.24, 28]} />
          {tireMat}
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.25, 0.25, 0.26, 16]} />
          {titaniumMat}
        </mesh>
      </group>

      {/* Front Right Wheel (Mounts to Right Back Scapula in Robot Mode) */}
      <group ref={wheelFR} position={[0.86, 0.05, 1.15]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.35, 0.35, 0.24, 28]} />
          {tireMat}
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.25, 0.25, 0.26, 16]} />
          {titaniumMat}
        </mesh>
      </group>

      {/* Rear Left Wheel (Mounts to Left Outer Ankle in Robot Mode) */}
      <group ref={wheelRL} position={[-0.88, 0.05, -1.18]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.36, 0.36, 0.26, 28]} />
          {tireMat}
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.26, 0.26, 0.28, 16]} />
          {titaniumMat}
        </mesh>
      </group>

      {/* Rear Right Wheel (Mounts to Right Outer Ankle in Robot Mode) */}
      <group ref={wheelRR} position={[0.88, 0.05, -1.18]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.36, 0.36, 0.26, 28]} />
          {tireMat}
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.26, 0.26, 0.28, 16]} />
          {titaniumMat}
        </mesh>
      </group>
    </group>
  );
}
