import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, Play, Users, MapPin, GraduationCap, Briefcase, Star, TrendingUp } from "lucide-react";

const SuccessStories = () => {
  const [selectedStory, setSelectedStory] = useState<number | null>(null);

  const stories = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Product Manager at Microsoft",
      college: "Government Engineering College, Mumbai",
      graduation: "2019",
      avatar: "/api/placeholder/100/100",
      quote: "I never imagined a government college graduate could work at Microsoft. The career guidance program showed me that my technical background and people skills were exactly what top companies needed.",
      fullStory: "Coming from a middle-class family, I chose a government college purely for financial reasons. I had serious doubts about my prospects. The traditional career counseling just told me to 'do your best' - no real guidance. But this new approach helped me see that my unique combination of technical skills and natural empathy made me perfect for product management. The personalized roadmap showed me exactly which skills to build and how to present my government college experience as an asset, not a limitation.",
      achievements: [
        "Led product launch reaching 50M+ users",
        "Promoted twice in 3 years",
        "Mentors 200+ students from government colleges"
      ],
      beforeAfter: {
        before: "Self-doubt about government college background",
        after: "Confident product leader at global tech company"
      }
    },
    {
      id: 2,
      name: "Arjun Patel",
      role: "Startup Founder & CEO",
      college: "Government Polytechnic, Ahmedabad",
      graduation: "2020",
      avatar: "/api/placeholder/100/100",
      quote: "The future self visualizer helped me see myself as an entrepreneur when I couldn't even imagine leaving my hometown. Now my startup employs 50+ people.",
      fullStory: "I was planning to take whatever local job I could find after polytechnic. Entrepreneurship felt like something only rich kids from fancy colleges could do. The visualization tool helped me see that my practical technical training and understanding of real-world problems made me uniquely qualified to build solutions people actually need. The step-by-step guidance turned an impossible dream into a clear action plan.",
      achievements: [
        "Built ₹10Cr+ revenue fintech startup",
        "50+ employees, all from tier-2/3 cities",
        "Featured in Forbes 30 Under 30"
      ],
      beforeAfter: {
        before: "Resigned to local factory job",
        after: "CEO of award-winning startup"
      }
    },
    {
      id: 3,
      name: "Sneha Reddy",
      role: "Senior Consultant at McKinsey",
      college: "Government Commerce College, Hyderabad",
      graduation: "2018",
      avatar: "/api/placeholder/100/100",
      quote: "Everyone said consulting was only for IIM graduates. The program showed me how to leverage my diverse background and unconventional path as my biggest strength.",
      fullStory: "With a commerce background from a government college, I felt completely shut out of prestigious consulting roles. The narrative approach helped me reframe my story - my deep understanding of small business operations, combined with analytical thinking, made me incredibly valuable for client work. The program taught me how to articulate this value and navigate the recruitment process with confidence.",
      achievements: [
        "Fastest promotion in regional office",
        "Specializes in small business transformation",
        "Speaks at 20+ career guidance events annually"
      ],
      beforeAfter: {
        before: "Felt locked out of top-tier careers",
        after: "Top performer at world's leading consulting firm"
      }
    }
  ];

  const metrics = [
    { label: "Alumni Tracked", value: "2,500+", icon: Users },
    { label: "Avg Salary Increase", value: "340%", icon: TrendingUp },
    { label: "Dream Job Success Rate", value: "78%", icon: Star },
    { label: "Government Colleges", value: "150+", icon: GraduationCap }
  ];

  if (selectedStory !== null) {
    const story = stories[selectedStory];
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <Badge className="mb-4 bg-gradient-success text-white">
            <Users className="w-4 h-4 mr-2" />
            Detailed Success Story
          </Badge>
          <Button 
            variant="ghost" 
            onClick={() => setSelectedStory(null)}
            className="ml-4"
          >
            ← Back to All Stories
          </Button>
        </div>

        <Card className="bg-gradient-card border-2 border-success/20">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={story.avatar} />
                <AvatarFallback className="bg-gradient-success text-white text-xl">
                  {story.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{story.name}</CardTitle>
                <CardDescription className="text-lg font-medium text-success">
                  {story.role}
                </CardDescription>
                <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <GraduationCap className="w-4 h-4 mr-1" />
                    {story.college}
                  </span>
                  <span>Class of {story.graduation}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-success/10 rounded-lg p-4 border border-success/20">
              <Quote className="w-6 h-6 text-success mb-2" />
              <p className="text-lg italic">{story.quote}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-primary" />
                The Complete Journey
              </h4>
              <p className="leading-relaxed">{story.fullStory}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold mb-3">Transformation</h5>
                <div className="space-y-3">
                  <div className="bg-destructive/10 rounded-lg p-3 border border-destructive/20">
                    <p className="text-sm font-medium text-destructive mb-1">Before</p>
                    <p className="text-sm">{story.beforeAfter.before}</p>
                  </div>
                  <div className="bg-success/10 rounded-lg p-3 border border-success/20">
                    <p className="text-sm font-medium text-success mb-1">After</p>
                    <p className="text-sm">{story.beforeAfter.after}</p>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-semibold mb-3">Key Achievements</h5>
                <div className="space-y-2">
                  {story.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Star className="w-4 h-4 text-warning mt-0.5" />
                      <span className="text-sm">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Badge variant="outline" className="mb-4">
          <Users className="w-4 h-4 mr-2" />
          Local Success Stories
        </Badge>
        <h3 className="text-2xl font-bold mb-2">Real People, Real Success</h3>
        <p className="text-muted-foreground">
          Authentic stories from government college graduates who transformed their careers
        </p>
      </div>

      {/* Impact Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="text-center bg-gradient-card">
              <CardContent className="pt-6">
                <Icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold text-primary">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Success Stories Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {stories.map((story, index) => (
          <Card key={story.id} className="group hover:shadow-medium transition-all duration-300 cursor-pointer border-2 hover:border-success/30">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={story.avatar} />
                  <AvatarFallback className="bg-gradient-success text-white">
                    {story.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{story.name}</CardTitle>
                  <CardDescription className="font-medium text-success">
                    {story.role}
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-3 h-3 mr-1" />
                <span className="text-xs">{story.college}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-success/10 rounded-lg p-3 mb-4">
                <Quote className="w-4 h-4 text-success mb-2" />
                <p className="text-sm italic line-clamp-3">{story.quote}</p>
              </div>
              <Button 
                variant="outline" 
                className="w-full group-hover:bg-success group-hover:text-success-foreground transition-all"
                onClick={() => setSelectedStory(index)}
              >
                <Play className="w-4 h-4 mr-2" />
                Read Full Story
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-accent/10 border-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center text-accent">
            <MapPin className="w-5 h-5 mr-2" />
            Innovation Spotlight: Hyper-Local Trust Building
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start space-x-3">
            <Users className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <p className="font-medium">Geographic Relevance</p>
              <p className="text-sm text-muted-foreground">Stories are specifically from local government colleges, creating immediate relatability</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Star className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <p className="font-medium">Perception Transformation</p>
              <p className="text-sm text-muted-foreground">Counters "government college limitation" narrative with concrete success evidence</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <TrendingUp className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <p className="font-medium">Authentic Documentation</p>
              <p className="text-sm text-muted-foreground">Each story includes verifiable details, LinkedIn profiles, and measurable outcomes</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessStories;