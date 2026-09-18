export interface Technology {
  name: string;
  category: "Frontend" | "Backend" | "Database" | "3D & AR/VR" | "Tools";
  description: string;
  level: string;
}

export const techStack: Technology[] = [
  {
    name: "React.js",
    category: "Frontend",
    description: "Component lifecycle, custom reactive hooks, dynamic rendering, and interactive UI states.",
    level: "Core"
  },
  {
    name: "Next.js",
    category: "Frontend",
    description: "App Router, SSR, SSG, streaming architecture, and optimized production delivery.",
    level: "Advanced"
  },
  {
    name: "JavaScript",
    category: "Frontend",
    description: "ESNext syntax, asynchronous programming, DOM manipulation, and event loops.",
    level: "Core"
  },
  {
    name: "TypeScript",
    category: "Frontend",
    description: "Strict typing, robust schema contracts, and scalable maintainable architecture.",
    level: "Production"
  },
  {
    name: "Node.js",
    category: "Backend",
    description: "Non-blocking event-driven runtime for high-throughput network applications.",
    level: "Backend"
  },
  {
    name: "Express.js",
    category: "Backend",
    description: "Modular middleware chaining, secure routing controllers, and RESTful pipelines.",
    level: "Backend"
  },
  {
    name: "MongoDB",
    category: "Database",
    description: "NoSQL document collections, aggregation pipelines, and Mongoose schema modeling.",
    level: "Database"
  },
  {
    name: "PostgreSQL",
    category: "Database",
    description: "Relational database modeling, ACID compliance, complex queries, and indexing.",
    level: "Database"
  },
  {
    name: "MySQL",
    category: "Database",
    description: "Relational data structuring, foreign keys, stored procedures, and normalized schemas.",
    level: "Database"
  },
  {
    name: "Firebase",
    category: "Database",
    description: "Real-time database, authentication, cloud functions, and instant sync.",
    level: "Cloud"
  },
  {
    name: "Supabase",
    category: "Database",
    description: "Postgres-backed open source backend with real-time subscriptions and auth.",
    level: "Cloud"
  },
  {
    name: "Blender",
    category: "3D & AR/VR",
    description: "3D modeling, texturing, lighting, animation, and rendering for AR/VR digital assets.",
    level: "Creative"
  },
  {
    name: "Unity",
    category: "3D & AR/VR",
    description: "Interactive 3D environments, AR Foundation, VR spatial interactions, and physics.",
    level: "Creative"
  },
  {
    name: "REST APIs",
    category: "Backend",
    description: "Stateless microservices, HTTP status conventions, JSON payloads, and token authentication.",
    level: "Architecture"
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    description: "Utility-first modern styling, responsive layouts, and clean visual tokens.",
    level: "Styling"
  },
  {
    name: "Git & GitHub",
    category: "Tools",
    description: "Version control branching, pull request workflows, CI/CD, and repository management.",
    level: "Workflow"
  },
  {
    name: "Postman",
    category: "Tools",
    description: "API testing, endpoint benchmarking, automated collection verification, and mock servers.",
    level: "Tooling"
  }
];
