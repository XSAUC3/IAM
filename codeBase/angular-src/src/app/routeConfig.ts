
var addr = "http://localhost:3000/api"
var usr = "http://localhost:3000/users"
var Applications = addr + '/Applications/';
var application = addr + '/application/'
var addApp = addr + '/addApp'
var updateApp = addr + '/updateApp/'
var delApp = addr + '/delApp/'



var resourceTypes = addr + '/resourceTypes'
var resourceType = addr + '/resourceType/'
var addResourceType = addr + '/addResourceType'
var ResourceType_fetchByAppId = addr + '/ResourceType/fetchByAppId/'
var updateResourceType = addr + '/updateResourceType/'
var delResourceType = addr + '/delResourceType/'

var addAttribute = addr + '/attributes/addAttribute/';
var updateAttribute = addr + '/attributes/updateAttribute/';
var deleteAttribute = addr + '/attributes/deleteAttribute/';
var allAttributes = addr + '/attributes/allAttributes/';
var attributes_fetchByAppId = addr + '/attributes/fetchByAppId/';
var attributeById = addr + '/attributes/attributeById/';
var filterAttributes = addr + '/attributes/filterAttributes';

 var Roles        = addr + '/role/Roles';
 var role      = addr + '/role/';
 var addRole = addr + '/role/addRole';
 var updateRole = addr + '/role/updateRole/';
 var role_fetchByAppId = addr + '/role/fetchByAppId/';
 var delRole = addr + '/role/delRole/';

 var Fetch_Resource = addr + '/Fetch/Resource';
 var addResource = addr + '/addResource';
 var Resource = addr + '/Resource/';
 var Resource_fetchByAppId = addr + '/Resource/fetchByAppId/';
 var UpdateResource = addr + '/UpdateResource/';
 var DeleteResource = addr + '/DeleteResource/';

 var policies = addr + '/policies';
 var policy = addr + '/policy/';
 var addPolicy = addr + '/addPolicy';
 var updatePolicy = addr + '/updatePolicy';
 var delPolicy = addr + '/delPolicy/';
 var addPolicyTargetActions = addr + '/addPolicyTargetActions';
 var updatePolicyTargetActions = addr + '/updatePolicyTargetActions';

 var user_Add = addr + '/user/Add';
 var users_all = addr + '/users/all';
 var user = addr + '/user/';
 var UpdateUser = addr + '/UpdateUser/';
 var DelUser = addr + '/DelUser/';

 var authenticate = usr + '/authenticate';
 var ForgotPassword = usr + '/ForgotPassword';
 var ForgotPassword_id_token = usr + '/ForgotPassword/:id/:token';
 var ChangePassword  = usr + '/ChangePassword';

 export { Applications,application,addApp,updateApp,delApp,
    addr,resourceTypes,resourceType,ResourceType_fetchByAppId,updateResourceType,delResourceType,addResourceType,
    addAttribute,updateAttribute,deleteAttribute,allAttributes,attributes_fetchByAppId,attributeById,filterAttributes,
    Roles,role,addRole,updateRole,role_fetchByAppId,delRole,
    Fetch_Resource,addResource,Resource,Resource_fetchByAppId,UpdateResource,DeleteResource,
    policies,addPolicy,updatePolicy,delPolicy,addPolicyTargetActions,updatePolicyTargetActions,
    user_Add,users_all,user,UpdateUser,DelUser,
    authenticate,ForgotPassword,ForgotPassword_id_token,ChangePassword};