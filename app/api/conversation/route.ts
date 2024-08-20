import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";

// Fetching OPeN_API from .env 
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// API POST Body
export async function POST(req: Request) {
    try {
        const { userId } : { userId: string | null } = auth();
        const body = await req.json();
        const { messages } = body;


        // Generating possible errors
        if(!userId){
            return new NextResponse("Unauthorized", {status:401});
        }

        if(!openai.apiKey){
            return new NextResponse("API not found", {status:500});
        }

        if(!messages){
            return new NextResponse("Message is required", {status:400});
        }

        const response = await openai.chat.completions.create({
            model:"gpt-3.5-turbo",
            messages
        });

        return NextResponse.json(response.choices[0].message);

    } catch (error) {
        console.log("[Conversation error", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}