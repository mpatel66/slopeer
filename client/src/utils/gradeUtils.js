const gradeColors = {
  "1": ["white", "black"],
  "2": ["white", "black"],
  "3": ["white", "black"],
  "4a": ["white", "black"],
  "4b": ["white", "black"],
  "4c": ["white", "black"],
  "5a": ["yellow", "black"],
  "5b": ["yellow", "black"],
  "5c": ["yellow", "black"],
  "6a": ["orange", "black"],
  "6a+": ["orange", "black"],
  "6b": ["orange", "black"],
  "6b+": ["orange", "black"],
  "6c": ["orange", "black"],
  "6c+": ["orange", "black"],
  "7a": ["red", "white"],
  "7a+": ["red", "white"],
  "7b": ["red", "white"],
  "7b+": ["red", "white"],
  "7c": ["red", "white"],
  "7c+": ["red", "white"],
  "8a": ["darkred", "white"],
  "8a+": ["darkred", "white"],
  "8b": ["darkred", "white"],
  "8b+": ["darkred", "white"],
  "8c": ["darkred", "white"],
  "8c+": ["darkred", "white"],
  "9a": ["black", "white"],
  "9a+": ["black", "white"],
  "9b": ["black", "white"],
  "9b+": ["black", "white"],
  "9c": ["black", "white"],
  "9c+": ["black", "white"]
}

const gradeBckgColor = grade => gradeColors[grade][0];
const gradeColor = grade => gradeColors[grade][1];

export { gradeBckgColor, gradeColor }
