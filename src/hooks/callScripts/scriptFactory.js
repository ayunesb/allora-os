"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAiGeneratedScripts = createAiGeneratedScripts;
exports.createExecutiveCollectiveScripts = createExecutiveCollectiveScripts;
/**
 * Generates AI-created call scripts based on company insights
 */
function createAiGeneratedScripts(insights, companyName, industry) {
  if (!insights || insights.length === 0) {
    return [];
  }
  // Just create a few sample AI-generated scripts for demonstration
  return [
    {
      id: "ai-cold-call-script-1",
      title: "AI-Optimized Cold Call for ".concat(industry, " Companies"),
      content: "# AI-Optimized Cold Call Script for "
        .concat(
          industry,
          " Companies\n\n## Introduction\n- Greet the prospect warmly and introduce yourself from ",
        )
        .concat(companyName, "\n- Mention that you specialize in helping ")
        .concat(
          industry,
          " businesses\n\n## Industry-Specific Value Proposition\n- Discuss common challenges in the ",
        )
        .concat(
          industry,
          " industry\n- Highlight how your solution addresses these specific challenges\n- Share relevant industry statistics and trends\n\n## Tailored Questions\n- Ask about their specific use case within the ",
        )
        .concat(
          industry,
          " sector\n- Inquire about their current solutions and pain points\n- Explore their strategic priorities for the next 12 months\n\n## Industry-Specific Objection Handling\n- Address common objections in the ",
        )
        .concat(
          industry,
          " industry\n- Provide case studies specific to their market segment\n- Offer competitive comparisons relevant to their needs\n\n## Next Steps\n- Suggest an industry-focused demo\n- Offer to connect them with similar clients in their industry\n- Propose a timeline aligned with typical buying cycles in ",
        )
        .concat(
          industry,
          "\n\n## Closing\n- Thank them for their time\n- Summarize key points and next actions\n- Provide your direct contact information",
        ),
      target: "".concat(industry, " Businesses"),
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
      title: "".concat(industry, " Personalized Email Template"),
      content: "Subject: Enhancing Your "
        .concat(industry, " Operations with ")
        .concat(
          companyName,
          "\n\nHello [Name],\n\nI hope this message finds you well. As a leader in the ",
        )
        .concat(industry, " space, I wanted to reach out about how ")
        .concat(
          companyName,
          " has been helping similar organizations overcome common challenges in your industry.\n\nOur analysis of the ",
        )
        .concat(
          industry,
          " market shows that companies are currently facing:\n- [Industry Challenge 1]\n- [Industry Challenge 2]\n- [Industry Challenge 3]\n\nOur solution specifically addresses these challenges by [value proposition tailored to industry].\n\nI'd appreciate the opportunity to discuss how we might be able to help [Their Company] achieve similar results as [Reference Customer] who saw [Specific Result] after implementing our solution.\n\nWould you be available for a brief conversation this week? I have availability on [provide 2-3 specific times].\n\nBest regards,\n[Your Name]\n",
        )
        .concat(companyName, "\n[Your Contact Information]"),
      target: "".concat(industry, " Decision Makers"),
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
function createExecutiveCollectiveScripts(
  companyName,
  industry,
  companySize,
  riskAppetite,
) {
  // Generate scripts based on company profile
  return [
    {
      id: "exec-call-script-1",
      title: "Executive Strategy - "
        .concat(companySize, " ")
        .concat(industry, " Call Script"),
      content: "# Executive Collective Call Strategy for "
        .concat(companySize, " ")
        .concat(
          industry,
          " Companies\n\n## Strategic Opening\n- Introduce yourself as a strategic partner for ",
        )
        .concat(
          industry,
          " businesses\n- Mention your executive team's collective experience in this space\n- Establish credibility with industry-specific insights\n\n## Market Positioning\n- Share relevant market analysis for the ",
        )
        .concat(industry, " sector\n- Highlight opportunities specific to ")
        .concat(
          companySize,
          " companies\n- Connect these insights to your solution's value proposition\n\n## Strategic Questions\n- Inquire about their 3-5 year growth strategy\n- Discuss their position relative to competitors\n- Explore their current challenges from a leadership perspective\n\n## ROI Framework\n- Present an ROI framework tailored to ",
        )
        .concat(companySize, " ")
        .concat(
          industry,
          " businesses\n- Share case studies of similar companies who have succeeded\n- Outline implementation timeline and resource requirements\n\n## Executive Partnership\n- Propose a strategic partnership approach\n- Outline executive-level support and resources available\n- Suggest an executive briefing or strategy session\n\n## Next Steps\n- Confirm interest in proceeding to the next level of discussion\n- Schedule a meeting with relevant stakeholders\n- Share appropriate executive materials",
        ),
      target: "".concat(companySize, " ").concat(industry, " Companies"),
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
      title: "Executive Outreach - ".concat(
        riskAppetite.toUpperCase(),
        " Risk Profile",
      ),
      content: "Subject: Strategic Partnership Opportunity - "
        .concat(
          companyName,
          " Executive Team\n\nDear [Executive Name],\n\nI'm reaching out on behalf of our executive leadership team at ",
        )
        .concat(
          companyName,
          " regarding potential strategic alignment between our organizations.\n\nOur analysis indicates that your company maintains a ",
        )
        .concat(riskAppetite, " risk profile within the ")
        .concat(
          industry,
          " sector, which aligns with our expertise in helping ",
        )
        .concat(
          companySize,
          " businesses navigate market challenges while balancing innovation and stability.\n\nBased on our experience with similar organizations in your industry, we believe we could provide valuable insights on:\n\n1. Optimizing operational efficiency while maintaining your risk tolerance\n2. Strategic growth opportunities aligned with your company's ",
        )
        .concat(
          riskAppetite,
          " approach\n3. Competitive positioning strategies for ",
        )
        .concat(companySize, " companies in today's ")
        .concat(
          industry,
          " landscape\n\nI would appreciate the opportunity to arrange a brief executive discussion to explore potential synergies. Would you be available for a 30-minute conversation next week?\n\nRegards,\n\n[Your Name]\n[Your Title]\n",
        )
        .concat(companyName, "\n[Your Contact Information]"),
      target: "C-Suite Executives (".concat(
        riskAppetite.toUpperCase(),
        " Risk Profile)",
      ),
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
