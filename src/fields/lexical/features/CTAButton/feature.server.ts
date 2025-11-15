import { CTAButtonNode } from './nodes/CTAButtonNode'

export const CTAButtonFeature = () => {
  return {
    feature: () => {
      return {
        nodes: [
          {
            node: CTAButtonNode,
            type: CTAButtonNode.getType(),
          },
        ],
        props: null,
      }
    },
    key: 'ctaButton',
    clientFeature: {
      __bundled: false,
      clientFeatureProps: null,
      modulePath: '@/fields/lexical/features/CTAButton/feature.client#CTAButtonFeatureClient',
    },
  }
}
