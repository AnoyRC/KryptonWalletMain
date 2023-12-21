export function objectToArray(object) {
    const result=[]
    for(const key in object) {
        result.push(object[key]?.fileContent.content)
    }
    return result
}