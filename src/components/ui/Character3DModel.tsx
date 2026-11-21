"use client";

import type { Character } from "@/data/characters";
import RobotCharacterWrapper from "@/components/three/Characters/RobotCharacterWrapper";

interface Character3DModelProps {
  character: Character;
  interactive?: boolean;
}

export default function Character3DModel({ character }: Character3DModelProps) {
  return <RobotCharacterWrapper slug={character.slug} />;
}
