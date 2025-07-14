import { notFound } from 'next/navigation';

export interface Project {
  slug: string;
  logo: string;
  title: string;
  projectType: string;
  industry: string;
  featured: boolean;
  publishedAt: string;
  description: string;
  content: string;
}

export const projects: Project[] = [
  {
    slug: 'eis',
    logo: '/images/inalcom.png',
    title: 'EIS: Digital Transformation of Aluminum Extrusion Consultancy',
    projectType: 'Custom Web Application Development',
    industry: 'Manufacturing Consultancy & Process Optimization',
    featured: true,
    publishedAt: '2024-12-01',
    description:
      "How we transformed Inalcom's proven aluminum extrusion expertise into a modern, deployable web application for their global client base.",
    content: `# EIS: Digital Transformation of Aluminum Extrusion Consultancy

[ExtrusionSim](https://extrusionsim.com) · A project for [Inalcom](https://inalcocompany.com) · Manufacturing Consultancy & Process Optimization

## The Opportunity

Inalcom, a leading aluminum extrusion consultancy, had built an impressive foundation of sophisticated formulations, calculations, and algorithms for optimizing extrusion processes through years of industry expertise. As their consulting practice grew and evolved, they recognized the potential to digitally transform their proven methodologies to better serve their expanding client base.

Their existing Excel-based workflows, while effective, presented opportunities for enhancement. Inalcom sought to leverage modern technology to amplify their consulting capabilities, enabling them to serve more clients simultaneously while maintaining their high standards of precision and expertise. They envisioned providing clients with real-time access to process optimization recommendations, moving beyond traditional consulting delivery methods to offer immediate, interactive solutions.

Additionally, Inalcom wanted to offer their expertise in a format that could be deployed directly at client facilities, providing secure, on-premises access to their optimization methodologies within clients' local networks. They aimed to ensure their proven methodologies could be consistently applied across all client engagements through a unified digital platform.

We collaborated closely with Inalcom throughout their digital transformation journey, helping them evolve their established expertise into a cutting-edge web application that could be deployed at client facilities worldwide. Our role was to provide the technical architecture and modern development approach that would bring their proven methodologies into the digital age.

![EIS](/images/extrusionsim.webp)

## The Technology

We built EIS using a modern, performance-focused technology stack designed for reliability and ease of deployment. The backend foundation leverages Bun runtime for high-performance JavaScript execution, implemented with Hono web framework and tRPC for type-safe API development. We used PostgreSQL database with Drizzle ORM for robust, type-safe data operations.

For the frontend development, we built a React-based user interface with TanStack Router for seamless navigation, TanStack Query for efficient data management and caching, and shadcn/ui component library for consistent, accessible design.

The application compiles to a single binary for simplified installation and offers multi-platform compatibility across Windows, Linux, and macOS. This enables local server deployment capability for secure, on-premises installation at client facilities, while maintaining connection to Inalcom's specialized calculation APIs for the core optimization algorithms.

### Core Application Features

EIS implements Inalcom's proprietary algorithms through an advanced process simulation engine that analyzes die-alloy-press combinations to generate optimized parameters including temperatures, ram speeds, billet calculations, and cost analysis. The application features comprehensive equipment and material management for presses, aluminum alloys (1000-7000 series), and die inventory with technical documentation.

The system provides recipe-based production planning that combines die specifications, alloy selection, and target parameters with operator guidance. Integrated quality control enables production issue tracking, process corrections, and institutional knowledge capture for continuous improvement.

Advanced optimization workflows support multi-scenario analysis for new product development, cost reduction, quality improvement, and press scheduling. The platform enables data-driven decision making through what-if analysis, equipment comparison, and comprehensive production metrics tracking.

## Technical Innovation & Results

We successfully digitized Inalcom's years of industry expertise into automated, consistent algorithms while maintaining precision and accuracy. The solution features type-safe development from database to frontend, single binary deployment for simplified installation, and flexible architecture that works across different client environments.

The transformation enabled Inalcom to serve multiple clients simultaneously with consistent, automated process optimization, significantly expanding their consulting capacity. What previously required manual calculations can now be completed in minutes with immediate results. Clients receive a complete, self-contained optimization system for local deployment, providing ongoing value while maintaining security and control over their production data.

## Why This Matters

This project demonstrates how deep industry expertise can be successfully transformed into modern, deployable software solutions. By respecting Inalcom's proven methodologies while implementing them in a cutting-edge technical stack, we created a solution that:

- Preserves decades of specialized knowledge in a digital format
- Enables rapid scaling of consultancy services
- Provides clients with long-term value through on-premises deployment
- Maintains the precision and reliability of established manual processes

The result is a powerful example of how traditional industrial expertise can be enhanced and scaled through thoughtful software development, creating value for both the consultancy and their manufacturing clients.`,
  },
  {
    slug: 'mox',
    logo: '/images/moxlogo.png',
    title: 'Mox Systems: Comprehensive Digital Presence & Product Design',
    projectType: 'Website Development, Content Creation & Industrial Design',
    industry: 'Building Materials & Architectural Solutions',
    featured: true,
    publishedAt: '2024-01-15',
    description:
      'A complete digital transformation project including website development, product design, and content creation for Mox Systems.',
    content: `# Mox Systems: Comprehensive Digital Presence & Product Design

[Mox Systems](https://moxsystems.com) · Building Materials & Architectural Solutions

## The Opportunity

Mox Systems, a leading manufacturer of architectural aluminum and steel profiles, needed a comprehensive digital transformation to strengthen their market presence and effectively showcase their innovative product line. The company required a solution that would not only present their products professionally but also communicate their technical expertise and commitment to quality across multiple markets.

The challenge was multifaceted, encompassing:
- Creation of a modern, responsive website
- Development of detailed product descriptions and technical specifications
- Design of product catalogs and marketing materials
- Industrial design for select product lines
- Content strategy aligned with their global market presence

## Our Approach

We undertook a holistic approach to transform Mox Systems' digital presence and product presentation, working closely with their team to ensure all deliverables aligned with their brand vision and technical requirements.

### Website Development
We designed and developed a modern, responsive website that effectively showcases Mox's extensive product range. The website features:
- Clean, professional design reflecting their premium brand positioning
- Intuitive navigation structure for easy product discovery
- Responsive design optimized for all devices
- Multi-language support for their global market presence
- Integration of product catalogs and technical documentation
- Blog section for industry insights and company news

![Screenshot of the Mox Systems website](/images/moxweb.png)

### Content Creation
Our content strategy focused on creating compelling, technically accurate product descriptions that would resonate with both architects and contractors:
- Detailed product descriptions highlighting technical specifications and applications
- SEO-optimized content to improve visibility
- Technical documentation and installation guides
- Blog articles covering industry trends and product applications
- Multi-language content adaptation for international markets

### Product Design
We contributed to the industrial design of several product lines, ensuring both functionality and aesthetic appeal:
- LED skirting board profiles with innovative lighting solutions
- Tile trim profiles for various applications
- Step nose and safety profiles
- Flooring transition solutions

### Catalog & Technical Documentation
We developed comprehensive product catalogs that effectively communicate product features and technical specifications:
- Product catalog design and content creation
- Application guides and assembly manuals
- Data sheets and technical specifications

#### Related Links
- [Product Catalog (PDF)](https://moxsystems.com/media/files/mox_profile_systems_catalog_new.pdf?alt=media)
- [Example Assembly Manual (PDF)](https://moxsystems.com/media/files/assembly-manual-lato-en.pdf?alt=media)
- [Example Data Sheet (PDF)](https://moxsystems.com/media/files/datasheet-luceo-en.pdf?alt=media)

## Technical Implementation

The website was built using modern web technologies to ensure performance, scalability, and ease of maintenance:
- Responsive design framework for cross-device compatibility
- Integration with product inventory systems
- Multi-language support architecture
- SEO optimization across all content

## Results

The comprehensive digital transformation project delivered significant results for Mox Systems:
- Enhanced online presence with a professional, modern website
- Improved product visibility and understanding through detailed content
- Streamlined product documentation and technical information
- Consistent brand presentation across all digital touchpoints
- Increased engagement through blog content and social media
- Better market positioning through professional catalog materials

## Why This Matters

This project demonstrates the impact of a comprehensive digital transformation approach that combines:
- Strategic content development
- Modern web development
- Industrial design expertise
- Technical documentation
- Brand consistency

The result is a cohesive digital presence that effectively communicates Mox Systems' technical expertise and product quality to their global market, supporting their position as a leader in architectural profile solutions.`,
  },
];

export function getProject(slug: string): Project {
  const project = projects.find((cs) => cs.slug === slug);
  if (!project) {
    notFound();
  }
  return project;
}

export function getAllProject(): Project[] {
  return projects;
}
