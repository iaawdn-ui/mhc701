import React, { useState, useRef, useEffect } from 'react';
import { chapters } from './data/chapters';
import { chapter1Content, chapter2Content } from './content/chapters1-2';
import { chapter3Content, chapter4Content } from './content/chapters3-4';
import { chapter5Content, chapter6Content } from './content/chapters5-6';
import { chapter7Content, chapter8Content, chapter9Content, chapter10Content } from './content/chapters7-10';
import { chapter11Content, chapter12Content, chapter13Content, chapter14Content } from './content/chapters11-14';
import { chapter15Content, chapter16Content, chapter17Content, chapter18Content } from './content/chapters15-18';
import { prefaceContent } from './content/preface';
import { caseStudies, additionalContent } from './content/supplementary';

// Content map (0 = preface, 1-18 = chapters, 19 = case studies, 20 = appendices)
const contentMap: Record<number, string> = {
  0: prefaceContent,
  1: chapter1Content.introduction,
  2: chapter2Content,
  3: chapter3Content,
  4: chapter4Content,
  5: chapter5Content,
  6: chapter6Content,
  7: chapter7Content,
  8: chapter8Content,
  9: chapter9Content,
  10: chapter10Content,
  11: chapter11Content,
  12: chapter12Content,
  13: chapter13Content,
  14: chapter14Content,
  15: chapter15Content,
  16: chapter16Content,
  17: chapter17Content,
  18: chapter18Content,
  19: caseStudies,
  20: additionalContent,
};

// SVG Diagram Components
const CounselingProcessDiagram: React.FC = () => (
  <svg viewBox="0 0 800 400" className="w-full max-w-4xl mx-auto my-8">
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#1e40af', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#065f46', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#7c2d12', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#f97316', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <text x="400" y="30" textAnchor="middle" className="text-lg font-bold" fill="#1e293b">The Counseling Process Model</text>
    {/* Phase boxes */}
    <rect x="30" y="60" width="130" height="80" rx="10" fill="url(#grad1)" />
    <text x="95" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Phase 1</text>
    <text x="95" y="115" textAnchor="middle" fill="white" fontSize="10">Relationship</text>
    <text x="95" y="130" textAnchor="middle" fill="white" fontSize="10">Building</text>

    <rect x="180" y="60" width="130" height="80" rx="10" fill="url(#grad1)" />
    <text x="245" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Phase 2</text>
    <text x="245" y="115" textAnchor="middle" fill="white" fontSize="10">Assessment &</text>
    <text x="245" y="130" textAnchor="middle" fill="white" fontSize="10">Problem ID</text>

    <rect x="330" y="60" width="130" height="80" rx="10" fill="url(#grad2)" />
    <text x="395" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Phase 3</text>
    <text x="395" y="115" textAnchor="middle" fill="white" fontSize="10">Goal Setting &</text>
    <text x="395" y="130" textAnchor="middle" fill="white" fontSize="10">Treatment Plan</text>

    <rect x="480" y="60" width="130" height="80" rx="10" fill="url(#grad2)" />
    <text x="545" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Phase 4</text>
    <text x="545" y="115" textAnchor="middle" fill="white" fontSize="10">Intervention &</text>
    <text x="545" y="130" textAnchor="middle" fill="white" fontSize="10">Treatment</text>

    <rect x="630" y="60" width="130" height="80" rx="10" fill="url(#grad3)" />
    <text x="695" y="95" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Phase 5</text>
    <text x="695" y="115" textAnchor="middle" fill="white" fontSize="10">Evaluation &</text>
    <text x="695" y="130" textAnchor="middle" fill="white" fontSize="10">Termination</text>

    {/* Arrows */}
    <path d="M160 100 L180 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />
    <path d="M310 100 L330 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />
    <path d="M460 100 L480 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />
    <path d="M610 100 L630 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />

    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
      </marker>
    </defs>

    {/* Feedback loop */}
    <path d="M695 140 L695 200 Q695 220 675 220 L115 220 Q95 220 95 200 L95 140" stroke="#94a3b8" strokeWidth="2" fill="none" strokeDasharray="5,5" />
    <text x="400" y="250" textAnchor="middle" fill="#64748b" fontSize="11" fontStyle="italic">Continuous feedback and adjustment throughout the process</text>

    {/* Key activities */}
    <rect x="30" y="280" width="730" height="100" rx="8" fill="#f8fafc" stroke="#e2e8f0" />
    <text x="50" y="305" fill="#1e293b" fontSize="11" fontWeight="bold">Key Activities at Each Phase:</text>
    <text x="50" y="325" fill="#475569" fontSize="10">• Rapport building • Informed consent • Biopsychosocial assessment • Mental status exam • Risk assessment</text>
    <text x="50" y="345" fill="#475569" fontSize="10">• SMART goal setting • Treatment planning • Evidence-based interventions • Progress monitoring • Outcome evaluation</text>
    <text x="50" y="365" fill="#475569" fontSize="10">• Cultural responsiveness • Collaborative approach • Client self-determination • Documentation • Referral as needed</text>
  </svg>
);

