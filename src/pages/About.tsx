import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 to-secondary/5 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-primary mb-6 animate-fade-in">About Hagerstone International</h1>
          <p className="text-xl text-foreground/80 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Leading design and build firm specializing in architecture, interiors, construction and factories
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        {/* Our Story Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-primary mb-6 animate-fade-in">Our Story</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {["11+", "7M+", "250+"].map((value, idx) => (
              <div
                key={idx}
                className="bg-gradient-card p-8 rounded-2xl shadow-luxury hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="text-4xl font-bold text-primary mb-2">{value}</div>
                <div className="text-lg text-foreground">
                  {idx === 0 ? "Years of Excellence" : idx === 1 ? "Sq. Ft. Completed" : "Projects Delivered"}
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <p className="text-lg text-foreground mb-6 leading-relaxed">
                Hagerstone International is a leading design and build firm specializing in architecture, interiors,
                construction and factories. With 11+ years of experience, 7M+ sq. ft. completed, and 250+ projects across
                15+ cities, we craft world-class commercial, corporate, and luxury spaces.
              </p>
              <p className="text-lg text-foreground leading-relaxed">
                Our 350+ professionals ensure seamless execution, integrating cutting-edge design, sustainability, and
                innovation. From offices to retail and hospitality, we create functional, inspiring, and future-ready
                environments.
              </p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-primary mb-4">Our Core Values</h3>
                <ul className="space-y-3 text-foreground">
                  {["Innovation & Creativity", "Quality Excellence", "Client Satisfaction", "Sustainable Practices"].map((val, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>{val}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-20">
          <div className="grid lg:grid-cols-2 gap-12">
            {[
              {
                title: "Our Vision",
                content:
                  "Our vision for the next 10 years is to become India's No. 1 technology-enabled design and build firm across all sectors. We aim to be the first preference for clients when it comes to technology-driven design and build projects."
              },
              {
                title: "Our Mission",
                content:
                  "Our mission is to empower our team, our people, and the entire Hagerstone International family in such a manner that we create at least 30 millionaires inside the Hagerstone family over the next 10 years. We want Hagerstone International family teams and staff to be stakeholders in the company, to have ESOPs, so that they also grow with the entire company. Our mission is to bring happiness to each of our team members' lives and their families' lives, and this mission drives us to keep on growing and to keep on improving every day."
              }
            ].map((block, idx) => (
              <div className="animate-fade-in" key={idx} style={{ animationDelay: `${idx * 0.2}s` }}>
                <h2 className="text-4xl font-bold text-primary mb-6">{block.title}</h2>
                <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mb-6"></div>
                <p className="text-lg text-foreground leading-relaxed">{block.content}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

        {/* Our Valued Clients */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl mb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Our Valued Clients</h2>
            <p className="text-lg text-foreground/80">Trusted by industry leaders worldwide</p>
          </div>
          <div className="relative overflow-hidden">
            <div className="flex animate-[slide_20s_linear_infinite] space-x-8 items-center">
              {[
                { name: "Monin", logo: "/clients-logo/Monin.jpeg" },
                { name: "APL Logistics", logo: "/clients-logo/Apl.jpeg" },
                { name: "Singapore Airlines", logo: "/clients-logo/SingaporeAirlines.jpeg" },
                { name: "AECOM", logo: "/clients-logo/AECOM.png" },
                { name: "TAJ", logo: "/clients-logo/Taj.jpeg" },
                { name: "UltraTech Cement", logo: "/clients-logo/Ultratech.jpeg" },
                { name: "Air India", logo: "/clients-logo/airindia.jpeg" },
                { name: "Lufthansa", logo: "/clients-logo/lufthansa.jpeg" },
                // Duplicate for continuous scroll
                { name: "Monin", logo: "/clients-logo/Monin.jpeg" },
                { name: "APL Logistics", logo: "/clients-logo/Apl.jpeg" },
                { name: "Singapore Airlines", logo: "/clients-logo/SingaporeAirlines.jpeg" },
                { name: "AECOM", logo: "/clients-logo/AECOM.png" },
                { name: "TAJ", logo: "/clients-logo/Taj.jpeg" },
                { name: "UltraTech Cement", logo: "/clients-logo/Ultratech.jpeg" },
                { name: "Air India", logo: "/clients-logo/airindia.jpeg" },
                { name: "Lufthansa", logo: "/clients-logo/lufthansa.jpeg" }
              ].map((client, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 w-48 h-24 bg-white/90 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-primary/20 flex items-center justify-center hover:scale-105 p-4"
                >
                  <img 
                    src={client.logo}
                    alt={`${client.name} logo`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

        {/* Leadership */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-primary mb-6">Our Leaders</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-16">
            <Card className="group bg-gradient-card border-0 shadow-luxury p-8 rounded-2xl hover:shadow-xl transition-all duration-500 hover:-translate-y-3 animate-fade-in">
              <CardContent className="text-center">
                <div className="relative mb-6 inline-block">
                  <img 
                    src="/lovable-uploads/d12ff5f7-e2cf-4b86-b53a-586309fdc5eb.png" 
                    alt="Dhruv Agarwal - Founder & Managing Director"
                    className="w-48 h-48 object-cover rounded-full mx-auto shadow-luxury group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-transparent group-hover:from-primary/30 transition-all duration-300"></div>
                </div>
                <h3 className="text-3xl font-bold text-primary mb-2">Dhruv Agarwal</h3>
                <p className="text-lg text-secondary font-semibold mb-4">Founder & Managing Director</p>
                <p className="text-foreground leading-relaxed">
                  Civil Engineer from Delhi College of Engineering. With over 10 million sq ft of projects delivered across UAE, Myanmar, and India, Dhruv established Hagerstone to provide seamless, end-to-end design and build services blending creativity with functionality.
                </p>
              </CardContent>
            </Card>
            
            <Card className="group bg-gradient-card border-0 shadow-luxury p-8 rounded-2xl hover:shadow-xl transition-all duration-500 hover:-translate-y-3 animate-fade-in" style={{animationDelay: '0.2s'}}>
              <CardContent className="text-center">
                <div className="relative mb-6 inline-block">
                  <img 
                    src="/lovable-uploads/0542f440-1bd7-4f5d-9709-33c7b4735b5c.png" 
                    alt="Bhaskar Tyagi - Director"
                    className="w-48 h-48 object-cover rounded-full mx-auto shadow-luxury group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-transparent group-hover:from-primary/30 transition-all duration-300"></div>
                </div>
                <h3 className="text-3xl font-bold text-primary mb-2">Bhaskar Tyagi</h3>
                <p className="text-lg text-secondary font-semibold mb-4">Director</p>
                <p className="text-foreground leading-relaxed">
                  Director of Hagerstone International Pvt. Ltd., with over 16+ years of extensive experience in the hospitality industry, specializing in interior design. Bhaskar delivers luxurious, functional, and guest-centric spaces that enhance the hotel experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Safety First */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-primary mb-6">Safety Always and Everywhere</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8"></div>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
              Our comprehensive safety system ensures excellence with 79+ quality checkpoints, prioritizing the wellbeing of our team and clients on every project.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              "Hard Hats",
              "Safety Glasses or Goggles", 
              "High-Visibility Clothing",
              "Steel-Toed Safety Boots",
              "Reflective Vests",
              "Ear Protection",
              "Protective Gloves",
              "First Aid Kits",
              "Safety Signs and Labels",
              "Scaffolding and Ladders",
              "Protective Clothing",
              "79+ Quality Checkpoints"
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-center space-x-3 bg-white/50 backdrop-blur-sm p-4 rounded-lg hover:bg-white/70 transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{animationDelay: `${idx * 0.1}s`}}
              >
                <span className="text-2xl font-bold text-primary bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center text-sm">{idx + 1}</span>
                <span className="text-foreground font-medium">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Client Testimonials */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-primary mb-6">What Our Clients Say</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8"></div>
            <p className="text-lg text-foreground/80">Hear from our satisfied clients about their experience with us</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {[
              "Throughout the project, Hagerstone International demonstrated remarkable project management skills. They kept us informed every step of the way, adhered to timelines, and stayed within budget. Their commitment to quality and client satisfaction is truly commendable.",
              "Your team managed the project professionally, delivering exceptional quality. Completing the entire building construction within 60 days was impressive and satisfying. Your quick response time consistently enabled us to make informed decisions efficiently throughout the process.",
              "We loved your team's positivity and professionalism. Before working with Hagerstone, we never imagined office interiors could be done so smoothly. The project was hassle-free, completed with top-notch quality, and delivered within our 45-day timeline. Truly impressive!",
              "We are satisfied with the office delivered, meeting our requirements with satisfactory quality. The project was completed within the timeline, and we look forward to collaborating with Hagerstone International on future projects. Best wishes for their endeavors.",
              "We faced a unique gym lounge design challenge, and this firm exceeded expectations. They understood our vision, incorporated ideas beautifully, and ensured flawless execution. The result is a stunning, functional space perfect for our needs. Highly recommended!",
              "We hired Hagerstone International to design and build our new office space interiors. Their expertise and experience truly stand out. We are extremely satisfied with their work and look forward to working with them again in the future."
            ].map((testimonial, idx) => (
              <div 
                key={idx} 
                className="bg-gradient-card p-8 rounded-2xl shadow-luxury hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in border-l-4 border-primary"
                style={{animationDelay: `${idx * 0.1}s`}}
              >
                <blockquote className="text-foreground leading-relaxed italic text-lg">
                  "{testimonial}"
                </blockquote>
                <div className="flex items-center mt-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                    {idx + 1}
                  </div>
                  <div className="ml-4">
                    <div className="text-primary font-semibold">Satisfied Client</div>
                    <div className="text-foreground/60 text-sm">Hagerstone International</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    
  );
};

export default About;