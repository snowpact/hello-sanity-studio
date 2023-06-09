import { HelloSanityStudioClient } from '../src/client/sanityClient';

test('HelloSanityStudioClient', async () => {
  const sanityClient = new HelloSanityStudioClient({ dataset: 'staging', projectId: 'ny7rqq87' });

  const results = await sanityClient.fetchPageSettings();

  expect(results._id).toBeTruthy();
});
