import { useState } from "react";
export function usePreLaunchChecklist() {
    const [checklistItems, setChecklistItems] = useState([
        // API Integrations
        {
            id: "1",
            category: "Supabase",
            task: "Connect to real database (NOT test project)",
            completed: true,
            critical: true,
        },
        {
            id: "2",
            category: "Supabase",
            task: "Ensure real tables exist (profiles, companies, strategies, campaigns, leads)",
            completed: true,
            critical: true,
        },
        {
            id: "3",
            category: "Stripe",
            task: "Connect real Stripe API keys (test mode is fine)",
            completed: true,
            critical: true,
        },
        {
            id: "4",
            category: "Postmark",
            task: "Hook real Postmark API Key for emails",
            completed: true,
            critical: true,
        },
        {
            id: "5",
            category: "Twilio",
            task: "Hook Twilio API Key for SMS functionality",
            completed: true,
            critical: true,
        },
        {
            id: "6",
            category: "Heygen",
            task: "Hook Heygen API Key for AI video generation",
            completed: true,
            critical: true,
        },
        {
            id: "7",
            category: "Zapier",
            task: "Make sure Zapier hooks are ready (if applicable)",
            completed: true,
            critical: false,
        },
        // Code Cleanups
        {
            id: "8",
            category: "Cleanup",
            task: "Remove any dummy/test data",
            completed: true,
            critical: true,
        },
        {
            id: "9",
            category: "Cleanup",
            task: "Set environment variables in Supabase Edge Functions",
            completed: true,
            critical: true,
        },
        {
            id: "10",
            category: "Cleanup",
            task: "Turn off test modes in API calls",
            completed: true,
            critical: true,
        },
        {
            id: "11",
            category: "Cleanup",
            task: "Format and lint all files",
            completed: true,
            critical: false,
        },
        {
            id: "12",
            category: "Cleanup",
            task: "Remove console.logs and TODO comments",
            completed: true,
            critical: false,
        },
        // Final Checks
        {
            id: "13",
            category: "Testing",
            task: "Test user authentication flows",
            completed: true,
            critical: true,
        },
        {
            id: "14",
            category: "Testing",
            task: "Test lead management functionality",
            completed: true,
            critical: true,
        },
        {
            id: "15",
            category: "Testing",
            task: "Test payment processing",
            completed: true,
            critical: true,
        },
        {
            id: "16",
            category: "Testing",
            task: "Test email notifications",
            completed: true,
            critical: true,
        },
        {
            id: "17",
            category: "Testing",
            task: "Test SMS functionality",
            completed: true,
            critical: true,
        },
        {
            id: "18",
            category: "Testing",
            task: "Test video generation",
            completed: true,
            critical: true,
        },
    ]);
    const toggleItem = (id) => {
        setChecklistItems((items) => items.map((item) => item.id === id ? Object.assign(Object.assign({}, item), { completed: !item.completed }) : item));
    };
    const criticalItemsCompleted = checklistItems.filter((item) => item.critical && !item.completed).length ===
        0;
    const allItemsCompleted = checklistItems.filter((item) => !item.completed).length === 0;
    const getItemsByCategory = (category) => {
        return checklistItems.filter((item) => item.category === category ||
            (category === "Supabase" &&
                [
                    "Supabase",
                    "Stripe",
                    "Postmark",
                    "Twilio",
                    "Heygen",
                    "Zapier",
                ].includes(item.category)));
    };
    return {
        checklistItems,
        toggleItem,
        criticalItemsCompleted,
        allItemsCompleted,
        getItemsByCategory,
    };
}
