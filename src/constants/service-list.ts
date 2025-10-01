import Netflix from "@assets/logo/ott/netflix.svg";
import Disney from "@assets/logo/ott/disney.svg";
import YouthubPremium from "@assets/logo/ott/youthub-premium.svg";
import CoupangPlay from "@assets/logo/ott/coupang-play.svg";

import AppleMusic from "@assets/logo/music/apple-music.svg";
import Spotify from "@assets/logo/music/spotify.svg";
import Melon from "@assets/logo/music/melon.svg";
import VIBE from "@assets/logo/music/vibe.svg";
import Bugs from "@assets/logo/music/bugs.svg";

import ChatGpt from "@assets/logo/ai/chatgpt.svg";
import Gemini from "@assets/logo/ai/gemini.svg";
import Cursor from "@assets/logo/ai/cursor.svg";
import Claude from "@assets/logo/ai/claude.svg";
import Copilot from "@assets/logo/ai/copilot.svg";
import Perplexity from "@assets/logo/ai/perplexity.svg";

import Coupang from "@assets/logo/etc/coupang-wow.svg";

import type { ServiceCategory, ServiceItem } from "@models/service";

export const SERVICES_LIST: Record<ServiceCategory, ServiceItem[]> = {
  OTT: [
    { id: "netflix", name: "넷플릭스", image: Netflix },
    { id: "disney", name: "디즈니+", image: Disney },
    { id: "youthub_premium", name: "유튜브 프리미엄", image: YouthubPremium },
    { id: "coupang_play", name: "스포츠 패스", image: CoupangPlay },
  ],
  MUSIC: [
    { id: "apple_music", name: "애플 뮤직", image: AppleMusic },
    { id: "melon", name: "멜론", image: Melon },
    { id: "spotify", name: "스포티파이", image: Spotify },
    { id: "vibe", name: "바이브", image: VIBE },
    { id: "bugs", name: "벅스", image: Bugs },
  ],
  AI: [
    { id: "chatgpt", name: "ChatGPT", image: ChatGpt },
    { id: "claude", name: "Claude", image: Claude },
    { id: "gemini", name: "Gemini", image: Gemini },
    { id: "perplexity", name: "Perplexity", image: Perplexity },
    { id: "cursor", name: "Cursor", image: Cursor },
    { id: "copilot", name: "Copilot", image: Copilot },
  ],
  ETC: [
    { id: "coupang", name: "로켓와우", image: Coupang },
    { id: "custom", name: "직접입력", image: "" },
  ],
};
