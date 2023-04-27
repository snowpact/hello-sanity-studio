# Sanity Plugin: Hello Sanity

This is a non-official [Sanity](https://www.sanity.io/) plugin that helps you quickly set up a default Sanity Studio desk with base features such as **blog, projects, SEO, and landing pages**. It's centered around the "expertise" notion, allowing you to showcase your skills in a structured and organized way.

## Installation

To install this plugin, first, you need to add it to your Sanity Studio's package.json file:


```css
yarn add hello-sanity-studio
npm install hello-sanity-studio
```

Then, add the plugin to your Sanity Studio's `sanity.json` file:

```json
{
  "plugins": [
    "hello-sanity-studio"
  ]
}
```

Make sure to also install the "@sanity/code-input" dependency for this plugin to work properly:

```css
yarn add @sanity/code-input
npm install @sanity/code-input // if you need `initCodeBlocks`
```

## Setup

On `sanity.config.ts` please setup up this module like that :

```js
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'

import {codeInput} from '@sanity/code-input'  // <- this is needed if you uses `initCodeBlocks`

import { HelloSanityStudio } from 'hello-sanity-studio'

const helloSanityStudio = new HelloSanityStudio({
  expertiseCategories,
  initCodeBlocks: false,
})

export default defineConfig({
  name: 'default',
  title: 'PROJECT_NAME',

  projectId: 'PROJECT_ID',
  dataset: 'PROJECT_DATASET',

  schema: {
    types: helloSanityStudio.getSchemaTypes(), // <- here
  },

  plugins: [
    codeInput(), // <- this is needed if you uses `initCodeBlocks`
    unsplashImageAsset(),
    deskTool({
      title: 'DESK_VIEW_TITLE',
       structure: (S, context) => {
        return S.list().title('Dashboard').items(helloSanityStudio.generateDesk(S, context))  // <- here
      },
    }),
    visionTool(),
  ],

  document: {
    actions: (input, context) => helloSanityStudio.filterOutSingletonActions(input, context), // <- here
  },
})
```

## Usage

Just run

```css
yarn dev
npm run dev
```

The Showcase Studio will help you create a structured and organized Sanity desk for showcasing your expertise. It includes the following features:

- Blog: A simple blog schema with fields for title, author, content, and publication date.
- Projects: A schema for showcasing your past projects with fields for title, description, technologies used, and an image.
- Landing Pages: Based on **expertise**, for creating landing pages with fields for title, content, image, and call-to-action button.

And you will have access to :
- SEO: A schema for defining meta tags, OG tags, and other SEO-related information for each page on your website.

## Contributing

If you find any bugs or issues with this plugin, please report them on the Github Issues page. Pull requests are also welcome!

## License

This plugin is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.