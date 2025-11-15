import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

// Intent keywords for matching user queries to topics
const INTENT_KEYWORDS = {
  mass_times: ['mass', 'times', 'schedule', 'service', 'worship', 'liturgy', 'sunday', 'weekend'],
  online_mass: ['online', 'stream', 'watch', 'livestream', 'virtual'],
  volunteer: ['volunteer', 'serve', 'help', 'ministry', 'get involved'],
  mental_health: ['mental health', 'counseling', 'therapy', 'depression', 'anxiety'],
  counseling: ['counseling', 'therapy', 'talk', 'pastoral care'],
  kids: ['kids', 'children', 'youth', 'elementary', 'ccd', 'religious education'],
  teens: ['teens', 'youth', 'high school', 'middle school', 'young'],
  family: ['family', 'families', 'parents', 'marriage', 'parenting'],
  grief: ['grief', 'loss', 'death', 'bereavement', 'mourning'],
  support_groups: ['support', 'group', 'community', 'share', 'together'],
  sacraments: ['sacrament', 'baptism', 'confession', 'communion', 'confirmation', 'marriage', 'anointing'],
  baptism: ['baptism', 'baptize', 'christening'],
  confession: ['confession', 'reconciliation', 'penance'],
  giving: ['give', 'donate', 'donation', 'offering', 'tithe', 'contribution'],
  lifelines: ['lifeline', 'small group', 'community', 'connect'],
  events: ['event', 'calendar', 'happening', 'activity'],
  bible_study: ['bible study', 'scripture', 'word of god'],
  prayer: ['prayer', 'pray', 'intercession'],
  adoration: ['adoration', 'eucharistic', 'holy hour'],
  service: ['service', 'outreach', 'mission', 'charity'],
  music: ['music', 'choir', 'sing', 'worship music'],
}

// Audience detection
const AUDIENCE_KEYWORDS = {
  visitor: ['new', 'visiting', 'visitor', 'first time', 'curious', 'exploring'],
  parishioner: ['member', 'parishioner', 'registered', 'belong'],
}

/**
 * Detect topics from user query
 */
function detectTopics(query: string): string[] {
  const lowerQuery = query.toLowerCase()
  const detectedTopics: string[] = []

  for (const [topic, keywords] of Object.entries(INTENT_KEYWORDS)) {
    if (keywords.some(keyword => lowerQuery.includes(keyword))) {
      detectedTopics.push(topic)
    }
  }

  return detectedTopics
}

/**
 * Detect audience from user query
 */
function detectAudience(query: string): string[] {
  const lowerQuery = query.toLowerCase()
  const detectedAudience: string[] = []

  for (const [audience, keywords] of Object.entries(AUDIENCE_KEYWORDS)) {
    if (keywords.some(keyword => lowerQuery.includes(keyword))) {
      detectedAudience.push(audience)
    }
  }

  // Default to 'both' if no specific audience detected
  return detectedAudience.length > 0 ? detectedAudience : ['both']
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter "q" is required' },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config })

    // Detect topics and audience from query
    const topics = detectTopics(query)
    const audience = detectAudience(query)

    // Build search query
    const whereConditions: any = {
      or: [
        // Text search in title
        {
          title: {
            contains: query,
          },
        },
        // Text search in description
        {
          shortDescription: {
            contains: query,
          },
        },
      ],
    }

    // Add topic filter if topics detected
    if (topics.length > 0) {
      whereConditions.and = [
        {
          or: [
            {
              topics: {
                in: topics,
              },
            },
            // Keep text matches even without topic match
            {
              title: {
                contains: query,
              },
            },
          ],
        },
      ]
    }

    // Add audience filter
    if (audience.length > 0 && !audience.includes('both')) {
      if (!whereConditions.and) {
        whereConditions.and = []
      }
      whereConditions.and.push({
        audience: {
          in: [...audience, 'both'],
        },
      })
    }

    // Fetch search results
    const results = await payload.find({
      collection: 'search-items',
      where: whereConditions,
      limit: 10,
      sort: '-priority',
    })

    // Format results
    const formattedResults = results.docs.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.shortDescription,
      url: item.url,
      kind: item.kind,
      audience: item.audience,
      topics: item.topics,
      priority: item.priority,
    }))

    return NextResponse.json({
      query,
      detectedTopics: topics,
      detectedAudience: audience,
      results: formattedResults,
      count: formattedResults.length,
    })
  } catch (error) {
    console.error('Assistant search error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
