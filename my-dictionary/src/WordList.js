import React from "react";
import { Card, Button, PageHeader } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";

const WordList = (props) => {
  return (
    <WordListWrapper>
      <CardWrapper>
        <Header title="My Dictionary 📚" subTitle="딘어 목록" />
        <Card
          style={{ width: "100%" }}
          cover={<ExampleText>단어 예문입니다.</ExampleText>}
          actions={[
            <EditOutlined key="edit" />,
            <DeleteOutlined key="delete" />,
          ]}
        >
          <Card.Meta title="단어명" description="단어 설명입니다." />
        </Card>
        <Button type="dashed" block style={{ margin: "4px 0px" }}>
          +
        </Button>
      </CardWrapper>
    </WordListWrapper>
  );
};

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
  padding: 0vh 16px;
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
