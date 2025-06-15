"use client";

import { Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import messages from "@/messages.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function Home() {
  return (
    <div className="flex flex-col items-center space-y-8 py-12 px-4">
      {/* Hero */}
      <section className="text-center max-w-3xl mb-8">
        <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Anonymous Feedback Made Simple
        </h1>
        <p className="mt-2 text-gray-300 max-w-lg mx-auto">
          Share honest thoughts without revealing your identity.
        </p>
      </section>

      {/* Carousel Container */}
      <div className="w-full max-w-md overflow-hidden rounded-xl shadow-lg bg-white/10 backdrop-blur-sm p-4">
        <Carousel
          plugins={[Autoplay({ delay: 3000 })]}
          opts={{ loop: true }}
          className="relative"
        >
          <CarouselContent>
            {messages.map((message, idx) => (
              <CarouselItem key={idx} className="px-2">
                <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg transition hover:shadow-2xl rounded-lg mb-4">
                  <CardHeader>
                    <CardTitle className="text-white text-lg truncate">
                      {message.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-start space-x-3">
                    <Mail className="text-cyan-300 mt-1 shrink-0" />
                    <div>
                      <p className="text-gray-100">{message.content}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
