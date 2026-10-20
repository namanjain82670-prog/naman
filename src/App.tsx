import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { ProjectsSection } from './components/ProjectsSection.tsx';
import { ArchitectureSection } from './components/ArchitectureSection.tsx';
import { SkillsSection } from './components/SkillsSection.tsx';
import { ExperienceSection } from './components/ExperienceSection.tsx';
import { InteractiveTerminal } from './components/InteractiveTerminal.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { ResumeModal } from './components/ResumeModal.tsx';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const handleOpenContact = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreProjects = () => {
    const projectsElem = document.getElementById('projects');
    if (projectsElem) {
      projectsElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenTerminal = () => {
    const terminalElem = document.getElementById('terminal');
    if (terminalElem) {
      terminalElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-amber-400 selection:text-zinc-950">
      {/* Top Navbar adhering strictly to 3-zone contract */}
      <Navbar
        onOpenContact={handleOpenContact}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section with Split View, High-Fidelity Workspace & KPI Strip */}
        <Hero
          onOpenContact={handleOpenContact}
          onExploreProjects={handleExploreProjects}
          onOpenTerminal={handleOpenTerminal}
        />

        {/* Featured Projects Bento Grid & Interactive Case Study Modals */}
        <ProjectsSection />

        {/* Interactive Systems Architecture Blueprint */}
        <ArchitectureSection />

        {/* Technical Competencies & Skills Matrix */}
        <SkillsSection />

        {/* Professional Experience & Career Milestones */}
        <ExperienceSection />

        {/* Interactive Developer CLI Shell */}
        <InteractiveTerminal />

        {/* Get in Touch & Direct Messaging Section */}
        <ContactSection onOpenResume={() => setIsResumeOpen(true)} />
      </main>

      {/* Clean Disciplined Footer */}
      <Footer />

      {/* Interactive Resume View & Download Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
