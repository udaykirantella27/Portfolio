const fs = require('fs');
const path = require('path');

function generateResumePdf() {
  const content = [];
  
  // Helper to add text stream commands
  function addText(text, font, size, x, y, r = 0, g = 0, b = 0) {
    const escaped = text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
    return `BT /${font} ${size} Tf ${r} ${g} ${b} rg 1 0 0 1 ${x} ${y} Tm (${escaped}) Tj ET\n`;
  }

  function addLine(x1, y1, x2, y2, r = 0.7, g = 0.7, b = 0.7, width = 1) {
    return `${r} ${g} ${b} RG ${width} w ${x1} ${y1} m ${x2} ${y2} l S\n`;
  }

  let stream = '';

  // Header
  stream += addText('UDAY KIRAN TELLA', 'F1', 20, 50, 790, 0.08, 0.08, 0.08);
  stream += addText('Full Stack Developer | MERN & Next.js Specialist', 'F2', 11, 50, 772, 0.2, 0.5, 0.4);
  stream += addText('Bengaluru, India  |  tellaudaykirann@gmail.com  |  linkedin.com/in/uday-kiran-tella  |  github.com/udaykirantella27', 'F2', 8.5, 50, 755, 0.4, 0.4, 0.4);
  stream += addLine(50, 745, 545, 745, 0.15, 0.5, 0.4, 1.5);

  // Professional Summary
  stream += addText('PROFESSIONAL SUMMARY', 'F1', 11, 50, 725, 0.1, 0.1, 0.1);
  stream += addLine(50, 720, 545, 720, 0.85, 0.85, 0.85, 0.8);
  stream += addText('Full Stack Developer with hands-on experience in building responsive web applications, operational dashboards, and', 'F2', 9, 50, 705, 0.2, 0.2, 0.2);
  stream += addText('reliable RESTful APIs. Proficient in React, Next.js, Node.js, Express, MongoDB, PostgreSQL, and modern cloud deployment.', 'F2', 9, 50, 693, 0.2, 0.2, 0.2);
  stream += addText('Demonstrated track record in shipping live production platforms with measurable conversion and performance gains.', 'F2', 9, 50, 681, 0.2, 0.2, 0.2);

  // Technical Skills
  stream += addText('CORE TECHNICAL SKILLS', 'F1', 11, 50, 658, 0.1, 0.1, 0.1);
  stream += addLine(50, 653, 545, 653, 0.85, 0.85, 0.85, 0.8);
  stream += addText('• Frontend: React.js, Next.js 14, TypeScript, JavaScript (ES6+), HTML5, CSS3/CSS Modules, Tailwind CSS, Framer Motion', 'F2', 9, 50, 638, 0.2, 0.2, 0.2);
  stream += addText('• Backend & APIs: Node.js, Express.js, RESTful Architecture, Server Actions, Middleware, JWT, RBAC Authorization', 'F2', 9, 50, 624, 0.2, 0.2, 0.2);
  stream += addText('• Databases & Tools: MongoDB, PostgreSQL, Supabase, Git, GitHub Actions, Vercel, Vite, Postman, Jest', 'F2', 9, 50, 610, 0.2, 0.2, 0.2);

  // Work Experience
  stream += addText('WORK EXPERIENCE', 'F1', 11, 50, 587, 0.1, 0.1, 0.1);
  stream += addLine(50, 582, 545, 582, 0.85, 0.85, 0.85, 0.8);

  // Role 1
  stream += addText('Associate Software Developer', 'F1', 10, 50, 567, 0.1, 0.1, 0.1);
  stream += addText('Zihwa Insights — Bengaluru, India', 'F2', 9.5, 50, 554, 0.3, 0.3, 0.3);
  stream += addText('2024 — Present', 'F2', 9, 475, 567, 0.4, 0.4, 0.4);
  stream += addText('• Architected and shipped scalable commerce and CRM workflows using Next.js, Node.js, Supabase, and PostgreSQL.', 'F2', 8.5, 55, 539, 0.25, 0.25, 0.25);
  stream += addText('• Implemented database-level Row-Level Security (RLS) and Role-Based Access Control (RBAC) across multi-tenant views.', 'F2', 8.5, 55, 527, 0.25, 0.25, 0.25);
  stream += addText('• Optimized server-side rendered (SSR) endpoints, cutting median page load times and reducing server response latency by 20%.', 'F2', 8.5, 55, 515, 0.25, 0.25, 0.25);
  stream += addText('• Collaborated across engineering and product sprints in an Agile cadence, maintaining rigorous code quality and tests.', 'F2', 8.5, 55, 503, 0.25, 0.25, 0.25);

  // Role 2
  stream += addText('Frontend Engineering Intern', 'F1', 10, 50, 483, 0.1, 0.1, 0.1);
  stream += addText('Ve-Lyra Labs — Bengaluru, India', 'F2', 9.5, 50, 470, 0.3, 0.3, 0.3);
  stream += addText('2023 — 2024', 'F2', 9, 485, 483, 0.4, 0.4, 0.4);
  stream += addText('• Engineered responsive healthcare analytics dashboards and reusable UI components in React with strict WCAG compliance.', 'F2', 8.5, 55, 455, 0.25, 0.25, 0.25);
  stream += addText('• Integrated secure REST endpoints for patient telemetry data, achieving seamless zero-CLS data visualization updates.', 'F2', 8.5, 55, 443, 0.25, 0.25, 0.25);

  // Selected Projects
  stream += addText('PRODUCTION PROJECTS & CASE STUDIES', 'F1', 11, 50, 420, 0.1, 0.1, 0.1);
  stream += addLine(50, 415, 545, 415, 0.85, 0.85, 0.85, 0.8);

  // Project 1
  stream += addText('Stalks N Spice | Full Stack Commerce Engine', 'F1', 9.5, 50, 400, 0.1, 0.1, 0.1);
  stream += addText('Next.js, React, Node.js, Supabase, PostgreSQL, Razorpay', 'F2', 8.5, 50, 388, 0.4, 0.4, 0.4);
  stream += addText('• Built high-velocity e-commerce store with optimistic cart synchronization and sub-220ms edge server-rendered delivery.', 'F2', 8.5, 55, 375, 0.25, 0.25, 0.25);
  stream += addText('• Achieved +38% completed checkout conversion and 99.9% uptime across peak promotional order periods.', 'F2', 8.5, 55, 363, 0.25, 0.25, 0.25);

  // Project 2
  stream += addText('Distribution Intelligence Network (DIN) | Enterprise Operations Portal', 'F1', 9.5, 50, 345, 0.1, 0.1, 0.1);
  stream += addText('React, Node.js, Express, MongoDB, Redis, JWT/RBAC', 'F2', 8.5, 50, 333, 0.4, 0.4, 0.4);
  stream += addText('• Centralized seller command console managing multi-warehouse stock, transit handoffs, and real-time ledger updates.', 'F2', 8.5, 55, 320, 0.25, 0.25, 0.25);
  stream += addText('• Reduced inventory discrepancy rates by 62% with indexed MongoDB compound aggregations and optimistic locks.', 'F2', 8.5, 55, 308, 0.25, 0.25, 0.25);

  // Project 3
  stream += addText('AACP Infrastructure Systems | Corporate EPC Showcase', 'F1', 9.5, 50, 290, 0.1, 0.1, 0.1);
  stream += addText('Next.js, TypeScript, SSR, Cloudflare CDN, Framer Motion', 'F2', 8.5, 50, 278, 0.4, 0.4, 0.4);
  stream += addText('• Production corporate platform with 98/100 Lighthouse performance and 3.4x surge in qualified tender RFP submissions.', 'F2', 8.5, 55, 265, 0.25, 0.25, 0.25);

  // Education & Credentials
  stream += addText('EDUCATION & CERTIFICATIONS', 'F1', 11, 50, 238, 0.1, 0.1, 0.1);
  stream += addLine(50, 233, 545, 233, 0.85, 0.85, 0.85, 0.8);
  stream += addText('Bachelor of Technology (B.Tech) in Computer Science & Engineering', 'F1', 9.5, 50, 218, 0.1, 0.1, 0.1);
  stream += addText('Visvesvaraya Technological University (VTU)  |  CGPA: 8.2 / 10  |  2019 — 2023', 'F2', 8.5, 50, 206, 0.35, 0.35, 0.35);
  stream += addText('• Certifications: Meta Certified Front-End Developer, MongoDB Node.js Developer, AWS Cloud Practitioner (Foundational)', 'F2', 8.5, 50, 192, 0.25, 0.25, 0.25);

  // Footer note
  stream += addText('Portfolio & Case Studies: https://udaykiran.dev  |  Updated Production Edition', 'F2', 8, 175, 140, 0.5, 0.5, 0.5);

  // Build PDF Binary Objects
  const streamBuf = Buffer.from(stream, 'utf-8');
  
  const objects = [];
  objects[1] = `<< /Type /Catalog /Pages 2 0 R >>`;
  objects[2] = `<< /Type /Pages /Kids [3 0 R] /Count 1 >>`;
  objects[3] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>`;
  objects[4] = `<< /Length ${streamBuf.length} >>\nstream\n${stream}endstream`;
  objects[5] = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>`;
  objects[6] = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`;

  let pdfData = `%PDF-1.4\n`;
  const offsets = [];

  for (let i = 1; i <= 6; i++) {
    offsets[i] = Buffer.byteLength(pdfData, 'utf-8');
    pdfData += `${i} 0 obj\n${objects[i]}\nendobj\n`;
  }

  const xrefStart = Buffer.byteLength(pdfData, 'utf-8');
  pdfData += `xref\n0 7\n0000000000 65535 f \n`;
  for (let i = 1; i <= 6; i++) {
    pdfData += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  pdfData += `trailer\n<< /Size 7 /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;

  const publicDir = path.join(__dirname, '..', 'public');
  fs.writeFileSync(path.join(publicDir, 'Uday_Kiran_Tella_Resume_MSD.pdf'), pdfData, 'binary');
  fs.writeFileSync(path.join(publicDir, 'resume.pdf'), pdfData, 'binary');

  console.log('Successfully generated Uday_Kiran_Tella_Resume_MSD.pdf and resume.pdf in public folder!');
}

generateResumePdf();