const TheoreticalOrientationsDiagram: React.FC = () => (
  <svg viewBox="0 0 800 500" className="w-full max-w-4xl mx-auto my-8">
    <text x="400" y="30" textAnchor="middle" className="text-lg font-bold" fill="#1e293b">Major Theoretical Orientations in Counseling</text>
    
    {/* Central circle */}
    <circle cx="400" cy="250" r="60" fill="#1e40af" opacity="0.1" stroke="#1e40af" strokeWidth="2" />
    <text x="400" y="245" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">Counseling</text>
    <text x="400" y="265" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">Theory</text>

    {/* Psychoanalytic */}
    <circle cx="200" cy="120" r="70" fill="#7c3aed" opacity="0.1" stroke="#7c3aed" strokeWidth="2" />
    <text x="200" y="110" textAnchor="middle" fill="#7c3aed" fontSize="11" fontWeight="bold">Psychoanalytic/</text>
    <text x="200" y="128" textAnchor="middle" fill="#7c3aed" fontSize="11" fontWeight="bold">Psychodynamic</text>
    <text x="200" y="148" textAnchor="middle" fill="#6b21a8" fontSize="9">Unconscious • Past</text>
    <text x="200" y="163" textAnchor="middle" fill="#6b21a8" fontSize="9">Insight • Interpretation</text>
    <line x1="260" y1="155" x2="350" y2="220" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="3,3" />

    {/* Person-Centered */}
    <circle cx="600" cy="120" r="70" fill="#059669" opacity="0.1" stroke="#059669" strokeWidth="2" />
    <text x="600" y="110" textAnchor="middle" fill="#059669" fontSize="11" fontWeight="bold">Person-Centered</text>
    <text x="600" y="128" textAnchor="middle" fill="#059669" fontSize="11" fontWeight="bold">(Humanistic)</text>
    <text x="600" y="148" textAnchor="middle" fill="#047857" fontSize="9">Empathy • UPR</text>
    <text x="600" y="163" textAnchor="middle" fill="#047857" fontSize="9">Congruence • Growth</text>
    <line x1="540" y1="155" x2="450" y2="220" stroke="#059669" strokeWidth="1.5" strokeDasharray="3,3" />

    {/* CBT */}
    <circle cx="200" cy="380" r="70" fill="#dc2626" opacity="0.1" stroke="#dc2626" strokeWidth="2" />
    <text x="200" y="370" textAnchor="middle" fill="#dc2626" fontSize="11" fontWeight="bold">Cognitive-</text>
    <text x="200" y="388" textAnchor="middle" fill="#dc2626" fontSize="11" fontWeight="bold">Behavioral</text>
    <text x="200" y="408" textAnchor="middle" fill="#b91c1c" fontSize="9">Thoughts • Behaviors</text>
    <text x="200" y="423" textAnchor="middle" fill="#b91c1c" fontSize="9">Skills • Evidence</text>
    <line x1="260" y1="345" x2="350" y2="280" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3,3" />

    {/* Systems */}
    <circle cx="600" cy="380" r="70" fill="#d97706" opacity="0.1" stroke="#d97706" strokeWidth="2" />
    <text x="600" y="370" textAnchor="middle" fill="#d97706" fontSize="11" fontWeight="bold">Systems</text>
    <text x="600" y="388" textAnchor="middle" fill="#d97706" fontSize="11" fontWeight="bold">Theory</text>
    <text x="600" y="408" textAnchor="middle" fill="#b45309" fontSize="9">Relationships • Context</text>
    <text x="600" y="423" textAnchor="middle" fill="#b45309" fontSize="9">Patterns • Wholeness</text>
    <line x1="540" y1="345" x2="450" y2="280" stroke="#d97706" strokeWidth="1.5" strokeDasharray="3,3" />

    {/* Integrative */}
    <circle cx="400" cy="430" r="50" fill="#0891b2" opacity="0.1" stroke="#0891b2" strokeWidth="2" />
    <text x="400" y="425" textAnchor="middle" fill="#0891b2" fontSize="11" fontWeight="bold">Integrative/</text>
    <text x="400" y="443" textAnchor="middle" fill="#0891b2" fontSize="11" fontWeight="bold">Eclectic</text>
    <line x1="400" y1="380" x2="400" y2="310" stroke="#0891b2" strokeWidth="1.5" strokeDasharray="3,3" />
  </svg>
);

const BiopsychosocialDiagram: React.FC = () => (
  <svg viewBox="0 0 600 500" className="w-full max-w-3xl mx-auto my-8">
    <text x="300" y="30" textAnchor="middle" className="text-lg font-bold" fill="#1e293b">Biopsychosocial Assessment Model</text>
    
    {/* Biological */}
    <circle cx="300" cy="180" r="100" fill="#dc2626" opacity="0.08" stroke="#dc2626" strokeWidth="2" />
    <text x="300" y="140" textAnchor="middle" fill="#dc2626" fontSize="14" fontWeight="bold">BIOLOGICAL</text>
    <text x="300" y="165" textAnchor="middle" fill="#991b1b" fontSize="10">• Medical history</text>
    <text x="300" y="182" textAnchor="middle" fill="#991b1b" fontSize="10">• Medications</text>
    <text x="300" y="199" textAnchor="middle" fill="#991b1b" fontSize="10">• Substance use</text>
    <text x="300" y="216" textAnchor="middle" fill="#991b1b" fontSize="10">• Sleep/Nutrition</text>
    <text x="300" y="233" textAnchor="middle" fill="#991b1b" fontSize="10">• Genetics</text>

    {/* Psychological */}
    <circle cx="180" cy="340" r="100" fill="#1e40af" opacity="0.08" stroke="#1e40af" strokeWidth="2" />
    <text x="180" y="300" textAnchor="middle" fill="#1e40af" fontSize="14" fontWeight="bold">PSYCHOLOGICAL</text>
    <text x="180" y="325" textAnchor="middle" fill="#1e3a8a" fontSize="10">• Symptoms</text>
    <text x="180" y="342" textAnchor="middle" fill="#1e3a8a" fontSize="10">• Coping strategies</text>
    <text x="180" y="359" textAnchor="middle" fill="#1e3a8a" fontSize="10">• Trauma history</text>
    <text x="180" y="376" textAnchor="middle" fill="#1e3a8a" fontSize="10">• Self-concept</text>
    <text x="180" y="393" textAnchor="middle" fill="#1e3a8a" fontSize="10">• Emotional regulation</text>

    {/* Social */}
    <circle cx="420" cy="340" r="100" fill="#059669" opacity="0.08" stroke="#059669" strokeWidth="2" />
    <text x="420" y="300" textAnchor="middle" fill="#059669" fontSize="14" fontWeight="bold">SOCIAL</text>
    <text x="420" y="325" textAnchor="middle" fill="#047857" fontSize="10">• Family relationships</text>
    <text x="420" y="342" textAnchor="middle" fill="#047857" fontSize="10">• Social support</text>
    <text x="420" y="359" textAnchor="middle" fill="#047857" fontSize="10">• Work/School</text>
    <text x="420" y="376" textAnchor="middle" fill="#047857" fontSize="10">• Cultural context</text>
    <text x="420" y="393" textAnchor="middle" fill="#047857" fontSize="10">• Environment</text>

    {/* Center intersection */}
    <text x="300" y="290" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="bold">CLIENT</text>
  </svg>
);

