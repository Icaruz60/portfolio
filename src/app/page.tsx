"use client";

import React, { useRef, Suspense, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import { GlobeReal } from "./Globereal";
import {
  Github,
  Linkedin,
  Mail,
  Globe,
  MapPin,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { Vector3 } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

/**
 * Gerrit Visser — Synthwave Portfolio (v2)
 * - Unified dusk/sunset theme
 * - Realistic 3D globe with study hops
 * - Flight-style ticker
 * - Projects with hover zoom and optional live iframes
 *
 */

// ---------- THEME ----------
const THEME = {
  page: "bg-[#030303] text-[#f5f5f5]",
  panel: "bg-[#0b0b0b]",
  stroke: "border border-white/10",
  accent: "#58FF8A",
  accentSoft: "text-[#8DFCC0]",
  copy: "text-[#a5a5a5]",
};

const CONFIG = {
  name: "Gerrit Visser",
  role: "I make Stuff happen. I make things Work. Fast. Good.",
  location: { city: "Bocholt", country: "DE" },
  blurb:
    "More than a Programmer. I design intuitively, develop efficiently and ship securely. I dont just clock in. I take pride in what I create and make sure it represents me well. ",
  avatar: "/imageMe.png",
  resumeUrl: "/Resume.pdf",
  socials: [
    { name: "GitHub", icon: Github, href: "https://github.com/icaruz60" },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/gerritfvisser/",
    },
    { name: "Email", icon: Mail, href: "mailto:contact@gerritvisser.de" },
  ],
  technologies: [
    {
      title: "Frontend",
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "Mantine UI",
        "HTML",
        "CSS",
        "JavaScript",
      ],
    },
    {
      title: "Backend",
      items: [
        "C#",
        ".NET",
        "Node.js",
        "Express.js",
        "Postgres",
        "MongoDB",
        "MySQL",
        "Fast API",
      ],
    },
    {
      title: "Mobile",
      items: ["React Native", "Expo", "Flutter"],
    },
    {
      title: "Game / 3D",
      items: ["Unity", "C#", "Blender", "VR"],
    },
    { title: "AI / Data", items: ["Python", "LSTM", "Claude", "Codex"] },
    {
      title: "Tooling",
      items: [
        "Azure",
        "Git",
        "Docker",
        "GitHub",
        "Fork",
        "npm",
        "Supabase",
        "Linux",
        "Plesk",
        "Hosting",
      ],
    },
  ],
  experience: [
    {
      company: "Tobit",
      role: "Full-Stack Developer Intern",
      period: "2023",
      location: "Ahaus, DE",
      summary:
        "I was able to gain an insight into this amazing Company and learn many things about Software Engineering and the Industry itself.",
      highlights: [
        "Made an intro Website and built a News Website 3 times using 3 different technologies",
        "HTML, CSS, JS, React, C#",
      ],
    },
    {
      company: "icaruz Software",
      role: "Software Engineer, Startup Founder",
      period: "2024 — Present",
      location: "Bocholt, DE",
      summary:
        "The name under which I design, develop, market and publish various Software Solutions. Projects include: Ascend, GAP, TempoChores and much more to come!",
      highlights: [
        "2 Apps published in the App store soon",
        "React Native, Expo, Flutter, C#, SQL, Supabase, Apple, Android, Deployment, Marketing",
      ],
    },
    {
      company: "PlayXScape",
      role: "Lead Game Developer Intern",
      period: "2025",
      location: "US",
      summary: "Developed 3 Mobile Games for a Startup called PlayXScape",
      highlights: [
        "Built out 3 different 2D Unity Mobile Games with focus on Performance and platform-friendliness",
        "Unity, Unity2D, C#, Blender, Aseprite, Audacity",
      ],
    },
    {
      company: "Envoc",
      role: "Full Stack Software Developer Intern",
      period: "2026",
      location: "Baton Rouge, US",
      summary:
        "6-month internship with intensive and complex backend and frontend work",
      highlights: [
        "Single-handedly built a standalone microservice that takes in a unified payload and builds digital wallet passes for Apple, Google, and Samsung Wallet. Designed and engineered the solution, translation process, and generalized payload structure",
        "As part of a team, created the backend and frontend for a pass/credential creation and distribution service",
        "Azure, .NET, React, C#, Domain-Driven Design, CQRS Pattern, Collaborative Programming, Following Business Standards",
      ],
    },
  ],
  education: {
    hops: [
      { label: "Bocholt, DE", lat: 51.838, lon: 6.615 },
      { label: "Marshall, Missouri", lat: 39.123, lon: -93.196 },
      { label: "Hammond, Louisiana", lat: 30.504, lon: -90.461 },
      { label: "Baton Rouge, Louisiana", lat: 30.4515, lon: -91.1871 },
    ],
    flights: [
      { from: "Bocholt (HS)", to: "Marshall (B.S.)" },
      { from: "Marshall (B.S.)", to: "Hammond (B.S.)" },
      { from: "Hammond (B.S.)", to: "Baton Rouge (Internship)" },
      { from: "Baton Rouge (Internship)", to: "?????????" },
    ],
    tickerDetail: [
      {
        left: "Berufskolleg Bocholt West",
        mid: "High School",
        right: "Bocholt, DE",
      },
      {
        left: "Missouri Valley College",
        mid: "B.S. Computer Science",
        right: "Marshall, MO",
      },
      {
        left: "Southeastern Louisiana University",
        mid: "B.S. Computer Science",
        right: "Hammond, LA",
      },
      {
        left: "Envoc",
        mid: "Associate Software Developer Intern",
        right: "Baton Rouge, LA",
      },
    ],
  },
  projects: [
    {
      title: "Ascend — Social Media for Productivity",
      description:
        "Ascend is a Phone App, that aims to fight against the current trend of doomscrolling Social Medias. It aims to reward productivity and strengthen the bond between you and your friends with sharing meaningful things and progressing life together rather than sending cat videos forth and back.",
      tags: ["React Native", "Expo", "Supabase", "TypeScript"],
      image: undefined,
      previewType: "phone",
      previewVideo: "/ascendpreview.mp4",
      href: "https://ascendapp.eu",
    },
    {
      title: "TempoChores — Timed Cleaning",
      description:
        "Chores are quite a chore. they are time consuming. they are monotone. This App wants to improve all that. Many people overestimate how long a chore takes, thus timing it is actually supposed to help. with TempoChores you can do just that and much more! You can tell the app how much time you have and what chores are due and it will automatically figure out the best possible chore schedule for you. Planned for the future are also a leaderboard and levels to compare yourself with your friends. Who do you think has the cleanest house?",
      tags: ["Flutter", "Dart", "Hive"],
      image: undefined,
      previewVideo: "/tempochorespreview.mp4",
      previewType: "phone",
      href: "https://github.com/Icaruz60/tempochores",
    },
    {
      title: "MenuMate — Interactive Restaurant Menus",
      description:
        "A Website that aims to better the Dining Experience. No more staring at a wall of text to choose your next meal! use smart filters and an improved rating system to find the best fit for you! ",
      tags: ["React", "C#", "Mantine.UI", "MariaDB", "Plesk"],
      image: undefined,
      previewVideo: "/MenuMatepreview.mp4",
      previewType: "web",
      liveUrl: "https://menumate.gerritvisser.de",
      href: "https://menumate.gerritvisser.de",
    },
  ],
};

