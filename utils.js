const isIdPresent = (db, id) =>
  db.find((practitioner) => practitioner.id === id);

const getFullName = (practitioner) => {
  return `${practitioner.GivenName} ${practitioner.FamilyName}`;
};

const isIdAndNameValid = (practitioners) => {
  let id = '';
  let name = '';

  practitioners.map((practitioner) => {
    if (id !== practitioner.ID) {
      id = practitioner.ID;
      name = getFullName(practitioner);
    } else if (name !== getFullName(practitioner)) {
      return false;
    }
    return true;
  });
};

const outputActivePractitioners = (practitioner) => {
  if (practitioner.active) {
    console.log('******************************');
    console.log(`Name: ${practitioner.name[0].text}`);
    practitioner.facility.map((facility) => {
      console.log(`Facility: ${facility.name}`);
    });
    console.log('******************************');
  }
};

module.exports = {
  isIdPresent,
  getFullName,
  isIdAndNameValid,
  outputActivePractitioners,
};
