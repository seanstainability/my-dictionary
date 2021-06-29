import React from "react";
import { Card, Button, PageHeader } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { deleteWordFB } from "./redux/modules/words";
import Spinner from "./Spinner";

const WordList = (props) => {
  const dispatch = useDispatch();
  const { words, is_loaded } = useSelector((state) => state.words);

  console.log(words);
  // console.log(is_loaded);

  if (!is_loaded) {
    return <Spinner />;
  }

  const onClickBtn = () => {
    props.history.push("/add");
  };

  const onUpdate = (word_idx) => {
    props.history.push(`/update/${word_idx}`);
    // dispatch(updateWordFB(word));
  };

  const onDelete = (word_id) => {
    // console.log(word_id);
    dispatch(deleteWordFB(word_id));
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
                key={idx}
                style={{ width: "100%", margin: "4px 0px" }}
                cover={<ExampleText>{word.example}</ExampleText>}
                actions={[
                  <EditOutlined key="edit" onClick={() => onUpdate(idx)} />,
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
  padding-top: 24px;
  padding-left: 24px;
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
