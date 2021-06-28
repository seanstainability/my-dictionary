import React, { useEffect } from "react";
import { Card, Button, PageHeader } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { deleteWordFB, getWordsFB, updateWordFB } from "./redux/modules/words";
import Spinner from "./Spinner";

const WordList = (props) => {
  const dispatch = useDispatch();
  const { words } = useSelector((state) => state.words);
  const is_loaded = useSelector((state) => state.words.is_loaded);
  const word_list = React.useRef(null);
  console.log(words);

  useEffect(() => {
    dispatch(getWordsFB());
    if (!word_list.current) {
      return;
    }
    window.scrollTo({
      top: word_list.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  if (!is_loaded) {
    return <Spinner />;
  }

  const onClickBtn = () => {
    props.history.push("/add");
  };

  const onUpdate = (id) => {
    console.log(id);
    // dispatch(updateWordFB(id));
    props.history.push("/");
  };

  const onDelete = (id) => {
    console.log(id);
    // dispatch(deleteWordFB(id));
    props.history.push("/");
  };

  return (
    <WordListWrapper>
      <CardWrapper>
        <Header title="My Dictionary 📚" subTitle="단어 목록" />
        <ContentWrapper>
          <Button
            type="dashed"
            block
            style={{ margin: "4px 0px" }}
            onClick={onClickBtn}
          >
            +
          </Button>
          {words.map((word, idx) => {
            return (
              <Card
                ref={word_list}
                key={idx}
                style={{ width: "100%", margin: "4px 0px" }}
                cover={<ExampleText>{word.example}</ExampleText>}
                actions={[
                  <EditOutlined key="edit" onClick={() => onUpdate(word.id)} />,
                  <DeleteOutlined
                    key="delete"
                    onClick={() => onDelete(word.id)}
                  />,
                ]}
              >
                <Card.Meta title={word.word} description={word.desc} />
              </Card>
            );
          })}
        </ContentWrapper>
      </CardWrapper>
    </WordListWrapper>
  );
};

const ContentWrapper = styled.div`
  width: 100%;
  height: 76%;
  overflow-y: auto;
`;

const ExampleText = styled.p`
  color: blue;
`;

const CardWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid #eee;
  max-width: 400px;
  width: 100vw;
  height: 100vh;
  padding: 0vh 8px;
  box-sizing: border-box;
  margin: 0 auto;
`;

const Header = styled(PageHeader)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid rgb(235, 237, 240);
`;

const WordListWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
  padding: 16px;
  box-sizing: border-box;
`;

export default WordList;
