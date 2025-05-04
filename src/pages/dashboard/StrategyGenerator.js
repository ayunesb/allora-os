import { Helmet } from "react-helmet-async";
import { StrategyGenerator } from "@/components/strategy/StrategyGenerator";
export default function StrategyGeneratorPage() {
    return (<>
      <Helmet>
        <title>Executive Strategy Generator | Allora AI</title>
      </Helmet>
      
      <StrategyGenerator />
    </>);
}
