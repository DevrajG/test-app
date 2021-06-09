import React from 'react';

export function useScript(
  scriptUrl: string,
  scriptId: string,
  callback?: () => void,
) {
  React.useEffect(() => {
    const existingScript = document.getElementById(scriptId);

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.id = scriptId;
      document.body.appendChild(script);

      script.onload = () => {
        if (callback) {
          callback();
        }
      };
    }

    if (existingScript && callback) {
      callback();
    }

    return () => {
      if (existingScript && callback) {
        existingScript.remove();
      }
    };
  }, [scriptUrl, scriptId]);
}
