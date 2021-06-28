import { firestore } from "../../firebase";

const words_db = firestore.collection("words");

// 단어 데이터 가져온다
const GET_WORDS = "words/GET_WORDS";
// 단어 추가
const ADD_WORD = "words/ADD_WORD";
// 단어 수정
const UPDATE_WORD = "words/UPDATE_WORD";
// 단어 삭제
const DELETE_WORD = "words/DELETE_WORD";

const IS_LOADED = "rank/IS_LOADED";

const initialState = {
  words: [
    {
      word: "허동우",
      desc: "웹 프론트엔드 개발자",
      example: "오늘의 집",
    },
  ],
  is_loaded: false,
};

// Action Creators
export const getWords = (words) => {
  return { type: GET_WORDS, words };
};

export const addWord = (word) => {
  return { type: ADD_WORD, word };
};

export const updateWord = (word) => {
  return { type: UPDATE_WORD, word };
};

export const deleteWord = (word) => {
  return { type: DELETE_WORD, word };
};

export const isLoaded = (loaded) => {
  return { type: IS_LOADED, loaded };
};

export const addWordFB = (word_item) => {
  return function (dispatch) {
    // 데이터를 저장할 동안 스피너가 뜨도록 해줍시다.
    dispatch(isLoaded(false));

    let word_data = {
      word: word_item.word,
      desc: word_item.desc,
      example: word_item.example,
    };
    words_db.add(word_data).then((doc) => {
      // id를 콘솔로 확인해볼까요?
      console.log(doc.id);
      // id를 추가해요!
      word_data = { ...word_data, id: doc.id };
      // 데이터를 추가해줘요!
      // dispatch(addWord(word_data));
    });
  };
};

export const updateWordFB = (word) => {
  return function (dispatch, getState) {
    const _word_data = getState().words.words[word];

    if (!_word_data.id) {
      return;
    }

    let word_data = { ..._word_data, completed: true };

    words_db
      .doc(word_data.id)
      .update(word_data)
      .then((res) => {
        dispatch(updateWord(word));
      })
      .catch((err) => {
        console.log("err");
      });
  };
};

export const deleteWordFB = (word) => {
  return function (dispatch, getState) {
    const _word_data = getState().words.words[word];
    // id가 없으면? 바로 끝내버립시다.
    if (!_word_data.id) {
      return;
    }
    // 삭제하기
    words_db
      .doc(_word_data.id)
      .delete()
      .then((res) => {
        dispatch(deleteWord(word));
      })
      .catch((err) => {
        console.log("err");
      });
  };
};

export const getWordsFB = () => {
  return function (dispatch) {
    dispatch(isLoaded(false));

    words_db.get().then((docs) => {
      let words_data = [];

      docs.forEach((doc) => {
        // console.log(doc.data());
        words_data = [...words_data, { id: doc.id, ...doc.data() }];
      });

      dispatch(getWords(words_data));
      dispatch(isLoaded(true));
    });
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // do reducer stuff
    case "words/GET_WORDS": {
      return { ...state, words: action.words };
    }

    case "words/ADD_WORD": {
      return { ...state, words: [...state.words, action.word] };
    }

    case "words/UPDATE_WORD": {
      return { ...state };
    }

    case "words/DELETE_WORD": {
      return { ...state };
    }

    case "rank/IS_LOADED": {
      return { ...state, is_loaded: action.loaded };
    }

    default:
      return state;
  }
}
