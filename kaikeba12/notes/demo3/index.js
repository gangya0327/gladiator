function twoSum(nums, target) {
  let obj = {}
  for (let i = 0; i < nums.length; i++) {
    let num = nums[i]
    if (num in obj) {
      return [obj[num], i]
    } else {
      obj[target - num] = i
    }
  }
}