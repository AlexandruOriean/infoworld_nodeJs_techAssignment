const fun1 = (resourceType) => {
  if (resourceType !== 'Practitioner') {
    return res.status(400).json({
      status: 'error',
      message: `Resource type ${resourceType} is invalid. Resource type should be Practitioner`,
    });
  }
};

const fun2 = (id) => {
  if (!id) {
    return res.status(400).json({ status: 'error', message: 'Id is required' });
  }
};

module.exports = { fun1, fun2 };
