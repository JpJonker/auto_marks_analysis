import { useState, useEffect } from "react";
import { utils, writeFile } from "xlsx";
import { Input, Space, Tooltip, Button, Row } from "antd";

import { Guide } from "../";

const Tool = () => {
  const [fileName, setFileName] = useState("");
  const [asmtName, setAsmtName] = useState("");
  const [asmtMaxMarks, setAsmtMaxMarks] = useState("");
  const [asmtMarks, setAsmtMarks] = useState("");
  const [markEntries, setMarkEntries]: any[] = useState([]);
  const [studentCount, setStudentCount] = useState("");
  const [defaultEntryValue, setDefaultEntryValue] = useState("200");
  const [errorMessage, setErrorMessage]: any[] = useState(["", "", "", "", ""]);

  const validate = (array: any[]) => {
    let valid = true;
    let results: any[] = [];

    if (fileName === "") {
      results.push("Filename can't be empty");
      valid = false;
    } else {
      results.push("");
    }

    if (asmtName === "") {
      results.push("Assessment name can't be empty");
      valid = false;
    } else {
      results.push("");
    }

    if (asmtMaxMarks === "") {
      results.push("Max marks can't be empty");
      valid = false;
    } else if (isNaN(Number(asmtMaxMarks)) === true) {
      results.push("Max marks should be a number");
    } else {
      results.push("");
    }

    if (studentCount === "") {
      results.push("Student count can't be empty");
      valid = false;
    } else if (isNaN(Number(asmtMaxMarks)) === true) {
      results.push("Student count should be a number ");
    } else {
      results.push("");
    }

    if (asmtMarks === "") {
      results.push("Marks can't be empty");
      valid = false;
    } else if (Number(studentCount) !== array.length) {
      results.push("Amount of marks entered is not the same as student count");
    } else {
      results.push("");
    }

    setErrorMessage(results);
    return valid;
  };

  const saveEntry = () => {
    let entry: any[] = [];
    let maxMarks = Number(asmtMaxMarks);
    let marksArray = asmtMarks.split(" ");
    let valid = validate(marksArray);
    if (valid === true) {
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
        setMarkEntries([...markEntries, entry]);
        return;
      }
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
    let colAmount = getColAmount(data);
    let colFormat: any[] = [];
    for (let i = 0; i < colAmount; i++) {
      colFormat.push({ wch: 15 });
    }
    const wb = utils.book_new();
    const ws = utils.json_to_sheet(data);
    ws["!cols"] = colFormat;
    utils.book_append_sheet(wb, ws, "Sheet 1");
    let wbName = !fileName ? "Assessment Analysis.xlsb" : `${fileName}.xlsb`;
    writeFile(wb, wbName);
  };

  const getColAmount = (data: any) => {
    return Object.keys(data["0"]).length;
  };

  useEffect(() => {
    let defaultEntry: any[] = ["Mark Val", "Average", "Absent"];
    for (let i = 0; i < Number(defaultEntryValue) + 1; i++) {
      defaultEntry.push(i);
    }
    setMarkEntries([defaultEntry, ...markEntries]);
  }, []);

  return (
    <Input.Group size='large'>
      <Space direction='vertical' style={{ width: "100%" }}>
        <Tooltip
          placement='top'
          title={
            errorMessage[0] === ""
              ? "Enter the name you wish the file to be created as (e.g. English Term 1 2022)"
              : errorMessage[0]
          }
        >
          <Input
            placeholder='Enter filename'
            addonBefore='Filename'
            onChange={(e) => setFileName(e.target.value)}
            status={errorMessage[0] === "" ? "" : "error"}
          />
        </Tooltip>
        <Tooltip
          placement='top'
          title={
            errorMessage[1] === ""
              ? ' Enter the name of the assessment or assessment section (e.g. "T1:A1" or "Section A"), this will be the header for the field'
              : errorMessage[1]
          }
        >
          <Input
            placeholder='Enter assessment name'
            addonBefore='Assessment Name'
            onChange={(e) => setAsmtName(e.target.value)}
            status={errorMessage[1] === "" ? "" : "error"}
          />
        </Tooltip>
        <Tooltip
          placement='top'
          title={
            errorMessage[2] === ""
              ? "Enter the max or total amount of marks achievable on this assessment "
              : errorMessage[2]
          }
        >
          <Input
            placeholder='Enter the max achievable mark'
            addonBefore='Max Marks'
            onChange={(e) => setAsmtMaxMarks(e.target.value)}
            status={errorMessage[2] === "" ? "" : "error"}
            maxLength={3}
          />
        </Tooltip>
        <Tooltip
          placement='top'
          title={
            errorMessage[3] === ""
              ? "Enter the amount of students which you have "
              : errorMessage[3]
          }
        >
          <Input
            placeholder='Enter the amount of students you have'
            addonBefore='Student Count'
            onChange={(e) => setStudentCount(e.target.value)}
            status={errorMessage[3] === "" ? "" : "error"}
            maxLength={3}
          />
        </Tooltip>
        <Tooltip
          placement='top'
          title={
            errorMessage[4] === ""
              ? "Enter the marks the students have received for the assessment. ( Note the marks should be separeted with a space )"
              : errorMessage[4]
          }
        >
          <Input
            placeholder='Enter the marks separated with a space'
            addonBefore='Marks'
            onChange={(e) => setAsmtMarks(e.target.value)}
            status={errorMessage[4] === "" ? "" : "error"}
            allowClear
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
