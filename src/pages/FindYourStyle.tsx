import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, RotateCcw } from "lucide-react";
import { EstimatorProvider } from "@/components/estimator/context";
import EstimatorFlow from "@/components/estimator/EstimatorFlow";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type StyleId =
  | 'modern_collab'
  | 'minimal_industrial'
  | 'luxury_corporate'
  | 'biophilic_calm'
  | 'creative_hybrid'
  | 'traditional_private';

const STYLES: Record<StyleId, {
  name: string; slug: string; desc: string; images: string[]; ctas: {label: string; href: string;}[];
}> = {
  modern_collab: {
    name: 'Modern Collaborative',
    slug: 'modern-collab',
    desc: 'Open layouts, glass partitions, flexible hubs and clean lines that boost team energy and cross-functional work.',
    images: ['/Styles/moduler-collab-1.png','/Styles/moduler-collab-2.jpeg','/Styles/moduler-collab-3.jpeg'],
    ctas: [{label:'See projects in this style', href:'/projects?style=modern-collab'},{label:'Book a style consult', href:'/contact'}]
  },
  minimal_industrial: {
    name: 'Minimalist Industrial',
    slug: 'minimal-industrial',
    desc: 'Exposed concrete/brick, steel details, monochrome palette and purposeful minimalism for focused, efficient teams.',
    images: ['/Styles/minimal-Industrial-1.jpeg','/Styles/minimal-industrial-2.jpeg','/Styles/minimal-industrial-3.jpeg'],
    ctas: [{label:'See projects in this style', href:'/projects?style=minimal-industrial'},{label:'Book a style consult', href:'/contact'}]
  },
  luxury_corporate: {
    name: 'Luxury Corporate',
    slug: 'luxury-corporate',
    desc: 'Executive presence with rich woods, brass accents, plush textures, acoustic comfort and concierge-grade meeting suites.',
    images: ['/Styles/luxury-coorporate-1.jpeg','/Styles/luxury-coorporate-2.jpeg','/Styles/luxury-coorporate-3.jpeg'],
    ctas: [{label:'See projects in this style', href:'/projects?style=luxury-corporate'},{label:'Book a style consult', href:'/contact'}]
  },
  biophilic_calm: {
    name: 'Biophilic Calm',
    slug: 'biophilic-calm',
    desc: 'Natural woods, plants, daylight strategy, soft acoustics and wellness nooks for calm, restorative workplaces.',
    images: ['/Styles/biophilic-calm-1.jpeg','/Styles/biophilic-calm-2.jpeg','/Styles/biophilic-calm-3.jpeg'],
    ctas: [{label:'See projects in this style', href:'/projects?style=biophilic-calm'},{label:'Book a style consult', href:'/contact'}]
  },
  creative_hybrid: {
    name: 'Creative Hybrid',
    slug: 'creative-hybrid',
    desc: 'Playful color pops, modular zones, writeable walls and maker spaces to spark ideas and rapid prototyping.',
    images: ['/Styles/creative-hybrid-1.jpeg','/Styles/creative-hybrid-2.jpeg','/Styles/creative-hybrid-3.jpeg'],
    ctas: [{label:'See projects in this style', href:'/projects?style=creative-hybrid'},{label:'Book a style consult', href:'/contact'}]
  },
  traditional_private: {
    name: 'Traditional Private Office',
    slug: 'traditional-private',
    desc: 'Quiet enclosed offices, refined finishes, formal meeting suites and high privacy for leadership-heavy orgs.',
    images: ['/Styles/traditional-private-1.jpeg','/Styles/traditional-private-2.jpeg','/Styles/traditional-private-3.jpeg'],
    ctas: [{label:'See projects in this style', href:'/projects?style=traditional-private'},{label:'Book a style consult', href:'/contact'}]
  }
};