const EthicalDecisionDiagram: React.FC = () => (
  <svg viewBox="0 0 700 350" className="w-full max-w-4xl mx-auto my-8">
    <text x="350" y="25" textAnchor="middle" className="text-lg font-bold" fill="#1e293b">Ethical Decision-Making Model</text>
    
    {/* Steps in a flow */}
    {[
      { x: 50, y: 60, label: "1. Identify\nthe Problem", color: "#1e40af" },
      { x: 190, y: 60, label: "2. Identify\nStakeholders", color: "#1e40af" },
      { x: 330, y: 60, label: "3. Review\nEthical Codes", color: "#1e40af" },
      { x: 470, y: 60, label: "4. Consider\nContext", color: "#1e40af" },
      { x: 610, y: 60, label: "5. Generate\nOptions", color: "#1e40af" },
    ].map((step, i) => (
      <g key={i}>
        <rect x={step.x} y={step.y} width="100" height="60" rx="8" fill={step.color} opacity="0.9" />
        <text x={step.x + 50} y={step.y + 25} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
          {step.label.split('\n')[0]}
        </text>
        <text x={step.x + 50} y={step.y + 42} textAnchor="middle" fill="white" fontSize="10">
          {step.label.split('\n')[1]}
        </text>
        {i < 4 && (
          <path d={`M${step.x + 100} ${step.y + 30} L${step.x + 140} ${step.y + 30}`} stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
        )}
      </g>
    ))}
    
    {/* Second row */}
    {[
      { x: 610, y: 180, label: "6. Evaluate\nOptions", color: "#059669" },
      { x: 470, y: 180, label: "7. Seek\nConsultation", color: "#059669" },
      { x: 330, y: 180, label: "8. Make\nDecision", color: "#059669" },
      { x: 190, y: 180, label: "9. Implement\nDecision", color: "#059669" },
      { x: 50, y: 180, label: "10. Evaluate\nOutcome", color: "#059669" },
    ].map((step, i) => (
      <g key={`s${i}`}>
        <rect x={step.x} y={step.y} width="100" height="60" rx="8" fill={step.color} opacity="0.9" />
        <text x={step.x + 50} y={step.y + 25} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
          {step.label.split('\n')[0]}
        </text>
        <text x={step.x + 50} y={step.y + 42} textAnchor="middle" fill="white" fontSize="10">
          {step.label.split('\n')[1]}
        </text>
      </g>
    ))}

    {/* Connecting arrows */}
    <path d="M660 120 L660 180" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
    <path d="M610 210 L570 210" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
    <path d="M470 210 L430 210" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
    <path d="M330 210 L290 210" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
    <path d="M190 210 L150 210" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />

    <defs>
      <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
      </marker>
    </defs>

    {/* Key principles */}
    <rect x="50" y="270" width="600" height="60" rx="8" fill="#f8fafc" stroke="#e2e8f0" />
    <text x="350" y="290" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="bold">Guiding Ethical Principles:</text>
    <text x="350" y="310" textAnchor="middle" fill="#475569" fontSize="10">Autonomy • Nonmaleficence • Beneficence • Justice • Fidelity • Veracity</text>
  </svg>
);

const CrisisInterventionDiagram: React.FC = () => (
  <svg viewBox="0 0 700 300" className="w-full max-w-4xl mx-auto my-8">
    <text x="350" y="25" textAnchor="middle" className="text-lg font-bold" fill="#1e293b">Roberts' Seven-Stage Crisis Intervention Model</text>
    
    {[
      { x: 20, y: 50, w: 180, label: "1. Plan & Conduct\n   Crisis Assessment", color: "#dc2626" },
      { x: 20, y: 110, w: 180, label: "2. Establish Rapport\n   & Relationship", color: "#ea580c" },
      { x: 20, y: 170, w: 180, label: "3. Identify Major\n   Problems", color: "#d97706" },
      { x: 250, y: 50, w: 180, label: "4. Deal with Feelings\n   & Emotions", color: "#059669" },
      { x: 250, y: 110, w: 180, label: "5. Generate &\n   Explore Alternatives", color: "#0891b2" },
      { x: 250, y: 170, w: 180, label: "6. Develop an\n   Action Plan", color: "#1e40af" },
      { x: 480, y: 110, w: 180, label: "7. Follow-Up\n   & Aftercare", color: "#7c3aed" },
    ].map((step, i) => (
      <g key={i}>
        <rect x={step.x} y={step.y} width={step.w} height="50" rx="8" fill={step.color} opacity="0.85" />
        <text x={step.x + step.w/2} y={step.y + 22} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
          {step.label.split('\n')[0]}
        </text>
        <text x={step.x + step.w/2} y={step.y + 38} textAnchor="middle" fill="white" fontSize="10">
          {step.label.split('\n')[1]}
        </text>
      </g>
    ))}

    {/* Arrows */}
    <path d="M110 100 L110 110" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#crisisArrow)" />
    <path d="M110 160 L110 170" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#crisisArrow)" />
    <path d="M200 75 L250 75" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#crisisArrow)" />
    <path d="M340 100 L340 110" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#crisisArrow)" />
    <path d="M340 160 L340 170" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#crisisArrow)" />
    <path d="M430 135 L480 135" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#crisisArrow)" />

    <defs>
      <marker id="crisisArrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
      </marker>
    </defs>

    {/* Safety note */}
    <rect x="480" y="200" width="180" height="60" rx="8" fill="#fef2f2" stroke="#fca5a5" />
    <text x="570" y="225" textAnchor="middle" fill="#991b1b" fontSize="10" fontWeight="bold">⚠️ Always assess</text>
    <text x="570" y="242" textAnchor="middle" fill="#991b1b" fontSize="10">for safety/lethality</text>
    <text x="570" y="255" textAnchor="middle" fill="#991b1b" fontSize="10">at every stage</text>
  </svg>
);

