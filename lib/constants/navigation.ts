/**
 * Navigation-related constants
 */

export const NAVIGATION = {
  MAIN: [
    {
      title: "SAP Solutions",
      href: "/sap-solutions",
      children: [
        {
          title: "SAP Business One",
          description: "Complete ERP solution for small and medium enterprises",
          href: "/sap-solutions/business-one",
          icon: "Database",
        },
        {
          title: "SAP Business One Cloud",
          description: "Cloud-based ERP solution with flexible deployment",
          href: "/sap-solutions/business-one-cloud",
          icon: "Cloud",
        },
        {
          title: "SAP HANA",
          description: "In-memory database and analytics platform",
          href: "/sap-solutions/hana",
          icon: "BarChart",
        },
        {
          title: "ERP Planning",
          description: "End-to-end SAP implementation and support",
          href: "/sap-solutions/erp-planning",
          icon: "Settings",
        },
      ],
    },
    {
      title: "Automation Solutions",
      href: "/automation-solutions",
      children: [
        {
          title: "RPA Solutions",
          description: "Robotic process automation for business efficiency",
          href: "/automation-solutions/rpa-solutions",
          icon: "Bot",
        },
        {
          title: "Workflow Automation",
          description: "Streamline business processes with automated workflows",
          href: "/automation-solutions/workflow-automation",
          icon: "Workflow",
        },
        {
          title: "UiPath Solutions",
          description: "Enterprise automation with UiPath platform",
          href: "/automation-solutions/ui-path",
          icon: "Settings",
        },
      ],
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Careers",
      href: "/careers",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ],
  FOOTER: [
    {
      title: "Solutions",
      links: [
        { title: "SAP Business One", href: "/sap-solutions/business-one" },
        { title: "SAP HANA", href: "/sap-solutions/hana" },
        { title: "RPA Solutions", href: "/automation-solutions/rpa-solutions" },
        { title: "Workflow Automation", href: "/automation-solutions/workflow-automation" },
      ],
    },
    {
      title: "Company",
      links: [
        { title: "About Us", href: "/about" },
        { title: "Careers", href: "/careers" },
        { title: "Blog", href: "/blog" },
        { title: "Contact", href: "/contact" },
        { title: "FAQ", href: "/faq" },
      ],
    },
    {
      title: "Legal",
      links: [
        { title: "Privacy Policy", href: "/privacy" },
        { title: "Terms of Service", href: "/terms" },
      ],
    },
  ],
} 