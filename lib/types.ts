export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  thumbnail: string;
}

export interface TikTokVideoResult {
  status: "success";
  type: "video";
  title: string;
  author: {
    username: string;
    nickname: string;
    avatar: string;
  };
  statistics: {
    playCount: number;
    downloadCount: number;
    shareCount: number;
    commentCount: number;
    likeCount: number;
  };
  video: {
    noWatermark: string[];
    watermark: string[];
    cover: string;
    dynamicCover: string;
    duration: number;
  };
}

export interface TikTokMusicResult {
  status: "success";
  type: "music";
  title: string;
  author: string;
  audio: string;
  cover: string;
  duration: number;
}
