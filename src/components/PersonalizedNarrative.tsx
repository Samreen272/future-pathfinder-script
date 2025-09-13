import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Sparkles, Target, Users, Brain, Star, Clock, TrendingUp } from "lucide-react";

const PersonalizedNarrative = () => {
  const [showNarrative, setShowNarrative] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);

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

  const narrativeContent = {
    innovator: {
      title: "Your Innovation Journey: From Curiosity to Impact",
      story: `Based on your creative mindset and technical aptitude, you're naturally drawn to roles where you can solve complex problems and create something new. Your analytical nature means you don't just dream - you build.`,
      pathway: [
        {
          phase: "Foundation Years (Year 1-2)",
          focus: "Building Technical Excellence",
          courses: [
            "Computer Science Fundamentals",
            "Design Thinking & Innovation",
            "Mathematical Problem Solving"
          ],
          why: "Your analytical mind needs strong technical foundations to channel creativity effectively"
        },
        {
          phase: "Specialization (Year 2-3)",
          focus: "Choosing Your Innovation Domain",
          courses: [
            "AI & Machine Learning",
            "Human-Computer Interaction", 
            "Entrepreneurship & Startup Culture"
          ],
          why: "Your creative-technical combination thrives in emerging tech fields"
        },
        {
          phase: "Application (Year 3-4)",
          focus: "Real-World Impact",
          courses: [
            "Capstone Innovation Project",
            "Industry Collaboration",
            "Technology Ethics & Society"
          ],
          why: "You need hands-on experience to see your innovations make a difference"
        }
      ]
    },
    connector: {
      title: "Your Leadership Journey: From Empathy to Influence",
      story: `Your natural empathy and communication skills position you perfectly for roles where human connection drives success. You don't just manage - you inspire and unite people toward common goals.`,
      pathway: [
        {
          phase: "Foundation Years (Year 1-2)",
          focus: "Understanding People & Systems",
          courses: [
            "Psychology & Human Behavior",
            "Communication & Public Speaking",
            "Organizational Behavior"
          ],
          why: "Your empathetic nature needs academic grounding in human psychology"
        },
        {
          phase: "Specialization (Year 2-3)",
          focus: "Building Leadership Skills",
          courses: [
            "Team Management & Leadership",
            "Conflict Resolution & Mediation",
            "Cultural Intelligence & Diversity"
          ],
          why: "Your natural people skills need structured development for professional impact"
        },
        {
          phase: "Application (Year 3-4)",
          focus: "Leading Change",
          courses: [
            "Change Management",
            "Community Engagement Projects",
            "Mentorship & Coaching"
          ],
          why: "You're meant to guide others - these experiences prepare you for that role"
        }
      ]
    },
    strategist: {
      title: "Your Strategic Journey: From Analysis to Achievement",
      story: `Your strategic thinking and research orientation make you a natural at seeing the big picture and creating actionable plans. You don't just execute - you envision and orchestrate success.`,
      pathway: [
        {
          phase: "Foundation Years (Year 1-2)",
          focus: "Building Analytical Framework",
          courses: [
            "Business Strategy & Analysis",
            "Research Methodology",
            "Economics & Market Dynamics"
          ],
          why: "Your strategic mind needs solid analytical foundations and market understanding"
        },
        {
          phase: "Specialization (Year 2-3)",
          focus: "Mastering Strategic Tools",
          courses: [
            "Project Management & Operations",
            "Data Analytics & Decision Science",
            "Innovation Strategy"
          ],
          why: "Your planning abilities shine when combined with modern strategic tools"
        },
        {
          phase: "Application (Year 3-4)",
          focus: "Strategic Leadership",
          courses: [
            "Strategic Consulting Projects",
            "Executive Decision Making",
            "Future Trends & Scenario Planning"
          ],
          why: "You're destined to shape organizational direction - gain the experience now"
        }
      ]
    }
  };

  const handlePersonaSelect = (personaId: string) => {
    setSelectedPersona(personaId);
    setShowNarrative(true);
  };

  if (showNarrative && selectedPersona) {
    const narrative = narrativeContent[selectedPersona as keyof typeof narrativeContent];
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <Badge className="mb-4 bg-gradient-primary text-white">
            <BookOpen className="w-4 h-4 mr-2" />
            Your Personalized Journey
          </Badge>
          <h3 className="text-2xl font-bold mb-4">{narrative.title}</h3>
        </div>

        <Card className="bg-gradient-hero text-white">
          <CardHeader>
            <CardTitle className="text-xl">Your Personal Story</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed opacity-95">{narrative.story}</p>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <h4 className="text-xl font-bold text-center">Your 4-Year Strategic Pathway</h4>
          
          {narrative.pathway.map((phase, index) => (
            <Card key={index} className="bg-gradient-card border-l-4 border-l-primary">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{phase.phase}</CardTitle>
                    <CardDescription className="text-base font-medium text-primary">
                      {phase.focus}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm font-medium mb-2 text-accent">Why this matters for you:</p>
                  <p className="text-sm">{phase.why}</p>
                </div>
                
                <div>
                  <p className="font-medium mb-3 flex items-center">
                    <Target className="w-4 h-4 mr-2 text-primary" />
                    Recommended Courses:
                  </p>
                  <div className="grid gap-2">
                    {phase.courses.map((course, courseIndex) => (
                      <div key={courseIndex} className="flex items-center space-x-2 text-sm">
                        <Star className="w-3 h-3 text-warning" />
                        <span>{course}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-accent/10 border-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center text-accent">
              <Brain className="w-5 h-5 mr-2" />
              Innovation Spotlight: AI-Powered Personalization
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start space-x-3">
              <Users className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <p className="font-medium">Personality-Driven Recommendations</p>
                <p className="text-sm text-muted-foreground">Courses aren't just relevant - they match your psychological makeup and learning style</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <p className="font-medium">Temporal Learning Architecture</p>
                <p className="text-sm text-muted-foreground">Each phase builds on previous knowledge while preparing for future challenges</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <TrendingUp className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <p className="font-medium">Story-Driven Motivation</p>
                <p className="text-sm text-muted-foreground">Unlike generic lists, this narrative helps you see WHY each step matters to YOUR journey</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button 
            variant="outline"
            onClick={() => {
              setShowNarrative(false);
              setSelectedPersona(null);
            }}
          >
            Explore Different Persona
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Badge variant="outline" className="mb-4">
          <Brain className="w-4 h-4 mr-2" />
          AI Narrative Engine
        </Badge>
        <h3 className="text-2xl font-bold mb-2">Your Personalized Learning Journey</h3>
        <p className="text-muted-foreground">
          Based on your quiz results, select your primary persona to see your tailored pathway:
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {personas.map((persona) => (
          <Card 
            key={persona.id} 
            className="group hover:shadow-medium transition-all duration-300 cursor-pointer border-2 hover:border-primary/30"
            onClick={() => handlePersonaSelect(persona.id)}
          >
            <CardHeader>
              <div className={`w-12 h-12 ${persona.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl">{persona.title}</CardTitle>
              <CardDescription className="text-base">
                {persona.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <p className="text-sm font-medium">Key Traits:</p>
                <div className="flex flex-wrap gap-2">
                  {persona.traits.map((trait, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                View My Journey
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PersonalizedNarrative;