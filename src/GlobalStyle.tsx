/** @jsxImportSource @emotion/react */
import React from "react";
import { Global, css } from "@emotion/react";

const GlobalStyle = () => {
  return (
    <Global
      styles={[
        css`
          * {
            margin: 0;
            padding: 0;
            border: 0;
            vertical-align: baseline;
            font-family: "Pretendard";
            font-weight: 500;
            line-height: 1.5;
            text-decoration: none;
            box-sizing: border-box;
          }
          /* HTML5 display-role reset for older browsers */
          article,
          aside,
          details,
          figcaption,
          figure,
          footer,
          header,
          hgroup,
          menu,
          nav,
          section {
            display: block;
          }
          ol,
          ul {
            list-style: none;
          }
          blockquote,
          q {
            quotes: none;
          }
          blockquote:before,
          blockquote:after,
          q:before,
          q:after {
            content: "";
            content: none;
          }
          table {
            border-collapse: collapse;
            border-spacing: 0;
          }
          input {
            border: none;
            outline: none;
          }
          button {
            border: none;
            cursor: pointer;
            background: none;
          }
          /* -- reset */

          html,
          #root {
            overflow-x: hidden;
          }
        `,
      ]}
    />
  );
};

export default GlobalStyle;
