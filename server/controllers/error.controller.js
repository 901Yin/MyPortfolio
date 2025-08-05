function handleError(req, res) {
  // Your code to handle the error
}
function getErrorMessage(errMsg) {
  console.log(errMsg);
  return errMsg.message || errMsg; // 返回實際錯誤訊息
} // Export the controller function
export default {
  handleError: handleError,
  getErrorMessage: getErrorMessage,
};
