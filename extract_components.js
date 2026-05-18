const fs = require('fs');
const lines = fs.readFileSync('app/page.tsx', 'utf8').split('\n');

fs.mkdirSync('components', { recursive: true });

function writeComponent(name, startLine, endLine, imports, prelude = '') {
  const jsx = lines.slice(startLine - 1, endLine).join('\n');
  const code = `"use client";\n\n${imports}\n\nexport default function ${name}() {\n${prelude}\n  return (\n    <>\n${jsx}\n    </>\n  );\n}\n`;
  fs.writeFileSync(`components/${name}.tsx`, code);
}

// Navbar: lines 680 - 751
writeComponent('Navbar', 680, 751, 
  `import { useState, useEffect } from 'react';\nimport { motion, AnimatePresence } from 'framer-motion';\nimport styles from '@/app/page.module.css';`,
  `  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);\n  const [isScrolled, setIsScrolled] = useState(false);\n\n  useEffect(() => {\n    const handleScroll = () => {\n      setIsScrolled(window.scrollY > 50);\n    };\n    window.addEventListener('scroll', handleScroll);\n    return () => window.removeEventListener('scroll', handleScroll);\n  }, []);`
);

// Hero: lines 754 - 827
writeComponent('Hero', 754, 827, 
  `import { motion } from 'framer-motion';\nimport Image from 'next/image';\nimport styles from '@/app/page.module.css';`
);

// About: lines 830 - 873
writeComponent('About', 830, 873,
  `import { motion } from 'framer-motion';\nimport Image from 'next/image';\nimport styles from '@/app/page.module.css';`
);

// Services: lines 876 - 1004
writeComponent('Services', 876, 1004,
  `import { useState } from 'react';\nimport { motion, AnimatePresence } from 'framer-motion';\nimport styles from '@/app/page.module.css';\nimport { servicesList } from '@/data/services';`,
  `  const [activeServiceIndex, setActiveServiceIndex] = useState(0);\n  const [activeSubService, setActiveSubService] = useState<string | null>(null);\n\n  const fadeInUp = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } };\n  const listVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };`
);

// Stylists: lines 1007 - 1116
writeComponent('Stylists', 1007, 1116,
  `import { motion } from 'framer-motion';\nimport Image from 'next/image';\nimport styles from '@/app/page.module.css';`,
  `  const fadeInUp = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } };`
);

// Gallery: lines 1119 - 1197
writeComponent('Gallery', 1119, 1197,
  `import { motion } from 'framer-motion';\nimport Image from 'next/image';\nimport styles from '@/app/page.module.css';`
);

// Results: lines 1200 - 1257
writeComponent('Results', 1200, 1257,
  `import { motion } from 'framer-motion';\nimport Image from 'next/image';\nimport styles from '@/app/page.module.css';`
);

// Booking: lines 1260 - 1317
writeComponent('Booking', 1260, 1317,
  `import { motion } from 'framer-motion';\nimport styles from '@/app/page.module.css';`,
  `  const fadeInUp = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } };`
);

// Footer: lines 1320 - 1372
writeComponent('Footer', 1320, 1372,
  `import Image from 'next/image';\nimport styles from '@/app/page.module.css';`
);

console.log('Successfully created all components!');
