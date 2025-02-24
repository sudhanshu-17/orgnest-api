
import AuthForm from "@/components/auth/AuthForm";
import { motion } from "framer-motion";

const SignUp = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 bg-gradient-to-b from-background to-secondary/20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sm:mx-auto sm:w-full sm:max-w-md text-center"
      >
        <h2 className="text-3xl font-bold">Create an account</h2>
        <p className="mt-2 text-muted-foreground">
          Get started with our platform
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4"
      >
        <AuthForm mode="signup" />
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <a href="/signin" className="text-primary hover:underline">
            Sign in
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;
