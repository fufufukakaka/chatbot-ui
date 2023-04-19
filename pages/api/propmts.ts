import { OpenAIModel, OpenAIModelID, OpenAIModels } from '@/types/openai';
import { OPENAI_API_HOST, LOCAL_API_HOST } from '@/utils/app/const';

export const config = {
  runtime: 'edge',
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const { user_id, prompt } = (await req.json()) as {
        user_id: BigInteger;
        prompt: string;
    };

    const response = await fetch(`${LOCAL_API_HOST}/v1/save_propmts`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        user_id: user_id,
        prompt: prompt,
      }),
    });

    if (response.status === 401) {
      return new Response(response.body, {
        status: 500,
        headers: response.headers,
      });
    } else if (response.status !== 200) {
      console.error(
        `Local API returned an error ${
          response.status
        }: ${await response.text()}`,
      );
      throw new Error('Local API returned an error');
    }

    return new Response(JSON.stringify({"message": "saved your prompt"}), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
};

export default handler;