const SECTION_LINKS = [
  { id: "intro", label: "Profile" },
  { id: "tech", label: "Technologies" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const HERO_ANIMATION = {
  role: 0.15,
  name: 0.3,
  stats: 0.5,
  avatar: 0.7,
  about: 0.9,
  socialStart: 1.05,
  hand: 1.6,
} as const;

const SIDEBAR_ANIMATION_BASE = 1.3;
const SIDEBAR_ANIMATION_STEP = 0.12;

const EDUCATION_TAGS = CONFIG.education.hops.map((hop, idx) => {
  const detail = CONFIG.education.tickerDetail[idx];
  const offsets = [0, 0, 0, 0];
  const sides: Array<"left" | "right"> = ["right", "left", "right", "left"];
  return {
    lat: hop.lat,
    lon: hop.lon,
    title: detail?.left ?? hop.label,
    label: detail?.left
      ? detail.left.split(" ").slice(0, 2).join(" ")
      : hop.label,
    subtitle: detail?.mid,
    location: detail?.right ?? hop.label,
    offset: offsets[idx] ?? 0,
    side: sides[idx] ?? "right",
  };
});

const lonLatToCartesian = (
  lon: number,
  lat: number,
  radius: number
): [number, number, number] => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return [x, y, z];
};

const ATLANTIC_CAMERA_POSITION = lonLatToCartesian(-40, 39, 4.2);

// ---------- SHARED ----------
const SectionTitle: React.FC<{ label: string; hint?: string }> = ({
  label,
  hint,
}) => (
  <div className="relative mx-auto max-w-6xl px-6">
    <div className="sticky top-0 z-10 -mx-6 mb-8 bg-white/[0.02] px-6 py-4 backdrop-blur">
      <p className="text-xs uppercase tracking-[0.4em] text-[#5c5c5c]">
        // {label}
      </p>
      <h2 className="text-4xl font-black tracking-tight text-white md:text-6xl">
        {label}
      </h2>
      {hint ? <p className="mt-3 text-sm text-[#b5b5b5]">{hint}</p> : null}
    </div>
  </div>
);

// ---------- HERO ----------
const Hero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const [first, ...rest] = CONFIG.name.split(" ");
  const heroStats = [
    "Software Engineer",
    "Full-Stack Dev",
    "Mobile Dev",
    "Game Dev",
  ];

  return (
    <section
      id="intro"
      ref={ref}
      className="relative flex min-h-screen items-center border-b border-white/5"
    >
      <motion.div
        style={{ y }}
        className="mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-6 pt-5 pb-16 md:py-24 md:flex-row md:items-center"
      >
        <div className="flex-1 w-full space-y-10 text-center md:text-left">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: HERO_ANIMATION.role, duration: 0.6 }}
            className="text-sm uppercase tracking-[0.6em] text-white/70 drop-shadow-[0_4px_16px_rgba(0,0,0,0.55)]"
          >
            {CONFIG.role}
          </motion.p>
          <motion.h1
            className="text-[clamp(3.5rem,10vw,9rem)] text-center font-bold leading-[0.9] text-white md:text-left"
            style={{ fontFamily: "var(--font-hero-display)" }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 70,
              delay: HERO_ANIMATION.name,
            }}
          >
            {first}
            <br />
            {rest.join(" ")}
          </motion.h1>
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 text-xs uppercase tracking-[0.3em] text-[#7f7f7f] md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: HERO_ANIMATION.stats, duration: 0.5 }}
          >
            {heroStats.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#58FF8A]" />
                {item}
              </div>
            ))}
          </motion.div>
        </div>
        <div className="flex w-full max-w-sm flex-col gap-6 md:max-w-md">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: HERO_ANIMATION.avatar, duration: 0.6 }}
            className="relative aspect-[5/4] w-full overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
          >
            <img
              src={CONFIG.avatar}
              alt={CONFIG.name}
              loading="eager"
              decoding="async"
              className="block h-full w-full object-cover"
              style={{ imageRendering: "auto" }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,0,0,0) 65%, rgba(0,0,0,0.22) 100%)",
              }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: HERO_ANIMATION.about, duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/5 px-6 py-5 text-sm text-[#c7c7c7]"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">
              About
            </p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-white/85">
              {CONFIG.blurb}
            </p>
            <div className="mt-5 flex items-center gap-3 text-white/90">
              <MapPin className="h-4 w-4 text-[#58FF8A]" />
              {CONFIG.location.city}, {CONFIG.location.country}
            </div>
          </motion.div>
          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
            {CONFIG.socials.map((s, idx) => (
              <motion.a
                key={s.name}
                href={s.href}
                target="_blank"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: HERO_ANIMATION.socialStart + idx * 0.12,
                  duration: 0.4,
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-3 py-2 text-xs uppercase tracking-[0.3em] text-white/70 transition hover:border-white/60 hover:text-white"
              >
                <s.icon className="h-3.5 w-3.5" />
                {s.name}
              </motion.a>
            ))}
          </div>
          {CONFIG.resumeUrl ? (
            <motion.a
              href={CONFIG.resumeUrl}
              download
              target="_blank"
              rel="noopener"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: HERO_ANIMATION.socialStart + 0.5,
                duration: 0.4,
              }}
              className="inline-flex items-center justify-center gap-3 rounded-full border border-[#58FF8A]/60 bg-[#0c0c0c] px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:border-[#58FF8A] hover:bg-[#111]"
            >
              <ArrowRight className="h-4 w-4 rotate-90 text-[#58FF8A]" />
              Download Resume
            </motion.a>
          ) : null}
        </div>
      </motion.div>
      <motion.button
        type="button"
        aria-label="Jump to technologies"
        className="absolute left-1/2 top-[calc(100%-120px)] hidden -translate-x-1/2 rounded-full border border-transparent p-2 transition hover:border-white/40 md:block"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: HERO_ANIMATION.hand, duration: 0.6 }}
        onClick={() =>
          document
            .getElementById("tech")
            ?.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      >
        <ScrollHand className="w-12" />
      </motion.button>
    </section>
  );
};

