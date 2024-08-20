"use client";

import * as z from "zod";

import axios from "axios";

import chatcompletion from "openai";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Heading } from "@/components/heading";

import { MessageSquare } from "lucide-react";
import { formSchema } from "./constants";

import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const ConversationPage = () => {
    const router = useRouter();
    const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "What is court?"
        }
    });

    // Checking loading status of the form
    const isLoading = form.formState.isSubmitting;

    // Function runs on submitting form
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: ChatCompletionMessageParam = {
                role: "user",
                content: values.prompt,
            }

            const newMessages = [...messages, userMessage];

            const response = await axios.post("api/conversation", {
                message: userMessage,
            });

            setMessages((current) => [...current, userMessage, response.data]);

            form.reset();
        } catch (error: any) {
            console.log(error);
        } finally {
            router.refresh();
        }
    }

    return (
        <div>
            {/* Heading component */}
            <Heading
                title="Conversation"
                description="Our most advanced model"
                icon={MessageSquare}
                iconColor="text-violet-500"
                bgColor="text-violet-500/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg p-4 border w-full px-3 mid:px-6 focus-within:shadow-sm gap-2 grid grid-cols-12"
                        >
                            {/* Form Field */}
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            {/* Input Field*/}
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="How to calculate area?"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                {/* Output Field */}
                <div className="space-y-4 mt-4">
                    <div className="flex flex-col-reverse gap-y-4">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConversationPage;