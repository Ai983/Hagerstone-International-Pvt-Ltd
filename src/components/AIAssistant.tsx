// components/AIAssistant.tsx
import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

type ChatMessage = { role: "user" | "assistant"; content: string };

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

type Lead = {
  name?: string;
  email?: string;
  phone?: string;
  source?: string;
  page_url?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  message?: string;
};

const emailOK = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
const phoneOK = (s: string) => /[0-9]{7,}/.test(String(s || "").replace(/\D/g, ""));

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm StoneSense AI, your interior design assistant. Tell me your space, dimensions, style, budget, and timeline - I'll suggest a plan and next steps.",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ---- Lead capture state ----
  const [lead, setLead] = useState<Lead>(() => {
    if (typeof window === "undefined") return {};
    try {
      const raw = localStorage.getItem("hg_lead");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });
  const [consent, setConsent] = useState(true);
  const [leadError, setLeadError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const API_URL =
    (process as any).env?.NEXT_PUBLIC_CHAT_API_URL ||
    "https://chat-bot-api-pi.vercel.app/api/chat";

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => { scrollToBottom(); }, [messages]);

  // Persist lead in localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("hg_lead", JSON.stringify(lead || {}));
    }
  }, [lead]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    // Validate lead (only when user filled something)
    if ((lead.email && !emailOK(lead.email)) || (lead.phone && !phoneOK(lead.phone || ""))) {
      setLeadError("Please enter a valid email or phone.");
      return;
    }
    setLeadError(null);

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Last few turns for context
      const history: ChatMessage[] = messages.slice(-5).map((m) => ({
        role: m.isUser ? "user" : "assistant",
        content: m.content,
      }));

      // Attach UTM + page URL + lead info
      const url = typeof window !== "undefined" ? new URL(window.location.href) : null;
      const payload = {
        messages: [
          ...history,
          { role: "user", content: userMessage.content },
        ],
        lead: (lead.email || lead.phone) ? {
          name: lead.name || "",
          email: lead.email || "",
          phone: lead.phone || "",
          source: "chat-widget",
          page_url: url?.href || "",
          utm_source: url?.searchParams.get("utm_source") || "",
          utm_medium: url?.searchParams.get("utm_medium") || "",
          utm_campaign: url?.searchParams.get("utm_campaign") || "",
          message: userMessage.content,
        } as Lead : undefined,
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      const text = (data?.reply as string) || "Sorry, I couldn't generate a response.";

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: text,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        content: "I’m having trouble reaching the assistant right now. Please try again in a moment.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-hero shadow-luxury hover:shadow-hover hover:scale-110 transition-all duration-300 animate-float z-40"
        size="lg"
      >
        <MessageCircle className="h-6 w-6 text-primary-foreground" />
      </Button>
    );
  }

  return (
    <Card
      className={`fixed bottom-8 right-8 w-96 bg-background shadow-luxury border-2 border-primary/20 z-40 animate-scale-in ${
        isMinimized ? "h-16" : "h-[560px]"
      } transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-hero rounded-t-lg">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary-foreground rounded-full flex items-center justify-center">
            <span className="text-primary font-bold text-sm">S</span>
          </div>
          <div>
            <h3 className="font-semibold text-primary-foreground">StoneSense AI</h3>
            <p className="text-xs text-primary-foreground/80">Your Design Assistant</p>
          </div>
        </div>
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-foreground/20"
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-foreground/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Lead capture (shown until we have an email or phone) */}
          {!lead.email && !lead.phone && (
            <div className="p-3 border-b text-xs space-y-2 bg-muted/30">
              <div className="flex gap-2">
                <Input placeholder="Name" value={lead.name || ""} onChange={e => setLead(v => ({...v, name: e.target.value}))}/>
                <Input placeholder="Email" value={lead.email || ""} onChange={e => setLead(v => ({...v, email: e.target.value}))}/>
              </div>
              <div className="flex gap-2 mt-2 items-center">
                <Input placeholder="Phone" value={lead.phone || ""} onChange={e => setLead(v => ({...v, phone: e.target.value}))}/>
                <label className="flex items-center gap-2 text-muted-foreground">
                  <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} />
                  I agree to be contacted.
                </label>
              </div>
              {leadError && <p className="text-destructive mt-1">{leadError}</p>}
            </div>
          )}

          {/* Messages */}
          <ScrollArea className="flex-1 p-4 h-[380px]">
            <div className="space-y-4">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      m.isUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{m.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {m.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about interior design, space planning..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isLoading || (!consent && (!lead.email && !lead.phone))}
                size="sm"
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};

export default AIAssistant;
