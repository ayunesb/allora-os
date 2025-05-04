import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BarChart, Sparkles, Save, ThumbsUp, FileDown, Zap, Shield, Lightbulb } from 'lucide-react';
const DebateSummaryDisplay = ({ summary, debateTopic, executives, onSaveStrategy, onNewDebate }) => {
    return (<ScrollArea className="h-full">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <BarChart className="h-6 w-6 text-purple-500"/>
          <span>Debate Summary: {debateTopic}</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="bg-gray-900 border-gray-800 shadow-lg">
            <CardHeader className="pb-3 border-b border-gray-800">
              <CardTitle className="text-lg text-white">Winning Strategy</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="bg-gradient-to-r from-purple-950/50 to-blue-950/50 border border-purple-800/30 rounded-lg p-4">
                <p className="text-white">{summary.winningStrategy}</p>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-950/30 border border-green-800/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-green-500"/>
                    <h4 className="font-medium text-green-400">Safe Move</h4>
                  </div>
                  <p className="text-sm text-white">{summary.safeMove}</p>
                </div>
                
                <div className="bg-amber-950/30 border border-amber-800/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-amber-500"/>
                    <h4 className="font-medium text-amber-400">Bold Move</h4>
                  </div>
                  <p className="text-sm text-white">{summary.boldMove}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-800 shadow-lg">
            <CardHeader className="pb-3 border-b border-gray-800">
              <CardTitle className="text-lg text-white">Key Points</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-white flex items-center gap-2 mb-2">
                    <ThumbsUp className="h-4 w-4 text-purple-500"/>
                    <span>Key Disagreements</span>
                  </h4>
                  <ul className="space-y-2">
                    {summary.keyDisagreements.map((point, idx) => (<li key={idx} className="bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm text-gray-300">
                        {point}
                      </li>))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-white flex items-center gap-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-amber-500"/>
                    <span>Alternative Ideas</span>
                  </h4>
                  <ul className="space-y-2">
                    {summary.alternativeIdeas.map((idea, idx) => (<li key={idx} className="bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm text-gray-300">
                        {idea}
                      </li>))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-gray-900 border-gray-800 shadow-lg mb-6">
          <CardHeader className="pb-3 border-b border-gray-800">
            <CardTitle className="text-lg text-white">Executive Performance</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {executives.map(exec => {
            const performance = summary.executivePerformance[exec.id];
            if (!performance)
                return null;
            return (<div key={exec.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4 flex flex-col items-center">
                    <Avatar className="h-16 w-16 mb-2 border-2 border-purple-600/50">
                      <AvatarImage src={exec.avatar} alt={exec.name}/>
                      <AvatarFallback className="bg-purple-900 text-white">
                        {exec.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <h4 className="font-medium text-white text-center mb-1">{exec.name}</h4>
                    <p className="text-xs text-gray-400 text-center mb-3">{exec.title}</p>
                    
                    <div className="w-full space-y-2">
                      <div>
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="text-gray-400">Boldness</span>
                          <span className="text-purple-400">{performance.boldnessScore}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: `${performance.boldnessScore}%` }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="text-gray-400">Risk Alignment</span>
                          <span className="text-blue-400">{performance.riskAlignment}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${performance.riskAlignment}%` }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="text-gray-400">Innovation</span>
                          <span className="text-amber-400">{performance.innovationScore}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: `${performance.innovationScore}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>);
        })}
            </div>
          </CardContent>
        </Card>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="outline" className="border-purple-600 text-purple-400 hover:bg-purple-950 hover:text-purple-300" onClick={onNewDebate}>
            <Sparkles className="h-4 w-4 mr-2"/>
            <span>New Debate</span>
          </Button>
          
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700" onClick={onSaveStrategy}>
            <Save className="h-4 w-4 mr-2"/>
            <span>Save Strategy</span>
          </Button>
          
          <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
            <FileDown className="h-4 w-4 mr-2"/>
            <span>Export Summary</span>
          </Button>
        </div>
      </div>
    </ScrollArea>);
};
export default DebateSummaryDisplay;
