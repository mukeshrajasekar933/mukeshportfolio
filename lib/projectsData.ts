export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  features: string[];
  technologies: string[];
  category: string;
  year: string;
  image: string;
  accent: string;
  liveUrl: string;
  githubUrl: string;
  stats?: { label: string; value: string }[];
  overview?: string;
  architecture?: string[];
}

export const projectsData: Project[] = [
  {
    id: "narrative-blog-network",
    number: "01",
    title: "NARRATIVE",
    subtitle: "BLOG NETWORK",
    tagline: "Full-stack publishing ecosystem for digital storytellers.",
    description:
      "A full-stack blogging platform that enables users to create, edit, publish, and manage blog posts. Implemented secure user authentication, role-based access, commenting, and responsive design.",
    features: [
      "User authentication & session control",
      "Role-based access (Author, Editor, Reader)",
      "Blog creation, markdown editing & autosave",
      "Drafts, revisions, and one-click publishing",
      "Nested commenting & community moderation",
      "Fluid responsive UI engineered with React.js"
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    category: "Full Stack Platform",
    year: "2025",
    image: "/images/project-narrative.png",
    accent: "#ffffff",
    liveUrl: "https://github.com/mukeshrajasekar933/narrative-blog-network",
    githubUrl: "https://github.com/mukeshrajasekar933/narrative-blog-network",
    stats: [
      { label: "Publish Time", value: "< 250ms" },
      { label: "Auth Flow", value: "Secure JWT" },
      { label: "Storage", value: "MongoDB Atlas" }
    ],
    overview:
      "Narrative Blog Network enables creators to publish digital stories with zero friction. Built with a decoupled React client and an Express/Node REST backend, backed by MongoDB.",
    architecture: [
      "Decoupled React client communicating with RESTful Express API endpoints",
      "Schema-level validation and indexing with Mongoose on MongoDB",
      "Role-guarded middleware for draft approvals and user privileges"
    ]
  },
  {
    id: "aura-shop",
    number: "02",
    title: "AURA",
    subtitle: "SHOP",
    tagline: "Modern e-commerce platform with micro-interactions.",
    description:
      "Built a modern e-commerce web application with product browsing, shopping cart, user authentication, and order management. Integrated REST APIs, responsive UI, and optimized performance to deliver a seamless shopping experience.",
    features: [
      "Instant product browsing & category filters",
      "Shopping cart management & local persistence",
      "User authentication & profile purchase history",
      "Order checkout flow & status management",
      "RESTful API architecture with rate limiting",
      "Ultra-responsive catalog with layout transitions",
      "Performance optimization with lazy-loaded assets"
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    category: "E-Commerce Web App",
    year: "2025",
    image: "/images/project-aura.png",
    accent: "#e4e4e7",
    liveUrl: "https://github.com/mukeshrajasekar933/aura-shop",
    githubUrl: "https://github.com/mukeshrajasekar933/aura-shop",
    stats: [
      { label: "Lighthouse", value: "98/100" },
      { label: "Cart Latency", value: "Realtime" },
      { label: "Catalog", value: "Scalable" }
    ],
    overview:
      "Aura Shop demonstrates high-touch digital commerce where speed meets visual delight. Built with seamless cart transitions, REST API endpoints, and optimized responsiveness.",
    architecture: [
      "Client-side state management for cart add/remove actions",
      "Centralized state management with modular API services",
      "Modular backend routes for inventory, orders, and user authentication"
    ]
  },
  {
    id: "nexwork",
    number: "03",
    title: "NEXWORK",
    subtitle: "NETWORK",
    tagline: "Professional connectivity hub for modern technologists.",
    description:
      "Designed and developed a professional networking platform where users can create profiles, connect with others, and share updates. Implemented authentication, profile management, and scalable backend APIs using the MERN stack.",
    features: [
      "User authentication & profile customization",
      "Peer connection requests & network graph",
      "Feed updates with media previews & likes",
      "Scalable REST backend APIs with Express",
      "MongoDB database modeling for relational social graphs",
      "Clean responsive interface across mobile & desktop"
    ],
    technologies: ["MERN Stack", "React.js", "Node.js", "Express.js", "MongoDB"],
    category: "Professional Network",
    year: "2024",
    image: "/images/project-nexwork.png",
    accent: "#d4d4d8",
    liveUrl: "https://github.com/mukeshrajasekar933/nexwork",
    githubUrl: "https://github.com/mukeshrajasekar933/nexwork",
    stats: [
      { label: "Live Feed", value: "Reactive" },
      { label: "DB Structure", value: "Mongoose ODM" },
      { label: "Architecture", value: "MERN Stack" }
    ],
    overview:
      "Nexwork reimagines professional networking through a developer-first lens. Profiles highlight verified repositories, technical competencies, and peer endorsements with a sleek dark aesthetic.",
    architecture: [
      "Optimized query aggregation pipelines for newsfeed generation",
      "Token-based stateless session management with JWT",
      "Comprehensive CORS and sanitization guards against injection"
    ]
  },
  {
    id: "blogsphere",
    number: "04",
    title: "BLOGSPHERE",
    subtitle: "CMS & ENGINE",
    tagline: "Feature-rich blogging application with administrative tools.",
    description:
      "Developed a feature-rich blogging application with CRUD operations, category filtering, search functionality, and an admin dashboard. Built secure REST APIs, integrated MongoDB for data management, and designed a clean, mobile-friendly user interface.",
    features: [
      "Full CRUD operations for blog articles",
      "Multi-category tagging and taxonomy filtering",
      "Keyword search functionality across articles",
      "Administrative dashboard for publishing control",
      "Secure REST APIs documented with clear endpoints",
      "MongoDB document storage with index optimization",
      "Clean, mobile-friendly user interface"
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    category: "Publishing Platform",
    year: "2024",
    image: "/images/project-blogsphere.png",
    accent: "#a1a1aa",
    liveUrl: "https://github.com/mukeshrajasekar933/blogsphere",
    githubUrl: "https://github.com/mukeshrajasekar933/blogsphere",
    stats: [
      { label: "Search Index", value: "Instant" },
      { label: "Admin Suite", value: "Full Control" },
      { label: "Database", value: "MongoDB" }
    ],
    overview:
      "BlogSphere brings clarity to content management. Its intuitive admin dashboard gives creators complete control over articles, categories, and publication workflows.",
    architecture: [
      "Admin role schemas with fine-grained route protection",
      "Compound indexing on publication date, status, and category tags",
      "Unified JSON response envelopes and error handling"
    ]
  }
];
