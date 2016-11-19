// ?username=https://vk.com/skillbranch
// ?username=//vk.com/skillbranch
// ?username=skillbranch
// ?username=https://vk.com/skillbranch?w=wall-117903599_1076


export default function canonize(url) {
  const re = new RegExp('(https?:)?(\/\/)?([a-zA-Z0-9\.]*[^\/]*\/)?([@])?([a-zA-Z0-9\.\_]*)(\/)?', 'i');
  const username = url.match(re)[5];
  return '@' + username;
}
//
// const arr = [
//   'https://vk.com/skillbranch',
//   '//vk.com/skillbranch',
//   'skillbranch',
//   'https://vk.com/skillbranch?w=wall-117903599_1076',
// ];
//
//
// arr.forEach((url) => {
//   const username = canonize(url);
//   console.log(username);
// });
