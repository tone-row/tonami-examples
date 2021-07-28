import { styled } from "goober";
import {
  Prism as SyntaxHighlighter,
  SyntaxHighlighterProps,
} from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export const Columns = styled("div")`
  display: grid;
  gap: 20px;

  @media (min-width: 770px) {
    grid-template: auto / minmax(0, 1fr) minmax(0, 1fr);
  }
`;

export const BigButton = styled("button")`
  font-size: 1.5rem;
  padding: 20px;
`;

export const Highlight = (props: SyntaxHighlighterProps) => {
  return (
    <SyntaxHighlighter
      {...props}
      style={vscDarkPlus}
      customStyle={{
        borderRadius: "5px",
        fontFamily:
          'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
      }}
    />
  );
};

export const triggerSC = () => {
  const sc = document.querySelector("[data-styled-version]");
  if (sc) sc.setAttribute("z", Math.random().toString());
};

export const MobileHide = styled("div")`
  display: none;
  @media (min-width: 770px) {
    display: block;
  }
`;

export const MobileShow = styled("div")`
  display: block;
  @media (min-width: 770px) {
    display: none;
  }
`;

export const Fixed = styled(Columns)`
  padding: 20px;
  height: 400px;
  overflow: hidden;
  background: #fafafa;
  border: solid 1px #ddd;
  border-radius: 3px;
  @media (min-width: 770px) {
    position: sticky;
    bottom: 0;
    height: 250px;
  }

  @media (min-width: 1000px) and (max-height: 800px) {
    transition: all 0.22s ease;
    transform: translateY(50%);
    opacity: 0.95;
    &:hover {
      transition: all 0.33s ease;
      transform: translateY(0%);
      opacity: 1;
    }
  }
`;

export const Container = styled("div")`
  display: grid;
  gap: 10px;
  place-content: start normal;
  height: 100%;
  overflow: hidden;

  * {
    margin: 0;
  }

  .code {
    height: 100%;
    overflow: auto;
    border-radius: 10px;
  }
`;

export const Interactive = styled("div")`
  padding: 20px;
  border-radius: 3px;
  background-color: #d6fd91;
  font-family: Comic Sans MS;
  font-size: 20px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;
