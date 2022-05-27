import { Typography, Space, Image, List } from "antd";

import Step1 from "../../../assets/images/AET-Step-1.png";
import Step2 from "../../../assets/images/AET-Step-2.png";
import Step3 from "../../../assets/images/AET-Step-3.png";
import Step4 from "../../../assets/images/AET-Step-4.png";

const listData = [
  {
    title: "Filename field",
    description:
      'Enter the name here, what you want the created file to be named, if you add "English" in the filename field. The file would have the name "English.xlsb" .',
  },
  {
    title: "Assessment name field",
    description:
      "Enter the name here, of the assessment or assessment section. It is up to you what you want to add here. It is best to add the assesssment name or assessment section.",
  },
  {
    title: "Max marks field",
    description:
      "Enter the number here, what the max achievable mark is for the given assessment. e.g. (if a student gets 15 out of 50 for the assessment, Add the number 50 here).",
  },
  {
    title: "Student count field",
    description:
      "Enter the number here, of the amount of students you have or have the marks for, as you would need to enter the same amount of marks as the number you specify here ( student count ).",
  },
  {
    title: "Marks field",
    description:
      "Enter the marks here, of the assessment achieved by the students. Please note you have to press space between each mark you enter as it won't work otherwise. Also like in the previous point, if the amount of marks entered is not the same as the number entered in the student count field, it will give an error.",
  },
];

const AutoExcelToolGuide = () => {
  return (
    <Space direction='vertical' size='large' style={{ margin: "2rem 0" }}>
      <Typography.Title level={2} className='app__guide-text'>
        How to use the Auto Excel Tool:
      </Typography.Title>
      <Typography.Title level={3} className='app__guide-text'>
        Step 1:
      </Typography.Title>
      <Typography.Title level={4}>What to add in input fields:</Typography.Title>
      <List
        itemLayout='vertical'
        dataSource={listData}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={<Typography.Text style={{ fontWeight: "bold" }}>{item.title}</Typography.Text>}
              description={
                <Typography.Text className='app__guide-text'>{item.description}</Typography.Text>
              }
            />
          </List.Item>
        )}
      />
      <Typography.Title level={3}>Step 2:</Typography.Title>
      <Typography.Title level={4}>Add Entry:</Typography.Title>
      <Typography.Text className='app__guide-text'>
        Once you have filled in all the fields correctly, then you should click the add entry
        button. This will save your entry and allow you to create another entry.
      </Typography.Text>
      <Typography.Title level={3}>Step 3:</Typography.Title>
      <Typography.Title level={4}>Download file:</Typography.Title>
      <Typography.Text className='app__guide-text'>
        Once you have finished adding all the assessment entries, then the only thing left to do is
        to click the download file button. This will download the file with all complete with all
        the data and mark analysis marks.
      </Typography.Text>
    </Space>
  );
};

export default AutoExcelToolGuide;
