import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Target, Users, Brain, Lightbulb, Play } from "lucide-react";
import QuizDemo from "@/components/QuizDemo";
import FutureSelfVisualizer from "@/components/FutureSelfVisualizer";
import PersonalizedNarrative from "@/components/PersonalizedNarrative";
import SuccessStories from "@/components/SuccessStories";

const Index = () => {
  const [currentDemo, setCurrentDemo] = useState<string | null>(null);

  const features = [
    {
      id: "quiz",
      icon: Brain,
      title: "Gamified Aptitude Quiz",
      description: "Story-driven scenarios that make career discovery engaging and insightful",
      innovation: "Unlike boring traditional assessments, our quiz uses narrative psychology and game mechanics",
      color: "bg-gradient-primary"
    },
    {
      id: "visualizer",
      icon: Sparkles,
      title: "My Future Self Visualizer",
      description: "AI-generated vision boards that help students see their aspirational career paths",
      innovation: "First-of-its-kind visual manifestation tool combining AI with career psychology",
      color: "bg-gradient-success"
    },
    {
      id: "narrative",
      icon: Target,
      title: "Personalized AI Narrative",
      description: "Unique, tailored course recommendations based on personality and quiz insights",
      innovation: "Goes beyond basic matching - creates compelling personal stories of growth",
      color: "bg-accent"
    },
    {
      id: "stories",
      icon: Users,
      title: "Local Success Stories",
      description: "Authentic testimonials from local college alumni to build trust and inspiration",
      innovation: "Hyper-local social proof that counters negative perceptions with real success",
      color: "bg-warning"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - The Emotional Hook */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30">
            Innovation & Creativity Demo
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            What If Students Could
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">
              See Their Future?
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 leading-relaxed">
            Every year, millions of students face the same crushing uncertainty: 
            <strong> "What should I do with my life?"</strong> Traditional career guidance 
            fails them with boring tests and generic advice.
          </p>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 max-w-2xl mx-auto border border-white/20">
            <p className="text-lg italic">
              "I have no idea what career suits me. The tests are boring, 
              the advice is generic, and I can't imagine my future."
            </p>
            <p className="text-sm mt-2 opacity-75">- Every confused student</p>
          </div>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 shadow-strong text-lg px-8 py-6"
            onClick={() => document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            See The Solution
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Innovation Features Overview */}
      <section id="demo-section" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Lightbulb className="w-4 h-4 mr-2" />
              Innovation Showcase
            </Badge>
            <h2 className="text-4xl font-bold mb-6">
              Four Revolutionary Features That Change Everything
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Each feature represents a breakthrough in career guidance technology, 
              designed to solve real problems with creative, never-before-seen solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.id} className="group hover:shadow-medium transition-all duration-300 border-2 hover:border-primary/20 bg-gradient-card">
                  <CardHeader>
                    <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-accent/10 rounded-lg p-4 mb-4">
                      <p className="text-sm font-medium text-accent-foreground">
                        <strong>Innovation:</strong> {feature.innovation}
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                      onClick={() => setCurrentDemo(feature.id)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Live Demo Section */}
          {currentDemo && (
            <div className="bg-gradient-card rounded-2xl p-8 shadow-strong border-2 border-primary/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Live Feature Demo</h3>
                <Button 
                  variant="ghost" 
                  onClick={() => setCurrentDemo(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Close Demo
                </Button>
              </div>
              
              {currentDemo === "quiz" && <QuizDemo />}
              {currentDemo === "visualizer" && <FutureSelfVisualizer />}
              {currentDemo === "narrative" && <PersonalizedNarrative />}
              {currentDemo === "stories" && <SuccessStories />}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Career Guidance?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            This is just the beginning. Each feature represents months of research, 
            innovative thinking, and creative problem-solving.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90"
            >
              Start Full Demo Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              Technical Deep Dive
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;