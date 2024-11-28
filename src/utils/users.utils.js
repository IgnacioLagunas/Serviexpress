import usersService from '../services/usuarios.service.js';

export const returnMissingDocuments = (user) => {
  const requiredDocumentTypes = ['dni', 'address', 'bank'];

  const userDocuments = user.documents || [];
  const userDocumentTypes = userDocuments.map((doc) => doc.name);

  const missingTypes = requiredDocumentTypes.filter(
    (requiredType) => !userDocumentTypes.includes(requiredType)
  );

  return missingTypes;
};

export const updateLastConnection = (user) => {
  usersService.updateOne(user.id, {
    last_connection: new Date(),
  });
};
