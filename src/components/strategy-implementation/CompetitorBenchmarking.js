import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from '@/backend/supabase';
import { TypographyP } from "@/components/ui/typography";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const initialFormState = {
    competitorName: '',
    marketShare: 0,
    strengthScore: 5,
    weaknessScore: 5,
    notes: ''
};
const CompetitorBenchmarking = ({ strategyId }) => {
    const [competitors, setCompetitors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formState, setFormState] = useState(initialFormState);
    useEffect(() => {
        const fetchCompetitors = async () => {
            setIsLoading(true);
            try {
                const { data, error } = await supabase
                    .from('competitor_benchmarks')
                    .select('*')
                    .eq('strategyId', strategyId)
                    .order('marketShare', { ascending: false });
                if (error)
                    throw error;
                setCompetitors(data || []);
            }
            catch (error) {
                console.error('Error fetching competitors:', error);
                toast.error('Failed to load competitor data');
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchCompetitors();
    }, [strategyId]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState(prev => ({
            ...prev,
            [name]: name === 'marketShare' ? Number(value) : value
        }));
    };
    const handleSliderChange = (name, value) => {
        setFormState(prev => ({
            ...prev,
            [name]: value[0]
        }));
    };
    const handleAddCompetitor = () => {
        setIsEditing(true);
        setFormState(initialFormState);
    };
    const handleEditCompetitor = (competitor) => {
        setIsEditing(true);
        setFormState({
            id: competitor.id,
            competitorName: competitor.competitorName,
            marketShare: competitor.marketShare,
            strengthScore: competitor.strengthScore,
            weaknessScore: competitor.weaknessScore,
            notes: competitor.notes || ''
        });
    };
    const handleCancelEdit = () => {
        setIsEditing(false);
        setFormState(initialFormState);
    };
    const handleSaveCompetitor = async () => {
        if (!formState.competitorName.trim()) {
            toast.error('Competitor name is required');
            return;
        }
        try {
            if (formState.id) {
                // Update existing competitor
                const { error } = await supabase
                    .from('competitor_benchmarks')
                    .update({
                    competitorName: formState.competitorName,
                    marketShare: formState.marketShare,
                    strengthScore: formState.strengthScore,
                    weaknessScore: formState.weaknessScore,
                    notes: formState.notes
                })
                    .eq('id', formState.id);
                if (error)
                    throw error;
                setCompetitors(prev => prev.map(c => c.id === formState.id ? { ...c, ...formState } : c));
                toast.success('Competitor updated successfully');
            }
            else {
                // Add new competitor
                const { data, error } = await supabase
                    .from('competitor_benchmarks')
                    .insert([{
                        strategyId,
                        competitorName: formState.competitorName,
                        marketShare: formState.marketShare,
                        strengthScore: formState.strengthScore,
                        weaknessScore: formState.weaknessScore,
                        notes: formState.notes,
                        created_at: new Date().toISOString()
                    }])
                    .select();
                if (error)
                    throw error;
                if (data && data.length > 0) {
                    setCompetitors(prev => [...prev, data[0]].sort((a, b) => b.marketShare - a.marketShare));
                    toast.success('Competitor added successfully');
                }
            }
            setIsEditing(false);
            setFormState(initialFormState);
        }
        catch (error) {
            console.error('Error saving competitor:', error);
            toast.error('Failed to save competitor data');
        }
    };
    const handleDeleteCompetitor = async (id) => {
        try {
            const { error } = await supabase
                .from('competitor_benchmarks')
                .delete()
                .eq('id', id);
            if (error)
                throw error;
            setCompetitors(prev => prev.filter(c => c.id !== id));
            toast.success('Competitor deleted successfully');
        }
        catch (error) {
            console.error('Error deleting competitor:', error);
            toast.error('Failed to delete competitor');
        }
    };
    // Prepare chart data
    const getChartData = () => {
        return competitors.map(comp => ({
            name: comp.competitorName,
            marketShare: comp.marketShare,
            strength: comp.strengthScore,
            weakness: comp.weaknessScore,
            rating: comp.strengthScore - comp.weaknessScore
        }));
    };
    return (<Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Competitor Benchmarking</CardTitle>
        {!isEditing && (<Button onClick={handleAddCompetitor}>
            <Plus className="mr-2 h-4 w-4"/>
            Add Competitor
          </Button>)}
      </CardHeader>
      <CardContent>
        {isLoading ? (<div className="py-6 text-center text-muted-foreground">
            Loading competitor data...
          </div>) : isEditing ? (<div className="space-y-4">
            <div>
              <Label htmlFor="competitorName">Competitor Name</Label>
              <Input id="competitorName" name="competitorName" value={formState.competitorName} onChange={handleInputChange} placeholder="e.g., Acme Inc."/>
            </div>
            
            <div>
              <Label htmlFor="marketShare">Market Share (%)</Label>
              <Input id="marketShare" name="marketShare" type="number" min="0" max="100" value={formState.marketShare} onChange={handleInputChange}/>
            </div>
            
            <div>
              <Label className="flex justify-between">
                <span>Strength Score (1-10)</span>
                <span>{formState.strengthScore}</span>
              </Label>
              <Slider min={1} max={10} step={1} value={[formState.strengthScore]} onValueChange={(value) => handleSliderChange('strengthScore', value)}/>
            </div>
            
            <div>
              <Label className="flex justify-between">
                <span>Weakness Score (1-10)</span>
                <span>{formState.weaknessScore}</span>
              </Label>
              <Slider min={1} max={10} step={1} value={[formState.weaknessScore]} onValueChange={(value) => handleSliderChange('weaknessScore', value)}/>
            </div>
            
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" name="notes" value={formState.notes} onChange={handleInputChange} placeholder="Add notes about this competitor..." rows={3}/>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
              <Button onClick={handleSaveCompetitor}>Save</Button>
            </div>
          </div>) : competitors.length === 0 ? (<div className="py-12 text-center text-muted-foreground">
            <p className="mb-4">No competitor data has been added yet.</p>
            <Button variant="outline" onClick={handleAddCompetitor}>
              <Plus className="mr-2 h-4 w-4"/>
              Add your first competitor
            </Button>
          </div>) : (<div className="space-y-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="name"/>
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="marketShare" name="Market Share %" fill="#8884d8"/>
                  <Bar dataKey="strength" name="Strength" fill="#82ca9d"/>
                  <Bar dataKey="weakness" name="Weakness" fill="#ff8042"/>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Competitor</TableHead>
                  <TableHead>Market Share</TableHead>
                  <TableHead>Strength</TableHead>
                  <TableHead>Weakness</TableHead>
                  <TableHead>Net Rating</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {competitors.map((competitor) => (<TableRow key={competitor.id}>
                    <TableCell className="font-medium">{competitor.competitorName}</TableCell>
                    <TableCell>{competitor.marketShare}%</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500" style={{ width: `${(competitor.strengthScore / 10) * 100}%` }}/>
                        </div>
                        <span className="ml-2">{competitor.strengthScore}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-red-500" style={{ width: `${(competitor.weaknessScore / 10) * 100}%` }}/>
                        </div>
                        <span className="ml-2">{competitor.weaknessScore}</span>
                      </div>
                    </TableCell>
                    <TableCell className={competitor.strengthScore > competitor.weaknessScore ? 'text-green-500' : 'text-red-500'}>
                      {competitor.strengthScore - competitor.weaknessScore}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditCompetitor(competitor)}>
                          <Edit2 className="h-4 w-4"/>
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDeleteCompetitor(competitor.id)}>
                          <Trash2 className="h-4 w-4"/>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>))}
              </TableBody>
            </Table>
            
            {competitors.some(c => c.notes) && (<div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Competitor Notes</h3>
                <div className="space-y-3">
                  {competitors.filter(c => c.notes).map(competitor => (<Card key={`notes-${competitor.id}`}>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-1">{competitor.competitorName}</h4>
                        <TypographyP>{competitor.notes}</TypographyP>
                      </CardContent>
                    </Card>))}
                </div>
              </div>)}
          </div>)}
      </CardContent>
    </Card>);
};
export default CompetitorBenchmarking;