const LevelsOfCareDiagram: React.FC = () => (
  <svg viewBox="0 0 600 400" className="w-full max-w-3xl mx-auto my-8">
    <text x="300" y="25" textAnchor="middle" className="text-lg font-bold" fill="#1e293b">Continuum of Mental Health Care</text>
    
    {/* Pyramid levels */}
    <polygon points="300,50 200,100 400,100" fill="#059669" opacity="0.8" />
    <text x="300" y="85" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Prevention</text>

    <polygon points="200,100 160,160 440,160 400,100" fill="#0891b2" opacity="0.8" />
    <text x="300" y="138" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Early Intervention</text>

    <polygon points="160,160 120,220 480,220 440,160" fill="#1e40af" opacity="0.8" />
    <text x="300" y="198" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Outpatient Treatment</text>

    <polygon points="120,220 80,280 520,280 480,220" fill="#7c3aed" opacity="0.8" />
    <text x="300" y="258" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Intensive Outpatient / Partial Hospitalization</text>

    <polygon points="80,280 40,340 560,340 520,280" fill="#dc2626" opacity="0.8" />
    <text x="300" y="318" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Inpatient / Residential / Crisis Stabilization</text>

    {/* Labels on right */}
    <text x="560" y="80" fill="#059669" fontSize="8">Universal</text>
    <text x="560" y="140" fill="#0891b2" fontSize="8">At-Risk</text>
    <text x="560" y="200" fill="#1e40af" fontSize="8">Mild-Moderate</text>
    <text x="560" y="260" fill="#7c3aed" fontSize="8">Moderate-Severe</text>
    <text x="560" y="320" fill="#dc2626" fontSize="8">Severe/Acute</text>
  </svg>
);

const SupervisionModelDiagram: React.FC = () => (
  <svg viewBox="0 0 600 350" className="w-full max-w-3xl mx-auto my-8">
    <text x="300" y="25" textAnchor="middle" className="text-lg font-bold" fill="#1e293b">Three Functions of Clinical Supervision</text>
    
    {/* Three overlapping circles */}
    <circle cx="220" cy="180" r="100" fill="#1e40af" opacity="0.15" stroke="#1e40af" strokeWidth="2" />
    <circle cx="380" cy="180" r="100" fill="#059669" opacity="0.15" stroke="#059669" strokeWidth="2" />
    <circle cx="300" cy="280" r="100" fill="#d97706" opacity="0.15" stroke="#d97706" strokeWidth="2" />

    {/* Labels */}
    <text x="180" y="140" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">NORMATIVE</text>
    <text x="180" y="160" textAnchor="middle" fill="#1e40af" fontSize="10">(Administrative)</text>
    <text x="180" y="180" textAnchor="middle" fill="#1e3a8a" fontSize="9">• Quality control</text>
    <text x="180" y="195" textAnchor="middle" fill="#1e3a8a" fontSize="9">• Gatekeeping</text>
    <text x="180" y="210" textAnchor="middle" fill="#1e3a8a" fontSize="9">• Ethics monitoring</text>

    <text x="420" y="140" textAnchor="middle" fill="#059669" fontSize="12" fontWeight="bold">FORMATIVE</text>
    <text x="420" y="160" textAnchor="middle" fill="#059669" fontSize="10">(Educational)</text>
    <text x="420" y="180" textAnchor="middle" fill="#047857" fontSize="9">• Skill development</text>
    <text x="420" y="195" textAnchor="middle" fill="#047857" fontSize="9">• Knowledge building</text>
    <text x="420" y="210" textAnchor="middle" fill="#047857" fontSize="9">• Clinical judgment</text>

    <text x="300" y="310" textAnchor="middle" fill="#d97706" fontSize="12" fontWeight="bold">RESTORATIVE</text>
    <text x="300" y="330" textAnchor="middle" fill="#d97706" fontSize="10">(Supportive)</text>

    {/* Center */}
    <circle cx="300" cy="210" r="30" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
    <text x="300" y="207" textAnchor="middle" fill="#1e293b" fontSize="9" fontWeight="bold">Effective</text>
    <text x="300" y="220" textAnchor="middle" fill="#1e293b" fontSize="9" fontWeight="bold">Supervision</text>
  </svg>
);

// Chapter Images
const ChapterImage: React.FC<{ chapterId: number }> = ({ chapterId }) => {
  const images: Record<number, { src: string; alt: string; caption: string }> = {
    1: { src: 'https://image.qwenlm.ai/generated-images/1c69f035-2b96-49ee-8724-228a2a73dd89/_result.png', alt: 'Mental Health Counseling', caption: 'Figure 1.1: The field of mental health counseling encompasses diverse practice settings and populations' },
    3: { src: 'https://image.qwenlm.ai/generated-images/0138918e-7be5-4bc2-b0b0-951af2f57cc3/_result.png', alt: 'Counseling Session', caption: 'Figure 3.1: The therapeutic relationship is the foundation of effective counseling' },
    5: { src: 'https://image.qwenlm.ai/generated-images/cc96b83a-8b0a-4e3f-9845-7bdd235f60bd/_result.png', alt: 'Brain and Mental Health', caption: 'Figure 5.1: Understanding brain-behavior relationships informs theoretical approaches to counseling' },
    8: { src: 'https://image.qwenlm.ai/generated-images/68e613f9-deae-46a9-81d8-df5c72bc9b93/_result.png', alt: 'Diverse Group', caption: 'Figure 8.1: Cultural competence requires understanding and respecting diverse perspectives' },
  };

  const img = images[chapterId];
  if (!img) return null;

  return (
    <figure className="my-8 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
      <img src={img.src} alt={img.alt} className="w-full h-48 object-cover" 
        onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none'; }}
      />
      <figcaption className="bg-gray-50 px-4 py-3 text-sm text-gray-600 italic border-t">
        {img.caption}
      </figcaption>
    </figure>
  );
};

