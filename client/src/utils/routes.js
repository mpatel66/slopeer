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

export { gradeBckgColor, gradeColor, routePicture }
