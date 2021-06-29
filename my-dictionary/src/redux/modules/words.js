import { firestore } from "../../firebase";
// Cloud Firestore Collection
const words_db = firestore.collection("words");

// 단어 목록
const GET_WORDS = "words/GET_WORDS";
// 로딩 상태
const IS_LOADED = "words/IS_LOADED";
// 단어 추가
const ADD_WORD = "words/ADD_WORD";
// 단어 수정
const UPDATE_WORD = "words/UPDATE_WORD";
// 단어 삭제
const DELETE_WORD = "words/DELETE_WORD";

// state.words
const initialState = {
  words: [
    // {
    //   word: "허동우",
    //   desc: "웹 프론트엔드 개발자",
    //   example: "오늘의 집",
    // },
  ],
  is_loaded: false,
};

// Action Creators
export const getWords = (words) => {
  return { type: GET_WORDS, words };
};

export const isLoaded = (loaded) => {
  return { type: IS_LOADED, loaded };
};

export const addWord = (word) => {
  return { type: ADD_WORD, word };
};

export const updateWord = (word) => {
  return { type: UPDATE_WORD, word };
};

export const deleteWord = (word_id) => {
  return { type: DELETE_WORD, word_id };
};

export const getWordsFB = () => {
  return function (dispatch) {
    dispatch(isLoaded(false));

    words_db.get().then((docs) => {
      let words_data = [];

      docs.forEach((doc) => {
        // console.log(doc.id);
        // console.log(doc.data());
        words_data = [...words_data, { id: doc.id, ...doc.data() }];
      });
      // console.log(words_data);

      dispatch(getWords(words_data));
      dispatch(isLoaded(true));
    });
  };
};

export const addWordFB = (word_item) => {
  return function (dispatch) {
    // 데이터를 저장할 동안 스피너가 뜨도록
    dispatch(isLoaded(false));

    console.log("word_item", word_item);
    let word_data = {
      word: word_item.word,
      desc: word_item.desc,
      example: word_item.example,
    };
    words_db.add(word_data).then((doc) => {
      // console.log(doc.data());
      // console.log(doc.id);
      word_data = { ...word_data, id: doc.id };
      dispatch(addWord(word_data));
      dispatch(isLoaded(true));
    });
  };
};

export const updateWordFB = (word) => {
  return function (dispatch, getState) {
    const _word_data = getState().words.words[word.idx];

    if (!_word_data.id) {
      return;
    }

    // console.log("word_data", _word_data.id);
    const new_word = {
      word: word.word,
      desc: word.desc,
      example: word.example,
    };
    // console.log("new_word", new_word);
    words_db
      .doc(_word_data.id)
      .update(new_word)
      .then((res) => {
        dispatch(updateWord({ ...word, id: _word_data.id }));
      })
      .catch((err) => {
        console.error(err);
        console.log("firebase에서 업데이트 중 에러가 발생했습니다.");
      });
  };
};

export const deleteWordFB = (word_id) => {
  return function (dispatch, getState) {
    const _word_data = getState().words.words.find((v) => v.id === word_id);

    if (!_word_data.id) {
      return;
    }

    words_db
      .doc(_word_data.id)
      .delete()
      .then((res) => {
        dispatch(deleteWord(word_id));
      })
      .catch((err) => {
        // console.error(err);
        console.log("firebase에서 삭제 중 에러가 발생했습니다.");
      });
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_WORDS: {
      return { words: [...action.words] };
    }

    case IS_LOADED: {
      return { ...state, is_loaded: action.loaded };
    }

    case ADD_WORD: {
      return { words: [...state.words, action.word] };
    }

    case UPDATE_WORD: {
      const word_idx = action.word.idx;
      const words = { ...state }.words;
      // console.log(action.word);
      const new_word = {
        id: action.word.id,
        word: action.word.word,
        desc: action.word.desc,
        example: action.word.example,
      };
      console.log("word", new_word);
      words[word_idx] = new_word;

      // console.log("UPDATE_WORD", new_word);
      return { ...state, words };
    }

    case DELETE_WORD: {
      let words = { ...state }.words;
      words = words.filter((v) => v.id !== action.word_id);
      return { ...state, words };
    }

    default:
      return state;
  }
}
