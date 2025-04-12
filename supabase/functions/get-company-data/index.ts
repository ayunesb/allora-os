
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'
import { corsHeaders } from '../_shared/cors.ts'

// Get environment variables
const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || ''
const zyteApiKey = Deno.env.get('ZYTE_API_KEY') || ''

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey)

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  // Ensure only POST requests are handled
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { 
      status: 405, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    })
  }

  try {
    // Get the request body
    const { website } = await req.json()
    
    if (!website) {
      return new Response(JSON.stringify({ error: 'Website URL is required' }), { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      })
    }

    console.log(`Fetching company data for website: ${website}`)

    // Normalize the website URL
    let normalizedUrl = website
    if (!normalizedUrl.startsWith('http')) {
      normalizedUrl = `https://${normalizedUrl}`
    }

    // Make request to Zyte API
    const zyteResponse = await fetch('https://api.zyte.com/v1/extract', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${zyteApiKey}:`)}`,
      },
      body: JSON.stringify({
        url: normalizedUrl,
        browserHtml: true,
        extractFrom: {
          webPage: {
            "meta": true,
            "article": true,
            "address": true,
            "contactPoint": true,
            "interactionCounter": true,
            "organizationContacts": true,
            "itemList": true,
            "product": true,
            "autoKeywords": true,
            "links": true,
            "screenshot": true,
            "siteNavigationElement": true,
            "schema.org": {
              "@type": [
                "Organization",
                "LocalBusiness",
                "Corporation"
              ]
            }
          }
        }
      }),
    })

    if (!zyteResponse.ok) {
      const errorData = await zyteResponse.json()
      console.error('Zyte API error:', errorData)
      return new Response(JSON.stringify({ error: 'Failed to fetch company data', details: errorData }), { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      })
    }

    // Process the response
    const responseData = await zyteResponse.json()
    
    // Extract relevant company information
    const companyData = processCompanyData(responseData)
    
    return new Response(JSON.stringify({ 
      success: true, 
      data: companyData 
    }), { 
      status: 200, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    })
  } catch (error) {
    console.error('Error processing request:', error)
    return new Response(JSON.stringify({ error: error.message || 'Unknown error occurred' }), { 
      status: 500, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    })
  }
})

// Helper function to process and extract relevant company data from Zyte response
function processCompanyData(zyteData: any) {
  try {
    const result: any = {
      name: '',
      description: '',
      industry: '',
      size: '',
      products: [],
      services: [],
    }

    // Extract company name
    if (zyteData.webPage?.schema?.org) {
      const org = zyteData.webPage.schema.org.find(
        (item: any) => item['@type'] === 'Organization' || 
                      item['@type'] === 'LocalBusiness' || 
                      item['@type'] === 'Corporation'
      )
      if (org) {
        result.name = org.name || ''
      }
    }

    // If no name found in schema.org data, try meta data
    if (!result.name && zyteData.webPage?.meta) {
      result.name = zyteData.webPage.meta.title || ''
    }

    // Extract description
    if (zyteData.webPage?.meta?.description) {
      result.description = zyteData.webPage.meta.description
    } else if (zyteData.webPage?.article?.description) {
      result.description = zyteData.webPage.article.description
    }

    // Try to extract industry from keywords or categories
    if (zyteData.webPage?.autoKeywords) {
      // Get the top 5 keywords and use them to guess the industry
      const keywords = zyteData.webPage.autoKeywords.slice(0, 5).map((k: any) => k.value)
      
      // Common industry keywords to check against
      const industryKeywords: Record<string, string> = {
        'technology': 'Technology',
        'software': 'Technology',
        'tech': 'Technology',
        'healthcare': 'Healthcare',
        'medical': 'Healthcare',
        'finance': 'Finance',
        'banking': 'Finance',
        'education': 'Education',
        'retail': 'Retail',
        'ecommerce': 'E-Commerce',
        'manufacturing': 'Manufacturing',
        'real estate': 'Real Estate',
        'property': 'Real Estate',
        'construction': 'Construction',
        'legal': 'Legal',
        'law': 'Legal',
        'hospitality': 'Hospitality',
        'restaurant': 'Food & Beverage',
        'food': 'Food & Beverage',
        'travel': 'Travel & Tourism',
        'tourism': 'Travel & Tourism',
        'marketing': 'Marketing',
        'advertising': 'Marketing',
        'consulting': 'Consulting',
        'entertainment': 'Entertainment',
        'media': 'Media',
        'transportation': 'Transportation',
        'automotive': 'Automotive',
        'energy': 'Energy',
        'telecommunication': 'Telecommunications',
        'insurance': 'Insurance',
        'agriculture': 'Agriculture',
        'aerospace': 'Aerospace',
        'defense': 'Defense',
        'pharmaceutical': 'Pharmaceutical',
        'non-profit': 'Non-Profit',
        'charity': 'Non-Profit',
      }
      
      // Check if any keyword matches an industry
      for (const keyword of keywords) {
        for (const [industryKey, industryValue] of Object.entries(industryKeywords)) {
          if (keyword.toLowerCase().includes(industryKey)) {
            result.industry = industryValue
            break
          }
        }
        if (result.industry) break
      }
    }

    // Extract products or services
    if (zyteData.webPage?.product) {
      result.products = zyteData.webPage.product.map((p: any) => p.name || 'Unnamed Product')
    }

    // Try to extract services from navigation or links
    if (zyteData.webPage?.siteNavigationElement) {
      const serviceKeywords = ['services', 'solutions', 'offerings', 'what we do']
      const serviceNavItems = zyteData.webPage.siteNavigationElement.filter(
        (nav: any) => nav.name && serviceKeywords.some(keyword => 
          nav.name.toLowerCase().includes(keyword)
        )
      )
      
      if (serviceNavItems.length > 0) {
        result.services = serviceNavItems.map((nav: any) => nav.name)
      }
    }

    // Try to estimate company size
    if (zyteData.webPage?.article?.text) {
      const sizePatterns = [
        { regex: /([0-9,]+)\s*employees/i, group: 1 },
        { regex: /team of\s*([0-9,]+)/i, group: 1 },
        { regex: /staff of\s*([0-9,]+)/i, group: 1 },
        { regex: /company of\s*([0-9,]+)/i, group: 1 }
      ]
      
      for (const pattern of sizePatterns) {
        const match = zyteData.webPage.article.text.match(pattern.regex)
        if (match && match[pattern.group]) {
          result.size = match[pattern.group].replace(/,/g, '')
          break
        }
      }
    }

    return result
  } catch (error) {
    console.error('Error processing company data:', error)
    return {
      name: '',
      description: '',
      industry: '',
      size: '',
      products: [],
      services: []
    }
  }
}
