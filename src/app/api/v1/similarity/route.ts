import { z } from "zod";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { openai } from "@/lib/openai";
import { cosineSimilarity } from "@/helpers/cosine-similarity";

const reqSchema = z.object({
  text1: z.string().max(1000),
  text2: z.string().max(1000),
});

export async function POST(req: Request) {
  const body = await req.json();

  const apiKey = headers().get("Authorization");
  if (!apiKey) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      { status: 401 }
    );
  }
  //   const parsed = reqSchema.safeParse(body);

  //   if (!parsed.success) {
  //     return NextResponse.json({ error: "Bad request" }, { status: 400 });
  //   }

  try {
    // const { data } = parsed;
    // const { text1, text2 } = data;

    const { text1, text2 } = reqSchema.parse(body);

    const validApiKey = await db.apiKey.findFirst({
      where: {
        key: apiKey,
        enabled: true,
      },
    });

    if (!validApiKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const start = new Date();

    const texts = [text1, text2];

    const embeddings = await Promise.all(
      texts.map(async (text) => {
        const res = await openai.createEmbedding({
          model: "text-embedding-ada-002",
          input: text,
        });

        return res.data.data[0].embedding;
      })
    );

    const similarity = cosineSimilarity(embeddings[0], embeddings[1]);

    const duration = new Date().getTime() - start.getTime();

    //persist request
    await db.apiRequest.create({
      data: {
        duration,
        method: req.method as string,
        path: req.url as string,
        status: 200,
        apiKeyId: validApiKey.id,
        usedApiKey: validApiKey.key,
      },
    });

    return NextResponse.json(
      {
        success: true,
        text1,
        text2,
        similarity,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);

    if (err instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: err.issues,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
