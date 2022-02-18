/*
 * @Author: your name
 * @Date: 2021-09-15 10:42:33
 * @LastEditTime: 2021-09-17 17:10:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /js-tool/src/算法/处理表格数据.js
 */
// let arrAll = [
//     ['主播1', 33, 44, 55, 11, 11],
//     ['主播2', 33, 44, 55, 11, 11]
// ]
// let object = {
//     0: 'key0',
//     1: 'key1',
//     2: 'key2',
//     3: 'key3',
//     4: 'key4',
//     5: 'key5',
// }
// let list = []
// arrAll.forEach(arr => {
//     let obj = {}
//     arr.forEach((item, index) => {
//         obj[object[index]] = item
//     })
//     list.push(obj)
// })
// console.log(list, '************obj**********打印');
// let arr = [{ 'name': '3', 'age': '4' }, { 'name': '3', 'age': '4' }]
// let arr2 = [{ 'name': '2', 'age': '3' }]
// arr.unshift(...arr2)
// console.log(arr, '************arr.unshift(**********打印');
// 多行
let list = [];
let deleteIndex = []
let arr = [...anchorList]
anchorList.forEach((item, index) =>
    // 在已选择列表中遍历
    selectedList.forEach(select => {
        if (item.GameID + item.UniqueID === select.GameID + select.UniqueID) {
            // 如果两个值都相同，就推入 list
            list.push({ ...item, UpdateStatus: 2 });
            deleteIndex.push((select.GameID + select.UniqueID))
        }
    })
);
arr = arr.filter(item => {
    return !deleteIndex.includes((item.GameID + item.UniqueID))
})

setAnchorList(arr);
// 存储删除的主播列表
let filterList = list.filter(item => !item.isNew);
setDeleteList(pre => (pre.concat(filterList)));

// 单行
if (row) {
    let list = [];
    let arr = anchorList.filter(item => {
        if ((item.UniqueID + item.GameID) === (row.UniqueID + row.GameID)) {
            list.push({ ...row, UpdateStatus: 2 });
        } else {
            return item
        }
    });
    setAnchorList(arr);
    // 存储删除的主播列表
    let filterList = list.filter(item => !item.isNew);
    setDeleteList(pre => (pre.concat(filterList)));
}