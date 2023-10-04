const farm = ".C.C[..C.CXCFCC.C.F..]CC..[]CCC....CC..XCF.XXC....CCCCFXFCCCCCX.CCC..C.C[CF.CC..FX.CCC]".split('')

const finder = (farm, i, data, kill, scope, target) => {
  if (i === farm.length) {
    return farm
  }
  let newFarm = [...farm]

  if (["[", "]"].includes(newFarm[i])) {
    scope = !scope
    if(!target) {
    	kill = false
    }
  }

  if (kill) {
    if(scope === target && newFarm[i] === kill) {
    	newFarm[i] = kill === "F" ? "D" : "."
    }
  }
  
  if(farm[i] === "X" && kill === "C" && scope === target) {
  	return farm
  }

  if ((newFarm[i] === "F" || newFarm[i] === "D") && !kill) {
  	target = scope
    const end = finder(newFarm.slice(i + 1), 0, data, "C", scope, target);
    const start = finder(newFarm.slice(0, i).reverse(), 0, data, "C", scope, target);
    newFarm = [...start.reverse(), newFarm[i], ...end]
  }
  
  if (newFarm[i] === "X" && !kill) {
  	target = scope
    const end = finder(newFarm.slice(i + 1), 0, data, "F", scope, target);
    const start = finder(newFarm.slice(0, i).reverse(), 0, data, "F", scope, target);
    newFarm = [...start.reverse(), newFarm[i], ...end]
  }

  farm = newFarm
  return finder(farm, i + 1, data, kill, scope, target)

}

const res = finder(farm, 0, [], false, true).join('').replaceAll("D", ".")
const expected = ".C.C[..C.CX..........]CC..[]CCC....CC..X...XX..........X......X.CCC..C.C[........X.CCC]"
console.log(res)
console.log(expected)
console.log(res === expected)