import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Button from "../ui/Button";

export default function FinalCTA() {
  return (
    <section className="theme-contributor relative overflow-hidden bg-royal">
      <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-20 pointer-events-none bg-butter" />
      <div className="w-full max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 relative py-14 sm:py-16 text-center flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl mb-3 max-w-xl text-ivory font-extrabold tracking-tight">
          Start your first quest today
        </h2>
        <p className="text-sm mb-7 max-w-md text-ivory/85">
          Join learners and contributors already earning XP, unlocking badges, and building real
          skills together.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center">
          <Link to="/register" className="w-full sm:w-auto">
            <Button variant="butter" className="w-full">
              Create free account <ArrowRight size={16} />
            </Button>
          </Link>
          <Link to="/login" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full">
              Log in
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}