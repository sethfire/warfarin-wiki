export function parseValues(desc: string, blackboard: any) {
  const values: { [key: string]: any } = {};
  blackboard.forEach((bb: { key: string; valueStr: string; value: any }) => {
    values[bb.key] = bb.valueStr !== "" ? bb.valueStr : bb.value;
  });
  
  return desc.replace(/\{([0-9]+-)?(-)?([a-zA-Z0-9_]+)(:[^}]*)?\}/g, (match, prefix, minus, key, format) => {
    let val = values[key];
    if (val === undefined) return match;
    let numVal = typeof val === 'string' ? parseFloat(val) : val;
    // Special case: if the placeholder is {1-cooldown:...}, use 1 - cooldown
    if ((prefix && prefix.startsWith('1-')) && key === 'cooldown') {
      numVal = 1 - numVal;
    }
    let displayVal = numVal;
    if (minus) {
      displayVal = -numVal;
    }
    if (format && format.includes('%')) {
      displayVal = (displayVal * 100).toFixed(format && format.includes('.0') ? 1 : 0) + '%';
      displayVal = displayVal.replace(/\.0%$/, '%');
    }
    return displayVal;
  });
}

export function parseValueMatrix(desc: string, disValueMatrix: any) {
  if (!disValueMatrix || disValueMatrix.length === 0) return desc;
  
  return desc.replace(/\{(\d+),(\d+)(?::([^}]+))?\}/g, (match, idx1, idx2, format) => {
    const matrixIndex = parseInt(idx1);
    const valueIndex = parseInt(idx2);
    
    if (matrixIndex >= disValueMatrix.length) return match;
    
    const list = disValueMatrix[matrixIndex].list;
    if (!list || valueIndex >= list.length) return match;
    
    let val = list[valueIndex];
    if (val === undefined) return match;
    
    let numVal = typeof val === 'string' ? parseFloat(val) : val;
    let displayVal = numVal;
    
    if (format && format.includes('%')) {
      displayVal = (displayVal * 100).toFixed(format.includes('.0') ? 1 : 0) + '%';
      displayVal = displayVal.replace(/\.0%$/, '%');
    } else if (format === '0') {
      displayVal = numVal.toString();
    }
    
    return displayVal;
  });
}