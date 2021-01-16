import { routePicturesUrl } from "../../config";

const gradeColors = {
  "1": ["#e6e6e6", "black"],
  "2": ["#e6e6e6", "black"],
  "3": ["#e6e6e6", "black"],
  "4a": ["#e6e6e6", "black"],
  "4b": ["#e6e6e6", "black"],
  "4c": ["#e6e6e6", "black"],
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

const grades = [
  "1",
  "2",
  "3",
  "4a",
  "4b",
  "4c",
  "5a",
  "5b",
  "5c",
  "6a",
  "6a+",
  "6b",
  "6b+",
  "6c",
  "6c+",
  "7a",
  "7a+",
  "7b",
  "7b+",
  "7c",
  "7c+",
  "8a",
  "8a+",
  "8b",
  "8b+",
  "8c",
  "8c+",
  "9a",
  "9a+",
  "9b",
  "9b+",
  "9c",
  "9c+"
]

const gradeBckgColor = grade => gradeColors[grade][0];
const gradeColor = grade => gradeColors[grade][1];

const selectPlaceholder = (type) => {
  switch (type) {
    case 'boulder':
      return '/assets/images/boulder.png'
    case 'psicobloc':
      return '/assets/images/psicobloc.png'
    default:
      return '/assets/images/sport.png'
  }
}

const routePicture = (picture, type) => picture ? picture : selectPlaceholder(type);

export { gradeBckgColor, gradeColor, routePicture, grades }
