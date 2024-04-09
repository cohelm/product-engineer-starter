export const simulateDelay = (millis = 1000) => {
  return new Promise((resolve) => {
      setTimeout(() => resolve(true), millis);
  });
};

export const cleanExcessSlashesInPath = (url: string) => {
  return url.replace(/(https?:\/\/)|(\/)+/g, (match, p1) => p1 ? p1 : '/');
};

export const extractCaseIdFromUrl = (url: string) => {
  url = url.trim();
  const {pathname} = (url.indexOf("http://") === 0 || url.indexOf("https://") === 0) ? new URL(url) : {pathname: url}
  return pathname.split("/").pop() || "";
}

export const parseCaseInfo = (caseInfo: any) => {
  // console.log('caseInfo', caseInfo);

  return {
    id: caseInfo?.case_id,
    procedure: caseInfo?.procedure_name,
    status: caseInfo?.status,
    reqOverall: caseInfo?.is_met,
    summary: caseInfo?.summary,
    cptCodes: caseInfo?.cpt_codes,
    created: new Date(caseInfo?.created * 1000),
    steps: (caseInfo?.steps || []).map((step: any) => {
      const {question,options,is_met,reasoning} = step;
      return {question, options, is_met, reasoning}
    })
  }
}