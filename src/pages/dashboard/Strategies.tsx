
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { TrendingUp, FileText, ArrowRight, Plus, Edit, Trash2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStrategies } from "@/hooks/useStrategies";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const strategySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  riskLevel: z.enum(["Low", "Medium", "High"]),
});

type StrategyFormValues = z.infer<typeof strategySchema>;

export default function Strategies() {
  const [editingStrategyId, setEditingStrategyId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const { 
    strategies, 
    isLoading, 
    createStrategy, 
    isCreating,
    updateStrategy,
    isUpdating,
    deleteStrategy,
    isDeleting 
  } = useStrategies();
  
  const form = useForm<StrategyFormValues>({
    resolver: zodResolver(strategySchema),
    defaultValues: {
      title: "",
      description: "",
      riskLevel: "Medium",
    },
  });
  
  const onSubmit = (data: StrategyFormValues) => {
    if (editingStrategyId) {
      updateStrategy({ 
        id: editingStrategyId, 
        title: data.title, 
        description: data.description, 
        riskLevel: data.riskLevel as 'Low' | 'Medium' | 'High' 
      });
    } else {
      createStrategy({
        title: data.title,
        description: data.description,
        riskLevel: data.riskLevel as 'Low' | 'Medium' | 'High'
      });
    }
    
    setIsDialogOpen(false);
    form.reset();
    setEditingStrategyId(null);
  };
  
  const handleEditStrategy = (strategyId: string) => {
    const strategy = strategies.find(s => s.id === strategyId);
    if (strategy) {
      form.reset({
        title: strategy.title,
        description: strategy.description || "",
        riskLevel: (strategy.risk_level as 'Low' | 'Medium' | 'High') || "Medium",
      });
      setEditingStrategyId(strategyId);
      setIsDialogOpen(true);
    }
  };
  
  const handleNewStrategy = () => {
    form.reset({
      title: "",
      description: "",
      riskLevel: "Medium",
    });
    setEditingStrategyId(null);
    setIsDialogOpen(true);
  };

  const renderStrategies = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="dashboard-card">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/4 mb-4" />
              <Skeleton className="h-20 w-full mb-4" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      );
    }
    
    if (strategies.length === 0) {
      return (
        <div className="bg-secondary/40 border border-border/50 rounded-lg p-6 text-center mb-10">
          <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">No Strategies Yet</h3>
          <p className="text-gray-300 mb-6">
            Create your first business strategy with AI assistance.
          </p>
          <Button onClick={handleNewStrategy} className="allora-button">
            <Plus className="mr-2 h-4 w-4" />
            Create First Strategy
          </Button>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {strategies.map((strategy) => (
          <div key={strategy.id} className="dashboard-card flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">{strategy.title}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                strategy.risk_level === "Low" 
                  ? "bg-green-500/20 text-green-400" 
                  : strategy.risk_level === "Medium"
                  ? "bg-amber-500/20 text-amber-400"
                  : "bg-red-500/20 text-red-400"
              }`}>
                {strategy.risk_level || "Medium"} Risk
              </span>
            </div>
            
            <p className="text-gray-300 mb-6">{strategy.description}</p>
            
            <div className="mt-auto flex justify-between">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleEditStrategy(strategy.id)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your
                      strategy "{strategy.title}".
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={() => deleteStrategy(strategy.id)} 
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 container mx-auto px-4 py-24">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-3xl font-bold">AI-Generated Business Strategies</h1>
          </div>
          
          <Button onClick={handleNewStrategy} className="allora-button">
            <Plus className="mr-2 h-4 w-4" />
            New Strategy
          </Button>
        </div>
        
        <p className="text-xl text-gray-300 mb-10">
          Allora AI automatically builds full business plans customized to your needs
        </p>
        
        {renderStrategies()}
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingStrategyId ? "Edit Strategy" : "Create New Strategy"}</DialogTitle>
              <DialogDescription>
                {editingStrategyId ? "Update your business strategy details below." : "Fill in the details for your new business strategy."}
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Strategy Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Market Expansion Strategy" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your strategy here..." 
                          rows={4}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="riskLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Risk Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select risk level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Low">Low Risk</SelectItem>
                          <SelectItem value="Medium">Medium Risk</SelectItem>
                          <SelectItem value="High">High Risk</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button 
                    type="submit" 
                    disabled={isCreating || isUpdating}
                  >
                    {(isCreating || isUpdating) ? "Saving..." : (editingStrategyId ? "Update Strategy" : "Create Strategy")}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
