import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[500px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069"
          alt="Office"
          fill
          className="object-cover transform scale-105 hover:scale-110 transition-transform duration-700"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-70">
          <div className="max-w-7xl mx-auto h-full flex items-center px-4">
            <div className="text-white space-y-6">
              <h1 className="text-6xl font-bold animate-fade-in">About Indibus EMS</h1>
              <p className="text-xl max-w-2xl">Transforming workplace management through innovative solutions and cutting-edge technology</p>
            </div>
          </div>
        </div>
      </div>

   
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="hover:transform hover:translate-y-[-10px] transition-all duration-300">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Mission</h2>
                <p className="text-lg text-gray-600">To revolutionize workforce management by providing innovative, user-friendly solutions that empower organizations to maximize their potential.</p>
              </div>
              <div className="hover:transform hover:translate-y-[-10px] transition-all duration-300">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Vision</h2>
                <p className="text-lg text-gray-600">To become the global leader in employee management solutions, setting new standards for efficiency and workplace harmony.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Card className="p-6 hover:shadow-xl transition-shadow duration-300 bg-blue-50">
                  <h3 className="text-3xl font-bold text-blue-600">500+</h3>
                  <p className="text-gray-700">Enterprise Clients</p>
                </Card>
                <Card className="p-6 hover:shadow-xl transition-shadow duration-300 bg-green-50">
                  <h3 className="text-3xl font-bold text-green-600">98%</h3>
                  <p className="text-gray-700">Client Retention</p>
                </Card>
              </div>
              <div className="space-y-4 mt-8">
                <Card className="p-6 hover:shadow-xl transition-shadow duration-300 bg-purple-50">
                  <h3 className="text-3xl font-bold text-purple-600">50K+</h3>
                  <p className="text-gray-700">Users Daily</p>
                </Card>
                <Card className="p-6 hover:shadow-xl transition-shadow duration-300 bg-orange-50">
                  <h3 className="text-3xl font-bold text-orange-600">24/7</h3>
                  <p className="text-gray-700">Support</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid with Hover Effects */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Why Companies Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 hover:shadow-2xl transition-all duration-300 hover:transform hover:translate-y-[-10px] bg-white">
                <Image
                  src={feature.image}
                  width={400}
                  height={250}
                  alt={feature.title}
                  className="rounded-lg mb-6 hover:opacity-90 transition-opacity duration-300"
                />
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
     
      <div className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-4">
    <div className="text-center mb-20">
      <h2 className="text-5xl font-bold text-gray-900 mb-6">Our Leadership Team</h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Meet the visionaries behind Indibus EMS, bringing together decades of experience 
        in technology, operations, and human resources.
      </p>
    </div>
    <div className="grid md:grid-cols-4 gap-12">
      {teamMembers.map((member, index) => (
        <div 
          key={index} 
          className="group relative flex flex-col items-center"
        >
          <div className="relative w-64 h-64 mb-6 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={member.image}
              fill
              style={{ objectFit: 'cover' }}
              alt={member.name}
              className="transform group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
              <a 
                href={member.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
          <p className="text-lg font-medium text-blue-600 mb-3">{member.position}</p>
          <p className="text-gray-600 text-center text-sm">{member.description}</p>
        </div>
      ))}
    </div>
    </div>
    </div>

      {/* Enhanced Contact Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className ="bg-orange-300 text-black"></div>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Transform Your HR Operations?</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">Join hundreds of forward-thinking companies who trust Indibus EMS for their employee management needs</p>
          <div className="flex justify-center gap-6">
            <Button className="bg-white text-blue-900 hover:bg-gray-100 text-lg px-8 py-3">
              Schedule Demo
            </Button>
            <Button className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-lg px-8 py-3 transition-colors duration-300">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>

      {/* Footer with Navigation */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Indibus EMS</h3>
              <p className="text-gray-400">Leading the future of workforce management</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link href="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/documentation" className="text-gray-400 hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/api" className="text-gray-400 hover:text-white transition-colors">API</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>contact@indibus.com</li>
                <li>+91 (800) 123-4567</li>
                <li>Mumbai, India</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 Indibus Employee Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    title: "Advanced Analytics",
    description: "Gain deep insights into your workforce performance with our AI-powered analytics tools.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070"
  },
  {
    title: "Smart Automation",
    description: "Automate routine tasks and improve operational efficiency with intelligent workflows.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070"
  },
  {
    title: "Security First",
    description: "Enterprise-grade security measures to protect your sensitive employee data.",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=2070"
  }
]

const teamMembers = [
    {
      name: "Rajesh Kumar",
      position: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?q=80&w=2070",
      linkedIn: "https://linkedin.com",
      description: "15+ years of experience in enterprise software solutions"
    },
    {
      name: "Priya Sharma",
      position: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2076",
      linkedIn: "https://linkedin.com",
      description: "Former Tech Lead at Microsoft, AI/ML expert"
    },
    {
      name: "Amit Patel",
      position: "Head of Operations",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070",
      linkedIn: "https://linkedin.com",
      description: "Specializes in scaling operations and process optimization"
    },
    {
        name: "Meera Singh",
        position: "Product Director",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2061",
        linkedIn: "https://linkedin.com",
        description: "10+ years in product management and user experience"
      }
    ]