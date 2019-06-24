function randomIntegerFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const horses = ['Mango', 'Poly', 'Ajax', 'Chelsy', 'Kiwi'].map(name => ({
  name,
  racetime: randomIntegerFromInterval(2000, 5000),
}));

console.table(horses);

const promises = horses.map(horse => race(horse));

notifyWhenRaceFinished(promises);
notifyOnWinner(promises);

function notifyWhenRaceFinished(horses) {
  Promise.all(horses)
    .then(result => {
      // console.log(result);
      console.log(`Race finished - prepare for next round!`);
    })
    .catch(error => {
      // console.log(error);
      console.log(`${error.name} has crashed`);
      console.log(`Race finished - prepare for next round!`);
    });
}

function notifyOnWinner(horses) {
  Promise.race(horses).then(winner => {
    console.log(
      `Winner is ${winner.name}! Finished in ${
        winner.racetime
      }! Congratulations! 🎉`,
    );
  });
}

function race(horse) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const hasCrashed = Math.random() < 0.2;
      if (hasCrashed) {
        reject(horse);
      }
      resolve(horse);
    }, horse.racetime);
  });
}
