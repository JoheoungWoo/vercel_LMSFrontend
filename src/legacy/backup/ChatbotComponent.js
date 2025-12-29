import React, { useState, useEffect, useRef } from "react";

const initialMessages = [
  {
    id: 1,
    sender: "bot",
    text: "안녕! 나는 Green Univ 전용 챗봇이야 🤖\n궁금한 걸 편하게 물어봐줘.",
  },
];

const quickQuestions = [
  "오늘 해야 할 공부 정리해줘",
  "풀스택 로드맵 간단히 알려줘",
  "React가 뭐야?",
  "나 지금 동기부여가 필요해…",
];

function makeBotReply(userText) {
  const lower = userText.toLowerCase();

  if (lower.includes("react")) {
    return "React는 컴포넌트 기반으로 UI를 만드는 라이브러리야. 재사용 가능한 UI 조각을 만들고, 상태(State)로 화면을 관리할 수 있어 😊";
  }

  if (lower.includes("공부") || lower.includes("study") || lower.includes("로드맵")) {
    return "오늘은 ➜ 1) 기존 코드 복습 2) JS 한 문제 풀기 3) 프로젝트 한 컴포넌트 리팩토링 👩‍💻\n딱 3개만 해도 충분히 잘한 거야!";
  }

  if (lower.includes("동기부여") || lower.includes("힘들") || lower.includes("피곤")) {
    return "지금까지 버틴 것만 해도 이미 잘하고 있어. 💙\n조금만 더 가볍게, '완벽' 말고 '진행'만 목표로 잡자!";
  }

  if (lower.includes("스프링") || lower.includes("spring")) {
    return "Spring Boot는 백엔드 애플리케이션을 빠르게 만들 수 있게 도와주는 프레임워크야. REST API 만들 때 특히 많이 써 👍";
  }

  return "음… 일단 내가 바로 답해본 내용이야!\n조금 더 구체적으로 말해주면, 더 디테일하게 같이 정리해볼게 ✨";
}

export default function ChatbotComponent() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [username, setUsername] = useState("Guest");
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isBotTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsBotTyping(true);

    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        sender: "bot",
        text: makeBotReply(trimmed),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsBotTyping(false);
    }, 600);
  };

  const handleQuickQuestion = (q) => {
    setInput(q);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-50 via-slate-50 to-emerald-50">
      {/* 전체 레이아웃 */}
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6 md:px-8 lg:px-10">
        {/* 상단 헤더/내브 영역 */}
        <header className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-500 text-xl">
              <span className="text-white">💬</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-900 md:text-2xl">
                Luna Chat · 챗봇 스튜디오
              </h1>
              <p className="text-xs text-slate-500 md:text-sm">
                공부, 프로젝트, 고민상담까지. 한 곳에서 챗봇이랑 대화하면서 정리해보자 ✨
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden flex-col text-right text-xs md:flex">
              <span className="text-slate-400">현재 사용자</span>
              <span className="font-semibold text-slate-700">{username}</span>
            </div>
            <button className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm hover:border-sky-300 hover:text-sky-700">
              로그인/프로필 (추후 연동)
            </button>
          </div>
        </header>

        {/* 콘텐츠 영역 */}
        <div className="grid flex-1 gap-6 pb-4 lg:grid-cols-[1.4fr,1fr]">
          {/* 좌측: 실제 챗봇 UI */}
          <section className="flex flex-col rounded-3xl border border-slate-100 bg-white/90 p-4 shadow-sm backdrop-blur-md md:p-5">
            {/* 채팅 헤더 */}
            <div className="mb-3 flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2.5">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                </span>
                <div className="flex flex-col text-xs">
                  <span className="font-semibold text-slate-800">
                    Luna · Study & Dev Bot
                  </span>
                  <span className="text-[11px] text-slate-400">
                    React + Spring 공부 메이트 모드
                  </span>
                </div>
              </div>
              <button className="rounded-full bg-sky-500 px-3 py-1 text-[11px] font-medium text-white shadow-sm hover:bg-sky-600">
                새로운 대화
              </button>
            </div>

            {/* 메시지 리스트 */}
            <div className="flex-1 overflow-y-auto rounded-2xl border border-slate-100 bg-slate-50/60 p-3 text-sm text-slate-800">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`mb-2 flex ${
                    m.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] whitespace-pre-line rounded-2xl px-3 py-2 text-xs md:text-sm ${
                      m.sender === "user"
                        ? "bg-sky-500 text-white rounded-br-sm shadow-sm"
                        : "bg-white text-slate-800 rounded-bl-sm border border-slate-100"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {isBotTyping && (
                <div className="mb-2 flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl border border-slate-100 bg-white px-3 py-2 text-xs text-slate-500">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-300" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-300 [animation-delay:0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-300 [animation-delay:0.3s]" />
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* 입력창 */}
            <form
              onSubmit={handleSend}
              className="mt-3 flex items-end gap-2 rounded-2xl bg-slate-50 px-3 py-2"
            >
              <textarea
                rows={1}
                className="max-h-28 flex-1 resize-none bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                placeholder="무엇이든 물어봐줘! (예: 오늘 공부 계획 세워줘)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-500 text-white shadow-sm transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-slate-300"
                disabled={!input.trim()}
              >
                ➤
              </button>
            </form>
          </section>

          {/* 우측: 설명/기능/퀵 버튼 */}
          <aside className="flex flex-col gap-4">
            {/* 소개 카드 */}
            <div className="rounded-3xl border border-sky-100 bg-sky-50/70 p-4 text-xs text-slate-800 shadow-sm">
              <h2 className="mb-1.5 text-sm font-semibold text-slate-900">
                🧠 이 챗봇은 뭐하는 애야?
              </h2>
              <ul className="space-y-1.5 leading-relaxed">
                <li>· 오늘 할 공부/할 일 목록을 같이 정리해줘요.</li>
                <li>· React / Spring / JS 개념을 말로 풀어서 설명해줘요.</li>
                <li>· “나 왜 이렇게 못하지..” 같은 멘붕 타이밍에 말상대도 해줘요.</li>
              </ul>
            </div>

            {/* 퀵 질문 카드 */}
            <div className="rounded-3xl border border-slate-100 bg-white/90 p-4 text-xs text-slate-800 shadow-sm">
              <h2 className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-900">
                <span>⚡️ 바로 써먹는 질문 예시</span>
                <span className="text-[11px] text-slate-400">
                  클릭하면 입력창에 들어가요
                </span>
              </h2>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => handleQuickQuestion(q)}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] text-slate-700 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-800"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* 모드/테마 카드 (placeholder) */}
            <div className="rounded-3xl border border-emerald-100 bg-emerald-50/80 p-4 text-xs text-slate-800 shadow-sm">
              <h2 className="mb-2 text-sm font-semibold text-slate-900">
                🎛 앞으로 추가할 기능 아이디어
              </h2>
              <ul className="space-y-1.5 leading-relaxed">
                <li>· <b>“스터디 모드”</b> – 타이머 + 할 일 리스트랑 연동</li>
                <li>· <b>“감정 모드”</b> – 감정일기 기반 챗봇 대화 (병원용 리포트 연동)</li>
                <li>· <b>“포트폴리오 모드”</b> – 오늘 한 작업 정리해주는 기능</li>
              </ul>
            </div>
          </aside>
        </div>

        {/* 푸터 */}
        <footer className="mt-4 border-t border-slate-100 pt-3 text-center text-[11px] text-slate-400">
          Luna Chat · made with React & Tailwind · ⚙ 프론트 전용 데모 (API 연동 전)
        </footer>
      </div>
    </div>
  );
}