// Additional Diagrams
const TimelineDiagram: React.FC = () => (
  <svg viewBox="0 0 800 200" className="w-full max-w-4xl mx-auto my-8">
    <text x="400" y="20" textAnchor="middle" className="text-lg font-bold" fill="#1e293b">History of Mental Health Counseling</text>
    <line x1="50" y1="100" x2="750" y2="100" stroke="#cbd5e1" strokeWidth="3" />
    {[
      { x: 80, year: "1908", label: "Parsons\nVocational\nGuidance" },
      { x: 200, year: "1942", label: "APGA\nFounded" },
      { x: 320, year: "1963", label: "Community\nMental Health\nAct" },
      { x: 440, year: "1981", label: "CACREP\nEstablished" },
      { x: 560, year: "2009", label: "All States\nLicensed" },
      { x: 680, year: "2020s", label: "Telehealth\n& Integration" },
    ].map((point, i) => (
      <g key={i}>
        <circle cx={point.x} cy="100" r="8" fill="#1e40af" />
        <text x={point.x} y="80" textAnchor="middle" fill="#1e40af" fontSize="10" fontWeight="bold">{point.year}</text>
        <text x={point.x} y="130" textAnchor="middle" fill="#475569" fontSize="8">
          {point.label.split('\n').map((line, j) => (
            <tspan key={j} x={point.x} dy={j === 0 ? 0 : 12}>{line}</tspan>
          ))}
        </text>
      </g>
    ))}
  </svg>
);

const CommunicationModelDiagram: React.FC = () => (
  <svg viewBox="0 0 600 300" className="w-full max-w-3xl mx-auto my-8">
    <text x="300" y="20" textAnchor="middle" className="text-lg font-bold" fill="#1e293b">Core Communication Skills in Counseling</text>
    
    {/* Central hub */}
    <circle cx="300" cy="160" r="40" fill="#1e40af" opacity="0.1" stroke="#1e40af" strokeWidth="2" />
    <text x="300" y="155" textAnchor="middle" fill="#1e40af" fontSize="10" fontWeight="bold">Active</text>
    <text x="300" y="170" textAnchor="middle" fill="#1e40af" fontSize="10" fontWeight="bold">Listening</text>

    {/* Surrounding skills */}
    {[
      { x: 120, y: 80, label: "Questioning", color: "#7c3aed" },
      { x: 480, y: 80, label: "Reflecting", color: "#059669" },
      { x: 120, y: 240, label: "Paraphrasing", color: "#d97706" },
      { x: 480, y: 240, label: "Summarizing", color: "#dc2626" },
      { x: 300, y: 50, label: "Attending", color: "#0891b2" },
      { x: 300, y: 270, label: "Immediacy", color: "#be185d" },
    ].map((skill, i) => (
      <g key={i}>
        <rect x={skill.x - 45} y={skill.y - 15} width="90" height="30" rx="15" fill={skill.color} opacity="0.15" stroke={skill.color} strokeWidth="1.5" />
        <text x={skill.x} y={skill.y + 5} textAnchor="middle" fill={skill.color} fontSize="10" fontWeight="bold">{skill.label}</text>
        <line x1={skill.x} y1={skill.y + (skill.y < 160 ? 15 : -15)} x2="300" y2={skill.y < 160 ? 125 : 195} stroke={skill.color} strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
      </g>
    ))}
  </svg>
);

const TreatmentPlanDiagram: React.FC = () => (
  <svg viewBox="0 0 700 250" className="w-full max-w-4xl mx-auto my-8">
    <text x="350" y="20" textAnchor="middle" className="text-lg font-bold" fill="#1e293b">Treatment Planning Framework</text>
    
    {/* Assessment box */}
    <rect x="20" y="50" width="140" height="70" rx="10" fill="#1e40af" opacity="0.9" />
    <text x="90" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">ASSESSMENT</text>
    <text x="90" y="100" textAnchor="middle" fill="white" fontSize="9">Biopsychosocial</text>

    <path d="M160 85 L200 85" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#tpArrow)" />

    {/* Goals box */}
    <rect x="200" y="50" width="140" height="70" rx="10" fill="#059669" opacity="0.9" />
    <text x="270" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">GOALS</text>
    <text x="270" y="100" textAnchor="middle" fill="white" fontSize="9">SMART Objectives</text>

    <path d="M340 85 L380 85" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#tpArrow)" />

    {/* Interventions box */}
    <rect x="380" y="50" width="140" height="70" rx="10" fill="#d97706" opacity="0.9" />
    <text x="450" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">INTERVENTIONS</text>
    <text x="450" y="100" textAnchor="middle" fill="white" fontSize="9">Evidence-Based</text>

    <path d="M520 85 L560 85" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#tpArrow)" />

    {/* Evaluation box */}
    <rect x="560" y="50" width="120" height="70" rx="10" fill="#7c3aed" opacity="0.9" />
    <text x="620" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">EVALUATION</text>
    <text x="620" y="100" textAnchor="middle" fill="white" fontSize="9">Outcomes</text>

    {/* Feedback loop */}
    <path d="M620 120 L620 180 Q620 200 600 200 L100 200 Q80 200 80 180 L80 120" stroke="#94a3b8" strokeWidth="2" fill="none" strokeDasharray="5,5" markerEnd="url(#tpArrow)" />
    <text x="350" y="220" textAnchor="middle" fill="#64748b" fontSize="10" fontStyle="italic">Continuous monitoring and adjustment</text>

    <defs>
      <marker id="tpArrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
      </marker>
    </defs>

    {/* Client centered label */}
    <rect x="250" y="140" width="200" height="35" rx="17" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
    <text x="350" y="162" textAnchor="middle" fill="#059669" fontSize="11" fontWeight="bold">Client-Centered & Collaborative</text>
  </svg>
);

