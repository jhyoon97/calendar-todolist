/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import Modal from "react-modal";

type Props = {
  targetDate: string;
};

const TodoForm = ({ targetDate }: Props) => {
  return <Modal isOpen={!!targetDate}></Modal>;
};

export default TodoForm;
