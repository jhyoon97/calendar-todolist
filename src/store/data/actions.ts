import { useEffect } from "react";
import { useRecoilState } from "recoil";

// store
import { dataAtom } from "store/data/atom";

const useDataActions = () => {
  const [data, setData] = useRecoilState(dataAtom);

  useEffect(() => {
    const loadedData = localStorage.getItem("data");

    if (loadedData) {
      setData(JSON.parse(loadedData));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      localStorage.setItem("data", JSON.stringify(data));
    }
  }, [data]);
};

export default useDataActions;
