import type { Media, User } from '@/payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'

export type PostArgs = {
  heroImage: Media
  blockImage: Media
  author: User
}

export const post1: (args: PostArgs) => RequiredDataFromCollectionSlug<'posts'> = ({
  heroImage,
  blockImage,
  author,
}) => {
  return {
    slug: 'digital-horizons',
    _status: 'published',
    authors: [author],
    content: `
      <h2>Dive into the marvels of modern innovation, where the only constant is change. A journey where pixels and data converge to craft the future.</h2>

      <p><strong>Disclaimer:</strong> This content is fabricated and for demonstration purposes only. To edit this post, <a href="/admin" target="_blank">navigate to the admin dashboard</a>.</p>

      <p>In an era where technology evolves at lightning speed, staying abreast of the latest trends isn't just beneficial—it's essential. From AI-driven solutions to sustainable tech innovations, the digital landscape is continuously reshaped by fresh ideas and groundbreaking inventions.</p>

      <h3>The AI Revolution</h3>

      <p>Artificial Intelligence is no longer a futuristic concept; it's a present-day reality. From personal assistants in our smartphones to intricate algorithms that power our favorite apps, AI's influence is pervasive.</p>

      <ul>
        <li>Natural Language Processing (NLP): Enhancing human-computer interaction.</li>
        <li>Neural Networks: Powering image and speech recognition.</li>
        <li>Predictive Analysis: Anticipating user behavior for tailored experiences.</li>
      </ul>

      <h3>Sustainable Tech: The Green Side of Innovation</h3>

      <p>As we advance, there's a growing emphasis on eco-friendly technologies. Innovations that reduce carbon footprints and promote a sustainable future are at the forefront of research and development.</p>

      <blockquote>
        <p>Technology and innovation must go hand in hand with sustainability to ensure a brighter future for all.</p>
      </blockquote>

      <h3>Conclusion</h3>

      <p>As we navigate these digital horizons, one thing is certain: the fusion of creativity, innovation, and responsibility will shape the next chapter of our technological journey.</p>
    `,
    heroImage: heroImage.id,
    meta: {
      description:
        'Dive into the marvels of modern innovation, where the only constant is change.',
      image: heroImage.id,
      title: 'Digital Horizons: Navigating the Future of Tech Innovation',
    },
    publishedAt: '2024-01-01T00:00:00.000Z',
    title: 'Digital Horizons: Navigating the Future of Tech Innovation',
  }
}