// ---------- TECHNOLOGIES ----------
const Technologies: React.FC = () => (
  <section
    id="tech"
    className="relative scroll-mt-20 border-b border-white/5 bg-transparent py-20"
  >
    <SectionTitle label="Technologies" hint="All the Stuff I know" />
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 md:grid-cols-2 lg:grid-cols-3">
      {CONFIG.technologies.map((cat, idx) => (
        <motion.div
          key={cat.title}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: idx * 0.05 }}
          className="rounded-[28px] border border-white/10 bg-white/5 p-6 text-white shadow-[0_0_30px_rgba(0,0,0,0.35)]"
        >
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
            <Globe className="h-4 w-4 text-[#58FF8A]" /> {cat.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {cat.items.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/15 px-3 py-1 text-xs text-[#bdbdbd]"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

// ---------- EXPERIENCE ----------
const Experience: React.FC = () => (
  <section
    id="experience"
    className="relative border-b border-white/5 bg-transparent py-24"
  >
    <SectionTitle
      label="Experience"
      hint="All the places I have made an impact at"
    />
    <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6">
      {CONFIG.experience.map((job, idx) => (
        <motion.div
          key={`${job.company}-${job.period}`}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ delay: idx * 0.05 }}
          className="rounded-[32px] border border-white/10 bg-white/5 p-6 text-white shadow-[0_0_30px_rgba(0,0,0,0.35)]"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">
                {job.period}
              </p>
              <h3 className="text-2xl font-bold text-white">{job.role}</h3>
              <p className="text-white/70">
                {job.company}
                {job.location ? ` · ${job.location}` : ""}
              </p>
            </div>
          </div>
          <p className="mt-4 text-white/80">{job.summary}</p>
          {job.highlights ? (
            <div className="mt-5 grid gap-3 text-sm text-white/70 md:grid-cols-2">
              {job.highlights.map((point) => (
                <div key={point} className="flex items-start gap-2">
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[#58FF8A]" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          ) : null}
        </motion.div>
      ))}
    </div>
  </section>
);

// ---------- EDUCATION: Globe + Destinations ----------

const ZoomControls: React.FC<{
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  min?: number;
  max?: number;
}> = ({ controlsRef, min = 2.6, max = 6.2 }) => {
  const { camera } = useThree();

  const adjustZoom = (delta: number) => {
    const target = controlsRef.current?.target ?? new Vector3(0, 0, 0);
    const distance = camera.position.distanceTo(target);
    const nextDistance = distance + delta;
    if (nextDistance < min || nextDistance > max) return;
    const direction = camera.position.clone().sub(target).normalize();
    const nextPosition = target
      .clone()
      .addScaledVector(direction, nextDistance);
    camera.position.copy(nextPosition);
    camera.lookAt(target);
    camera.updateProjectionMatrix();
    controlsRef.current?.update();
  };

  return (
    <Html fullscreen>
      <div className="pointer-events-none select-none">
        <div className="pointer-events-auto absolute right-5 top-5 flex flex-col gap-2 text-white">
          <button
            type="button"
            aria-label="Zoom in"
            className="rounded-md border border-white/30 bg-black/60 px-2 py-1 text-xs hover:border-white/60"
            onClick={() => adjustZoom(-0.35)}
          >
            +
          </button>
          <button
            type="button"
            aria-label="Zoom out"
            className="rounded-md border border-white/30 bg-black/60 px-2 py-1 text-xs hover:border-white/60"
            onClick={() => adjustZoom(0.35)}
          >
            −
          </button>
        </div>
      </div>
    </Html>
  );
};

const DestinationsPanel: React.FC = () => {
  const destinations = CONFIG.education.tickerDetail;
  const pastDestinations =
    destinations.length > 1
      ? destinations.slice(0, destinations.length - 1)
      : [];
  const currentDestination =
    destinations.length > 0 ? destinations[destinations.length - 1] : null;
  const futureDestination = {
    left: "???",
    mid: "Exploring the Jobmarket",
    right: "???",
  };

  const renderRow = (
    row: { left: string; mid: string; right: string },
    extraClasses?: string,
    key?: React.Key,
    delay = 0
  ) => (
    <motion.div
      key={key}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.5, delay }}
      className={`grid grid-cols-3 gap-3 rounded-2xl border bg-white/5 p-4 text-sm text-white/85 ${extraClasses}`}
    >
      <span className="truncate font-medium text-white">{row.left}</span>
      <span className="truncate text-center text-[#58FF8A]">{row.mid}</span>
      <span className="truncate text-right text-white/70">{row.right}</span>
    </motion.div>
  );

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">
          Past Destinations
        </p>
        <div className="mt-3 space-y-3">
          {pastDestinations.map((row, idx) =>
            renderRow(row, "border-white/10", `${row.left}-${idx}`, idx * 0.05)
          )}
        </div>
      </div>
      {currentDestination ? (
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-[#58FF8A]">
            Current Destination
          </p>
          <div className="mt-3">
            {renderRow(
              currentDestination,
              "border-[#58FF8A]/40 bg-[#0f1b11] shadow-[0_10px_30px_rgba(0,0,0,0.3)]",
              "current-destination",
              0.12
            )}
          </div>
        </div>
      ) : null}
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-white/40">
          Future Destination
        </p>
        <div className="mt-3">
          {renderRow(
            futureDestination,
            "border-white/10 text-white/70",
            "future-destination",
            0.2
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Education: React.FC = () => {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const globeInView = useInView(canvasContainerRef, {
    once: false,
    amount: 0.4,
  });

  return (
    <section
      id="education"
      className="relative border-b border-white/5 bg-transparent py-24"
    >
      <SectionTitle
        label="Education"
        hint="Knowledge from all around the globe"
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
        <motion.div
          ref={canvasContainerRef}
          className="relative h-[420px] w-full overflow-hidden rounded-[32px] border border-white/10 bg-[#0c0c0c]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          onWheelCapture={(e) => {
            e.preventDefault();
          }}
        >
          <Canvas camera={{ position: ATLANTIC_CAMERA_POSITION, fov: 50 }}>
            <ambientLight intensity={0.7} />
            <Stars radius={50} depth={20} count={1000} factor={3} fade />
            <Suspense fallback={null}>
              <GlobeReal
                hops={CONFIG.education.hops}
                tags={EDUCATION_TAGS}
                isActive={globeInView}
              />
            </Suspense>
            <ZoomControls controlsRef={controlsRef} />
            <OrbitControls
              ref={controlsRef}
              enablePan={false}
              enableZoom
              enableDamping
              dampingFactor={0.08}
              minDistance={2.6}
              maxDistance={6.2}
            />
          </Canvas>
        </motion.div>
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        >
          <DestinationsPanel />
        </motion.div>
      </div>
    </section>
  );
};

// ---------- PROJECTS ----------
const ProjectCard: React.FC<{
  project: (typeof CONFIG.projects)[number];
  invert?: boolean;
}> = ({ project, invert }) => {
  const isPhonePreview = project.previewType === "phone";
  const mediaImage =
    project.image ??
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80";

  const renderMedia = () => {
    if (project.previewVideo) {
      return (
        <video
          src={project.previewVideo}
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
      );
    }
    return (
      <img
        src={mediaImage}
        className="h-full w-full object-cover"
        alt={`${project.title} preview`}
      />
    );
  };

  const renderPhonePreview = () => (
    <div className="relative mx-auto aspect-[9/19] w-full max-w-[280px]">
      <div className="pointer-events-none absolute -inset-4 rounded-[40px] bg-[#58FF8A]/30 opacity-0 blur-3xl transition duration-500 group-hover:opacity-70" />
      <div className="relative h-full w-full rounded-[40px] border border-white/10 bg-gradient-to-br from-[#0f0f0f] via-[#090909] to-[#060606] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.65)] transition-transform duration-500 group-hover:scale-[1.03]">
        <div className="relative h-full w-full overflow-hidden rounded-[30px] bg-black">
          {renderMedia()}
        </div>
        <div className="pointer-events-none absolute inset-x-20 -bottom-3 h-1.5 rounded-full bg-black/40" />
      </div>
    </div>
  );

  const renderWebPreview = () => (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[32px] border border-white/10 bg-[#0b0b0b]">
      <div className="absolute inset-0 transition duration-500 group-hover:scale-105">
        {renderMedia()}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/35" />
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.25 }}
      className="mx-auto max-w-6xl px-6 py-8"
    >
      <div
        className={`flex flex-col items-center gap-8 md:flex-row ${
          invert ? "md:flex-row-reverse" : ""
        }`}
      >
        <a
          href={project.href || project.liveUrl || "#"}
          target="_blank"
          className={`group w-full md:w-1/2 ${
            isPhonePreview ? "flex justify-center" : ""
          }`}
        >
          {isPhonePreview ? renderPhonePreview() : renderWebPreview()}
        </a>
        <div className="w-full space-y-4 md:w-1/2">
          <h3 className="text-2xl font-bold text-white">{project.title}</h3>
          <p className="max-w-prose text-white/70">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70"
              >
                {t}
              </span>
            ))}
          </div>
          <a
            href={project.href || project.liveUrl || "#"}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 hover:border-white/60"
          >
            Visit <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => (
  <section
    id="projects"
    className="relative border-b border-white/5 bg-transparent py-24"
  >
    <SectionTitle label="Projects" hint="See what I made. First Hand." />
    <div className="space-y-2">
      {CONFIG.projects.map((p, i) => (
        <ProjectCard key={p.title} project={p} invert={i % 2 === 1} />
      ))}
    </div>
  </section>
);

// ---------- CONTACT ----------
const ContactSection: React.FC = () => (
  <section
    id="contact"
    className="relative border-t border-white/5 bg-transparent py-24"
  >
    <SectionTitle label="Contact" hint="lets make a connection!" />
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">
            Direct Line
          </p>
          <h3 className="mt-3 text-3xl font-bold text-white">
            Like what you see?
          </h3>
          <p className="mt-3 text-white/70">
            Shoot me an email and we’ll kick off in hours, not weeks.
          </p>
          <a
            href="mailto:contact@gerritvisser.de"
            className="mt-6 inline-flex items-center gap-3 rounded-full border border-white px-5 py-3 text-sm uppercase tracking-[0.3em] text-white transition hover:bg-white hover:text-black"
          >
            <Mail className="h-4 w-4" /> Send Email
          </a>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">
            Also find me here
          </p>
          <div className="mt-3 flex items-center gap-3 text-white">
            <MapPin className="h-5 w-5 text-[#58FF8A]" />
            {CONFIG.location.city}, {CONFIG.location.country}
          </div>
          <p className="mt-3 text-white/70">
            Dont need to directly reach me but still wanna tag along? Here are
            the places to do that
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {CONFIG.socials
              .filter((s) => s.name.toLowerCase() !== "email")
              .map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70 hover:border-white/60"
                >
                  {React.createElement(s.icon, { className: "h-4 w-4" })}
                  <span>{s.name}</span>
                </a>
              ))}
            {CONFIG.resumeUrl ? (
              <a
                href={CONFIG.resumeUrl}
                download
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-full border border-[#58FF8A]/40 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white hover:border-[#58FF8A]"
              >
                <ArrowRight className="h-4 w-4 rotate-90 text-[#58FF8A]" />
                <span>Resume</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/[0.02] px-6 py-4 text-sm text-white/60">
        <div>
          <p className="uppercase tracking-[0.45em] text-white/80">
            {CONFIG.role}
          </p>
          <p className="text-2xl font-semibold text-white">{CONFIG.name}</p>
        </div>
        <p className="text-white/50">
          Open to Job offers, advisory, and playful side collaborations.
        </p>
      </div>
    </div>
  </section>
);

// ---------- SIDEBAR NAV ----------
const SectionSidebar: React.FC = () => {
  const [activeSection, setActiveSection] = useState(SECTION_LINKS[0].id);
  const [sectionProgress, setSectionProgress] = useState<
    Record<string, number>
  >(
    () =>
      Object.fromEntries(SECTION_LINKS.map(({ id }) => [id, 0])) as Record<
        string,
        number
      >
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0.1,
      }
    );
    SECTION_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const elements = SECTION_LINKS.map(({ id }) => document.getElementById(id));
    let ticking = false;

    const updateProgress = () => {
      const scrollProbe = window.scrollY + window.innerHeight * 0.3;
      const nextProgress: Record<string, number> = {};
      let currentSectionId = SECTION_LINKS[0].id;

      elements.forEach((el, idx) => {
        const nextEl = elements[idx + 1];
        const sectionId = SECTION_LINKS[idx].id;
        if (!el) {
          nextProgress[sectionId] = 0;
          return;
        }
        if (!nextEl) {
          nextProgress[sectionId] = scrollProbe >= el.offsetTop ? 1 : 0;
          if (scrollProbe >= el.offsetTop) {
            currentSectionId = sectionId;
          }
          return;
        }
        const start = el.offsetTop;
        const end = nextEl.offsetTop;
        const distance = Math.max(1, end - start);
        const progress = (scrollProbe - start) / distance;
        nextProgress[sectionId] = Math.min(1, Math.max(0, progress));
        if (scrollProbe >= start && scrollProbe < end) {
          currentSectionId = sectionId;
        }
      });

      setSectionProgress(nextProgress);
      setActiveSection((prev) =>
        prev !== currentSectionId ? currentSectionId : prev
      );
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeIndex = SECTION_LINKS.findIndex(
    (section) => section.id === activeSection
  );

  return (
    <div className="pointer-events-none fixed right-12 top-1/2 z-40 hidden h-[80vh] -translate-y-1/2 flex-col items-center justify-start text-xs uppercase tracking-[0.3em] text-white/40 md:flex">
      {SECTION_LINKS.map((section, idx) => {
        const isActive = section.id === activeSection;
        const connectorActive = activeIndex > idx;
        const progress = sectionProgress[section.id] ?? 0;
        const itemDelay = SIDEBAR_ANIMATION_BASE + idx * SIDEBAR_ANIMATION_STEP;
        return (
          <React.Fragment key={section.id}>
            <motion.button
              type="button"
              aria-label={`Scroll to ${section.label}`}
              aria-current={isActive ? "true" : undefined}
              className={`pointer-events-auto flex-shrink-0 font-medium uppercase tracking-[0.4em] transition-all duration-300 ${
                isActive
                  ? "text-white text-lg md:text-2xl"
                  : "text-white/50 text-sm md:text-base"
              }`}
              onClick={() => {
                document
                  .getElementById(section.id)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
                setActiveSection(section.id);
              }}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: itemDelay, duration: 0.4 }}
            >
              {section.label}
            </motion.button>
            {idx < SECTION_LINKS.length - 1 ? (
              <motion.div
                className="flex w-full flex-grow flex-col items-center justify-center gap-1 py-1"
                style={{
                  flexGrow: 1,
                  flexBasis: 0,
                  flexShrink: 0,
                  minHeight: "32px",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: itemDelay + 0.05, duration: 0.4 }}
              >
                {[0.3, 0.6, 0.9].map((threshold, dash) => {
                  const filled =
                    connectorActive ||
                    (!connectorActive && progress >= threshold);
                  return (
                    <span
                      key={dash}
                      className={`h-5 w-px transition-colors duration-300 ${
                        filled ? "bg-[#58FF8A]" : "bg-white/20"
                      }`}
                    />
                  );
                })}
              </motion.div>
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// ---------- SCROLL INDICATOR ----------
const ScrollHand: React.FC<{ className?: string }> = ({ className }) => (
  <img
    src="/pixel_hand.png"
    alt="Scroll down"
    className={`drop-shadow-[0_0_12px_rgba(0,0,0,0.45)] scroll-hand-bounce ${
      className ?? ""
    }`}
  />
);

// ---------- PAGE ----------
export default function Portfolio() {
  return (
    <div
      className={`mesh-bg min-h-screen scroll-smooth bg-[#050505] text-white lg:pr-28`}
    >
      <SectionSidebar />
      <Hero />
      <Technologies />
      <Experience />
      <Education />
      <Projects />
      <ContactSection />
    </div>
  );
}
