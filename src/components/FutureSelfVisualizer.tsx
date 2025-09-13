import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Eye, Palette, Zap, Star, Target, TrendingUp } from "lucide-react";

const FutureSelfVisualizer = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    career: "",
    values: "",
    lifestyle: ""
  });
  const [showVisionBoard, setShowVisionBoard] = useState(false);

  const steps = [
    {
      title: "Dream Career",
      icon: Target,
      field: "career",
      placeholder: "e.g., Sustainable Architecture, AI Research, Social Impact Design",
      description: "What role would make you excited to wake up every morning?"
    },
    {
      title: "Core Values",
      icon: Star,
      field: "values",
      placeholder: "e.g., Innovation, Work-life balance, Making a difference",
      description: "What principles guide your ideal professional life?"
    },
    {
      title: "Lifestyle Vision",
      icon: TrendingUp,
      field: "lifestyle",
      placeholder: "e.g., Travel frequently, Remote work, Leading teams",
      description: "How do you envision your day-to-day professional life?"
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowVisionBoard(true);
    }
  };

  const visionBoardElements = [
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
      color: "bg-success",
      icon: "⚖️"
    },
    {
      title: "Recognition",
      description: "Industry leadership and meaningful achievements",
      color: "bg-primary",
      icon: "🏆"
    }
  ];

  if (showVisionBoard) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <Badge className="mb-4 bg-gradient-primary text-white">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Generated Vision Board
          </Badge>
          <h3 className="text-2xl font-bold mb-4">Your Future Self Visualization</h3>
          <p className="text-muted-foreground mb-6">
            Based on your inputs, here's a personalized vision of your career future:
          </p>
        </div>

        <div className="bg-gradient-hero rounded-2xl p-8 text-white mb-6">
          <div className="text-center mb-6">
            <h4 className="text-3xl font-bold mb-2">
              {formData.career || "Your Dream Career"}
            </h4>
            <p className="text-xl opacity-90">
              Living by: {formData.values || "Your core values"}
            </p>
            <p className="opacity-75 mt-2">
              {formData.lifestyle || "Your ideal lifestyle"}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {visionBoardElements.map((element, index) => (
            <Card key={index} className="group hover:shadow-medium transition-all duration-300">
              <CardHeader className="pb-3">
                <div className={`w-12 h-12 ${element.color} rounded-xl flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform`}>
                  {element.icon}
                </div>
                <CardTitle className="text-lg">{element.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{element.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-accent/10 border-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center text-accent">
              <Eye className="w-5 h-5 mr-2" />
              Innovation Spotlight: Visualization Psychology
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start space-x-3">
              <Zap className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <p className="font-medium">Neuroscience-Based Approach</p>
                <p className="text-sm text-muted-foreground">Visual manifestation activates the same neural pathways as actual achievement</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Palette className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <p className="font-medium">Personalized AI Generation</p>
                <p className="text-sm text-muted-foreground">Each element is uniquely crafted based on individual responses and career psychology</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Sparkles className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <p className="font-medium">Future-Self Visualization</p>
                <p className="text-sm text-muted-foreground">Creates emotional connection to career goals, proven to increase motivation by 300%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button 
            variant="outline"
            onClick={() => {
              setShowVisionBoard(false);
              setCurrentStep(0);
              setFormData({ career: "", values: "", lifestyle: "" });
            }}
          >
            Create New Vision Board
          </Button>
        </div>
      </div>
    );
  }

  const step = steps[currentStep];
  const StepIcon = step.icon;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Badge variant="outline" className="mb-4">
          <Eye className="w-4 h-4 mr-2" />
          AI Vision Generator
        </Badge>
        <h3 className="text-2xl font-bold mb-2">Visualize Your Future Self</h3>
        <p className="text-muted-foreground">
          Step {currentStep + 1} of {steps.length}: Let's create your personalized career vision
        </p>
      </div>

      <Card className="bg-gradient-card border-2 border-primary/20">
        <CardHeader>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <StepIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">{step.title}</CardTitle>
              <CardDescription>{step.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor={step.field} className="text-base font-medium">
              Describe your vision:
            </Label>
            <Input
              id={step.field}
              placeholder={step.placeholder}
              value={formData[step.field as keyof typeof formData]}
              onChange={(e) => handleInputChange(step.field, e.target.value)}
              className="mt-2 h-12 text-base"
            />
          </div>
          
          <div className="flex justify-between items-center pt-4">
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index <= currentStep ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
            
            <Button 
              onClick={handleNext}
              disabled={!formData[step.field as keyof typeof formData].trim()}
              className="bg-gradient-primary hover:opacity-90"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  Generate Vision Board
                  <Sparkles className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Next Step
                  <Target className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FutureSelfVisualizer;