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

const repeatMode = ["ONE", "ALL", "SHUFFLE"];
const PLAY_MUSIC = "musicPlayer/PLAY_MUSIC";
const STOP_MUSIC = "musicPlayer/STOP_MUSIC";
const NEXT_MUSIC = "musicPlayer/NEXT_MUSIC";
const PREV_MUSIC = "musicPlayer/PREV_MUSIC";
const SET_REPEAT = "musicPlayer/SET_REPEAT";
const SET_CURRENT_INDEX = "musicPlayer/SET_CURRENT_INDEX ";

export const playMusic = () => ({ type: PLAY_MUSIC });
export const stopMusic = () => ({ type: STOP_MUSIC });
export const nextMusic = () => ({ type: NEXT_MUSIC });
export const prevMusic = () => ({ type: PREV_MUSIC });
export const setRepeat = () => ({ type: SET_REPEAT });
export const setCurrentIndex = (index) => ({ type: SET_CURRENT_INDEX, index });

// repeat mode 가 shuffle 인 경우 next, prev 가 1씩 증가,감소 하지 않고 random 하게 움직이도록 random한 수를 만드는 함수
const getRandomNumber = (arr, excludeNum) => {
  const randomNumber = Math.floor(Math.random() * arr.length);
  return arr[randomNumber] === excludeNum
    ? getRandomNumber(arr, excludeNum)
    : arr[randomNumber];
};

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
      const nextIndex =
        state.repeat === "SHUFFLE"
          ? getRandomNumber(
              Array.from(Array(state.playList.length).keys()),
              state.currentIndex
            )
          : (state.currentIndex + 1) % state.playList.length;
      return {
        ...state,
        currentIndex: nextIndex,
        CurrentMusicId: playList[nextIndex].id,
      };
    case PREV_MUSIC:
      const prevIndex =
        state.repeat === "SHUFFLE"
          ? getRandomNumber(
              Array.from(Array(state.playList.length).keys()),
              state.currentIndex
            )
          : (state.currentIndex - 1 + state.playList.length) %
            state.playList.length;
      return {
        ...state,
        currentIndex: prevIndex,
        CurrentMusicId: playList[prevIndex].id,
      };
    case SET_REPEAT:
      return {
        ...state,
        repeat:
          repeatMode[
            (repeatMode.indexOf(state.repeat) + 1) % repeatMode.length
          ],
      };
    case SET_CURRENT_INDEX:
      return {
        ...state,
        currentIndex: action.index,
        CurrentMusicId: state.playList[action.index].id,
      };
    default:
      return state;
  }
};
export default musicPlayerReducer;
