import {
  useReducer,
  lazy,
  Suspense,
  ReactNode,
  useState,
  createElement,
} from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import "@reach/tabs/styles.css";
import { setup } from "goober";
import {
  Highlight,
  triggerSC,
  MobileHide,
  MobileShow,
  Fixed,
  Container,
} from "./components/components";
import "./styles.css";
import { useStyleTagString } from "./components/useStyleTagString";
const RandomColor = lazy(() => import("./examples/RandomColor"));
const Typography = lazy(() => import("./examples/Typography"));

setup(createElement);

function Safe({ children }: { children: ReactNode }) {
  return <Suspense fallback={<>{"..."}</>}>{children}</Suspense>;
}

const scrollToBottom = (id: string) => {
  const code = document.getElementById(id) as HTMLElement;
  code.scrollTop = code.scrollHeight - code.clientHeight;
};

export default function App() {
  const [tabIndex, setTabIndex] = useState(0);
  const [enabled, enable] = useReducer(() => true, false);
  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  const sc = useStyleTagString(
    "[data-styled-version]",
    enabled,
    scrollToBottom.bind({}, "sc-code")
  );
  const tonami = useStyleTagString(
    "style#tonami",
    enabled,
    scrollToBottom.bind({}, "t-code")
  );

  return (
    <div className="App">
      <header className="grid">
        <img src="logo.svg" width={80} alt="tonami logo" />
        <h1>tonami examples</h1>
      </header>
      <Tabs index={tabIndex} onChange={handleTabsChange}>
        <MobileHide>
          <TabList>
            <Tab>Intro</Tab>
            <Tab>Typography Component</Tab>
            <Tab>Random Color Box</Tab>
          </TabList>
        </MobileHide>

        <TabPanels>
          <TabPanel>
            <div className="grid">
              <p>
                This app aims to show how tonami differs from other CSS-in-JS
                libraries by offering several interactive examples.
              </p>
              <p>
                As you navigate and interact with the examples you can see the
                contents of each library's style tag (which lives in the
                document's head) change in real-time.
              </p>
              <MobileHide>
                <p>
                  Click an Example Above To Get Started{" "}
                  <span role="img" aria-label="pointing up">
                    👆
                  </span>
                </p>
              </MobileHide>
            </div>
          </TabPanel>
          <TabPanel>
            {tabIndex === 1 && (
              <Safe>
                <Typography
                  cb={() => {
                    enable();
                    triggerSC();
                  }}
                />
              </Safe>
            )}
          </TabPanel>
          <TabPanel>
            {tabIndex === 2 && (
              <Safe>
                <RandomColor
                  cb={() => {
                    enable();
                    triggerSC();
                  }}
                />
              </Safe>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
      <MobileShow>
        <button onClick={() => setTabIndex((t) => (t - 1 + 3) % 3)}>
          Previous Example
        </button>
        <button onClick={() => setTabIndex((t) => (t + 1) % 3)}>
          Next Example
        </button>
      </MobileShow>
      {tabIndex !== 0 && (
        <Fixed>
          <Container>
            <strong>styled-components</strong>
            <small>Lines: {sc.split("\n").length}</small>
            <Highlight language="css" className="code" id="sc-code">
              {sc}
            </Highlight>
          </Container>
          <Container>
            <strong>tonami</strong>
            <small>Lines: {tonami.split("\n").length}</small>
            <Highlight language="css" className="code" id="t-code">
              {tonami}
            </Highlight>
          </Container>
        </Fixed>
      )}
    </div>
  );
}
