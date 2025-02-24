
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "$49",
    features: [
      "1 Organization",
      "5 Team Members",
      "100 Products",
      "Basic Support",
      "1GB Storage",
    ],
  },
  {
    name: "Professional",
    price: "$99",
    features: [
      "3 Organizations",
      "15 Team Members",
      "Unlimited Products",
      "Priority Support",
      "10GB Storage",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$199",
    features: [
      "Unlimited Organizations",
      "Unlimited Team Members",
      "Unlimited Products",
      "24/7 Support",
      "100GB Storage",
    ],
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container px-4 py-24 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="px-3 py-1 text-sm font-semibold tracking-wider text-primary bg-primary/10 rounded-full">
            MANAGE YOUR ORGANIZATION
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Streamline Your Product Management
          </h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
            Organize your products, manage your team, and scale your business with
            our powerful platform.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`p-8 ${plan.popular ? 'glass-card ring-2 ring-primary' : ''}`}>
                <div className="flex flex-col h-full">
                  {plan.popular && (
                    <span className="px-3 py-1 text-xs font-semibold tracking-wider text-primary bg-primary/10 rounded-full w-fit mb-4">
                      MOST POPULAR
                    </span>
                  )}
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <div className="mt-4 mb-8">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <svg
                          className="w-5 h-5 text-primary mr-3"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'premium-button' : ''}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    Get Started
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-24 text-center"
        >
          <h2 className="text-3xl font-bold">Trusted by Industry Leaders</h2>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-12 bg-muted rounded-lg animate-pulse"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
