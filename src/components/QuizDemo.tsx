import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Zap, Award, MessageCircle } from "lucide-react";

const QuizDemo = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      scenario: "The Midnight Crisis",
      story: "It's 2 AM and your startup's main server crashed. Customers are flooding social media with complaints. As the team lead, what's your first instinct?",
      question: "How do you handle this high-pressure situation?",
      options: [
        { text: "Rally the team immediately - we fix this together", trait: "Leadership", points: 3 },
        { text: "Dive into the code myself - I can solve this faster", trait: "Technical", points: 3 },
        { text: "Draft a public apology while delegating fixes", trait: "Communication", points: 3 },
        { text: "Analyze the root cause before taking action", trait: "Analytical", points: 3 }
      ]
    },
    {
      id: 2,
      scenario: "The Innovation Challenge",
      story: "Your company is losing market share to a competitor with a revolutionary product. The CEO asks your department to 'think outside the box' and come up with a game-changing solution within 30 days.",
      question: "What's your approach to innovation under pressure?",
      options: [
        { text: "Research customer pain points and unmet needs", trait: "Research", points: 3 },
        { text: "Brainstorm wild ideas with a diverse team", trait: "Creative", points: 3 },
        { text: "Study the competitor and improve on their model", trait: "Strategic", points: 3 },
        { text: "Prototype multiple solutions quickly", trait: "Execution", points: 3 }
      ]
    },
    {
      id: 3,
      scenario: "The People Dilemma",
      story: "A talented team member keeps missing deadlines, affecting the whole project. They're going through personal issues but won't accept help. The team is frustrated, and the client is asking questions.",
      question: "How do you balance empathy with performance?",
      options: [
        { text: "Have a private, caring conversation to understand", trait: "Empathy", points: 3 },
        { text: "Set clear expectations and consequences", trait: "Management", points: 3 },
        { text: "Redistribute work temporarily while they recover", trait: "Adaptability", points: 3 },
        { text: "Connect them with professional support resources", trait: "Support", points: 3 }
      ]
    }
  ];

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    const primaryTraits = answers.map((answerIndex, questionIndex) => 
      questions[questionIndex].options[answerIndex].trait
    );
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <Badge className="mb-4 bg-success text-success-foreground">
            <Award className="w-4 h-4 mr-2" />
            Quiz Complete!
          </Badge>
          <h3 className="text-2xl font-bold mb-4">Your Career DNA Revealed</h3>
          <p className="text-muted-foreground mb-6">
            Based on your responses to these real-world scenarios, here's your unique profile:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {primaryTraits.map((trait, index) => (
            <Card key={index} className="bg-gradient-primary text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{trait}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm opacity-90">Dominant in scenario {index + 1}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-accent/10 border-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center text-accent">
              <Zap className="w-5 h-5 mr-2" />
              Innovation Spotlight: Why This Quiz Works
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-success mt-0.5" />
              <div>
                <p className="font-medium">Scenario-Based Psychology</p>
                <p className="text-sm text-muted-foreground">Instead of asking "Are you a leader?", we put you in leadership situations</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-success mt-0.5" />
              <div>
                <p className="font-medium">Narrative Engagement</p>
                <p className="text-sm text-muted-foreground">Stories activate emotional memory, creating more accurate responses</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-success mt-0.5" />
              <div>
                <p className="font-medium">Real-World Relevance</p>
                <p className="text-sm text-muted-foreground">Every scenario mirrors actual workplace challenges</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Badge variant="outline" className="mb-4">
          <MessageCircle className="w-4 h-4 mr-2" />
          Interactive Story Quiz
        </Badge>
        <h3 className="text-2xl font-bold mb-2">Discover Your Career DNA</h3>
        <Progress value={progress} className="max-w-md mx-auto" />
        <p className="text-sm text-muted-foreground mt-2">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>

      <Card className="bg-gradient-card border-2 border-primary/20">
        <CardHeader>
          <Badge className="w-fit mb-2 bg-primary text-primary-foreground">
            {question.scenario}
          </Badge>
          <CardDescription className="text-base leading-relaxed">
            {question.story}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h4 className="font-semibold mb-4 text-lg">{question.question}</h4>
          <div className="grid gap-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 text-left justify-start hover:border-primary hover:bg-primary/5"
                onClick={() => handleAnswer(index)}
              >
                <Circle className="w-4 h-4 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium">{option.text}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Primary trait: {option.trait}
                  </p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizDemo;