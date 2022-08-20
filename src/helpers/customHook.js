import { useEffect, useRef } from "react";

export const useScript = (url, onload) => {
  useEffect(() => {
    let script = document.createElement("script");
    script.src = url;
    script.onload = onload;
    document.head.appendChild(script);
    return () => document.head.removeChild(script);
  }, [url, onload]);
};

export const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value; //assign the value of ref to the argument
  }, [value]); //this code will run when the value of 'value' changes
  return ref.current; //in the end, return the current ref value.
};
