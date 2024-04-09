const dashboard = {
  medrec: {
    title: "Step 1: Upload Medical Record",
    labels: {
      init: "Simulate Medical Record Upload",
      success: "Medical Record Uploaded",
      error: "Medical Record Upload Failed"
    },
    file: "/assets/medical-record.pdf"
  },

  guide: {
    title: "Step 2: Upload Guidelines",
    labels:{
      init: "Simulate Guidelines Upload",
      success: "Guidelines File Uploaded",
      error: "Guidelines Upload Failed"
    },
    file: "/assets/guidelines.pdf"
  },

  button: {
    label: "Continue"
  },

  submitToast: {
    pending: "Submitting..."
  }
}

const caseInfo = {
  notFound:{
    redirect: "Back to Dashboard",
    errNotFound: "Case Not Found",
    errGeneral: "Oops! Something went wrong."
  },
  linkBack: "Dashboard",
  autoReloadLabel: "Auto Refresh",
  createdLabel: "Created:",
  cptLabel: "CPT Codes:",
  summaryLabel: "Summary",
  reasonLabel: "Explanation",
  trackerLabels: {
    submitted: "Received",
    processing: "Processing",
    complete: "Completed"
  }
}

export const copytext = {
  en: {
    dashboard,
    caseInfo
  }
}