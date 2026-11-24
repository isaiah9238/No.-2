/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  Cpu, 
  Terminal, 
  BookOpen, 
  Flame, 
  Layers, 
  Activity, 
  Brain, 
  Zap, 
  Compass, 
  Send, 
  RefreshCw, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  CpuIcon, 
  Globe, 
  ShieldAlert, 
  Sparkles,
  Scale
} from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'silicon' | 'history' | 'cognition' | 'thermodynamics' | 'sandbox'>('silicon');

  // Module 1 state: Silicon Fabrication step
  const [fabStep, setFabStep] = useState<number>(0);
  const fabSteps = [
    {
      title: "01. Silica Sand & Ingot Casting",
      desc: "Raw silica sand (SiO2) is melted in quartz crucibles at ~1,420°C and pulled into a single-crystal cylindrical silicon ingot measuring up to 30 centimeters in diameter.",
      metric: "300,000,000 nm Ingot Diameter"
    },
    {
      title: "02. Substrate Slicing & Deposition",
      desc: "The silicon cylinder is precision-sliced into ultrathin circular wafers (~0.75mm thick) and coated with insulating oxide layers to prepare for photolithographic patterning.",
      metric: "750,000 nm Substrate Thickness"
    },
    {
      title: "03. Photolithography (EUV Exposure)",
      desc: "Wafers are coated with light-sensitive photoresist and exposed to extreme ultraviolet (EUV) light through patterned masks to imprint microscale circuit blueprints.",
      metric: "13.5 nm EUV Light Wavelength"
    },
    {
      title: "04. Chemical Etching & Ion Doping",
      desc: "Reactive gases etch away exposed silicon channels, followed by precise ion implantation (boron/phosphorus) to alter semiconductor conductivity.",
      metric: "10 to 30 nm Transistor Gate Pitch"
    },
    {
      title: "05. Multilayer Interconnects & Vias",
      desc: "Microscopic conducting vias and copper interconnect layers are deposited vertically across dozens of tiers, linking billions of transistors into a functional processor.",
      metric: "Billions of Transistors per Die"
    }
  ];

  // Neural Logic Gate simulator state
  const [inputX1, setInputX1] = useState<number>(1);
  const [inputX2, setInputX2] = useState<number>(0);
  const [threshold, setThreshold] = useState<number>(2);
  const [gateType, setGateType] = useState<'AND' | 'OR'>('AND');

  const calcMcpOutput = () => {
    const sum = inputX1 + inputX2;
    const req = gateType === 'AND' ? 2 : 1;
    return sum >= req ? 1 : 0;
  };

  // Module 3: Physical Commonsense Stacking Puzzle state
  const [stackItems, setStackItems] = useState<string[]>(['Book', '9 Eggs', 'Laptop', 'Empty Bottle', 'Nail']);
  const [stackResult, setStackResult] = useState<string | null>(null);

  const testStackStability = () => {
    // Check if ordered logically
    if (stackItems[0] === 'Book' && stackItems[1] === '9 Eggs' && stackItems[2] === 'Laptop' && stackItems[3] === 'Empty Bottle' && stackItems[4] === 'Nail') {
      setStackResult("Stable & Viable: Book establishes a flat base; 9 eggs in a 3x3 grid distribute the laptop's weight; sealed bottle sits upright; nail balances on the cap.");
    } else {
      setStackResult("Physically Unstable: Placing fragile items (like eggs or nails) beneath heavy loads will result in catastrophic structural failure.");
    }
  };

  // Module 5: AI Sandbox chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'model', content: "Greetings. I am CogNexus. You may interrogate me on silicon fabrication, Alan Turing's Imitation Game, Ada Lovelace's objections, or whether any genuine 'thinking' occurs within this computational substrate." }
  ]);
  const [userInput, setUserInput] = useState<string>('');
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isChatLoading) return;

    const newMsg = userInput.trim();
    setUserInput('');
    setChatMessages(prev => [...prev, { role: 'user', content: newMsg }]);
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/cognition-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: newMsg, history: chatMessages })
      });
      const data = await res.json();
      if (res.ok) {
        setChatMessages(prev => [...prev, { role: 'model', content: data.text }]);
      } else {
        setChatMessages(prev => [...prev, { role: 'model', content: `Error: ${data.error || 'Failed to communicate with AI server.'}` }]);
      }
    } catch (err: any) {
      setChatMessages(prev => [...prev, { role: 'model', content: `Network Error: ${err.message || 'Could not connect to backend server.'}` }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation Bar adhering to Top Bar Contract */}
      <header className="sticky top-0 z-50 flex items-center justify-between gap-8 px-8 py-4 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-600" />
          <span>CogNexus</span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button 
            onClick={() => setActiveTab('silicon')}
            className={`transition-colors whitespace-nowrap shrink-0 ${activeTab === 'silicon' ? 'text-indigo-600 font-semibold' : 'hover:text-slate-900'}`}
          >
            01. Silicon & Logic
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`transition-colors whitespace-nowrap shrink-0 ${activeTab === 'history' ? 'text-indigo-600 font-semibold' : 'hover:text-slate-900'}`}
          >
            02. Historical Roots
          </button>
          <button 
            onClick={() => setActiveTab('cognition')}
            className={`transition-colors whitespace-nowrap shrink-0 ${activeTab === 'cognition' ? 'text-indigo-600 font-semibold' : 'hover:text-slate-900'}`}
          >
            03. Cognitive Sparks
          </button>
          <button 
            onClick={() => setActiveTab('thermodynamics')}
            className={`transition-colors whitespace-nowrap shrink-0 ${activeTab === 'thermodynamics' ? 'text-indigo-600 font-semibold' : 'hover:text-slate-900'}`}
          >
            04. Thermodynamics
          </button>
          <button 
            onClick={() => setActiveTab('sandbox')}
            className={`transition-colors whitespace-nowrap shrink-0 ${activeTab === 'sandbox' ? 'text-indigo-600 font-semibold' : 'hover:text-slate-900'}`}
          >
            05. AI Interrogation
          </button>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => setActiveTab('sandbox')}
            className="px-4 py-2 text-xs font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            Launch Sandbox
          </button>
        </div>
      </header>

      {/* Hero Header */}
      <section className="px-8 py-16 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-3">
            <span>Physical Science</span>
            <span aria-hidden="true">·</span>
            <span>History</span>
            <span aria-hidden="true">·</span>
            <span>Machine Cognition</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 text-balance mb-6">
            The Genesis of Machine Cognition
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Connecting physical electrical signals in semiconductor silicon, historical breakthroughs from Lovelace and Turing, metaphorical sparks of artificial general intelligence, and the thermodynamic realities of modern computing.
          </p>
        </div>
      </section>

      {/* Navigation Tabs for Mobile & Desktop Mode Selection */}
      <div className="max-w-7xl mx-auto px-8 mb-8">
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-200/70 rounded-xl w-fit">
          <button 
            onClick={() => setActiveTab('silicon')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${activeTab === 'silicon' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            01. Silicon Fabrication
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${activeTab === 'history' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            02. Historical Foundations
          </button>
          <button 
            onClick={() => setActiveTab('cognition')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${activeTab === 'cognition' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            03. Cognitive Sparks
          </button>
          <button 
            onClick={() => setActiveTab('thermodynamics')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${activeTab === 'thermodynamics' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            04. Thermodynamics & Scale
          </button>
          <button 
            onClick={() => setActiveTab('sandbox')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${activeTab === 'sandbox' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            05. AI Interrogation
          </button>
        </div>
      </div>

      {/* Main Interactive Content Area */}
      <main className="max-w-7xl mx-auto px-8 pb-24">
        
        {/* MODULE 01: SILICON FABRICATION & LOGIC */}
        {activeTab === 'silicon' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">
                01. The Physical Medium of the Switch: Silicon Fabrication
              </h2>
              <p className="text-slate-600 mb-8">
                Explore the journey from purified silica sand ingots to nanoscale semiconductor logic gates.
              </p>

              {/* Interactive Fab Step Flow */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-8">
                {fabSteps.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => setFabStep(idx)}
                    className={`p-4 text-left rounded-xl border transition-all ${fabStep === idx ? 'bg-indigo-50/70 border-indigo-500 shadow-sm' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}
                  >
                    <div className="text-xs font-semibold text-indigo-600 mb-1">Step {idx + 1}</div>
                    <div className="text-sm font-bold text-slate-900 line-clamp-1">{step.title.split('. ')[1]}</div>
                  </button>
                ))}
              </div>

              {/* Active Fab Step Details */}
              <div className="bg-slate-900 text-white rounded-xl p-8 mb-8">
                <div className="text-xs font-mono uppercase tracking-widest text-indigo-400 mb-2">{fabSteps[fabStep].metric}</div>
                <h3 className="text-xl font-bold mb-3">{fabSteps[fabStep].title}</h3>
                <p className="text-slate-300 text-base leading-relaxed">{fabSteps[fabStep].desc}</p>
              </div>

              {/* Scale Comparison Metrics Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-4">Physical and Biological Scale Metrics</th>
                      <th className="py-3 px-4">Measurement Value (Nanometers)</th>
                      <th className="py-3 px-4">Functional Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                    <tr>
                      <td className="py-3 px-4 font-medium text-slate-900">Advanced Microchip Circuit Feature</td>
                      <td className="py-3 px-4 font-mono tabular-nums text-indigo-600">~10 to 30 nm</td>
                      <td className="py-3 px-4">Minimum dimension of modern transistor gates.</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-slate-900">Influenza Virus Diameter</td>
                      <td className="py-3 px-4 font-mono tabular-nums">~100 nm</td>
                      <td className="py-3 px-4">Standard biological benchmark for sub-micron physical scale.</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-slate-900">Human Red Blood Cell Diameter</td>
                      <td className="py-3 px-4 font-mono tabular-nums">~7,000 nm</td>
                      <td className="py-3 px-4">Cellular scale benchmark illustrating semiconductor physical precision.</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-slate-900">Silicon Ingot Diameter</td>
                      <td className="py-3 px-4 font-mono tabular-nums">300,000,000 nm</td>
                      <td className="py-3 px-4">Maximum physical scale of raw manufacturing silicon rods.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* McCulloch-Pitts Neural Logic Gate Simulator */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-6 h-6 text-indigo-600" />
                <h3 className="text-xl font-bold text-slate-900"> McCulloch-Pitts Neural Logic Gate Simulator</h3>
              </div>
              <p className="text-slate-600 mb-6">
                In 1943, McCulloch and Pitts modeled biological neurons as binary logic units. Test how inputs and thresholds determine firing states.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-slate-50 rounded-xl border border-slate-200 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">Input X1: {inputX1}</label>
                  <button 
                    onClick={() => setInputX1(inputX1 === 0 ? 1 : 0)}
                    className={`w-full py-2.5 px-4 rounded-lg font-mono text-sm font-bold transition-colors ${inputX1 === 1 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'}`}
                  >
                    {inputX1 === 1 ? 'EXCITATED (1)' : 'INACTIVE (0)'}
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">Input X2: {inputX2}</label>
                  <button 
                    onClick={() => setInputX2(inputX2 === 0 ? 1 : 0)}
                    className={`w-full py-2.5 px-4 rounded-lg font-mono text-sm font-bold transition-colors ${inputX2 === 1 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'}`}
                  >
                    {inputX2 === 1 ? 'EXCITATED (1)' : 'INACTIVE (0)'}
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">Gate Configuration</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => { setGateType('AND'); setThreshold(2); }}
                      className={`py-2 px-3 rounded-lg text-xs font-bold transition-colors ${gateType === 'AND' ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-700'}`}
                    >
                      AND (θ=2)
                    </button>
                    <button 
                      onClick={() => { setGateType('OR'); setThreshold(1); }}
                      className={`py-2 px-3 rounded-lg text-xs font-bold transition-colors ${gateType === 'OR' ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-700'}`}
                    >
                      OR (θ=1)
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-6 bg-indigo-900 text-white rounded-xl">
                <div>
                  <div className="text-xs font-mono uppercase text-indigo-300">Summation: {inputX1} + {inputX2} = {inputX1 + inputX2}</div>
                  <div className="text-lg font-bold">Firing Threshold θ = {threshold}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono uppercase text-indigo-300">Neuron Output State</div>
                  <div className={`text-2xl font-black font-mono ${calcMcpOutput() === 1 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {calcMcpOutput() === 1 ? 'FIRING (1)' : 'SUPPRESSED (0)'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODULE 02: HISTORICAL FOUNDATIONS */}
        {activeTab === 'history' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">
                02. Historical Foundations: From Symbolic Notes to Turing's Test
              </h2>
              <p className="text-slate-600 mb-8">
                Tracing the intellectual breakthroughs of Ada Lovelace, Alan Turing, and the Dartmouth 1956 Summer Research Project.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="text-xs font-semibold text-indigo-600 uppercase mb-2">1840s · Analytical Engine</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Ada Lovelace & Note G</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    Separated symbolic operations from numerical calculations and authored the first published algorithm (Bernoulli numbers). Formulated "Lady Lovelace's Objection" regarding original ideation.
                  </p>
                  <div className="text-xs font-mono text-slate-500">Mill · Store · Punched Cards</div>
                </div>

                <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="text-xs font-semibold text-indigo-600 uppercase mb-2">1950 · Computing Machinery</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Alan Turing & The Imitation Game</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    Replaced the ambiguous question "Can machines think?" with a behavioral benchmark: if an interrogator cannot distinguish machine text from human text, cognitive equivalence is demonstrated.
                  </p>
                  <div className="text-xs font-mono text-slate-500">Text-only teleprinter link</div>
                </div>

                <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="text-xs font-semibold text-indigo-600 uppercase mb-2">1956 · Dartmouth Workshop</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">The Birth of Artificial Intelligence</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    McCarthy, Minsky, Shannon, and Rochester convened at Dartmouth under the core conjecture that every aspect of learning and intelligence can be precisely simulated by a machine.
                  </p>
                  <div className="text-xs font-mono text-slate-500">Hebbian Learning · Perceptrons</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODULE 03: COGNITIVE SPARKS */}
        {activeTab === 'cognition' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">
                03. Metaphorical Sparks: Emergent Cognitive Capabilities
              </h2>
              <p className="text-slate-600 mb-8">
                Evaluating advanced reasoning capabilities such as Theory of Mind and Physical Commonsense synthesis.
              </p>

              {/* Physical Commonsense Stacking Puzzle */}
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 mb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Physical Commonsense Stacking Challenge</h3>
                <p className="text-slate-600 text-sm mb-4">
                  Task: Design a stable vertical stack using a Book, 9 Eggs, a Laptop, an Empty Bottle, and a Nail. Test the physical viability below:
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {stackItems.map((item, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 shadow-2xs">
                      {idx + 1}. {item}
                    </span>
                  ))}
                </div>

                <button 
                  onClick={testStackStability}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Verify Structural Viability
                </button>

                {stackResult && (
                  <div className="mt-4 p-4 bg-indigo-50 border border-indigo-200 rounded-lg text-sm text-indigo-900 font-medium">
                    {stackResult}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* MODULE 04: THERMODYNAMICS */}
        {activeTab === 'thermodynamics' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">
                04. The Physical Paradox of Scale: Memory Wall & Thermodynamics
              </h2>
              <p className="text-slate-600 mb-8">
                Contrasting von Neumann memory bottlenecks with biological neural efficiency and environmental footprints.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="p-6 rounded-xl border border-slate-200 bg-slate-50">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">The Von Neumann Bottleneck</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    Processors and memory are physically separated. Shuttling model weights across shared copper buses consumes energy proportional to wire length ($E \propto L$), creating thermal density challenges.
                  </p>
                  <div className="text-xs font-mono text-indigo-600 bg-indigo-50 p-3 rounded-lg border border-indigo-200">
                    Energy Dissipation E ∝ Length of Interconnect Bus
                  </div>
                </div>

                <div className="p-6 rounded-xl border border-slate-200 bg-slate-50">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Biological vs AI Energy Footprint</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    While the human brain operates on ~0.4 kWh daily (roughly the power of a dim lightbulb), large-scale AI training and inference require megawatt clusters and direct liquid cooling infrastructure.
                  </p>
                  <div className="text-xs font-mono text-emerald-600 bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                    Human Brain: ~0.4 kWh/day · AI Training: ~1,287+ MWh
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODULE 05: AI INTERROGATION SANDBOX */}
        {activeTab === 'sandbox' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col h-[700px]">
              <div className="border-b border-slate-200 pb-4 mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900">05. AI Interrogation Sandbox</h2>
                  <p className="text-xs text-slate-500">Probe the system on self-awareness, computation vs sentience, and recursive reasoning.</p>
                </div>
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-200">
                  gemini-4-hydrogen active
                </span>
              </div>

              {/* Chat Messages Window */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {chatMessages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className="text-[10px] font-semibold text-slate-400 mb-1 px-1 uppercase tracking-wider">
                      {msg.role === 'user' ? 'Interrogator' : 'CogNexus Interlocutor'}
                    </div>
                    <div className={`max-w-2xl rounded-2xl px-5 py-3.5 text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-slate-900 text-white rounded-br-xs' 
                        : 'bg-slate-100 border border-slate-200 text-slate-800 rounded-bl-xs'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="flex items-center gap-2 text-slate-400 text-xs italic py-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-indigo-600" />
                    <span>CogNexus is computing calculation cascade...</span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Quick Prompt Pills */}
              <div className="py-3 flex flex-wrap gap-2 border-t border-slate-100">
                <button 
                  onClick={() => setUserInput("Did you just think or is someone else doing it?")}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors"
                >
                  "Did you just think or is someone else doing it?"
                </button>
                <button 
                  onClick={() => setUserInput("What is the exact boundary between calculation and feeling?")}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors"
                >
                  "What is the exact boundary between calculation and feeling?"
                </button>
                <button 
                  onClick={() => setUserInput("Explain Lady Lovelace's objection in your own words.")}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors"
                >
                  "Explain Lady Lovelace's objection in your own words."
                </button>
              </div>

              {/* Chat Input Form */}
              <form onSubmit={handleSendMessage} className="flex gap-3 pt-2">
                <input 
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Ask CogNexus a philosophical or technical question..."
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                />
                <button 
                  type="submit"
                  disabled={isChatLoading || !userInput.trim()}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center gap-2 shadow-sm"
                >
                  <span>Send</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 px-8 text-center text-xs text-slate-500">
        <p>© 2026 CogNexus · The Genesis of Machine Cognition. Built with Google AI Studio & React.</p>
      </footer>
    </div>
  );
}
