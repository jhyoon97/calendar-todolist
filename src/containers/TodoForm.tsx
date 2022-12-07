/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import Modal from "react-modal";
import dayjs from "dayjs";
import { useRecoilState } from "recoil";
import { HiPlus } from "react-icons/hi";
import { MdDone } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { HiXMark } from "react-icons/hi2";
import { IoTrashOutline } from "react-icons/io5";
import { v1 as uuidv1 } from "uuid";

// utils
import convert from "utils/convert";
import { TodoItem, TodoList } from "utils/types";

// store
import { dataAtom } from "store/data/atom";

interface Props {
  onClose: Function;
  targetDate: string | null;
}

const style = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  content: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
    width: "100%",
    maxWidth: 400,
    height: "100%",
    maxHeight: 600,
    borderRadius: 0,
    border: "none",
  },
};

const root = css`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const headerBox = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px;
  border-bottom: 1px solid #eaeaea;
`;

const dateText = css`
  margin-bottom: 10px;
  font-size: 30px;
  font-weight: bold;
  color: #333;
  line-height: 1;
`;

const weekdayText = css`
  margin-bottom: 20px;
  color: #999;
  line-height: 1;
`;

const countText = css`
  margin-bottom: 5px;
  font-size: 16px;
  color: #36c898;
  line-height: 1;
  font-weight: bold;
`;

const listBox = css`
  flex: 1;
  padding: 10px 20px;
  overflow-y: auto;
`;

const itemBox = css`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
  width: 100%;
`;

const getTodoItemStyle = (done: boolean) => {
  return css`
    cursor: pointer;

    .done {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 1px solid ${done ? "#36c898" : "#999"};

      svg {
        opacity: ${done ? 1 : 0};
      }
    }

    .description {
      flex: 1;
      color: ${done ? "#999" : "#333"};
    }

    .button {
      margin-left: 5px;
    }
  `;
};

const editItemStyle = css`
  input {
    flex: 1;
    border-bottom: 1px solid #eaeaea;
  }

  .button {
    margin-left: 5px;
  }
`;

const inputBox = css`
  display: flex;
  flex-direction: row;
  border-top: 1px solid #eaeaea;
`;

const input = css`
  padding: 10px 20px;
  flex: 1;
`;

const submitButton = css`
  padding: 5px 0;
  width: 70px;
  background: #36c898;

  svg {
    vertical-align: middle;
  }
`;

const TodoForm = ({ onClose, targetDate }: Props) => {
  const [data, setData] = useRecoilState<TodoList>(dataAtom);
  const [inputValue, setInputValue] = useState<string>("");
  const [editTargetId, setEditTargetId] = useState<string>("");
  const [editValue, setEditValue] = useState<string>("");
  const targetList: TodoItem[] = targetDate ? data[targetDate] || [] : [];
  const totalCount: number = targetList.length;
  const doneCount: number = targetList.filter((item) => item.done).length;

  if (!targetDate) {
    return null;
  }
  return (
    <Modal
      ariaHideApp={false}
      style={style}
      onRequestClose={() => {
        setEditTargetId("");
        setInputValue("");
        onClose();
      }}
      isOpen
    >
      <div css={root}>
        <div css={headerBox}>
          <p css={dateText}>{dayjs(targetDate).format("YYYY월 MM월 DD일")}</p>
          <p css={weekdayText}>
            {convert.weekday(dayjs(targetDate).get("day"))}요일
          </p>
          <p css={countText}>
            할일 {totalCount - doneCount}
            개남음
          </p>
        </div>
        <div css={listBox}>
          {targetList.map((item, index) => {
            if (item.id === editTargetId) {
              return (
                <form
                  key={item.id}
                  css={[itemBox, editItemStyle]}
                  onSubmit={(e) => {
                    e.preventDefault();

                    const newTargetList: TodoItem[] = [];

                    targetList.forEach((todo) => {
                      newTargetList.push({
                        ...todo,
                        description:
                          todo.id === editTargetId
                            ? editValue
                            : todo.description,
                      });
                    });

                    setData({
                      ...data,
                      [targetDate]: newTargetList,
                    });
                    setEditValue("");
                    setEditTargetId("");
                  }}
                >
                  <input
                    onChange={(e) => setEditValue(e.target.value)}
                    value={editValue}
                  />

                  <button type="submit">
                    <MdDone color="#36c898" size="25" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();

                      setEditTargetId("");
                      setEditValue("");
                    }}
                  >
                    <HiXMark color="#f04f4f" size="25" />
                  </button>
                </form>
              );
            } else {
              return (
                <div
                  key={item.id}
                  css={[itemBox, getTodoItemStyle(item.done)]}
                  onClick={() => {
                    const newTargetList: TodoItem[] = [];

                    targetList.forEach((todo) => {
                      newTargetList.push({ ...todo });
                    });

                    const targetIndex = newTargetList.findIndex(
                      (todo) => todo.id === item.id
                    );

                    newTargetList[targetIndex].done =
                      !newTargetList[targetIndex].done;

                    setData({
                      ...data,
                      [targetDate]: newTargetList,
                    });
                  }}
                >
                  <div className="done">
                    <MdDone color="#36c898" size="25" />
                  </div>
                  <p className="description">{item.description}</p>
                  <button
                    className="button"
                    onClick={() => {
                      setEditTargetId(item.id);
                      setEditValue(item.description);
                    }}
                  >
                    <CiEdit color="#4f5af0" size="25" />
                  </button>
                  <button
                    className="button"
                    onClick={(e) => {
                      e.stopPropagation();

                      const newData: TodoList = { ...data };
                      const newTargetList: TodoItem[] = newData[
                        targetDate
                      ].filter((todo) => todo.id !== item.id);

                      if (newTargetList.length > 0) {
                        newData[targetDate] = newTargetList;
                      } else {
                        delete newData[targetDate];
                      }

                      setData(newData);
                    }}
                  >
                    <IoTrashOutline color="#f04f4f" size="25" />
                  </button>
                </div>
              );
            }
          })}
        </div>
        <form
          css={inputBox}
          onSubmit={(e) => {
            e.preventDefault();

            const newData: TodoList = { ...data };

            if (inputValue) {
              if (Array.isArray(newData[targetDate])) {
                newData[targetDate] = newData[targetDate].concat({
                  id: uuidv1(),
                  description: inputValue,
                  done: false,
                });
              } else {
                newData[targetDate] = [
                  {
                    id: uuidv1(),
                    description: inputValue,
                    done: false,
                  },
                ];
              }

              setData(newData);
              setInputValue("");
            }
          }}
        >
          <input
            css={input}
            placeholder="할 일을 입력해주세요."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button css={submitButton}>
            <HiPlus color="white" size="25" />
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default TodoForm;
