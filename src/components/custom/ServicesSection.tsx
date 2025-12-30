import { Check, Scissors, Sparkles, Star } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      title: "Bridal Makeup",
      description: "Complete bridal makeover including HD makeup, hairstyling, and draping.",
      icon: <Sparkles className="w-6 h-6 text-white" />,
      price: "Starts at ₹15,000"
    },
    {
      title: "Party Makeup",
      description: "Glamorous looks for receptions, engagements, and special parties.",
      icon: <Star className="w-6 h-6 text-white" />,
      price: "Starts at ₹5,000"
    },
    {
      title: "Hair Styling",
      description: "Intricate braids, buns, curls, and modern hairstyles for any occasion.",
      icon: <Scissors className="w-6 h-6 text-white" />,
      price: "Starts at ₹2,000"
    },
    {
      title: "Saree Draping",
      description: "Professional draping styles for Silk, Net, and Designer sarees.",
      icon: <Check className="w-6 h-6 text-white" />,
      price: "Starts at ₹1,000"
    }
  ];

  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-serif mb-4 text-slate-900">
            Our Services
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We offer a wide range of professional beauty services to help you look your absolute best.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-rose-500 rounded-lg flex items-center justify-center mb-6 shadow-rose-200 shadow-lg">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                {service.description}
              </p>
              <div className="text-rose-500 font-semibold text-sm">
                {service.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;