const ProfessionalIdentityDiagram: React.FC = () => (
  <svg viewBox="0 0 600 300" className="w-full max-w-3xl mx-auto my-8">
    <text x="300" y="20" textAnchor="middle" className="text-lg font-bold" fill="#1e293b">Professional Development Model</text>
    
    {/* Developmental stages */}
    {[
      { x: 60, y: 150, r: 45, label: "Student\nLearner", color: "#94a3b8" },
      { x: 180, y: 120, r: 50, label: "Novice\nPractitioner", color: "#60a5fa" },
      { x: 310, y: 100, r: 55, label: "Competent\nCounselor", color: "#34d399" },
      { x: 440, y: 120, r: 50, label: "Proficient\nSpecialist", color: "#f59e0b" },
      { x: 550, y: 150, r: 45, label: "Expert\nMentor", color: "#ef4444" },
    ].map((stage, i) => (
      <g key={i}>
        <circle cx={stage.x} cy={stage.y} r={stage.r} fill={stage.color} opacity="0.2" stroke={stage.color} strokeWidth="2" />
        <text x={stage.x} y={stage.y - 5} textAnchor="middle" fill={stage.color} fontSize="9" fontWeight="bold">
          {stage.label.split('\n')[0]}
        </text>
        <text x={stage.x} y={stage.y + 10} textAnchor="middle" fill={stage.color} fontSize="9">
          {stage.label.split('\n')[1]}
        </text>
        {i < 4 && (
          <path d={`M${stage.x + stage.r} ${stage.y} Q${(stage.x + stage.r + [60,180,310,440][i+1] - [60,180,310,440][i+1] + [180,310,440,550][i] - stage.r) / 2} ${Math.min(stage.y, [120,100,120,150][i]) - 10} ${[180,310,440,550][i] - [50,55,55,50][i]} ${[120,100,120,150][i]}`} stroke="#94a3b8" strokeWidth="1.5" fill="none" markerEnd="url(#pidArrow)" />
        )}
      </g>
    ))}

    <defs>
      <marker id="pidArrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
      </marker>
    </defs>

    {/* Key components */}
    <rect x="50" y="230" width="500" height="50" rx="8" fill="#f8fafc" stroke="#e2e8f0" />
    <text x="300" y="252" textAnchor="middle" fill="#1e293b" fontSize="10" fontWeight="bold">Key Developmental Components:</text>
    <text x="300" y="270" textAnchor="middle" fill="#475569" fontSize="9">Education • Supervised Practice • Licensure • Continuing Education • Specialization • Mentorship • Leadership</text>
  </svg>
);

// Diagram selector based on chapter
const ChapterDiagram: React.FC<{ chapterId: number }> = ({ chapterId }) => {
  switch (chapterId) {
    case 1: return <LevelsOfCareDiagram />;
    case 2: return <TimelineDiagram />;
    case 3: return <CounselingProcessDiagram />;
    case 4: return <CommunicationModelDiagram />;
    case 5: return <TheoreticalOrientationsDiagram />;
    case 6: return <BiopsychosocialDiagram />;
    case 7: return <TreatmentPlanDiagram />;
    case 9: return <EthicalDecisionDiagram />;
    case 12: return <ProfessionalIdentityDiagram />;
    case 13: return <SupervisionModelDiagram />;
    case 17: return <CrisisInterventionDiagram />;
    default: return null;
  }
};

