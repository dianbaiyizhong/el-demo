export function buildTableData(vueInstance, tableRefName, tableData) {
    let columns = vueInstance.$refs[tableRefName].columns.filter(item => item.property).map(item => {
        return {
            field: item.property,
            label: item.label
        }
    })
    const columnMap = vueInstance.$_.keyBy(columns, 'field');
    let firstRow = []
    Object.keys(columnMap).forEach(key => {
        firstRow.push(key)
    })
    let data = tableData.map(item => {
        let itemChild = []
        Object.keys(columnMap).forEach(key => {
            itemChild.push(item[key])
        })
        return itemChild
    })
    data.unshift(firstRow)
    return data
}