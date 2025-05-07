/**
 * Generates AI-created call scripts based on company insights
 */
export function createAiGeneratedScripts(insights, companyName, industry) {
    if (!insights || insights.length === 0) {
        return [];
    }
    // Just create a few sample AI-generated scripts for demonstration
    return [
        {
            id: "ai-cold-call-script-1",
            title: `AI-Optimized Cold Call for ${industry} Companies`,
            content: `# AI-Optimized Cold Call Script for ${industry} Companies

## Introduction
- Greet the prospect warmly and introduce yourself from ${companyName}
- Mention that you specialize in helping ${industry} businesses

## Industry-Specific Value Proposition
- Discuss common challenges in the ${industry} industry
- Highlight how your solution addresses these specific challenges
- Share relevant industry statistics and trends

## Tailored Questions
- Ask about their specific use case within the ${industry} sector
- Inquire about their current solutions and pain points
- Explore their strategic priorities for the next 12 months

## Industry-Specific Objection Handling
- Address common objections in the ${industry} industry
- Provide case studies specific to their market segment
- Offer competitive comparisons relevant to their needs

## Next Steps
- Suggest an industry-focused demo
- Offer to connect them with similar clients in their industry
- Propose a timeline aligned with typical buying cycles in ${industry}

## Closing
- Thank them for their time
- Summarize key points and next actions
- Provide your direct contact information`,
            target: `${industry} Businesses`,
            duration: "8-10 minutes",
            status: "Ready",
            type: "call",
            aiGenerated: true,
            primaryBot: {
                name: "Sales Optimization AI",
                role: "Cold Calling Expert",
            },
        },
        {
            id: "ai-message-template-1",
            title: `${industry} Personalized Email Template`,
            content: `Subject: Enhancing Your ${industry} Operations with ${companyName}

Hello [Name],

I hope this message finds you well. As a leader in the ${industry} space, I wanted to reach out about how ${companyName} has been helping similar organizations overcome common challenges in your industry.

Our analysis of the ${industry} market shows that companies are currently facing:
- [Industry Challenge 1]
- [Industry Challenge 2]
- [Industry Challenge 3]

Our solution specifically addresses these challenges by [value proposition tailored to industry].

I'd appreciate the opportunity to discuss how we might be able to help [Their Company] achieve similar results as [Reference Customer] who saw [Specific Result] after implementing our solution.

Would you be available for a brief conversation this week? I have availability on [provide 2-3 specific times].

Best regards,
[Your Name]
${companyName}
[Your Contact Information]`,
            target: `${industry} Decision Makers`,
            duration: "N/A",
            status: "Ready",
            type: "message",
            aiGenerated: true,
            primaryBot: {
                name: "Digital Communication AI",
                role: "Marketing Expert",
            },
        },
    ];
}
/**
 * Generates executive team collaborative scripts
 */
export function createExecutiveCollectiveScripts(companyName, industry, companySize, riskAppetite) {
    // Generate scripts based on company profile
    return [
        {
            id: "exec-call-script-1",
            title: `Executive Strategy - ${companySize} ${industry} Call Script`,
            content: `# Executive Collective Call Strategy for ${companySize} ${industry} Companies

## Strategic Opening
- Introduce yourself as a strategic partner for ${industry} businesses
- Mention your executive team's collective experience in this space
- Establish credibility with industry-specific insights

## Market Positioning
- Share relevant market analysis for the ${industry} sector
- Highlight opportunities specific to ${companySize} companies
- Connect these insights to your solution's value proposition

## Strategic Questions
- Inquire about their 3-5 year growth strategy
- Discuss their position relative to competitors
- Explore their current challenges from a leadership perspective

## ROI Framework
- Present an ROI framework tailored to ${companySize} ${industry} businesses
- Share case studies of similar companies who have succeeded
- Outline implementation timeline and resource requirements

## Executive Partnership
- Propose a strategic partnership approach
- Outline executive-level support and resources available
- Suggest an executive briefing or strategy session

## Next Steps
- Confirm interest in proceeding to the next level of discussion
- Schedule a meeting with relevant stakeholders
- Share appropriate executive materials`,
            target: `${companySize} ${industry} Companies`,
            duration: "10-15 minutes",
            status: "Ready",
            type: "call",
            executiveGenerated: true,
            aiGenerated: false,
            primaryBot: {
                name: "Executive Strategy Team",
                role: "Chief Strategy Officer",
            },
            collaborators: [
                {
                    name: "Alex Morgan",
                    role: "CEO",
                },
                {
                    name: "Jordan Chen",
                    role: "CRO",
                },
            ],
        },
        {
            id: "exec-message-1",
            title: `Executive Outreach - ${riskAppetite.toUpperCase()} Risk Profile`,
            content: `Subject: Strategic Partnership Opportunity - ${companyName} Executive Team

Dear [Executive Name],

I'm reaching out on behalf of our executive leadership team at ${companyName} regarding potential strategic alignment between our organizations.

Our analysis indicates that your company maintains a ${riskAppetite} risk profile within the ${industry} sector, which aligns with our expertise in helping ${companySize} businesses navigate market challenges while balancing innovation and stability.

Based on our experience with similar organizations in your industry, we believe we could provide valuable insights on:

1. Optimizing operational efficiency while maintaining your risk tolerance
2. Strategic growth opportunities aligned with your company's ${riskAppetite} approach
3. Competitive positioning strategies for ${companySize} companies in today's ${industry} landscape

I would appreciate the opportunity to arrange a brief executive discussion to explore potential synergies. Would you be available for a 30-minute conversation next week?

Regards,

[Your Name]
[Your Title]
${companyName}
[Your Contact Information]`,
            target: `C-Suite Executives (${riskAppetite.toUpperCase()} Risk Profile)`,
            duration: "N/A",
            status: "Ready",
            type: "message",
            executiveGenerated: true,
            aiGenerated: false,
            primaryBot: {
                name: "Executive Advisory Team",
                role: "Chief Strategy Officer",
            },
            collaborators: [
                {
                    name: "Taylor Wu",
                    role: "CFO",
                },
            ],
        },
    ];
}
