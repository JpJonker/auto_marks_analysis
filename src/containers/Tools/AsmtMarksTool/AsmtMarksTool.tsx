import { useState, useEffect } from "react";
import { utils, writeFile } from "xlsx";

const ToolPage = () => {
  const [fileName, setFileName] = useState("");
  const [asmtName, setAsmtName] = useState("");
  const [asmtMaxMarks, setAsmtMaxMarks] = useState("");
  const [asmtMarks, setAsmtMarks] = useState("");
  const [markEntries, setMarkEntries]: any[] = useState([]);
  const [studentCount, setStudentCount] = useState("0");
  const [defaultEntryValue, SetdefaultEntryValue] = useState(200);

  const saveEntry = () => {
    let entry: any[] = [asmtName];
    let maxMarks = Number(asmtMaxMarks);
    let marksArray = asmtMarks.split(" ");
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
      if (isAbsentAdded == false) {
        entry.push(absent);
        isAbsentAdded = true;
      }
      entry.push(markCount);
    }
    console.log(marksArray);
    console.log(studentCount);
    if (Number(studentCount) === marksArray.length) {
      setMarkEntries([...markEntries, entry]);
      return;
    } else {
      console.log("not same");
    }
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
    let defaultEntry: any[] = ["Mark Values", "Absents"];
    for (let i = 0; i < defaultEntryValue + 1; i++) {
      defaultEntry.push(i);
    }
    setMarkEntries([defaultEntry]);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <input type='text' placeholder='File Name' onChange={(e) => setFileName(e.target.value)} />
      <input
        type='text'
        placeholder='Assessment Name'
        onChange={(e) => setAsmtName(e.target.value)}
      />
      <input
        type='text'
        placeholder='Assessment Max Marks'
        onChange={(e) => setAsmtMaxMarks(e.target.value)}
      />
      <input
        type='text'
        placeholder='Assessment Marks'
        onChange={(e) => setAsmtMarks(e.target.value)}
      />
      <input
        type='text'
        placeholder='Student Count'
        onChange={(e) => setStudentCount(e.target.value)}
      />
      <button type='button' onClick={saveEntry}>
        Save Entry
      </button>
      <button type='button' onClick={createSheet}>
        Save sheet
      </button>
    </div>
  );
};

export default ToolPage;
