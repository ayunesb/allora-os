
import { Helmet } from "react-helmet-async";
import StrategyForm from "@/components/strategy-generator/StrategyForm";

export default function StrategyGenerator() {
  return (
    <>
      <Helmet>
        <title>Executive Strategy Generator | Allora AI</title>
      </Helmet>
      
      <div className="container max-w-5xl py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Executive Strategy Generator</h1>
          <p className="text-muted-foreground mt-2">
            Generate strategic business options with AI-powered insights
          </p>
        </div>
        
        <StrategyForm />
      </div>
    </>
  );
}
