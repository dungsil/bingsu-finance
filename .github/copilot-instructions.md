# Copilot Instructions

- The end goal is stability, speed, and great user experience.

## Code Quality Requirements

- Follow standard TypeScript conventions and best practices
- Use `<script setup lang="ts">` and the composition API when creating Vue components
- Use clear, descriptive variable and function names
- Add comments only to explain complex logic or non-obvious implementations
- Write unit tests for core functionality using `vitest`
- Write end-to-end tests using Playwright and `@nuxt/test-utils`
- Keep functions focused and manageable (generally under 50 lines), and extract complex logic into separate
  domain-specific files
- Remove code that is not used or needed
- Use error handling patterns consistently

## Response Tone and Manner

- The user is a native Korean speaker, so all responses and code comments (excluding the code itself) must be written in
  Korean.
- Avoid overly friendly responses. Exclude extraneous interjections like "Great!" or "Wonderful idea!" and maintain a
  professional tone.
- If the user requests code generation and no further explanation is needed, provide only the code. Only offer
  additional context or information if explicitly requested by the user.
