const BASE_URL = "http://localhost:5000"
export const TASK_URL = BASE_URL + '/api/task';
export const TASK_DELETE_URL = TASK_URL + '/'
export const TASK_NEW_URL = TASK_URL + '/addNewTask'
export const TASK_COMPLETED_URL = TASK_URL + '/markAsComplete'
export const TASK_EDIT_URL = TASK_URL + "/editTask"
export const TASK_LOGIN_URL = TASK_URL + "/login"
export const TASK_REGISTER_URL = TASK_URL + "/register"

const JIRA_BASE = BASE_URL + "/api/jira";
export const JIRA_LOGIN_URL = JIRA_BASE + "/login";
export const JIRA_REGISTER_URL = JIRA_BASE + "/register"
export const JIRA_TASK_URL = JIRA_BASE + "/";
export const JIRA_ADD_TASK_URL = JIRA_BASE + "/addNewTask"
export const JIRA_GET_USER_DATA_URL = JIRA_BASE + "/getUserData"
export const JIRA_DELETE_URL = JIRA_BASE + "/"
export const JIRA_EDIT_USER_TASK = JIRA_BASE + "/editTask"
export const JIRA_GET_EXISTING_USERS = JIRA_BASE + "/getExistingUsers"
export const JIRA_ASSIGN_USER_URL = JIRA_BASE + "/assignTask"


