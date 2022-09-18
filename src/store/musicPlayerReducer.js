import img1 from "../images/music-1.jpg";
import img2 from "../images/music-2.jpg";
import img3 from "../images/music-3.jpg";
import img4 from "../images/music-4.jpg";
import img5 from "../images/music-5.jpg";
import music1 from "../music/music-1.mp3";
import music2 from "../music/music-2.mp3";
import music3 from "../music/music-3.mp3";
import music4 from "../music/music-4.mp3";
import music5 from "../music/music-5.mp3";

const playList = [
  {
    name: "Relax And Sleep",
    artist: "Anton Vlasov",
    img: img1,
    src: music1,
    id: 1,
  },
  {
    name: "Don't You Think Lose",
    artist: "Anton Vlasov",
    img: img2,
    src: music2,
    id: 2,
  },
  {
    name: "The Cradle of Your Soul",
    artist: "lemonmusicstudio",
    img: img3,
    src: music3,
    id: 3,
  },
  {
    name: "Spirit Blossom",
    artist: "RomanBelov",
    img: img4,
    src: music4,
    id: 4,
  },
  {
    name: "Everything Feels New",
    artist: "EvgenyBardyuzha",
    img: img5,
    src: music5,
    id: 5,
  },
];

const initialState = {
  playList,
  CurrentMusicId: playList[0].id,
  currentIndex: 0,
  playingState: false,
  repeat: "ALL",
};

const PLAY_MUSIC = "musicPlayer/PLAY_MUSIC";
const STOP_MUSIC = "musicPlayer/STOP_MUSIC";
const NEXT_MUSIC = "musicPlayer/NEXT_MUSIC";
const PREV_MUSIC = "musicPlayer/PREV_MUSIC";

export const playMusic = () => ({ type: PLAY_MUSIC });
export const stopMusic = () => ({ type: STOP_MUSIC });
export const nextMusic = () => ({ type: NEXT_MUSIC });
export const prevMusic = () => ({ type: PREV_MUSIC });

const musicPlayerReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLAY_MUSIC:
      return {
        ...state,
        playingState: true,
      };
    case STOP_MUSIC:
      return {
        ...state,
        playingState: false,
      };
    case NEXT_MUSIC:
      const nextIndex = (state.currentIndex + 1) % state.playList.length;
      return {
        ...state,
        currentIndex: nextIndex,
        CurrentMusicId: playList[nextIndex].id,
      };
    case PREV_MUSIC:
      const prevIndex =
        (state.currentIndex - 1 + state.playList.length) %
        state.playList.length;
      return {
        ...state,
        currentIndex: prevIndex,
        CurrentMusicId: playList[prevIndex].id,
      };
    default:
      return state;
  }
};
export default musicPlayerReducer;
