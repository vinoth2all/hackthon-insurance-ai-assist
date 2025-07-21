export const ticketData = [
  { id: 1, "task_number": "IND978232", "app_name": "O11y app", "summary": "App components mostly operational; login issue due to AD server." },
  { id: 2, "task_number": "IND978240", "app_name": "O11y app", "summary": "App components mostly operational; login issue due to AD server." },
  { id: 3, "task_number": "IND978110", "app_name": "O11y app", "summary": "App components mostly operational; login issue due to AD server." },
  { id: 4, "task_number": "IND978555", "app_name": "O11y app", "summary": "App components mostly operational; login issue due to AD server." },
  { id: 5, "task_number": "IND978788", "app_name": "O11y app", "summary": "App components mostly operational; login issue due to AD server." },
];

// export const res = {
//   "agent_message": {
//     "status_check_results": {
//       "services": {
//         "client-service": "Running"
//       }
//     },
//     "diagnostic_insights": {
//       "likely_cause": "The client-service pod is not running or is crashing.",
//       "resolution_steps": "Check the status of the client-service pod using the command: kubectl get pods -n client-service. If the pod is in an error state, restart it using the command: kubectl rollout restart deployment client-service -n client-service."
//     },
//     "remediation_actions": null,
//     "reasoning": "The client-service pod was reported to be running, so no remediation actions were necessary.",
//     "recommendation": "Monitor the client-service pod to ensure it remains in a running state."
//   },
//   "message_time": "2025-06-19 10:39:13",
//   "is_approval_required": true,
//   "ref_num": "f5c05107-30ee-418c-8e0b-f2c13b3e42c2"
// }

// export const res_withour_service = {
//     "agent_message": {
//         "status_check_results": {
//             "analytics-service": "Running",
//             "client-service": "Unavailable",
//             "database-service": "Running",
//             "inventory-service": "Running",
//             "order-service": "Running",
//             "payment-service": "Running",
//             "recommendation-service": "Running",
//             "mysql": "Running"
//         },
//         "diagnostic_insights": null,
//         "remediation_actions": "",
//         "reasoning": "The health check was performed to assess the overall status of the O11y application. The analytics-service, database-service, inventory-service, order-service, payment-service, recommendation-service, and mysql are all running. However, the client-service is unavailable.",
//         "recommendation": "Investigate the client-service to determine the cause of its unavailability and take appropriate action to resolve the issue."
//     },
//     "message_time": "2025-06-25 06:24:50",
//     "is_approval_required": false,
//     "ref_num": "b4511484-378a-4353-b9f4-ccfd5a1acd2c"
// }

//export const incident_questions = { "message": res, "isbotmessage": true }

//export const app_question = { "message": "Please select the Application Name from the dropdown to view the incident details.", "isbotmessage": true };

//export const question = { "message": "What would you like to check regarding this incident? <br>(e.g., get status, check logs, trigger a workflow, assign to engineer, etc.)", "isbotmessage": true }

//export const app_name = ["O11y app", "GSA app", "DRA app", "FNO app", "DIO app"];

export const RECENT_INCIDENTS = "/incidents/recent";

export const APPLICATIONS = "/applications";

export const CONVERSATIONS = "conversations";

export const HISTORY = "history"

export const APPLY_FIX = "/apply-fix";

export const SUMMARY = 'summary';

export const ALL_TICKETS = "/alltickets";

export const CHAT = "/chat";

export const getCurrentTimestamp = () => {
  const now = new Date();
  const utcTime = now.toUTCString();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  //const seconds = String(now.getSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const hrs = String(hours).padStart(2, '0');
  const iso = `${hrs}:${minutes} ${ampm}, ${day} ${month} ${year}`;
  const ts = { 'ist': iso, 'utc': utcTime }
  return ts;
}

export const conversation_req = {
  "content": "",
  "entry_ts": ""
}

export const apply_fix_req = {
  "app_name": "",
  "user_id": "",
  "ref_num": "",
  "entry_ts": "",
  "is_approved": false
}

export const USER_PASSWORD_AUTH = 'USER_PASSWORD_AUTH';

export const DONE = 'DONE';

export const CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED = 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED';

export const APPROVE_REJECT = "Review the identified cause and resolution steps. Select Approve to proceed with remediation, or Reject to suggest changes";

export const BOT_ERROR = "Sorry, I am unable to respond to your query";

export const INVALID_INCIDENT_NO_MSG = "Please enter an alphanumeric value with a minimum of 8 characters.";

export const INVALID_INCIDENT_NO = "Invalid Incident Number";

export const getWelcomeMsg = () => {
  const userName = localStorage.getItem('userName');
  const msg = `Hi ${userName}, How can I help you?`;
  return { "message": msg, "isbotmessage": true };
}

