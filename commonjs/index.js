let path = require("path");
let vm = require("vm");
let fs = require("fs");
 
function req(filename) {
  let absPath = path.resolve(__dirname, filename);
  let extnames = Object.keys(Module._extensions);
  let old = absPath;
  if (Module._cache[absPath]) {
    return Module._cache[absPath].exports;
  }
  let index = 0;
  //运用到一个小递归来匹配 req 方法不传入文件后缀名的兼容方法
  function find(filename) {
    if (index === extnames.length) {
      return filename;
    }
    try {
      fs.accessSync(filename);
      return filename;
    } catch (ex) {
      return find(old + extnames[index++]);
    }
  }
  absPath = find(absPath);
  try {
    fs.readFileSync(absPath);
  } catch (ex) {
    throw new Error("文件不存在");
  }
  let module = new Module(absPath);
  Module._cache[module.id] = module;
  tryModuleLoad(module);
  return module.exports;
}
 
function Module(pathname) {
  this.id = pathname;
  this.exports = {};
}
 
function tryModuleLoad(module) {
  let extname = path.extname(module.id);
  Module._extensions[extname](module);
}
 
Module._cache = {};
Module.wrap = [
  "(function(exports, module, require, __filename, __dirname){",
  "})"
];
 
Module._extensions = {
  ".js"(module) {
    let content = fs.readFileSync(module.id);
    let fnStr = Module.wrap[0] + content + Module.wrap[1];
    let fn = vm.runInThisContext(fnStr);
    fn.call(module.exports,  module, req);
  },
  ".json"(module) {
    let content = fs.readFileSync(module.id);
    module.exports = JSON.parse(content);
  }
};
 
let a = req("./a");
console.log(a);


