# Pixels2Pixels Studio Website

This repository contains the complete source code for the official Pixels2Pixels Studio website, built with Next.js, TypeScript, Tailwind CSS, and React Three Fiber.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Content Management](#content-management)
  - [Portfolio Projects](#portfolio-projects)
  - [News Posts](#news-posts)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)

## Features

- **Next.js App Router**: Modern, server-centric architecture for optimal performance and SEO.
- **Bilingual (EN/SR)**: Fully internationalized routing and content using `next-intl` principles.
- **React Three Fiber**: Advanced, interactive 3D hero section with dynamic lighting and particle effects.
- **MDX Content**: Portfolio and news content are managed through simple Markdown files.
- **TypeScript**: End-to-end type safety.
- **Tailwind CSS**: Utility-first styling for rapid UI development.
- **SEO Optimized**: Automated sitemap generation, `robots.txt`, and structured data (JSON-LD) for all pages.
- **Contact Form**: API route with validation and a honeypot field to prevent spam.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 14 (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **3D Rendering**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) & [Drei](https://github.com/pmndrs/drei)
- **Content**: [Gray Matter](https://github.com/jonschlinkert/gray-matter) for Markdown frontmatter parsing
- **Linting/Formatting**: ESLint, Prettier (recommended)

## Project Structure

```
/pixels2pixels
├── content/                # Markdown content for portfolio and news
│   ├── en/
│   └── sr/
├── public/                 # Static assets (images, fonts, favicons)
├── src/
│   ├── app/                # Next.js App Router pages and layouts
│   │   ├── [lang]/         # Bilingual page routes
│   │   ├── api/            # API routes (e.g., contact form)
│   │   └── layout.tsx      # Root layout
│   ├── components/         # Reusable React components
│   │   ├── 3d/             # React Three Fiber components
│   │   ├── layout/         # Navigation, Footer
│   │   ├── sections/       # Homepage sections
│   │   └── ui/             # Generic UI elements (buttons, forms)
│   ├── i18n/               # Internationalization config and dictionaries
│   ├── lib/                # Helper functions and utilities
│   └── types/              # TypeScript type definitions
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18.17 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd pixels2pixels
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root of the project and add the following variables. See [Environment Variables](#environment-variables) for more details.

    ```env
    NEXT_PUBLIC_SITE_URL=http://localhost:3000
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

    The site will be available at [http://localhost:3000](http://localhost:3000).

## Content Management

All dynamic content for the portfolio and news sections is managed via Markdown files located in the `/content` directory. Each language has its own subdirectory (`en` and `sr`).

### Portfolio Projects

-   **Location**: `/content/[lang]/portfolio/`
-   **File format**: `project-slug.md`

Each project file requires a YAML frontmatter block with the following structure:

```yaml
title: "Project Title"
shortDescription: "A brief, one-sentence summary of the project."
services: # List of services provided
  - XR Development
  - 3D Design
year: 2024
client: "Client Name"
thumbnail: "/images/portfolio/thumbnail.jpg" # Path to thumbnail image
---

## Project Overview

Full project description in Markdown format goes here.
```

### News Posts

-   **Location**: `/content/[lang]/news/`
-   **File format**: `post-slug.md`

Each news post requires a YAML frontmatter block:

```yaml
title: "News Post Title"
excerpt: "A short summary for the post listing page."
category: "Case Study" # or "Insights", "News", etc.
date: "2024-02-20" # YYYY-MM-DD format
author: "Author Name"
coverImage: "/images/news/cover.jpg"
---

Full article content in Markdown format goes here.
```

## Environment Variables

Create a `.env.local` file in the project root to configure these variables.

| Variable                      | Description                                                                                             | Example                               |
| ----------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`        | The public, canonical URL of the site. Used for SEO and sitemap generation.                             | `https://pixels2pixels.com`           |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | (Optional) Your Google Analytics 4 measurement ID.                                                      | `G-XXXXXXXXXX`                        |
| `AWS_REGION`                  | (For Deployment) The AWS region for SES.                                                                | `eu-central-1`                        |
| `AWS_ACCESS_KEY_ID`           | (For Deployment) AWS access key for SES.                                                                |                                       |
| `AWS_SECRET_ACCESS_KEY`       | (For Deployment) AWS secret access key for SES.                                                         |                                       |
| `SES_FROM_EMAIL`              | (For Deployment) The verified email address to send contact form submissions from.                      | `noreply@pixels2pixels.com`           |
| `SES_TO_EMAIL`                | (For Deployment) The email address to receive contact form submissions.                                 | `hello@pixels2pixels.com`             |

## Deployment

For detailed instructions on deploying this application to AWS using services like Amplify, S3/CloudFront, or a container service, please refer to the `DEPLOYMENT.md` file.
