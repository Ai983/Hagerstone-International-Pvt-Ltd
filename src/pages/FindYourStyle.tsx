import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, RotateCcw, Calculator, Palette, Download, Calendar } from "lucide-react";

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

// Project Estimator Types and Data
type SpaceType = 'office' | 'retail' | 'hospitality' | 'residential' | 'healthcare' | 'education';
type MaterialGrade = 'standard' | 'premium' | 'luxury';
type RoomType = 'reception' | 'cabins' | 'meeting_rooms' | 'open_area' | 'pantry' | 'director_cabin';

interface EstimatorData {
  spaceType: SpaceType;
  totalArea: number;
  interiorStyle: StyleId | '';
  rooms: { type: RoomType; count: number }[];
  materialGrade: MaterialGrade;
  electricalLighting: boolean;
  furnitureInclusion: boolean;
}

const SPACE_TYPES: { value: SpaceType; label: string }[] = [
  { value: 'office', label: 'Corporate Office' },
  { value: 'retail', label: 'Retail Store' },
  { value: 'hospitality', label: 'Restaurant/Café' },
  { value: 'residential', label: 'Residential' },
  { value: 'healthcare', label: 'Medical/Healthcare' },
  { value: 'education', label: 'Educational Institute' }
];

const ROOM_TYPES: { value: RoomType; label: string; baseMultiplier: number }[] = [
  { value: 'reception', label: 'Reception Area', baseMultiplier: 1.2 },
  { value: 'cabins', label: 'Private Cabins', baseMultiplier: 1.0 },
  { value: 'meeting_rooms', label: 'Meeting Rooms', baseMultiplier: 1.3 },
  { value: 'open_area', label: 'Open Work Area', baseMultiplier: 0.9 },
  { value: 'pantry', label: 'Pantry/Break Room', baseMultiplier: 1.1 },
  { value: 'director_cabin', label: 'Director Cabin', baseMultiplier: 1.5 }
];

const MATERIAL_PRICING: Record<MaterialGrade, { pricePerSqFt: number; label: string; description: string }> = {
  standard: { 
    pricePerSqFt: 1200, 
    label: 'Standard', 
    description: 'Quality materials with essential finishes' 
  },
  premium: { 
    pricePerSqFt: 1800, 
    label: 'Premium', 
    description: 'High-end materials with luxury finishes' 
  },
  luxury: { 
    pricePerSqFt: 2500, 
    label: 'Luxury', 
    description: 'Ultra-premium materials and bespoke elements' 
  }
};

