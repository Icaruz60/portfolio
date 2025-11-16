// === GlobeReal.tsx (inline in your page or as a component) ===
import { useRef, useMemo, useEffect, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, Text } from "@react-three/drei";
import {
  Color,
  CatmullRomCurve3,
  Vector3,
  Group,
  type Texture,
  CanvasTexture,
  Matrix4,
  Quaternion,
  MeshStandardMaterial,
  MeshBasicMaterial,
  type Mesh,
  MathUtils,
  type BufferGeometry,
  ConeGeometry,
  CylinderGeometry,
} from "three";

function lonLatToXYZ(
  lon: number,
  lat: number,
  r: number
): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return [
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  ];
}

const TAG_FADE_DURATION = 0.8;
const ARC_DRAW_DURATION = 2;
const PIN_SPEC = {
  headRadius: 0.03,
  headHighlightRadius: 0.018,
  shaftLength: 0.085,
  shaftRadius: 0.011,
  tipLength: 0.07,
  tipRadius: 0.009,
  collarHeight: 0.022,
};

export const GlobeReal: React.FC<{
  hops: { lat: number; lon: number; label: string }[];
  tags?: {
    lat: number;
    lon: number;
    title: string;
    label?: string;
    subtitle?: string;
    location?: string;
    offset?: number;
    side?: "left" | "right";
  }[];
  isActive?: boolean;
}> = ({ hops, tags, isActive = true }) => {
  const globeRef = useRef<Group | null>(null);
  const radius = 1.6;
  const animationTime = useRef(0);
  const arcMeshes = useRef<Array<{ core: Mesh | null; glow: Mesh | null }>>([]);
  const tagGroups = useRef<Array<Group | null>>([]);
  const pinTipGeometry = useMemo(() => {
    const geometry = new ConeGeometry(
      PIN_SPEC.tipRadius,
      PIN_SPEC.tipLength,
      32
    );
    geometry.rotateX(-Math.PI / 2);
    geometry.translate(0, 0, PIN_SPEC.tipLength / 2);
    return geometry;
  }, []);
  const pinShaftGeometry = useMemo(() => {
    const geometry = new CylinderGeometry(
      PIN_SPEC.shaftRadius,
      PIN_SPEC.shaftRadius * 0.94,
      PIN_SPEC.shaftLength,
      32
    );
    geometry.rotateX(-Math.PI / 2);
    geometry.translate(0, 0, PIN_SPEC.shaftLength / 2);
    return geometry;
  }, []);
  const pinCollarGeometry = useMemo(() => {
    const geometry = new CylinderGeometry(
      PIN_SPEC.headRadius * 0.95,
      PIN_SPEC.headRadius * 0.75,
      PIN_SPEC.collarHeight,
      32
    );
    geometry.rotateX(-Math.PI / 2);
    geometry.translate(0, 0, PIN_SPEC.collarHeight / 2);
    return geometry;
  }, []);

  const updateDrawRange = (mesh: Mesh | null, progress: number) => {
    if (!mesh) return;
    const geometry = mesh.geometry as BufferGeometry;
    const targetCount =
      geometry.index?.count ?? geometry.attributes.position?.count ?? 0;
    geometry.setDrawRange(0, Math.floor(targetCount * Math.min(progress, 1)));
    mesh.visible = progress > 0.001;
  };

  const [dayMap, lightsMap, cloudsMap, cloudsAlpha] = useTexture([
    "/textures/e_day.jpg",
    "/textures/e_lights.jpg",
    "/textures/e_clouds_color.jpg",
    "/textures/e_clouds_alpha.jpg",
  ]) as Texture[];

  const arcs = useMemo(() => {
    const curves: CatmullRomCurve3[] = [];
    for (let i = 0; i < hops.length - 1; i++) {
      const a = hops[i];
      const b = hops[i + 1];
      const start = lonLatToXYZ(a.lon, a.lat, radius);
      const end = lonLatToXYZ(b.lon, b.lat, radius);
      const mid = [
        (start[0] + end[0]) / 2,
        (start[1] + end[1]) / 2,
        (start[2] + end[2]) / 2,
      ];
      const m = Math.hypot(mid[0], mid[1], mid[2]);
      const lift = 0.5;
      const midLifted = [
        (mid[0] / m) * (radius + lift),
        (mid[1] / m) * (radius + lift),
        (mid[2] / m) * (radius + lift),
      ];
      const pts: Vector3[] = [];
      const steps = 64;
      for (let t = 0; t <= steps; t++) {
        const u = t / steps;
        const p0 = start,
          p1 = midLifted,
          p2 = end;
        const x =
          (1 - u) * (1 - u) * p0[0] + 2 * (1 - u) * u * p1[0] + u * u * p2[0];
        const y =
          (1 - u) * (1 - u) * p0[1] + 2 * (1 - u) * u * p1[1] + u * u * p2[1];
        const z =
          (1 - u) * (1 - u) * p0[2] + 2 * (1 - u) * u * p1[2] + u * u * p2[2];
        pts.push(new Vector3(x, y, z));
      }
      curves.push(new CatmullRomCurve3(pts));
    }
    return curves;
  }, [hops, radius]);

  const animationTimeline = useMemo(() => {
    const tagCount = tags?.length ?? 0;
    const arcCount = arcs.length;
    const tagStarts: number[] = [];
    const arcStarts: number[] = new Array(arcCount).fill(Infinity);
    let current = 0;
    for (let i = 0; i < tagCount; i++) {
      tagStarts[i] = current;
      current += TAG_FADE_DURATION;
      if (i < arcCount) {
        arcStarts[i] = current;
        current += ARC_DRAW_DURATION;
      }
    }
    for (let i = tagCount; i < arcCount; i++) {
      arcStarts[i] = current;
      current += ARC_DRAW_DURATION;
    }
    return { tagStarts, arcStarts, totalDuration: current };
  }, [tags?.length, arcs.length]);

  const invertedCloudsAlpha = useMemo(() => {
    if (typeof window === "undefined") return cloudsAlpha;
    const baseImage = cloudsAlpha?.image;
    if (!baseImage || typeof baseImage !== "object") return cloudsAlpha;
    if (!("width" in baseImage) || !("height" in baseImage)) return cloudsAlpha;
    const { width, height } = baseImage as HTMLImageElement | ImageBitmap;
    if (!width || !height) return cloudsAlpha;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return cloudsAlpha;
    ctx.drawImage(baseImage as CanvasImageSource, 0, 0);
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
    }
    ctx.putImageData(imageData, 0, 0);
    const tex = new CanvasTexture(canvas);
    tex.wrapS = cloudsAlpha.wrapS;
    tex.wrapT = cloudsAlpha.wrapT;
    tex.repeat.copy(cloudsAlpha.repeat);
    tex.offset.copy(cloudsAlpha.offset);
    tex.center.copy(cloudsAlpha.center);
    tex.flipY = cloudsAlpha.flipY;
    tex.needsUpdate = true;
    return tex;
  }, [cloudsAlpha, cloudsAlpha?.image]);

  useEffect(() => {
    return () => {
      if (invertedCloudsAlpha && invertedCloudsAlpha !== cloudsAlpha) {
        invertedCloudsAlpha.dispose();
      }
      pinTipGeometry.dispose();
      pinShaftGeometry.dispose();
      pinCollarGeometry.dispose();
    };
  }, [invertedCloudsAlpha, cloudsAlpha, pinTipGeometry, pinShaftGeometry, pinCollarGeometry]);

  const resetAnimationState = useCallback(() => {
    animationTime.current = 0;
    arcMeshes.current.forEach((entry) => {
      const resetMesh = (mesh: Mesh | null) => {
        if (!mesh) return;
        const geometry = mesh.geometry as BufferGeometry;
        geometry.setDrawRange(0, 0);
        mesh.visible = false;
        if ("material" in mesh && mesh.material) {
          const mat = mesh.material as MeshStandardMaterial | MeshBasicMaterial;
          if ("opacity" in mat) {
            mat.opacity = 0;
          }
          if ("emissiveIntensity" in mat) {
            (mat as MeshStandardMaterial).emissiveIntensity = 0;
          }
          mat.needsUpdate = true;
        }
      };
      resetMesh(entry?.core ?? null);
      resetMesh(entry?.glow ?? null);
    });
    tagGroups.current.forEach((group) => {
      if (!group) return;
      group.visible = false;
      group.scale.setScalar(0.8);
    });
  }, []);

  useEffect(() => {
    resetAnimationState();
  }, [arcs, tags, resetAnimationState]);

  const wasActive = useRef(isActive);

  useEffect(() => {
    if (isActive && !wasActive.current) {
      resetAnimationState();
    }
    wasActive.current = isActive;
  }, [isActive, resetAnimationState]);

  useFrame((_, dt) => {
    if (!isActive) return;
    if (globeRef.current) globeRef.current.rotation.y += dt * 0.04;
    const totalDuration = animationTimeline.totalDuration;
    if (totalDuration === 0) return;
    animationTime.current = Math.min(
      animationTime.current + dt,
      totalDuration + 0.5
    );
    const tagProgressValues = animationTimeline.tagStarts.map((start) =>
      MathUtils.clamp((animationTime.current - start) / TAG_FADE_DURATION, 0, 1)
    );
    const arcProgressValues = animationTimeline.arcStarts.map((start) =>
      MathUtils.clamp((animationTime.current - start) / ARC_DRAW_DURATION, 0, 1)
    );
    arcMeshes.current.forEach((entry, idx) => {
      const rawProgress = arcProgressValues[idx] ?? 0;
      const eased = MathUtils.smoothstep(rawProgress, 0, 1);
      const core = entry?.core;
      const glow = entry?.glow;
      updateDrawRange(core, rawProgress);
      updateDrawRange(glow, rawProgress);
      if (core && core.material instanceof MeshStandardMaterial) {
        core.material.opacity = 0.05 + 0.9 * eased;
        core.material.emissiveIntensity = 0.2 + 1.3 * eased;
        core.material.needsUpdate = true;
      }
      if (glow && glow.material instanceof MeshBasicMaterial) {
        glow.material.opacity = 0.02 + 0.25 * eased;
        glow.material.needsUpdate = true;
      }
    });
    tagGroups.current.forEach((group, idx) => {
      const progress = tagProgressValues[idx] ?? 0;
      const eased = MathUtils.smoothstep(progress, 0, 1);
      if (!group) return;
      group.visible = eased > 0.001;
      const scale = 0.8 + 0.2 * eased;
      group.scale.set(scale, scale, scale);
      group.traverse((child) => {
        const meshChild = child as Mesh & { material?: any };
        const material = meshChild.material;
        const applyOpacity = (mat: any) => {
          if (!mat || typeof mat.opacity !== "number") return;
          const base = mat.userData?.__baseOpacity ?? mat.opacity ?? 1;
          mat.userData = {
            ...mat.userData,
            __baseOpacity: base,
          };
          mat.opacity = base * eased;
          mat.transparent = true;
        };
        if (Array.isArray(material)) {
          material.forEach((mat) => applyOpacity(mat));
        } else if (material) {
          applyOpacity(material);
        }
      });
    });
  });

  const tagAnchors = useMemo(() => {
    if (!tags) return [];
    const up = new Vector3(0, 1, 0);
    return tags.map((stop) => {
      const surface = new Vector3(...lonLatToXYZ(stop.lon, stop.lat, radius));
      const normal = surface.clone().normalize();
      const elevated = surface.clone().addScaledVector(normal, 0.02);
      let tangent = new Vector3().crossVectors(up, normal);
      if (tangent.lengthSq() < 1e-6) tangent = new Vector3(1, 0, 0);
      tangent.normalize();
      const bitangent = normal.clone().cross(tangent).normalize();
      const orientation = new Matrix4().makeBasis(tangent, bitangent, normal);
      const quaternion = new Quaternion().setFromRotationMatrix(orientation);
      return {
        stop,
        position: elevated.toArray() as [number, number, number],
        quaternion,
      };
    });
  }, [tags, radius]);

  return (
    <group ref={globeRef}>
      {/* Earth */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[radius, 96, 96]} />
        <meshStandardMaterial
          map={dayMap}
          emissiveMap={lightsMap}
          emissiveIntensity={0.8}
          emissive={new Color("#ffffff")}
          roughness={0.85}
          metalness={0}
        />
      </mesh>

      {/* Cloud shell */}
      <mesh>
        <sphereGeometry args={[radius + 0.02, 96, 96]} />
        <meshStandardMaterial
          map={cloudsMap}
          alphaMap={invertedCloudsAlpha}
          color={new Color("#ffffff")}
          emissive={new Color("#ffffff")}
          emissiveIntensity={0.3}
          transparent
          opacity={0.35}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Arcs */}
      {arcs.map((curve, idx) => (
        <group key={idx}>
          <mesh
            visible={false}
            ref={(node) => {
              arcMeshes.current[idx] = arcMeshes.current[idx] ?? {
                core: null,
                glow: null,
              };
              arcMeshes.current[idx]!.core = node;
              if (node) {
                const geometry = node.geometry as BufferGeometry;
                geometry.setDrawRange(0, 0);
                node.visible = false;
              }
            }}
          >
            <tubeGeometry args={[curve, 128, 0.008, 24, false]} />
            <meshStandardMaterial
              color={"#58FF8A"}
              emissive={"#31D567"}
              emissiveIntensity={0.0}
              transparent
              opacity={0}
              roughness={0.25}
              metalness={0.55}
              toneMapped={false}
            />
          </mesh>
          <mesh
            visible={false}
            ref={(node) => {
              arcMeshes.current[idx] = arcMeshes.current[idx] ?? {
                core: null,
                glow: null,
              };
              arcMeshes.current[idx]!.glow = node;
              if (node) {
                const geometry = node.geometry as BufferGeometry;
                geometry.setDrawRange(0, 0);
                node.visible = false;
              }
            }}
          >
            <tubeGeometry args={[curve, 128, 0.02, 24, false]} />
            <meshBasicMaterial
              color={"#A9FCCA"}
              transparent
              opacity={0}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}

      {tagAnchors.map(({ stop, position, quaternion }, idx) => {
        const side = stop.side ?? (idx === 0 ? "right" : "left");
        const direction = side === "right" ? 1 : -1;
        const stackShift = (stop.offset ?? 0) * 0.25;
        const verticalShift = (stop.offset ?? 0) * 0.2;
        const lateralBase = 0.42;
        const cardScale = 0.165;
        const cardLateralOffset = direction * (lateralBase + stackShift);
        const cardNormalOffset =
          PIN_SPEC.tipLength +
          PIN_SPEC.shaftLength +
          PIN_SPEC.headRadius +
          cardScale * 0.25;
        const label = stop.label ?? stop.title;
        const pinColor = "#FF5C5C";
        const pinEmissive = "#C82A2A";
        const pinInset = 0.01;
        return (
          <group
            key={`${stop.title}-${idx}`}
            position={position}
            quaternion={quaternion}
            visible={false}
            ref={(node) => {
              tagGroups.current[idx] = node;
              if (node) {
                node.visible = false;
                node.scale.setScalar(0.8);
              }
            }}
          >
            <group position={[0, 0, -pinInset]}>
              <mesh geometry={pinTipGeometry}>
                <meshStandardMaterial
                  color="#EDEDED"
                  emissive="#A6A6A6"
                  emissiveIntensity={0.35}
                  metalness={0.65}
                  roughness={0.35}
                  toneMapped={false}
                />
              </mesh>
              <mesh
                geometry={pinShaftGeometry}
                position={[0, 0, PIN_SPEC.tipLength]}
              >
                <meshStandardMaterial
                  color="#D9D9D9"
                  emissive="#8F8F8F"
                  emissiveIntensity={0.3}
                  metalness={0.55}
                  roughness={0.4}
                  toneMapped={false}
                />
              </mesh>
              <mesh
                geometry={pinCollarGeometry}
                position={[
                  0,
                  0,
                  PIN_SPEC.tipLength + PIN_SPEC.shaftLength - PIN_SPEC.collarHeight * 0.2,
                ]}
              >
                <meshStandardMaterial
                  color={pinColor}
                  emissive={pinEmissive}
                  emissiveIntensity={0.65}
                  metalness={0.25}
                  roughness={0.3}
                  toneMapped={false}
                />
              </mesh>
              <mesh
                position={[
                  0,
                  0,
                  PIN_SPEC.tipLength + PIN_SPEC.shaftLength + PIN_SPEC.headRadius,
                ]}
              >
                <sphereGeometry args={[PIN_SPEC.headRadius, 32, 32]} />
                <meshStandardMaterial
                  color={pinColor}
                  emissive={pinEmissive}
                  emissiveIntensity={0.75}
                  metalness={0.25}
                  roughness={0.25}
                  toneMapped={false}
                />
              </mesh>
              <mesh
                position={[
                  0,
                  0,
                  PIN_SPEC.tipLength +
                    PIN_SPEC.shaftLength +
                    PIN_SPEC.headRadius +
                    0.006,
                ]}
              >
                <sphereGeometry
                  args={[PIN_SPEC.headHighlightRadius, 24, 24]}
                />
                <meshStandardMaterial
                  color="#FF9393"
                  emissive="#FFB3B3"
                  emissiveIntensity={0.4}
                  roughness={0.2}
                  metalness={0.1}
                  toneMapped={false}
                />
              </mesh>
            </group>
            <group
              position={[cardLateralOffset, verticalShift, cardNormalOffset]}
              scale={cardScale}
            >
              <mesh position={[0, 0, -0.01]} renderOrder={-1}>
                <planeGeometry args={[4.0, 2.0]} />
                <meshStandardMaterial
                  color="#1a1a1a"
                  transparent
                  opacity={0.45}
                  roughness={1}
                  metalness={0}
                  toneMapped={false}
                />
              </mesh>
              <mesh position={[0, 0, -0.005]}>
                <planeGeometry args={[3.6, 1.8]} />
                <meshStandardMaterial
                  color="#050505"
                  emissive="#101010"
                  emissiveIntensity={0.35}
                  roughness={0.6}
                  metalness={0.25}
                  transparent
                  opacity={0.9}
                />
              </mesh>
              <mesh position={[-1.65, 0.55, 0]}>
                <sphereGeometry args={[0.09, 16, 16]} />
                <meshStandardMaterial
                  color="#FF5C5C"
                  emissive="#C52E2E"
                  emissiveIntensity={0.8}
                  toneMapped={false}
                />
              </mesh>
              <Text
                position={[-1.35, 0.6, 0]}
                fontSize={0.32}
                color="#FFC76A"
                anchorX="left"
                anchorY="middle"
                maxWidth={3.0}
                lineHeight={1.15}
                letterSpacing={0.03}
              >
                {label}
              </Text>
              {stop.subtitle ? (
                <Text
                  position={[-1.35, 0.15, 0]}
                  fontSize={0.26}
                  color="#F6F6F6"
                  anchorX="left"
                  anchorY="middle"
                  maxWidth={3.0}
                  lineHeight={1.25}
                  letterSpacing={0.015}
                >
                  {stop.subtitle}
                </Text>
              ) : null}
              {stop.location ? (
                <Text
                  position={[-1.35, -0.35, 0]}
                  fontSize={0.26}
                  color="#9CD7FF"
                  anchorX="left"
                  anchorY="middle"
                  maxWidth={3.0}
                  lineHeight={1.25}
                  letterSpacing={0.02}
                >
                  {stop.location}
                </Text>
              ) : null}
            </group>
          </group>
        );
      })}
    </group>
  );
};
