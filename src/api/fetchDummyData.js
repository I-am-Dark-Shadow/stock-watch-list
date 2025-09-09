import dummyData from '../../public/dummyData.json';

// Fisher-Yates shuffle algorithm to randomize the array
const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const fetchDummyData = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isError = Math.random() < 0.1;
      if (isError) {
        reject(new Error('Failed to fetch data. Please try again.'));
      } else {
        const shuffledData = shuffleArray(dummyData);
        const selectedData = shuffledData.slice(0, 27);
        resolve(selectedData);
      }
    }, 1200);
  });
};

export default fetchDummyData;