const FindYourStyle = () => {
  // Style Quiz State
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<StyleId[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<StyleId | null>(null);

  // Project Estimator State
  const [activeTab, setActiveTab] = useState("style-finder");
  const [estimatorStep, setEstimatorStep] = useState(0);
  const [estimatorData, setEstimatorData] = useState<EstimatorData>({
    spaceType: 'office',
    totalArea: 0,
    interiorStyle: '',
    rooms: [],
    materialGrade: 'standard',
    electricalLighting: false,
    furnitureInclusion: false
  });
  const [showEstimate, setShowEstimate] = useState(false);

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

  // Estimator Functions
  const updateEstimatorData = (updates: Partial<EstimatorData>) => {
    setEstimatorData(prev => ({ ...prev, ...updates }));
  };

  const addRoom = (type: RoomType) => {
    const existing = estimatorData.rooms.find(r => r.type === type);
    if (existing) {
      updateEstimatorData({
        rooms: estimatorData.rooms.map(r => 
          r.type === type ? { ...r, count: r.count + 1 } : r
        )
      });
    } else {
      updateEstimatorData({
        rooms: [...estimatorData.rooms, { type, count: 1 }]
      });
    }
  };

  const removeRoom = (type: RoomType) => {
    updateEstimatorData({
      rooms: estimatorData.rooms
        .map(r => r.type === type ? { ...r, count: Math.max(0, r.count - 1) } : r)
        .filter(r => r.count > 0)
    });
  };

  const calculateEstimate = () => {
    const { totalArea, materialGrade, electricalLighting, furnitureInclusion, rooms } = estimatorData;
    const basePricing = MATERIAL_PRICING[materialGrade];
    
    let totalCost = totalArea * basePricing.pricePerSqFt;
    
    // Room-specific multipliers
    if (rooms.length > 0) {
      const roomMultiplier = rooms.reduce((acc, room) => {
        const roomConfig = ROOM_TYPES.find(r => r.value === room.type);
        return acc + ((roomConfig?.baseMultiplier || 1) * room.count * 0.1);
      }, 1);
      totalCost *= roomMultiplier;
    }
    
    // Add-ons
    if (electricalLighting) totalCost += totalArea * 200; // ₹200/sq.ft for electrical
    if (furnitureInclusion) totalCost += totalArea * 300; // ₹300/sq.ft for furniture
    
    return {
      baseCost: totalArea * basePricing.pricePerSqFt,
      totalCost,
      breakdown: {
        base: totalArea * basePricing.pricePerSqFt,
        electrical: electricalLighting ? totalArea * 200 : 0,
        furniture: furnitureInclusion ? totalArea * 300 : 0,
        roomUpgrades: totalCost - (totalArea * basePricing.pricePerSqFt) - (electricalLighting ? totalArea * 200 : 0) - (furnitureInclusion ? totalArea * 300 : 0)
      }
    };
  };

  const resetEstimator = () => {
    setEstimatorStep(0);
    setEstimatorData({
      spaceType: 'office',
      totalArea: 0,
      interiorStyle: '',
      rooms: [],
      materialGrade: 'standard',
      electricalLighting: false,
      furnitureInclusion: false
    });
    setShowEstimate(false);
  };

  if (showResults) {
    const result = calculateResult();
    const style = STYLES[result];

    return (
      <main className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-4xl mx-auto">
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

  const renderEstimatorContent = () => {
    if (showEstimate) {
      const estimate = calculateEstimate();
      const selectedStyle = estimatorData.interiorStyle ? STYLES[estimatorData.interiorStyle as StyleId] : null;
      
      return (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              Your Project Estimate
            </h2>
            <p className="text-muted-foreground">
              Based on your requirements for {estimatorData.totalArea} sq.ft of {estimatorData.spaceType} space
            </p>
          </div>

          {/* Estimate Card */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-center text-3xl font-bold text-primary">
                ₹{estimate.totalCost.toLocaleString('en-IN')}
              </CardTitle>
              <p className="text-center text-muted-foreground">
                Estimated Total Project Cost
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Cost Breakdown */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Cost Breakdown:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Base Interior ({MATERIAL_PRICING[estimatorData.materialGrade].label})</span>
                    <span>₹{estimate.breakdown.base.toLocaleString('en-IN')}</span>
                  </div>
                  {estimate.breakdown.electrical > 0 && (
                    <div className="flex justify-between">
                      <span>Electrical & Lighting</span>
                      <span>₹{estimate.breakdown.electrical.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  {estimate.breakdown.furniture > 0 && (
                    <div className="flex justify-between">
                      <span>Furniture Package</span>
                      <span>₹{estimate.breakdown.furniture.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  {estimate.breakdown.roomUpgrades > 0 && (
                    <div className="flex justify-between">
                      <span>Room Specifications</span>
                      <span>₹{estimate.breakdown.roomUpgrades.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Selected Style */}
              {selectedStyle && (
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-foreground mb-2">Selected Style:</h4>
                  <div className="flex items-center gap-4">
                    <img 
                      src={selectedStyle.images[0]} 
                      alt={selectedStyle.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium">{selectedStyle.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedStyle.desc}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button className="flex-1 gap-2">
                  <Calendar className="w-4 h-4" />
                  Book Consultation
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Download className="w-4 h-4" />
                  Download Estimate
                </Button>
              </div>

              <Button 
                onClick={resetEstimator} 
                variant="ghost" 
                className="w-full gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                New Estimate
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    const estimatorSteps = [
      {
        title: "Space Details",
        content: (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>Type of Space</Label>
              <RadioGroup
                value={estimatorData.spaceType}
                onValueChange={(value) => updateEstimatorData({ spaceType: value as SpaceType })}
              >
                {SPACE_TYPES.map(type => (
                  <div key={type.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={type.value} id={type.value} />
                    <Label htmlFor={type.value}>{type.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="area">Total Area (sq.ft)</Label>
              <Input
                id="area"
                type="number"
                placeholder="Enter total area"
                value={estimatorData.totalArea || ''}
                onChange={(e) => updateEstimatorData({ totalArea: Number(e.target.value) })}
              />
            </div>
          </div>
        )
      },
      {
        title: "Interior Style",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Choose your preferred interior style (or take our style quiz first!)
            </p>
            <RadioGroup
              value={estimatorData.interiorStyle}
              onValueChange={(value) => updateEstimatorData({ interiorStyle: value as StyleId })}
            >
              {Object.entries(STYLES).map(([id, style]) => (
                <div key={id} className="flex items-start space-x-3 p-4 border rounded-lg">
                  <RadioGroupItem value={id} id={id} className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor={id} className="text-base font-medium cursor-pointer">
                      {style.name}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">{style.desc}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        )
      },
      {
        title: "Room Configuration",
        content: (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Specify the rooms/zones you need
            </p>
            <div className="space-y-4">
              {ROOM_TYPES.map(room => {
                const currentCount = estimatorData.rooms.find(r => r.type === room.value)?.count || 0;
                return (
                  <div key={room.value} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{room.label}</p>
                      <p className="text-sm text-muted-foreground">
                        +{((room.baseMultiplier - 1) * 100).toFixed(0)}% premium
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeRoom(room.value)}
                        disabled={currentCount === 0}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{currentCount}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addRoom(room.value)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )
      },
      {
        title: "Material & Add-ons",
        content: (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>Material Grade</Label>
              <RadioGroup
                value={estimatorData.materialGrade}
                onValueChange={(value) => updateEstimatorData({ materialGrade: value as MaterialGrade })}
              >
                {Object.entries(MATERIAL_PRICING).map(([grade, config]) => (
                  <div key={grade} className="flex items-start space-x-3 p-4 border rounded-lg">
                    <RadioGroupItem value={grade} id={grade} className="mt-1" />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <Label htmlFor={grade} className="text-base font-medium cursor-pointer">
                          {config.label}
                        </Label>
                        <span className="text-primary font-semibold">
                          ₹{config.pricePerSqFt}/sq.ft
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{config.description}</p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label>Additional Services</Label>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Electrical & Lighting</p>
                    <p className="text-sm text-muted-foreground">+₹200/sq.ft</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={estimatorData.electricalLighting}
                    onChange={(e) => updateEstimatorData({ electricalLighting: e.target.checked })}
                    className="w-4 h-4"
                  />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Furniture Package</p>
                    <p className="text-sm text-muted-foreground">+₹300/sq.ft</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={estimatorData.furnitureInclusion}
                    onChange={(e) => updateEstimatorData({ furnitureInclusion: e.target.checked })}
                    className="w-4 h-4"
                  />
                </div>
              </div>
            </div>
          </div>
        )
      }
    ];

    const currentEstimatorStep = estimatorSteps[estimatorStep];

    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Project Cost Estimator
          </h2>
          <p className="text-muted-foreground">
            Get an instant estimate for your interior design project
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Step {estimatorStep + 1} of {estimatorSteps.length}
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round(((estimatorStep + 1) / estimatorSteps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((estimatorStep + 1) / estimatorSteps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Current Step */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{currentEstimatorStep.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {currentEstimatorStep.content}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            onClick={() => setEstimatorStep(Math.max(0, estimatorStep - 1))}
            variant="outline"
            disabled={estimatorStep === 0}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>

          <Button
            onClick={() => {
              if (estimatorStep === estimatorSteps.length - 1) {
                setShowEstimate(true);
              } else {
                setEstimatorStep(estimatorStep + 1);
              }
            }}
            disabled={
              (estimatorStep === 0 && (!estimatorData.spaceType || !estimatorData.totalArea)) ||
              (estimatorStep === 1 && !estimatorData.interiorStyle)
            }
            className="gap-2 min-w-[120px]"
          >
            {estimatorStep === estimatorSteps.length - 1 ? (
              <>
                <Calculator className="w-4 h-4" />
                Get Estimate
              </>
            ) : (
              'Next'
            )}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Design Tools
          </h1>
          <p className="text-muted-foreground">
            Discover your style and estimate your project cost
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-4"></div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="style-finder" className="gap-2">
              <Palette className="w-4 h-4" />
              Find Your Style
            </TabsTrigger>
            <TabsTrigger value="cost-estimator" className="gap-2">
              <Calculator className="w-4 h-4" />
              Cost Estimator
            </TabsTrigger>
          </TabsList>

          <TabsContent value="style-finder">
            <div className="max-w-2xl mx-auto">
              {/* Progress */}
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

              {/* Question */}
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

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  disabled={currentQuestion === 0}
                  className="gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={!selectedAnswer}
                  className="gap-2 min-w-[120px]"
                >
                  {currentQuestion === QUESTIONS.length - 1 ? 'Get Results' : 'Next'}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="cost-estimator">
            {renderEstimatorContent()}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default FindYourStyle;