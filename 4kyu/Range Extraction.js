const x = ['-74,-72,-71,-69,-66,-63--61,-59,-57,-55,-54,-52,-50,-48,-47']

function solution(list) {
    const result = []
    let str = []
    for (let i = 0; i < list.length; i++) {
      if (list[i + 1] === list[i] + 1) {
        str.push(list[i])
      } else {
        if (str.length < 2) {
          result.push(...str, list[i])
        } else {
          result.push(str[0] + '-' + list[i])
        }
        str = []
      }
    }
    return result.join()
  }