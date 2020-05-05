interface Request {
  success: boolean,
  errMsg?: string
  data: any
}

export const getResponseData = (data: any, errMsg?: string): Request => {
  if (errMsg) {
    return {
      success: false,
      errMsg,
      data
    }
  } else {
    return {
      success: true,
      data
    }
  }
}