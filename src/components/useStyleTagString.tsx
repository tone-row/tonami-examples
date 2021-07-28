import { useReducer, useEffect } from "react";

export const getStyles = (selector: string) => {
  const tag = document.querySelector(selector) as HTMLStyleElement;
  if (tag?.sheet) {
    return Array.from(tag.sheet.rules)
      .map((rule) => rule.cssText)
      .join("\n");
  }
  return "";
};

export function useStyleTagString(
  querySelector: string,
  enabled: boolean,
  cb?: () => void
) {
  const [styles, updateStyles] = useReducer(
    getStyles.bind({}, querySelector),
    ""
  );
  useEffect(() => {
    if (enabled) {
      const targetNode = document.querySelector(querySelector);
      const config = {
        attributes: true,
        childList: true,
        subtree: true,
        attributesOldValue: true,
        characterData: true,
      };
      const observer = new MutationObserver(() => {
        updateStyles();
        if (cb) setTimeout(cb);
      });
      observer.observe(targetNode as HTMLStyleElement, config);
      updateStyles();
      return () => observer.disconnect();
    }
  }, [querySelector, enabled, cb]);
  return styles;
}
