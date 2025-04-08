
import { supabase } from '@/backend/supabase';
import { toast } from 'sonner';
import { Strategy } from '@/models/strategy';
import { assessRiskLevel, RiskAssessmentInput } from '@/utils/riskEngine';
import { generateStrategy } from '@/utils/generateStrategy';

export async function fetchCompanyStrategies(companyId: string): Promise<Strategy[]> {
  try {
    const { data, error } = await supabase
      .from('strategies')
      .select('*')
      .eq('company_id', companyId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    // Cast the data to ensure it matches the Strategy type
    return (data || []).map(strategy => ({
      ...strategy,
      risk_level: strategy.risk_level as Strategy['risk_level']
    }));
  } catch (error: any) {
    console.error('Error fetching strategies:', error.message);
    return [];
  }
}

export async function fetchStrategy(strategyId: string): Promise<Strategy | null> {
  try {
    const { data, error } = await supabase
      .from('strategies')
      .select('*')
      .eq('id', strategyId)
      .single();

    if (error) {
      throw error;
    }

    // Cast the data to ensure it matches the Strategy type
    return data ? {
      ...data,
      risk_level: data.risk_level as Strategy['risk_level']
    } : null;
  } catch (error: any) {
    console.error('Error fetching strategy:', error.message);
    return null;
  }
}

export async function createStrategy(
  companyId: string,
  title: string,
  description: string,
  riskLevel: 'Low' | 'Medium' | 'High'
): Promise<Strategy | null> {
  try {
    const { data, error } = await supabase
      .from('strategies')
      .insert([
        { 
          company_id: companyId,
          title,
          description,
          risk_level: riskLevel
        }
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    toast.success('Strategy created successfully');
    
    // Cast the data to ensure it matches the Strategy type
    return data ? {
      ...data,
      risk_level: data.risk_level as Strategy['risk_level']
    } : null;
  } catch (error: any) {
    toast.error(`Failed to create strategy: ${error.message}`);
    return null;
  }
}

export async function generateStrategyFromAnswers(
  companyId: string,
  answers: RiskAssessmentInput
): Promise<Strategy | null> {
  const riskLevel = assessRiskLevel(answers);
  const strategyTemplate = generateStrategy(riskLevel);
  
  return await createStrategy(
    companyId,
    strategyTemplate.title,
    strategyTemplate.description,
    strategyTemplate.riskLevel as 'Low' | 'Medium' | 'High'
  );
}

export async function updateStrategy(
  strategyId: string,
  updates: Partial<Omit<Strategy, 'id' | 'created_at' | 'company_id'>>
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('strategies')
      .update(updates)
      .eq('id', strategyId);

    if (error) {
      throw error;
    }

    toast.success('Strategy updated successfully');
    return true;
  } catch (error: any) {
    toast.error(`Failed to update strategy: ${error.message}`);
    return false;
  }
}

export async function deleteStrategy(strategyId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('strategies')
      .delete()
      .eq('id', strategyId);

    if (error) {
      throw error;
    }

    toast.success('Strategy deleted successfully');
    return true;
  } catch (error: any) {
    toast.error(`Failed to delete strategy: ${error.message}`);
    return false;
  }
}
