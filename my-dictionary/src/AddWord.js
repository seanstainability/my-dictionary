import React from "react";
import { Form, Input, Button, PageHeader } from "antd";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addWord } from "./redux/modules/words";
import { addWordFB } from "./redux/modules/words";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};

const AddWord = (props) => {
  const dispatch = useDispatch();
  const input_word_el = React.useRef(null);
  const input_desc_el = React.useRef(null);
  const input_example_el = React.useRef(null);

  const onFinish = () => {
    const new_word = {
      word: input_word_el.current.state.value,
      desc: input_desc_el.current.resizableTextArea.props.value,
      example: input_example_el.current.resizableTextArea.props.value,
    };
    // console.log(new_word);
    dispatch(addWordFB(new_word));
    props.history.push("/");
  };

  return (
    <AddWordWrapper>
      <FormWrapper {...layout} onFinish={onFinish}>
        <Header
          title="My Dictionary 📚"
          subTitle="단어 등록"
          onBack={() => {
            props.history.push("/");
          }}
        />
        <FormItem label="단어">
          <Input ref={input_word_el} />
        </FormItem>
        <FormItem label="설명">
          <Input.TextArea ref={input_desc_el} />
        </FormItem>
        <FormItem label="예시">
          <Input.TextArea rows={5} ref={input_example_el} />
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
