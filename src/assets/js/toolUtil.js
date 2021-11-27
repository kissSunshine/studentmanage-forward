/**
 * 比较传入的2个对象的属性值是否完全一样，仅比较2个对对象同时拥有的属性
 * @param {原数据} oldForm 
 * @param {新数据} newForm 
 * @returns true-不同；false-相同
 */
export function getUpdateFlag(oldForm, newForm){
    let updateFlag = false
    for (let key in oldForm) {
        // 当需要对比的对象有一个属性不是同时拥有的就跳过不比较
        if (typeof (oldForm[key]) == 'undefined' || typeof (newForm[key]) == 'undefined') { continue }
        if (oldForm[key] != newForm[key]) {
            updateFlag = true
            break
        }
    }
    return updateFlag
}