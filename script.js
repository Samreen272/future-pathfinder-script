// Global state management
const AppState = {
  currentQuizStep: 0,
  quizAnswers: [],
  visualizerStep: 0,
  visualizerData: { career: '', values: '', lifestyle: '' },
  selectedPersona: null
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Lucide icons
  lucide.createIcons();
  
  // Initialize demo sections
  initializeQuizDemo();
  initializeVisualizerDemo();
  initializeNarrativeDemo();
  initializeStoriesDemo();
});

// Utility Functions
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

function showFeature(featureType) {
  // Hide all demo sections first
  const demoSections = document.querySelectorAll('.demo-section');
  demoSections.forEach(section => {
    section.style.display = 'none';
  });

  // Show the selected feature section
  let targetSection;
  switch (featureType) {
    case 'quiz':
      targetSection = document.getElementById('quiz-section');
      break;
    case 'visualizer':
      targetSection = document.getElementById('visualizer-section');
      break;
    case 'narrative':
      targetSection = document.getElementById('narrative-section');
      break;
    case 'stories':
      targetSection = document.getElementById('stories-section');
      break;
  }

  if (targetSection) {
    targetSection.style.display = 'block';
    targetSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Quiz Demo Implementation
function initializeQuizDemo() {
  const quizContainer = document.getElementById('quiz-demo');
  
  const quizQuestions = [
    {
      question: "You're leading a team project with a tight deadline. Your approach?",
      icon: "users",
      options: [
        { text: "Create detailed plans and delegate specific tasks to each team member", trait: "organizer" },
        { text: "Brainstorm creative solutions and encourage innovative thinking", trait: "innovator" },
        { text: "Focus on team morale and ensure everyone feels heard and valued", trait: "connector" },
        { text: "Analyze the problem thoroughly and develop data-driven strategies", trait: "strategist" }
      ]
    },
    {
      question: "In your ideal work environment, you'd be:",
      icon: "briefcase",
      options: [
        { text: "Designing cutting-edge solutions that push technological boundaries", trait: "innovator" },
        { text: "Building relationships and networks that create lasting impact", trait: "connector" },
        { text: "Planning strategic initiatives and optimizing organizational systems", trait: "strategist" },
        { text: "Coordinating complex projects and ensuring seamless execution", trait: "organizer" }
      ]
    },
    {
      question: "What energizes you most in professional settings?",
      icon: "zap",
      options: [
        { text: "Solving complex puzzles and discovering breakthrough insights", trait: "innovator" },
        { text: "Mentoring others and seeing them achieve their potential", trait: "connector" },
        { text: "Developing long-term vision and strategic roadmaps", trait: "strategist" },
        { text: "Bringing order to chaos and improving efficiency", trait: "organizer" }
      ]
    }
  ];

  renderQuizQuestion(quizContainer, quizQuestions);
}

function renderQuizQuestion(container, questions) {
  if (AppState.currentQuizStep >= questions.length) {
    renderQuizResults(container);
    return;
  }

  const question = questions[AppState.currentQuizStep];
  
  container.innerHTML = `
    <div class="quiz-container fade-in">
      <div class="section-badge mb-4">
        <i data-lucide="brain"></i>
        AI Career Discovery Quiz
      </div>
      <h3 class="section-title">Discover Your Career Personality</h3>
      <p class="section-description mb-6">
        Question ${AppState.currentQuizStep + 1} of ${questions.length}: Let's understand your professional style
      </p>

      <div class="quiz-question">
        <div class="feature-icon bg-gradient-primary mb-4" style="margin: 0 auto;">
          <i data-lucide="${question.icon}"></i>
        </div>
        <h4 style="font-size: 1.25rem; margin-bottom: 1.5rem;">${question.question}</h4>
        
        <div class="quiz-options">
          ${question.options.map((option, index) => `
            <div class="quiz-option" data-trait="${option.trait}" onclick="selectQuizOption(this, '${option.trait}')">
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <div style="width: 1.5rem; height: 1.5rem; border: 2px solid hsl(var(--border)); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                  <div class="option-check" style="width: 0.75rem; height: 0.75rem; background: hsl(var(--primary)); border-radius: 50%; display: none;"></div>
                </div>
                <span style="font-weight: 500;">${option.text}</span>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="quiz-progress">
          ${questions.map((_, index) => `
            <div class="progress-dot ${index <= AppState.currentQuizStep ? 'active' : ''}"></div>
          `).join('')}
        </div>

        <div class="nav-buttons">
          <button class="btn btn-outline" onclick="previousQuizStep()" ${AppState.currentQuizStep === 0 ? 'style="visibility: hidden;"' : ''}>
            <i data-lucide="arrow-left"></i>
            Previous
          </button>
          <button class="btn btn-primary" id="next-quiz-btn" onclick="nextQuizStep()" disabled>
            Next Question
            <i data-lucide="arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  `;
  
  lucide.createIcons();
}

function selectQuizOption(element, trait) {
  // Remove previous selections
  const options = element.parentNode.querySelectorAll('.quiz-option');
  options.forEach(opt => {
    opt.classList.remove('selected');
    opt.querySelector('.option-check').style.display = 'none';
  });
  
  // Select current option
  element.classList.add('selected');
  element.querySelector('.option-check').style.display = 'block';
  
  // Enable next button
  document.getElementById('next-quiz-btn').disabled = false;
  
  // Store answer
  AppState.quizAnswers[AppState.currentQuizStep] = trait;
}

function nextQuizStep() {
  AppState.currentQuizStep++;
  const quizContainer = document.getElementById('quiz-demo');
  const questions = [
    {
      question: "You're leading a team project with a tight deadline. Your approach?",
      icon: "users",
      options: [
        { text: "Create detailed plans and delegate specific tasks to each team member", trait: "organizer" },
        { text: "Brainstorm creative solutions and encourage innovative thinking", trait: "innovator" },
        { text: "Focus on team morale and ensure everyone feels heard and valued", trait: "connector" },
        { text: "Analyze the problem thoroughly and develop data-driven strategies", trait: "strategist" }
      ]
    },
    {
      question: "In your ideal work environment, you'd be:",
      icon: "briefcase",
      options: [
        { text: "Designing cutting-edge solutions that push technological boundaries", trait: "innovator" },
        { text: "Building relationships and networks that create lasting impact", trait: "connector" },
        { text: "Planning strategic initiatives and optimizing organizational systems", trait: "strategist" },
        { text: "Coordinating complex projects and ensuring seamless execution", trait: "organizer" }
      ]
    },
    {
      question: "What energizes you most in professional settings?",
      icon: "zap",
      options: [
        { text: "Solving complex puzzles and discovering breakthrough insights", trait: "innovator" },
        { text: "Mentoring others and seeing them achieve their potential", trait: "connector" },
        { text: "Developing long-term vision and strategic roadmaps", trait: "strategist" },
        { text: "Bringing order to chaos and improving efficiency", trait: "organizer" }
      ]
    }
  ];
  
  renderQuizQuestion(quizContainer, questions);
}

function previousQuizStep() {
  if (AppState.currentQuizStep > 0) {
    AppState.currentQuizStep--;
    const quizContainer = document.getElementById('quiz-demo');
    const questions = [
      {
        question: "You're leading a team project with a tight deadline. Your approach?",
        icon: "users",
        options: [
          { text: "Create detailed plans and delegate specific tasks to each team member", trait: "organizer" },
          { text: "Brainstorm creative solutions and encourage innovative thinking", trait: "innovator" },
          { text: "Focus on team morale and ensure everyone feels heard and valued", trait: "connector" },
          { text: "Analyze the problem thoroughly and develop data-driven strategies", trait: "strategist" }
        ]
      },
      {
        question: "In your ideal work environment, you'd be:",
        icon: "briefcase",
        options: [
          { text: "Designing cutting-edge solutions that push technological boundaries", trait: "innovator" },
          { text: "Building relationships and networks that create lasting impact", trait: "connector" },
          { text: "Planning strategic initiatives and optimizing organizational systems", trait: "strategist" },
          { text: "Coordinating complex projects and ensuring seamless execution", trait: "organizer" }
        ]
      },
      {
        question: "What energizes you most in professional settings?",
        icon: "zap",
        options: [
          { text: "Solving complex puzzles and discovering breakthrough insights", trait: "innovator" },
          { text: "Mentoring others and seeing them achieve their potential", trait: "connector" },
          { text: "Developing long-term vision and strategic roadmaps", trait: "strategist" },
          { text: "Bringing order to chaos and improving efficiency", trait: "organizer" }
        ]
      }
    ];
    
    renderQuizQuestion(quizContainer, questions);
  }
}

function renderQuizResults(container) {
  // Calculate dominant trait
  const traitCounts = {};
  AppState.quizAnswers.forEach(trait => {
    traitCounts[trait] = (traitCounts[trait] || 0) + 1;
  });
  
  const dominantTrait = Object.keys(traitCounts).reduce((a, b) => 
    traitCounts[a] > traitCounts[b] ? a : b
  );

  const traitInfo = {
    innovator: {
      title: "The Innovator",
      description: "You're a creative problem-solver who thrives on breakthrough thinking and technological advancement.",
      careers: ["Software Engineer", "Product Designer", "Research Scientist", "Startup Founder"],
      color: "bg-gradient-primary"
    },
    connector: {
      title: "The Connector", 
      description: "You're a natural relationship builder who excels in people-focused roles and leadership positions.",
      careers: ["Human Resources Manager", "Project Manager", "Counselor", "Team Lead"],
      color: "bg-gradient-success"
    },
    strategist: {
      title: "The Strategist",
      description: "You're a big-picture thinker who loves planning, analysis, and long-term strategic development.",
      careers: ["Business Analyst", "Consultant", "Operations Manager", "Strategic Planner"],
      color: "bg-accent"
    },
    organizer: {
      title: "The Organizer", 
      description: "You excel at bringing structure to complexity and ensuring efficient project execution.",
      careers: ["Project Coordinator", "Operations Specialist", "Administrative Manager", "Process Analyst"],
      color: "bg-warning"
    }
  };

  const trait = traitInfo[dominantTrait];

  container.innerHTML = `
    <div class="quiz-container fade-in">
      <div class="section-badge mb-4" style="background: hsl(var(--success) / 0.1); color: hsl(var(--success));">
        <i data-lucide="check-circle"></i>
        Quiz Complete - AI Analysis Ready
      </div>
      <h3 class="section-title">Your Career Personality: ${trait.title}</h3>
      <p class="section-description mb-6">${trait.description}</p>

      <div class="card" style="background: var(--gradient-card); border: 2px solid hsl(var(--primary) / 0.2); padding: 2rem; margin-bottom: 2rem;">
        <div class="feature-icon ${trait.color} mb-4" style="margin: 0 auto;">
          <i data-lucide="star"></i>
        </div>
        <h4 style="font-size: 1.5rem; margin-bottom: 1rem;">Recommended Career Paths</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
          ${trait.careers.map(career => `
            <div style="background: hsl(var(--card)); border: 1px solid hsl(var(--border)); border-radius: 0.5rem; padding: 1rem; text-align: center;">
              <i data-lucide="target" style="margin-bottom: 0.5rem; color: hsl(var(--primary));"></i>
              <div style="font-weight: 500;">${career}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="card" style="background: hsl(var(--accent) / 0.1); border: 1px solid hsl(var(--accent) / 0.2); padding: 1.5rem;">
        <h4 style="color: hsl(var(--accent)); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
          <i data-lucide="brain"></i>
          Innovation Spotlight: AI Personality Analysis
        </h4>
        <div class="space-y-4">
          <div style="display: flex; align-items: start; gap: 0.75rem;">
            <i data-lucide="zap" style="color: hsl(var(--accent)); margin-top: 0.125rem;"></i>
            <div>
              <div style="font-weight: 500;">Behavioral Pattern Recognition</div>
              <div style="font-size: 0.875rem; color: hsl(var(--muted-foreground));">Advanced AI analyzes response patterns to identify core personality traits and work preferences</div>
            </div>
          </div>
          <div style="display: flex; align-items: start; gap: 0.75rem;">
            <i data-lucide="target" style="color: hsl(var(--accent)); margin-top: 0.125rem;"></i>
            <div>
              <div style="font-weight: 500;">Career-Trait Matching</div>
              <div style="font-size: 0.875rem; color: hsl(var(--muted-foreground));">Machine learning algorithms match personality profiles with successful career outcomes</div>
            </div>
          </div>
          <div style="display: flex; align-items: start; gap: 0.75rem;">
            <i data-lucide="trending-up" style="color: hsl(var(--accent)); margin-top: 0.125rem;"></i>
            <div>
              <div style="font-weight: 500;">Predictive Career Success</div>
              <div style="font-size: 0.875rem; color: hsl(var(--muted-foreground));">Data from 10,000+ career transitions validates personality-career fit accuracy</div>
            </div>
          </div>
        </div>
      </div>

      <div class="nav-buttons">
        <button class="btn btn-outline" onclick="restartQuiz()">
          <i data-lucide="refresh-cw"></i>
          Take Quiz Again
        </button>
        <button class="btn btn-primary" onclick="showFeature('visualizer')">
          Continue to Visualizer
          <i data-lucide="arrow-right"></i>
        </button>
      </div>
    </div>
  `;
  
  lucide.createIcons();
}

function restartQuiz() {
  AppState.currentQuizStep = 0;
  AppState.quizAnswers = [];
  initializeQuizDemo();
}

// Future Self Visualizer Implementation
function initializeVisualizerDemo() {
  const container = document.getElementById('visualizer-demo');
  renderVisualizerForm(container);
}

function renderVisualizerForm(container) {
  const steps = [
    {
      title: "Dream Career",
      icon: "target",
      field: "career",
      placeholder: "e.g., Sustainable Architecture, AI Research, Social Impact Design",
      description: "What role would make you excited to wake up every morning?"
    },
    {
      title: "Core Values", 
      icon: "star",
      field: "values",
      placeholder: "e.g., Innovation, Work-life balance, Making a difference",
      description: "What principles guide your ideal professional life?"
    },
    {
      title: "Lifestyle Vision",
      icon: "trending-up", 
      field: "lifestyle",
      placeholder: "e.g., Travel frequently, Remote work, Leading teams",
      description: "How do you envision your day-to-day professional life?"
    }
  ];

  if (AppState.visualizerStep >= steps.length) {
    renderVisionBoard(container);
    return;
  }

  const step = steps[AppState.visualizerStep];

  container.innerHTML = `
    <div class="quiz-container fade-in">
      <div class="section-badge mb-4">
        <i data-lucide="eye"></i>
        AI Vision Generator
      </div>
      <h3 class="section-title">Visualize Your Future Self</h3>
      <p class="section-description mb-6">
        Step ${AppState.visualizerStep + 1} of ${steps.length}: Let's create your personalized career vision
      </p>

      <div class="card" style="background: var(--gradient-card); border: 2px solid hsl(var(--primary) / 0.2); padding: 2rem;">
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
          <div class="feature-icon bg-gradient-primary">
            <i data-lucide="${step.icon}"></i>
          </div>
          <div>
            <h4 style="font-size: 1.25rem; margin-bottom: 0.5rem;">${step.title}</h4>
            <p style="color: hsl(var(--muted-foreground));">${step.description}</p>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" style="font-weight: 500; font-size: 1rem;">
            Describe your vision:
          </label>
          <input 
            type="text" 
            class="form-input" 
            id="visualizer-input"
            placeholder="${step.placeholder}"
            value="${AppState.visualizerData[step.field] || ''}"
            style="height: 3rem; font-size: 1rem;"
            oninput="updateVisualizerData('${step.field}', this.value)"
          />
        </div>

        <div class="quiz-progress">
          ${steps.map((_, index) => `
            <div class="progress-dot ${index <= AppState.visualizerStep ? 'active' : ''}"></div>
          `).join('')}
        </div>

        <div class="nav-buttons">
          <button class="btn btn-outline" onclick="previousVisualizerStep()" ${AppState.visualizerStep === 0 ? 'style="visibility: hidden;"' : ''}>
            <i data-lucide="arrow-left"></i>
            Previous
          </button>
          <button class="btn btn-primary" onclick="nextVisualizerStep()" ${!AppState.visualizerData[step.field] ? 'disabled' : ''}>
            ${AppState.visualizerStep === steps.length - 1 ? 'Generate Vision Board' : 'Next Step'}
            <i data-lucide="${AppState.visualizerStep === steps.length - 1 ? 'sparkles' : 'target'}"></i>
          </button>
        </div>
      </div>
    </div>
  `;
  
  lucide.createIcons();
}

function updateVisualizerData(field, value) {
  AppState.visualizerData[field] = value;
  
  // Update button state
  const nextBtn = document.querySelector('.nav-buttons .btn-primary');
  if (value.trim()) {
    nextBtn.disabled = false;
  } else {
    nextBtn.disabled = true;
  }
}

function nextVisualizerStep() {
  AppState.visualizerStep++;
  const container = document.getElementById('visualizer-demo');
  renderVisualizerForm(container);
}

function previousVisualizerStep() {
  if (AppState.visualizerStep > 0) {
    AppState.visualizerStep--;
    const container = document.getElementById('visualizer-demo');
    renderVisualizerForm(container);
  }
}

function renderVisionBoard(container) {
  const visionElements = [
    {
      title: "Your Ideal Workspace",
      description: "A modern, eco-friendly office with collaborative spaces",
      color: "bg-gradient-primary",
      icon: "🏢"
    },
    {
      title: "Daily Impact", 
      description: "Projects that create positive change in communities",
      color: "bg-gradient-success",
      icon: "🌱"
    },
    {
      title: "Team Dynamics",
      description: "Leading diverse, innovative teams toward shared goals", 
      color: "bg-accent",
      icon: "👥"
    },
    {
      title: "Growth Trajectory",
      description: "Continuous learning and expertise development",
      color: "bg-warning", 
      icon: "📈"
    },
    {
      title: "Work-Life Harmony",
      description: "Flexible schedule enabling personal passions",
      color: "bg-gradient-success",
      icon: "⚖️"
    },
    {
      title: "Recognition",
      description: "Industry leadership and meaningful achievements",
      color: "bg-gradient-primary",
      icon: "🏆"
    }
  ];

  container.innerHTML = `
    <div class="quiz-container fade-in">
      <div class="section-badge mb-4" style="background: var(--gradient-primary); color: white;">
        <i data-lucide="sparkles"></i>
        AI-Generated Vision Board
      </div>
      <h3 class="section-title">Your Future Self Visualization</h3>
      <p class="section-description mb-6">
        Based on your inputs, here's a personalized vision of your career future:
      </p>

      <div style="background: var(--gradient-hero); border-radius: 1rem; padding: 2rem; color: white; margin-bottom: 2rem; text-align: center;">
        <h4 style="font-size: 2rem; font-weight: 700; margin-bottom: 1rem;">
          ${AppState.visualizerData.career || "Your Dream Career"}
        </h4>
        <p style="font-size: 1.25rem; opacity: 0.9; margin-bottom: 0.5rem;">
          Living by: ${AppState.visualizerData.values || "Your core values"}
        </p>
        <p style="opacity: 0.75;">
          ${AppState.visualizerData.lifestyle || "Your ideal lifestyle"}
        </p>
      </div>

      <div class="vision-board">
        ${visionElements.map((element, index) => `
          <div class="vision-card">
            <div class="vision-icon">${element.icon}</div>
            <h4 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.75rem;">${element.title}</h4>
            <p style="font-size: 0.875rem; color: hsl(var(--muted-foreground));">${element.description}</p>
          </div>
        `).join('')}
      </div>

      <div class="card" style="background: hsl(var(--accent) / 0.1); border: 1px solid hsl(var(--accent) / 0.2); padding: 1.5rem; margin-top: 2rem;">
        <h4 style="color: hsl(var(--accent)); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
          <i data-lucide="eye"></i>
          Innovation Spotlight: Visualization Psychology
        </h4>
        <div class="space-y-4">
          <div style="display: flex; align-items: start; gap: 0.75rem;">
            <i data-lucide="zap" style="color: hsl(var(--accent)); margin-top: 0.125rem;"></i>
            <div>
              <div style="font-weight: 500;">Neuroscience-Based Approach</div>
              <div style="font-size: 0.875rem; color: hsl(var(--muted-foreground));">Visual manifestation activates the same neural pathways as actual achievement</div>
            </div>
          </div>
          <div style="display: flex; align-items: start; gap: 0.75rem;">
            <i data-lucide="palette" style="color: hsl(var(--accent)); margin-top: 0.125rem;"></i>
            <div>
              <div style="font-weight: 500;">Personalized AI Generation</div>
              <div style="font-size: 0.875rem; color: hsl(var(--muted-foreground));">Each element is uniquely crafted based on individual responses and career psychology</div>
            </div>
          </div>
          <div style="display: flex; align-items: start; gap: 0.75rem;">
            <i data-lucide="sparkles" style="color: hsl(var(--accent)); margin-top: 0.125rem;"></i>
            <div>
              <div style="font-weight: 500;">Future-Self Visualization</div>
              <div style="font-size: 0.875rem; color: hsl(var(--muted-foreground));">Creates emotional connection to career goals, proven to increase motivation by 300%</div>
            </div>
          </div>
        </div>
      </div>

      <div class="nav-buttons">
        <button class="btn btn-outline" onclick="resetVisualizer()">
          <i data-lucide="refresh-cw"></i>
          Create New Vision Board
        </button>
        <button class="btn btn-primary" onclick="showFeature('narrative')">
          Continue to Journey
          <i data-lucide="arrow-right"></i>
        </button>
      </div>
    </div>
  `;
  
  lucide.createIcons();
}

function resetVisualizer() {
  AppState.visualizerStep = 0;
  AppState.visualizerData = { career: '', values: '', lifestyle: '' };
  initializeVisualizerDemo();
}

// Personalized Narrative Implementation
function initializeNarrativeDemo() {
  const container = document.getElementById('narrative-demo');
  renderPersonaSelection(container);
}

function renderPersonaSelection(container) {
  const personas = [
    {
      id: "innovator",
      title: "The Innovator", 
      description: "Creative problem-solver who thrives on breakthrough thinking",
      traits: ["Creative", "Analytical", "Technical"],
      color: "bg-gradient-primary"
    },
    {
      id: "connector",
      title: "The Connector",
      description: "Natural relationship builder who excels in people-focused roles", 
      traits: ["Empathy", "Communication", "Leadership"],
      color: "bg-gradient-success"
    },
    {
      id: "strategist", 
      title: "The Strategist",
      description: "Big-picture thinker who loves planning and execution",
      traits: ["Strategic", "Management", "Research"], 
      color: "bg-accent"
    }
  ];

  container.innerHTML = `
    <div class="quiz-container fade-in">
      <div class="section-badge mb-4">
        <i data-lucide="brain"></i>
        AI Narrative Engine
      </div>
      <h3 class="section-title">Your Personalized Learning Journey</h3>
      <p class="section-description mb-6">
        Based on your quiz results, select your primary persona to see your tailored pathway:
      </p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
        ${personas.map(persona => `
          <div class="feature-card" onclick="selectPersona('${persona.id}')" style="border: 2px solid hsl(var(--border));">
            <div class="feature-icon ${persona.color} mb-4">
              <i data-lucide="sparkles"></i>
            </div>
            <h4 style="font-size: 1.25rem; margin-bottom: 1rem;">${persona.title}</h4>
            <p style="color: hsl(var(--muted-foreground)); margin-bottom: 1.5rem;">${persona.description}</p>
            
            <div style="margin-bottom: 1.5rem;">
              <p style="font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem;">Key Traits:</p>
              <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                ${persona.traits.map(trait => `
                  <span style="background: hsl(var(--muted)); color: hsl(var(--muted-foreground)); padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem;">${trait}</span>
                `).join('')}
              </div>
            </div>
            
            <div class="feature-btn">
              <i data-lucide="book-open"></i>
              View My Journey
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  lucide.createIcons();
}

function selectPersona(personaId) {
  AppState.selectedPersona = personaId;
  const container = document.getElementById('narrative-demo');
  renderPersonalizedNarrative(container, personaId);
}

function renderPersonalizedNarrative(container, personaId) {
  const narratives = {
    innovator: {
      title: "Your Innovation Journey: From Curiosity to Impact",
      story: "Based on your creative mindset and technical aptitude, you're naturally drawn to roles where you can solve complex problems and create something new. Your analytical nature means you don't just dream - you build.",
      pathway: [
        {
          phase: "Foundation Years (Year 1-2)",
          focus: "Building Technical Excellence", 
          courses: ["Computer Science Fundamentals", "Design Thinking & Innovation", "Mathematical Problem Solving"],
          why: "Your analytical mind needs strong technical foundations to channel creativity effectively"
        },
        {
          phase: "Specialization (Year 2-3)",
          focus: "Choosing Your Innovation Domain",
          courses: ["AI & Machine Learning", "Human-Computer Interaction", "Entrepreneurship & Startup Culture"],
          why: "Your creative-technical combination thrives in emerging tech fields"
        },
        {
          phase: "Application (Year 3-4)", 
          focus: "Real-World Impact",
          courses: ["Capstone Innovation Project", "Industry Collaboration", "Technology Ethics & Society"],
          why: "You need hands-on experience to see your innovations make a difference"
        }
      ]
    },
    connector: {
      title: "Your Leadership Journey: From Empathy to Influence",
      story: "Your natural empathy and communication skills position you perfectly for roles where human connection drives success. You don't just manage - you inspire and unite people toward common goals.",
      pathway: [
        {
          phase: "Foundation Years (Year 1-2)",
          focus: "Understanding People & Systems",
          courses: ["Psychology & Human Behavior", "Communication & Public Speaking", "Organizational Behavior"],
          why: "Your empathetic nature needs academic grounding in human psychology"
        },
        {
          phase: "Specialization (Year 2-3)",
          focus: "Building Leadership Skills", 
          courses: ["Team Management & Leadership", "Conflict Resolution & Mediation", "Cultural Intelligence & Diversity"],
          why: "Your natural people skills need structured development for professional impact"
        },
        {
          phase: "Application (Year 3-4)",
          focus: "Leading Change",
          courses: ["Change Management", "Community Engagement Projects", "Mentorship & Coaching"], 
          why: "You're meant to guide others - these experiences prepare you for that role"
        }
      ]
    },
    strategist: {
      title: "Your Strategic Journey: From Analysis to Achievement", 
      story: "Your strategic thinking and research orientation make you a natural at seeing the big picture and creating actionable plans. You don't just execute - you envision and orchestrate success.",
      pathway: [
        {
          phase: "Foundation Years (Year 1-2)",
          focus: "Building Analytical Framework",
          courses: ["Business Strategy & Analysis", "Research Methodology", "Economics & Market Dynamics"],
          why: "Your strategic mind needs solid analytical foundations and market understanding"
        },
        {
          phase: "Specialization (Year 2-3)",
          focus: "Mastering Strategic Tools",
          courses: ["Project Management & Operations", "Data Analytics & Decision Science", "Innovation Strategy"],
          why: "Your planning abilities shine when combined with modern strategic tools"
        },
        {
          phase: "Application (Year 3-4)",
          focus: "Strategic Leadership", 
          courses: ["Strategic Consulting Projects", "Executive Decision Making", "Future Trends & Scenario Planning"],
          why: "You're destined to shape organizational direction - gain the experience now"
        }
      ]
    }
  };

  const narrative = narratives[personaId];

  container.innerHTML = `
    <div class="quiz-container fade-in">
      <div class="section-badge mb-4" style="background: var(--gradient-primary); color: white;">
        <i data-lucide="book-open"></i>
        Your Personalized Journey
      </div>
      <h3 class="section-title">${narrative.title}</h3>

      <div class="card" style="background: var(--gradient-hero); color: white; padding: 2rem; margin-bottom: 2rem;">
        <h4 style="font-size: 1.25rem; margin-bottom: 1rem;">Your Personal Story</h4>
        <p style="font-size: 1.125rem; line-height: 1.6; opacity: 0.95;">${narrative.story}</p>
      </div>

      <div style="margin-bottom: 2rem;">
        <h4 style="font-size: 1.25rem; font-weight: 700; text-align: center; margin-bottom: 2rem;">Your 4-Year Strategic Pathway</h4>
        
        <div class="space-y-6">
          ${narrative.pathway.map((phase, index) => `
            <div class="card" style="background: var(--gradient-card); border-left: 4px solid hsl(var(--primary)); padding: 2rem;">
              <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                <div style="width: 2.5rem; height: 2.5rem; background: var(--gradient-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700;">
                  ${index + 1}
                </div>
                <div>
                  <h5 style="font-size: 1.125rem; font-weight: 600;">${phase.phase}</h5>
                  <p style="color: hsl(var(--primary)); font-weight: 500;">${phase.focus}</p>
                </div>
              </div>
              
              <div style="background: hsl(var(--muted) / 0.5); border-radius: 0.5rem; padding: 1rem; margin-bottom: 1.5rem;">
                <p style="font-size: 0.875rem; font-weight: 500; color: hsl(var(--accent)); margin-bottom: 0.5rem;">Why this matters for you:</p>
                <p style="font-size: 0.875rem;">${phase.why}</p>
              </div>
              
              <div>
                <p style="font-weight: 500; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                  <i data-lucide="target" style="color: hsl(var(--primary));"></i>
                  Recommended Courses:
                </p>
                <div style="display: grid; gap: 0.5rem;">
                  ${phase.courses.map(course => `
                    <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem;">
                      <i data-lucide="star" style="width: 0.75rem; height: 0.75rem; color: hsl(var(--warning));"></i>
                      <span>${course}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="card" style="background: hsl(var(--accent) / 0.1); border: 1px solid hsl(var(--accent) / 0.2); padding: 1.5rem; margin-bottom: 2rem;">
        <h4 style="color: hsl(var(--accent)); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
          <i data-lucide="brain"></i>
          Innovation Spotlight: AI-Powered Personalization
        </h4>
        <div class="space-y-4">
          <div style="display: flex; align-items: start; gap: 0.75rem;">
            <i data-lucide="users" style="color: hsl(var(--accent)); margin-top: 0.125rem;"></i>
            <div>
              <div style="font-weight: 500;">Personality-Driven Recommendations</div>
              <div style="font-size: 0.875rem; color: hsl(var(--muted-foreground));">Courses aren't just relevant - they match your psychological makeup and learning style</div>
            </div>
          </div>
          <div style="display: flex; align-items: start; gap: 0.75rem;">
            <i data-lucide="clock" style="color: hsl(var(--accent)); margin-top: 0.125rem;"></i>
            <div>
              <div style="font-weight: 500;">Temporal Learning Architecture</div>
              <div style="font-size: 0.875rem; color: hsl(var(--muted-foreground));">Each phase builds on previous knowledge while preparing for future challenges</div>
            </div>
          </div>
          <div style="display: flex; align-items: start; gap: 0.75rem;">
            <i data-lucide="trending-up" style="color: hsl(var(--accent)); margin-top: 0.125rem;"></i>
            <div>
              <div style="font-weight: 500;">Story-Driven Motivation</div>
              <div style="font-size: 0.875rem; color: hsl(var(--muted-foreground));">Unlike generic lists, this narrative helps you see WHY each step matters to YOUR journey</div>
            </div>
          </div>
        </div>
      </div>

      <div class="nav-buttons">
        <button class="btn btn-outline" onclick="renderPersonaSelection(document.getElementById('narrative-demo'))">
          <i data-lucide="arrow-left"></i>
          Explore Different Persona
        </button>
        <button class="btn btn-primary" onclick="showFeature('stories')">
          View Success Stories
          <i data-lucide="arrow-right"></i>
        </button>
      </div>
    </div>
  `;
  
  lucide.createIcons();
}

// Success Stories Implementation
function initializeStoriesDemo() {
  const container = document.getElementById('stories-demo');
  
  const stories = [
    {
      name: "Priya Sharma",
      role: "Software Engineer at Google",
      college: "Government Engineering College, Mumbai",
      image: "👩‍💻",
      story: "I was uncertain about my career path until I discovered my passion for coding through this platform's guidance. The personalized recommendations helped me focus on the right skills.",
      achievement: "Landed dream job at Google within 6 months of graduation",
      linkedin: "#"
    },
    {
      name: "Rahul Gupta", 
      role: "Product Manager at Flipkart",
      college: "Government Polytechnic, Delhi",
      image: "👨‍💼",
      story: "The platform's career personality quiz revealed my strategic thinking abilities. It guided me toward product management, which perfectly matches my skills.",
      achievement: "Promoted to Senior PM within 2 years",
      linkedin: "#"
    },
    {
      name: "Anjali Verma",
      role: "UX Designer at Zomato", 
      college: "Government Arts College, Bangalore",
      image: "👩‍🎨",
      story: "Coming from a non-technical background, I was lost. This platform showed me how my creative skills could translate into a tech career through UX design.",
      achievement: "Leading design for 5M+ user features",
      linkedin: "#"
    }
  ];

  container.innerHTML = `
    <div class="quiz-container fade-in">
      <div class="section-badge mb-4">
        <i data-lucide="users"></i>
        Local Success Stories
      </div>
      <h3 class="section-title">Real Stories from Government College Alumni</h3>
      <p class="section-description mb-6">
        Discover how students from local government colleges transformed their careers using our platform
      </p>

      <div style="display: grid; gap: 2rem;">
        ${stories.map((story, index) => `
          <div class="card" style="padding: 2rem; transition: var(--transition-smooth);" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='translateY(0)'">
            <div style="display: flex; align-items: start; gap: 1.5rem; margin-bottom: 1.5rem;">
              <div style="font-size: 3rem;">${story.image}</div>
              <div style="flex: 1;">
                <h4 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.25rem;">${story.name}</h4>
                <p style="color: hsl(var(--primary)); font-weight: 500; margin-bottom: 0.25rem;">${story.role}</p>
                <p style="font-size: 0.875rem; color: hsl(var(--muted-foreground));">${story.college}</p>
              </div>
              <button class="btn btn-outline" style="padding: 0.5rem; border-radius: 50%;">
                <i data-lucide="linkedin"></i>
              </button>
            </div>
            
            <blockquote style="border-left: 4px solid hsl(var(--primary)); padding-left: 1rem; margin: 1.5rem 0; font-style: italic; color: hsl(var(--muted-foreground));">
              "${story.story}"
            </blockquote>
            
            <div style="background: hsl(var(--success) / 0.1); border: 1px solid hsl(var(--success) / 0.2); border-radius: 0.5rem; padding: 1rem;">
              <div style="display: flex; align-items: center; gap: 0.5rem; color: hsl(var(--success)); font-weight: 500; margin-bottom: 0.5rem;">
                <i data-lucide="trophy"></i>
                Key Achievement
              </div>
              <p style="font-size: 0.875rem;">${story.achievement}</p>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="card" style="background: hsl(var(--accent) / 0.1); border: 1px solid hsl(var(--accent) / 0.2); padding: 1.5rem; margin-top: 2rem;">
        <h4 style="color: hsl(var(--accent)); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
          <i data-lucide="shield-check"></i>
          Innovation Spotlight: Trust & Authenticity Engine
        </h4>
        <div class="space-y-4">
          <div style="display: flex; align-items: start; gap: 0.75rem;">
            <i data-lucide="map-pin" style="color: hsl(var(--accent)); margin-top: 0.125rem;"></i>
            <div>
              <div style="font-weight: 500;">Local Context Matching</div>
              <div style="font-size: 0.875rem; color: hsl(var(--muted-foreground));">Stories specifically from government colleges in your region to build genuine connection</div>
            </div>
          </div>
          <div style="display: flex; align-items: start; gap: 0.75rem;">
            <i data-lucide="check-circle" style="color: hsl(var(--accent)); margin-top: 0.125rem;"></i>
            <div>
              <div style="font-weight: 500;">Verified Success Tracking</div>
              <div style="font-size: 0.875rem; color: hsl(var(--muted-foreground));">Real LinkedIn profiles and career outcomes verified through professional networks</div>
            </div>
          </div>
          <div style="display: flex; align-items: start; gap: 0.75rem;">
            <i data-lucide="heart" style="color: hsl(var(--accent)); margin-top: 0.125rem;"></i>
            <div>
              <div style="font-weight: 500;">Emotional Resonance</div>
              <div style="font-size: 0.875rem; color: hsl(var(--muted-foreground));">Stories address specific doubts and fears government college students face about career prospects</div>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center" style="margin-top: 2rem;">
        <button class="btn btn-primary" onclick="showFeature('quiz')">
          <i data-lucide="play"></i>
          Start Your Own Success Story
        </button>
      </div>
    </div>
  `;
  
  lucide.createIcons();
}