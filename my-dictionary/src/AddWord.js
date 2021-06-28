import React from "react";
import { Form, Input, Button, PageHeader } from "antd";
import styled from "styled-components";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};

const AddWord = (props) => {
  const onFinish = () => {};
  return (
    <AddWordWrapper>
      <FormWrapper {...layout} onFinish={onFinish}>
        <Header
          title="My Dictionary 📚"
          subTitle="단어 등록"
          onBack={() => null}
        />
        <FormItem label="단어">
          <Input />
        </FormItem>
        <FormItem label="설명">
          <Input.TextArea />
        </FormItem>
        <FormItem label="예시">
          <Input.TextArea rows={5} />
        </FormItem>
        <FormItem wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
          <ButtonWrapper type="primary" htmlType="submit">
            등록하기
          </ButtonWrapper>
        </FormItem>
      </FormWrapper>
    </AddWordWrapper>
  );
};

const FormWrapper = styled(Form)`
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

const AddWordWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
  padding: 16px;
  box-sizing: border-box;
`;

const Header = styled(PageHeader)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid rgb(235, 237, 240);
`;

const FormItem = styled(Form.Item)`
  width: 100%;
`;

const ButtonWrapper = styled(Button)`
  width: 100%;
`;

export default AddWord;
