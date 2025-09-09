import dummyData from '../../public/dummyData.json';

// Array shuffle korar jonno Fisher-Yates method
const randomizeArray = (arr) => {
  const result = [...arr];
  for (let index = result.length - 1; index > 0; index--) {
    const randIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randIndex]] = [result[randIndex], result[index]];
  }
  return result;
};

const fetchDummyData = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const errorOccurs = Math.random() < 0.1;
      if (errorOccurs) {
        reject(new Error('Data fetch failed. Please retry.'));
      } else {
        const shuffled = randomizeArray(dummyData);
        const limitedData = shuffled.slice(0, 27);
        resolve(limitedData);
      }
    }, 1200);
  });
};

export default fetchDummyData;
