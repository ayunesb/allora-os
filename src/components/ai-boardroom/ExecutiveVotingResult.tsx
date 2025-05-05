import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
const ExecutiveVotingResult = ({ votes, executives }) => {
    const optionA = votes.filter(v => v.choice === 'option_a');
    const optionB = votes.filter(v => v.choice === 'option_b');
    const percentA = Math.round((optionA.length / votes.length) * 100);
    const percentB = Math.round((optionB.length / votes.length) * 100);
    return (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg bg-gray-900 border border-gray-800 overflow-hidden mx-auto max-w-2xl">
      <div className="p-4 border-b border-gray-800">
        <h3 className="text-lg font-medium text-white">Executive Vote Results</h3>
        <p className="text-sm text-gray-400">
          Your executive team has voted on the best approach
        </p>
      </div>
      
      <div className="p-4">
        <div className="space-y-6">
          {/* Option A */}
          <div>
            <div className="flex justify-between mb-1">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                <span className="text-sm font-medium text-white">Aggressive Approach</span>
              </div>
              <span className="text-sm text-gray-400">{percentA}%</span>
            </div>
            
            <div className="relative">
              <Progress value={percentA} className="h-8 bg-gray-800"/>
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center px-2">
                {optionA.map((vote, index) => {
            const exec = executives.find(e => e.id === vote.executiveId);
            if (!exec)
                return null;
            return (<div key={vote.executiveId} className="relative" style={{ left: `${(index / Math.max(optionA.length - 1, 1)) * 90}%` }}>
                      <Avatar className="h-6 w-6 border border-gray-700">
                        <AvatarImage src={exec.avatar} alt={exec.name}/>
                        <AvatarFallback className="bg-purple-900 text-white text-xs">
                          {exec.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </div>);
        })}
              </div>
            </div>
          </div>
          
          {/* Option B */}
          <div>
            <div className="flex justify-between mb-1">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm font-medium text-white">Cautious Approach</span>
              </div>
              <span className="text-sm text-gray-400">{percentB}%</span>
            </div>
            
            <div className="relative">
              <Progress value={percentB} className="h-8 bg-gray-800" color="blue"/>
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center px-2">
                {optionB.map((vote, index) => {
            const exec = executives.find(e => e.id === vote.executiveId);
            if (!exec)
                return null;
            return (<div key={vote.executiveId} className="relative" style={{ left: `${(index / Math.max(optionB.length - 1, 1)) * 90}%` }}>
                      <Avatar className="h-6 w-6 border border-gray-700">
                        <AvatarImage src={exec.avatar} alt={exec.name}/>
                        <AvatarFallback className="bg-blue-900 text-white text-xs">
                          {exec.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </div>);
        })}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-800">
          <h4 className="text-sm font-medium text-white mb-2">Individual Executive Votes</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {votes.map(vote => {
            const exec = executives.find(e => e.id === vote.executiveId);
            if (!exec)
                return null;
            return (<div key={vote.executiveId} className="flex items-center gap-2 p-2 rounded-md bg-gray-800/50">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={exec.avatar} alt={exec.name}/>
                    <AvatarFallback className="bg-purple-900 text-white">
                      {exec.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">{exec.name}</span>
                      <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${vote.choice === 'option_a'
                    ? 'bg-purple-950/70 text-purple-300'
                    : 'bg-blue-950/70 text-blue-300'}`}>
                        {vote.choice === 'option_a' ? 'Aggressive' : 'Cautious'}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-xs text-gray-400">{vote.confidence}% confidence</span>
                    </div>
                  </div>
                </div>);
        })}
          </div>
        </div>
      </div>
    </motion.div>);
};
export default ExecutiveVotingResult;