// Simple Markdown-like renderer
const renderContent = (content: string): React.ReactNode[] => {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inTable = false;
  let tableRows: string[][] = [];
  let tableHeaders: string[] = [];
  let key = 0;

  const processInline = (text: string): React.ReactNode => {
    // Bold
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Table handling
    if (line.startsWith('|') && line.endsWith('|')) {
      const cells = line.split('|').filter(c => c.trim()).map(c => c.trim());
      if (!inTable) {
        inTable = true;
        tableHeaders = cells;
        tableRows = [];
      } else if (cells.every(c => c.match(/^[-:]+$/))) {
        // separator row, skip
        continue;
      } else {
        tableRows.push(cells);
      }
      continue;
    } else if (inTable) {
      // End of table
      elements.push(
        <div key={key++} className="overflow-x-auto my-4">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
            <thead className="bg-blue-50">
              <tr>
                {tableHeaders.map((h, idx) => (
                  <th key={idx} className="px-4 py-2 text-left font-semibold text-blue-900 border-b border-blue-200">{processInline(h)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, ridx) => (
                <tr key={ridx} className={ridx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  {row.map((cell, cidx) => (
                    <td key={cidx} className="px-4 py-2 border-b border-gray-100">{processInline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      inTable = false;
      tableRows = [];
      tableHeaders = [];
    }

    // Headers
    if (line.startsWith('### ')) {
      elements.push(<h3 key={key++} className="text-xl font-bold text-blue-900 mt-8 mb-4 border-b border-blue-100 pb-2">{processInline(line.slice(4))}</h3>);
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={key++} className="text-2xl font-bold text-blue-950 mt-10 mb-4">{processInline(line.slice(3))}</h2>);
    } else if (line.startsWith('# ')) {
      elements.push(<h1 key={key++} className="text-3xl font-bold text-blue-950 mt-12 mb-6">{processInline(line.slice(2))}</h1>);
    }
    // Horizontal rule
    else if (line.startsWith('---')) {
      elements.push(<hr key={key++} className="my-8 border-gray-200" />);
    }
    // List items
    else if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const indent = line.search(/\S/);
      const content = line.trim().slice(2);
      elements.push(
        <li key={key++} className="ml-6 mb-1 text-gray-700 list-disc" style={{ marginLeft: `${Math.max(24, indent * 8)}px` }}>
          {processInline(content)}
        </li>
      );
    }
    // Numbered list
    else if (line.trim().match(/^\d+\.\s/)) {
      const content = line.trim().replace(/^\d+\.\s/, '');
      elements.push(
        <li key={key++} className="ml-6 mb-1 text-gray-700 list-decimal">
          {processInline(content)}
        </li>
      );
    }
    // Empty line
    else if (line.trim() === '') {
      elements.push(<div key={key++} className="h-2" />);
    }
    // Regular paragraph
    else {
      elements.push(<p key={key++} className="text-gray-700 leading-relaxed mb-2">{processInline(line)}</p>);
    }
  }

  // Handle table at end
  if (inTable && tableHeaders.length > 0) {
    elements.push(
      <div key={key++} className="overflow-x-auto my-4">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
          <thead className="bg-blue-50">
            <tr>
              {tableHeaders.map((h, idx) => (
                <th key={idx} className="px-4 py-2 text-left font-semibold text-blue-900 border-b border-blue-200">{processInline(h)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, ridx) => (
              <tr key={ridx} className={ridx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {row.map((cell, cidx) => (
                  <td key={cidx} className="px-4 py-2 border-b border-gray-100">{processInline(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return elements;
};

// Cover Page Component
const CoverPage: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex items-center justify-center p-8">
    <div className="max-w-5xl w-full">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Top banner */}
        <div className="bg-gradient-to-r from-blue-950 to-blue-800 p-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 bg-blue-700 rounded-xl flex items-center justify-center border-2 border-blue-500">
              <span className="text-white font-bold text-xl">TBU</span>
            </div>
          </div>
          <h2 className="text-blue-200 text-lg tracking-wider uppercase">Triune Biblical University Global Extension</h2>
          <p className="text-blue-300 text-sm mt-1">United States of America</p>
        </div>

        {/* Cover image */}
        <div className="relative h-64 overflow-hidden">
          <img 
            src="https://image.qwenlm.ai/generated-images/1c69f035-2b96-49ee-8724-228a2a73dd89/_result.png" 
            alt="Mental Health Counseling Cover" 
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent" />
          <div className="absolute bottom-6 left-8 right-8">
            <p className="text-blue-200 text-sm uppercase tracking-widest">Master's Degree Program</p>
            <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">MHC. 701</h1>
            <p className="text-xl text-blue-100 mt-1">Fundamentals of Mental Health Counseling</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Course Information</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="font-medium">Course Code:</span>
                  <span>MHC.701</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="font-medium">Credit Hours:</span>
                  <span>1.65</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="font-medium">Semester:</span>
                  <span>1st Semester</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="font-medium">Program:</span>
                  <span>Mental Health Counseling</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="font-medium">Level:</span>
                  <span>Master's Degree</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="font-medium">Total Chapters:</span>
                  <span>18</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Course Description</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                This comprehensive course provides students with a thorough foundation in the fundamentals of mental health counseling. 
                Topics include the history and evolution of the profession, the counseling relationship, communication and interviewing skills, 
                theoretical foundations, assessment and diagnosis, treatment planning, cultural competence, ethics and legal issues, 
                documentation, evidence-based practices, professional identity, supervision, research methods, special populations, 
                community mental health, crisis intervention, and career development.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '📚', label: '18 Chapters' },
              { icon: '📊', label: 'Diagrams & Figures' },
              { icon: '📝', label: 'Case Studies' },
              { icon: '✅', label: 'Learning Objectives' },
            ].map((item, i) => (
              <div key={i} className="bg-blue-50 rounded-lg p-4 text-center">
                <span className="text-2xl">{item.icon}</span>
                <p className="text-xs text-blue-800 font-medium mt-2">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Start button */}
          <div className="mt-10 text-center">
            <button
              onClick={onStart}
              className="px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              Begin Reading →
            </button>
            <p className="text-xs text-gray-400 mt-3">Click to access the complete textbook</p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 text-center border-t">
          <p className="text-xs text-gray-500">© 2025 Triune Biblical University Global Extension, USA. All Rights Reserved.</p>
          <p className="text-xs text-gray-400 mt-1">This textbook is intended for educational purposes in the Master's program in Mental Health Counseling.</p>
        </div>
      </div>
    </div>
  </div>
);

// Main App Component
const App: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState<number>(0); // 0 = cover page
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [showTOC, setShowTOC] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [activeChapter]);

  // Show cover page
  if (activeChapter === 0) {
    return <CoverPage onStart={() => setActiveChapter(1)} />;
  }

  const currentChapter = chapters.find(c => c.id === activeChapter);
  const content = contentMap[activeChapter] || '';

  return (
    <div className="flex h-screen bg-gray-50 font-serif">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden bg-blue-950 text-white flex-shrink-0`}>
        <div className="p-6 h-full overflow-y-auto">
          {/* Logo/Title */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TBU</span>
              </div>
              <div>
                <p className="text-xs text-blue-300 uppercase tracking-wider">Triune Biblical University</p>
                <p className="text-xs text-blue-300">Global Extension, USA</p>
              </div>
            </div>
            <h1 className="text-lg font-bold leading-tight">MHC. 701</h1>
            <p className="text-sm text-blue-200 mt-1">Fundamentals of Mental Health Counseling</p>
            <div className="mt-3 px-3 py-2 bg-blue-900 rounded-lg">
              <p className="text-xs text-blue-300">Master's Degree Program</p>
              <p className="text-xs text-blue-300">Mental Health Counseling</p>
              <p className="text-xs text-blue-300 mt-1">Credit Hours: 1.65</p>
            </div>
          </div>

          {/* Chapter Navigation */}
          <nav>
            <h2 className="text-xs uppercase tracking-wider text-blue-400 mb-3 font-sans">Table of Contents</h2>
            <ul className="space-y-1">
              {/* Preface */}
              <li>
                <button
                  onClick={() => { setActiveChapter(0); setShowTOC(false); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                    activeChapter === 0
                      ? 'bg-blue-700 text-white font-medium'
                      : 'text-blue-200 hover:bg-blue-900 hover:text-white'
                  }`}
                >
                  <span className="text-blue-400 text-xs mr-2 font-mono">📖</span>
                  <span>Preface & Course Syllabus</span>
                </button>
              </li>
              {chapters.map((chapter) => (
                <li key={chapter.id}>
                  <button
                    onClick={() => { setActiveChapter(chapter.id); setShowTOC(false); }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      activeChapter === chapter.id
                        ? 'bg-blue-700 text-white font-medium'
                        : 'text-blue-200 hover:bg-blue-900 hover:text-white'
                    }`}
                  >
                    <span className="text-blue-400 text-xs mr-2 font-mono">{String(chapter.id).padStart(2, '0')}</span>
                    <span className="line-clamp-2">{chapter.title}</span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Supplementary Section */}
            <h2 className="text-xs uppercase tracking-wider text-blue-400 mb-3 mt-6 font-sans">Supplementary</h2>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => { setActiveChapter(19); setShowTOC(false); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                    activeChapter === 19
                      ? 'bg-blue-700 text-white font-medium'
                      : 'text-blue-200 hover:bg-blue-900 hover:text-white'
                  }`}
                >
                  <span className="text-blue-400 text-xs mr-2 font-mono">📋</span>
                  <span>Case Studies</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveChapter(20); setShowTOC(false); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                    activeChapter === 20
                      ? 'bg-blue-700 text-white font-medium'
                      : 'text-blue-200 hover:bg-blue-900 hover:text-white'
                  }`}
                >
                  <span className="text-blue-400 text-xs mr-2 font-mono">📎</span>
                  <span>Appendices & Resources</span>
                </button>
              </li>
            </ul>
          </nav>

          {/* Footer */}
          <div className="mt-8 pt-4 border-t border-blue-800">
            <p className="text-xs text-blue-400">Course Code: MHC.701</p>
            <p className="text-xs text-blue-400">Semester: 1st Semester</p>
            <p className="text-xs text-blue-400 mt-2">© 2025 Triune Biblical University</p>
            <p className="text-xs text-blue-400">Global Extension, USA</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Toggle sidebar"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button
              onClick={() => setActiveChapter(0)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Return to preface"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {activeChapter === 0 ? 'Preface & Course Syllabus' : 
                 activeChapter === 19 ? 'Case Studies' :
                 activeChapter === 20 ? 'Appendices & Resources' :
                 `Chapter ${activeChapter}: ${currentChapter?.title}`}
              </h2>
              <p className="text-sm text-gray-500">
                {activeChapter === 0 ? 'MHC.701 Course Overview' : 
                 activeChapter === 19 ? 'Applied Case Examples' :
                 activeChapter === 20 ? 'DSM-5-TR Overview, Resources, and Templates' :
                 currentChapter?.subtitle}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveChapter(Math.max(0, activeChapter - 1))}
              disabled={activeChapter === 0}
              className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              ← Previous
            </button>
            <button
              onClick={() => setActiveChapter(Math.min(20, activeChapter + 1))}
              disabled={activeChapter === 20}
              className="px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              Next →
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div ref={contentRef} className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-8 py-10">
            {/* Chapter Header */}
            <div className="mb-8 pb-6 border-b-2 border-blue-100">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-mono rounded-full">
                  Chapter {activeChapter}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  MHC.701
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mt-4">{currentChapter?.title}</h1>
              <p className="text-lg text-gray-600 mt-2 italic">{currentChapter?.subtitle}</p>
            </div>

            {/* Chapter Image */}
            <ChapterImage chapterId={activeChapter} />

            {/* Diagram */}
            <ChapterDiagram chapterId={activeChapter} />

            {/* Content */}
            <article className="prose prose-lg max-w-none">
              {renderContent(content)}
            </article>

            {/* Chapter Navigation Footer */}
            <div className="mt-16 pt-8 border-t border-gray-200 flex justify-between items-center">
              {activeChapter > 0 && (
                <button
                  onClick={() => setActiveChapter(activeChapter - 1)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <span>←</span>
                  <div className="text-left">
                    <p className="text-xs text-gray-500">Previous</p>
                    <p className="text-sm font-medium text-gray-700">
                      {activeChapter === 1 ? 'Preface & Syllabus' : 
                       activeChapter === 19 ? 'Career Development' :
                       activeChapter === 20 ? 'Case Studies' :
                       chapters[activeChapter - 2]?.title}
                    </p>
                  </div>
                </button>
              )}
              <div className="flex-1" />
              {activeChapter < 20 && (
                <button
                  onClick={() => setActiveChapter(activeChapter + 1)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <div className="text-right">
                    <p className="text-xs text-blue-500">Next</p>
                    <p className="text-sm font-medium text-blue-700">
                      {activeChapter === 0 ? chapters[0]?.title : 
                       activeChapter === 18 ? 'Case Studies' :
                       activeChapter >= 19 ? 'Appendices & Resources' :
                       chapters[activeChapter]?.title}
                    </p>
                  </div>
                  <span>→</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile TOC Overlay */}
      {showTOC && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden" onClick={() => setShowTOC(false)}>
          <div className="w-80 h-full bg-blue-950 overflow-y-auto" onClick={e => e.stopPropagation()}>
            {/* Same sidebar content for mobile */}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
