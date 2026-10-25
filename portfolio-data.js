/**
 * Portfolio Configuration & Personal Details
 * 
 * Edit this file to update your personal information, work experience,
 * projects, skills, recognition, and contact links without touching the layout.
 */

const portfolioData = {
  personal: {
    name: "Adhi Gowda",
    brand: "adhi",
    signatureAlt: "adhi",
    alias: 'you can call me “adhi”',
    statementLine1: "software, cloud & security, and",
    statementLine2: "figuring out how things work",
    recentWorkPrefix: "most recently, software & corporate intern at",
    recentWorkOrg: "omniforge & jain university",
    recentWorkUrl: "https://www.linkedin.com/in/adhigowda2006/",
    actions: {
      projectsText: "view projects",
      projectsUrl: "#projects",
      contactText: "say hello",
      contactUrl: "#contact"
    }
  },

  work: {
    heading: "work",
    items: [
      {
        company: "omniforge",
        role: "full stack dev intern",
        dates: "april 2026 — august 2026",
        datesHtml: '<time datetime="2026-04">april 2026</time> <span aria-hidden="true">—</span> <span class="sr-only">to</span> <time datetime="2026-08">august 2026</time>',
        location: "bengaluru, karnataka, india · on-site",
        description: [
          "learning & implementing as a full stack dev",
          "building robust full stack web services, scalable architectures, and interactive client experiences"
        ],
        linkText: "visit omniforge",
        linkUrl: "https://www.linkedin.com/in/adhigowda2006/",
        logo: "images/omniforge.svg"
      },
      {
        company: "jain (deemed-to-be university)",
        role: "corporate intern",
        dates: "april 2026 — september 2026",
        datesHtml: '<time datetime="2026-04">april 2026</time> <span aria-hidden="true">—</span> <span class="sr-only">to</span> <time datetime="2026-09">september 2026</time>',
        location: "bengaluru, karnataka, india · on-site",
        description: [
          "placement coordinator intern facilitating campus recruitment",
          "managing student–recruiter coordination and accelerating campus hiring pipelines"
        ],
        linkText: "visit jain university",
        linkUrl: "https://www.linkedin.com/in/adhigowda2006/",
        logo: "images/jain-square.svg"
      }
    ]
  },

  projects: {
    heading: "projects",
    items: [
      {
        title: "roadrisk ai",
        category: "ai / iot & safety",
        url: "https://github.com/adhiboss/roadriskai"
      },
      {
        title: "garudapurana ai",
        category: "neural rag / search",
        url: "https://github.com/adhiboss"
      },
      {
        title: "smart system monitor",
        category: "linux / utility",
        url: "https://github.com/adhiboss/smart-system-monitor"
      },
      {
        title: "kernel behavior analyzer",
        category: "kernel / observability",
        url: "https://github.com/adhiboss/kernel-behavior-analyzer"
      },
      {
        title: "flames.exe",
        category: "retro / interactive",
        url: "https://github.com/adhiboss/flames"
      },
      {
        title: "daily tech notes",
        category: "devops / cloud playbooks",
        url: "https://github.com/adhiboss/daily-tech-notes"
      },
      {
        title: "pixel rearranger",
        category: "canvas / algorithms",
        url: "https://github.com/adhiboss/pixel-rearranger"
      },
      {
        title: "top hackathons",
        category: "community / platform",
        url: "https://github.com/adhiboss/hackathons_top"
      }
    ],
    footer: {
      text: "my open source contributions are on",
      linkText: "github",
      linkUrl: "https://github.com/adhiboss"
    }
  },

  research: {
    heading: "research",
    items: [
      {
        title: "v2x emergency ecosystem research (zenodo)",
        description: "accident detection and alert system: collaborative v2x safety ecosystem for smart city emergency response",
        doi: "10.5281/zenodo.19106604",
        url: "https://doi.org/10.5281/zenodo.19106604"
      },
      {
        title: "firmware self-healing framework (osf)",
        description: "firmware self-healing for vehicle-to-everything (v2x) networks: a runtime-triggered autonomous repair framework",
        doi: "10.5281/zenodo.20287607",
        url: "https://doi.org/10.5281/zenodo.20287607"
      }
    ],
    footer: {
      text: "academic research and preprints are indexed on",
      linkText: "google scholar",
      linkUrl: "https://scholar.google.com/citations?user=SPDqnssAAAAJ&hl=en"
    }
  },

  skills: {
    heading: "skills",
    groups: [
      {
        category: "development workflow",
        tech: "ai-assisted development | rapid prototyping | debugging with ai"
      },
      {
        category: "tools & collaboration",
        tech: "chatgpt | claude | vs code | git | github"
      },
      {
        category: "application development",
        tech: "frontend | full-stack applications | ai-powered applications"
      },
      {
        category: "cloud & deployment",
        tech: "aws | cloudflare | deployment | hosting"
      }
    ]
  },

  recognition: {
    heading: "recognition",
    items: [
      {
        title: "crce fet — chenraj roychand center for entrepreneurship",
        result: "president",
        url: "https://www.linkedin.com/in/adhigowda2006/"
      },
      {
        title: "computer society of india",
        result: "executive committee",
        url: "https://www.linkedin.com/in/adhigowda2006/"
      },
      {
        title: "linkedin learning fet",
        result: "brand ambassador",
        url: "https://lnkd.in/p/ddsyKzhY"
      },
      {
        title: "capgemini brand quest 2025 & 2026",
        result: "student ambassador",
        url: "https://lnkd.in/p/ddsyKzhY"
      },
      {
        title: "glug fet ju (fsmk gnu/linux user group)",
        result: "contributor",
        url: "https://www.linkedin.com/company/glug-fet-ju/"
      },
      {
        title: "centre for grassroots research & innovation (gri)",
        result: "secretary",
        url: "https://www.linkedin.com/in/adhigowda2006/"
      }
    ]
  },

  contact: {
    heading: "contact",
    intro: "wanna discuss a project or just say hi?",
    note: "drop a message, i’ll be around",
    links: [
      {
        id: "email",
        label: "email adhi",
        title: "contact@adhiboss.com",
        url: "mailto:contact@adhiboss.com",
        icon: "envelope-open"
      },
      {
        id: "github",
        label: "github",
        title: "github.com/adhiboss",
        url: "https://github.com/adhiboss",
        icon: "github"
      },
      {
        id: "linkedin",
        label: "linkedin",
        title: "linkedin.com/in/adhigowda2006",
        url: "https://www.linkedin.com/in/adhigowda2006/",
        icon: "linkedin"
      },
      {
        id: "scholar",
        label: "google scholar",
        title: "scholar.google.com/citations",
        url: "https://scholar.google.com/citations?user=SPDqnssAAAAJ&hl=en",
        icon: "globe-hemisphere-west"
      }
    ]
  }
};

// Support both ES Modules and global script loading
if (typeof module !== "undefined" && module.exports) {
  module.exports = portfolioData;
} else {
  window.PORTFOLIO_DATA = portfolioData;
}
