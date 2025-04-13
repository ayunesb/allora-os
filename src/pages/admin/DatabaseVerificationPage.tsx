
import React, { useState } from "react";
import { DatabaseVerificationDashboard } from "@/components/admin/database-verification";

export default function DatabaseVerificationPage() {
  const [verificationResult, setVerificationResult] = useState({
    tables: {
      status: 'pending',
      results: []
    },
    functions: {
      status: 'pending',
      results: []
    },
    policies: {
      status: 'pending',
      results: []
    }
  });
  
  const handleVerify = async () => {
    try {
      setVerificationResult({
        tables: {
          status: 'loading',
          results: []
        },
        functions: {
          status: 'loading',
          results: []
        },
        policies: {
          status: 'loading',
          results: []
        }
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setVerificationResult({
        tables: {
          status: 'success',
          results: [
            { name: 'users', exists: true, status: 'success' },
            { name: 'profiles', exists: true, status: 'success' },
            { name: 'companies', exists: true, status: 'success' }
          ]
        },
        functions: {
          status: 'success',
          results: [
            { name: 'get_user_id', exists: true, status: 'success' },
            { name: 'get_company_details', exists: true, status: 'success' }
          ]
        },
        policies: {
          status: 'success',
          results: [
            { name: 'users_read_policy', exists: true, status: 'success' },
            { name: 'companies_read_policy', exists: true, status: 'success' }
          ]
        }
      });
    } catch (error) {
      console.error('Error during verification:', error);
      setVerificationResult({
        tables: { status: 'error', results: [] },
        functions: { status: 'error', results: [] },
        policies: { status: 'error', results: [] }
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Database Verification</h1>
      <p className="text-muted-foreground">
        Verify database structure, tables, and functionality.
      </p>
      
      <DatabaseVerificationDashboard 
        result={verificationResult}
        onVerify={handleVerify}
      />
    </div>
  );
}
