import type { ComponentType } from "react";
import {
  SiNextdotjs,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiTailwindcss,
  SiPython,
  SiFastapi,
  SiRedis,
  SiCelery,
  SiDocker,
  SiKubernetes,
  SiNestjs,
  SiGithub,
} from "react-icons/si";

export type TechIcon = ComponentType<{ className?: string }>;
export type TechKey =
  | "next" | "ts" | "react" | "node" | "tailwind" | "python" | "fastapi"
  | "redis" | "celery" | "docker" | "kubernetes" | "nest" | "github";

export type TechItem = TechKey | { label: string; tooltip?: string; };

export interface Project {
  slug: string;
  title: string;
  imageTitle: string;
  src: string;
  lightModeSrc?: string;
  video: string;
  description: string;
  tech: TechItem[];
  github: string;
  live: string;
  starsText?: string;
  backgroundImage?: string;
  hasPin: boolean;
  status?: "live" | "building";
}

export const iconMap: Record<TechKey, TechIcon> = {
  next: SiNextdotjs, ts: SiTypescript, react: SiReact, node: SiNodedotjs,
  tailwind: SiTailwindcss, python: SiPython, fastapi: SiFastapi, redis: SiRedis,
  celery: SiCelery, docker: SiDocker, kubernetes: SiKubernetes, nest: SiNestjs,
  github: SiGithub,
};

export const techNames: Record<TechKey, string> = {
  next: "Next.js", ts: "TypeScript", react: "React", node: "Node.js",
  tailwind: "Tailwind CSS", python: "Python", fastapi: "FastAPI", redis: "Redis",
  celery: "Celery", docker: "Docker", kubernetes: "Kubernetes", nest: "NestJS",
  github: "GitHub",
};

export const projectsData: Project[] = [
  {
    slug: "scnare-v3",
    title: "SCNARE v3: ROS 2 EKS Lab Platform",
    imageTitle: "Platform Interface",
    src: "/project-image/p1.png",
    video: "",
    description: "NestJS backend that dynamically provisions isolated, on-demand ROS 2 learning environments (namespaces/pods) in AWS EKS, with a secure reverse proxy using RS256 JWTs and an OAuth2 sidecar streaming in-browser ttyd terminals via ALB ingress.",
    tech: ["nest", "ts", "kubernetes", "docker", { label: "AWS EKS" }, { label: "OAuth2" }],
    github: "https://github.com/GITGUYX8/v3_SCNARE_eks-",
    live: "",
    backgroundImage: "/project-image/p1.png",
    hasPin: true,
    status: "live",
  },
  {
    slug: "aws-cloud-native-deploy",
    title: "AWS Cloud-Native Web Deployment",
    imageTitle: "Architecture",
    src: "/project-image/p2.png",
    video: "",
    description: "Production-grade serverless deployment on AWS ECS Fargate with a custom VPC, strict IAM roles, and an ALB for secure traffic routing. Multi-stage Docker builds with buildx cross-platform compilation.",
    tech: ["docker", { label: "AWS ECS" }, { label: "VPC" }, { label: "ALB" }, { label: "IAM" }],
    github: "https://github.com/GITGUYX8/aws-deploy",
    live: "",
    backgroundImage: "/project-image/p2.png",
    hasPin: true,
    status: "live",
  },
  {
    slug: "work-order-processing",
    title: "Work Order Processing System",
    imageTitle: "Pipeline Dashboard",
    src: "/project-image/p3.png",
    video: "",
    description: "Multi-agent pipeline (Orchestrator, RAG Retriever, Worker, Verifier) that ingests work orders, retrieves context via hybrid pgvector + full-text search, and streams real-time decision traces over SSE. Cost-aware LLM routing with a Redis-cached two-tier model system.",
    tech: ["fastapi", "celery", "python", "redis", "next", "react", { label: "pgvector" }, { label: "SSE" }],
    github: "https://github.com/GITGUYX8",
    live: "",
    backgroundImage: "/project-image/p3.png",
    hasPin: false,
    status: "live",
  },
  {
    slug: "rviz2-streaming",
    title: "Rviz2 Web-Streaming Pipeline",
    imageTitle: "Stream Preview",
    src: "/project-image/p4.png",
    video: "",
    description: "Low-latency remote visualization pipeline streaming ROS 2 Rviz2 3D sensor data and robotic diagnostics to browsers via noVNC and WebSockets. Headless containerized GUI with Xvfb + x11vnc for cloud teleoperation.",
    tech: [{ label: "ROS 2" }, { label: "noVNC" }, { label: "WebSockets" }, "docker", { label: "Xvfb" }],
    github: "https://github.com/GITGUYX8/rviz2-nvnc-pipeline",
    live: "",
    backgroundImage: "/project-image/p4.png",
    hasPin: false,
    status: "building",
  },
];
