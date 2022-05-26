import { useState, useEffect } from "react";
import { utils, writeFile } from "xlsx";
import { Input, Space, Tooltip, Button, Row } from "antd";
import { warning } from "react-router/lib/router";

const Tool = () => {
  const [fileName, setFileName] = useState("");
  const [asmtName, setAsmtName] = useState("");
  const [asmtMaxMarks, setAsmtMaxMarks] = useState("");
  const [asmtMarks, setAsmtMarks] = useState("");
  const [markEntries, setMarkEntries]: any[] = useState([]);
  const [studentCount, setStudentCount] = useState("");
  const [defaultEntryValue, setDefaultEntryValue] = useState("200");
  const [errorMessage, setErrorMessage]: any[] = useState(["", "", "", "", ""]);

  const validate = () => {
    let valid = true;
    let results: any[] = [];

    if (fileName === "") {
      results.push("Can't be Empty");
      valid = false;
    } else {
      results.push("");
    }

    if (asmtName === "") {
      results.push("Can't be Empty");
      valid = false;
    } else {
      results.push("");
    }

    if (asmtMaxMarks === "") {
      results.push("Can't be Empty");
      valid = false;
    } else if (isNaN(Number(asmtMaxMarks)) === true) {
      results.push("Not a number");
    } else {
      results.push("");
    }

    if (studentCount === "") {
      results.push("Can't be Empty");
      valid = false;
    } else if (isNaN(Number(asmtMaxMarks)) === true) {
      results.push("Not a number ");
    } else {
      results.push("");
    }

    if (asmtMarks === "") {
      results.push("Can't be Empty");
      valid = false;
    } else {
      results.push("");
    }

    setErrorMessage(results);
    return valid;
  };

  const saveEntry = () => {
    let valid = validate();

    if (valid === true) {
      let entry: any[] = [];
      let maxMarks = Number(asmtMaxMarks);
      let marksArray = asmtMarks.split(" ");
      // filters out any empty string inside marksArray.
      marksArray = marksArray.filter((value, index, marksArray) => {
        return value !== "";
      });

      let absent = 0;

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
    }
    console.log(errorMessage);
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

  useEffect(() => {
    console.log(errorMessage);
  }, [errorMessage]);

  return (
    <Input.Group size='large'>
      <Space direction='vertical' style={{ width: "100%" }}>
        <Tooltip
          placement='top'
          title='Enter the name you wish to have the created to be named (e.g. English Term 1 2022)'
        >
          <Input
            placeholder={errorMessage[0] === "" ? "Assessment Analysis" : errorMessage[0]}
            addonBefore='Filename'
            onChange={(e) => setFileName(e.target.value)}
            status={errorMessage[0] === "" ? "" : "error"}
          />
        </Tooltip>
        <Tooltip
          placement='top'
          title='Enter the name of the assessment you are entering (e.g. T1:A1)'
        >
          <Input
            placeholder={errorMessage[1] === "" ? "Assessment Name" : errorMessage[1]}
            addonBefore='Assessment Name'
            onChange={(e) => setAsmtName(e.target.value)}
            status={errorMessage[1] === "" ? "" : "error"}
          />
        </Tooltip>
        <Tooltip
          placement='top'
          title='Enter the number that is the Max achievable marks for the assessment'
        >
          <Input
            placeholder={errorMessage[2] === "" ? "Mark Marks" : errorMessage[2]}
            addonBefore='Max Marks'
            onChange={(e) => setAsmtMaxMarks(e.target.value)}
            status={errorMessage[2] === "" ? "" : "error"}
            maxLength={3}
          />
        </Tooltip>
        <Tooltip placement='top' title='Enter the number of the amount of students you have'>
          <Input
            placeholder={errorMessage[3] === "" ? "student Count: " : errorMessage[3]}
            addonBefore='Student Count'
            onChange={(e) => setStudentCount(e.target.value)}
            status={errorMessage[3] === "" ? "" : "error"}
            maxLength={3}
          />
        </Tooltip>
        <Tooltip
          placement='top'
          title='Enter the marks separated with a space like this. "1 2 2 3 4 4", for absent students add "a" or "A"'
        >
          <Input
            placeholder={errorMessage[4] === "" ? "Marks: " : errorMessage[4]}
            addonBefore='Marks'
            onChange={(e) => setAsmtMarks(e.target.value)}
            status={errorMessage[4] === "" ? "" : "error"}
          />
        </Tooltip>
        <Row justify='end'>
          <Space direction='horizontal'>
            <Button onClick={saveEntry}>Add Entry</Button>
            <Button type='primary' onClick={createSheet}>
              Download File
            </Button>
          </Space>
        </Row>
      </Space>
    </Input.Group>
  );
};

export default Tool;
