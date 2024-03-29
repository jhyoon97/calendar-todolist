/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRecoilValue } from "recoil";

// utils
import { TodoItem, TodoList } from "utils/types";

// store
import { dataAtom } from "store/data/atom";

import TodoForm from "./TodoForm";

const root = css`
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(
    90deg,
    rgb(228, 132, 197) 0%,
    rgb(189, 154, 205),
    rgb(154, 175, 213)
  );

  .react-calendar {
    flex: 1;
    margin: 0 auto;
    max-width: 1080px;

    &__month-view {
      &__weekdays {
        &__weekday {
          text-align: center;
          font-weight: bold;
          font-size: 16px;
          color: #fff;
        }
      }

      &__days {
        &__day {
          flex: 0 0 calc(14.2857% - 10px) !important;
          display: flex;
          aspect-ratio: 1;
          background: #fff;
          margin: 5px;

          abbr {
            align-self: flex-start;
            color: #444;
            font-size: 16px;
            line-height: 1;
            letter-spacing: -0.32px;
            margin: 5px;
          }

          &.sunday {
            abbr {
              color: #f04f4f;
            }
          }

          &.saturday {
            abbr {
              color: #4f5af0;
            }
          }

          &--neighboringMonth {
            cursor: default;

            abbr {
              color: rgba(68, 68, 68, 0.3) !important;
            }
          }
        }
      }
    }

    &__tile {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
  }
`;

const title = css`
  margin-bottom: 25px;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  color: #fff;
`;

const calendarNavigationBox = css`
  margin-bottom: 25px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  button {
    svg {
      vertical-align: top;
    }
  }

  p {
    margin: 0 30px;
    color: #fff;
    line-height: 1;
  }
`;

const tileContentBox = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const CalendarComponent = () => {
  const [focusedDate, setFocusedDate] = useState<string>(
    dayjs().format("YYYY-MM-01")
  );
  const [targetDate, setTargetDate] = useState<string | null>(null);
  const data: TodoList = useRecoilValue(dataAtom);

  return (
    <div css={root}>
      <TodoForm onClose={() => setTargetDate(null)} targetDate={targetDate} />

      <p css={title}>Calendar And TodoList</p>

      <div css={calendarNavigationBox}>
        <button
          onClick={() =>
            setFocusedDate(
              dayjs(focusedDate).add(-1, "month").format("YYYY-MM-DD")
            )
          }
        >
          <IoIosArrowBack color="white" size="30px" />
        </button>
        <p>{dayjs(focusedDate).format("YYYY년 MM월")}</p>
        <button
          onClick={() =>
            setFocusedDate(
              dayjs(focusedDate).add(1, "month").format("YYYY-MM-DD")
            )
          }
        >
          <IoIosArrowForward color="white" size="30px" />
        </button>
      </div>

      <Calendar
        showNavigation={false}
        value={new Date(focusedDate)}
        activeStartDate={new Date(focusedDate)}
        onChange={(date: any) =>
          setFocusedDate(dayjs(date).format("YYYY-MM-01"))
        }
        calendarType="US"
        onClickDay={(date, e) => {
          setTargetDate(dayjs(date).format("YYYY-MM-DD"));
        }}
        tileDisabled={({ date }) => {
          const isCurrentMonth =
            dayjs(date).format("YYYY-MM") ===
            dayjs(focusedDate).format("YYYY-MM");

          return !isCurrentMonth;
        }}
        tileClassName={({ date }) => {
          // 요일 표시
          const weekday = dayjs(date).get("day");

          const classNames = [];

          switch (weekday) {
            case 0:
              classNames.push("sunday");
              break;
            case 6:
              classNames.push("saturday");
              break;
            default:
              break;
          }

          return classNames;
        }}
        tileContent={({ date, view }) => {
          const dateString: string = dayjs(date).format("YYYY-MM-DD");

          if (data[dateString] !== undefined || data[dateString]?.length > 0) {
            const todoList: TodoItem[] = data[dateString];
            const totalCount: number = todoList.length;
            const doneCount: number = todoList.filter(
              (item) => item.done
            ).length;

            return (
              <div css={tileContentBox}>
                <p>
                  할일: {doneCount} / {totalCount}
                  <br />
                  달성률: {((doneCount / totalCount) * 100).toFixed(2)}%
                </p>
              </div>
            );
          }
          return null;
        }}
      />
    </div>
  );
};

export default CalendarComponent;
