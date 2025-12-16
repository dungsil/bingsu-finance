// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
  },
  [
    {
      rules: {
        'test/prefer-lowercase-title': 'off',
      },
    },
  ],
)