const QUESTIONS: {
  id: string; prompt: string;
  options: { label: string; style: StyleId; img?: string; helper?: string }[];
}[] = [
  {
    id:'layout', prompt:'Which workspace layout fits your team best?',
    options:[
      {label:'Open, buzzing collaboration zones', style:'modern_collab'},
      {label:'Quiet, enclosed private offices', style:'traditional_private'},
      {label:'Flexible mix of zones', style:'creative_hybrid'}
    ]
  },
  {
    id:'aesthetic', prompt:'Pick an aesthetic vibe:',
    options:[
      {label:'Sleek & modern', style:'modern_collab'},
      {label:'Raw & industrial', style:'minimal_industrial'},
      {label:'Premium & executive', style:'luxury_corporate'},
      {label:'Natural & calming', style:'biophilic_calm'}
    ]
  },
  {
    id:'materials', prompt:'Favorite materials & textures?',
    options:[
      {label:'Glass, light woods, clean finishes', style:'modern_collab'},
      {label:'Exposed brick, steel, concrete', style:'minimal_industrial'},
      {label:'Rich wood, brass, plush textiles', style:'luxury_corporate'},
      {label:'Plants, stone, rattan, daylight', style:'biophilic_calm'}
    ]
  },
  {
    id:'brand', prompt:'Your brand personality leans more…',
    options:[
      {label:'Innovative & energetic', style:'creative_hybrid'},
      {label:'Classic & authoritative', style:'luxury_corporate'},
      {label:'Grounded & wellness-oriented', style:'biophilic_calm'},
      {label:'Efficient & minimal', style:'minimal_industrial'}
    ]
  },
  {
    id:'team', prompt:'How does your team mostly work?',
    options:[
      {label:'Cross-functional collab all day', style:'modern_collab'},
      {label:'Heads-down focused most of the time', style:'traditional_private'},
      {label:'It varies by project', style:'creative_hybrid'}
    ]
  },
  {
    id:'color', prompt:'Preferred palette for the office?',
    options:[
      {label:'Neutral base + bold accents', style:'creative_hybrid'},
      {label:'Warm neutrals & wood tones', style:'luxury_corporate'},
      {label:'Greens/earthy & lots of daylight', style:'biophilic_calm'},
      {label:'Monochrome/industrial neutrals', style:'minimal_industrial'}
    ]
  },
  {
    id:'priority', prompt:'Top priority for your new space?',
    options:[
      {label:'Boost collaboration & energy', style:'modern_collab'},
      {label:'Privacy, focus & acoustics', style:'traditional_private'},
      {label:'Brand experience for clients', style:'luxury_corporate'}
    ]
  }
];

const FindYourStyle = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<StyleId[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<StyleId | null>(null);

  const handleAnswer = (style: StyleId) => {
    setSelectedAnswer(style);
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    setSelectedAnswer(null);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
      setSelectedAnswer(null);
    }
  };

  const calculateResult = (): StyleId => {
    const styleCounts: Record<StyleId, number> = {
      modern_collab: 0,
      minimal_industrial: 0,
      luxury_corporate: 0,
      biophilic_calm: 0,
      creative_hybrid: 0,
      traditional_private: 0
    };

    answers.forEach(style => {
      styleCounts[style]++;
    });

    // Find the style with the most votes (recency as tiebreaker)
    let winner: StyleId = answers[0];
    let maxCount = 0;

    Object.entries(styleCounts).forEach(([style, count]) => {
      if (count > maxCount || (count === maxCount && answers.lastIndexOf(style as StyleId) > answers.lastIndexOf(winner))) {
        winner = style as StyleId;
        maxCount = count;
      }
    });

    return winner;
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setSelectedAnswer(null);
  };

  if (showResults) {
    const result = calculateResult();
    const style = STYLES[result];

    return (
      <main className="min-h-screen bg-background pt-28 md:pt-32 pb-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Your Perfect Office Style
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          {/* Results */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                  {style.name}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  {style.desc}
                </p>
              </div>

              {/* Image Gallery */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {style.images.map((image, index) => (
                  <div key={index} className="aspect-video rounded-lg overflow-hidden bg-muted">
                    <img
                      src={image}
                      alt={`${style.name} example ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                              <span class="text-sm font-medium">${style.name}</span>
                            </div>
                          `;
                        }
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {style.ctas.map((cta, index) => (
                  <Button
                    key={index}
                    asChild
                    variant={index === 0 ? "default" : "outline"}
                    size="lg"
                    className="min-w-[200px]"
                  >
                    <a href={cta.href}>
                      {cta.label}
                    </a>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Retake Quiz */}
          <div className="text-center">
            <Button
              onClick={resetQuiz}
              variant="ghost"
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Retake Quiz
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const question = QUESTIONS[currentQuestion];

  return (
    <main className="min-h-screen bg-background pt-28 md:pt-32 pb-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Find Your Office Style
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        {/* Tabs: Quiz | Estimator */}
        <Tabs defaultValue="quiz">
          <TabsList className="mb-6 grid grid-cols-2 w-full max-w-md mx-auto">
            <TabsTrigger value="quiz">Style Quiz</TabsTrigger>
            <TabsTrigger value="estimator">Cost Estimator</TabsTrigger>
          </TabsList>

          <TabsContent value="quiz">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {QUESTIONS.length}
                </span>
                <span className="text-sm font-medium text-primary">
                  Q{currentQuestion + 1}/7
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-6 text-center">
                  {question.prompt}
                </h2>
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option.style)}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                        selectedAnswer === option.style
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border bg-card hover:border-primary/50 hover:bg-accent'
                      }`}
                      aria-pressed={selectedAnswer === option.style}
                    >
                      <span className="font-medium">{option.label}</span>
                      {option.helper && (
                        <div className="text-sm text-muted-foreground mt-1">
                          {option.helper}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between items-center">
              <Button onClick={handleBack} variant="outline" disabled={currentQuestion === 0} className="gap-2">
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
              <Button onClick={handleNext} disabled={!selectedAnswer} className="gap-2 min-w-[120px]">
                {currentQuestion === QUESTIONS.length - 1 ? 'Get Results' : 'Next'}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="estimator">
            <EstimatorProvider>
              <EstimatorFlow />
            </EstimatorProvider>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default FindYourStyle;