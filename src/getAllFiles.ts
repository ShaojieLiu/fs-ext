const fs = require('fs');
const path = require('path');

interface IFileInfo {
  file: any;
  name: string;
  extname: string;
  filePath: string;
}
type resolver = (path: string) => IFileInfo[];

function getAllFiles(imagespath) {
  return resolveDir(imagespath);
}

const resolveDir: resolver = parentpath => {
  const ls = fs.readdirSync(parentpath);
  const arrMap = ls.map(name => {
    const p = path.join(parentpath, name);
    const pathIsDir = isDir(p);
    if (pathIsDir) {
      return resolveDir(p);
    } else {
      return resolveFile(p);
    }
  });
  return [].concat(...arrMap);
};

const resolveFile: resolver = p => {
  const file = fs.readFileSync(p);
  return [
    {
      file,
      name: getClassName(p),
      extname: path.extname(p),
      filePath: p,
    },
  ];
};

const isDir = p => {
  try {
    const stat = fs.lstatSync(p);
    return stat.isDirectory();
  } catch (e) {
    console.error(e);
    // lstatSync throws an error if path doesn't exist
    return false;
  }
};

const getClassName = p => {
  const ext = path.extname(p);
  const noExt = p.split(ext)[0];
  return noExt.split(path.sep).slice(-1)[0];
};

export { getAllFiles };
// module.exports = getAll;
