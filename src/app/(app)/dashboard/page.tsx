"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";

import { Loader2, RefreshCcw } from "lucide-react";
import { MessageCard } from "@/components/MessageCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { AcceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { Message } from "@/model/User";
import { ApiResponse } from "@/types/ApiResponse";
import { User } from "next-auth";

function UserDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isUpdatingSwitch, setIsUpdatingSwitch] = useState(false);

  const { toast } = useToast();
  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(AcceptMessageSchema),
    defaultValues: {
      acceptMessages: true,
    },
  });

  const { register, watch, setValue } = form;
  const acceptMessages = watch("acceptMessages");

  const fetchMessages = useCallback(
    async (refresh = false) => {
      setIsLoadingMessages(true);
      try {
        const response = await axios.get<ApiResponse>("/api/get-messages");
        setMessages(response.data.messages || []);
        if (refresh) {
          toast({
            title: "Refreshed",
            description: "Latest messages loaded.",
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast({
          title: "Error Fetching Messages",
          description:
            axiosError.response?.data.message ?? "Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingMessages(false);
      }
    },
    [toast]
  );

  const fetchAcceptStatus = useCallback(async () => {
    setIsUpdatingSwitch(true);
    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages");
      setValue("acceptMessages", response.data.isAcceptingMessages);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error Fetching Settings",
        description: axiosError.response?.data.message ?? "Try again later.",
        variant: "destructive",
      });
    } finally {
      setIsUpdatingSwitch(false);
    }
  }, [setValue, toast]);

  const handleToggleAcceptMessages = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });
      setValue("acceptMessages", !acceptMessages);
      toast({ title: response.data.message });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Update Failed",
        description:
          axiosError.response?.data.message ?? "Unable to update preference.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
  };

  useEffect(() => {
    if (!session?.user) return;
    fetchMessages();
    fetchAcceptStatus();
  }, [session, fetchMessages, fetchAcceptStatus]);

  if (!session?.user) return null;

  const { username } = session.user as User;
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(profileUrl);
    toast({
      title: "Copied!",
      description: "Profile URL copied to clipboard.",
    });
  };

  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 sm:p-8 bg-white/10 backdrop-blur-md rounded-xl shadow-lg w-full max-w-6xl text-white">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6">Dashboard</h1>

      {/* Share Link */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Your Anonymous Link</h2>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="w-full rounded-md px-3 py-2 bg-white/20 text-white border border-white/30 focus:outline-none focus:ring focus:ring-cyan-500"
          />
          <Button onClick={handleCopy} className="shrink-0">
            Copy
          </Button>
        </div>
      </div>

      {/* Toggle Switch */}
      <div className="flex items-center gap-3 mb-6">
        <Switch
          checked={acceptMessages}
          onCheckedChange={handleToggleAcceptMessages}
          disabled={isUpdatingSwitch}
        />
        <span className="text-sm text-gray-300">
          Accept Messages:{" "}
          <strong className="text-white">
            {acceptMessages ? "On" : "Off"}
          </strong>
        </span>
      </div>

      <Separator className="mb-6 border-white/20" />

      {/* Refresh */}
      <Button
        variant="outline"
        className="mb-6 flex items-center gap-2"
        onClick={() => fetchMessages(true)}
        disabled={isLoadingMessages}
      >
        {isLoadingMessages ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Refreshing...
          </>
        ) : (
          <>
            <RefreshCcw className="w-4 h-4" />
            Refresh Messages
          </>
        )}
      </Button>

      {/* Messages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.length > 0 ? (
          messages.map((message) => (
            <MessageCard
              key={message._id}
              message={message}
              onMessageDelete={handleDeleteMessage}
            />
          ))
        ) : (
          <p className="text-gray-300 col-span-full text-center">
            You haven’t received any messages yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
