import { RequiredDataFromCollectionSlug } from 'payload'
import type { PostArgs } from './post-1'

export const post2: (args: PostArgs) => RequiredDataFromCollectionSlug<'posts'> = ({
  heroImage,
  blockImage,
  author,
}) => {
  return {
    slug: 'global-gaze',
    _status: 'published',
    authors: [author],
    content: `
      <h2>Explore the untold and overlooked. A magnified view into the corners of the world, where every story deserves its spotlight.</h2>

      <p><strong>Disclaimer:</strong> This content is fabricated and for demonstration purposes only. To edit this post, <a href="/admin" target="_blank">navigate to the admin dashboard</a>.</p>

      <p>In a world of billions, countless stories remain in the shadows. "Global Gaze" delves into these narratives, exploring the cultures, challenges, and triumphs of communities often overlooked by mainstream media.</p>

      <h3>Voices from the Void</h3>

      <p>Every corner of the world has tales to tell. From remote villages to bustling urban enclaves, we journey to bring these voices to the forefront. Our mission: to amplify the unheard and shine a light on the unseen.</p>

      <ul>
        <li>Communities fighting climate change firsthand.</li>
        <li>Artists preserving ancestral traditions in the modern age.</li>
        <li>Young leaders driving change from the ground up.</li>
      </ul>

      <h3>Bridging Worlds</h3>

      <p>Understanding is the first step to connection. By sharing these global stories, we aim to build bridges between cultures, fostering empathy and mutual respect.</p>

      <blockquote>
        <p>In the tapestry of humanity, every thread, however faint, adds to the richness of the whole.</p>
      </blockquote>

      <h3>Conclusion</h3>

      <p>As we navigate the vastness of our global community, let "Global Gaze" be your window to the world's hidden corners and untold stories.</p>
    `,
    heroImage: heroImage.id,
    meta: {
      description:
        'Explore the untold and overlooked. A magnified view into the corners of the world.',
      image: heroImage.id,
      title: 'Global Gaze: Stories from the World\'s Hidden Corners',
    },
    publishedAt: '2024-01-05T00:00:00.000Z',
    title: 'Global Gaze: Stories from the World\'s Hidden Corners',
  }
}
