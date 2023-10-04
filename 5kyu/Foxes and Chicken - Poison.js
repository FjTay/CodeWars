const farm = "F..FC..XXF[CXC].XC...C[.X.CFC]CCX.C[C.CC.C]C.[FC.CC.CC.CFCX.C.XCCCC.C]CC.FCF.C.C[XCF..C]..CCX".split('')

Array.prototype.checkFarm = function (farm, i, cxt) {
	i ??= 0

	if(i === this.length) {
  	return this
  }
  
  const conditions = {
  	isFox: null,
    isBait: null,
    wasBait: null
  }
  
  let context = {
  	scope: [],
    yard: conditions,
    cage: conditions
  }
  
  cxt ??= context
  
  const scopeSwitcher = scope => scope.length % 2 ? "cage" : "yard"
  
  const scopeHandler = (cxt, char) => {
  	cxt.scope = [...cxt.scope, char]
    cxt.cage = scopeSwitcher(cxt.scope) ? conditions : cxt.cage
    return [cxt, char]
  }
  
  const charSwitcher = char => {
  	const scope = scopeSwitcher(cxt.scope)
  	const rules =  {
      "[" : () => scopeHandler(cxt, char),
      "]" : () => scopeHandler(cxt, char),
      "D" : () => [{...cxt, [scope] : {...cxt[scope], isFox: i}}, "D"],
      "F" : () => [{...cxt, [scope] : {...cxt[scope], isFox: i}}, cxt[scope].isBait ? "D" : "F"],
      "X" : () => [{...cxt, [scope] : {...cxt[scope], isBait: i, wasBait: true}}, "X"],
      "." : () => [cxt, "."],
      "C" : () => [cxt, cxt[scope].isFox !== null && cxt[scope].isFox >= cxt[scope].isBait ? "." : "C"]
    }
    return rules[char]
  }

  const [newContext, newChar] = charSwitcher(this[i])?.()
  
  this[i] = newChar
  
  cxt = newContext
  
  return this.checkFarm(farm, i + 1, cxt)
}

const first = farm.checkFarm()
const second = [...first].reverse()
console.log(".......XX.[CXC].XC...C[.X....]CCX..[C.CC.C]..[............X.C.XCCCC.C]..........[X.....]....X")
console.log(second.checkFarm().reverse().join('').replaceAll("D", '.'))