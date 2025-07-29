import Netflix from "@/assets/logo/ott/Netflix.png";
import Disney from "@/assets/logo/ott/Disney.png";
import Tving from "@/assets/logo/ott/Tving.png";
import Watcha from "@/assets/logo/ott/Watcha.png";
import Laftel from "@/assets/logo/ott/Laftel.png";
import Wavve from "@/assets/logo/ott/Wavve.png";

import YouTubeMusic from "@/assets/logo/music/YoutubeMusic.png";
import AppleMusic from "@/assets/logo/music/AppleMusic.jpeg";
import Melon from "@/assets/logo/music/Melon.png";
import Spotify from "@/assets/logo/music/Spotify.png";
import Genie from "@/assets/logo/music/Genie.png";
import VIBE from "@/assets/logo/music/Vibe.jpeg";

import ChatGPT from "@/assets/logo/ai/ChatGPT.png";
import Gemini from "@/assets/logo/ai/Gemini.png";
import Cursor from "@/assets/logo/ai/Cursor.jpeg";
import Claude from "@/assets/logo/ai/Claude.png";
import Copilot from "@/assets/logo/ai/Copilot.jpeg";
import Perplexity from "@/assets/logo/ai/Perplexity.jpeg";

import BaeminClub from "@/assets/logo/etc/BaeminClub.png";
import RocketWow from "@/assets/logo/etc/RocketWow.png";

export type ServiceCategory = "OTT" | "MUSIC" | "AI" | "ETC";

export interface ServiceItem {
  id: string; // 고유 ID - DB 저장용
  name: string; // 사용자에게 보여줄 이름
  image: string;
}

export const SERVICES_LIST: Record<ServiceCategory, ServiceItem[]> = {
  OTT: [
    { id: "netflix", name: "넷플릭스", image: Netflix },
    { id: "tving", name: "티빙", image: Tving },
    { id: "disney", name: "디즈니+", image: Disney },
    { id: "laftel", name: "라프텔", image: Laftel },
    { id: "watcha", name: "왓챠", image: Watcha },
    { id: "wavve", name: "웨이브", image: Wavve },
  ],
  MUSIC: [
    { id: "youtube_music", name: "유튜브 뮤직", image: YouTubeMusic },
    { id: "apple_music", name: "애플 뮤직", image: AppleMusic },
    { id: "melon", name: "멜론", image: Melon },
    { id: "spotify", name: "스포티파이", image: Spotify },
    { id: "genie", name: "지니 뮤직", image: Genie },
    { id: "vibe", name: "바이브", image: VIBE },
  ],
  AI: [
    { id: "chatgpt", name: "ChatGPT", image: ChatGPT },
    { id: "claude", name: "Claude", image: Claude },
    { id: "gemini", name: "Gemini", image: Gemini },
    { id: "perplexity", name: "Perplexity", image: Perplexity },
    { id: "cursor", name: "Cursor", image: Cursor },
    { id: "copilot", name: "Copilot", image: Copilot },
  ],
  ETC: [
    { id: "baemin_club", name: "배민클럽", image: BaeminClub },
    { id: "rocket_wow", name: "로켓와우", image: RocketWow },
    { id: "custom", name: "직접입력", image: "" },
  ],
};
