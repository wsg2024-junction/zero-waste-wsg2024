import React, {useContext} from 'react'
import ChatMessage, {ChatMessageProperties} from "@/components/chat/chat-message";
import {Label} from "@/components/ui/label";
import {H2, H3} from "@/components/ui/typography";

interface ChatProperties {

}

const mockUser = {
    userId: 1,
    username: "manager_cooking",
    firstname: "Max",
    lastname: "Mustermann",
}

const mockUser2 = {
    userId: 2,
    username: "manager_preproduction",
    firstname: "Joe",
    lastname: "Doe",
}

export default async function Chat() {
    // const cookieStore = await cookies(); // Get user from cookies
    const currentUser = mockUser;

    const chatMessages: ChatMessageProperties[] = [
        {
            sender: mockUser,
            receiver: mockUser2,
            message: "Hello Maria, I have a question regarding the new product launch.",
            timestamp: new Date(),
        },
        {
            sender: mockUser2,
            receiver: mockUser,
            message: "Hello Max, what is your question?",
            timestamp: new Date(),
        }
    ]


    return (
        <>
            <H3>Hello</H3>
            <div className={"space-y-2"}>
                {chatMessages.map((chatMessage, index) => (
                    <ChatMessage key={index} chatMessage={chatMessage}/>
                ))}
            </div>
        </>
    );
    
}