import { useState, useEffect } from "react";
import { utils, writeFile } from "xlsx";

const Tool = () => {
  const [fileName, setFileName] = useState("Assessment Analysis");
  const [asmtName, setAsmtName] = useState("");
  const [asmtMaxMarks, setAsmtMaxMarks] = useState("");
  const [asmtMarks, setAsmtMarks] = useState("");
  const [markEntries, setMarkEntries]: any[] = useState([]);
  const [studentCount, setStudentCount] = useState("0");
  const [defaultEntryValue, setDefaultEntryValue] = useState("200");

  const saveEntry = () => {
    let entry: any[] = [];
    let maxMarks = Number(asmtMaxMarks);
    let marksArray = asmtMarks.split(" ");
    // filters out any empty string inside marksArray.
    marksArray = marksArray.filter((value, index, marksArray) => {
      return value !== "";
    });

    let absent = 0;
    let isAbsentAdded = false;

    for (let i = 0; i <= maxMarks; i++) {
      let markCount = 0;
      marksArray.forEach((mark) => {
        if (mark == "a" || mark == "A") {
          absent++;
        }
        if (Number(mark) == i) {
          markCount++;
        }
      });
      entry.push(markCount);
    }

    let average = getAverage(marksArray);

    if (Number(studentCount) === marksArray.length) {
      entry.unshift(asmtName, average, absent);
      console.log(entry);
      setMarkEntries([...markEntries, entry]);
      return;
    } else {
      console.log("not same");
    }
  };

  const getAverage = (array: string[]) => {
    let average = 0;
    array.forEach((value) => {
      let numberValue = Number(value);
      average += numberValue;
    });
    average = average / array.length;
    return average;
  };

  const formatInput = (entries: []) => {
    var Results: any[] = [];
    var count = 0;

    console.log(entries);
    // gets the input array with the longest length and assigns that value to count
    entries.forEach((entry: any[]) => {
      let Len = entry.length;
      if (count < Len) {
        count = Len;
        return;
      }
    });

    // uses the count value to create the same amount of empty object in Results array
    for (let i = 0; i < count - 1; i++) {
      Results.push({});
    }

    entries.forEach((entry: any[]) => {
      for (let i = 1; i < entry.length; i++) {
        Results[i - 1][entry[0]] = entry[i];
      }
    });
    return Results;
  };

  const createSheet = () => {
    let data = formatInput(markEntries);
    const wb = utils.book_new();
    const ws = utils.json_to_sheet(data);
    utils.book_append_sheet(wb, ws, "Sheet 1");
    writeFile(wb, `${fileName}.xlsb`);
  };

  useEffect(() => {
    let defaultEntry: any[] = ["Mark Val", "Average", "Absent"];
    for (let i = 0; i < Number(defaultEntryValue) + 1; i++) {
      defaultEntry.push(i);
    }
    setMarkEntries([defaultEntry, ...markEntries]);
  }, []);

  return <div>APP</div>;
};

export default Tool;
