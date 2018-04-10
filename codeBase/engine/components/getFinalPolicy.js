const IdentifyingAttributes = require('./identifyingAttributes');
const resourceAttributes = require('./resourceReturnAttributes')
const Policy = require('../models/policy_schema');

const Fuse = require('fuse.js')
var hashTable = require('node-hashtable');

getPolicies = function (obj) {
    return new Promise((resolve, reject) => {
            for (let i = 0; i < obj.resource.length ; i++) {

                var privilegearray = []

                let appid = hashTable.get('appid');
                let roles = hashTable.get('roles');
                let resname = obj.resource[i].resource_id.split('/')[2];

                Policy.findOne({
                    'policy_type'       : 'grant',
                    'application_id'    : appid._id,
                    'policy_targets'    : { $elemMatch: {'resource_name': resname } }
                    ,'policy_targets'    : { $elemMatch: {'resourceType_actions': { $elemMatch: {'action_name': obj.resource[i].action}}}}
                },
                    {'policy_constrains': 1, 'policy_targets' : 1 , '_id' : 0 },   
                )
                .where({ $or : [ { 'policy_principals.name' : obj.username } , { 'policy_principals.id' : { $in : roles} } ] })
                //.where({'policy_targets'    : { $elemMatch: {'resourceType_actions': { $elemMatch: {'action_name': obj.resource[i].action}}}}})
                .then(async policy=>{
                    // console.log('policy : ',policy);
                    if (policy == null ) reject('no policy found from given data !')
                    if (policy.policy_constrains == ( null || undefined || '' ) ){
                        console.log("Current Resource : " +resname);
                        var options = {
                            keys: ['resource_name' ]
                            ,id: 'resourceType_actions'
                            }
                        var fuse = new Fuse(policy.policy_targets, options)
                        // hashTable.add('privilage',fuse.search(obj.resource[i].action));
                        var actions = fuse.search(resname);

                        var options2 = {
                            keys: ['action_name' ]   }

                        var fuse2 = new Fuse(actions,options2)

                        privilegearray.push(fuse2.search(obj.resource[i].action)[0].action_state);
                        console.log('\x1b[36m%s\x1b[0m',fuse2.search(obj.resource[i].action)[0].action_state);

                        let resourceAttribute = await resourceAttributes.returnAttributes(obj.resource[i].resource_return_attributes,resname)
                        hashTable.add('resAttr',resourceAttribute);
                      
                    }
                    else{
                       console.log('in else condition');
                       privilegearray.push(false)
                    }
                    if(i+1 === obj.resource.length){
                        setTimeout(()=>{ resolve(privilegearray) }, 100);
                    }
                })
                .catch(err=>console.log(err))
            }
    })
}

exports.getPolicies = getPolicies;


