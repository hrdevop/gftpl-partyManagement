export const PathNormalize = (path: string) => {
  return path.split('/').filter(Boolean).join('/');
};

export const RemoveNullProperties = (obj: Array<Record<string, unknown>>) => {
  obj.forEach(item => {
    Object.keys(item).forEach(key => {
      if (item[key] === null) {
        delete item[key];
      }
    });
  });

  return obj;
};
