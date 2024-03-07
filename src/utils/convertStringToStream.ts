function convertToObjects(inputString: string) {
  const lines = inputString.split('\n');
  const resultArray = [];

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('#EXTINF')) {
      const extinfMatch = lines[i].match(/#EXTINF:-1 tvg-id="([^"]*)" tvg-logo="([^"]*)" group-title="([^"]*)",(.*)/);
      if (extinfMatch) {
        const name = extinfMatch[4].trim();
        const logo = extinfMatch[2].trim();
        const groupTitle = extinfMatch[3].trim();

        const url = lines[i + 1].trim();

        const convertedObject = {
          name,
          logo,
          group: groupTitle,
          url,
          raw: `${lines[i]}\n${lines[i + 1]}`,
        };

        resultArray.push(convertedObject);
      }
    }
  }

  return resultArray;
}
export  { convertToObjects };