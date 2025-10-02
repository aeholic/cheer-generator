## CHEER GENERATOR for KARINA
#### Generates cheer messages for Karina at the Milan Fashion Week SS26.


I created two versions, one with openAI and one with the Gemini API.
Since openAI is no longer free (as I found just out), the credits are 0 if I don't purchase to top up. So I added the Gemini method which provides a free tier for this testing purpose.

Gemini's free tier is somewhat limited, but it's more than enough for this purpose.

15 requests per minute (rate limit)
1,000 requests per day (daily quota)


If you want to fork it and switch the model (and maybe buy credits), you can edit the following line in the `page.tsx` file to change to **openAI**:

`import { generateCheers } from "./geminiAI";`
to
`import { generateCheers } from "./openAI";`

Don't forget to create the file `.env.local` and insert your own API key. 
Might as well edit the prompt as you like.
